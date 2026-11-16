import { PROJECTS, CATEGORIES, FEATURED_CLINICAL_TOOL_IDS, FEATURED_LEARNING_IDS, isOpenableProject, orderFeaturedProjects, type Project } from '../data/studio-catalog.js';

const esc = (s: string): string => s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
const arrow = '<span aria-hidden="true">↗</span>';
function openLink(url: string, label: string): string {
  return `<a class="hub-link" href="${esc(url)}"${url.startsWith('https:') ? ' target="_blank" rel="noopener noreferrer"' : ''}>${esc(label)} ${arrow}</a>`;
}
const reviewLink = '<a class="hub-link" href="mailto:kittechsix@gmail.com?subject=Application%20review%20request">Email kittechsix@gmail.com to request an application review →</a>';
function card(p: Project): string {
  const openAction = isOpenableProject(p) && p.url
    ? openLink(p.url, p.status === 'Available' ? 'Open' : 'Request access')
    : reviewLink;
  return `<article class="hub-card"><div class="hub-card-top"><span class="hub-kicker">${esc(p.category)}</span><span class="hub-status">${esc(p.status)}</span></div><a class="hub-card-title" href="#/projects/${esc(p.id)}">${p.icon ? `<img src="${esc(p.icon)}" alt="" width="42" height="42" loading="lazy">` : ''}<h3>${esc(p.name)}</h3><span aria-hidden="true">↗</span></a><p>${esc(p.summary)}</p><details class="hub-more"><summary>What is this? <span class="hub-more-plus" aria-hidden="true">+</span></summary><p>${esc(p.description)}</p></details><div class="hub-card-bottom"><a href="#/projects/${esc(p.id)}">View explanation <span aria-hidden="true">→</span></a>${openAction}</div></article>`;
}
function section(parent: HTMLElement, content: string, extra = ''): HTMLElement {
  const el = document.createElement('section'); el.className = 'hub ' + extra; el.innerHTML = content; parent.appendChild(el); return el;
}
function header(kicker: string, title: string, desc: string): string {
  return `<header class="hub-page-head"><p class="hub-kicker">${kicker}</p><h1>${title}</h1><p class="hub-intro">${desc}</p></header>`;
}
export function renderHub(parent: HTMLElement): void {
  document.title = 'Kittech-Six — Andy Kitlowski’s building collection';
  const el = section(parent, `
    <div class="hub-edition"><span>Andy Kitlowski, MD · Austin, Texas</span><span>A working collection / September 2026</span></div>
    <header class="hub-cover"><div><p class="hub-kicker">Medicine. Teaching. Making things.</p><h1>Useful things.<br><em>Built to be used.</em></h1><p class="hub-intro">I’m Andy, an emergency physician who builds software, teaches medicine, and experiments with AI. This is where it all comes together. Find a tool, explore a lecture, or borrow a workflow.</p><a class="hub-primary" href="#/projects">Explore the collection <span aria-hidden="true">↗</span></a></div><aside class="hub-author"><img src="assets/andy-kitlowski-profile-20261103.png" alt="Andy Kitlowski, emergency physician and builder" width="320" height="380"><div><span class="hub-kicker">The person behind the projects</span><p>From the bedside<br>to the build.</p><a href="#/about">Meet Andy →</a></div></aside></header>
    <div class="hub-start"><a href="#/projects/category/Clinical%20tools"><span>01 / Find something useful</span><strong>Clinical tools for the bedside</strong><span aria-hidden="true">↗</span></a><a href="#/learn"><span>02 / Learn something</span><strong>Lectures & guided learning</strong><span aria-hidden="true">↗</span></a></div>
    <div class="hub-section-label"><h2>A few places to start</h2><a href="#/projects">All ${PROJECTS.length} projects →</a></div><div class="hub-grid">${['mymedkitt','myvertigoapp','acidbase','mystroke-kitt','electrokitt','echokitt'].map(id => card(PROJECTS.find(p => p.id === id)!)).join('')}</div>
    <div class="hub-process-tease"><span class="hub-kicker">The work behind the work</span><h2>A problem. A prototype.<br>A better way to do it.</h2><div><p>The apps are only part of the story. The reusable skills, teaching systems, and automation that produce them belong here too.</p><a class="hub-link" href="#/how-i-build">See how I build →</a></div></div>
    <div class="hub-section-label"><h2>Find your next useful thing</h2><span>${PROJECTS.length} projects</span></div><form class="hub-home-search"><label for="home-search">Search the collection</label><div><input id="home-search" name="q" type="search" placeholder="Try lectures, ultrasound, or a clinical topic"><button class="hub-primary" type="submit">Search →</button></div></form>
  `, 'hub-home');
  el.querySelector('form')!.addEventListener('submit', e => { e.preventDefault(); const q = el.querySelector<HTMLInputElement>('input')!.value.trim(); location.hash = '/projects/search/' + encodeURIComponent(q || 'all'); });
}
export function renderDirectory(parent: HTMLElement, category = 'All projects', initial = ''): void {
  document.title = 'Projects — Kittech-Six';
  const el = section(parent, header('The complete collection', 'Find something useful.', 'Clinical tools, everyday experiments, teaching projects, and the systems that connect them. Explore the work or open a featured app.') + `
    <div class="hub-controls"><label for="project-search">Search projects</label><input id="project-search" type="search" placeholder="Search by name, problem, or topic" value="${esc(initial === 'all' ? '' : initial)}"><div class="hub-filters" role="group" aria-label="Project categories">${CATEGORIES.map(c => `<button type="button" data-category="${esc(c)}" aria-pressed="${c === category}">${esc(c)}</button>`).join('')}</div><div class="hub-resultbar"><span id="result-count" role="status" aria-live="polite"></span><label class="hub-checkbox"><input type="checkbox" id="available-only"> Available to open</label></div></div><div class="hub-grid" id="project-results"></div><p class="hub-note">Clinical projects are for clinician education and decision support. Development and access labels describe availability, not clinical validation.</p><p class="hub-note hub-access-note">Clinical tools shown in this section are the featured set. Other apps and projects remain available in Browse every project as explanations only. ${reviewLink}</p>`);
  let selected = CATEGORIES.includes(category) ? category : 'All projects';
  const search = el.querySelector<HTMLInputElement>('#project-search')!;
  const available = el.querySelector<HTMLInputElement>('#available-only')!;
  const update = (): void => {
    const terms = search.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
    const categoryItems = selected === 'Clinical tools'
      ? orderFeaturedProjects(PROJECTS.filter(p => p.category === selected && FEATURED_CLINICAL_TOOL_IDS.includes(p.id as typeof FEATURED_CLINICAL_TOOL_IDS[number])), FEATURED_CLINICAL_TOOL_IDS)
      : PROJECTS.filter(p => selected === 'All projects' || p.category === selected);
    const items = categoryItems.filter(p => (!available.checked || isOpenableProject(p)) && terms.every(t => `${p.name} ${p.summary} ${p.description} ${p.category} ${p.status}`.toLowerCase().includes(t)));
    el.querySelector('#result-count')!.textContent = `${items.length} ${items.length === 1 ? 'project' : 'projects'}`;
    el.querySelector('#project-results')!.innerHTML = items.length ? items.map(card).join('') : '<div class="hub-empty"><h2>No projects match yet.</h2><p>Try a broader term or clear the filters.</p><button type="button" class="hub-primary" data-reset>Reset search</button></div>';
    el.querySelector('[data-reset]')?.addEventListener('click', () => { search.value = ''; selected = 'All projects'; available.checked = false; sync(); search.focus(); });
  };
  const sync = (): void => { el.querySelectorAll<HTMLButtonElement>('[data-category]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.category === selected))); update(); };
  search.addEventListener('input', update); available.addEventListener('change', update);
  el.querySelectorAll<HTMLButtonElement>('[data-category]').forEach(b => b.addEventListener('click', () => { selected = b.dataset.category!; sync(); })); sync();
}
export function renderProject(parent: HTMLElement, id: string): void {
  const p = PROJECTS.find(x => x.id === id);
  if (!p) { section(parent, header('Project not found', 'Let’s get you back to the collection.', 'That link may have changed.') + '<a class="hub-primary" href="#/projects">Explore projects →</a>'); return; }
  document.title = `${p.name} — Kittech-Six`;
  const peers = PROJECTS.filter(x => x.category === p.category && x.id !== p.id).slice(0,3);
  const projectAction = isOpenableProject(p) && p.url ? openLink(p.url, p.status === 'Available' ? 'Open '+p.name : 'Request access') : `<p class="hub-note">This project is shown as an explanation only. ${reviewLink}</p>`;
  section(parent, `<a class="hub-back" href="#/projects">← All projects</a>` + header(esc(p.category) + ' / ' + esc(p.status), esc(p.name), esc(p.summary)) + `<div class="hub-project-body"><div><h2>What it is</h2><p>${esc(p.description)}</p><div class="hub-actions">${projectAction}${p.detail ? openLink(p.detail, 'Overview & interactive tour') : ''}</div>${p.category === 'Clinical tools' ? '<p class="hub-note">For clinician education and decision support. Use professional judgment and consult the source material. A project listing is not a clinical validation claim.</p>' : ''}</div><aside><span class="hub-kicker">In the collection</span><dl><dt>Area</dt><dd>${esc(p.category)}</dd><dt>Availability</dt><dd>${esc(p.status)}</dd><dt>Catalog reviewed</dt><dd>October 26, 2026</dd></dl></aside></div><div class="hub-section-label"><h2>Keep exploring</h2></div><div class="hub-grid">${peers.map(card).join('')}</div>`);
}
export function renderLearning(parent: HTMLElement): void {
  document.title = 'Lectures & Learning — Kittech-Six';
  const learning = orderFeaturedProjects(PROJECTS.filter(p => p.category === 'Lectures & learning'), FEATURED_LEARNING_IDS);
  section(parent, header('The teaching collection', 'Learn it. Practice it.<br>Make it stick.', 'Case-based lectures, procedural learning, and courses for people who want to build with AI.') + `<div class="hub-section-label"><h2>Lectures & learning tools</h2><span>Featured teaching first, then the rest of the collection</span></div><div class="hub-grid">${learning.map(card).join('')}</div><p class="hub-note hub-access-note">The featured lectures and courses above can be opened. Other teaching projects are available here as explanations only. ${reviewLink}</p>`);
}
export function renderProcess(parent: HTMLElement): void {
  document.title = 'How I Build — Kittech-Six';
  const steps = [
    ['Notice the friction', 'Start with a problem worth removing.', 'A recurring bedside decision, a lecture trapped in slides, or a task that keeps being done by hand. Define the person, the problem, and what a useful result looks like.'],
    ['Make the plan portable', 'Write down the intent.', 'A short brief captures the scope, decisions, constraints, and verification plan. Shared project context makes the handoff between tools deliberate.'],
    ['Build the smallest useful version', 'Give the idea a working shape.', 'Use AI coding tools to turn the brief into a prototype. Reuse the design system, keep content structured, and make the main user journey work first.'],
    ['Check the work', 'Evidence before confidence.', 'Inspect sources, test behavior, review the interface, and check the result against the brief. Clinical material needs professional review and traceable evidence.'],
    ['Make it repeatable', 'Keep the method, not just the result.', 'Capture reusable prompts, skills, and project notes. Automate recurring steps only when inputs, permissions, failure handling, and outputs are clear.'],
    ['Share what helps', 'Put useful work within reach.', 'Publish suitable apps, lectures, and explainers. Bring their entry points back into this collection so a new project is easier to find.'],
  ];
  section(parent, header('Inside the workshop', 'The apps are the output.<br>The workflow is reusable.', 'A physician’s approach to building: start with a real problem, make the reasoning visible, check the result, and keep improving the process.') + `<ol class="hub-steps">${steps.map((s,i) => `<li><span class="hub-step-number">0${i+1}</span><div><p class="hub-kicker">${s[0]}</p><h2>${s[1]}</h2><p>${s[2]}</p></div></li>`).join('')}</ol>`);
}
export function renderProfile(parent: HTMLElement): void {
  document.title = 'Andy Kitlowski — Physician, Educator & Builder';
    section(parent, header('The person behind Kittech-Six', 'Physician. Educator.<br>Prolific tinkerer.', 'I’m Andy Kitlowski, an emergency physician in Austin, Texas. I build tools for problems I understand firsthand, then turn the useful parts into something other people can use.') + `<div class="hub-profile"><img src="assets/andy-kitlowski-profile-20261103.png" alt="Andy Kitlowski" width="320" height="380"><div><p class="hub-kicker">A practice that keeps expanding</p><h2>From teaching medicine<br>to building the tools.</h2><p>More than 15 years of emergency medicine teaching and simulation shaped the way I work: make the important decision clear, show the reasoning, and give people a chance to practice.</p><p>AI expanded what I could build. Clinical apps sit alongside lecture decks, learning platforms, mobile experiments, and the automation that ties the work together.</p><p>This collection is my working portfolio. Some projects are ready to use. Others are prototypes, internal systems, or ideas still taking shape. Each has a place here.</p></div></div><div class="hub-section-label"><h2>Experience, shown through the work</h2></div><div class="hub-grid"><article class="hub-card"><p class="hub-kicker">Clinical product design</p><h3>Reasoning made usable</h3><p>Clinical workflows, mobile interfaces, and source-aware decision support.</p><a class="hub-link" href="#/projects/category/Clinical%20tools">Explore clinical projects →</a></article><article class="hub-card"><p class="hub-kicker">Education & simulation</p><h3>Learning beyond the slide</h3><p>Case-based teaching, interactive lectures, and curricula with practice and sign-offs.</p><a class="hub-link" href="#/learn">Explore the teaching →</a></article><article class="hub-card"><p class="hub-kicker">AI-assisted development</p><h3>A repeatable way to build</h3><p>Structured briefs, reusable skills, project memory, and automation with verification.</p><a class="hub-link" href="#/how-i-build">Explore the process →</a></article></div>`);
}
