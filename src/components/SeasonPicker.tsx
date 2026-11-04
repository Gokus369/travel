"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { PackageGrid } from "@/components/PackageCard";
import { packages } from "@/data/packages";
import { monthNames, monthShort } from "@/lib/months";

const subscribe = () => () => {};
const getCurrentMonth = () => new Date().getMonth() + 1;
const getPrerenderMonth = () => 0;

export function SeasonPicker() {
  const currentMonth = useSyncExternalStore(subscribe, getCurrentMonth, getPrerenderMonth);
  const [picked, setPicked] = useState<number | null>(null);
  const month = picked ?? currentMonth;

  // Before hydration the month is unknown, so the first trips stand in.
  const inSeason = month ? packages.filter((p) => p.months.includes(month)) : packages;

  return (
    <div>
      <div role="group" aria-label="Choose a month" className="grid grid-cols-6 gap-1 md:grid-cols-12">
        {monthShort.map((name, index) => {
          const value = index + 1;
          const active = value === month;
          return (
            <button
              key={name}
              type="button"
              aria-pressed={active}
              aria-label={monthNames[index]}
              onClick={() => setPicked(value)}
              className={`min-h-11 cursor-pointer rounded-full px-2 text-[0.9375rem] font-medium transition-colors ${
                active ? "bg-ink text-paper" : "text-ink-soft hover:bg-paper-deep hover:text-ink"
              }`}
            >
              {name}
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="mt-8 mb-8 text-ink-soft">
        {month
          ? `${inSeason.length} trips are in season in ${monthNames[month - 1]}.`
          : `${packages.length} trips, every one with its best months marked.`}
      </p>

      <PackageGrid trips={inSeason.slice(0, 3)} />

      <Link
        href={month ? `/packages?month=${month}` : "/packages"}
        className="btn btn-ghost mt-10"
      >
        {month ? `See all ${inSeason.length} ${monthNames[month - 1]} trips` : "See all trips"}
      </Link>
    </div>
  );
}
