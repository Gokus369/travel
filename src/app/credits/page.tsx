import type { Metadata } from "next";
import { PageHeading } from "@/components/PageHeading";
import { photos } from "@/data/photos";

export const metadata: Metadata = {
  title: "Photo Credits",
  description: "Credits and licences for the photographs used on the Wave Story website.",
  robots: { index: false },
};

export default function CreditsPage() {
  const list = Object.values(photos);

  return (
    <>
      <PageHeading label="Photo credits" title="The photographers behind these pages">
        <p>
          Photographs on this site come from Wikimedia Commons and are used under the licences shown
          here. They have been resized, and some are cropped or lightly colour-adjusted.
        </p>
      </PageHeading>
      <section className="wrap pb-20">
        <ul className="grid gap-x-10 md:grid-cols-2">
          {list.map((photo) => (
            <li key={photo.src} className="border-t border-ink/15 py-3">
              <a href={photo.source} target="_blank" rel="noreferrer" className="font-medium underline underline-offset-2">
                {photo.title}
              </a>
              <p className="text-[0.9375rem] text-ink-soft">
                {photo.author} ·{" "}
                {photo.licenseUrl ? (
                  <a href={photo.licenseUrl} target="_blank" rel="noreferrer" className="underline underline-offset-2">
                    {photo.license}
                  </a>
                ) : (
                  photo.license
                )}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
