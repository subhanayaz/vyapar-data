export type Faq = {
  question: string;
  answer: string;
};

export const FAQS: Faq[] = [
  {
    question: "What is in each contact row?",
    answer:
      "Usually: business name, owner name, mobile, email (if available), full address, city, state, pincode, and industry.",
  },
  {
    question: "What file format do I get?",
    answer: "Excel (.xlsx) or CSV — open in Excel, Google Sheets, or any CRM.",
  },
  {
    question: "How do I receive the file?",
    answer: "We email it after payment. Large orders get a download link on WhatsApp too.",
  },
  {
    question: "Is the data accurate?",
    answer:
      "We update regularly. Some numbers may be old — use the list as a starting point for outreach.",
  },
  {
    question: "Can I try before I buy?",
    answer: "Yes. Message us and we will send 50–100 free sample rows.",
  },
  {
    question: "What can I use this for?",
    answer: "Calling, WhatsApp, email campaigns, dealer search, and sales outreach.",
  },
  {
    question: "Where does this data come from?",
    answer:
      "We compile it from publicly available business directories, maps, and listing platforms — the kind of information a business has already made public so customers can find it — then organise it by industry and location.",
  },
  {
    question: "My business is listed and I want it removed.",
    answer:
      "Message us on WhatsApp with your business name and we'll remove or correct it within 7 days. See our Privacy Policy for details.",
  },
];
