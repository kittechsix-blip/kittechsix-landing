// Curated metadata from the existing Instar library; source files remain in Instar.
export const SKILLS = [
  {
    "id": "short-educational-video",
    "name": "Short Educational Video Skill",
    "summary": "Turn one teaching idea into a 15–30 second video with a clear script, editable visuals, and an export checklist.",
    "detail": "Tell your assistant what to teach and who it is for. A workflow distilled from 20 tutorial reviews guides the script, storyboard, tool check, scene revisions, and export. The Instar guide includes a copyable prompt, downloadable skill, and a ready-to-build 24-second example; video tools are set up separately.",
    "type": "skill",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/short-educational-video"
  },
  {
    "id": "10x",
    "name": "/10x",
    "summary": "Takes anything you've written and rewrites it to be ten times sharper and clearer.",
    "detail": "Paste in an email, a bio, or a paragraph you're not happy with, and get back a version that says the same thing in fewer, better words — no new ideas added, just tightened.",
    "type": "slash-command",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/10x"
  },
  {
    "id": "agent-safe-codebase",
    "name": "Agent-Safe Codebase",
    "summary": "Give every clinical decision one owner, a typed contract, a test that pins it, and no side doors — then fold all four into a single `verify` gate so an agent can change one module and prove nothing else moved.",
    "detail": "A discipline for building software with an AI assistant so it can't quietly break something important: every key decision gets a named owner, a test that would catch a mistake, and no hidden back doors — all checked automatically before any change ships.",
    "type": "concept",
    "level": "advanced",
    "url": "https://instar-kb.vercel.app/c/agent-safe-codebase"
  },
  {
    "id": "agent-safe-commands",
    "name": "/agent-safe-init · /agent-safe-add · /agent-safe-ratchet",
    "summary": "Three commands that operationalize the agent-safe method: stand up the verify gate in a repo, run the 7-step checklist on one clinical decision, and ratchet a new rule whenever a leak slips the gate.",
    "detail": "Three shortcuts that put the discipline above into practice: set it up in a project, apply it to one specific decision, and add a new rule the moment something slips through.",
    "type": "slash-command",
    "level": "advanced",
    "url": "https://instar-kb.vercel.app/c/agent-safe-commands"
  },
  {
    "id": "agent-skills",
    "name": "Agent Skills (SKILL.md)",
    "summary": "Package a repeatable workflow into a folder Claude Code can invoke by name — your own /commands, built in plain markdown.",
    "detail": "Instead of re-explaining a multi-step task to an AI assistant every time, write it down once in a folder. From then on, typing its name runs the whole thing — a personal shortcut library.",
    "type": "skill",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/agent-skills"
  },
  {
    "id": "ask-my-apps",
    "name": "Ask My Apps",
    "summary": "Ask a plain-English question about your own apps and get an answer sourced straight from their real files — citation, file path, and deep link included.",
    "detail": "A way to interrogate your own software the way you'd ask a colleague — \"what does this app say about X?\" — and get back the exact page or file where the answer lives, instead of a guess.",
    "type": "skill",
    "level": "intermediate",
    "url": "https://instar-kb.vercel.app/c/ask-my-apps"
  },
  {
    "id": "blindspots",
    "name": "/blindspots",
    "summary": "Surfaces the assumptions you're making without realizing — the ones shaping your approach.",
    "detail": "Reads back what you've been assuming without realizing it, so you can check whether those assumptions actually hold before you build on top of them.",
    "type": "slash-command",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/blindspots"
  },
  {
    "id": "brutal",
    "name": "/brutal",
    "summary": "Gives raw, honest feedback with no softening — the version most people are too polite to say.",
    "detail": "Turns off the polite hedging and says plainly what's weak, wrong, or unconvincing — for when you specifically don't want to be let down easy.",
    "type": "slash-command",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/brutal"
  },
  {
    "id": "build-gate",
    "name": "The Build Gate",
    "summary": "Make a passing build the toll you pay before pushing — run the build at the deploy boundary and refuse to commit or push if it exits red.",
    "detail": "A simple rule: nothing gets published unless it passes a check first. If the check fails, the change is blocked from going live — a safety net that catches mistakes before real users see them.",
    "type": "concept",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/build-gate"
  },
  {
    "id": "checkpointing-rewind",
    "name": "Checkpointing & Rewind",
    "summary": "Undo Claude's edits and jump back to an earlier point in the session — a local undo button for whole conversations.",
    "detail": "Like an undo button for an entire working session — if the assistant heads down the wrong path, you can jump back to an earlier point and try again instead of starting over.",
    "type": "cli-feature",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/checkpointing-rewind"
  },
  {
    "id": "claude-md",
    "name": "CLAUDE.md",
    "summary": "Write down your rules once and Claude Code re-reads them at the start of every single session.",
    "detail": "A plain text file of house rules — how you like things done, what to avoid, what matters — that the assistant automatically reads at the start of every session, so you don't repeat yourself.",
    "type": "concept",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/claude-md"
  },
  {
    "id": "claudex-plan",
    "name": "/claudex:plan",
    "summary": "Drafts a PLAN.md, then loops Codex as an adversarial reviewer until the plan survives or N rounds pass.",
    "detail": "Before any code gets written, a plan is drafted and then deliberately argued with by a second AI acting as a skeptical reviewer, back and forth, until the plan holds up.",
    "type": "slash-command",
    "level": "advanced",
    "url": "https://instar-kb.vercel.app/c/claudex-plan"
  },
  {
    "id": "connections",
    "name": "/connections",
    "summary": "Surfaces non-obvious links between recently-changed notes and older material in your vault — capped at 5 per run, with permanent de-duplication.",
    "detail": "Once a week, it looks at what you've recently written down and quietly points out where it connects to something older you may have forgotten — capped so it never floods you.",
    "type": "slash-command",
    "level": "intermediate",
    "url": "https://instar-kb.vercel.app/c/connections"
  },
  {
    "id": "context-management",
    "name": "Context Management",
    "summary": "Treat the context window as a budget — spend it on the task at hand, not on scrollback, stale instructions, and tool listings.",
    "detail": "An assistant can only take in so much at once. This is the practice of feeding it only what actually matters for the task at hand, so it doesn't get bogged down by clutter.",
    "type": "concept",
    "level": "intermediate",
    "url": "https://instar-kb.vercel.app/c/context-management"
  },
  {
    "id": "critique",
    "name": "/critique",
    "summary": "Pulls apart the weak points in your work and rewrites the parts not pulling their weight.",
    "detail": "Goes through a piece of work and points out specifically which parts are carrying their weight and which aren't — then offers a stronger version of the weak parts.",
    "type": "slash-command",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/critique"
  },
  {
    "id": "curriculum-builder-skill",
    "name": "Curriculum Builder Skill",
    "summary": "Turn a trusted YouTube channel or educational website into a source-linked mastery curriculum with ordered lessons, practice drills, pearls, and performance sign-offs.",
    "detail": "Hand it a trusted YouTube channel or course website and it organizes the material into an actual course — ordered lessons, practice exercises, checkpoints — instead of a pile of videos in upload order.",
    "type": "skill",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/curriculum-builder-skill"
  },
  {
    "id": "custom-slash-commands",
    "name": "Custom Slash Commands",
    "summary": "Turn a prompt you keep re-typing into a one-word /command — a single markdown file, no code.",
    "detail": "If you find yourself typing the same instructions to an assistant over and over, save them once as a short command. From then on, typing that one word runs the whole thing.",
    "type": "slash-command",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/custom-slash-commands"
  },
  {
    "id": "deploy",
    "name": "/deploy",
    "summary": "One universal deploy command: runs the build gate, syncs docs/, commits, pushes, and verifies the live site — refusing to ship on a red build.",
    "detail": "One command that takes care of publishing a finished piece of work correctly every time: it double-checks nothing is broken, saves the changes, and puts the update live — refusing to publish if something looks wrong.",
    "type": "slash-command",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/deploy"
  },
  {
    "id": "devil",
    "name": "/devil",
    "summary": "Argues the strongest case against your idea, so you see the holes before anyone else does.",
    "detail": "Deliberately argues against your own idea as hard as it can, so you find the holes in your thinking before someone else does.",
    "type": "slash-command",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/devil"
  },
  {
    "id": "eli5",
    "name": "/eli5",
    "summary": "Explains anything in plain language — the way you would for someone with zero background.",
    "detail": "Breaks down anything — technical or not — into plain language a total beginner could follow, the way you'd explain it to a curious kid.",
    "type": "slash-command",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/eli5"
  },
  {
    "id": "extended-thinking",
    "name": "Extended Thinking (think / ultrathink)",
    "summary": "Make Claude reason longer before answering — one keyword for a single hard question, one dial for a whole hard session.",
    "detail": "Tells the assistant to slow down and think longer before answering a hard question, or to stay in that more careful mode for an entire difficult project.",
    "type": "cli-feature",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/extended-thinking"
  },
  {
    "id": "few-shot-prompting",
    "name": "Few-Shot Examples",
    "summary": "Show Claude 3-5 worked examples of the output you want instead of describing it — the examples become the spec.",
    "detail": "Instead of describing what you want in words, you show 3–5 real examples of it — the assistant learns the pattern from the examples themselves, which is often clearer than any explanation.",
    "type": "prompt-pattern",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/few-shot-prompting"
  },
  {
    "id": "frontend-design",
    "name": "frontend-design",
    "summary": "Pushes Claude to build distinctive, production-grade UI with a bold aesthetic point of view — instead of generic 'AI slop' (Inter, purple gradients, safe layouts).",
    "detail": "Pushes an AI-built interface to actually look distinctive and considered, instead of the generic, forgettable look most AI-generated designs default to.",
    "type": "skill",
    "level": "intermediate",
    "url": "https://instar-kb.vercel.app/c/frontend-design"
  },
  {
    "id": "gamified-habit-dashboard",
    "name": "Gamified Habit Dashboard",
    "summary": "Turn daily consistency into a points, streaks, and levels dashboard that makes your minimum viable day visible and rewarding.",
    "detail": "Turns the boring-but-important things you do every day into a simple dashboard of points, streaks, and levels, so progress toward a habit is visible instead of invisible.",
    "type": "prompt-pattern",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/gamified-habit-dashboard"
  },
  {
    "id": "ghost",
    "name": "/ghost",
    "summary": "Rewrites your text to read like a human wrote it, stripping out the obvious AI tells.",
    "detail": "Smooths over the telltale patterns that make writing sound obviously AI-generated, so the result reads like it came from a person.",
    "type": "slash-command",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/ghost"
  },
  {
    "id": "git-worktrees-parallel",
    "name": "Parallel Sessions with Git Worktrees",
    "summary": "Run multiple Claude Code sessions on the same repo at once — each in its own checkout on its own branch — so parallel edits never collide.",
    "detail": "Lets you work on the same project in more than one place at once — like two separate drafts side by side — without one set of changes overwriting the other.",
    "type": "workflow",
    "level": "advanced",
    "url": "https://instar-kb.vercel.app/c/git-worktrees-parallel"
  },
  {
    "id": "godmode",
    "name": "/godmode",
    "summary": "Tells Claude to be as thorough as possible, covering every angle of the question in one go.",
    "detail": "Asks the assistant to be exhaustive: cover every relevant angle of a question in one pass instead of the usual shorter answer.",
    "type": "slash-command",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/godmode"
  },
  {
    "id": "headless-mode",
    "name": "Headless Mode (claude -p)",
    "summary": "Run Claude Code from a script — one command in, the answer out, no interactive session — so cron jobs and shell pipelines can use Claude.",
    "detail": "Runs the assistant without the usual back-and-forth chat window — you send it one instruction from a script, it does the work, and hands back the result. Useful for automating things on a schedule.",
    "type": "cli-feature",
    "level": "intermediate",
    "url": "https://instar-kb.vercel.app/c/headless-mode"
  },
  {
    "id": "hooks",
    "name": "Hooks",
    "summary": "Run your own shell commands automatically at lifecycle moments — guaranteed every time, not 'if Claude remembers'.",
    "detail": "Lets you attach your own automatic action to a specific moment — for example, \"always run this check right before anything gets saved\" — so the step happens every time, not just when someone remembers.",
    "type": "hook",
    "level": "intermediate",
    "url": "https://instar-kb.vercel.app/c/hooks"
  },
  {
    "id": "infographic-command",
    "name": "/infographic",
    "summary": "One command that builds an interactive, accurate, self-contained medical infographic from any consult, app, PDF, or topic — then runs a single point → glance → approve loop: it builds, self-checks, opens it in your browser, and ships on your word (or one round of plain-English notes).",
    "detail": "Turns any piece of clinical material — a note, a consult, a topic — into a finished, interactive visual explainer in one step, then shows it to you before anything is considered done.",
    "type": "slash-command",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/infographic-command"
  },
  {
    "id": "infographic",
    "name": "InfoKitt — Interactive Medical Infographics",
    "summary": "Turns any clinical source — a myMedKitt consult, one of your apps, a PDF, or a topic you type — into a single, self-contained interactive medical infographic: live dose calculators, safety guards, reactive toggles, and a 'You are here' tracker, all in one offline file.",
    "detail": "Builds a self-contained visual guide out of any clinical source — complete with built-in calculators and safety checks — so a complicated topic becomes something you can actually navigate at a glance.",
    "type": "skill",
    "level": "intermediate",
    "url": "https://instar-kb.vercel.app/c/infographic"
  },
  {
    "id": "kittech-brand",
    "name": "Kittech Brand",
    "summary": "Ports one app's design system onto every other app you own — tokens, components, flow, and stack — with an executable audit that fails the build when an app drifts off brand.",
    "detail": "Takes the exact look and feel of one finished app — its colors, fonts, layout rules — and applies it consistently to every other app, with an automatic check that flags anything that's drifted off-brand.",
    "type": "skill",
    "level": "intermediate",
    "url": "https://instar-kb.vercel.app/c/kittech-brand"
  },
  {
    "id": "l99",
    "name": "/L99",
    "summary": "Pushes Claude to its highest expert level — no simplifying, nothing dumbed down.",
    "detail": "Answers at full expert depth with nothing dumbed down — for when you already know the basics and want the real answer, not the simplified one.",
    "type": "slash-command",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/l99"
  },
  {
    "id": "legal-audit",
    "name": "/legal-audit",
    "summary": "Louis Litt — an autopilot audit that checks clinical consults for FDA CDS compliance, fixes citations/disclaimers itself, and reports only what changed.",
    "detail": "An automatic reviewer (nicknamed Louis Litt) that checks clinical write-ups for proper sourcing and required legal language, fixes what it finds, and reports back only what actually changed.",
    "type": "skill",
    "level": "advanced",
    "url": "https://instar-kb.vercel.app/c/legal-audit"
  },
  {
    "id": "live-progress-page",
    "name": "Live Progress Page",
    "summary": "Have Claude keep a single timestamped HTML log — with screenshots and media — that updates as it works, so you can watch a long job instead of waiting for the dump at the end.",
    "detail": "For a long-running task, instead of waiting silently for a final result, it keeps a running, updating log with screenshots — so you can watch the work happen instead of just waiting.",
    "type": "prompt-pattern",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/live-progress-page"
  },
  {
    "id": "llm-council",
    "name": "/llm-council",
    "summary": "Runs a decision through 5 independent AI advisors who debate, anonymously peer-review each other, and return one synthesized verdict.",
    "detail": "Puts a hard decision in front of five independent AI \"advisors\" who each weigh in, quietly critique each other's reasoning, and hand back one combined recommendation — a second-opinion panel on demand.",
    "type": "skill",
    "level": "intermediate",
    "url": "https://instar-kb.vercel.app/c/llm-council"
  },
  {
    "id": "loops",
    "name": "Loops (/loop)",
    "summary": "Run a prompt or slash command on a recurring interval inside one live session that keeps its context between wakes.",
    "detail": "Tells the assistant to repeat a task on a schedule — say, every five minutes — while staying in the same ongoing session, so it remembers what it already checked last time.",
    "type": "workflow",
    "level": "intermediate",
    "url": "https://instar-kb.vercel.app/c/loops"
  },
  {
    "id": "mcp-servers",
    "name": "MCP Servers",
    "summary": "Plug external tools — a real browser, a scraper, a database, Slack — into Claude Code so it can act on those systems directly instead of working from what you paste.",
    "detail": "Plugs an assistant into real outside tools — a web browser, a database, a messaging app — so it can actually take action in those places instead of just talking about them.",
    "type": "mcp-server",
    "level": "intermediate",
    "url": "https://instar-kb.vercel.app/c/mcp-servers"
  },
  {
    "id": "noyap",
    "name": "/noyap",
    "summary": "Cuts all preamble and filler, so Claude gives the answer first and nothing you don't need.",
    "detail": "Skips all the throat-clearing and gives you the answer first, with nothing extra tacked on.",
    "type": "slash-command",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/noyap"
  },
  {
    "id": "ooda",
    "name": "/OODA",
    "summary": "Works the problem through Observe, Orient, Decide, Act — a fast loop for deciding under pressure.",
    "detail": "A fast four-step way of working through a decision under pressure: look at what's happening, figure out what it means, decide, then act.",
    "type": "slash-command",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/ooda"
  },
  {
    "id": "output-styles",
    "name": "Output Styles",
    "summary": "Change the role, tone, and format Claude answers in — turn the coding assistant into a teacher, a writer, or a diagram-first explainer.",
    "detail": "Changes the voice the assistant answers in — from a coding assistant to a patient teacher, a copy editor, or a diagram-first explainer — to match how you actually want the answer delivered.",
    "type": "cli-feature",
    "level": "intermediate",
    "url": "https://instar-kb.vercel.app/c/output-styles"
  },
  {
    "id": "permission-modes",
    "name": "Permission Modes & Allowlists",
    "summary": "Decide once what Claude Code may do without asking — and wall off what it must never touch — instead of approving every action by hand.",
    "detail": "Lets you set the rules once for what an assistant is allowed to do on its own versus what it must always ask permission for first, instead of approving every single action by hand.",
    "type": "cli-feature",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/permission-modes"
  },
  {
    "id": "persistent-memory",
    "name": "Persistent Memory",
    "summary": "Claude writes its own notes to disk so what it learned about your project on Tuesday is still there on Wednesday.",
    "detail": "The assistant keeps its own notes between sessions, so something it learned about a project on Tuesday is still known on Wednesday, without you having to re-explain it.",
    "type": "concept",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/persistent-memory"
  },
  {
    "id": "persona",
    "name": "/persona",
    "summary": "Locks Claude into one expert role for the whole chat, so every answer comes from that view.",
    "detail": "Locks the assistant into a single expert point of view for an entire conversation, so every answer stays consistent with that role.",
    "type": "slash-command",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/persona"
  },
  {
    "id": "pitch",
    "name": "/pitch",
    "summary": "Turns any idea into a tight 30-second investor pitch, framed to land with a busy decision-maker.",
    "detail": "Compresses any idea into a tight, 30-second pitch built to land with someone busy who needs to make a quick call.",
    "type": "slash-command",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/pitch"
  },
  {
    "id": "plan-mode",
    "name": "Plan Mode",
    "summary": "Make Claude explore and propose a written plan before it touches a single file.",
    "detail": "Forces the assistant to lay out its plan in writing and get your sign-off before it changes a single thing — so you approve the approach, not just the result.",
    "type": "cli-feature",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/plan-mode"
  },
  {
    "id": "plugins",
    "name": "Plugins",
    "summary": "Bundle skills, agents, hooks, and MCP servers into one installable package you can share across machines and teammates via a marketplace.",
    "detail": "Bundles a set of shortcuts, tools, and automatic behaviors into one shareable package, so a whole setup can be installed on another computer — or handed to someone else — in one step.",
    "type": "plugin",
    "level": "intermediate",
    "url": "https://instar-kb.vercel.app/c/plugins"
  },
  {
    "id": "premortem",
    "name": "/premortem",
    "summary": "Assumes your plan already failed, then works backwards to find why it went wrong.",
    "detail": "Pretends the plan already failed, then works backward to figure out why — a way to catch a doomed plan before you've spent any time on it.",
    "type": "slash-command",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/premortem"
  },
  {
    "id": "prompt-forge",
    "name": "/prompt-forge",
    "summary": "Turns a rough idea into a production-grade prompt through a gap-scan interview, a rubric-gated draft, and an in-session smoke test — then files it for reuse.",
    "detail": "Walks you through turning a rough idea into a well-built, reusable instruction for an AI assistant — asking clarifying questions, drafting it, testing it, and saving the finished version for later.",
    "type": "skill",
    "level": "intermediate",
    "url": "https://instar-kb.vercel.app/c/prompt-forge"
  },
  {
    "id": "punch",
    "name": "/punch",
    "summary": "Cuts your text by ~40% and tightens what's left, so every line lands harder.",
    "detail": "Cuts a piece of writing by roughly 40% and tightens what's left, so every remaining sentence lands harder.",
    "type": "slash-command",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/punch"
  },
  {
    "id": "review",
    "name": "/review",
    "summary": "A weekly self-improvement agent that reads claude-brain + your memory logs, surfaces the patterns that keep recurring, and proposes one concrete next action for each — read-only and propose-only, so you stay the decision-maker.",
    "detail": "A weekly check-in that reads back through your own notes and history, spots patterns worth noticing, and suggests one concrete next step for each — it only proposes, it never acts on its own.",
    "type": "skill",
    "level": "intermediate",
    "url": "https://instar-kb.vercel.app/c/review"
  },
  {
    "id": "safeguard",
    "name": "/safeguard",
    "summary": "Hardens a project against secret leaks in one pass: gitignore rules, a pre-commit hook, safe test environment configuration, and an audit of what's already tracked.",
    "detail": "A one-pass security check for a project: makes sure private files won't accidentally get shared, sets up an automatic block before anything sensitive is saved, and reviews what's already exposed.",
    "type": "slash-command",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/safeguard"
  },
  {
    "id": "save-plan-implement",
    "name": "Save Plan, Implement Plan",
    "summary": "Plan in one session, save the approved plan to a file, then build it in a fresh session that starts at full context.",
    "detail": "Splits big work into two clean sessions: plan first and save the approved plan to a file, then start a fresh session that builds exactly that plan without carrying over clutter.",
    "type": "workflow",
    "level": "intermediate",
    "url": "https://instar-kb.vercel.app/c/save-plan-implement"
  },
  {
    "id": "scheduled-agents",
    "name": "Scheduled Agents (Routines)",
    "summary": "Run Claude on a clock — recurring cloud routines via /schedule, or a crontab line that fires claude -p headlessly while you sleep.",
    "detail": "Runs an assistant on a timer — a recurring task that fires on its own schedule, even while you're away from the computer, whether hosted in the cloud or on your own machine.",
    "type": "workflow",
    "level": "intermediate",
    "url": "https://instar-kb.vercel.app/c/scheduled-agents"
  },
  {
    "id": "scout",
    "name": "/scout",
    "summary": "Scans any plan for hidden risks and blind spots, flagging the problems you're likely to miss.",
    "detail": "Reads through a plan looking specifically for the risks and blind spots that are easy to miss when you wrote it yourself.",
    "type": "slash-command",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/scout"
  },
  {
    "id": "security-audit",
    "name": "/security-audit",
    "summary": "Scans a web app against a 9-point checklist (RLS, auth, rate limits, secrets, CORS/CSP…) and returns a graded PASS/FAIL/WARN list with concrete fixes.",
    "detail": "Runs a web app through a 9-point safety checklist — login security, data protection, spam prevention, and more — and hands back a pass/fail list with exactly what to fix.",
    "type": "skill",
    "level": "intermediate",
    "url": "https://instar-kb.vercel.app/c/security-audit"
  },
  {
    "id": "self-verifying-loop",
    "name": "The Self-Verifying Loop",
    "summary": "Make “done” mean “the checks passed,” not “the code was written” — a Stop hook reruns your tests every time Claude tries to finish, and sends it back until they're green.",
    "detail": "Changes what \"finished\" means: instead of the assistant deciding it's done, an automatic test has to actually pass first — if it fails, the assistant is sent back to try again.",
    "type": "workflow",
    "level": "intermediate",
    "url": "https://instar-kb.vercel.app/c/self-verifying-loop"
  },
  {
    "id": "skeptic",
    "name": "/skeptic",
    "summary": "Makes Claude challenge your question first, instead of taking it at face value and answering.",
    "detail": "Before answering, it questions whether your question is even the right one to be asking — sometimes the real problem is one step removed from what you asked.",
    "type": "slash-command",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/skeptic"
  },
  {
    "id": "steelman",
    "name": "/steelman",
    "summary": "Builds the best version of the opposing argument, so you see the other side at its strongest.",
    "detail": "Builds the strongest, most convincing version of the argument you disagree with, so you're arguing against the real thing, not a weak version of it.",
    "type": "slash-command",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/steelman"
  },
  {
    "id": "structured-build-prompt",
    "name": "Structured Build Prompt",
    "summary": "Turn a vague build request into a goal-first, parallel-agent creative brief that names the build, stack, features, behavior, mood, visuals, effects, and output format before coding starts.",
    "detail": "Turns a vague \"build me something like X\" request into a clear brief — who it's for, what it does, how it should look and feel — before any building starts, so the result actually matches what you had in mind.",
    "type": "prompt-pattern",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/structured-build-prompt"
  },
  {
    "id": "subagents",
    "name": "Subagents",
    "summary": "Hand a side task to a worker with its own context window — the search noise stays with the worker, only the summary comes back.",
    "detail": "Hands off a side task to a separate helper that does its own digging and reports back just the answer — keeping the messy search-and-check work out of your main conversation.",
    "type": "subagent",
    "level": "intermediate",
    "url": "https://instar-kb.vercel.app/c/subagents"
  },
  {
    "id": "sync-context",
    "name": "/sync-context",
    "summary": "Refreshes the Context Brief at the top of your global CLAUDE.md from claude-brain — additive only, so it never overwrites your other rules.",
    "detail": "Refreshes the running summary at the top of your rules file with what's actually current, without touching or erasing anything else written there.",
    "type": "slash-command",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/sync-context"
  },
  {
    "id": "teach-review-loop",
    "name": "The Teach + Review Loop",
    "summary": "One pattern — remember what happened, use it to generate the next thing — deployed twice: a tutor that compounds your learning, and a weekly agent that reads your own history and proposes what to fix or learn next.",
    "detail": "The same trick used twice: remember what happened last time, and use that memory to decide what comes next — once as a tutor that builds on what you've learned, and once as a weekly self-review that suggests what to fix.",
    "type": "concept",
    "level": "intermediate",
    "url": "https://instar-kb.vercel.app/c/teach-review-loop"
  },
  {
    "id": "teach",
    "name": "/teach",
    "summary": "Turns any topic into a tracked mini-course that resumes from saved state — teaches one concept just past what you know, gives an exercise and a recall quiz, and picks up exactly where you left off next time.",
    "detail": "Turns any topic into a personal mini-course that remembers where you left off — each session teaches one notch past what you already know, gives you something to practice, and quizzes you on it.",
    "type": "skill",
    "level": "intermediate",
    "url": "https://instar-kb.vercel.app/c/teach"
  },
  {
    "id": "travel-audit",
    "name": "/travel-audit",
    "summary": "Steve Irwin — audits a travel-medicine app against live WHO/CDC/ECDC/ProMED alerts, region by region, and flags outdated info or new threats.",
    "detail": "An automatic reviewer (nicknamed Steve Irwin) that checks a travel-medicine app against live health alerts from the WHO and CDC, region by region, and flags anything that's gone out of date.",
    "type": "skill",
    "level": "advanced",
    "url": "https://instar-kb.vercel.app/c/travel-audit"
  },
  {
    "id": "uda",
    "name": "/UDA",
    "summary": "Runs a military-style root-cause analysis, breaking the problem down from every angle.",
    "detail": "A structured, methodical way of digging into why something went wrong — the military approach to root-cause analysis, applied to any problem.",
    "type": "slash-command",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/uda"
  },
  {
    "id": "ultracode-workflows",
    "name": "Ultracode Multi-Agent Workflows",
    "summary": "Type one keyword and Claude Code fans out dozens of coordinated subagents — finders, skeptics, judges — for jobs too big for one context window.",
    "detail": "For jobs too large for one assistant to handle alone, this fans the work out to dozens of coordinated helpers at once — some finding information, some double-checking it, some judging the results — all working in parallel.",
    "type": "workflow",
    "level": "advanced",
    "url": "https://instar-kb.vercel.app/c/ultracode-workflows"
  },
  {
    "id": "ultrathink",
    "name": "/ultrathink",
    "summary": "Forces Claude to reason at full depth before answering — a considered response, not a reflex.",
    "detail": "Forces the assistant to reason through a question at maximum depth before answering, instead of giving the first reasonable-sounding response.",
    "type": "slash-command",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/ultrathink"
  },
  {
    "id": "xml-tags",
    "name": "XML Tags",
    "summary": "Wrap each part of a prompt — instructions, data, examples — in named tags so Claude never confuses one for another.",
    "detail": "Wraps each piece of an instruction — the task, the data, the examples — in its own labeled section, so the assistant never confuses one part for another.",
    "type": "prompt-pattern",
    "level": "beginner",
    "url": "https://instar-kb.vercel.app/c/xml-tags"
  }
];
