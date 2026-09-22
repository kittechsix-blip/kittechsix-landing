// Spin to Win — the canonical course map. A video curriculum that mirrors the
// myVertigoApp decision tree: one season per pathway, one episode per step.
//
// Quiz content is paraphrased from the audited triage references shipped with
// my-vertigo-app (safety-screen.md, timing-triggers.md, pathway-hints.md).
// Do not add numbers or rules here that are not in those files.

export type EpisodeStatus = 'planned' | 'filmed' | 'live';

export interface Episode {
  id: string;
  title: string;
  appNode: string;
  status: EpisodeStatus;
  long?: boolean;
  who: string;
  links: { youtube?: string; instagram?: string; tiktok?: string; facebook?: string };
  note?: string;
}

export interface Question {
  id: string;
  prompt: string;
  choices: string[];
  answer: number;
  why: string;
  appNode: string;
}

export interface Season {
  id: string;
  title: string;
  pathway: string;
  entryNode: string;
  blurb: string;
  episodes: Episode[];
  quiz: Question[];
}

export const APP_BASE = 'https://my-vertigo-app.vercel.app/workup?node=';

const ep = (id: string, title: string, appNode: string, who: string, long = false): Episode =>
  ({ id, title, appNode, status: 'planned', who, links: {}, ...(long ? { long: true } : {}) });

