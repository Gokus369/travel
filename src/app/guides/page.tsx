import type { Metadata } from "next";
import Link from "next/link";
import { PageHeading } from "@/components/PageHeading";
import { Photo } from "@/components/Photo";
import { guides, readingMinutes } from "@/data/guides";

export const metadata: Metadata = {
  title: "Travel Guides for India",
  description:
    "Practical India travel guides from Wave Story: Varkala, Kerala houseboats, Ladakh altitude, Rajasthan routes, the Andamans and when to go, month by month.",
  alternates: { canonical: "/guides" },
};

export default function GuidesPage() {
  return (
    <>
      <PageHeading label="Travel guides" title="Read before you pack">
        <p>
          Plain advice on where to go, when to go and what catches people out. Free to use, whether
          you travel with us or not.
        </p>
      </PageHeading>
      <section className="wrap pb-20">
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <article key={guide.slug} className="group relative">
              <div className="relative aspect-[3/2] overflow-hidden rounded-md bg-paper-deep">
                <Photo
                  name={guide.cover}
                  sizes="(min-width: 1024px) 30rem, (min-width: 640px) 50vw, 100vw"
                  className="transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <p className="mt-4 text-[0.8125rem] font-medium text-clay-deep">
                {guide.place} · {readingMinutes(guide)} min read
              </p>
              <h2 className="mt-1 text-2xl leading-tight">
                <Link href={`/guides/${guide.slug}`} className="after:absolute after:inset-0">
                  {guide.title}
                </Link>
              </h2>
              <p className="mt-2 leading-relaxed text-ink-soft">{guide.dek}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
