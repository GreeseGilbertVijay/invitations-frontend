import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdFilterList } from "react-icons/md";
import { getTokenPayload } from "../utils/auth";

type Category = "all" | "wedding" | "birthday" | "babyshower";

interface TemplateCard {
  id: string;
  category: "wedding" | "birthday" | "babyshower";
  label: string;
  desc: string;
  accent: string;
  bg: string;
  badge: string;
  badgeColor: string;
}

const allTemplates: TemplateCard[] = [
  { id: "classic",     category: "wedding",    label: "Classic",          desc: "Traditional gold & ivory elegance",   accent: "#b8860b", bg: "linear-gradient(135deg, #fdf6e3, #faebd7)", badge: "Wedding",     badgeColor: "bg-pink-100 text-pink-700" },
  { id: "modern",      category: "wedding",    label: "Modern",           desc: "Clean, minimalist rose gold",         accent: "#C9A96E", bg: "#F5F0EB",                                   badge: "Wedding",     badgeColor: "bg-pink-100 text-pink-700" },
  { id: "floral",      category: "wedding",    label: "Floral",           desc: "Romantic garden-party style",         accent: "#c890b0", bg: "linear-gradient(135deg, #f8e8f0, #f0e6f6)", badge: "Wedding",     badgeColor: "bg-pink-100 text-pink-700" },
  { id: "birthday1",   category: "birthday",   label: "Celebration",      desc: "Vibrant birthday party theme",        accent: "#d97706", bg: "linear-gradient(135deg, #fef3c7, #fde68a)", badge: "Birthday",    badgeColor: "bg-amber-100 text-amber-700" },
  { id: "birthday2",   category: "birthday",   label: "Elegant Birthday", desc: "Sophisticated milestone celebration", accent: "#7c3aed", bg: "linear-gradient(135deg, #ede9fe, #ddd6fe)", badge: "Birthday",    badgeColor: "bg-amber-100 text-amber-700" },
  { id: "babyshower1", category: "babyshower", label: "Sweet Baby",       desc: "Soft pastel baby shower theme",       accent: "#2563eb", bg: "linear-gradient(135deg, #dbeafe, #bfdbfe)", badge: "Baby Shower", badgeColor: "bg-sky-100 text-sky-700" },
  { id: "babyshower2", category: "babyshower", label: "Baby Bloom",       desc: "Garden-fresh baby shower style",      accent: "#059669", bg: "linear-gradient(135deg, #d1fae5, #a7f3d0)", badge: "Baby Shower", badgeColor: "bg-sky-100 text-sky-700" },
];

const filterTabs: { key: Category; label: string }[] = [
  { key: "all",        label: "All" },
  { key: "wedding",    label: "Wedding" },
  { key: "birthday",   label: "Birthday" },
  { key: "babyshower", label: "Baby Shower" },
];

