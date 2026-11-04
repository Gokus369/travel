import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EnquiryForm } from "@/components/EnquiryForm";
import { JsonLd } from "@/components/JsonLd";
import { PackageGrid } from "@/components/PackageCard";
import { Photo } from "@/components/Photo";
import { guides } from "@/data/guides";
import { durationLabel, getPackage, packages, priceLabel, regionName } from "@/data/packages";
import { photos } from "@/data/photos";
import { site } from "@/data/site";
import { monthRange, monthShort } from "@/lib/months";

export const dynamicParams = false;

export function generateStaticParams() {
  return packages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/packages/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const trip = getPackage(slug);
  if (!trip) return {};
  return {
    title: `${trip.title}: ${trip.days}-Day Tour of ${trip.states}`,
    description: trip.tagline,
    alternates: { canonical: `/packages/${trip.slug}` },
    openGraph: { images: [photos[trip.cover].src] },
  };
}

export default async function PackagePage({ params }: PageProps<"/packages/[slug]">) {
  const { slug } = await params;
  const trip = getPackage(slug);
  if (!trip) notFound();

  const related = packages.filter((p) => p.region === trip.region && p.slug !== trip.slug).slice(0, 3);
  const moreTrips = related.length > 0 ? related : packages.filter((p) => p.slug !== trip.slug).slice(0, 3);
  const guide = guides.find((g) => g.packages.includes(trip.slug));

  const facts = [
    { label: "Duration", value: durationLabel(trip) },
    { label: "Best months", value: monthRange(trip.months) },
    { label: "Pace", value: trip.pace },
    { label: "Good for", value: trip.goodFor.join(", ") },
  ];

  return (
    <article>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TouristTrip",
          name: trip.title,
          description: trip.tagline,
          url: `${site.url}/packages/${trip.slug}`,
          touristType: trip.goodFor,
          itinerary: {
            "@type": "ItemList",
            itemListElement: trip.itinerary.map((day, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: `Day ${index + 1}: ${day.title}`,
            })),
          },
          provider: { "@type": "TravelAgency", name: site.legalName, url: site.url },
        }}
      />

      <header className="wrap pt-8 md:pt-12">
        <Link href="/packages" className="block w-fit py-1 text-[0.9375rem] font-medium text-ink-soft hover:text-ink">
          ← All tour packages
        </Link>
        <p className="eyebrow mt-6">{regionName(trip.region)}</p>
        <h1 className="mt-4 max-w-4xl text-[2.625rem] leading-[1.08] md:text-6xl">{trip.title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft md:text-xl">{trip.tagline}</p>
        <p className="mt-4 font-medium text-clay-deep">{trip.route.join(" → ")}</p>
      </header>

      <div className="wrap mt-8 grid gap-3 md:grid-cols-[2fr_1fr]">
        <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-paper-deep md:aspect-auto md:min-h-[28rem]">
          <Photo name={trip.cover} sizes="(min-width: 768px) 50rem, 100vw" preload />
        </div>
        {trip.gallery.length > 0 && (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-1">
            {trip.gallery.slice(0, 2).map((photo) => (
              <div key={photo} className="relative aspect-[4/3] overflow-hidden rounded-md bg-paper-deep md:aspect-auto">
                <Photo name={photo} sizes="(min-width: 768px) 25rem, 50vw" />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="wrap mt-8">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-y border-ink/15 py-5 lg:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-[0.8125rem] font-semibold text-clay-deep">{fact.label}</dt>
              <dd className="mt-0.5">{fact.value}</dd>
            </div>
          ))}
        </dl>
        <a href="#enquire" className="btn btn-primary mt-5 w-full lg:hidden">
          Get a quote for this trip
        </a>
      </div>

      <div className="wrap mt-12 grid gap-14 lg:grid-cols-[1fr_24rem]">
        <div className="min-w-0">
          <section className="prose-story max-w-2xl">
            <p>{trip.story}</p>
          </section>

          <section className="mt-12">
            <h2 className="text-3xl md:text-4xl">The highlights</h2>
            <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {trip.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3 leading-relaxed">
                  <span aria-hidden className="mt-2 size-2.5 shrink-0 rounded-full bg-sun" />
                  {highlight}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-14">
            <h2 className="text-3xl md:text-4xl">The story, day by day</h2>
            <ol className="mt-8">
              {trip.itinerary.map((day, index) => (
                <li key={day.title} className="not-last:wave-rail relative pb-9 pl-16 last:pb-0">
                  <span className="absolute top-0 left-0 grid size-11 place-items-center rounded-full bg-ink font-display text-paper">
                    <span className="sr-only">Day </span>
                    {index + 1}
                  </span>
                  <h3 className="pt-1.5 text-2xl leading-tight">{day.title}</h3>
                  <p className="mt-2 max-w-2xl leading-relaxed text-ink-soft">{day.body}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-14 rounded-md bg-paper-deep p-6 md:p-8">
            <h2 className="text-2xl">When to go</h2>
            <ul aria-label={`Best months: ${monthRange(trip.months)}`} className="mt-4 grid grid-cols-6 gap-1.5 sm:grid-cols-12">
              {monthShort.map((name, index) => {
                const good = trip.months.includes(index + 1);
                return (
                  <li
                    key={name}
                    aria-hidden
                    className={`rounded py-2 text-center text-[0.8125rem] font-medium ${
                      good ? "bg-sun text-ink" : "bg-paper text-ink-soft"
                    }`}
                  >
                    {name}
                  </li>
                );
              })}
            </ul>
            <p className="mt-5 leading-relaxed text-ink-soft">
              <strong className="font-semibold text-ink">Good to know: </strong>
              {trip.note}
            </p>
          </section>

          <section className="mt-14">
            <h2 className="text-3xl md:text-4xl">What a quote usually covers</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">
              Every trip is priced for your dates, group size and hotel level, so your quote will
              spell out exactly what is included.
            </p>
            <div className="mt-6 grid gap-8 sm:grid-cols-2">
              <CoverList
                title="Usually included"
                items={["Hotels at your chosen level", "Daily breakfast", "Private vehicle with driver", "Airport or station transfers"]}
              />
              <CoverList
                title="Usually extra"
                items={["Flights and trains to the start", "Entry tickets and activities", "Lunches and dinners", "Tips and personal spending"]}
              />
            </div>
          </section>

          {guide && (
            <Link href={`/guides/${guide.slug}`} className="group mt-14 flex items-center gap-5 rounded-md border border-ink/15 p-4">
              <div className="relative size-20 shrink-0 overflow-hidden rounded-full">
                <Photo name={guide.cover} alt="" sizes="8rem" />
              </div>
              <div>
                <p className="text-[0.8125rem] font-semibold text-clay-deep">Read the guide</p>
                <p className="font-display text-xl leading-snug group-hover:text-clay-deep">{guide.title}</p>
              </div>
            </Link>
          )}
        </div>

        <aside id="enquire" className="scroll-mt-24 lg:self-start [@media(min-height:58rem)]:lg:sticky [@media(min-height:58rem)]:lg:top-24">
          <div className="rounded-md bg-paper-light p-5 shadow-sm ring-1 ring-ink/10 md:p-6">
            <p className="text-[0.8125rem] font-semibold text-clay-deep">{priceLabel(trip)}</p>
            <h2 className="mt-1 text-2xl leading-tight">Plan this trip with {site.contactName}</h2>
            <p className="mt-2 mb-5 text-[0.9375rem] leading-relaxed text-ink-soft">
              Send your dates and you will get a quote back. No payment or commitment needed.
            </p>
            <EnquiryForm trip={trip.title} />
          </div>
        </aside>
      </div>

      <section className="wrap mt-20 mb-16">
        <h2 className="mb-8 text-3xl md:text-4xl">You might also like</h2>
        <PackageGrid trips={moreTrips} />
      </section>
    </article>
  );
}

function CoverList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-xl">{title}</h3>
      <ul className="mt-2 divide-y divide-ink/10">
        {items.map((item) => (
          <li key={item} className="py-2 text-ink-soft">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
