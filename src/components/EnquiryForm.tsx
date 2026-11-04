"use client";

import { useId, useState, type FormEvent } from "react";
import { deliver, SendButtons, SentNote } from "@/components/ContactButtons";
import { mailtoUrl, whatsappUrl } from "@/lib/contact";

export function EnquiryForm({ trip }: { trip?: string }) {
  // Hidden routes stay in the DOM, so ids must be unique across pages.
  const id = useId();
  const [sent, setSent] = useState<"whatsapp" | "email" | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const via = submitter?.value === "email" ? "email" : "whatsapp";
    const data = new FormData(event.currentTarget);
    const field = (name: string) => String(data.get(name) ?? "").trim();

    const lines = [
      `Hi Reshma, I'd like to plan a trip${trip ? `: ${trip}` : ""}.`,
      "",
      `Name: ${field("name")}`,
      `Phone: ${field("phone")}`,
      field("when") ? `When: ${field("when")}` : null,
      field("travellers") ? `Travellers: ${field("travellers")}` : null,
      field("notes") ? `Notes: ${field("notes")}` : null,
    ].filter((line) => line !== null);
    const message = lines.join("\n");

    deliver(via, whatsappUrl(message), mailtoUrl(`Trip enquiry${trip ? `: ${trip}` : ""}`, message));
    setSent(via);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {sent && <SentNote via={sent} onReset={() => setSent(null)} />}
      <div hidden={sent !== null} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id={`${id}-name`} label="Your name">
            <input id={`${id}-name`} name="name" required autoComplete="name" className="field" />
          </Field>
          <Field id={`${id}-phone`} label="Phone or WhatsApp">
            <input
              id={`${id}-phone`}
              name="phone"
              type="tel"
              required
              pattern="[0-9+\(\) \-]{7,}"
              title="Please enter a phone number"
              autoComplete="tel"
              inputMode="tel"
              className="field"
            />
          </Field>
          <Field id={`${id}-when`} label="When are you travelling?">
            <input id={`${id}-when`} name="when" placeholder="Mid-December" className="field" />
          </Field>
          <Field id={`${id}-travellers`} label="How many of you?">
            <input id={`${id}-travellers`} name="travellers" placeholder="2 adults, 1 child" className="field" />
          </Field>
        </div>
        <Field id={`${id}-notes`} label="Anything else?">
          <textarea
            id={`${id}-notes`}
            name="notes"
            rows={3}
            placeholder="Places you love, budget, hotel level, special occasions"
            className="field"
          />
        </Field>
        <SendButtons />
      </div>
    </form>
  );
}

function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-[0.8125rem] font-semibold">
        {label}
      </label>
      {children}
    </div>
  );
}
