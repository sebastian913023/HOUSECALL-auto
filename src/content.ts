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

// Promises. Legal wording: have a local attorney or insurer review before launch.
// The price-match minimum rate is deliberately NOT published.
export const promises = [
  {
    title: "12-month / 12,000-mile labor warranty",
    body: "If our workmanship fails within 12 months or 12,000 miles, whichever comes first, we redo the work with no charge for labor. Parts carry the manufacturer's warranty. Excludes misuse, accidents, and wear items.",
  },
  {
    title: "Local price match",
    body: "Bring a written, itemized quote from a licensed shop in the Duluth–Superior area for the same job, same vehicle and same quality of parts, dated within the last 30 days. We'll match the labor charge, subject to our minimum rate. Parts and diagnostic fees are not included.",
  },
];

export const warrantyTerms = {
  covered:
    "Defects in our workmanship on the repair listed on your invoice. If it fails within 12 months or 12,000 miles of the repair date, whichever comes first, we redo the work with no charge for labor. Parts carry the manufacturer's warranty only.",
  who: "The original customer and vehicle on the invoice. The warranty does not transfer.",
  claim:
    "Contact us within 7 days of noticing the problem, and stop driving the vehicle if it is unsafe. Keep your invoice. We may inspect the vehicle and any failed part before redoing the work. Repairs by anyone else on the same system void the warranty on that system.",
  excluded: [
    "Failure of any part or system we did not repair, including anything that fails because of another worn or damaged component",
    "Conditions that existed before our work, or that we told you about and you declined to fix",
    "Damage from accidents, collisions, weather, road hazards, or misuse",
    "Damage from overheating, low fluids, or ignoring warning lights",
    "Vehicles used for commercial work, ride-share, towing, or racing",
    "Modified vehicles and aftermarket parts",
    "Normal wear items, such as brake pads, wipers, belts, and tires, once past ordinary wear",
    "Fluids, unless the failure is caused by our workmanship",
  ],
  liability:
    "Our remedy is redoing the work or refunding the labor charge for that repair. We are not responsible for towing, rental cars, lost time or wages, or other indirect costs, to the extent the law allows. This does not limit liability for personal injury or anything the law does not let us limit.",
  payment: "The warranty applies once the invoice is paid in full.",
  declined:
    "If we recommend a repair and you decline it, we will note it on your invoice. We are not responsible for failures related to repairs you declined.",
};

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
