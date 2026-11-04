"use client";

import { useSearchParams } from "next/navigation";
import { PackageGrid } from "@/components/PackageCard";
import { lengthFilters, packages, regions } from "@/data/packages";
import { monthNames } from "@/lib/months";

export function PackageExplorer() {
  const searchParams = useSearchParams();
  const region = searchParams.get("region") ?? "";
  const month = Number(searchParams.get("month")) || 0;
  const length = searchParams.get("length") ?? "";

  const lengthFilter = lengthFilters.find((f) => f.id === length);
  const results = packages.filter(
    (p) =>
      (!region || p.region === region) &&
      (!month || p.months.includes(month)) &&
      (!lengthFilter || lengthFilter.match(p.days)),
  );

  function update(key: string, value: string) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    const query = next.toString();
    window.history.replaceState(null, "", query ? `?${query}` : window.location.pathname);
  }

  const filtered = region || month || length;

  return (
    <>
      <div className="grid gap-4 rounded-md bg-paper-deep p-4 sm:grid-cols-3 md:p-5">
        <FilterSelect label="Region" value={region} onChange={(v) => update("region", v)} anyLabel="All of India">
          {regions.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </FilterSelect>
        <FilterSelect label="Travelling in" value={month ? String(month) : ""} onChange={(v) => update("month", v)} anyLabel="Any month">
          {monthNames.map((name, index) => (
            <option key={name} value={index + 1}>
              {name}
            </option>
          ))}
        </FilterSelect>
        <FilterSelect label="Trip length" value={length} onChange={(v) => update("length", v)} anyLabel="Any length">
          {lengthFilters.map((f) => (
            <option key={f.id} value={f.id}>
              {f.label}
            </option>
          ))}
        </FilterSelect>
      </div>

      <div className="mt-6 mb-10 flex min-h-11 flex-wrap items-center justify-between gap-3">
        <p aria-live="polite" className="text-ink-soft">
          {results.length === 1 ? "1 trip" : `${results.length} trips`}
          {filtered ? " match" : " across India"}
          {filtered && results.length === 1 ? "es" : ""}
        </p>
        {filtered && (
          <button
            type="button"
            onClick={() => window.history.replaceState(null, "", window.location.pathname)}
            className="min-h-11 cursor-pointer text-[0.9375rem] font-semibold text-clay-deep underline underline-offset-4"
          >
            Clear filters
          </button>
        )}
      </div>

      {results.length > 0 ? (
        <PackageGrid trips={results} />
      ) : (
        <div className="rounded-md border border-ink/15 p-8 text-center">
          <p className="font-display text-2xl">No trip fits all three yet.</p>
          <p className="mx-auto mt-2 max-w-md text-ink-soft">
            Try a different month, or tell us what you have in mind and we will build one around
            your dates.
          </p>
        </div>
      )}
    </>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  anyLabel,
  children,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  anyLabel: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-[0.8125rem] font-semibold">
      {label}
      <select value={value} onChange={(e) => onChange(e.target.value)} className="field mt-1 cursor-pointer font-normal">
        <option value="">{anyLabel}</option>
        {children}
      </select>
    </label>
  );
}
