import { site } from "@/data/site";

export function whatsappUrl(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function mailtoUrl(subject: string, body: string) {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export const telUrl = `tel:${site.phone}`;

export const defaultWhatsappUrl = whatsappUrl(
  "Hi Reshma, I'd like help planning a trip with Wave Story.",
);
