import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap py-24 text-center md:py-32">
      <p className="eyebrow">Page not found</p>
      <h1 className="mt-4 text-5xl leading-tight md:text-6xl">This road washed out</h1>
      <p className="mx-auto mt-4 max-w-md text-lg text-ink-soft">
        The page you were after is not here, but there is plenty of India left to see.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link href="/packages" className="btn btn-primary">
          See tour packages
        </Link>
        <Link href="/" className="btn btn-ghost">
          Back to home
        </Link>
      </div>
    </section>
  );
}
