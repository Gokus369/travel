import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { PackageGrid } from "@/components/PackageCard";
import { Photo } from "@/components/Photo";
import { getGuide, guides, readingMinutes } from "@/data/guides";
import { getPackage, packages, type Package } from "@/data/packages";
import { photos } from "@/data/photos";
import { site } from "@/data/site";
import { monthNames } from "@/lib/months";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/guides/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.dek,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: { type: "article", images: [photos[guide.cover].src] },
  };
}

export default async function GuidePage({ params }: PageProps<"/guides/[slug]">) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const trips = guide.packages.map(getPackage).filter((p): p is Package => Boolean(p));

  return (
    <article>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: guide.title,
          description: guide.dek,
          image: `${site.url}${photos[guide.cover].src}`,
          publisher: { "@type": "Organization", name: site.legalName },
        }}
      />

      <header className="wrap max-w-4xl pt-8 md:pt-12">
        <Link href="/guides" className="block w-fit py-1 text-[0.9375rem] font-medium text-ink-soft hover:text-ink">
          ← All travel guides
        </Link>
        <p className="eyebrow mt-6">
          {guide.place} · {readingMinutes(guide)} min read
        </p>
        <h1 className="mt-4 text-[2.625rem] leading-[1.08] md:text-6xl">{guide.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft md:text-xl">{guide.dek}</p>
      </header>

      <div className="wrap mt-8">
        <div className="relative aspect-[16/9] overflow-hidden rounded-md bg-paper-deep md:aspect-[2/1]">
          <Photo name={guide.cover} sizes="(min-width: 1216px) 72rem, 100vw" preload />
        </div>
      </div>

      <div className="wrap mt-10 max-w-4xl">
        <dl className="grid gap-x-8 gap-y-4 rounded-md bg-paper-deep p-5 sm:grid-cols-3 md:p-6">
          {guide.facts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-[0.8125rem] font-semibold text-clay-deep">{fact.label}</dt>
              <dd className="mt-0.5 leading-snug">{fact.value}</dd>
            </div>
          ))}
        </dl>

        <p className="prose-story mt-10 first-letter:float-left first-letter:mt-1.5 first-letter:mr-2.5 first-letter:font-display first-letter:text-[4.25rem] first-letter:leading-[0.8] first-letter:text-clay-deep">
          {guide.intro}
        </p>

        {guide.sections.map((section) => (
          <section key={section.heading} className="mt-11">
            <h2 className="text-3xl leading-tight">{section.heading}</h2>
            <div className="prose-story mt-3">
              {section.body.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
            {section.tips && (
              <ul className="mt-4 space-y-2.5">
                {section.tips.map((tip) => (
                  <li key={tip} className="flex gap-3 text-[1.0625rem] leading-relaxed">
                    <span aria-hidden className="mt-2.5 size-2.5 shrink-0 rounded-full bg-sun" />
                    {tip}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        {guide.slug === "india-month-by-month" && <MonthTable />}
      </div>

      {trips.length > 0 && (
        <section className="wrap mt-16 mb-16">
          <p className="eyebrow">Go there with us</p>
          <h2 className="mt-3 mb-8 text-3xl md:text-4xl">Trips that fit this guide</h2>
          <PackageGrid trips={trips} />
        </section>
      )}
    </article>
  );
}

function MonthTable() {
  return (
    <section className="mt-11">
      <h2 className="text-3xl leading-tight">Our trips by month</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left">
          <thead className="sr-only">
            <tr>
              <th scope="col">Month</th>
              <th scope="col">Trips in season</th>
            </tr>
          </thead>
          <tbody>
            {monthNames.map((name, index) => (
              <tr key={name} className="border-t border-ink/15 align-top">
                <th scope="row" className="font-display w-32 py-3 pr-4 text-lg font-normal">
                  {name}
                </th>
                <td className="py-3 leading-relaxed">
                  {packages
                    .filter((p) => p.months.includes(index + 1))
                    .map((p, tripIndex) => (
                      <span key={p.slug}>
                        {tripIndex > 0 && ", "}
                        <Link href={`/packages/${p.slug}`} className="text-clay-deep underline underline-offset-2">
                          {p.title}
                        </Link>
                      </span>
                    ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
