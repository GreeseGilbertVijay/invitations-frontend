import type { ComponentType } from "react";
import type { WeddingInvite } from "../types/WeddingInvite";

// ============================================================
// STEP 1 — Import your new template component here
// ============================================================
import ClassicTemplate from "../components/templates/ClassicTemplate";
import ModernTemplate from "../components/templates/ModernTemplate";
import FloralTemplate from "../components/templates/FloralTemplate";
import BirthdayTemplate1 from "../components/templates/BirthdayTemplate1";
import BirthdayTemplate2 from "../components/templates/BirthdayTemplate2";
import BabyShowerTemplate1 from "../components/templates/BabyShowerTemplate1";
import BabyShowerTemplate2 from "../components/templates/BabyShowerTemplate2";

export interface TemplateEntry {
  id: string;
  category: "wedding" | "birthday" | "babyshower";
  label: string;
  desc: string;
  accent: string;
  bg: string;
  badge: string;
  badgeColor: string;
  Component: ComponentType<{ invite: WeddingInvite }>;
  Thumbnail: ComponentType;
}

const WEDDING_SAMPLE: WeddingInvite = {
  groomName: "Arjun", brideName: "Priya",
  weddingDate: "2026-12-15", weddingTime: "7:00 PM",
  venue: "The Grand Ballroom", venueAddress: "Anna Salai, Chennai",
  receptionDate: "2026-12-16", receptionTime: "7:30 PM",
  contactName: "Rajan Kumar", contactPhone: "+91 98765 43210",
  message: "With joy in our hearts, we invite you to witness and celebrate our love.",
  template: "classic", slug: "sample",
};

const BIRTHDAY_SAMPLE: WeddingInvite = {
  groomName: "Ravi Kumar", brideName: "",
  weddingDate: "2026-06-20", weddingTime: "6:00 PM",
  venue: "City Club", venueAddress: "T. Nagar, Chennai",
  contactName: "Meena Ravi", contactPhone: "+91 90123 45678",
  message: "Age: 30\nJoin us for an evening of joy, laughter, and celebration!",
  template: "birthday1", slug: "sample",
};

const BABYSHOWER_SAMPLE: WeddingInvite = {
  groomName: "Karthik", brideName: "Divya",
  weddingDate: "2026-07-05", weddingTime: "4:00 PM",
  venue: "Bloom Garden", venueAddress: "Adyar, Chennai",
  contactName: "Priya Karthik", contactPhone: "+91 98001 23456",
  message: "Baby Name: Aryan\nWe can't wait to celebrate the arrival of our little one with you!",
  template: "babyshower1", slug: "sample",
};

export function getSample(entry: TemplateEntry): WeddingInvite {
  const base =
    entry.category === "birthday" ? BIRTHDAY_SAMPLE
    : entry.category === "babyshower" ? BABYSHOWER_SAMPLE
    : WEDDING_SAMPLE;
  return { ...base, template: entry.id };
}

