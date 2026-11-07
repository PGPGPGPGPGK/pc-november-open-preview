import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-[#2A3548] bg-[#0A0F1E]">
      {/* Ambient volt glow */}
      <div
        aria-hidden="true"
        className="absolute -top-40 left-1/2 -translate-x-1/2 h-80 w-[120%] rounded-full bg-[#C8F400]/[0.04] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C8F400]/30 to-transparent"
      />

      <div className="relative max-w-7xl mx-auto px-6 pt-12 pb-10">
        {/* Giant CTA wordmark — uses Barlow Condensed display font */}
        <div className="mb-12 md:mb-16 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#C8F400] mb-4">
            See you on the court
          </p>
          <Link
            href="https://pickleball-central.co.in/download"
            className="group inline-block"
            aria-label="Download the Pickleball Central app"
          >
            <span
              className="block text-6xl md:text-8xl lg:text-[10rem] font-black uppercase leading-[0.85] tracking-[-0.02em] text-white group-hover:text-[#C8F400] transition-colors"
              style={{ fontFamily: "var(--font-display)" }}
            >
              BOOK A COURT
              <span className="text-[#C8F400] group-hover:translate-x-2 inline-block transition-transform ml-2">
                →
              </span>
            </span>
          </Link>
        </div>

        {/* Community strip — WhatsApp 150+ players */}
        <div className="mb-12 md:mb-14">
          <a
            href="https://chat.whatsapp.com/HLVDJubO2B3FfLLBqS9KiU"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col md:flex-row md:items-center md:justify-between gap-5 rounded-2xl border border-[#C8F400]/30 bg-[#C8F400]/[0.04] hover:bg-[#C8F400]/[0.08] px-6 md:px-8 py-6 transition-colors"
          >
            <div className="flex items-center gap-4">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C8F400] opacity-60" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#C8F400]" />
              </span>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#C8F400] mb-1">
                  Players WhatsApp Community
                </p>
                <p
                  className="text-2xl md:text-3xl font-black uppercase tracking-[-0.01em] text-white group-hover:text-[#C8F400] transition-colors"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Join 150+ players · growing fast
                </p>
                <p className="text-xs text-[#94A3B8] mt-1">
                  Tournament pings · open play · chit-chats
                </p>
              </div>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C8F400] inline-flex items-center gap-2 group-hover:gap-3 transition-all">
              Join now
              <span aria-hidden>→</span>
            </span>
          </a>
        </div>

        {/* Bottom band — 4-column responsive grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 pt-12 border-t border-[#2A3548]">
          {/* Column 1: Logo + tagline */}
          <div className="col-span-2 md:col-span-1">
            <Link href="https://pickleball-central.co.in/" aria-label="Pickleball Central — Home" className="inline-block mb-4">
              <Image
                src="/logo.png"
                alt="Pickleball Central"
                width={56}
                height={56}
                className="rounded-xl"
              />
            </Link>
            <p className="text-sm text-[#CBD5E1] leading-relaxed max-w-xs">
              Hyderabad&rsquo;s premier pickleball facility. 4 pro courts, on-site café, late-night
              Fri–Sun.
            </p>
            {/* Social row */}
            <div className="flex items-center gap-3 mt-5">
              <SocialIcon href="https://www.instagram.com/pickleballcentralhyd" label="Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M12 2.16c3.2 0 3.58.012 4.85.07 1.17.054 1.81.249 2.23.413.56.219.96.481 1.38.901s.682.821.9 1.382c.165.42.36 1.057.414 2.227.058 1.266.07 1.646.07 4.85s-.012 3.585-.07 4.85c-.054 1.17-.249 1.81-.413 2.23a3.71 3.71 0 01-.9 1.38 3.71 3.71 0 01-1.38.9c-.42.165-1.057.36-2.227.414-1.266.058-1.646.07-4.85.07s-3.585-.012-4.85-.07c-1.17-.054-1.81-.249-2.23-.413a3.71 3.71 0 01-1.38-.9 3.71 3.71 0 01-.9-1.38c-.165-.42-.36-1.057-.414-2.227C2.172 15.747 2.16 15.367 2.16 12s.012-3.585.07-4.85c.054-1.17.249-1.81.413-2.23.219-.56.481-.96.901-1.38s.821-.682 1.382-.9c.42-.165 1.057-.36 2.227-.414C8.413 2.172 8.793 2.16 12 2.16zm0 1.62c-3.15 0-3.5.012-4.74.069-1.06.048-1.638.226-2.022.376-.508.197-.872.433-1.252.812s-.617.745-.815 1.253c-.15.385-.328.962-.376 2.022C2.738 9.65 2.726 10 2.726 12s.012 2.35.069 3.59c.048 1.06.226 1.638.376 2.022.197.508.434.872.812 1.252s.745.617 1.253.815c.385.15.962.328 2.022.376C9.65 20.262 10 20.274 12 20.274s2.35-.012 3.59-.069c1.06-.048 1.638-.226 2.022-.376.508-.198.872-.434 1.252-.812.38-.38.617-.745.815-1.253.15-.385.328-.962.376-2.022.057-1.24.069-1.59.069-3.59s-.012-2.35-.069-3.59c-.048-1.06-.226-1.638-.376-2.022a3.36 3.36 0 00-.812-1.252c-.38-.38-.745-.617-1.253-.815-.385-.15-.962-.328-2.022-.376C14.35 3.79 14 3.78 12 3.78zm0 2.76a5.46 5.46 0 110 10.92 5.46 5.46 0 010-10.92zm0 9a3.54 3.54 0 100-7.08 3.54 3.54 0 000 7.08zm6.94-9.18a1.27 1.27 0 11-2.55 0 1.27 1.27 0 012.55 0z" />
                </svg>
              </SocialIcon>
              <SocialIcon href="https://wa.me/919700744634" label="WhatsApp">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </SocialIcon>
              <SocialIcon href="mailto:hi@pickleball-central.co.in" label="Email">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </SocialIcon>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C8F400] mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "About Us", href: "https://pickleball-central.co.in/about" },
                { label: "Tournaments", href: "https://pickleball-central.co.in/tournaments" },
                { label: "Coaching", href: "https://pickleball-central.co.in/#coaching" },
                { label: "Membership", href: "https://pickleball-central.co.in/membership" },
                { label: "Get the App", href: "https://pickleball-central.co.in/download" },
                { label: "Summer Camp", href: "https://pickleball-central.co.in/summer-camp" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#94A3B8] hover:text-[#C8F400] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Visit */}
          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C8F400] mb-4">
              Visit
            </h3>
            <address className="not-italic space-y-2.5 text-sm text-[#94A3B8]">
              <p className="text-white">Peerzadiguda, Hyderabad</p>
              <p>Open daily &middot; 6 AM – 11 PM</p>
              <p>
                <a href="tel:+919700744634" className="hover:text-[#C8F400] transition-colors">
                  +91 97007 44634
                </a>
              </p>
              <p>
                <a
                  href="mailto:hi@pickleball-central.co.in"
                  className="hover:text-[#C8F400] transition-colors break-all"
                >
                  hi@pickleball-central.co.in
                </a>
              </p>
            </address>
          </div>

          {/* Column 4: Get the App */}
          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C8F400] mb-4">
              Get the App
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="https://play.google.com/store/apps/details?id=com.snowflakeenterprises.pickleballcentral"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#94A3B8] hover:text-[#C8F400] transition-colors"
                >
                  Android — Play Store
                </a>
              </li>
              <li>
                <a
                  href="https://apps.apple.com/in/app/pickleball-central/id6787500349"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#94A3B8] hover:text-[#C8F400] transition-colors"
                >
                  iOS — App Store
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal-entity statement — explicit brand ↔ registered-entity link.
            Kept human-readable (not the mono microtype) so it clearly
            communicates that Pickleball Central is operated by Snowflake
            Enterprises, for customers and for platform/KYC verification. */}
        <div className="mt-12 pt-8 border-t border-[#2A3548]">
          <p className="text-xs md:text-sm text-[#94A3B8] leading-relaxed max-w-3xl">
            <span className="text-[#CBD5E1] font-medium">Pickleball Central</span> is a brand owned
            and operated by{" "}
            <Link
              href="https://pickleball-central.co.in/about"
              className="text-[#CBD5E1] font-medium hover:text-[#C8F400] transition-colors"
            >
              Snowflake Enterprises
            </Link>
            , a registered partnership firm &middot; GSTIN 36AFNFS2231R1ZC. All court bookings,
            memberships, coaching, events, and GST invoices are provided by Snowflake Enterprises.
          </p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-[#94A3B8]">
            Registered office: P.15/2, Kakateya Nagar Colony, Habsiguda, Hyderabad, Telangana 500007
          </p>
        </div>

        {/* Legal strip */}
        <div className="mt-6 pt-6 border-t border-[#2A3548] flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#94A3B8]">
            &copy; 2026 Snowflake Enterprises &middot; All rights reserved
          </p>
          <nav
            aria-label="Legal"
            className="flex flex-wrap items-center gap-4 font-mono text-[10px] uppercase tracking-[0.15em] text-[#94A3B8]"
          >
            <Link href="https://pickleball-central.co.in/about" className="hover:text-[#C8F400] transition-colors">
              About
            </Link>
            <Link href="https://pickleball-central.co.in/support" className="hover:text-[#C8F400] transition-colors">
              Support
            </Link>
            <Link href="https://pickleball-central.co.in/terms" className="hover:text-[#C8F400] transition-colors">
              Terms of Service
            </Link>
            <Link href="https://pickleball-central.co.in/privacy" className="hover:text-[#C8F400] transition-colors">
              Privacy Policy
            </Link>
          </nav>
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#94A3B8]">
            Made with <span aria-hidden="true">💚</span>
            <span className="sr-only"> love </span> by{" "}
            <a
              href="https://talecrafters.in?ref=pickleballcentral"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#CBD5E1] hover:text-[#C8F400] transition-colors"
            >
              Talecrafters
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="h-9 w-9 rounded-full border border-[#2A3548] flex items-center justify-center text-[#94A3B8] hover:text-[#C8F400] hover:border-[#C8F400]/40 hover:bg-[#C8F400]/5 transition-all"
    >
      {children}
    </a>
  );
}
