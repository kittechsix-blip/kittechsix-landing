import { PROJECTS } from '../src/data/studio-catalog';
import { SKILLS } from '../src/data/skill-library';
import { writeFileSync } from 'node:fs';
const urls = [...new Set([...PROJECTS.map(p=>p.url), ...SKILLS.map(s=>s.url)].filter(Boolean))];
const results: {url:string,status:number,error?:string}[]=[];
let index=0;
async function worker(){while(index<urls.length){const url=urls[index++]; try {const r=await fetch(url,{redirect:'follow',signal:AbortSignal.timeout(20000)}); results.push({url,status:r.status}); await r.body?.cancel();}catch(e){results.push({url,status:0,error:String(e)});}}}
await Promise.all(Array.from({length:5},worker));
results.sort((a,b)=>a.url.localeCompare(b.url));
writeFileSync('tasks/public-link-check.json',JSON.stringify({checkedAt:new Date().toISOString(),results},null,2)+'\n');
console.log(JSON.stringify({total:results.length,ok:results.filter(r=>r.status===200).length,other:results.filter(r=>r.status!==200)},null,2));