// ============================================================
// STEP 2 — Add an entry for your new template here.
// id:        unique string stored in the database
// category:  "wedding" | "birthday" | "babyshower"
// Component: full-page template component (imported above)
// Thumbnail: mini card preview shown in the Templates grid
// Everything else — TemplatesPage grid, preview page, public
// invite render — updates automatically.
// ============================================================
export const templateRegistry: TemplateEntry[] = [
  {
    id: "classic",
    category: "wedding",
    label: "Classic",
    desc: "Traditional gold & ivory elegance",
    accent: "#b8860b",
    bg: "linear-gradient(135deg, #fdf6e3, #faebd7)",
    badge: "Wedding",
    badgeColor: "bg-pink-100 text-pink-700",
    Component: ClassicTemplate,
    Thumbnail: () => (
      <div className="h-52 flex flex-col items-center justify-center px-4 text-center" style={{ background: "linear-gradient(135deg, #fdf6e3, #faebd7)" }}>
        <p className="text-xs tracking-widest mb-1" style={{ color: "#b8860b" }}>✦ ❧ ✦</p>
        <p className="text-xs text-gray-500 italic mb-1">Together with their families</p>
        <p className="text-lg font-bold italic" style={{ color: "#b8860b" }}>Arjun</p>
        <p className="text-xs my-0.5" style={{ color: "#b8860b" }}>&amp;</p>
        <p className="text-lg font-bold italic" style={{ color: "#b8860b" }}>Priya</p>
        <p className="text-xs text-gray-500 mt-2">15 December 2026 · 7:00 PM</p>
        <p className="text-xs text-gray-400 mt-0.5">The Grand Ballroom, Chennai</p>
        <p className="text-xs tracking-widest mt-2" style={{ color: "#b8860b" }}>— ✦ —</p>
      </div>
    ),
  },
  {
    id: "modern",
    category: "wedding",
    label: "Modern",
    desc: "Clean, minimalist rose gold",
    accent: "#C9A96E",
    bg: "#F5F0EB",
    badge: "Wedding",
    badgeColor: "bg-pink-100 text-pink-700",
    Component: ModernTemplate,
    Thumbnail: () => (
      <div className="h-52 flex flex-col items-center justify-center px-4 text-center" style={{ background: "#F5F0EB" }}>
        <div className="w-12 h-0.5 mb-3" style={{ background: "#C9A96E" }} />
        <p className="text-lg font-light tracking-widest uppercase text-gray-800">ARJUN</p>
        <div className="flex items-center gap-2 my-1">
          <div className="flex-1 h-px bg-gray-300" />
          <p className="text-[10px] tracking-widest text-gray-400 uppercase">AND</p>
          <div className="flex-1 h-px bg-gray-300" />
        </div>
        <p className="text-lg font-light tracking-widest uppercase text-gray-800">PRIYA</p>
        <div className="mt-3 px-3 py-1.5" style={{ background: "#1a1a1a" }}>
          <p className="text-white text-[11px] tracking-widest font-light">15 · DEC · 2026</p>
        </div>
        <p className="text-[10px] text-gray-400 mt-2">Grand Ballroom · Chennai</p>
        <div className="w-12 h-0.5 mt-3" style={{ background: "#C9A96E" }} />
      </div>
    ),
  },
  {
    id: "floral",
    category: "wedding",
    label: "Floral",
    desc: "Romantic garden-party style",
    accent: "#c890b0",
    bg: "linear-gradient(135deg, #f8e8f0, #f0e6f6)",
    badge: "Wedding",
    badgeColor: "bg-pink-100 text-pink-700",
    Component: FloralTemplate,
    Thumbnail: () => (
      <div className="h-52 flex flex-col items-center justify-center px-4 text-center" style={{ background: "linear-gradient(135deg, #f8e8f0, #f0e6f6)" }}>
        <p className="text-base mb-1">🌸 🌺 🌿</p>
        <p className="text-lg font-bold italic" style={{ color: "#7b4f6e" }}>Arjun</p>
        <p className="text-sm my-0.5" style={{ color: "#c890b0" }}>❀</p>
        <p className="text-lg font-bold italic" style={{ color: "#7b4f6e" }}>Priya</p>
        <p className="text-xs text-gray-500 mt-2">15 December 2026 · 7:00 PM</p>
        <p className="text-xs text-gray-400 mt-0.5">The Grand Ballroom, Chennai</p>
        <p className="text-base mt-2">🌸 🌿 🌸</p>
      </div>
    ),
  },
  {
    id: "birthday1",
    category: "birthday",
    label: "Celebration",
    desc: "Vibrant birthday party theme",
    accent: "#d97706",
    bg: "linear-gradient(135deg, #fef3c7, #fde68a)",
    badge: "Birthday",
    badgeColor: "bg-amber-100 text-amber-700",
    Component: BirthdayTemplate1,
    Thumbnail: () => (
      <div className="h-52 flex flex-col items-center justify-center px-4 text-center" style={{ background: "linear-gradient(135deg, #fef3c7, #fde68a)" }}>
        <p className="text-xl mb-1">🎂 🎉 🎈</p>
        <p className="text-[10px] font-bold tracking-widest uppercase text-amber-600 mb-1">You&apos;re Invited!</p>
        <p className="text-lg font-bold text-amber-800">Ravi Kumar</p>
        <p className="text-sm font-semibold text-amber-600 mt-0.5">is Turning 30!</p>
        <div className="w-8 h-0.5 bg-amber-400 my-2" />
        <p className="text-xs text-amber-700">20 June 2026 · 6:00 PM</p>
        <p className="text-xs text-amber-600 mt-0.5">City Club, Chennai</p>
      </div>
    ),
  },
  {
    id: "birthday2",
    category: "birthday",
    label: "Elegant Birthday",
    desc: "Sophisticated milestone celebration",
    accent: "#7c3aed",
    bg: "linear-gradient(135deg, #ede9fe, #ddd6fe)",
    badge: "Birthday",
    badgeColor: "bg-amber-100 text-amber-700",
    Component: BirthdayTemplate2,
    Thumbnail: () => (
      <div className="h-52 flex flex-col items-center justify-center px-4 text-center" style={{ background: "linear-gradient(135deg, #ede9fe, #ddd6fe)" }}>
        <p className="text-base mb-1">🥂 ✨ 🎊</p>
        <p className="text-[10px] tracking-widest uppercase text-purple-400 mb-1">Join us to celebrate</p>
        <p className="text-lg font-bold text-purple-800">Ravi Kumar</p>
        <p className="text-sm font-medium text-purple-600 mt-0.5">30th Birthday</p>
        <div className="w-8 h-0.5 bg-purple-400 my-2" />
        <p className="text-xs text-purple-700">20 June 2026 · 6:00 PM</p>
        <p className="text-xs text-purple-500 mt-0.5">City Club, Chennai</p>
      </div>
    ),
  },
  {
    id: "babyshower1",
    category: "babyshower",
    label: "Sweet Baby",
    desc: "Soft pastel baby shower theme",
    accent: "#2563eb",
    bg: "linear-gradient(135deg, #dbeafe, #bfdbfe)",
    badge: "Baby Shower",
    badgeColor: "bg-sky-100 text-sky-700",
    Component: BabyShowerTemplate1,
    Thumbnail: () => (
      <div className="h-52 flex flex-col items-center justify-center px-4 text-center" style={{ background: "linear-gradient(135deg, #dbeafe, #bfdbfe)" }}>
        <p className="text-xl mb-1">👶 🍼 ⭐</p>
        <p className="text-[10px] font-bold tracking-widest uppercase text-blue-500 mb-1">Baby Shower</p>
        <p className="text-base font-bold text-blue-800">Karthik &amp; Divya</p>
        <p className="text-xs text-blue-500 mt-0.5 italic">are expecting!</p>
        <div className="w-8 h-0.5 bg-blue-300 my-2" />
        <p className="text-xs text-blue-700">5 July 2026 · 4:00 PM</p>
        <p className="text-xs text-blue-500 mt-0.5">Bloom Garden, Chennai</p>
      </div>
    ),
  },
  {
    id: "babyshower2",
    category: "babyshower",
    label: "Baby Bloom",
    desc: "Garden-fresh baby shower style",
    accent: "#059669",
    bg: "linear-gradient(135deg, #d1fae5, #a7f3d0)",
    badge: "Baby Shower",
    badgeColor: "bg-sky-100 text-sky-700",
    Component: BabyShowerTemplate2,
    Thumbnail: () => (
      <div className="h-52 flex flex-col items-center justify-center px-4 text-center" style={{ background: "linear-gradient(135deg, #d1fae5, #a7f3d0)" }}>
        <p className="text-xl mb-1">🌷 🐣 🌿</p>
        <p className="text-[10px] font-bold tracking-widest uppercase text-emerald-600 mb-1">Baby Shower</p>
        <p className="text-base font-bold text-emerald-800">Karthik &amp; Divya</p>
        <p className="text-xs text-emerald-500 mt-0.5 italic">Welcome little one!</p>
        <div className="w-8 h-0.5 bg-emerald-400 my-2" />
        <p className="text-xs text-emerald-700">5 July 2026 · 4:00 PM</p>
        <p className="text-xs text-emerald-500 mt-0.5">Bloom Garden, Chennai</p>
      </div>
    ),
  },
];
