// Public editorial inventory. Never auto-import private brain files into this module.
import { listWorkApps } from './app-registry.js';
import { releaseUrl } from './release.js';
export interface Project { id: string; name: string; category: string; summary: string; status: string; url: string; description: string; icon?: string; detail?: string }
export const CATEGORIES = ['All projects', 'Clinical tools', 'Lectures & learning', 'AI & automation', 'Everyday tools', 'Systems & experiments'];

/** Public collection order and access policy for the catalog surfaces. */
export const FEATURED_CLINICAL_TOOL_IDS = [
  'mymedkitt', 'myvertigoapp', 'mystroke-kitt', 'obgyn-kitt',
  'electrokitt', 'acidbase', 'burn-kitt', 'powerkitt',
] as const;
export const FEATURED_LEARNING_IDS = [
  'echokitt',
] as const;
export const OPEN_PROJECT_IDS = new Set<string>([
  ...FEATURED_CLINICAL_TOOL_IDS,
  ...FEATURED_LEARNING_IDS,
]);

/** Featured app that has not launched yet: shown as a screenshot preview. */
export function isPreview(id: string): boolean {
  return OPEN_PROJECT_IDS.has(id) && releaseUrl(id) === null;
}
export function isOpenableProject(project: Project): boolean {
  return OPEN_PROJECT_IDS.has(project.id);
}

export function orderFeaturedProjects(projects: Project[], featuredIds: readonly string[]): Project[] {
  const rank = new Map(featuredIds.map((id, index) => [id, index]));
  return [...projects].sort((a, b) => (rank.get(a.id) ?? Number.MAX_SAFE_INTEGER) - (rank.get(b.id) ?? Number.MAX_SAFE_INTEGER));
}
const additional: Project[] = [
  {
    "id": "instar",
    "name": "Instar",
    "category": "AI & automation",
    "summary": "Find a useful AI technique, understand it, and copy a prompt to try it.",
    "status": "Available",
    "url": "https://instar-kb.vercel.app",
    "description": "The living library behind my AI building workflow: capabilities, explainers, and worked examples.",
    "icon": "assets/icons/instar.png"
  },
  {
    "id": "wingman",
    "name": "Kittech Wingman",
    "category": "AI & automation",
    "summary": "Keep an AI assistant's answers grounded in what an app actually does.",
    "status": "Local tool",
    "url": "",
    "description": "A shared reference guide for each app, so when an assistant is asked about it, the answer comes from the app's real structure and content instead of a guess.",
    "icon": "assets/icons/wingman.png"
  },
  {
    "id": "dell-seton-ops",
    "name": "Dell Seton Ops",
    "category": "Systems & experiments",
    "summary": "The everyday operations tool for an emergency department team.",
    "status": "Internal",
    "url": "",
    "description": "Organizes an ED's day-to-day checklists and procedures so the team can find the right one quickly, instead of digging through folders or binders. Shared internally with the department; no public access.",
    "icon": "assets/icons/dell-seton-ops.png"
  },
  {
    "id": "powerkitt",
    "name": "PowerKitt",
    "category": "Clinical tools",
    "summary": "A bedside guide for working up sudden weakness.",
    "status": "In development",
    "url": "",
    "description": "Helps a clinician tell apart the different possible causes of new weakness, with built-in checkpoints for the causes that can't be missed.",
    "icon": "assets/icons/powerkitt.png"
  },
  {
    "id": "obgyn-kitt",
    "name": "Ob/Gyn-Kitt",
    "category": "Clinical tools",
    "summary": "Every OB/GYN emergency, searchable, with visual step-by-step maneuvers.",
    "status": "Available",
    "url": "",
    "description": "A bedside OB/GYN emergency guide: 88 consults, illustrated rapid steps for shoulder dystocia, breech, cord prolapse, PPH and maternal arrest, and calculators that remember gestational age and maternal age for the current patient.",
    "icon": "assets/icons/obgyn-kitt.png"
  },
  {
    "id": "burn-kitt",
    "name": "Burn-Kitt",
    "category": "Clinical tools",
    "summary": "Explore an interactive burn-assessment workspace.",
    "status": "In development",
    "url": "",
    "description": "A burn-management project with body-surface-area visualization and clinical workflow tools.",
    "icon": "assets/icons/burn-kitt.png"
  }
];
export const PROJECTS: Project[] = [...listWorkApps().map(app => ({
 id: app.id,
 name: app.id === 'echokitt' ? 'Echo-Kitt Learn' : app.name,
 category: app.id === 'echokitt' ? 'Lectures & learning' : 'Clinical tools',
 summary: app.statement,
 status: app.status === 'Live' ? 'Available' : 'In development',
 url: releaseUrl(app.id) ?? '',
 description: app.description, icon: app.iconSrc, detail: '#/work/' + app.id,
})), ...additional].map(p => isPreview(p.id) ? { ...p, status: 'Coming soon', url: '' } : { ...p, url: releaseUrl(p.id) ?? p.url });
