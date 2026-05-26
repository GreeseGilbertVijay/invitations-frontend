import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import type { TemplateId } from "../types/WeddingInvite";

const templates: { id: TemplateId; label: string; desc: string; preview: string; accent: string }[] = [
  {
    id: "classic",
    label: "Classic",
    desc: "Traditional gold & ivory elegance",
    preview: "✦ ❧ ✦",
    accent: "#b8860b",
  },
  {
    id: "modern",
    label: "Modern",
    desc: "Clean, minimalist rose gold",
    preview: "— ✦ —",
    accent: "#C9A96E",
  },
  {
    id: "floral",
    label: "Floral",
    desc: "Romantic garden-party style",
    preview: "🌸 ❀ 🌸",
    accent: "#c890b0",
  },
];

const templateBg: Record<TemplateId, string> = {
  classic: "linear-gradient(135deg, #fdf6e3, #faebd7)",
  modern: "#F5F0EB",
  floral: "linear-gradient(135deg, #f8e8f0, #f0e6f6)",
};

function generateSlug(groom: string, bride: string): string {
  const clean = (s: string) =>
    s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const g = clean(groom);
  const b = clean(bride);
  if (!g && !b) return "";
  if (!g) return b;
  if (!b) return g;
  return `${g}-and-${b}`;
}

const CreateInvite = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    groomName: "",
    brideName: "",
    weddingDate: "",
    weddingTime: "",
    venue: "",
    venueAddress: "",
    receptionDate: "",
    receptionTime: "",
    contactName: "",
    contactPhone: "",
    message: "",
    template: "classic" as TemplateId,
    slug: "",
  });
  const [slugEdited, setSlugEdited] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [createdSlug, setCreatedSlug] = useState("");

  // Auto-generate slug from names unless user manually edited it
  useEffect(() => {
    if (!slugEdited) {
      setForm((f) => ({ ...f, slug: generateSlug(f.groomName, f.brideName) }));
    }
  }, [form.groomName, form.brideName, slugEdited]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "slug") setSlugEdited(true);
    setForm((f) => ({ ...f, [name]: value }));
  };

  const shareLink = `${window.location.origin}/invite/${form.slug}`;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.groomName || !form.brideName) { setError("Both names are required."); return; }
    if (!form.weddingDate) { setError("Wedding date is required."); return; }
    if (!form.venue) { setError("Venue is required."); return; }
    if (!form.slug) { setError("URL slug is required."); return; }

    setLoading(true);
    try {
      const res = await axiosClient.post("/invites", form);
      setCreatedSlug(res.data.slug);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create invitation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (createdSlug) {
    const link = `${window.location.origin}/invite/${createdSlug}`;
    return (
      <div className="p-6 lg:p-8 max-w-xl mx-auto">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
            💍
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Invitation Created!</h2>
          <p className="text-gray-500 text-sm mb-6">Share the link below with your guests</p>

          <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 mb-4">
            <p className="text-xs text-gray-400 mb-2 uppercase tracking-widest">Your Invitation Link</p>
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 font-semibold text-sm break-all hover:underline"
            >
              {link}
            </a>
          </div>

          <button
            onClick={() => {
              navigator.clipboard.writeText(link);
              alert("Link copied to clipboard!");
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors text-sm mb-3"
          >
            Copy Link
          </button>

          <div className="flex gap-3">
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="flex-1 text-center border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-xl transition-colors text-sm"
            >
              Preview
            </a>
            <button
              onClick={() => navigate("/invites")}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-colors text-sm"
            >
              My Invitations
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-2xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors group"
      >
        <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Create Invitation</h1>
        <p className="text-gray-500 text-sm mt-1">Fill in your wedding details and pick a template.</p>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-5">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}

      <form onSubmit={submit} className="space-y-6">
        {/* Template picker */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">Choose Template</h2>
          <div className="grid grid-cols-3 gap-3">
            {templates.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setForm((f) => ({ ...f, template: t.id }))}
                className={`rounded-xl border-2 p-3 text-center transition-all ${
                  form.template === t.id
                    ? "border-blue-500 shadow-md shadow-blue-100"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div
                  className="rounded-lg h-20 flex items-center justify-center text-xl mb-2"
                  style={{ background: templateBg[t.id] }}
                >
                  <span style={{ color: t.accent, fontSize: 16 }}>{t.preview}</span>
                </div>
                <p className="font-semibold text-gray-800 text-sm">{t.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{t.desc}</p>
                {form.template === t.id && (
                  <span className="inline-block mt-1 text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-medium">
                    Selected
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Couple details */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Couple Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Groom's Name *</label>
              <input name="groomName" value={form.groomName} onChange={handleChange} placeholder="e.g. Arjun" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Bride's Name *</label>
              <input name="brideName" value={form.brideName} onChange={handleChange} placeholder="e.g. Priya" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
            </div>
          </div>
        </div>

        {/* Wedding details */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Wedding Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Wedding Date *</label>
              <input type="date" name="weddingDate" value={form.weddingDate} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Time</label>
              <input type="time" name="weddingTime" value={form.weddingTime} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Venue Name *</label>
            <input name="venue" value={form.venue} onChange={handleChange} placeholder="e.g. The Grand Banquet Hall" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Venue Address</label>
            <input name="venueAddress" value={form.venueAddress} onChange={handleChange} placeholder="e.g. 123 Main St, Chennai" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
          </div>
        </div>

        {/* Reception */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Reception (Optional)</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Reception Date</label>
              <input type="date" name="receptionDate" value={form.receptionDate} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Reception Time</label>
              <input type="time" name="receptionTime" value={form.receptionTime} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
            </div>
          </div>
        </div>

        {/* Contact & Message */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Contact & Message</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Contact Name</label>
              <input name="contactName" value={form.contactName} onChange={handleChange} placeholder="e.g. Rajan" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Contact Phone</label>
              <input name="contactPhone" value={form.contactPhone} onChange={handleChange} placeholder="e.g. +91 98765 43210" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Personal Message</label>
            <textarea name="message" value={form.message} onChange={handleChange} placeholder="Write a personal note to your guests..." rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none" />
          </div>
        </div>

        {/* Invitation URL */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Invitation URL</h2>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Custom URL Slug *</label>
            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 transition">
              <span className="px-3 py-2.5 bg-gray-50 border-r border-gray-200 text-xs text-gray-400 whitespace-nowrap">
                /invite/
              </span>
              <input
                name="slug"
                value={form.slug}
                onChange={handleChange}
                placeholder="groom-and-bride"
                className="flex-1 px-3 py-2.5 text-sm outline-none bg-white"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1.5">Auto-generated from names. You can edit it.</p>
          </div>

          {form.slug && (
            <div className="bg-blue-50 rounded-xl px-4 py-3">
              <p className="text-xs text-blue-400 mb-0.5">Shareable link will be:</p>
              <p className="text-sm text-blue-700 font-medium break-all">{shareLink}</p>
            </div>
          )}
        </div>

        <div className="flex gap-3 pb-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors text-sm disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Invitation"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/invites")}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-colors text-sm"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateInvite;
