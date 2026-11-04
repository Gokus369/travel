import { WhatsAppIcon } from "@/components/Ornaments";
import { defaultWhatsappUrl } from "@/lib/contact";

export function WhatsAppFloat() {
  return (
    <a
      href={defaultWhatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Wave Story on WhatsApp"
      className="fixed right-4 bottom-4 z-30 grid size-14 place-items-center rounded-full bg-[#25d366] text-ink shadow-lg shadow-ink/25 transition-transform hover:scale-105 sm:hidden"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
