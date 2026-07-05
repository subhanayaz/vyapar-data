const WHATSAPP_COUNTRY_CODE = "91";
const WHATSAPP_PHONE = "8919718664";

export const WHATSAPP_DISPLAY = "+91 89197 18664";
export const WHATSAPP_URL_BASE = `https://wa.me/${WHATSAPP_COUNTRY_CODE}${WHATSAPP_PHONE}`;

export function buildSampleRequestWhatsAppUrl(industry: string, details?: string) {
  const lines = [
    "Hi VyaparData,",
    "",
    "I would like a free sample.",
    `Industry: ${industry}`,
  ];

  if (details?.trim()) {
    lines.push(`Details: ${details.trim()}`);
  }

  const message = lines.join("\n");
  return `${WHATSAPP_URL_BASE}?text=${encodeURIComponent(message)}`;
}
