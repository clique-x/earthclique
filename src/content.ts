// All page copy and data. Edit here to change text, links or services.

const PHONE = "+918755572898";
const PHONE2 = "+919317646002";
export const WHATSAPP = "https://wa.me/918755572898";
export const MAP = "https://share.google/iE4syXKFNEQ8PaQD8";
export const INSTAGRAM = "https://www.instagram.com/earthcliques/";
export const EMAIL = "info@earthclique.in";
export const LINKS_PAGE = "https://links.earthclique.in";

export const whatsappText = (message: string) => `${WHATSAPP}?text=${encodeURIComponent(message)}`;
export const enquire = (service: string) =>
  whatsappText(`Hi EarthClique, I'd like to know more about ${service}.`);

export const site = {
  name: "EarthClique",
  tagline: "IT Solutions & Digital Services",
  url: "https://earthclique.in",
  owner: { name: "Shashank Saklani", title: "Founder & IT Consultant" },
  phone: { tel: `tel:${PHONE}`, label: "+91 87555 72898" },
  phone2: { tel: `tel:${PHONE2}`, label: "+91 93176 46002" },
  email: { href: `mailto:${EMAIL}`, label: EMAIL },
  address: {
    building: "Deep Ganga Shopping Complex",
    unit: "Shop 209, 2nd floor, SIDCUL",
    city: "Haridwar, Uttarakhand 249403",
    full: "Shop No. 209, 2nd Floor, Deep Ganga Shopping Complex, SIDCUL, Haridwar, Uttarakhand 249403",
  },
  hours: { label: "Daily 9 am – 10 pm", open: 9, close: 22 },
  hindi: "सिडकुल हरिद्वार में आपका IT और डिजिटल पार्टनर।",
};

export const nav = [
  { label: "Services", href: "#services" },
  { label: "Who we serve", href: "#clients" },
  { label: "How it works", href: "#how" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  lines: ["Fix it. Build it.", "Grow it online."],
  support:
    "IT solutions and digital services from Shop 209, SIDCUL, Haridwar. One partner from laptop repair to AI automation.",
  action: { label: "WhatsApp us", href: whatsappText("Hi EarthClique, I'd like to get in touch.") },
  secondary: { label: "Call +91 87555 72898", href: `tel:${PHONE}` },
};

export interface Sheet {
  id: string;
  title: string;
  tone: "mist" | "teal" | "deep";
  intro: string;
  items: { name: string; note?: string; href: string }[];
  picture: { src: string; alt: string };
}

export const services: Sheet[] = [
  {
    id: "repair",
    title: "Repair & hardware",
    tone: "mist",
    intro:
      "Bring it to Shop 209 or we come to you. Laptops, desktops and workstations diagnosed and repaired, refurbished laptops tested and sold with warranty, custom PCs built and upgraded for the work you do.",
    items: [
      { name: "Laptop & PC repair", href: enquire("Laptop & PC Repair") },
      { name: "Refurbished laptops", note: "Tested, with warranty", href: enquire("Refurbished Laptops") },
      { name: "Custom PC builds & upgrades", href: enquire("Custom PC Builds & Upgrades") },
    ],
    picture: { src: "/pictures/peak-dawn.webp", alt: "The EarthClique peak at dawn, rendered in the site's own 3D scene" },
  },
  {
    id: "offices",
    title: "Offices & factories",
    tone: "teal",
    intro:
      "An annual maintenance contract that keeps every machine on your floor working, with servers and networks designed, installed and looked after by the same team.",
    items: [
      {
        name: "AMC for offices & factories",
        note: "Get a quote for your setup",
        href: whatsappText("Hi EarthClique, I'd like an AMC quote for my office/factory."),
      },
      { name: "Server & network infrastructure", href: enquire("Server & Network Infrastructure") },
      { name: "Networking", href: enquire("Networking") },
    ],
    picture: { src: "/pictures/peak-day.webp", alt: "The EarthClique peak under a midday sky, rendered in the site's own 3D scene" },
  },
  {
    id: "online",
    title: "Online growth",
    tone: "deep",
    intro:
      "A website or app built for your business, found on Google and Instagram through SEO and ads, and the repetitive work behind it automated with n8n and AI.",
    items: [
      { name: "Websites & apps", href: enquire("Websites & Apps") },
      { name: "Digital marketing", note: "SEO, Google Ads, Meta Ads", href: enquire("Digital Marketing") },
      { name: "AI automation & n8n workflows", href: enquire("AI Automation & n8n Workflows") },
    ],
    picture: { src: "/pictures/peak-dusk.webp", alt: "The EarthClique peak at dusk with the sun low behind it, rendered in the site's own 3D scene" },
  },
];

export const clients = {
  heading: "Who we look after",
  names: ["Factories", "Pharma units", "Offices", "Schools", "Hospitals", "Homes"],
};

export const how = {
  heading: "How a job runs",
  intro:
    "Every job, from a dead laptop to a factory network, goes through the same four stages with the same people. You always know which stage you are at.",
  stages: [
    {
      name: "Tell us",
      text: "Call, WhatsApp or walk into Shop 209. Describe the problem or the plan in your own words, in Hindi or English.",
      picture: { src: "/pictures/peak-dawn.webp", alt: "The peak at dawn" },
    },
    {
      name: "We diagnose",
      text: "At the shop or at your site in SIDCUL, we find the fault or map out what the job needs, and tell you the cost before work starts.",
      picture: { src: "/pictures/peak-day.webp", alt: "The peak at midday" },
    },
    {
      name: "We fix or build",
      text: "Repairs, builds, networks, websites and automations are done by the team you spoke to, with a date you can hold us to.",
      picture: { src: "/pictures/peak-dusk.webp", alt: "The peak at dusk" },
    },
    {
      name: "We stay",
      text: "AMC, support and updates after delivery, so there is one number to call when something changes.",
      picture: { src: "/pictures/peak-night.webp", alt: "The peak at night under stars" },
    },
  ],
};

export const skills = {
  heading: "What we do",
  names: [
    "laptop repair",
    "PC repair",
    "annual maintenance contracts",
    "servers",
    "networking",
    "refurbished laptops",
    "custom PC builds",
    "upgrades",
    "websites",
    "apps",
    "SEO",
    "Google Ads",
    "Meta Ads",
    "AI automation",
    "n8n workflows",
  ],
  note: "15 services · one shop in SIDCUL · daily 9 am to 10 pm",
  product: { name: "Kritrim · कृत्रिम", note: "our own jewellery store", href: "https://kritrimshop.com" },
};

export const contact = {
  greeting: "Namaste",
  action: { label: "Message us on WhatsApp", href: whatsappText("Hi EarthClique, I'd like to get in touch.") },
};

export const footer = {
  description: "IT solutions and digital services for SIDCUL, Haridwar and around.",
  credits: "Peak rendered live in WebGL from the EarthClique mark.",
  links: [
    { label: "Instagram", href: INSTAGRAM },
    { label: "Google reviews", href: MAP },
    { label: "Save contact", href: "/contact.vcf" },
    { label: "All links", href: LINKS_PAGE },
  ],
};
