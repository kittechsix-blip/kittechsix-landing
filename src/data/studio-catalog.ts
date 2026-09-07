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
    "summary": "Help an assistant understand the real structure of an app.",
    "status": "Local tool",
    "url": "",
    "description": "Shared standards and app guides that keep assistant answers grounded in product content."
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
    "summary": "Connect an AI assistant to repeatable tasks and remembered context.",
    "status": "Internal",
    "url": "",
    "description": "An assistant runtime used in my own automation system. Public overview only."
  },
  {
    "id": "codexclaw",
    "name": "CodexClaw",
    "category": "AI & automation",
    "summary": "Bring coding tasks and recurring automation into one assistant workflow.",
    "status": "Internal",
    "url": "",
    "description": "Part of my personal agent infrastructure. Public overview only."
  },
  {
    "id": "openclaw",
    "name": "OpenClaw",
    "category": "AI & automation",
    "summary": "Explore another route to assistant orchestration.",
    "status": "Research",
    "url": "",
    "description": "An orchestration tool in the broader workflow collection; no public Kittech release is listed."
  },
  {
    "id": "hermes",
    "name": "Hermes Automations",
    "category": "AI & automation",
    "summary": "Run scheduled tasks with a visible queue and repeatable procedures.",
    "status": "Internal",
    "url": "",
    "description": "The operational layer for recurring jobs and task management in my workflow."
  },
  {
    "id": "shared-brain",
    "name": "Shared Brain",
    "category": "AI & automation",
    "summary": "Keep project context and decisions available across AI sessions.",
    "status": "Internal",
    "url": "",
    "description": "A markdown-based knowledge system. The public site contains curated summaries, never the private brain."
  },
  {
    "id": "kittech-cabinet",
    "name": "Kittech Cabinet",
    "category": "AI & automation",
    "summary": "Find the right project without hunting through folders.",
    "status": "Local tool",
    "url": "",
    "description": "A generated project directory linking workspaces and project notes."
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
    "summary": "Bring image and video generation into a single local workspace.",
    "status": "Local tool",
    "url": "",
    "description": "A locally configured media studio adapted from an existing project, with model routing and cost tracking."
  },
  {
    "id": "x-monitor",
    "name": "Opportunity Monitor",
    "category": "AI & automation",
    "summary": "Collect public signals into a recurring research digest.",
    "status": "Prototype",
    "url": "",
    "description": "A read-only experiment in scheduled opportunity research."
  },
  {
    "id": "prompt-architect",
    "name": "Prompt Architect",
    "category": "AI & automation",
    "summary": "Turn a request into a structured prompt with clear constraints.",
    "status": "Project",
    "url": "",
    "description": "An XML prompt builder for more deliberate AI instructions."
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
    "name": "MedVox / Spanish Translator",
    "category": "Everyday tools",
    "summary": "Explore continuous English–Spanish speech translation.",
    "status": "In development",
    "url": "",
    "description": "A SwiftUI interpreter project for iPhone."
  },
  {
    "id": "just-do-it",
    "name": "Just Do It",
    "category": "Everyday tools",
    "summary": "Reduce the distance between a task and taking action.",
    "status": "Project",
    "url": "",
    "description": "A task-management project in the broader Kittech collection."
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
    "summary": "Make repeatable operational work easier to find and follow.",
    "status": "Internal",
    "url": "",
    "description": "An internal operations project. Operational records and access links are not published here."
  },
  {
    "id": "mymedkitt-v2",
    "name": "myMedKitt v2",
    "category": "Clinical tools",
    "summary": "Develop the next generation of the myMedKitt experience.",
    "status": "In development",
    "url": "",
    "description": "A separate next-generation application with a modular clinical consult architecture."
  },
  {
    "id": "powerkitt",
    "name": "PowerKitt",
    "category": "Clinical tools",
    "summary": "Explore a focused approach to weakness and localization.",
    "status": "In development",
    "url": "",
    "description": "A weakness-workup project with reference tools and explicit safety gates."
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
    "summary": "Organize medical decision-making documentation by complaint.",
    "status": "Local tool",
    "url": "",
    "description": "A personal reference project for structured emergency department documentation."
  },
  {
    "id": "in-range",
    "name": "In-Range",
    "category": "Clinical tools",
    "summary": "Explore another clinical application in the Kittech collection.",
    "status": "Prototype",
    "url": "",
    "description": "A project under development; the public product description is not yet finalized."
  },
  {
    "id": "cure-the-spins",
    "name": "Cure the Spins",
    "category": "Systems & experiments",
    "summary": "Explore a broader vertigo-focused product initiative.",
    "status": "Research",
    "url": "",
    "description": "A companion initiative in the vertigo project family."
  },
  {
    "id": "spins-dataset",
    "name": "SPINS Dataset",
    "category": "Systems & experiments",
    "summary": "Support the research behind the vertigo project family.",
    "status": "Research",
    "url": "",
    "description": "A research project overview. No dataset or records are published through this directory."
  },
  {
    "id": "vertigo-video",
    "name": "Vertigo Video",
    "category": "Lectures & learning",
    "summary": "Bring vertigo teaching into a video format.",
    "status": "In development",
    "url": "",
    "description": "An educational media project connected to the vertigo tool collection."
  },
  {
    "id": "kittech-voice",
    "name": "Kittech Voice",
    "category": "Systems & experiments",
    "summary": "Explore voice as part of the teaching and media workflow.",
    "status": "Local tool",
    "url": "",
    "description": "A supporting production project in the studio collection."
  }
];
export const PROJECTS: Project[] = [...listWorkApps().map(app => ({
 id: app.id, name: app.name, category: 'Clinical tools', summary: app.statement,
 status: app.status === 'Live' ? 'Available' : 'In development', url: app.liveUrl,
 description: app.description, icon: app.iconSrc, detail: '#/work/' + app.id,
})), ...additional];
