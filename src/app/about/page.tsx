import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/Ornaments";
import { PageHeading } from "@/components/PageHeading";
import { Photo } from "@/components/Photo";
import { site } from "@/data/site";
import { defaultWhatsappUrl } from "@/lib/contact";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Wave Story Ventures is a travel company in Varkala, Kerala, planning tour packages across India.",
  alternates: { canonical: "/about" },
};

const promises = [
  { title: "A person, not a portal", body: "You talk to someone who reads your message and plans your trip, from the first idea to the journey home." },
  { title: "Honest about the seasons", body: "If a place is wrong for your month, we will say so and suggest somewhere that is right." },
  { title: "Your trip, your way", body: "Our packages are starting points. Hotels, pace, and route can all change to suit you." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeading label="About us" title="A travel company on the Kerala coast" />

      <section className="wrap grid items-center gap-10 pb-16 lg:grid-cols-2">
        <div className="prose-story max-w-xl">
          <p>
            Wave Story Ventures is based in Varkala, on the red cliffs above the Arabian Sea. From
            here, we plan journeys across the whole of India: tour packages and travel guides, all in
            one place.
          </p>
          <p>
            Our name comes from a simple idea. Waves arrive one after another, and each one is a
            little different. So are good trips. The best ones leave you with something to tell, and
            that is what we plan for: not just a list of sights, but a story you will want to share
            when you get home.
          </p>
          <p>
            Whether it is a slow week on our own coast or a high road through Ladakh, you will deal
            with the same people from your first message to your last day.
          </p>
        </div>
        <Image
          src="/brand/logo.webp"
          alt={`${site.name} logo: ${site.tagline}`}
          width={1070}
          height={815}
          sizes="(min-width: 1024px) 32rem, 90vw"
          className="mx-auto h-auto w-full max-w-lg"
        />
      </section>

      <section className="bg-paper-deep py-16">
        <div className="wrap grid gap-10 md:grid-cols-3">
          {promises.map((promise) => (
            <div key={promise.title}>
              <h2 className="text-2xl leading-tight">{promise.title}</h2>
              <p className="mt-2 leading-relaxed text-ink-soft">{promise.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap grid items-center gap-10 py-16 md:py-20 lg:grid-cols-2">
        <div className="relative aspect-[3/2] overflow-hidden rounded-md">
          <Photo name="varkala-sunset" sizes="(min-width: 1024px) 36rem, 100vw" />
        </div>
        <div>
          <p className="eyebrow">Say hello</p>
          <h2 className="mt-4 text-4xl leading-tight">Talk to {site.contactName}</h2>
          <p className="mt-3 max-w-lg text-lg leading-relaxed text-ink-soft">
            Have a place in mind, or just a month and a feeling? That is enough to get started.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={defaultWhatsappUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
              <WhatsAppIcon className="size-[18px]" />
              WhatsApp {site.contactName}
            </a>
            <Link href="/contact" className="btn btn-ghost">
              Other ways to reach us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
