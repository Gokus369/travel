"use client";

import { useId, useState, type FormEvent } from "react";
import { deliver, SendButtons, SentNote } from "@/components/ContactButtons";
import { stayPlaces, stayStyles } from "@/data/stays";
import { mailtoUrl, whatsappUrl } from "@/lib/contact";

export function HotelForm() {
  const id = useId();
  const [sent, setSent] = useState<"whatsapp" | "email" | null>(null);
  const [dateError, setDateError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const via = submitter?.value === "email" ? "email" : "whatsapp";
    const data = new FormData(event.currentTarget);
    const field = (name: string) => String(data.get(name) ?? "").trim();

    if (field("checkOut") <= field("checkIn")) {
      setDateError("Check-out needs to be after check-in.");
      return;
    }
    setDateError("");

    const lines = [
      "Hi Reshma, I'd like help booking a hotel.",
      "",
      `Destination: ${field("place")}`,
      `Check-in: ${field("checkIn")}`,
      `Check-out: ${field("checkOut")}`,
      `Rooms: ${field("rooms")}`,
      `Guests: ${field("adults")} adults, ${field("children") || "0"} children`,
      `Stay level: ${field("style")}`,
      "",
      `Name: ${field("name")}`,
      `Phone: ${field("phone")}`,
      field("notes") ? `Notes: ${field("notes")}` : null,
    ].filter((line) => line !== null);
    const message = lines.join("\n");

    deliver(via, whatsappUrl(message), mailtoUrl(`Hotel request: ${field("place")}`, message));
    setSent(via);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {sent && <SentNote via={sent} onReset={() => setSent(null)} />}
      <div hidden={sent !== null} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Where to?" className="sm:col-span-2">
            <input name="place" required list={`${id}-places`} placeholder="City, town or area" className="field" />
            <datalist id={`${id}-places`}>
              {stayPlaces.map((place) => (
                <option key={place} value={place} />
              ))}
            </datalist>
          </Field>
          <Field label="Check-in">
            <input name="checkIn" type="date" required className="field" />
          </Field>
          <Field label="Check-out">
            <input name="checkOut" type="date" required aria-describedby={`${id}-date-error`} className="field" />
          </Field>
        </div>
        <p id={`${id}-date-error`} role="alert" className="text-[0.9375rem] font-medium text-clay-deep empty:hidden">
          {dateError}
        </p>
        <div className="grid grid-cols-3 gap-4">
          <Field label="Rooms">
            <input name="rooms" type="number" min={1} defaultValue={1} required className="field" />
          </Field>
          <Field label="Adults">
            <input name="adults" type="number" min={1} defaultValue={2} required className="field" />
          </Field>
          <Field label="Children">
            <input name="children" type="number" min={0} defaultValue={0} className="field" />
          </Field>
        </div>
        <Field label="Stay level">
          <select name="style" defaultValue="Comfort" className="field cursor-pointer">
            {stayStyles.map((style) => (
              <option key={style.id} value={style.label}>
                {style.label}
              </option>
            ))}
          </select>
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Your name">
            <input name="name" required autoComplete="name" className="field" />
          </Field>
          <Field label="Phone or WhatsApp">
            <input
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
        </div>
        <Field label="Anything else?">
          <textarea name="notes" rows={2} placeholder="Sea view, near the station, budget per night" className="field" />
        </Field>
        <SendButtons />
      </div>
    </form>
  );
}

function Field({
  label,
  className = "",
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block text-[0.8125rem] font-semibold ${className}`}>
      <span className="mb-1 block">{label}</span>
      <span className="block font-normal">{children}</span>
    </label>
  );
}
