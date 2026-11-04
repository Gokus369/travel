import type { Metadata } from "next";
import { EnquiryForm } from "@/components/EnquiryForm";
import { PageHeading } from "@/components/PageHeading";
import { site } from "@/data/site";
import { defaultWhatsappUrl, telUrl } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Plan a trip with ${site.legalName}. Call or WhatsApp ${site.contactName} on ${site.phoneDisplay}, or email ${site.email}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const methods = [
    { label: "Call", value: site.phoneDisplay, href: telUrl },
    { label: "WhatsApp", value: "Message us", href: defaultWhatsappUrl, external: true },
    { label: "Email", value: site.email, href: `mailto:${site.email}` },
    {
      label: "Find us",
      value: site.address.full,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address.full)}`,
      external: true,
    },
  ];

  return (
    <>
      <PageHeading label="Contact" title={`Talk to ${site.contactName}`}>
        <p>Tell us where you would like to go. A rough idea is plenty to begin with.</p>
      </PageHeading>

      <section className="wrap grid gap-10 pb-20 lg:grid-cols-[1fr_1.2fr]">
        <ul className="divide-y divide-ink/15 self-start border-y border-ink/15">
          {methods.map((method) => (
            <li key={method.label}>
              <a
                href={method.href}
                {...(method.external ? { target: "_blank", rel: "noreferrer" } : {})}
                className="group block py-5"
              >
                <span className="text-[0.8125rem] font-semibold text-clay-deep">{method.label}</span>
                <span className="font-display mt-0.5 block text-2xl leading-snug break-words group-hover:text-clay-deep">
                  {method.value}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="rounded-md bg-paper-light p-5 shadow-sm ring-1 ring-ink/10 md:p-7">
          <h2 className="mb-5 text-3xl">Plan a trip</h2>
          <EnquiryForm />
        </div>
      </section>
    </>
  );
}
