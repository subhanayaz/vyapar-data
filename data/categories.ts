export type Category = {
  number: string;
  icon: string;
  name: string;
  description: string;
};

export const CATEGORIES: Category[] = [
  {
    number: "01",
    icon: "🏭",
    name: "Manufacturers",
    description: "Factories, MSMEs, and suppliers with verified decision-maker contacts.",
  },
  {
    number: "02",
    icon: "🏪",
    name: "Retailers & traders",
    description: "Shops, distributors, and wholesalers mapped city by city.",
  },
  // {
  //   number: "03",
  //   icon: "🏢",
  //   name: "Companies",
  //   description: "Registered Pvt Ltd, Ltd, and startup firms.",
  // },
  {
    number: "03",
    icon: "🏥",
    name: "Healthcare",
    description: "Hospitals, clinics, pharmacies, and practising doctors.",
  },
  {
    number: "04",
    icon: "🏫",
    name: "Education",
    description: "Schools, colleges, and coaching centres with direct contacts.",
  },
  {
    number: "05",
    icon: "🏗️",
    name: "Real estate",
    description: "Builders, brokers, and developers - plus homebuyer leads.",
  },
  {
    number: "06",
    icon: "🍽️",
    name: "Hotels & restaurants",
    description: "Food and hospitality businesses, city-wise or pan-India.",
  },
  // {
  //   number: "08",
  //   icon: "💼",
  //   name: "Professionals",
  //   description: "CAs, lawyers, consultants, architects.",
  // },
  // {
  //   number: "09",
  //   icon: "🚛",
  //   name: "Logistics",
  //   description: "Transport, freight, and warehouse operators.",
  // },
];
