import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdFilterList } from "react-icons/md";
import { getTokenPayload } from "../utils/auth";
import Footer from "../components/Footer";
import { templateRegistry, type TemplateEntry } from "../templates/registry";

type Category = "all" | "wedding" | "birthday" | "babyshower";

const filterTabs: { key: Category; label: string }[] = [
  { key: "all",        label: "All" },
  { key: "wedding",    label: "Wedding" },
  { key: "birthday",   label: "Birthday" },
  { key: "babyshower", label: "Baby Shower" },
];

const TemplatesPage = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<Category>("all");
  const isLoggedIn = getTokenPayload() !== null;

  const filtered =
    activeFilter === "all"
      ? templateRegistry
      : templateRegistry.filter((t) => t.category === activeFilter);

  const handleUse = (t: TemplateEntry) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    navigate(`/create?template=${t.id}&category=${t.category}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="p-4 lg:p-4 max-w-7xl mx-auto flex-1 w-full">
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
                ? templateRegistry.length
                : templateRegistry.filter((t) => t.category === key).length;
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
          {filtered.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col"
            >
              <t.Thumbnail />

              <div className="p-4 flex flex-col flex-1 border-t border-gray-100">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-bold text-gray-800 text-sm">{t.label}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{t.desc}</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${t.badgeColor}`}>
                    {t.badge}
                  </span>
                </div>

                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => navigate(`/templates/preview/${t.id}`)}
                    className="flex-1 cursor-pointer border border-gray-200 hover:border-gray-400 text-gray-600 hover:text-gray-900 font-semibold py-2 rounded-xl text-sm transition-colors"
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => handleUse(t)}
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
      <Footer />
    </div>
  );
};

export default TemplatesPage;