function TemplatePreview({ template }: { template: TemplateCard }) {
  const s = { color: template.accent };

  if (template.id === "classic") return (
    <div className="h-52 flex flex-col items-center justify-center px-4 text-center" style={{ background: template.bg }}>
      <p className="text-xs tracking-widest mb-1" style={s}>✦ ❧ ✦</p>
      <p className="text-xs text-gray-500 italic mb-1">Together with their families</p>
      <p className="text-lg font-bold italic" style={s}>Arjun</p>
      <p className="text-xs my-0.5" style={s}>&amp;</p>
      <p className="text-lg font-bold italic" style={s}>Priya</p>
      <p className="text-xs text-gray-500 mt-2">15 December 2026 · 7:00 PM</p>
      <p className="text-xs text-gray-400 mt-0.5">The Grand Ballroom, Chennai</p>
      <p className="text-xs tracking-widest mt-2" style={s}>— ✦ —</p>
    </div>
  );

  if (template.id === "modern") return (
    <div className="h-52 flex flex-col items-center justify-center px-4 text-center" style={{ background: template.bg }}>
      <div className="w-12 h-0.5 mb-3" style={{ background: template.accent }} />
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
      <div className="w-12 h-0.5 mt-3" style={{ background: template.accent }} />
    </div>
  );

  if (template.id === "floral") return (
    <div className="h-52 flex flex-col items-center justify-center px-4 text-center" style={{ background: template.bg }}>
      <p className="text-base mb-1">🌸 🌺 🌿</p>
      <p className="text-lg font-bold italic" style={{ color: "#7b4f6e" }}>Arjun</p>
      <p className="text-sm my-0.5" style={{ color: "#c890b0" }}>❀</p>
      <p className="text-lg font-bold italic" style={{ color: "#7b4f6e" }}>Priya</p>
      <p className="text-xs text-gray-500 mt-2">15 December 2026 · 7:00 PM</p>
      <p className="text-xs text-gray-400 mt-0.5">The Grand Ballroom, Chennai</p>
      <p className="text-base mt-2">🌸 🌿 🌸</p>
    </div>
  );

  if (template.id === "birthday1") return (
    <div className="h-52 flex flex-col items-center justify-center px-4 text-center" style={{ background: template.bg }}>
      <p className="text-xl mb-1">🎂 🎉 🎈</p>
      <p className="text-[10px] font-bold tracking-widest uppercase text-amber-600 mb-1">You're Invited!</p>
      <p className="text-lg font-bold text-amber-800">Ravi Kumar</p>
      <p className="text-sm font-semibold text-amber-600 mt-0.5">is Turning 30!</p>
      <div className="w-8 h-0.5 bg-amber-400 my-2" />
      <p className="text-xs text-amber-700">20 June 2026 · 6:00 PM</p>
      <p className="text-xs text-amber-600 mt-0.5">City Club, Chennai</p>
    </div>
  );

  if (template.id === "birthday2") return (
    <div className="h-52 flex flex-col items-center justify-center px-4 text-center" style={{ background: template.bg }}>
      <p className="text-base mb-1">🥂 ✨ 🎊</p>
      <p className="text-[10px] tracking-widest uppercase text-purple-400 mb-1">Join us to celebrate</p>
      <p className="text-lg font-bold text-purple-800">Ravi Kumar</p>
      <p className="text-sm font-medium text-purple-600 mt-0.5">30th Birthday</p>
      <div className="w-8 h-0.5 bg-purple-400 my-2" />
      <p className="text-xs text-purple-700">20 June 2026 · 6:00 PM</p>
      <p className="text-xs text-purple-500 mt-0.5">City Club, Chennai</p>
    </div>
  );

  if (template.id === "babyshower1") return (
    <div className="h-52 flex flex-col items-center justify-center px-4 text-center" style={{ background: template.bg }}>
      <p className="text-xl mb-1">👶 🍼 ⭐</p>
      <p className="text-[10px] font-bold tracking-widest uppercase text-blue-500 mb-1">Baby Shower</p>
      <p className="text-base font-bold text-blue-800">Karthik &amp; Divya</p>
      <p className="text-xs text-blue-500 mt-0.5 italic">are expecting!</p>
      <div className="w-8 h-0.5 bg-blue-300 my-2" />
      <p className="text-xs text-blue-700">5 July 2026 · 4:00 PM</p>
      <p className="text-xs text-blue-500 mt-0.5">Bloom Garden, Chennai</p>
    </div>
  );

  return (
    <div className="h-52 flex flex-col items-center justify-center px-4 text-center" style={{ background: template.bg }}>
      <p className="text-xl mb-1">🌷 🐣 🌿</p>
      <p className="text-[10px] font-bold tracking-widest uppercase text-emerald-600 mb-1">Baby Shower</p>
      <p className="text-base font-bold text-emerald-800">Karthik &amp; Divya</p>
      <p className="text-xs text-emerald-500 mt-0.5 italic">Welcome little one!</p>
      <div className="w-8 h-0.5 bg-emerald-400 my-2" />
      <p className="text-xs text-emerald-700">5 July 2026 · 4:00 PM</p>
      <p className="text-xs text-emerald-500 mt-0.5">Bloom Garden, Chennai</p>
    </div>
  );
}

const TemplatesPage = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<Category>("all");

  const isLoggedIn = getTokenPayload() !== null;

  const filtered =
    activeFilter === "all"
      ? allTemplates
      : allTemplates.filter((t) => t.category === activeFilter);

  const handleUse = (template: TemplateCard) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    navigate(`/create?template=${template.id}&category=${template.category}`);
  };

  return (
    <div className="p-4 lg:p-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Invitation Templates</h1>
        <p className="text-gray-500 mt-1 text-sm">
          Browse templates, pick one, and personalise it with your details.
        </p>
        {!isLoggedIn && (
          <p className="mt-2 text-xs text-amber-600 bg-amber-50 border border-amber-200 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full">
            <span>⚠</span>
            Sign in to create an invitation from a template.
          </p>
        )}
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        <MdFilterList className="w-5 h-5 text-gray-400 flex-shrink-0" />
        {filterTabs.map(({ key, label }) => {
          const count =
            key === "all"
              ? allTemplates.length
              : allTemplates.filter((t) => t.category === key).length;
          const active = activeFilter === key;
          return (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                active
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
              }`}
            >
              {label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${active ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((template) => (
          <div
            key={template.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col"
          >
            <TemplatePreview template={template} />

            <div className="p-4 flex flex-col flex-1 border-t border-gray-100">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <h3 className="font-bold text-gray-800 text-sm">{template.label}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{template.desc}</p>
                </div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${template.badgeColor}`}>
                  {template.badge}
                </span>
              </div>

              <div className="flex gap-2 mt-auto">
                <button
                  onClick={() => navigate(`/templates/preview/${template.id}`)}
                  className="flex-1 cursor-pointer border border-gray-200 hover:border-gray-400 text-gray-600 hover:text-gray-900 font-semibold py-2 rounded-xl text-sm transition-colors"
                >
                  Preview
                </button>
                <button
                  onClick={() => handleUse(template)}
                  className="flex-1 cursor-pointer bg-gray-900 hover:bg-gray-700 text-white font-semibold py-2 rounded-xl text-sm transition-colors"
                >
                  {isLoggedIn ? "Use Template" : "Sign In to Use"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplatesPage;
