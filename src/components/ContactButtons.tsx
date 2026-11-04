/** Both enquiry forms end the same way: compose a message, then hand it to WhatsApp or email. */

import { WhatsAppIcon } from "@/components/Ornaments";

export function SendButtons() {
  return (
    <div className="@container">
      <div className="flex flex-col gap-2 @md:flex-row">
        <button type="submit" name="via" value="whatsapp" className="btn btn-primary flex-1">
          <WhatsAppIcon className="size-[18px]" />
          Send on WhatsApp
        </button>
        <button type="submit" name="via" value="email" className="btn btn-ghost flex-1">
          Send by email
        </button>
      </div>
    </div>
  );
}

export function SentNote({ via, onReset }: { via: "whatsapp" | "email"; onReset: () => void }) {
  return (
    <div role="status" className="rounded-md bg-paper-deep p-5">
      <p className="font-display text-2xl">Almost there.</p>
      <p className="mt-2 text-ink-soft">
        {via === "whatsapp"
          ? "WhatsApp should have opened with your details filled in. Press send there and your message reaches Reshma."
          : "Your email app should have opened with your details filled in. Press send there and your message reaches Reshma."}
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-3 min-h-11 cursor-pointer font-semibold text-clay-deep underline underline-offset-4"
      >
        Edit my details
      </button>
    </div>
  );
}

export function deliver(via: "whatsapp" | "email", whatsappLink: string, emailLink: string) {
  if (via === "whatsapp") window.open(whatsappLink, "_blank", "noopener");
  else window.location.href = emailLink;
}
