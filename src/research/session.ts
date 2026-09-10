import {Project} from '../core/types.js';
import {serializeSession} from '../core/sessionSchema.js';

export type ConditionRole='A'|'B'|'control';
export interface ResearchCondition{id:string;role:ConditionRole;blindLabel:string;project:Project;}
export interface ResearchEvent{at:string;elapsedMs:number;type:string;data?:Record<string,unknown>;}
export interface ResearchRun{id:string;createdAt:string;conditions:ResearchCondition[];order:string[];preRating:number;postRating:number;notes:string;events:ResearchEvent[];reactionTimesMs:number[];startedAt?:number;}
function randomInt(max:number){const x=new Uint32Array(1);crypto.getRandomValues(x);return x[0]%max;}
export function blindCode(){const alphabet='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';let s='';for(let i=0;i<6;i++)s+=alphabet[randomInt(alphabet.length)];return s;}
export function makeCondition(role:ConditionRole,project:Project):ResearchCondition{return {id:crypto.randomUUID(),role,blindLabel:blindCode(),project:structuredClone(project)};}
export function randomize(ids:string[]){const a=ids.slice();for(let i=a.length-1;i>0;i--){const j=randomInt(i+1);[a[i],a[j]]=[a[j],a[i]];}return a;}
export function createResearchRun(project:Project):ResearchRun{const a=makeCondition('A',project),control=makeCondition('control',{...structuredClone(project),voices:project.voices.map(v=>({...v,type:'sham'}))});const conditions=[a,control];return {id:crypto.randomUUID(),createdAt:new Date().toISOString(),conditions,order:randomize(conditions.map(x=>x.id)),preRating:50,postRating:50,notes:'',events:[],reactionTimesMs:[]};}
export function logEvent(run:ResearchRun,type:string,data?:Record<string,unknown>){const now=performance.now(),start=run.startedAt??now;return {...run,startedAt:run.startedAt??now,events:[...run.events,{at:new Date().toISOString(),elapsedMs:Math.round(now-start),type,data}]};}
export function exportResearchJson(run:ResearchRun){return JSON.stringify({...run,conditions:run.conditions.map(c=>({...c,project:serializeSession(c.project)}))},null,2);}
function cell(x:unknown){const s=String(x??'');return /[",\n]/.test(s)?`"${s.replaceAll('"','""')}"`:s;}
export function exportResearchCsv(run:ResearchRun){const rows:any[][]=[['run_id','condition_id','role','blind_label','order','pre_rating','post_rating','reaction_times_ms','notes'],...run.conditions.map(c=>[run.id,c.id,c.role,c.blindLabel,run.order.indexOf(c.id)+1,run.preRating,run.postRating,run.reactionTimesMs.join('|'),run.notes])];return rows.map(r=>r.map(cell).join(',')).join('\n');}
