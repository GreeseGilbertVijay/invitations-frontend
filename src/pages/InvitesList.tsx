import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import type { WeddingInvite } from "../types/WeddingInvite";

const templateBadge: Record<string, { label: string; color: string }> = {
  classic: { label: "Classic", color: "bg-amber-100 text-amber-700" },
  modern:  { label: "Modern",  color: "bg-gray-100 text-gray-600"   },
  floral:  { label: "Floral",  color: "bg-pink-100 text-pink-600"   },
};

const statusConfig: Record<string, { label: string; bg: string; dot: string }> = {
  active:  { label: "Active",  bg: "bg-green-100 text-green-700",   dot: "bg-green-500"  },
  draft:   { label: "Draft",   bg: "bg-yellow-100 text-yellow-700", dot: "bg-yellow-500" },
  expired: { label: "Expired", bg: "bg-red-100 text-red-600",       dot: "bg-red-500"    },
};

const formatDate = (d: string) => {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
};

const daysLeft = (expiresAt?: string) => {
  if (!expiresAt) return null;
  const diff = new Date(expiresAt).getTime() - Date.now();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return days;
};

interface InviteWithStatus extends WeddingInvite {
  status: string;
  expiresAt?: string;
}

const InvitesList = () => {
  const [invites, setInvites] = useState<InviteWithStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "active" | "draft" | "expired">("all");

  const fetchInvites = async () => {
    const res = await axiosClient.get("/invites");
    setInvites(res.data);
    setLoading(false);
  };

  useEffect(() => { fetchInvites(); }, []);

  const deleteInvite = async (id: string) => {
    if (!confirm("Delete this invitation? This cannot be undone.")) return;
    setDeletingId(id);
    await axiosClient.delete(`/invites/${id}`);
    setDeletingId(null);
    fetchInvites();
  };

  const filtered = filter === "all" ? invites : invites.filter((i) => i.status === filter);

  const counts = {
    all: invites.length,
    active: invites.filter((i) => i.status === "active").length,
    draft: invites.filter((i) => i.status === "draft").length,
    expired: invites.filter((i) => i.status === "expired").length,
  };

  if (loading)
    return (
      <div className="p-6 lg:p-8 space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-28 bg-gray-200 rounded-2xl animate-pulse" />
        ))}
      </div>
    );

  return (
    <div className="p-4 lg:p-4 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">My Invitations</h1>
          <p className="text-gray-500 text-sm mt-1">{invites.length} invitation{invites.length !== 1 ? "s" : ""} total</p>
        </div>
        <Link
          to="/create"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-colors shadow-sm shadow-blue-200"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Invitation
        </Link>
      </div>

      {/* Filter tabs */}
      {invites.length > 0 && (
        <div className="flex gap-2 mb-5 flex-wrap">
          {(["all", "active", "draft", "expired"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-gray-800 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${filter === f ? "bg-white/20" : "bg-gray-200"}`}>
                {counts[f]}
              </span>
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-14 text-center">
          <div className="text-5xl mb-4">💍</div>
          <p className="text-gray-500 font-medium">
            {filter === "all" ? "No invitations yet" : `No ${filter} invitations`}
          </p>
          {filter === "all" && (
            <Link to="/create" className="mt-3 inline-block text-sm text-blue-600 hover:underline font-medium">
              Create your first wedding invitation
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((inv) => {
            const badge = templateBadge[inv.template] ?? { label: inv.template, color: "bg-gray-100 text-gray-600" };
            const sc = statusConfig[inv.status] ?? statusConfig.active;
            const link = `${window.location.origin}/invite/${inv.slug}`;
            const isExpired = inv.status === "expired";
            const isDraft = inv.status === "draft";
            const days = daysLeft(inv.expiresAt);

            return (
              <div
                key={inv._id}
                className={`bg-white rounded-2xl border shadow-sm hover:shadow-md transition-shadow p-5 ${
                  isExpired ? "border-red-100 opacity-70" : "border-gray-100"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${
                    isExpired ? "bg-gray-100" : "bg-gradient-to-br from-pink-100 to-purple-100"
                  }`}>
                    {isExpired ? "⏳" : "💒"}
                  </div>

                  {/* Main info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className={`font-bold text-base ${isExpired ? "text-gray-400 line-through" : "text-gray-800"}`}>
                        {inv.groomName} &amp; {inv.brideName}
                      </h2>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badge.color}`}>
                        {badge.label}
                      </span>
                      {/* Status badge */}
                      <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full font-medium ${sc.bg}`}>
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${sc.dot}`} />
                        {sc.label}
                      </span>
                    </div>

                    <p className="text-sm text-gray-500 mt-0.5 truncate">
                      {inv.venue}{inv.weddingDate ? ` · ${formatDate(inv.weddingDate)}` : ""}
                    </p>

                    {/* Expiry info */}
                    {!isExpired && !isDraft && days !== null && (
                      <p className={`text-xs mt-1 ${days <= 5 ? "text-orange-500 font-semibold" : "text-gray-400"}`}>
                        {days > 0 ? `Expires in ${days} day${days !== 1 ? "s" : ""}` : "Expires today"}
                      </p>
                    )}
                    {isExpired && inv.expiresAt && (
                      <p className="text-xs text-red-400 mt-1">
                        Expired on {formatDate(inv.expiresAt)}
                      </p>
                    )}

                    {/* Share link (only for active) */}
                    {!isExpired && !isDraft && (
                      <div className="mt-1.5 flex items-center gap-1.5">
                        <a
                          href={link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-blue-500 hover:text-blue-700 truncate max-w-xs"
                        >
                          {link}
                        </a>
                        <button
                          onClick={() => { navigator.clipboard.writeText(link); alert("Copied!"); }}
                          className="text-gray-400 hover:text-gray-600 flex-shrink-0"
                          title="Copy link"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>
                      </div>
                    )}

                    {isExpired && (
                      <p className="text-xs text-red-400 mt-1 italic">
                        Link is no longer shareable
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 flex-shrink-0 flex-wrap">
                    {!isExpired && !isDraft && (
                      <a
                        href={link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-semibold text-blue-600 border border-blue-200 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        View
                      </a>
                    )}
                    {!isExpired && (
                      <Link
                        to={`/edit-invite/${inv._id}`}
                        className="text-xs font-semibold text-amber-600 border border-amber-200 hover:bg-amber-50 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Edit
                      </Link>
                    )}
                    <button
                      onClick={() => deleteInvite(inv._id!)}
                      disabled={deletingId === inv._id}
                      className="text-xs font-semibold text-red-500 border border-red-200 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                    >
                      {deletingId === inv._id ? "..." : "Delete"}
                    </button>
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

export default InvitesList;
