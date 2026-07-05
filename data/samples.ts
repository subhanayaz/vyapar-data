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
    title: "Pick a category",
    body: "Tell us the industry and location you need.",
  },
  {
    number: "02",
    title: "Check a sample",
    body: "We send 50–100 rows so you can verify quality.",
  },
  {
    number: "03",
    title: "Pay once",
    body: "UPI, bank transfer, or online — no subscription.",
  },
  {
    number: "04",
    title: "Download",
    body: "Get your Excel or CSV by email within minutes.",
  },
] as const;

export const FORMAT_FEATURES = [
  {
    icon: "📄",
    title: "Excel & CSV",
    description: "Works in Excel, Google Sheets, or your CRM.",
  },
  // {
  //   icon: "🔄",
  //   title: "Yours forever",
  //   description: "One payment. No expiry or renewal.",
  // },
  {
    icon: "📦",
    title: "Full details",
    description: "Name, phone, email, address, city, state, pincode.",
  },
  {
    icon: "⚡",
    title: "Fast delivery",
    description: "File sent to email and WhatsApp after payment.",
  },
] as const;
