/**
 * Site facts shared by the header and footer — copied from the redesigned Pickleball Central
 * site (lib/site.ts). This preview is a standalone static copy, so every link is absolute and
 * points at a verified live URL.
 */
export const ORIGIN = "https://pickleball-central.co.in";

export const NAV = [
  { label: "Book a Court", href: `${ORIGIN}/play` },
  { label: "Tournaments", href: `${ORIGIN}/tournaments` },
  { label: "Coaching", href: `${ORIGIN}/coaching` },
  { label: "Membership", href: `${ORIGIN}/membership` },
  { label: "The App", href: `${ORIGIN}/download` },
  { label: "The Venue", href: `${ORIGIN}/venue` },
] as const;

export const CONTACT = {
  name: "Pickleball Central",
  locality: "Peerzadiguda, Hyderabad",
  postcode: "500039",
  phone: "+91 97007 44634",
  phoneHref: "tel:+919700744634",
  email: "hi@pickleball-central.co.in",
  whatsappCommunity: "https://chat.whatsapp.com/HLVDJubO2B3FfLLBqS9KiU",
  instagram: "https://www.instagram.com/pickleballcentralhyd",
  directions:
    "https://www.google.com/maps/dir/?api=1&destination=17.391391,78.611158&destination_place_id=ChIJW8rKJbCfyzsRu4zLBYpLEoc",
} as const;

export const HOURS = "6:00 AM – 11:00 PM, every day";

export const STORES = {
  android:
    "https://play.google.com/store/apps/details?id=com.snowflakeenterprises.pickleballcentral",
  ios: "https://apps.apple.com/in/app/pickleball-central/id6787500349",
} as const;

export const BOOK_A_COURT_URL = `${ORIGIN}/play`;
