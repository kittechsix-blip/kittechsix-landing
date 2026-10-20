// Production screenshots captured 2026-10-20. Replaces the retired glass UI clone.
import type { UITourConfig } from '../../components/ui-tour.js';
import { VERTIGO_SCREENS, renderVertigoDemo } from '../../components/vertigo-showcase.js';

export const vtTour: UITourConfig = {
  appId: 'my-vertigo-app',
  appName: 'myVertigo',
  eyebrow: 'Current app walkthrough',
  subtitle: 'Explore actual screens from the redesigned app: raised umber navigation, framed examination controls, selectable safety layouts, and visual BPPV teaching. These are annotated screenshots; open the app to use the tools.',
  accentColor: '#8A3324',
  liveUrl: 'https://my-vertigo-app.vercel.app',
  initialScreen: 'demo',
  autoTour: false,
  screens: [{id: 'demo', title: 'Watch HINTS → Lateralize', renderClone: renderVertigoDemo, hotspots: []}, ...VERTIGO_SCREENS.map((screen, i) => ({
    id: screen.id,
    title: screen.label,
    imageSrc: screen.image,
    hotspots: [{
      id: `${screen.id}-detail`,
      rect: i === 0 ? {x:8,y:56,w:84,h:24} : i === 1 ? {x:10,y:41,w:80,h:47} : {x:4,y:27,w:92,h:8},
      title: ['Choose the positional test and side', 'Explore findings by region', 'Choose how you work through the exam'][i]!,
      description: [
        'Framed controls distinguish test selection from the teaching result. The live tool also lets you vary gaze while watching the eye-movement illustration.',
        'The body map organizes safety findings anatomically. Open the real app to select regions and review their examination findings.',
        'Head to toe, Body map, Exam walk and One screen offer four ways to view the safety examination. The raised header keeps your current stage visible above the clinical notice.',
      ][i]!,
      guidedOrder: i + 1,
      ...(i < 2 ? {navigateTo: VERTIGO_SCREENS[i+1]!.id} : {}),
    }],
  })),],
};
