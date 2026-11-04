import Link from "next/link";
import { Photo } from "@/components/Photo";
import { durationLabel, type Package, priceLabel, regionName } from "@/data/packages";
import { monthRange } from "@/lib/months";

export function PackageCard({ trip }: { trip: Package }) {
  return (
    <article className="group relative flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-paper-deep">
        <Photo
          name={trip.cover}
          sizes="(min-width: 1024px) 30rem, (min-width: 640px) 50vw, 100vw"
          className="transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <span className="absolute bottom-3 left-3 rounded-full bg-paper px-3 py-1 text-[0.8125rem] font-semibold text-ink">
          {durationLabel(trip)}
        </span>
      </div>

      <p className="mt-4 text-[0.8125rem] font-medium text-clay-deep">
        {regionName(trip.region)} · Best {monthRange(trip.months)}
      </p>
      <h3 className="mt-1 text-2xl leading-tight">
        <Link href={`/packages/${trip.slug}`} className="after:absolute after:inset-0">
          {trip.title}
        </Link>
      </h3>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">{trip.route.join(" → ")}</p>
      <p className="mt-3 text-[0.9375rem] font-semibold">{priceLabel(trip)}</p>
    </article>
  );
}

export function PackageGrid({ trips }: { trips: Package[] }) {
  return (
    <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {trips.map((trip) => (
        <PackageCard key={trip.slug} trip={trip} />
      ))}
    </div>
  );
}
