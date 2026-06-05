import { useParams, useNavigate } from "react-router-dom";
import { getTokenPayload } from "../utils/auth";
import { templateRegistry, getSample } from "../templates/registry";

const TemplatePreviewPage = () => {
  const { templateId = "classic" } = useParams<{ templateId: string }>();
  const navigate = useNavigate();
  const isLoggedIn = getTokenPayload() !== null;

  const entry = templateRegistry.find((t) => t.id === templateId) ?? templateRegistry[0];
  const sample = getSample(entry);

  const handleUse = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    navigate(`/create?template=${entry.id}&category=${entry.category}`);
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
          <span className="text-sm text-white font-medium">{entry.label}</span>
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
        <entry.Component invite={sample} />
      </div>
    </div>
  );
};

export default TemplatePreviewPage;
