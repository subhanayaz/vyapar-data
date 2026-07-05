export type Faq = {
  question: string;
  answer: string;
};

export const FAQS: Faq[] = [
  {
    question: "Do you have both B2B and B2C leads?",
    answer:
      "Yes. Reach businesses (owners, decision-makers, suppliers) for B2B, or consumers in a chosen city and category for B2C. Just tell us who you want to reach.",
  },
  {
    question: "Where does this data come from?",
    answer:
      "We compile it from publicly available sources - primarily Google and public business listings, accessed through official Google APIs - the same information a business has already made public so customers can find it. We then verify and organise it by industry and location.",
  },
  {
    question: "What is in each lead row?",
    answer:
      "Typically: business or contact name, mobile, email (where available), full address, city, state, pincode, category, and website.",
  },
  {
    question: "Is the data accurate and up to date?",
    answer:
      "We pull fresh from live listings and re-verify regularly. A small number of records may be outdated, so we always share a free sample first so you can judge the quality yourself.",
  },
  {
    question: "Can I try before I buy?",
    answer: "Absolutely. Message us and we'll send 50–100 free sample rows for your exact target.",
  },
  {
    question: "What file format do I get?",
    answer: "Excel (.xlsx) or CSV - ready to open in Excel, Google Sheets, or any CRM.",
  },
  {
    question: "How do I receive the file?",
    answer: "It's emailed the moment your payment clears. Larger orders also get a WhatsApp download link.",
  },
  {
    question: "What can I use the leads for?",
    answer: "Cold calling, WhatsApp and email campaigns, dealer and distributor hunts, and any sales or marketing outreach.",
  },
  {
    question: "My business is listed and I want it removed.",
    answer:
      "Message us on WhatsApp with your business name and we'll remove or correct it within 7 days. See our Privacy Policy for details.",
  },
];
