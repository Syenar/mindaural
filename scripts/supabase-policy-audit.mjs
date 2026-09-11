import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const schema=readFileSync(new URL('../supabase/schema.sql',import.meta.url),'utf8');
const client=readFileSync(new URL('../src/cloud/supabase.ts',import.meta.url),'utf8');
for(const term of ['enable row level security','versions_owner_read','versions_owner_insert','project_version_append_only','rights_declared','is_verified_user','record_rate','create_share_link','resolve_share_link','export_my_data','delete_my_account','project_assets_read','project_assets_insert']) assert.match(schema,new RegExp(term,'i'),`missing cloud security contract: ${term}`);
assert.doesNotMatch(schema,/create policy[^\n]+project_versions[^\n]+for (update|delete)/i,'project versions must remain append-only');
for(const method of ['signUp','signIn','refresh','signOut','saveProjectVersion','publishPreset','createShare','resolveShare','report','exportMyData','deleteMyAccount']) assert.match(client,new RegExp(`async ${method}\\b`),`missing cloud client method: ${method}`);
assert.match(client,/rightsDeclared/); assert.match(schema,/record_rate/);
console.log('PASS Supabase local policy audit: RLS, append-only versions, rights/rate/share/account lifecycle contracts present');
