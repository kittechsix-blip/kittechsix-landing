// Curated metadata from the existing Instar library; source files remain in Instar.
export const SKILLS = [
  {
    "id": "10x",
    "name": "/10x",
    "summary": "Takes anything you've written and rewrites it to be ten times sharper and clearer.",
    "type": "slash-command",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/10x"
  },
  {
    "id": "agent-safe-codebase",
    "name": "Agent-Safe Codebase",
    "summary": "Give every clinical decision one owner, a typed contract, a test that pins it, and no side doors — then fold all four into a single `verify` gate so an agent can change one module and prove nothing else moved.",
    "type": "concept",
    "level": "advanced",
    "url": "https://instar-kb.vercel.app/c/agent-safe-codebase"
  },
  {
    "id": "agent-safe-commands",
    "name": "/agent-safe-init · /agent-safe-add · /agent-safe-ratchet",
    "summary": "Three commands that operationalize the agent-safe method: stand up the verify gate in a repo, run the 7-step checklist on one clinical decision, and ratchet a new rule whenever a leak slips the gate.",
    "type": "slash-command",
    "level": "advanced",
    "url": "https://instar-kb.vercel.app/c/agent-safe-commands"
  },
  {
    "id": "agent-skills",
    "name": "Agent Skills (SKILL.md)",
    "summary": "Package a repeatable workflow into a folder Claude Code can invoke by name — your own /commands, built in plain markdown.",
    "type": "skill",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/agent-skills"
  },
  {
    "id": "ask-my-apps",
    "name": "Ask My Apps",
    "summary": "Ask a plain-English question about your own apps and get an answer sourced straight from their real files — citation, file path, and deep link included.",
    "type": "skill",
    "level": "intermediate",
    "url": "https://instar-kb.vercel.app/c/ask-my-apps"
  },
  {
    "id": "blindspots",
    "name": "/blindspots",
    "summary": "Surfaces the assumptions you're making without realizing — the ones shaping your approach.",
    "type": "slash-command",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/blindspots"
  },
  {
    "id": "brutal",
    "name": "/brutal",
    "summary": "Gives raw, honest feedback with no softening — the version most people are too polite to say.",
    "type": "slash-command",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/brutal"
  },
  {
    "id": "build-gate",
    "name": "The Build Gate",
    "summary": "Make a passing build the toll you pay before pushing — run the build at the deploy boundary and refuse to commit or push if it exits red.",
    "type": "concept",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/build-gate"
  },
  {
    "id": "checkpointing-rewind",
    "name": "Checkpointing & Rewind",
    "summary": "Undo Claude's edits and jump back to an earlier point in the session — a local undo button for whole conversations.",
    "type": "cli-feature",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/checkpointing-rewind"
  },
  {
    "id": "claude-md",
    "name": "CLAUDE.md",
    "summary": "Write down your rules once and Claude Code re-reads them at the start of every single session.",
    "type": "concept",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/claude-md"
  },
  {
    "id": "claudex-plan",
    "name": "/claudex:plan",
    "summary": "Drafts a PLAN.md, then loops Codex as an adversarial reviewer until the plan survives or N rounds pass.",
    "type": "slash-command",
    "level": "advanced",
    "url": "https://instar-kb.vercel.app/c/claudex-plan"
  },
  {
    "id": "connections",
    "name": "/connections",
    "summary": "Surfaces non-obvious links between recently-changed notes and older material in your vault — capped at 5 per run, with permanent de-duplication.",
    "type": "slash-command",
    "level": "intermediate",
    "url": "https://instar-kb.vercel.app/c/connections"
  },
  {
    "id": "context-management",
    "name": "Context Management",
    "summary": "Treat the context window as a budget — spend it on the task at hand, not on scrollback, stale instructions, and tool listings.",
    "type": "concept",
    "level": "intermediate",
    "url": "https://instar-kb.vercel.app/c/context-management"
  },
  {
    "id": "critique",
    "name": "/critique",
    "summary": "Pulls apart the weak points in your work and rewrites the parts not pulling their weight.",
    "type": "slash-command",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/critique"
  },
  {
    "id": "curriculum-builder-skill",
    "name": "Curriculum Builder Skill",
    "summary": "Turn a trusted YouTube channel or educational website into a source-linked mastery curriculum with ordered lessons, practice drills, pearls, and performance sign-offs.",
    "type": "skill",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/curriculum-builder-skill"
  },
  {
    "id": "custom-slash-commands",
    "name": "Custom Slash Commands",
    "summary": "Turn a prompt you keep re-typing into a one-word /command — a single markdown file, no code.",
    "type": "slash-command",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/custom-slash-commands"
  },
  {
    "id": "deploy",
    "name": "/deploy",
    "summary": "One universal deploy command: runs the build gate, syncs docs/, commits, pushes, and verifies the live site — refusing to ship on a red build.",
    "type": "slash-command",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/deploy"
  },
  {
    "id": "devil",
    "name": "/devil",
    "summary": "Argues the strongest case against your idea, so you see the holes before anyone else does.",
    "type": "slash-command",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/devil"
  },
  {
    "id": "eli5",
    "name": "/eli5",
    "summary": "Explains anything in plain language — the way you would for someone with zero background.",
    "type": "slash-command",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/eli5"
  },
  {
    "id": "extended-thinking",
    "name": "Extended Thinking (think / ultrathink)",
    "summary": "Make Claude reason longer before answering — one keyword for a single hard question, one dial for a whole hard session.",
    "type": "cli-feature",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/extended-thinking"
  },
  {
    "id": "few-shot-prompting",
    "name": "Few-Shot Examples",
    "summary": "Show Claude 3-5 worked examples of the output you want instead of describing it — the examples become the spec.",
    "type": "prompt-pattern",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/few-shot-prompting"
  },
  {
    "id": "frontend-design",
    "name": "frontend-design",
    "summary": "Pushes Claude to build distinctive, production-grade UI with a bold aesthetic point of view — instead of generic 'AI slop' (Inter, purple gradients, safe layouts).",
    "type": "skill",
    "level": "intermediate",
    "url": "https://instar-kb.vercel.app/c/frontend-design"
  },
  {
    "id": "gamified-habit-dashboard",
    "name": "Gamified Habit Dashboard",
    "summary": "Turn daily consistency into a points, streaks, and levels dashboard that makes your minimum viable day visible and rewarding.",
    "type": "prompt-pattern",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/gamified-habit-dashboard"
  },
  {
    "id": "ghost",
    "name": "/ghost",
    "summary": "Rewrites your text to read like a human wrote it, stripping out the obvious AI tells.",
    "type": "slash-command",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/ghost"
  },
  {
    "id": "git-worktrees-parallel",
    "name": "Parallel Sessions with Git Worktrees",
    "summary": "Run multiple Claude Code sessions on the same repo at once — each in its own checkout on its own branch — so parallel edits never collide.",
    "type": "workflow",
    "level": "advanced",
    "url": "https://instar-kb.vercel.app/c/git-worktrees-parallel"
  },
  {
    "id": "godmode",
    "name": "/godmode",
    "summary": "Tells Claude to be as thorough as possible, covering every angle of the question in one go.",
    "type": "slash-command",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/godmode"
  },
  {
    "id": "headless-mode",
    "name": "Headless Mode (claude -p)",
    "summary": "Run Claude Code from a script — one command in, the answer out, no interactive session — so cron jobs and shell pipelines can use Claude.",
    "type": "cli-feature",
    "level": "intermediate",
    "url": "https://instar-kb.vercel.app/c/headless-mode"
  },
  {
    "id": "hooks",
    "name": "Hooks",
    "summary": "Run your own shell commands automatically at lifecycle moments — guaranteed every time, not 'if Claude remembers'.",
    "type": "hook",
    "level": "intermediate",
    "url": "https://instar-kb.vercel.app/c/hooks"
  },
  {
    "id": "infographic-command",
    "name": "/infographic",
    "summary": "One command that builds an interactive, accurate, self-contained medical infographic from any consult, app, PDF, or topic — then runs a single point → glance → approve loop: it builds, self-checks, opens it in your browser, and ships on your word (or one round of plain-English notes).",
    "type": "slash-command",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/infographic-command"
  },
  {
    "id": "infographic",
    "name": "InfoKitt — Interactive Medical Infographics",
    "summary": "Turns any clinical source — a myMedKitt consult, one of your apps, a PDF, or a topic you type — into a single, self-contained interactive medical infographic: live dose calculators, safety guards, reactive toggles, and a 'You are here' tracker, all in one offline file.",
    "type": "skill",
    "level": "intermediate",
    "url": "https://instar-kb.vercel.app/c/infographic"
  },
  {
    "id": "kittech-brand",
    "name": "Kittech Brand",
    "summary": "Ports one app's design system onto every other app you own — tokens, components, flow, and stack — with an executable audit that fails the build when an app drifts off brand.",
    "type": "skill",
    "level": "intermediate",
    "url": "https://instar-kb.vercel.app/c/kittech-brand"
  },
  {
    "id": "l99",
    "name": "/L99",
    "summary": "Pushes Claude to its highest expert level — no simplifying, nothing dumbed down.",
    "type": "slash-command",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/l99"
  },
  {
    "id": "legal-audit",
    "name": "/legal-audit",
    "summary": "Louis Litt — an autopilot audit that checks clinical consults for FDA CDS compliance, fixes citations/disclaimers itself, and reports only what changed.",
    "type": "skill",
    "level": "advanced",
    "url": "https://instar-kb.vercel.app/c/legal-audit"
  },
  {
    "id": "live-progress-page",
    "name": "Live Progress Page",
    "summary": "Have Claude keep a single timestamped HTML log — with screenshots and media — that updates as it works, so you can watch a long job instead of waiting for the dump at the end.",
    "type": "prompt-pattern",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/live-progress-page"
  },
  {
    "id": "llm-council",
    "name": "/llm-council",
    "summary": "Runs a decision through 5 independent AI advisors who debate, anonymously peer-review each other, and return one synthesized verdict.",
    "type": "skill",
    "level": "intermediate",
    "url": "https://instar-kb.vercel.app/c/llm-council"
  },
  {
    "id": "loops",
    "name": "Loops (/loop)",
    "summary": "Run a prompt or slash command on a recurring interval inside one live session that keeps its context between wakes.",
    "type": "workflow",
    "level": "intermediate",
    "url": "https://instar-kb.vercel.app/c/loops"
  },
  {
    "id": "mcp-servers",
    "name": "MCP Servers",
    "summary": "Plug external tools — a real browser, a scraper, a database, Slack — into Claude Code so it can act on those systems directly instead of working from what you paste.",
    "type": "mcp-server",
    "level": "intermediate",
    "url": "https://instar-kb.vercel.app/c/mcp-servers"
  },
  {
    "id": "noyap",
    "name": "/noyap",
    "summary": "Cuts all preamble and filler, so Claude gives the answer first and nothing you don't need.",
    "type": "slash-command",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/noyap"
  },
  {
    "id": "ooda",
    "name": "/OODA",
    "summary": "Works the problem through Observe, Orient, Decide, Act — a fast loop for deciding under pressure.",
    "type": "slash-command",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/ooda"
  },
  {
    "id": "output-styles",
    "name": "Output Styles",
    "summary": "Change the role, tone, and format Claude answers in — turn the coding assistant into a teacher, a writer, or a diagram-first explainer.",
    "type": "cli-feature",
    "level": "intermediate",
    "url": "https://instar-kb.vercel.app/c/output-styles"
  },
  {
    "id": "permission-modes",
    "name": "Permission Modes & Allowlists",
    "summary": "Decide once what Claude Code may do without asking — and wall off what it must never touch — instead of approving every action by hand.",
    "type": "cli-feature",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/permission-modes"
  },
  {
    "id": "persistent-memory",
    "name": "Persistent Memory",
    "summary": "Claude writes its own notes to disk so what it learned about your project on Tuesday is still there on Wednesday.",
    "type": "concept",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/persistent-memory"
  },
  {
    "id": "persona",
    "name": "/persona",
    "summary": "Locks Claude into one expert role for the whole chat, so every answer comes from that view.",
    "type": "slash-command",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/persona"
  },
  {
    "id": "pitch",
    "name": "/pitch",
    "summary": "Turns any idea into a tight 30-second investor pitch, framed to land with a busy decision-maker.",
    "type": "slash-command",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/pitch"
  },
  {
    "id": "plan-mode",
    "name": "Plan Mode",
    "summary": "Make Claude explore and propose a written plan before it touches a single file.",
    "type": "cli-feature",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/plan-mode"
  },
  {
    "id": "plugins",
    "name": "Plugins",
    "summary": "Bundle skills, agents, hooks, and MCP servers into one installable package you can share across machines and teammates via a marketplace.",
    "type": "plugin",
    "level": "intermediate",
    "url": "https://instar-kb.vercel.app/c/plugins"
  },
  {
    "id": "premortem",
    "name": "/premortem",
    "summary": "Assumes your plan already failed, then works backwards to find why it went wrong.",
    "type": "slash-command",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/premortem"
  },
  {
    "id": "prompt-forge",
    "name": "/prompt-forge",
    "summary": "Turns a rough idea into a production-grade prompt through a gap-scan interview, a rubric-gated draft, and an in-session smoke test — then files it for reuse.",
    "type": "skill",
    "level": "intermediate",
    "url": "https://instar-kb.vercel.app/c/prompt-forge"
  },
  {
    "id": "punch",
    "name": "/punch",
    "summary": "Cuts your text by ~40% and tightens what's left, so every line lands harder.",
    "type": "slash-command",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/punch"
  },
  {
    "id": "review",
    "name": "/review",
    "summary": "A weekly self-improvement agent that reads claude-brain + your memory logs, surfaces the patterns that keep recurring, and proposes one concrete next action for each — read-only and propose-only, so you stay the decision-maker.",
    "type": "skill",
    "level": "intermediate",
    "url": "https://instar-kb.vercel.app/c/review"
  },
  {
    "id": "safeguard",
    "name": "/safeguard",
    "summary": "Hardens a project against secret leaks in one pass: gitignore rules, a pre-commit hook, safe test environment configuration, and an audit of what's already tracked.",
    "type": "slash-command",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/safeguard"
  },
  {
    "id": "save-plan-implement",
    "name": "Save Plan, Implement Plan",
    "summary": "Plan in one session, save the approved plan to a file, then build it in a fresh session that starts at full context.",
    "type": "workflow",
    "level": "intermediate",
    "url": "https://instar-kb.vercel.app/c/save-plan-implement"
  },
  {
    "id": "scheduled-agents",
    "name": "Scheduled Agents (Routines)",
    "summary": "Run Claude on a clock — recurring cloud routines via /schedule, or a crontab line that fires claude -p headlessly while you sleep.",
    "type": "workflow",
    "level": "intermediate",
    "url": "https://instar-kb.vercel.app/c/scheduled-agents"
  },
  {
    "id": "scout",
    "name": "/scout",
    "summary": "Scans any plan for hidden risks and blind spots, flagging the problems you're likely to miss.",
    "type": "slash-command",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/scout"
  },
  {
    "id": "security-audit",
    "name": "/security-audit",
    "summary": "Scans a web app against a 9-point checklist (RLS, auth, rate limits, secrets, CORS/CSP…) and returns a graded PASS/FAIL/WARN list with concrete fixes.",
    "type": "skill",
    "level": "intermediate",
    "url": "https://instar-kb.vercel.app/c/security-audit"
  },
  {
    "id": "self-verifying-loop",
    "name": "The Self-Verifying Loop",
    "summary": "Make “done” mean “the checks passed,” not “the code was written” — a Stop hook reruns your tests every time Claude tries to finish, and sends it back until they're green.",
    "type": "workflow",
    "level": "intermediate",
    "url": "https://instar-kb.vercel.app/c/self-verifying-loop"
  },
  {
    "id": "skeptic",
    "name": "/skeptic",
    "summary": "Makes Claude challenge your question first, instead of taking it at face value and answering.",
    "type": "slash-command",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/skeptic"
  },
  {
    "id": "steelman",
    "name": "/steelman",
    "summary": "Builds the best version of the opposing argument, so you see the other side at its strongest.",
    "type": "slash-command",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/steelman"
  },
  {
    "id": "structured-build-prompt",
    "name": "Structured Build Prompt",
    "summary": "Turn a vague build request into a goal-first, parallel-agent creative brief that names the build, stack, features, behavior, mood, visuals, effects, and output format before coding starts.",
    "type": "prompt-pattern",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/structured-build-prompt"
  },
  {
    "id": "subagents",
    "name": "Subagents",
    "summary": "Hand a side task to a worker with its own context window — the search noise stays with the worker, only the summary comes back.",
    "type": "subagent",
    "level": "intermediate",
    "url": "https://instar-kb.vercel.app/c/subagents"
  },
  {
    "id": "sync-context",
    "name": "/sync-context",
    "summary": "Refreshes the Context Brief at the top of your global CLAUDE.md from claude-brain — additive only, so it never overwrites your other rules.",
    "type": "slash-command",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/sync-context"
  },
  {
    "id": "teach-review-loop",
    "name": "The Teach + Review Loop",
    "summary": "One pattern — remember what happened, use it to generate the next thing — deployed twice: a tutor that compounds your learning, and a weekly agent that reads your own history and proposes what to fix or learn next.",
    "type": "concept",
    "level": "intermediate",
    "url": "https://instar-kb.vercel.app/c/teach-review-loop"
  },
  {
    "id": "teach",
    "name": "/teach",
    "summary": "Turns any topic into a tracked mini-course that resumes from saved state — teaches one concept just past what you know, gives an exercise and a recall quiz, and picks up exactly where you left off next time.",
    "type": "skill",
    "level": "intermediate",
    "url": "https://instar-kb.vercel.app/c/teach"
  },
  {
    "id": "travel-audit",
    "name": "/travel-audit",
    "summary": "Steve Irwin — audits a travel-medicine app against live WHO/CDC/ECDC/ProMED alerts, region by region, and flags outdated info or new threats.",
    "type": "skill",
    "level": "advanced",
    "url": "https://instar-kb.vercel.app/c/travel-audit"
  },
  {
    "id": "uda",
    "name": "/UDA",
    "summary": "Runs a military-style root-cause analysis, breaking the problem down from every angle.",
    "type": "slash-command",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/uda"
  },
  {
    "id": "ultracode-workflows",
    "name": "Ultracode Multi-Agent Workflows",
    "summary": "Type one keyword and Claude Code fans out dozens of coordinated subagents — finders, skeptics, judges — for jobs too big for one context window.",
    "type": "workflow",
    "level": "advanced",
    "url": "https://instar-kb.vercel.app/c/ultracode-workflows"
  },
  {
    "id": "ultrathink",
    "name": "/ultrathink",
    "summary": "Forces Claude to reason at full depth before answering — a considered response, not a reflex.",
    "type": "slash-command",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/ultrathink"
  },
  {
    "id": "xml-tags",
    "name": "XML Tags",
    "summary": "Wrap each part of a prompt — instructions, data, examples — in named tags so Claude never confuses one for another.",
    "type": "prompt-pattern",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/xml-tags"
  }
];
