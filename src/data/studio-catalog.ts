// Public editorial inventory. Never auto-import private brain files into this module.
import { listWorkApps } from './app-registry.js';
export interface Project { id: string; name: string; category: string; summary: string; status: string; url: string; description: string; icon?: string; detail?: string }
export const CATEGORIES = ['All projects', 'Clinical tools', 'Lectures & learning', 'AI & automation', 'Everyday tools', 'Systems & experiments'];
const additional: Project[] = [
  {
    "id": "pinstashio",
    "name": "PinStashio",
    "category": "Everyday tools",
    "summary": "Save links, organize what matters, and examine the claims behind what you read.",
    "status": "Access required",
    "url": "https://pinstashio-app.vercel.app",
    "description": "A reading and research companion with source review and a searchable collection."
  },
  {
    "id": "instar",
    "name": "Instar",
    "category": "AI & automation",
    "summary": "Find a useful AI technique, understand it, and copy a prompt to try it.",
    "status": "Available",
    "url": "https://instar-kb.vercel.app",
    "description": "The living library behind my AI building workflow: capabilities, explainers, and worked examples."
  },
  {
    "id": "usgiv-academy",
    "name": "USGIV Academy",
    "category": "Lectures & learning",
    "summary": "Follow a structured path to ultrasound-guided IV access.",
    "status": "Available",
    "url": "https://usgiv-academy.vercel.app",
    "description": "A seven-module curriculum with source-linked videos, practice drills, and skill sign-offs."
  },
  {
    "id": "vision-loss-lecture",
    "name": "Acute Vision Loss: Case Based",
    "category": "Lectures & learning",
    "summary": "Explore a case-based emergency medicine lecture.",
    "status": "Available",
    "url": "https://vision-loss-show-deck.vercel.app",
    "description": "An interactive lecture deck with original visuals, presenter tools, and offline access."
  },
  {
    "id": "cardiac-toxicology",
    "name": "Cardiac Toxicology",
    "category": "Lectures & learning",
    "summary": "Work through cardiac toxicology teaching in an interactive lecture.",
    "status": "Available",
    "url": "https://cardiac-toxicology-show-deck.vercel.app",
    "description": "A 72-slide lecture conversion with case reveals and presenter controls. Published for author iteration."
  },
  {
    "id": "vertigo-lecture",
    "name": "The Dizzy Patient",
    "category": "Lectures & learning",
    "summary": "Explore the lecture project behind the vertigo teaching tools.",
    "status": "In development",
    "url": "",
    "description": "An interactive lecture deck exploring the dizzy-patient approach."
  },
  {
    "id": "ai-for-non-dev",
    "name": "AI for the Non-Dev",
    "category": "Lectures & learning",
    "summary": "Learn to build with AI, starting without a software background.",
    "status": "In development",
    "url": "",
    "description": "A browsable education platform with a Claude Code course, quizzes, and plans for additional courses."
  },
  {
    "id": "ai-eng-learn",
    "name": "AI Engineering Roadmap",
    "category": "Lectures & learning",
    "summary": "Turn an AI learning roadmap into a step-by-step course.",
    "status": "Available",
    "url": "https://kittechsix-blip.github.io/ai-eng-learn/",
    "description": "A six-month learning app with quizzes, linked resources, and saved progress."
  },
  {
    "id": "workflow-kitt",
    "name": "Workflow Kitt",
    "category": "AI & automation",
    "summary": "Take a rough app idea through a guided interview and a build handoff.",
    "status": "Local tool",
    "url": "",
    "description": "A beginner-oriented planning system that produces a project brief and implementation plan."
  },
  {
    "id": "infokitt",
    "name": "InfoKitt / Infographic Pipeline",
    "category": "AI & automation",
    "summary": "Turn dense teaching material into structured visual decision tools.",
    "status": "Integrated",
    "url": "https://kittechsix-blip.github.io/mymedkitt/app.html",
    "description": "A specification-driven pipeline with map, checklist, and learning views. Integrated into myMedKitt."
  },
  {
    "id": "wingman",
    "name": "Kittech Wingman",
    "category": "AI & automation",
    "summary": "Keep an AI assistant's answers grounded in what an app actually does.",
    "status": "Local tool",
    "url": "",
    "description": "A shared reference guide for each app, so when an assistant is asked about it, the answer comes from the app's real structure and content instead of a guess."
  },
  {
    "id": "ask-apps",
    "name": "Ask My Apps",
    "category": "AI & automation",
    "summary": "Find a page across a collection of apps using a plain-English question.",
    "status": "Local tool",
    "url": "",
    "description": "A source-backed index that returns the relevant page and its supporting context."
  },
  {
    "id": "claudeclaw",
    "name": "ClaudeClaw",
    "category": "AI & automation",
    "summary": "The assistant that runs my personal automation day to day.",
    "status": "Internal",
    "url": "",
    "description": "An always-available AI assistant, reachable from my phone, that runs scheduled tasks and remembers context between them. An internal tool; no public access."
  },
  {
    "id": "codexclaw",
    "name": "CodexClaw",
    "category": "AI & automation",
    "summary": "A second assistant focused specifically on coding tasks.",
    "status": "Internal",
    "url": "",
    "description": "Works alongside ClaudeClaw as part of the same personal automation system, specializing in coding and technical follow-through. An internal tool; no public access."
  },
  {
    "id": "openclaw",
    "name": "OpenClaw",
    "category": "AI & automation",
    "summary": "An early experiment in coordinating several AI assistants as a team.",
    "status": "Research",
    "url": "",
    "description": "A different approach to running multiple AI assistants together on the same problem. Still exploratory; no public release yet."
  },
  {
    "id": "hermes",
    "name": "Hermes Automations",
    "category": "AI & automation",
    "summary": "The scheduler behind every recurring task in my workflow.",
    "status": "Internal",
    "url": "",
    "description": "Keeps a visible queue of recurring jobs — like the daily morning briefing — and tracks whether each one actually ran, so scheduled work doesn't silently stop."
  },
  {
    "id": "shared-brain",
    "name": "Shared Brain",
    "category": "AI & automation",
    "summary": "One memory that every AI assistant I use can read from.",
    "status": "Internal",
    "url": "",
    "description": "A personal notes system of projects, decisions, and context, so nothing has to be re-explained from scratch every time a new AI session starts. Kept private; the public site only shows curated summaries."
  },
  {
    "id": "kittech-cabinet",
    "name": "Kittech Cabinet",
    "category": "AI & automation",
    "summary": "Find the right project without hunting through folders.",
    "status": "Local tool",
    "url": "",
    "description": "An auto-generated directory of every project in the collection, kept in sync automatically so a specific piece of work is always easy to locate."
  },
  {
    "id": "cowork",
    "name": "Kittech OS / Cowork",
    "category": "AI & automation",
    "summary": "Organize repeatable planning, research, and teaching tasks.",
    "status": "Internal",
    "url": "",
    "description": "A workspace for reusable tools, tracked learning, and structured handoffs."
  },
  {
    "id": "teach",
    "name": "Teach",
    "category": "Lectures & learning",
    "summary": "Build a learning track that remembers what comes next.",
    "status": "Local tool",
    "url": "",
    "description": "A teaching workflow with a tracked curriculum, practice, and session-to-session progress."
  },
  {
    "id": "bench-studio",
    "name": "Bench Studio",
    "category": "AI & automation",
    "summary": "Generate images and video from a single personal workspace.",
    "status": "Local tool",
    "url": "",
    "description": "A personal media studio that picks the right AI model for the job automatically and keeps a running tally of what each generation costs."
  },
  {
    "id": "x-monitor",
    "name": "Opportunity Monitor",
    "category": "AI & automation",
    "summary": "Watch for new AI tools and ideas worth building on, automatically.",
    "status": "Prototype",
    "url": "",
    "description": "A background research project that scans public sources on a schedule and produces a periodic digest, instead of requiring a manual search every time."
  },
  {
    "id": "prompt-architect",
    "name": "Prompt Architect",
    "category": "AI & automation",
    "summary": "Turn a loose request into precise, unambiguous instructions.",
    "status": "Project",
    "url": "",
    "description": "A tool that carefully labels each part of an instruction to an AI assistant — the task, the constraints, the examples — so its answer matches what was actually meant."
  },
  {
    "id": "mytravelmedkitt",
    "name": "MyTravelMedKitt",
    "category": "Everyday tools",
    "summary": "Plan an over-the-counter travel medicine kit.",
    "status": "In development",
    "url": "",
    "description": "A native iOS travel-medicine project for everyday travelers, separate from the clinical myMedKitt app."
  },
  {
    "id": "fck-cancer",
    "name": "fck-cancer",
    "category": "Everyday tools",
    "summary": "Explore a prevention and longevity tracking project.",
    "status": "In development",
    "url": "",
    "description": "A habit-focused health application. This listing describes the product, not anyone’s health information."
  },
  {
    "id": "no-sweat",
    "name": "No-Sweat",
    "category": "Everyday tools",
    "summary": "Explore a menopause-focused habit tracker.",
    "status": "Prototype",
    "url": "",
    "description": "A private prototype; condition-specific content is still being developed."
  },
  {
    "id": "medvox",
    "name": "MedVox",
    "category": "Clinical tools",
    "summary": "A bedside English–Spanish bridge that runs entirely on the phone.",
    "status": "Prototype",
    "url": "",
    "description": "Hold a control while one person speaks, release, and the translation is spoken in the other language. Everything runs on the iPhone using Apple's on-device speech and translation, so nothing said at the bedside leaves the device. Anything involving numbers, medications, left or right, or a consequential decision is held on screen for the clinician to read before it is played. It is a bridge for routine communication, not a substitute for a qualified interpreter, and it can dial one."
  },
  {
    "id": "just-do-it",
    "name": "Just Do It",
    "category": "Everyday tools",
    "summary": "Shrink the gap between deciding to do something and starting it.",
    "status": "Project",
    "url": "",
    "description": "A task-management experiment focused on the moment a task gets stuck between the to-do list and actually getting done."
  },
  {
    "id": "ai-investment-terminal",
    "name": "AI Investment Terminal",
    "category": "Everyday tools",
    "summary": "Organize AI-industry research in a dedicated workspace.",
    "status": "Access required",
    "url": "https://ai-investment-terminal.vercel.app",
    "description": "A research dashboard project; availability may require authorized access."
  },
  {
    "id": "ai-investor-dashboard",
    "name": "AI Investor Dashboard",
    "category": "Everyday tools",
    "summary": "Follow the AI industry through a dedicated research dashboard.",
    "status": "Access required",
    "url": "https://ai-investor-dashboard.vercel.app",
    "description": "A separate dashboard project in the research collection."
  },
  {
    "id": "dell-seton-ops",
    "name": "Dell Seton Ops",
    "category": "Systems & experiments",
    "summary": "The everyday operations tool for an emergency department team.",
    "status": "Internal",
    "url": "",
    "description": "Organizes an ED's day-to-day checklists and procedures so the team can find the right one quickly, instead of digging through folders or binders. Shared internally with the department; no public access."
  },
  {
    "id": "mymedkitt-v2",
    "name": "myMedKitt v2",
    "category": "Clinical tools",
    "summary": "A ground-up rebuild of myMedKitt for easier growth over time.",
    "status": "In development",
    "url": "",
    "description": "The next generation of myMedKitt, with each clinical topic built as its own self-contained module — easier to review, update, and trust as the collection keeps growing."
  },
  {
    "id": "powerkitt",
    "name": "PowerKitt",
    "category": "Clinical tools",
    "summary": "A bedside guide for working up sudden weakness.",
    "status": "In development",
    "url": "",
    "description": "Helps a clinician tell apart the different possible causes of new weakness, with built-in checkpoints for the causes that can't be missed."
  },
  {
    "id": "early-pregnancy",
    "name": "1stTriOB-Kitt",
    "category": "Clinical tools",
    "summary": "Organize early-pregnancy emergency care into a structured workflow.",
    "status": "In development",
    "url": "",
    "description": "A controlled pre-release clinical project with source review and module-level sign-off."
  },
  {
    "id": "chest-tube",
    "name": "Chest Tube",
    "category": "Clinical tools",
    "summary": "Open a visual guide to chest-tube placement.",
    "status": "Available",
    "url": "https://chest-tube.vercel.app",
    "description": "A procedural teaching tool with step-by-step guidance."
  },
  {
    "id": "a-line",
    "name": "Arterial Line",
    "category": "Clinical tools",
    "summary": "Explore arterial-line placement and waveform troubleshooting.",
    "status": "In development",
    "url": "",
    "description": "A visual procedural guide with a step deck and reference sheets."
  },
  {
    "id": "thoracotomy",
    "name": "Resuscitative Thoracotomy",
    "category": "Clinical tools",
    "summary": "Explore a structured procedural teaching guide.",
    "status": "In development",
    "url": "",
    "description": "An indication-first guide with a visual procedural sequence and reference material."
  },
  {
    "id": "burn-kitt",
    "name": "Burn-Kitt",
    "category": "Clinical tools",
    "summary": "Explore an interactive burn-assessment workspace.",
    "status": "In development",
    "url": "",
    "description": "A burn-management project with body-surface-area visualization and clinical workflow tools."
  },
  {
    "id": "em-mdm",
    "name": "EM-MDM",
    "category": "Clinical tools",
    "summary": "A reference for writing thorough medical-decision-making notes, faster.",
    "status": "Local tool",
    "url": "",
    "description": "A personal reference tool that organizes the documentation language for medical decision-making by chief complaint, so writing a complete note takes less time."
  },
  {
    "id": "in-range",
    "name": "In-Range",
    "category": "Clinical tools",
    "summary": "Build better blood-pressure habits, without fixating on the number.",
    "status": "Prototype",
    "url": "",
    "description": "A habit tracker for cardiovascular health that rewards the behaviors known to help — sleep, movement, salt, stress — rather than rewarding or shaming any single reading."
  },
  {
    "id": "cure-the-spins",
    "name": "Cure the Spins",
    "category": "Systems & experiments",
    "summary": "A bedside device to help tell dangerous dizziness from harmless dizziness.",
    "status": "Research",
    "url": "",
    "description": "A physical device I'm building that pairs eye-movement recording with AI-assisted interpretation, so a clinician at the bedside can work through the same eye exam a dizziness specialist would — with a person always making the final call, not the device. My primary project right now."
  },
  {
    "id": "spins-dataset",
    "name": "SPINS Dataset",
    "category": "Systems & experiments",
    "summary": "The research work behind the Cure the Spins device.",
    "status": "Research",
    "url": "",
    "description": "The underlying research collection used to validate how the vertigo device interprets eye movement. No dataset or patient records are published through this directory."
  },
  {
    "id": "vertigo-video",
    "name": "Vertigo Video",
    "category": "Lectures & learning",
    "summary": "Turn vertigo teaching into short, narrated videos.",
    "status": "In development",
    "url": "",
    "description": "An automated pipeline that produces a narrated teaching video for a dizziness topic from a single script, connected to the broader vertigo project."
  },
  {
    "id": "kittech-voice",
    "name": "Kittech Voice",
    "category": "Systems & experiments",
    "summary": "A cloned narrator voice for teaching videos.",
    "status": "Local tool",
    "url": "",
    "description": "A voice-cloning tool used to narrate teaching videos in my own voice, so new material doesn't need a fresh recording session every time."
  }
];
export const PROJECTS: Project[] = [...listWorkApps().map(app => ({
 id: app.id, name: app.name, category: 'Clinical tools', summary: app.statement,
 status: app.status === 'Live' ? 'Available' : 'In development', url: app.liveUrl,
 description: app.description, icon: app.iconSrc, detail: '#/work/' + app.id,
})), ...additional];
