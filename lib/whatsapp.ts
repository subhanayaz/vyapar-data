const WHATSAPP_COUNTRY_CODE = "91";
const WHATSAPP_PHONE = "8919718664";

export const WHATSAPP_DISPLAY = "+91 89197 18664";
export const WHATSAPP_URL_BASE = `https://wa.me/${WHATSAPP_COUNTRY_CODE}${WHATSAPP_PHONE}`;

export type SampleRequest = {
  fullName?: string;
  leadType?: string;
  industry: string;
  location?: string;
  quantity?: string;
  notes?: string;
};

export function buildSampleRequestWhatsAppUrl(request: SampleRequest) {
  const lines = ["Hi VyaparData,", "", "I'd like a free sample of leads."];

  const appendIfPresent = (label: string, rawValue?: string) => {
    const trimmedValue = rawValue?.trim();
    if (trimmedValue) lines.push(`${label}: ${trimmedValue}`);
  };

  appendIfPresent("Name", request.fullName);
  appendIfPresent("Lead type", request.leadType);
  appendIfPresent("Industry / category", request.industry);
  appendIfPresent("Target location", request.location);
  appendIfPresent("Volume needed", request.quantity);
  appendIfPresent("Notes", request.notes);

  const message = lines.join("\n");
  return `${WHATSAPP_URL_BASE}?text=${encodeURIComponent(message)}`;
}

export type PlanEnquiry = {
  tier: string;
  amount: string;
  period: string;
  isCustom?: boolean;
};

export function buildPlanEnquiryWhatsAppUrl(plan: PlanEnquiry) {
  const lines = ["Hi VyaparData,", ""];

  if (plan.isCustom) {
    lines.push("I'd like a custom quote for a lead list.");
    lines.push(`Volume: ${plan.period}`);
  } else {
    lines.push(`I'd like to order the ${plan.tier} plan.`);
    lines.push(`Price: ${plan.amount}`);
    lines.push(`Includes: ${plan.period}`);
  }

  const message = lines.join("\n");
  return `${WHATSAPP_URL_BASE}?text=${encodeURIComponent(message)}`;
}
