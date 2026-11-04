const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const site = {
  name: "Wave Story",
  legalName: "Wave Story Ventures",
  tagline: "Every Journey Tells a Story",
  description:
    "All India tour packages and travel guides, planned from Varkala, Kerala by Wave Story Ventures.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000"),
  contactName: "Reshma",
  phoneDisplay: "+91 75939 49874",
  phone: "+917593949874",
  whatsapp: "917593949874",
  email: "wavestoryventures@gmail.com",
  address: {
    locality: "Varkala",
    district: "Thiruvananthapuram",
    region: "Kerala",
    country: "India",
    full: "Varkala, Thiruvananthapuram, Kerala, India",
  },
};

export const nav = [
  { href: "/packages", label: "Tour Packages" },
  { href: "/guides", label: "Travel Guides" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
