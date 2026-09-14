import { serializeSession } from '../core/sessionSchema.js';
function randomInt(max) { const x = new Uint32Array(1); crypto.getRandomValues(x); return x[0] % max; }
export function blindCode() { const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; let s = ''; for (let i = 0; i < 6; i++)
    s += alphabet[randomInt(alphabet.length)]; return s; }
export function makeCondition(role, project) { return { id: crypto.randomUUID(), role, blindLabel: blindCode(), project: structuredClone(project) }; }
export function randomize(ids) { const a = ids.slice(); for (let i = a.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
} return a; }
export function createResearchRun(project) { const a = makeCondition('A', project), control = makeCondition('control', { ...structuredClone(project), voices: project.voices.map(v => ({ ...v, type: 'sham' })) }); const conditions = [a, control]; return { id: crypto.randomUUID(), createdAt: new Date().toISOString(), conditions, order: randomize(conditions.map(x => x.id)), preRating: 50, postRating: 50, notes: '', events: [], reactionTimesMs: [] }; }
export function logEvent(run, type, data) { const now = performance.now(), start = run.startedAt ?? now; return { ...run, startedAt: run.startedAt ?? now, events: [...run.events, { at: new Date().toISOString(), elapsedMs: Math.round(now - start), type, data }] }; }
export function exportResearchJson(run) { return JSON.stringify({ ...run, conditions: run.conditions.map(c => ({ ...c, project: serializeSession(c.project) })) }, null, 2); }
function cell(x) { const s = String(x ?? ''); return /[",\n]/.test(s) ? `"${s.replaceAll('"', '""')}"` : s; }
export function exportResearchCsv(run) { const rows = [['run_id', 'condition_id', 'role', 'blind_label', 'order', 'pre_rating', 'post_rating', 'reaction_times_ms', 'notes'], ...run.conditions.map(c => [run.id, c.id, c.role, c.blindLabel, run.order.indexOf(c.id) + 1, run.preRating, run.postRating, run.reactionTimesMs.join('|'), run.notes])]; return rows.map(r => r.map(cell).join(',')).join('\n'); }
//# sourceMappingURL=session.js.map