export type HeroSampleRow = {
  company: string;
  contact: string;
  mobile: string;
  city: string;
};

export const HERO_SAMPLE_ROWS: HeroSampleRow[] = [
  { company: "Arora Steel Works", contact: "Ramesh Arora", mobile: "98XXXXXX12", city: "Delhi" },
  { company: "Mehta Packaging Pvt", contact: "Sunil Mehta", mobile: "97XXXXXX45", city: "Noida" },
  { company: "Gupta Electricals", contact: "Ankit Gupta", mobile: "99XXXXXX78", city: "Gurgaon" },
  { company: "Singh Industries", contact: "H. Singh", mobile: "98XXXXXX34", city: "Faridabad" },
  { company: "Kumar Auto Parts", contact: "Raj Kumar", mobile: "76XXXXXX90", city: "Delhi" },
];

export type FormatSampleRow = {
  businessName: string;
  mobile: string;
  city: string;
  type: string;
  websiteUrl: string;
};

export const FORMAT_SAMPLE_ROWS: FormatSampleRow[] = [
  { businessName: "Sharma Textiles", mobile: "98XXXXX01", city: "Surat", websiteUrl: "https://www.xyz.com", type: "Mfg" },
  { businessName: "Patel Pharma", mobile: "97XXXXX22", city: "Ahmedabad", websiteUrl: "https://www.xyz.com", type: "Dist" },
  { businessName: "Reddy Constructions", mobile: "99XXXXX45", city: "Hyderabad", websiteUrl: "https://www.xyz.com", type: "Builder" },
  { businessName: "Nair Exports", mobile: "76XXXXX67", city: "Kochi", websiteUrl: "https://www.xyz.com", type: "Export" },
  { businessName: "Iyer & Co. CA", mobile: "98XXXXX89", city: "Chennai", websiteUrl: "https://www.xyz.com", type: "Prof" },
  { businessName: "Singh Motors", mobile: "97XXXXX12", city: "Ludhiana", websiteUrl: "https://www.xyz.com", type: "Dealer" },
];

export const HOW_IT_WORKS_STEPS = [
  {
    number: "01",
    title: "Tell us your target",
    body: "Pick the industry, audience, and location you want to reach.",
  },
  {
    number: "02",
    title: "See a free sample",
    body: "We send 50–100 live rows so you can verify the quality first.",
  },
  {
    number: "03",
    title: "Pay once",
    body: "UPI, bank transfer, or card - one payment, no subscription.",
  },
  {
    number: "04",
    title: "Get your file",
    body: "Your Excel or CSV lands in email and WhatsApp within minutes.",
  },
] as const;

export const FORMAT_FEATURES = [
  {
    icon: "📄",
    title: "Excel & CSV",
    description: "Import straight into Excel, Google Sheets, or any CRM.",
  },
  {
    icon: "📦",
    title: "Complete records",
    description: "Business name, phone, email, address, city, state, pincode.",
  },
  {
    icon: "⚡",
    title: "Instant delivery",
    description: "Sent to your email and WhatsApp the moment payment clears.",
  },
] as const;
