import { PROJECTS, CATEGORIES } from '../src/data/studio-catalog';
import { SKILLS } from '../src/data/skill-library';
import { WORKFLOWS } from '../src/data/workflows';
import { existsSync, readFileSync } from 'node:fs';
const assert = (ok: boolean, msg: string) => { if (!ok) throw Error(msg); };
for (const rows of [PROJECTS, SKILLS, WORKFLOWS]) assert(new Set(rows.map(p => p.id)).size === rows.length, 'Duplicate IDs');
for (const p of PROJECTS) {
 assert(CATEGORIES.includes(p.category), 'Unknown category: '+p.id);
 assert(Boolean(p.name && p.description && p.summary && p.status), 'Incomplete: '+p.id);
 assert(!p.url || /^https:\/\/[^\s]+$/.test(p.url), 'Unsafe URL: '+p.id);
 assert(p.status !== 'Available' || Boolean(p.url), 'Available without destination: '+p.id);
 if (p.icon) assert(existsSync(p.icon), 'Missing icon: '+p.icon);
}
const publicText = JSON.stringify([PROJECTS, SKILLS, WORKFLOWS]);
assert(!/\/Users\/|\.env\b|sk-[A-Za-z0-9]{12}|supabase\.co|localhost|127\.0\.0\.1/.test(publicText), 'Private/internal infrastructure in public catalog');
for (const w of WORKFLOWS) assert(SKILLS.some(s => s.id === w.source), 'Missing workflow source: '+w.id);
const sw = readFileSync('dist/sw.js','utf8');
const precache = [...sw.matchAll(/['"]\/(.+?)['"]/g)].map(m => m[1]).filter(p => !p.includes('*'));
for (const p of precache) assert(existsSync('dist/'+p), 'Missing precache asset: '+p);
console.log(`PASS: ${PROJECTS.length} projects, ${SKILLS.length} guides, ${WORKFLOWS.length} workflows; IDs, links, privacy patterns, source references, icons, and ${precache.length} precache assets.`);
