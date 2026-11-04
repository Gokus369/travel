"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/Ornaments";
import { nav, site } from "@/data/site";
import { defaultWhatsappUrl } from "@/lib/contact";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // The layout stays mounted across navigations, so close the menu when it hides too.
  useLayoutEffect(() => () => setOpen(false), []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/95 backdrop-blur-sm transition-transform duration-300">
      <div className="wrap flex h-[4.5rem] items-center justify-between gap-6">
        <Link href="/" aria-label={`${site.name} home`} onClick={() => setOpen(false)}>
          <Image
            src="/brand/wordmark-ink.png"
            alt=""
            width={1047}
            height={284}
            preload
            className="h-11 w-auto"
          />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className="py-2 text-[0.9375rem] font-medium text-ink-soft transition-colors hover:text-ink aria-[current=page]:text-clay-deep"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={defaultWhatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary hidden !min-h-11 !px-5 sm:inline-flex"
          >
            <WhatsAppIcon className="size-[18px]" />
            Plan on WhatsApp
          </a>
          <button
            type="button"
            className="grid size-11 cursor-pointer place-items-center rounded-full text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
              {open ? (
                <path d="M6 6l12 12M18 6 6 18" />
              ) : (
                <path d="M3 8c3-2 6-2 9 0s6 2 9 0M3 16c3-2 6-2 9 0s6 2 9 0" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-ink/10 bg-paper lg:hidden">
          <ul className="wrap py-3">
            {nav.map((item) => (
              <li key={item.href} className="border-b border-ink/10 last:border-0">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="font-display block py-3.5 text-2xl aria-[current=page]:text-clay-deep"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
