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
    period: "Up to 2,000 leads",
    features: [
      "One industry or audience",
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
    period: "Up to 10,000 leads",
    features: [
      "3 industries or audiences",
      "All India or by state",
      "Excel + CSV",
      "Email & WhatsApp",
      "Priority support",
    ],
    highlighted: true,
    buttonLabel: "Order now",
    badge: "Most popular",
  },
  {
    tier: "Custom",
    note: "Tailored quote",
    amount: "Custom",
    period: "Any volume",
    features: [
      "Any industry, audience & location",
      "Custom fields & filters",
      "Dedicated account support",
      "Scheduled data refresh",
    ],
    highlighted: false,
    buttonLabel: "Contact us",
  },
];
