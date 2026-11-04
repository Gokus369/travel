import Image from "next/image";
import Link from "next/link";
import { WaveEdge } from "@/components/Ornaments";
import { regions } from "@/data/packages";
import { nav, site } from "@/data/site";
import { defaultWhatsappUrl, telUrl } from "@/lib/contact";

export function Footer() {
  return (
    <footer className="mt-auto">
      <WaveEdge className="h-10 text-ink md:h-16" />
      <div className="bg-ink pb-24 text-paper md:pb-10">
        <div className="wrap grid gap-12 pt-10 md:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
          <div>
            <Image
              src="/brand/wordmark-paper.png"
              alt={site.name}
              width={1047}
              height={284}
              className="h-16 w-auto"
            />
            <p className="font-display mt-5 text-sm tracking-[0.14em] text-sun">{site.tagline}</p>
          </div>

          <FooterColumn title="Explore">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-sun">
                  {item.label}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Regions">
            {regions.map((region) => (
              <li key={region.id}>
                <Link href={`/packages?region=${region.id}`} className="hover:text-sun">
                  {region.name}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Talk to us">
            <li>{site.contactName}</li>
            <li>
              <a href={telUrl} className="hover:text-sun">
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={defaultWhatsappUrl} target="_blank" rel="noreferrer" className="hover:text-sun">
                WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="break-all hover:text-sun">
                {site.email}
              </a>
            </li>
            <li className="text-ink-mist">{site.address.full}</li>
          </FooterColumn>
        </div>

        <div className="wrap mt-12">
          <div className="flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-paper/15 pt-6 text-sm text-ink-mist">
            <p>© {site.legalName}</p>
            <Link href="/credits" className="hover:text-sun">
              Photo credits
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-lg text-sun">{title}</h2>
      <ul className="mt-3 space-y-2 text-[0.9375rem]">{children}</ul>
    </div>
  );
}
