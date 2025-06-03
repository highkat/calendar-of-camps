export const APP_NAME = "Calendar of Camps";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/search", label: "Search Camps" },
  { href: "/submit-camp", label: "Submit a Camp" },
  { href: "/blog", label: "Blog" },
  { href: "/why-subscribe", label: "Why Subscribe?" },
];

export const FOOTER_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/advertise", label: "Advertise" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
];

export type CampTheme = "Adventure" | "STEM" | "Arts" | "Sports" | "Academic" | "Tech" | "Nature" | "Music" | "Drama" | "Cooking" | "General";

export const CAMP_THEMES: CampTheme[] = ["Adventure", "STEM", "Arts", "Sports", "Academic", "Tech", "Nature", "Music", "Drama", "Cooking", "General"];
export const CAMP_AGE_GROUPS = ["5-7", "8-10", "11-13", "14-16", "All Ages"];
export const CAMP_SESSION_LENGTHS = ["Half-day", "Full-day", "Overnight", "1 Week", "2 Weeks", "Monthly"];
