import {Project} from '../core/types.js';
import {serializeSession} from '../core/sessionSchema.js';
export interface CloudConfig{url:string;anonKey:string;accessToken?:string;refreshToken?:string;}
export interface AuthSession{access_token:string;refresh_token:string;expires_in:number;user:any;}
export interface CloudPreset{id:string;owner_id:string;title:string;description:string;visibility:'private'|'public';evidence_level:string;session:any;rights_declared:boolean;created_at:string;updated_at:string;}
export class SupabaseRest{
 constructor(private config:CloudConfig){}
 private base(){return this.config.url.replace(/\/$/,'')}
 private headers(extra:Record<string,string>={}){return {'apikey':this.config.anonKey,'Authorization':`Bearer ${this.config.accessToken||this.config.anonKey}`,...extra};}
 private async request(path:string,init:RequestInit={}){const r=await fetch(`${this.base()}${path}`,{...init,headers:{...this.headers(),...(init.headers||{})}});if(r.status===204)return null;const ct=r.headers.get('content-type')||'',raw=await r.text();let data:any=raw;try{if(raw&&ct.includes('json'))data=JSON.parse(raw)}catch{}if(!r.ok)throw new Error(data?.msg||data?.message||data?.error_description||data?.error||`Cloud request failed: ${r.status}`);return data;}
 private json(path:string,init:RequestInit={}){return this.request(path,{...init,headers:{'Content-Type':'application/json',...(init.headers||{})}})}
 async signUp(email:string,password:string){return this.json('/auth/v1/signup',{method:'POST',body:JSON.stringify({email,password})}) as Promise<AuthSession>;}
 async signIn(email:string,password:string){const s=await this.json('/auth/v1/token?grant_type=password',{method:'POST',body:JSON.stringify({email,password})}) as AuthSession;this.config.accessToken=s.access_token;this.config.refreshToken=s.refresh_token;return s;}
 async refresh(){if(!this.config.refreshToken)throw new Error('No refresh token');const s=await this.json('/auth/v1/token?grant_type=refresh_token',{method:'POST',body:JSON.stringify({refresh_token:this.config.refreshToken})}) as AuthSession;this.config.accessToken=s.access_token;this.config.refreshToken=s.refresh_token;return s;}
 async me(){return this.json('/auth/v1/user');}
 async signOut(){await this.json('/auth/v1/logout',{method:'POST'});this.config.accessToken=undefined;this.config.refreshToken=undefined;}
 async listPublicPresets(limit=50):Promise<CloudPreset[]>{return this.json(`/rest/v1/presets?visibility=eq.public&select=*&order=created_at.desc&limit=${Math.max(1,Math.min(100,limit))}`);}
 async listMine():Promise<CloudPreset[]>{return this.json('/rest/v1/presets?select=*&order=updated_at.desc');}
 async saveProjectVersion(project:Project){const body={project_id:project.id,version:project.revision,session:serializeSession(project)};return this.json('/rest/v1/project_versions',{method:'POST',headers:{Prefer:'return=representation'},body:JSON.stringify(body)});}
 async listProjectVersions(projectId:string){return this.json(`/rest/v1/project_versions?project_id=eq.${encodeURIComponent(projectId)}&select=*&order=version.desc`);}
 async publishPreset(project:Project,metadata:{title:string;description:string;evidenceLevel:string;rightsDeclared:boolean}){if(!metadata.rightsDeclared)throw new Error('Publishing requires a rights declaration');return this.json('/rest/v1/presets',{method:'POST',headers:{Prefer:'return=representation'},body:JSON.stringify({title:metadata.title,description:metadata.description,visibility:'public',evidence_level:metadata.evidenceLevel,session:serializeSession(project),rights_declared:true})});}
 async updatePreset(id:string,patch:Partial<Pick<CloudPreset,'title'|'description'|'visibility'|'evidence_level'|'rights_declared'>>){return this.json(`/rest/v1/presets?id=eq.${encodeURIComponent(id)}`,{method:'PATCH',headers:{Prefer:'return=representation'},body:JSON.stringify(patch)});}
 async deletePreset(id:string){return this.json(`/rest/v1/presets?id=eq.${encodeURIComponent(id)}`,{method:'DELETE'});}
 async createShare(projectVersionId:string,expiresAt?:string){return this.json('/rest/v1/rpc/create_share_link',{method:'POST',body:JSON.stringify({p_project_version_id:projectVersionId,p_expires_at:expiresAt||null})});}
 async resolveShare(token:string){return this.json('/rest/v1/rpc/resolve_share_link',{method:'POST',body:JSON.stringify({p_token:token})});}
 async revokeShare(id:string){return this.json('/rest/v1/share_links?id=eq.'+encodeURIComponent(id),{method:'PATCH',body:JSON.stringify({revoked_at:new Date().toISOString()})});}
 async listShares(){return this.json('/rest/v1/share_links?select=id,project_version_id,expires_at,revoked_at,created_at&order=created_at.desc');}
 async favorite(presetId:string,userId?:string){const body:any={preset_id:presetId};if(userId)body.user_id=userId;return this.json('/rest/v1/favorites',{method:'POST',headers:{Prefer:'resolution=merge-duplicates'},body:JSON.stringify(body)});}
 async unfavorite(presetId:string){return this.json(`/rest/v1/favorites?preset_id=eq.${encodeURIComponent(presetId)}`,{method:'DELETE'});}
 async listFavorites(){return this.json('/rest/v1/favorites?select=preset_id,created_at,presets(*)&order=created_at.desc');}
 async review(presetId:string,rating:number,body:string){return this.json('/rest/v1/reviews',{method:'POST',headers:{Prefer:'resolution=merge-duplicates,return=representation'},body:JSON.stringify({preset_id:presetId,rating:Math.max(1,Math.min(5,Math.round(rating))),body:body.slice(0,4000)})});}
 async reviews(presetId:string){return this.json(`/rest/v1/reviews?preset_id=eq.${encodeURIComponent(presetId)}&select=id,user_id,rating,body,created_at,updated_at&order=created_at.desc`);}
 async report(targetType:'preset'|'review',targetId:string,reason:string){if(reason.trim().length<3)throw new Error('Please provide a report reason.');return this.json('/rest/v1/reports',{method:'POST',body:JSON.stringify({target_type:targetType,target_id:targetId,reason:reason.trim().slice(0,2000)})});}
 async uploadPrivateAsset(userId:string,name:string,bytes:Uint8Array,contentType='application/octet-stream'){const clean=name.replace(/[^a-zA-Z0-9._-]/g,'_'),path=`${userId}/${crypto.randomUUID()}-${clean}`;return this.request(`/storage/v1/object/project-assets/${encodeURIComponent(path).replace(/%2F/g,'/')}`,{method:'POST',headers:{'Content-Type':contentType,'x-upsert':'false'},body:new Blob([bytes as BlobPart],{type:contentType})});}
 async removePrivateAsset(path:string){return this.request(`/storage/v1/object/project-assets/${path.split('/').map(encodeURIComponent).join('/')}`,{method:'DELETE'});}
 async setPublicSigningKey(publicKey:string){return this.json('/rest/v1/profiles?on_conflict=id',{method:'POST',headers:{Prefer:'resolution=merge-duplicates,return=representation'},body:JSON.stringify({public_signing_key:publicKey})});}
 async exportMyData(){return this.json('/rest/v1/rpc/export_my_data',{method:'POST',body:'{}'});}
 async deleteMyAccount(){return this.json('/rest/v1/rpc/delete_my_account',{method:'POST',body:'{}'});}
}
export function cloudConfigured(){return !!(localStorage.getItem('bbs.supabase.url')&&localStorage.getItem('bbs.supabase.key'));}
export function cloudFromStorage(){const url=localStorage.getItem('bbs.supabase.url')||'',anonKey=localStorage.getItem('bbs.supabase.key')||'',accessToken=sessionStorage.getItem('bbs.supabase.token')||undefined,refreshToken=sessionStorage.getItem('bbs.supabase.refresh')||undefined;if(!url||!anonKey)throw new Error('Configure the Supabase URL and anonymous public key in Settings.');return new SupabaseRest({url,anonKey,accessToken,refreshToken});}
export function storeCloudSession(s:AuthSession){sessionStorage.setItem('bbs.supabase.token',s.access_token);sessionStorage.setItem('bbs.supabase.refresh',s.refresh_token);}
export function clearCloudSession(){sessionStorage.removeItem('bbs.supabase.token');sessionStorage.removeItem('bbs.supabase.refresh');}
