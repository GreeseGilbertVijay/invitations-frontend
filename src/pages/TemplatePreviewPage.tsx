import { useParams, useNavigate } from "react-router-dom";
import { getTokenPayload } from "../utils/auth";
import ClassicTemplate from "../components/templates/ClassicTemplate";
import ModernTemplate from "../components/templates/ModernTemplate";
import FloralTemplate from "../components/templates/FloralTemplate";
import BirthdayTemplate1 from "../components/templates/BirthdayTemplate1";
import BirthdayTemplate2 from "../components/templates/BirthdayTemplate2";
import BabyShowerTemplate1 from "../components/templates/BabyShowerTemplate1";
import BabyShowerTemplate2 from "../components/templates/BabyShowerTemplate2";
import type { WeddingInvite } from "../types/WeddingInvite";

const weddingSample: WeddingInvite = {
  groomName: "Arjun", brideName: "Priya",
  weddingDate: "2026-12-15", weddingTime: "7:00 PM",
  venue: "The Grand Ballroom", venueAddress: "Anna Salai, Chennai",
  receptionDate: "2026-12-16", receptionTime: "7:30 PM",
  contactName: "Rajan Kumar", contactPhone: "+91 98765 43210",
  message: "With joy in our hearts, we invite you to witness and celebrate our love.",
  template: "classic", slug: "sample",
};

const birthdaySample: WeddingInvite = {
  groomName: "Ravi Kumar", brideName: "",
  weddingDate: "2026-06-20", weddingTime: "6:00 PM",
  venue: "City Club", venueAddress: "T. Nagar, Chennai",
  contactName: "Meena Ravi", contactPhone: "+91 90123 45678",
  message: "Age: 30\nJoin us for an evening of joy, laughter, and celebration!",
  template: "birthday1", slug: "sample",
};

const babyShowerSample: WeddingInvite = {
  groomName: "Karthik", brideName: "Divya",
  weddingDate: "2026-07-05", weddingTime: "4:00 PM",
  venue: "Bloom Garden", venueAddress: "Adyar, Chennai",
  contactName: "Priya Karthik", contactPhone: "+91 98001 23456",
  message: "Baby Name: Aryan\nWe can't wait to celebrate the arrival of our little one with you!",
  template: "babyshower1", slug: "sample",
};

const templateMeta: Record<string, { label: string; category: "wedding" | "birthday" | "babyshower" }> = {
  classic:     { label: "Classic",          category: "wedding" },
  modern:      { label: "Modern",           category: "wedding" },
  floral:      { label: "Floral",           category: "wedding" },
  birthday1:   { label: "Celebration",      category: "birthday" },
  birthday2:   { label: "Elegant Birthday", category: "birthday" },
  babyshower1: { label: "Sweet Baby",       category: "babyshower" },
  babyshower2: { label: "Baby Bloom",       category: "babyshower" },
};

const TemplatePreviewPage = () => {
  const { templateId = "classic" } = useParams<{ templateId: string }>();
  const navigate = useNavigate();
  const isLoggedIn = getTokenPayload() !== null;

  const meta = templateMeta[templateId] ?? templateMeta["classic"];

  const sample =
    meta.category === "birthday"
      ? { ...birthdaySample, template: templateId as WeddingInvite["template"] }
      : meta.category === "babyshower"
      ? { ...babyShowerSample, template: templateId as WeddingInvite["template"] }
      : { ...weddingSample, template: templateId as WeddingInvite["template"] };

  const handleUse = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    navigate(`/create?template=${templateId}&category=${meta.category}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 relative">
      {/* Sticky top bar */}
      <div className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur border-b border-gray-700 px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/templates")}
            className="flex items-center gap-1.5 text-sm text-gray-300 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Templates
          </button>
          <span className="text-gray-600">/</span>
          <span className="text-sm text-white font-medium">{meta.label}</span>
          <span className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full">Sample Preview</span>
        </div>

        <button
          onClick={handleUse}
          className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          {isLoggedIn ? "Use This Template" : "Sign In to Use"}
        </button>
      </div>

      {/* Template rendered below */}
      <div>
        {templateId === "classic"     && <ClassicTemplate     invite={sample} />}
        {templateId === "modern"      && <ModernTemplate      invite={sample} />}
        {templateId === "floral"      && <FloralTemplate      invite={sample} />}
        {templateId === "birthday1"   && <BirthdayTemplate1   invite={sample} />}
        {templateId === "birthday2"   && <BirthdayTemplate2   invite={sample} />}
        {templateId === "babyshower1" && <BabyShowerTemplate1 invite={sample} />}
        {templateId === "babyshower2" && <BabyShowerTemplate2 invite={sample} />}
      </div>
    </div>
  );
};

export default TemplatePreviewPage;
