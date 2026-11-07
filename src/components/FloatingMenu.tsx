"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// Stagger reveal for the nav links — was GSAP `expo.out` with
// stagger 0.07 / delay 0.15. Equivalent framer-motion bezier:
// expo.out ≈ [0.16, 1, 0.3, 1].
const navListVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};
const navItemVariants = {
  hidden: { y: "120%", opacity: 0, rotate: 6 },
  show: {
    y: "0%",
    opacity: 1,
    rotate: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

// Was GSAP `power3.out` with stagger 0.08 / delay 0.5.
// power3.out ≈ [0.22, 1, 0.36, 1].
const metaContainerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.5 } },
};
const metaItemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const NAV_LINKS = [
  { label: "HOME", href: "https://pickleball-central.co.in/" },
  // Tournaments program page (/tournaments) — internal app route that then
  // links onward to the current event at /october.
  { label: "TOURNAMENTS", href: "https://pickleball-central.co.in/tournaments" },
  { label: "COACHING", href: "https://pickleball-central.co.in/#coaching" },
  { label: "MEMBERSHIP", href: "https://pickleball-central.co.in/membership" },
  { label: "GET THE APP", href: "https://pickleball-central.co.in/download" },
  { label: "ABOUT US", href: "https://pickleball-central.co.in/about" },
];

export default function FloatingMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* Floating logo pill (top-left) */}
      <Link
        href="https://pickleball-central.co.in/"
        aria-label="Pickleball Central — Home"
        className="fixed top-4 left-4 md:top-6 md:left-6 z-[60] group"
      >
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 rounded-full border border-[#2A3548] bg-[#0A0F1E]/70 backdrop-blur-md px-2 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
        >
          <Image
            src="/logo.png"
            alt="Pickleball Central"
            width={36}
            height={36}
            priority
            className="rounded-full h-9 w-9"
          />
          <span className="hidden md:inline font-mono text-[10px] uppercase tracking-[0.2em] text-[#94A3B8] group-hover:text-[#C8F400] transition-colors pr-3">
            Pickleball Central
          </span>
        </motion.div>
      </Link>

      {/* Floating hamburger (top-right) */}
      <motion.button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="fixed top-4 right-4 md:top-6 md:right-6 z-[70] h-12 w-12 md:h-14 md:w-14 rounded-full border border-[#2A3548] bg-[#0A0F1E]/70 backdrop-blur-md flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:border-[#C8F400]/60 hover:shadow-[0_0_24px_rgba(200,244,0,0.25)] transition-all"
      >
        <span className="relative h-4 w-6 block">
          <motion.span
            aria-hidden
            className="absolute left-0 top-0 h-[2px] w-6 rounded-full bg-[#C8F400]"
            animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.span
            aria-hidden
            className="absolute left-0 top-[7px] h-[2px] w-6 rounded-full bg-[#C8F400]"
            animate={open ? { opacity: 0, x: 12 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
          />
          <motion.span
            aria-hidden
            className="absolute left-0 bottom-0 h-[2px] w-6 rounded-full bg-[#C8F400]"
            animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          />
        </span>
      </motion.button>

      {/* Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="fm-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[65]"
            role="dialog"
            aria-modal="true"
          >
            {/* Animated diagonal panel */}
            <motion.div
              initial={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
              animate={{ clipPath: "circle(150% at calc(100% - 44px) 44px)" }}
              exit={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-0 bg-[#0A0F1E]"
            >
              {/* Ambient volt glow */}
              <div
                aria-hidden
                className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-[#C8F400]/10 blur-3xl"
              />
              <div
                aria-hidden
                className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-[#1E3A5F]/40 blur-3xl"
              />
              {/* Court-line accent */}
              <div
                aria-hidden
                className="absolute inset-x-12 top-28 h-px bg-gradient-to-r from-transparent via-[#C8F400]/40 to-transparent"
              />
              <div
                aria-hidden
                className="absolute inset-x-12 bottom-28 h-px bg-gradient-to-r from-transparent via-[#C8F400]/20 to-transparent"
              />
            </motion.div>

            {/* Content */}
            <div className="relative h-full w-full flex flex-col justify-center px-6 md:px-16 max-w-7xl mx-auto">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#C8F400] mb-6 md:mb-10">
                The Menu
              </p>
              <nav>
                <motion.ul
                  variants={navListVariants}
                  initial="hidden"
                  animate="show"
                  className="space-y-1 md:space-y-2"
                >
                  {NAV_LINKS.map((link, i) => {
                    const linkClass =
                      "group inline-flex items-baseline gap-4 md:gap-6 text-5xl md:text-8xl lg:text-9xl font-black uppercase tracking-[-0.02em] leading-[0.95] text-white hover:text-[#C8F400] transition-colors";
                    const inner = (
                      <>
                        <span className="font-mono text-[10px] md:text-xs text-[#94A3B8] group-hover:text-[#C8F400] tracking-[0.2em] tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span>{link.label}</span>
                        <span
                          aria-hidden
                          className="text-[#C8F400] opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                        >
                          →
                        </span>
                      </>
                    );
                    return (
                      <motion.li
                        key={link.href}
                        variants={navItemVariants}
                        className="overflow-hidden"
                      >
                        <Link
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className={linkClass}
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {inner}
                        </Link>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </nav>

              <motion.div
                variants={metaContainerVariants}
                initial="hidden"
                animate="show"
                className="mt-10 md:mt-16 pt-8 border-t border-[#2A3548] grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10"
              >
                <motion.div variants={metaItemVariants}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#C8F400] mb-2">
                    Visit
                  </p>
                  <p className="text-sm text-[#CBD5E1]">
                    Peerzadiguda, Hyderabad
                    <br />
                    Daily · 6am–11pm
                  </p>
                </motion.div>
                <motion.div variants={metaItemVariants}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#C8F400] mb-2">
                    Contact
                  </p>
                  <p className="text-sm text-[#CBD5E1]">
                    <a href="tel:+919700744634" className="hover:text-[#C8F400] transition-colors">
                      +91 97007 44634
                    </a>
                    <br />
                    <a
                      href="mailto:hi@pickleball-central.co.in"
                      className="hover:text-[#C8F400] transition-colors break-all"
                    >
                      hi@pickleball-central.co.in
                    </a>
                  </p>
                </motion.div>
                <motion.div variants={metaItemVariants}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#C8F400] mb-2">
                    Community
                  </p>
                  <a
                    href="https://chat.whatsapp.com/HLVDJubO2B3FfLLBqS9KiU"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-sm text-[#CBD5E1] hover:text-[#C8F400] transition-colors"
                  >
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#C8F400] animate-pulse" />
                    Join 150+ players on WhatsApp
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                  <div className="flex items-center gap-4 text-sm mt-3">
                    <a
                      href="https://www.instagram.com/pickleballcentralhyd"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#94A3B8] hover:text-[#C8F400] transition-colors"
                    >
                      Instagram
                    </a>
                    <a
                      href="https://wa.me/919700744634"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#94A3B8] hover:text-[#C8F400] transition-colors"
                    >
                      DM us
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
