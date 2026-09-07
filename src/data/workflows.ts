export const WORKFLOWS = [
  { id: 'first-app', name: 'Turn an idea into a first app', audience: 'Start here · Beginner', outcome: 'A small, testable brief before you start building.', source: 'structured-build-prompt', prompt: `Help me turn this idea into a small, useful app: [YOUR IDEA].
The person using it is [AUDIENCE]. Their main problem is [PROBLEM].
Ask me one question at a time to clarify the outcome and the most important interaction.
Then write a short brief: purpose, essential features, user flow, visual direction, and how we will verify it works.
Prefer the simplest maintainable implementation. Identify any paid services or private data needs before proceeding.
Build the agreed scope and verify the primary user journey. Explain what I can try next in plain English.` },
  { id: 'curriculum', name: 'Turn a source library into a course', audience: 'Learning · Beginner', outcome: 'Ordered lessons, original notes, and practice that proves learning.', source: 'curriculum-builder-skill', prompt: `Build a mastery curriculum from [CHANNEL, PLAYLIST, OR EDUCATIONAL WEBSITE].
I am starting at [CURRENT LEVEL] and want to be able to [SPECIFIC SKILL].
Inventory the source material. Sequence the useful lessons by prerequisites, not upload date.
Link to original sources and verified timestamps. Paraphrase teaching points; do not republish transcripts.
For each module, provide objectives, practice drills, and a concrete skill sign-off.
Flag missing evidence and obtain expert review for high-stakes content.
Ask before paid transcription or large model runs. Deliver a readable curriculum first.` },
  { id: 'handoff', name: 'Pick up where you left off', audience: 'Building · Beginner', outcome: 'A short handoff that keeps the next session grounded.', source: 'sync-context', prompt: `Create a concise handoff for this project using the work we actually completed.
Include: the goal, decisions made, changed files, what was verified, unresolved issues, and the next concrete action.
Separate facts from assumptions. Do not include credentials, private data, or unnecessary conversation history.
Make it specific enough that a new session can continue without repeating the investigation.` },
  { id: 'review', name: 'Review a build before sharing it', audience: 'Quality · Intermediate', outcome: 'An evidence-backed list of things that work and things to fix.', source: 'self-verifying-loop', prompt: `Review [PROJECT] against its intended user journey: [JOURNEY].
Inspect the implementation and existing instructions first.
Check the main flow, empty and error states, keyboard access, phone layout, and any privacy boundaries.
Run the relevant existing checks. Record evidence for each finding and distinguish confirmed failures from concerns.
Fix clear, reversible defects within the agreed scope. Ask before destructive changes or publishing.
Report what passed, what remains unresolved, and the exact next action.` },
  { id: 'visual-teaching', name: 'Turn teaching notes into a visual tool', audience: 'Teaching · Intermediate', outcome: 'A structured visual outline with traceable sources.', source: 'infographic', prompt: `Turn this teaching material into a clear visual learning tool: [MATERIAL].
Identify the learner, the decision or concept, and the essential sequence.
Create an editable content specification before styling it. Separate source facts, interpretation, and missing information.
Preserve citations and uncertainty. Do not invent clinical thresholds or recommendations; flag those for expert review.
Use a readable hierarchy, a concise overview, and optional deeper explanations.
Verify that the final visual agrees with the source and remains legible on the intended screen.` },
  { id: 'automation', name: 'Design a repeatable automation', audience: 'Automation · Intermediate', outcome: 'A workflow with clear inputs, checkpoints, and recovery.', source: 'scheduled-agents', prompt: `Help me make this recurring task reliable: [TASK].
Describe its trigger, required inputs, steps, expected output, and owner.
Identify where it needs human approval, how to avoid duplicate actions, and how to recover from failure.
Keep credentials outside prompts and logs. Do not send messages, spend money, or change production without authorization.
Start with a manual dry run. Define a useful success check and failure report before proposing a schedule.` },
  { id: 'explain', name: 'Understand a technical idea', audience: 'Learning · Beginner', outcome: 'A plain-language explanation connected to something familiar.', source: 'eli5', prompt: `Explain [CONCEPT] to someone who understands [FAMILIAR DOMAIN] but is new to this topic.
Start with a concrete example. Define unfamiliar terms when they first appear.
Show what goes in, what happens, and what comes out. Explain where the analogy stops being accurate.
Finish with one small exercise and a question that checks whether I understood.` },
  { id: 'source-answer', name: 'Ask your own project collection', audience: 'Knowledge · Intermediate', outcome: 'An answer with a source and a way to find the original.', source: 'ask-my-apps', prompt: `Find the answer to [QUESTION] in my authorized project files.
Use the project index and relevant documentation first. Do not read secrets or personal records.
Return the most relevant source, a concise answer grounded in it, and a link or file reference to the original.
If the sources disagree or the answer is absent, say so. Do not fill gaps from memory or imply that an unverified answer is established.` },
];
