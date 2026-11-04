import Link from "next/link";
import { WaveEdge, WaveSwash, WhatsAppIcon } from "@/components/Ornaments";
import { Photo } from "@/components/Photo";
import { SeasonPicker } from "@/components/SeasonPicker";
import { ScrollStory } from "@/components/story/ScrollStory";
import { guides, readingMinutes } from "@/data/guides";
import { packages, regions } from "@/data/packages";
import { site } from "@/data/site";
import { defaultWhatsappUrl, telUrl, whatsappUrl } from "@/lib/contact";

const steps = [
  { title: "Tell us the idea", body: "A place, a month, a mood. Message us on WhatsApp, call, or fill in a short form." },
  { title: "We draft your route", body: "You get a day-by-day plan with hotels at your level and a clear quote." },
  { title: "Change anything", body: "Swap hotels, add a night, slow it down. The plan is yours until it feels right." },
  { title: "Go and live it", body: "We book it all and stay reachable while you travel." },
];

export default function Home() {
  const [leadGuide, ...otherGuides] = guides;

  return (
    <>
      <ScrollStory />
      <QuoteBand />

      <section className="wrap py-16 md:py-24">
        <SectionTitle
          label="In season now"
          title="Where the weather is on your side"
          body="India's seasons do not arrive everywhere at once. Pick a month to see which trips are at their best."
        />
        <div className="mt-8">
          <SeasonPicker />
        </div>
      </section>

      <section className="bg-paper-deep py-16 md:py-24">
        <div className="wrap">
          <SectionTitle
            label="All of India"
            title="Six ways into one country"
            body={`${packages.length} ready-made routes, from the Kerala coast to the high passes of Ladakh.`}
          />
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-6">
            {regions.map((region) => (
              <Link key={region.id} href={`/packages?region=${region.id}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden rounded-t-full bg-paper">
                  <Photo
                    name={region.photo}
                    alt=""
                    sizes="(min-width: 1024px) 22rem, (min-width: 768px) 50vw, 80vw"
                    className="transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-3 text-xl leading-tight">{region.name}</h3>
                <p className="mt-1 text-[0.9375rem] leading-snug text-ink-soft">{region.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink text-paper">
        <WaveEdge className="h-10 -scale-y-100 text-paper-deep md:h-16" />
        <div className="wrap py-14 md:py-20">
          <p className="eyebrow !text-sun">How it works</p>
          <h2 className="mt-4 max-w-2xl text-4xl leading-tight md:text-5xl">
            Every trip starts as a conversation
          </h2>
          <WaveSwash className="mt-12 hidden h-8 w-full text-sun lg:block" />
          <ol className="mt-10 grid gap-10 sm:grid-cols-2 lg:mt-6 lg:grid-cols-4">
            {steps.map((step, index) => (
              <li key={step.title}>
                <span className="font-display text-sm tracking-[0.14em] text-sun">Chapter {index + 1}</span>
                <h3 className="mt-2 text-2xl">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-mist">{step.body}</p>
              </li>
            ))}
          </ol>
          <a href={defaultWhatsappUrl} target="_blank" rel="noreferrer" className="btn btn-sun mt-12">
            <WhatsAppIcon className="size-[18px]" />
            Start on WhatsApp
          </a>
        </div>
      </section>

      <section className="wrap py-16 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionTitle label="Travel guides" title="Read before you pack" />
          <Link href="/guides" className="font-semibold text-clay-deep underline underline-offset-4">
            All guides
          </Link>
        </div>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.35fr_1fr]">
          <Link href={`/guides/${leadGuide.slug}`} className="group block">
            <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-paper-deep">
              <Photo
                name={leadGuide.cover}
                sizes="(min-width: 1024px) 40rem, 100vw"
                className="transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            <p className="mt-4 text-[0.8125rem] font-medium text-clay-deep">
              {leadGuide.place} · {readingMinutes(leadGuide)} min read
            </p>
            <h3 className="mt-1 text-3xl leading-tight">{leadGuide.title}</h3>
            <p className="mt-2 max-w-xl leading-relaxed text-ink-soft">{leadGuide.dek}</p>
          </Link>
          <ul className="divide-y divide-ink/15 border-y border-ink/15">
            {otherGuides.slice(0, 4).map((guide) => (
              <li key={guide.slug}>
                <Link href={`/guides/${guide.slug}`} className="group flex items-center gap-4 py-4">
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-full bg-paper-deep">
                    <Photo name={guide.cover} alt="" sizes="8rem" />
                  </div>
                  <div>
                    <p className="text-[0.8125rem] font-medium text-clay-deep">{guide.place}</p>
                    <h3 className="text-xl leading-snug group-hover:text-clay-deep">{guide.title}</h3>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-paper-deep">
        <div className="wrap grid items-center gap-10 py-16 md:py-24 lg:grid-cols-2">
          <div className="relative aspect-[5/4] overflow-hidden rounded-md">
            <Photo name="udaipur-palace" sizes="(min-width: 1024px) 36rem, 100vw" />
          </div>
          <div>
            <p className="eyebrow">Hotel bookings</p>
            <h2 className="mt-4 text-4xl leading-tight md:text-5xl">Just need the room?</h2>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-ink-soft">
              We book stays across India too, from Varkala cliff rooms to Rajasthan havelis and Dal
              Lake houseboats. Send your dates and budget, and we will come back with options.
            </p>
            <Link href="/hotels" className="btn btn-primary mt-7">
              Request a hotel
            </Link>
          </div>
        </div>
      </section>

      <section className="wrap py-16 text-center md:py-24">
        <h2 className="mx-auto max-w-2xl text-4xl leading-tight md:text-5xl">
          What story do you want to tell?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">
          Talk to {site.contactName} in Varkala. Tell us where you are dreaming of, and we will take
          it from there.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a href={defaultWhatsappUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
            <WhatsAppIcon className="size-[18px]" />
            WhatsApp {site.contactName}
          </a>
          <a href={telUrl} className="btn btn-ghost">
            Call {site.phoneDisplay}
          </a>
        </div>
      </section>
    </>
  );
}

function QuoteBand() {
  const quoteUrl = whatsappUrl("Hi Reshma, I'd like a quote for a trip with Wave Story.");

  return (
    <section aria-label="Get a quote" className="wrap pt-10 md:pt-14">
      <div className="flex flex-col gap-5 rounded-md bg-ink p-6 text-paper md:flex-row md:items-center md:justify-between md:p-8">
        <div>
          <h2 className="text-3xl leading-tight">Tell us where you want to go</h2>
          <p className="mt-1 text-ink-mist">We will send your quote on WhatsApp.</p>
        </div>
        <a href={quoteUrl} target="_blank" rel="noreferrer" className="btn btn-sun shrink-0">
          <WhatsAppIcon className="size-[18px]" />
          Get a quote on WhatsApp
        </a>
      </div>
    </section>
  );
}

function SectionTitle({ label, title, body }: { label: string; title: string; body?: string }) {
  return (
    <div className="max-w-2xl">
      <p className="eyebrow">{label}</p>
      <h2 className="mt-4 text-4xl leading-tight md:text-5xl">{title}</h2>
      {body && <p className="mt-3 text-lg leading-relaxed text-ink-soft">{body}</p>}
    </div>
  );
}
