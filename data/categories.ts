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
    description: "Factories and MSME producers across India.",
  },
  {
    number: "02",
    icon: "🏪",
    name: "Retailers & traders",
    description: "Shops, distributors, and wholesalers by city.",
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
    description: "Hospitals, clinics, and doctors.",
  },
  {
    number: "04",
    icon: "🏫",
    name: "Education",
    description: "Schools, colleges, and coaching centres.",
  },
  {
    number: "05",
    icon: "🏗️",
    name: "Real estate",
    description: "Builders, dealers, and developers.",
  },
  {
    number: "06",
    icon: "🍽️",
    name: "Hotels & restaurants",
    description: "Food businesses city-wise or pan-India.",
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
