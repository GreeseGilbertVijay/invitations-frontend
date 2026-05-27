import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import type { TemplateId } from "../types/WeddingInvite";

type InviteCategory = "wedding" | "birthday" | "babyshower";

function cleanSlugPart(s: string): string {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function buildSlug(name1: string, name2: string, count: number): string {
  const num = String(count).padStart(3, "0");
  const n1 = cleanSlugPart(name1);
  const n2 = cleanSlugPart(name2);
  if (n1 && n2) return `${n1}-and-${n2}-${num}`;
  if (n1) return `${n1}-${num}`;
  return num;
}

function getCategoryFromTemplate(id: string): InviteCategory {
  if (id.startsWith("birthday")) return "birthday";
  if (id.startsWith("babyshower")) return "babyshower";
  return "wedding";
}

const CreateInvite = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const paramTemplate = (searchParams.get("template") ?? "classic") as TemplateId;

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
    template: paramTemplate,
    slug: "",
  });

  const [extraField, setExtraField] = useState(""); // age (birthday) or baby name (babyshower)
  const [slugEdited, setSlugEdited] = useState(false);
  const [nextCount, setNextCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [createdSlug, setCreatedSlug] = useState("");

  const category = getCategoryFromTemplate(form.template);

  // Fetch invite count once on mount
  useEffect(() => {
    axiosClient
      .get("/invites")
      .then((res) => {
        const count: number = Array.isArray(res.data) ? res.data.length : 0;
        setNextCount(count + 1);
      })
      .catch(() => {
        setNextCount(1);
      });
  }, []);

  // Regenerate slug from names + count whenever names change (unless user manually edited slug)
  useEffect(() => {
    if (slugEdited) return;
    setForm((f) => ({ ...f, slug: buildSlug(f.groomName, f.brideName, nextCount) }));
  }, [form.groomName, form.brideName, nextCount, slugEdited]);

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

    if (!form.groomName) {
      setError(
        category === "wedding"
          ? "Groom's name is required."
          : category === "birthday"
          ? "Celebrant's name is required."
          : "Parent 1 name is required."
      );
      return;
    }
    if (category === "wedding" && !form.brideName) {
      setError("Bride's name is required.");
      return;
    }
    if (!form.weddingDate) { setError("Event date is required."); return; }
    if (!form.venue) { setError("Venue is required."); return; }
    if (!form.slug) { setError("URL slug is required."); return; }

    // Merge extra field into message
    let finalMessage = form.message;
    if (category === "birthday" && extraField) {
      finalMessage = `Age: ${extraField}${finalMessage ? `\n${finalMessage}` : ""}`;
    }
    if (category === "babyshower" && extraField) {
      finalMessage = `Baby Name: ${extraField}${finalMessage ? `\n${finalMessage}` : ""}`;
    }

    setLoading(true);
    try {
      const payload = { ...form, message: finalMessage };
      const res = await axiosClient.post("/invites", payload);
      setCreatedSlug(res.data.slug);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create invitation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Success screen ──────────────────────────────────────────────────────────
  if (createdSlug) {
    const link = `${window.location.origin}/invite/${createdSlug}`;
    return (
      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
            {category === "birthday" ? "🎉" : category === "babyshower" ? "👶" : "💍"}
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
            onClick={() => { navigator.clipboard.writeText(link); alert("Link copied!"); }}
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

  // ── Labels by category ──────────────────────────────────────────────────────
  const labels = {
    wedding: {
      title: "Create Wedding Invitation",
      subtitle: "Fill in your wedding details and pick a template.",
      section1: "Couple Details",
      name1: "Groom's Name *",
      name1ph: "e.g. Arjun",
      name2: "Bride's Name *",
      name2ph: "e.g. Priya",
      section2: "Wedding Details",
      dateLabel: "Wedding Date *",
      extra: null,
    },
    birthday: {
      title: "Create Birthday Invitation",
      subtitle: "Fill in the birthday details and pick a template.",
      section1: "Celebrant Details",
      name1: "Celebrant's Name *",
      name1ph: "e.g. Ravi",
      name2: "Host Name (Optional)",
      name2ph: "e.g. Meena",
      section2: "Event Details",
      dateLabel: "Birthday Date *",
      extra: "Age",
    },
    babyshower: {
      title: "Create Baby Shower Invitation",
      subtitle: "Fill in the baby shower details and pick a template.",
      section1: "Parents' Details",
      name1: "Parent 1 Name *",
      name1ph: "e.g. Karthik",
      name2: "Parent 2 Name (Optional)",
      name2ph: "e.g. Divya",
      section2: "Event Details",
      dateLabel: "Baby Shower Date *",
      extra: "Baby Name (Optional)",
    },
  }[category];

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
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
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">{labels.title}</h1>
        <p className="text-gray-500 text-sm mt-1">{labels.subtitle}</p>
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
        {/* ── Person details ────────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">{labels.section1}</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">{labels.name1}</label>
              <input
                name="groomName"
                value={form.groomName}
                onChange={handleChange}
                placeholder={labels.name1ph}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">{labels.name2}</label>
              <input
                name="brideName"
                value={form.brideName}
                onChange={handleChange}
                placeholder={labels.name2ph}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          </div>
          {labels.extra && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">{labels.extra}</label>
              <input
                value={extraField}
                onChange={(e) => setExtraField(e.target.value)}
                placeholder={category === "birthday" ? "e.g. 30" : "e.g. Baby Arjun"}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          )}
        </div>

        {/* ── Event details ─────────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">{labels.section2}</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">{labels.dateLabel}</label>
              <input
                type="date"
                name="weddingDate"
                value={form.weddingDate}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Time</label>
              <input
                type="time"
                name="weddingTime"
                value={form.weddingTime}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Venue Name *</label>
            <input
              name="venue"
              value={form.venue}
              onChange={handleChange}
              placeholder="e.g. The Grand Banquet Hall"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Venue Address</label>
            <input
              name="venueAddress"
              value={form.venueAddress}
              onChange={handleChange}
              placeholder="e.g. 123 Main St, Chennai"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
        </div>

        {/* ── Reception (wedding only) ──────────────────────────────────────── */}
        {category === "wedding" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Reception (Optional)</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Reception Date</label>
                <input
                  type="date"
                  name="receptionDate"
                  value={form.receptionDate}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Reception Time</label>
                <input
                  type="time"
                  name="receptionTime"
                  value={form.receptionTime}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
            </div>
          </div>
        )}

        {/* ── Contact & Message ─────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Contact & Message</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Contact Name</label>
              <input
                name="contactName"
                value={form.contactName}
                onChange={handleChange}
                placeholder="e.g. Rajan"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Contact Phone</label>
              <input
                name="contactPhone"
                value={form.contactPhone}
                onChange={handleChange}
                placeholder="e.g. +91 98765 43210"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Personal Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Write a personal note to your guests..."
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
            />
          </div>
        </div>

        {/* ── Invitation URL ────────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Invitation URL</h2>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">URL Slug *</label>
            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 transition">
              <span className="px-3 py-2.5 bg-gray-50 border-r border-gray-200 text-xs text-gray-400 whitespace-nowrap">
                /invite/
              </span>
              <input
                name="slug"
                value={form.slug}
                onChange={handleChange}
                placeholder="001"
                className="flex-1 px-3 py-2.5 text-sm outline-none bg-white"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1.5">
              Auto-numbered starting from <span className="font-mono font-semibold">001</span>. You can edit it.
            </p>
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
            className="flex-1 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors text-sm disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Invitation"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/invites")}
            className="flex-1 cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-colors text-sm"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateInvite;
