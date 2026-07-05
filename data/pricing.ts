export type PricingPlan = {
  tier: string;
  note: string;
  amount: string;
  period: string;
  features: string[];
  highlighted: boolean;
  buttonLabel: string;
  badge?: string;
};

export const PRICING_PLANS: PricingPlan[] = [
  {
    tier: "Starter",
    note: "One-time payment",
    amount: "₹499",
    period: "Up to 2,000 contacts",
    features: [
      "One industry",
      "One city or state",
      "Excel file",
      "Email delivery",
      "Free sample first",
    ],
    highlighted: false,
    buttonLabel: "Order now",
  },
  {
    tier: "Business",
    note: "One-time payment",
    amount: "₹1,499",
    period: "Up to 10,000 contacts",
    features: [
      "3 industries",
      "All India or by state",
      "Excel + CSV",
      "Email & WhatsApp",
      "Priority support",
    ],
    highlighted: true,
    buttonLabel: "Order now",
    badge: "Popular",
  },
  {
    tier: "Custom",
    note: "Quote",
    amount: "Custom",
    period: "Any volume",
    features: [
      "Any industry & location",
      "Custom fields",
      "Dedicated support",
      "Data refresh option",
    ],
    highlighted: false,
    buttonLabel: "Contact us",
  },
];
