import type { Metadata } from "next";
import { Suspense } from "react";
import { PackageExplorer } from "@/components/PackageExplorer";
import { PackageGrid } from "@/components/PackageCard";
import { PageHeading } from "@/components/PageHeading";
import { packages } from "@/data/packages";

export const metadata: Metadata = {
  title: "All India Tour Packages",
  description:
    "Ready-made tour packages across India: Kerala, Rajasthan, Kashmir, Ladakh, Goa, the Andamans, Meghalaya and more, all adjustable to your dates and budget.",
  alternates: { canonical: "/packages" },
};

export default function PackagesPage() {
  return (
    <>
      <PageHeading label="Tour packages" title="All India, one route at a time">
        <p>
          Every trip here is a starting point. Change the dates, the hotels or the pace, and we will
          quote for exactly what you want.
        </p>
      </PageHeading>
      <section className="wrap pb-20">
        <h2 className="sr-only">All trips</h2>
        {/* Filters read the URL, so they fill in on the client. The full list is the prerendered fallback. */}
        <Suspense fallback={<PackageGrid trips={packages} />}>
          <PackageExplorer />
        </Suspense>
      </section>
    </>
  );
}
