// ALL editable copy lives here. Only facts you supplied are used.
// Items marked TODO need your confirmation before launch.

export const business = {
  name: "HouseCall Automotive Repairs",
  tagline: "Car trouble, handled right in your driveway",
  phoneDisplay: "(218) 491-1832",
  phoneHref: "tel:+12184911832",
  smsHref: "sms:+12184911832",
  email: "sebastiansieler31@gmail.com",
  area: "Duluth–Superior",
  owner: "Sebastian",
};

// Sequence settings. Scroll timing is tuned here, not in the component.
export const sequence = {
  frameCount: 72,
  framePath: (i: number) => `/frames/f_${String(i).padStart(4, "0")}.svg`,
  scrollLengthVh: 380, // how much scrolling the pinned hero consumes
  // Where the subject sits in the frame (0-1). Used for phone crops.
  focalX: 0.5,
  isPlaceholder: true, // set false once approved footage replaces /frames
};

export const beats = [
  {
    at: 0.0,
    to: 0.3,
    kicker: "No shop. No tow.",
    title: "We come to you.",
    body: "Mobile auto repair across the Duluth–Superior area.",
  },
  {
    at: 0.35,
    to: 0.65,
    kicker: "Price first",
    title: "Locked in writing before work starts.",
    body: "No dealership markup and no surprise charges.",
  },
  {
    at: 0.7,
    to: 1.0,
    kicker: "Owner-operated",
    title: "Sebastian on every job.",
    body: "Call or text and get a straight answer.",
  },
];

export const services = [
  { name: "Jump start", price: "$49" },
  { name: "Lockout", price: "$59" },
  { name: "Flat tire swap", price: "$59" },
  { name: "Fuel delivery", price: "$45 + fuel" },
  { name: "Battery replacement", price: "$120–$200" },
];

export const repairs = [
  "Brakes",
  "Starter",
  "Alternator",
  "Oil change",
  "Diagnosis",
  "Belts",
  "A/C recharge",
];

export const faq = [
  {
    q: "Do you really come to my home or work?",
    a: "Yes. HouseCall is a mobile service, so repairs happen in your driveway or parking spot instead of at a shop.",
  },
  {
    q: "When do I find out the price?",
    a: "Before any work starts, in writing.",
  },
  {
    q: "Where do you work?",
    a: "The Duluth–Superior area. Call or text to confirm your location.",
  },
  {
    // TODO: confirm hours before launch; none were supplied.
    q: "What are your hours?",
    a: "Call or text and we will tell you what is available.",
  },
];

// Estimate form: NOT connected. The button shows an honest status instead of
// a fake success. Wire a real endpoint in src/components/Contact.tsx.
export const estimateFormEndpoint: string | null = null;
