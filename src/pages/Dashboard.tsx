import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import type { WeddingInvite } from "../types/WeddingInvite";

const templateColor: Record<string, string> = {
  classic: "from-amber-400 to-yellow-300",
  modern:  "from-gray-700 to-gray-500",
  floral:  "from-pink-400 to-purple-400",
};

const templateLabel: Record<string, string> = {
  classic: "Classic",
  modern:  "Modern",
  floral:  "Floral",
};

const statusConfig: Record<string, { label: string; color: string; dot: string }> = {
  active:  { label: "Active",  color: "bg-green-100 text-green-700 border-green-200",   dot: "bg-green-500"  },
  draft:   { label: "Draft",   color: "bg-yellow-100 text-yellow-700 border-yellow-200", dot: "bg-yellow-500" },
  expired: { label: "Expired", color: "bg-red-100 text-red-500 border-red-200",         dot: "bg-red-500"    },
};

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

interface InviteWithStatus extends WeddingInvite {
  status: string;
  expiresAt?: string;
}

const StatCard = ({
  label, value, color, icon,
}: {
  label: string; value: string | number; color: string; icon: React.ReactNode;
}) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500 font-medium">{label}</p>
      <p className="text-2xl font-bold text-gray-800 mt-0.5">{value}</p>
    </div>
  </div>
);

const Dashboard = () => {
  const [invites, setInvites] = useState<InviteWithStatus[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient.get("/invites").then((res) => {
      setInvites(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const total = invites.length;
  const active = invites.filter((i) => i.status === "active").length;
  const expired = invites.filter((i) => i.status === "expired").length;
  const recent = invites.slice(0, 6);

  if (loading)
    return (
      <div className="p-6 lg:p-8 space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-24 bg-gray-200 rounded-2xl animate-pulse" />
        ))}
      </div>
    );

  return (
    <div className="p-4 lg:p-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your wedding invitations.</p>
        </div>
        <Link
          to="/create"
          className="inline-flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-colors shadow-sm shadow-pink-200"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Invitation
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <StatCard
          label="Total"
          value={total}
          color="bg-pink-50 text-pink-600"
          icon={<span className="text-xl">💍</span>}
        />
        <StatCard
          label="Active"
          value={active}
          color="bg-green-50 text-green-600"
          icon={<span className="text-xl">✅</span>}
        />
        <StatCard
          label="Expired"
          value={expired}
          color="bg-red-50 text-red-500"
          icon={<span className="text-xl">⏳</span>}
        />
        <StatCard
          label="Draft"
          value={invites.filter((i) => i.status === "draft").length}
          color="bg-yellow-50 text-yellow-600"
          icon={<span className="text-xl">📝</span>}
        />
      </div>

      {/* Recent invitations */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-gray-800">Recent Invitations</h2>
        <Link to="/invites" className="text-sm text-pink-600 hover:text-pink-700 font-medium flex items-center gap-1">
          View all
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {recent.length === 0 ? (
        <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-12 text-center">
          <div className="text-5xl mb-3">💍</div>
          <p className="text-gray-500 font-medium">No invitations yet</p>
          <Link to="/create" className="mt-3 inline-block text-sm text-pink-600 hover:underline font-medium">
            Create your first wedding invitation
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {recent.map((inv) => {
            const link = `${window.location.origin}/invite/${inv.slug}`;
            const sc = statusConfig[inv.status] ?? statusConfig.active;
            const isExpired = inv.status === "expired";
            return (
              <div
                key={inv._id}
                className={`bg-white rounded-2xl border shadow-sm hover:shadow-md transition-shadow overflow-hidden ${
                  isExpired ? "border-red-100 opacity-75" : "border-gray-100"
                }`}
              >
                {/* Template colour strip */}
                <div className={`h-2 bg-gradient-to-r ${templateColor[inv.template] ?? "from-gray-300 to-gray-400"} ${isExpired ? "opacity-40" : ""}`} />

                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className={`font-bold text-sm leading-tight ${isExpired ? "text-gray-400 line-through" : "text-gray-800"}`}>
                      {inv.groomName} &amp; {inv.brideName}
                    </h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full border flex-shrink-0 inline-flex items-center gap-1 ${sc.color}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                      {sc.label}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 truncate">{inv.venue}</p>
                  {inv.weddingDate && (
                    <p className="text-xs text-gray-400 mt-0.5">
                      {templateLabel[inv.template] ?? inv.template} · {formatDate(inv.weddingDate)}
                    </p>
                  )}

                  <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2">
                    {isExpired ? (
                      <span className="flex-1 text-center text-xs text-red-400 py-1.5 border border-red-100 rounded-lg bg-red-50 cursor-not-allowed">
                        Link Expired
                      </span>
                    ) : (
                      <>
                        <a
                          href={link}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 text-center text-xs font-semibold text-pink-600 border border-pink-200 hover:bg-pink-50 py-1.5 rounded-lg transition-colors"
                        >
                          View
                        </a>
                        <button
                          onClick={() => { navigator.clipboard.writeText(link); alert("Link copied!"); }}
                          className="flex-1 text-center text-xs font-semibold text-gray-500 border border-gray-200 hover:bg-gray-50 py-1.5 rounded-lg transition-colors"
                        >
                          Copy Link
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
