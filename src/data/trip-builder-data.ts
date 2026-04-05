// Trip Builder Demo Data

export interface Destination {
  id: string;
  name: string;
  region: string;
  icon: string;
}

export interface TripType {
  id: string;
  name: string;
  icon: string;
}

export interface KitItem {
  name: string;
  purpose: string;
  notes?: string;
}

export const DESTINATIONS: Destination[] = [
  { id: 'mexico', name: 'Mexico', region: 'Cancun / Resort', icon: '\ud83c\uddf2\ud83c\uddfd' },
  { id: 'se-asia', name: 'Southeast Asia', region: 'Thailand / Vietnam / Cambodia', icon: '\ud83c\uddf9\ud83c\udded' },
  { id: 'europe', name: 'Western Europe', region: 'France / Italy / Spain', icon: '\ud83c\uddea\ud83c\uddfa' },
  { id: 'east-africa', name: 'East Africa', region: 'Kenya / Tanzania', icon: '\ud83c\uddf0\ud83c\uddea' },
  { id: 'south-america', name: 'South America', region: 'Peru / Colombia', icon: '\ud83c\uddf5\ud83c\uddea' },
  { id: 'india', name: 'India', region: 'Delhi / Mumbai / Goa', icon: '\ud83c\uddeE\ud83c\uddf3' },
  { id: 'caribbean', name: 'Caribbean Cruise', region: 'Multiple ports', icon: '\ud83d\udea2' },
  { id: 'japan', name: 'Japan', region: 'Tokyo / Kyoto / Osaka', icon: '\ud83c\uddef\ud83c\uddf5' },
];

export const TRIP_TYPES: TripType[] = [
  { id: 'backpacking', name: 'Backpacking', icon: '\ud83c\udf0d' },
  { id: 'family', name: 'Family with Kids', icon: '\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d\udc66' },
  { id: 'business', name: 'Business Travel', icon: '\ud83d\udcbc' },
  { id: 'cruise', name: 'Cruise', icon: '\ud83d\udea2' },
  { id: 'resort', name: 'Resort / Beach', icon: '\ud83c\udfd6\ufe0f' },
];

// Base kit items shared across many trips
const BASE_KIT: KitItem[] = [
  { name: 'Acetaminophen (Tylenol)', purpose: 'Pain and fever relief', notes: 'Adults: 500\u20131000mg every 6\u20138 hours' },
  { name: 'Ibuprofen (Advil)', purpose: 'Anti-inflammatory, pain, fever', notes: 'Adults: 200\u2013400mg every 6\u20138 hours with food' },
  { name: 'Loperamide (Imodium)', purpose: 'Acute diarrhea relief', notes: '4mg initial, then 2mg after each loose stool, max 16mg/day' },
  { name: 'Oral Rehydration Salts', purpose: 'Electrolyte replacement for dehydration', notes: 'Mix with clean water per packet instructions' },
  { name: 'Diphenhydramine (Benadryl)', purpose: 'Allergic reactions, insect bites, sleep aid', notes: '25\u201350mg every 6\u20138 hours' },
  { name: 'Adhesive Bandages', purpose: 'Minor wound coverage', notes: 'Assorted sizes' },
  { name: 'Sunscreen SPF 50+', purpose: 'UV protection', notes: 'Reapply every 2 hours when exposed' },
];

const TROPICAL_ADD: KitItem[] = [
  { name: 'DEET Insect Repellent (30%+)', purpose: 'Mosquito-borne illness prevention', notes: 'Apply to exposed skin, reapply every 4\u20136 hours' },
  { name: 'Permethrin Spray', purpose: 'Treat clothing for insect protection', notes: 'Apply to clothes, let dry before wearing' },
  { name: 'Water Purification Tablets', purpose: 'Safe drinking water from uncertain sources' },
];

const ALTITUDE_ADD: KitItem[] = [
  { name: 'Acetazolamide (Diamox)', purpose: 'Altitude sickness prevention', notes: '125mg twice daily, start 1 day before ascent. Prescription required.' },
];

const MOTION_ADD: KitItem[] = [
  { name: 'Meclizine (Bonine)', purpose: 'Motion sickness prevention', notes: '25mg 1 hour before travel. Less drowsy than Dramamine.' },
];

const FAMILY_ADD: KitItem[] = [
  { name: 'Pediatric Acetaminophen (liquid)', purpose: 'Children\u2019s fever and pain relief', notes: 'Dose by weight \u2014 check packaging' },
  { name: 'Pediatric Electrolyte Solution', purpose: 'Rehydration for children', notes: 'Pedialyte or equivalent' },
  { name: 'Children\u2019s Antihistamine', purpose: 'Allergic reactions in kids', notes: 'Cetirizine liquid \u2014 dose by age' },
];

// Build recommendation by combining base + destination-specific + trip-type-specific
export function getKitRecommendation(destinationId: string, tripTypeId: string): KitItem[] {
  const items = [...BASE_KIT];

  // Destination-specific additions
  const tropicalDests = ['mexico', 'se-asia', 'east-africa', 'south-america', 'india', 'caribbean'];
  if (tropicalDests.includes(destinationId)) {
    items.push(...TROPICAL_ADD);
  }

  const altitudeDests = ['south-america', 'east-africa'];
  if (altitudeDests.includes(destinationId)) {
    items.push(...ALTITUDE_ADD);
  }

  // India/SE Asia: extra GI protection
  if (destinationId === 'india' || destinationId === 'se-asia') {
    items.push({
      name: 'Bismuth Subsalicylate (Pepto-Bismol)',
      purpose: 'Traveler\u2019s diarrhea prevention',
      notes: '2 tablets 4 times daily with meals during travel'
    });
  }

  // East Africa specific
  if (destinationId === 'east-africa') {
    items.push({
      name: 'Atovaquone-Proguanil (Malarone)',
      purpose: 'Malaria prophylaxis',
      notes: 'Start 1\u20132 days before, daily during, 7 days after. Prescription required.'
    });
  }

  // Trip-type-specific additions
  if (tripTypeId === 'cruise' || tripTypeId === 'resort') {
    items.push(...MOTION_ADD);
  }

  if (tripTypeId === 'family') {
    items.push(...FAMILY_ADD);
  }

  if (tripTypeId === 'backpacking') {
    items.push({
      name: 'Moleskin / Blister Pads',
      purpose: 'Prevent and treat blisters',
      notes: 'Apply at first sign of hotspots'
    });
    items.push({
      name: 'Antibiotic Ointment',
      purpose: 'Wound infection prevention',
      notes: 'Apply to clean wounds, cover with bandage'
    });
  }

  if (tripTypeId === 'business') {
    items.push({
      name: 'Melatonin',
      purpose: 'Jet lag management',
      notes: '0.5\u20135mg at destination bedtime for 3\u20135 nights'
    });
  }

  // Japan specific — first aid focus, very clean environment
  if (destinationId === 'japan') {
    items.push({
      name: 'Stomach Antacid',
      purpose: 'Rich/unfamiliar food discomfort',
      notes: 'Calcium carbonate (Tums) or famotidine'
    });
  }

  return items;
}
