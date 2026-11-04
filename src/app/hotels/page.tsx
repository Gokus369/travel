import type { Metadata } from "next";
import { HotelForm } from "@/components/HotelForm";
import { PageHeading } from "@/components/PageHeading";
import { Photo } from "@/components/Photo";
import { stays, stayStyles } from "@/data/stays";

export const metadata: Metadata = {
  title: "Hotel Bookings Across India",
  description:
    "Hotel bookings across India by Wave Story: cliff stays in Varkala, Kerala houseboats, Rajasthan havelis, Dal Lake houseboats and island resorts.",
  alternates: { canonical: "/hotels" },
};

export default function HotelsPage() {
  return (
    <>
      <PageHeading label="Hotel bookings" title="Tell us the dates. We will find the room.">
        <p>
          Send your destination, dates and budget. We will come back with a shortlist of stays that
          suit you, with rates, and book the one you choose.
        </p>
      </PageHeading>

      <section className="wrap grid gap-10 pb-16 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <h2 className="text-3xl">Choose your level</h2>
          <dl className="mt-4 divide-y divide-ink/15 border-y border-ink/15">
            {stayStyles.map((style) => (
              <div key={style.id} className="grid gap-1 py-4 sm:grid-cols-[7rem_1fr]">
                <dt className="font-display text-xl">{style.label}</dt>
                <dd className="leading-relaxed text-ink-soft">{style.body}</dd>
              </div>
            ))}
          </dl>
          <div className="relative mt-8 hidden aspect-[3/2] overflow-hidden rounded-md lg:block">
            <Photo name="pichola-sunset" sizes="30rem" />
          </div>
        </div>
        <div className="rounded-md bg-paper-light p-5 shadow-sm ring-1 ring-ink/10 md:p-7">
          <h2 className="mb-5 text-3xl">Request a hotel</h2>
          <HotelForm />
        </div>
      </section>

      <section className="bg-paper-deep py-16 md:py-20">
        <div className="wrap">
          <p className="eyebrow">Stays across India</p>
          <h2 className="mt-4 max-w-2xl text-4xl leading-tight md:text-5xl">The room is part of the story</h2>
          <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {stays.map((stay) => (
              <article key={stay.place}>
                <div className="relative aspect-[3/2] overflow-hidden rounded-md bg-paper">
                  <Photo name={stay.photo} sizes="(min-width: 1024px) 30rem, (min-width: 640px) 50vw, 100vw" />
                </div>
                <p className="mt-4 text-[0.8125rem] font-medium text-clay-deep">
                  {stay.place}, {stay.state}
                </p>
                <h3 className="mt-1 text-2xl leading-tight">{stay.kind}</h3>
                <p className="mt-2 leading-relaxed text-ink-soft">{stay.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <div className="pb-16" />
    </>
  );
}
