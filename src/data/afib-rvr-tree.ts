// A-Fib RVR Decision Tree — Demo Data

export interface DemoNode {
  id: string;
  type: 'question' | 'result';
  title: string;
  body?: string;
  options?: { label: string; nextId: string }[];
  annotation?: string;
}

export interface GuidedStep {
  nodeId: string;
  selectedOption: string;
  explanation: string;
  patientContext: string;
}

export const AFIB_DEMO_NODES: DemoNode[] = [
  {
    id: 'afib-start',
    type: 'question',
    title: 'Patient presents with A-Fib and RVR',
    body: 'Heart rate > 100\u2013110 bpm. Irregularly irregular rhythm confirmed on ECG.',
    options: [
      { label: 'Assess hemodynamic stability', nextId: 'stability' }
    ],
    annotation: 'First step: always assess stability before choosing a treatment strategy.'
  },
  {
    id: 'stability',
    type: 'question',
    title: 'Is the patient hemodynamically unstable?',
    body: 'Signs: hypotension (SBP <90), altered mental status, chest pain, acute heart failure, or signs of shock.',
    options: [
      { label: 'Yes \u2014 Unstable', nextId: 'cardiovert' },
      { label: 'No \u2014 Stable', nextId: 'ef-check' }
    ],
    annotation: 'Unstable patients need immediate cardioversion regardless of other factors.'
  },
  {
    id: 'cardiovert',
    type: 'result',
    title: 'Synchronized Cardioversion',
    body: 'Procedural sedation \u2192 synchronized cardioversion at 120\u2013200J biphasic.\nPost-cardioversion: reassess rhythm, consider anticoagulation, identify underlying cause (sepsis, PE, thyroid storm, etc.).'
  },
  {
    id: 'ef-check',
    type: 'question',
    title: 'Reduced ejection fraction or acute heart failure?',
    body: 'Known HFrEF (EF <40%), signs of acute decompensated heart failure, or severe LV dysfunction.',
    options: [
      { label: 'Yes \u2014 Reduced EF / Heart Failure', nextId: 'hf-drugs' },
      { label: 'No \u2014 Preserved EF', nextId: 'drug-choice' }
    ],
    annotation: 'Beta-blockers and CCBs can worsen heart failure. These patients need different agents.'
  },
  {
    id: 'hf-drugs',
    type: 'result',
    title: 'Rate Control in Heart Failure',
    body: 'Amiodarone 150mg IV over 10 min \u2192 1mg/min drip\nOR Digoxin 0.25\u20130.5mg IV\n\n\u26a0\ufe0f Avoid beta-blockers and calcium channel blockers in acute decompensated HF.'
  },
  {
    id: 'drug-choice',
    type: 'question',
    title: 'Select rate control agent',
    body: 'Both are first-line for hemodynamically stable A-Fib with RVR and preserved EF.',
    options: [
      { label: 'Beta-Blocker', nextId: 'bb-result' },
      { label: 'Calcium Channel Blocker', nextId: 'ccb-result' }
    ],
    annotation: 'Either is appropriate. CCBs (diltiazem) often preferred in ED for faster onset and titratability.'
  },
  {
    id: 'bb-result',
    type: 'result',
    title: 'Metoprolol',
    body: 'Metoprolol 5mg IV push over 2 min\nMay repeat q5 min, max 3 doses (15mg total)\nTarget: HR < 110 bpm\n\nConsider underlying causes: sepsis, PE, thyroid, alcohol withdrawal, etc.'
  },
  {
    id: 'ccb-result',
    type: 'result',
    title: 'Diltiazem',
    body: 'Diltiazem 0.25 mg/kg IV bolus over 2 min (~20mg for 80kg)\nIf inadequate after 15 min: 0.35 mg/kg repeat bolus\nThen drip: 5\u201315 mg/hr\nTarget: HR < 110 bpm\n\nConsider underlying causes: sepsis, PE, thyroid, alcohol withdrawal, etc.'
  }
];

export const GUIDED_TOUR: GuidedStep[] = [
  {
    nodeId: 'afib-start',
    selectedOption: 'Assess hemodynamic stability',
    explanation: 'Our patient is a 68-year-old presenting with palpitations. ECG shows A-Fib with ventricular rate of 142.',
    patientContext: '68yo \u2022 HR 142 \u2022 BP 138/82 \u2022 O\u2082 98%'
  },
  {
    nodeId: 'stability',
    selectedOption: 'No \u2014 Stable',
    explanation: 'Blood pressure is 138/82, mentating well, no chest pain or signs of heart failure. The patient is hemodynamically stable.',
    patientContext: 'Stable vitals, alert and oriented'
  },
  {
    nodeId: 'ef-check',
    selectedOption: 'No \u2014 Preserved EF',
    explanation: 'No history of heart failure. Bedside echo shows preserved EF with no wall motion abnormalities.',
    patientContext: 'No HF history, preserved EF on echo'
  },
  {
    nodeId: 'drug-choice',
    selectedOption: 'Calcium Channel Blocker',
    explanation: 'We choose diltiazem for its rapid onset and easy titratability. Metoprolol would also be appropriate.',
    patientContext: 'Choosing diltiazem for rate control'
  },
  {
    nodeId: 'ccb-result',
    selectedOption: '',
    explanation: 'Diltiazem 20mg IV bolus given. After 10 minutes, heart rate drops to 88. Patient is rate-controlled and feeling better.',
    patientContext: 'HR 142 \u2192 88 after diltiazem bolus \u2713'
  }
];
