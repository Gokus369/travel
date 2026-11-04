export function PageHeading({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="wrap pt-12 pb-10 md:pt-16">
      <p className="eyebrow">{label}</p>
      <h1 className="mt-4 max-w-4xl text-[2.625rem] leading-[1.08] md:text-6xl">{title}</h1>
      {children && <div className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">{children}</div>}
    </div>
  );
}