export const SEASONS: Season[] = [
  {
    id: 's0',
    title: 'Entrance',
    pathway: 'Screen for central features → timing & triggers',
    entryNode: 'safety-start',
    blurb: 'Every dizzy patient walks through the same front door: rule out the obvious central signs, then classify by timing and triggers instead of by what the dizziness feels like.',
    episodes: [
      ep('S0E1', 'Every dizzy patient starts here', 'safety-start', 'Andy on camera', true),
      ep('S0E2', 'The Deadly D’s in 45 seconds', 'deadly-ds', 'narrated + app'),
      ep('S0E3', 'Can’t stand, can’t leave', 'deadly-ds', 'Andy + gait demo'),
      ep('S0E4', 'The fork: constant, triggered, or spontaneous episodic', 'timing-classify', 'narrated + app'),
    ],
    quiz: [
      {
        id: 'q0-1',
        prompt: 'A dizzy patient has new slurred speech on your exam. Nothing else is abnormal. What does the safety screen say to do?',
        choices: [
          'Proceed to Dix-Hallpike, since one finding is not enough',
          'Any single positive exam sign is a hard stop: imaging and neurology, not BPPV or HINTS testing',
          'Ask one more qualifying question before deciding',
          'Reassure if the patient is under 50',
        ],
        answer: 1,
        why: 'Dysarthria is one of the Deadly D’s, and any single positive exam sign mandates imaging and neurology consultation before any BPPV or HINTS testing.',
        appNode: 'deadly-ds',
      },
      {
        id: 'q0-2',
        prompt: 'The patient walked into triage but now cannot sit on the bed edge with arms crossed. How should you read that?',
        choices: [
          'Ambulatory at triage rules out a central cause',
          'Severe truncal ataxia is cerebellar stroke until proven otherwise; re-test at the bedside, not from the triage note',
          'It is expected with any vertigo and needs no action',
          'Only matters if there is also headache',
        ],
        answer: 1,
        why: 'Severe truncal ataxia is cerebellar stroke until proven otherwise, and “the patient walked into the room” is not evidence they can walk; re-test at the bedside.',
        appNode: 'deadly-ds',
      },
      {
        id: 'q0-3',
        prompt: 'Per GRACE-3, what is the right first framing question after the safety screen?',
        choices: [
          '“Is it spinning, lightheadedness, or imbalance?”',
          '“What were you doing when it started?”',
          '“Does it feel like a stroke?”',
          '“Have you ever had this before?”',
        ],
        answer: 1,
        why: 'Classify by timing and triggers, not by the quality of the dizziness; the old vertigo vs. lightheadedness paradigm predicts central vs. peripheral poorly.',
        appNode: 'timing-classify',
      },
      {
        id: 'q0-4',
        prompt: 'Continuous dizziness for 18 hours, present while sitting perfectly still, worse with any head movement, with nausea and gait instability. Which syndrome?',
        choices: [
          'Triggered episodic (t-EVS) → BPPV pathway',
          'Spontaneous episodic (s-EVS) → mimics pathway',
          'Acute vestibular syndrome (AVS) → HINTS+ pathway',
          'Cannot classify without imaging',
        ],
        answer: 2,
        why: 'Continuous dizziness present at rest, worsened rather than triggered by head movement, is AVS; the differential is posterior-circulation stroke vs. acute unilateral vestibulopathy, so go to HINTS+.',
        appNode: 'timing-classify',
      },
      {
        id: 'q0-5',
        prompt: 'Brief spells lasting seconds when rolling over in bed, completely fine when still, no nystagmus at rest. Which syndrome?',
        choices: [
          'Triggered episodic (t-EVS) → BPPV pathway',
          'Spontaneous episodic (s-EVS) → mimics pathway',
          'Acute vestibular syndrome (AVS) → HINTS+ pathway',
          'Central positional vertigo by default',
        ],
        answer: 0,
        why: 'Very brief episodes triggered by an identifiable position change, asymptomatic when still, define t-EVS; the top differential is BPPV, then orthostatic hypotension and central positional vertigo.',
        appNode: 'timing-classify',
      },
      {
        id: 'q0-6',
        prompt: 'Discrete 20-minute episodes over the last week with no clear trigger, asymptomatic between attacks. Which syndrome?',
        choices: [
          'Triggered episodic (t-EVS) → BPPV pathway',
          'Spontaneous episodic (s-EVS) → mimics pathway',
          'Acute vestibular syndrome (AVS) → HINTS+ pathway',
          'Vestibular migraine, no further workup',
        ],
        answer: 1,
        why: 'Discrete minutes-to-hours episodes with no trigger and a well interval define s-EVS; posterior-circulation TIA sits at the top of that differential, so it routes to mimics, not straight to migraine.',
        appNode: 'timing-classify',
      },
    ],
  },
  {
    id: 's1',
    title: 'Spontaneous constant → AVS / HINTS+',
    pathway: 'Acute vestibular syndrome',
    entryNode: 'hints-start',
    blurb: 'Constant vertigo with spontaneous nystagmus. Most are vestibular neuritis, some are strokes, and a four-part bedside exam separates them better than early MRI.',
    episodes: [
      ep('S1E1', 'Who gets a HINTS exam (and who must not)', 'hints-start', 'Andy on camera', true),
      ep('S1E2', 'Kill the fixation: the paper trick', 'paper-trick', 'Andy + glasses POV'),
      ep('S1E3', 'Nystagmus: the only one you need to read', 'nyst-start', 'narrated + app'),
      ep('S1E4', 'Test of skew in 20 seconds', 'skew-start', 'Andy + glasses POV'),
      ep('S1E5', 'Head impulse: normal is the scary answer', 'hit-start', 'Andy + glasses POV'),
      ep('S1E6', 'The plus: bedside hearing', 'hearing-start', 'narrated + app'),
      ep('S1E7', 'Put it together: the calculator', 'avs-hints-calc', 'narrated + app'),
      ep('S1E8', 'Case: peripheral → home', 'hints-peripheral', 'narrated + app'),
      ep('S1E9', 'Case: her MRI was normal', 'hints-central', 'narrated + app'),
    ],
    quiz: [
      {
        id: 'q1-1',
        prompt: 'Which patient is a valid candidate for the HINTS exam?',
        choices: [
          'Brief positional spells, no nystagmus at rest',
          'Constant vertigo with spontaneous nystagmus at rest',
          'Any dizzy patient over 50',
          'Anyone with a normal CT',
        ],
        answer: 1,
        why: 'HINTS is validated only in constant vertigo with spontaneous nystagmus; assess nystagmus first, and if there is none, the exam should not be done.',
        appNode: 'hints-start',
      },
      {
        id: 'q1-2',
        prompt: 'What is the order of the HINTS+ exam?',
        choices: [
          'Head impulse → skew → nystagmus → hearing',
          'Nystagmus → test of skew → head impulse → bedside hearing',
          'Hearing → nystagmus → head impulse → skew',
          'Skew → head impulse → hearing → nystagmus',
        ],
        answer: 1,
        why: 'The app walks the components in the order they should be performed: nystagmus, test of skew, head impulse test, then bedside hearing.',
        appNode: 'hints-start',
      },
      {
        id: 'q1-3',
        prompt: 'Skew is present but the head impulse is abnormal on one side and nystagmus is unidirectional. How do you call it?',
        choices: [
          'Peripheral, because two of three point that way',
          'Central: any one central finding makes the result central',
          'Indeterminate until MRI',
          'Peripheral if hearing is normal',
        ],
        answer: 1,
        why: 'All four components must be peripheral for a peripheral result; any single central finding, including skew, flips the disposition to central.',
        appNode: 'avs-hints-calc',
      },
      {
        id: 'q1-4',
        prompt: 'In a patient with AVS, the head impulse test is normal (no corrective saccade). What does that mean?',
        choices: [
          'Reassuring: the vestibular nerve is intact, so it is peripheral',
          'The central finding: a working vestibulo-ocular reflex means the lesion is not the vestibular nerve',
          'The test was done incorrectly',
          'Nothing until repeated after meclizine',
        ],
        answer: 1,
        why: 'A normal head impulse in a patient with continuous vertigo is the central finding, because an intact vestibulo-ocular reflex means the vestibular nerve is working and the lesion must be elsewhere.',
        appNode: 'hit-start',
      },
      {
        id: 'q1-5',
        prompt: 'Direction-changing nystagmus appeared during a supine roll test. There was no nystagmus at rest. Does the “direction-changing = central” rule apply?',
        choices: [
          'Yes, direction-changing nystagmus is always central',
          'No: the rule applies only to spontaneous nystagmus at rest, and provoked positional nystagmus is not a HINTS input',
          'Yes, if the patient is over 50',
          'Only if it is also vertical',
        ],
        answer: 1,
        why: 'The central red flag applies only to spontaneous-at-rest nystagmus; direction-changing nystagmus provoked by the supine roll with no nystagmus at rest is the expected peripheral signature of canal BPPV.',
        appNode: 'nyst-start',
      },
    ],
  },
  {
    id: 's2',
    title: 'Triggered episodic → BPPV',
    pathway: 'Benign paroxysmal positional vertigo',
    entryNode: 'bppv-start',
    blurb: 'Seconds of spinning with a position change and nothing at rest. Provoke it, read the nystagmus you provoked, and treat the canal you found.',
    episodes: [
      ep('S2E1', 'Dix-Hallpike, done right', 'dh-start', 'Andy on camera', true),
      ep('S2E2', 'Reading the nystagmus you provoked', 'dh-result', 'narrated + app'),
      ep('S2E3', 'Epley, five positions', 'epley-start', 'Andy on camera'),
      ep('S2E4', 'Semont when Epley won’t', 'semont-start', 'Andy on camera'),
      ep('S2E5', 'Horizontal canal: the supine roll', 'supine-roll', 'Andy + glasses POV'),
      ep('S2E6', 'Gufoni', 'gufoni-start', 'Andy on camera'),
      ep('S2E7', 'Anterior canal: deep head hanging', 'dhh-start', 'Andy on camera'),
      ep('S2E8', 'Case: rolls over in bed', 'bppv-cured', 'narrated + app'),
    ],
    quiz: [],
  },
  {
    id: 's3',
    title: 'Spontaneous episodic → mimics & TIA',
    pathway: 'Episodic vertigo differential',
    entryNode: 'mimics-start',
    blurb: 'Discrete attacks with a well interval. Posterior-circulation TIA sits at the top of the list, with migraine, Ménière’s, and the cardiovascular mimics behind it.',
    episodes: [
      ep('S3E1', 'Episodic vertigo: the differential', 'mimics-choose', 'Andy on camera', true),
      ep('S3E2', 'Vestibular migraine criteria', 'vm-criteria', 'narrated + app'),
      ep('S3E3', 'Ménière’s: don’t diagnose it in the ED', 'men-start', 'narrated + app'),
      ep('S3E4', 'POTS and medication dizziness', 'pots-start', 'narrated + app'),
      ep('S3E5', 'Transient isolated vertigo = TIA until proven otherwise', 'tia-start', 'Andy on camera'),
      ep('S3E6', 'Case: 20 minutes of spinning, now fine', 'tia-risk-stratify', 'narrated + app'),
    ],
    quiz: [],
  },
  {
    id: 's4',
    title: 'Disposition & still-off',
    pathway: 'Disposition, meds, rehab, and residual dizziness',
    entryNode: 'dispo-start',
    blurb: 'Where the patient goes, what to send them home with, and what to do when the spinning is over but they still feel off.',
    episodes: [
      ep('S4E1', 'Build the disposition', 'dispo-start', 'Andy on camera', true),
      ep('S4E2', 'Meds: what helps, what delays recovery', 'dispo-start', 'narrated + app'),
      ep('S4E3', 'Home Epley and vestibular rehab', 'dispo-start', 'narrated + app'),
      ep('S4E4', 'Still off after vertigo (PPPD)', 'pppd-residual-dizziness', 'narrated + app'),
    ],
    quiz: [],
  },
];
