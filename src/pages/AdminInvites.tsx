import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { isSuperAdmin } from "../utils/auth";

const templateLabel: Record<string, string> = {
  classic: "Classic",
  modern:  "Modern",
  floral:  "Floral",
};

const templateColor: Record<string, string> = {
  classic: "bg-amber-100 text-amber-700",
  modern:  "bg-gray-100 text-gray-600",
  floral:  "bg-pink-100 text-pink-600",
};

const statusConfig: Record<string, { label: string; color: string; dot: string }> = {
  active:  { label: "Active",  color: "bg-green-100 text-green-700",   dot: "bg-green-500"  },
  draft:   { label: "Draft",   color: "bg-yellow-100 text-yellow-700", dot: "bg-yellow-500" },
  expired: { label: "Expired", color: "bg-red-100 text-red-500",       dot: "bg-red-500"    },
};

const formatDate = (d: string) => {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
};

interface AdminInvite {
  _id: string;
  groomName: string;
  brideName: string;
  weddingDate: string;
  venue: string;
  template: string;
  status: string;
  slug: string;
  expiresAt?: string;
  createdAt?: string;
  createdBy?: {
    _id: string;
    username: string;
    email: string;
    userrole: string;
  };
}

const AdminInvites = () => {
  const navigate = useNavigate();
  const [invites, setInvites] = useState<AdminInvite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "draft" | "expired">("all");
  const [filterTemplate, setFilterTemplate] = useState<"all" | "classic" | "modern" | "floral">("all");

  useEffect(() => {
    if (!isSuperAdmin()) {
      navigate("/");
      return;
    }
    axiosClient
      .get("/invites/admin/all")
      .then((res) => { setInvites(res.data); setLoading(false); })
      .catch(() => { setError("Failed to load invitations or access denied."); setLoading(false); });
  }, [navigate]);

  const filtered = invites.filter((inv) => {
    const matchSearch =
      !search ||
      inv.groomName.toLowerCase().includes(search.toLowerCase()) ||
      inv.brideName.toLowerCase().includes(search.toLowerCase()) ||
      inv.venue.toLowerCase().includes(search.toLowerCase()) ||
      inv.createdBy?.username?.toLowerCase().includes(search.toLowerCase()) ||
      inv.createdBy?.email?.toLowerCase().includes(search.toLowerCase()) ||
      inv.slug.toLowerCase().includes(search.toLowerCase());

    const matchStatus = filterStatus === "all" || inv.status === filterStatus;
    const matchTemplate = filterTemplate === "all" || inv.template === filterTemplate;

    return matchSearch && matchStatus && matchTemplate;
  });

  const counts = {
    total: invites.length,
    active: invites.filter((i) => i.status === "active").length,
    expired: invites.filter((i) => i.status === "expired").length,
    draft: invites.filter((i) => i.status === "draft").length,
  };

  const uniqueUsers = new Set(invites.map((i) => i.createdBy?._id)).size;

  if (loading)
    return (
      <div className="p-6 lg:p-8 space-y-4 max-w-6xl mx-auto">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-20 bg-gray-200 rounded-2xl animate-pulse" />
        ))}
      </div>
    );

  if (error)
    return (
      <div className="p-6 lg:p-8 max-w-xl mx-auto">
        <div className="bg-red-50 border border-red-200 text-red-600 px-5 py-4 rounded-2xl text-sm">{error}</div>
        <Link to="/" className="mt-4 inline-block text-sm text-gray-500 hover:text-gray-700">← Back to Dashboard</Link>
      </div>
    );

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs bg-purple-100 text-purple-700 px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider">
              Superadmin
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">All Invitations</h1>
          <p className="text-gray-500 text-sm mt-0.5">Viewing all invitations from all users.</p>
        </div>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 border border-gray-200 text-gray-600 hover:bg-gray-50 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
        >
          ← Dashboard
        </Link>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total", value: counts.total, color: "bg-purple-50 text-purple-700" },
          { label: "Active", value: counts.active, color: "bg-green-50 text-green-700" },
          { label: "Expired", value: counts.expired, color: "bg-red-50 text-red-600" },
          { label: "Users", value: uniqueUsers, color: "bg-blue-50 text-blue-700" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold ${color}`}>
              {value}
            </div>
            <p className="text-sm text-gray-500">{label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1 max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, venue, user…"
            className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
          className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="expired">Expired</option>
        </select>

        <select
          value={filterTemplate}
          onChange={(e) => setFilterTemplate(e.target.value as typeof filterTemplate)}
          className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
        >
          <option value="all">All Templates</option>
          <option value="classic">Classic</option>
          <option value="modern">Modern</option>
          <option value="floral">Floral</option>
        </select>
      </div>

      <p className="text-xs text-gray-400 mb-3">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</p>

      {/* Table / List */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-10 text-center">
          <p className="text-gray-400">No invitations match your filters.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Table header */}
          <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] gap-4 px-5 py-3 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <span>Couple</span>
            <span>Template</span>
            <span>Status</span>
            <span>Wedding</span>
            <span>User</span>
            <span>Expires</span>
          </div>

          {filtered.map((inv, idx) => {
            const sc = statusConfig[inv.status] ?? statusConfig.active;
            const tc = templateColor[inv.template] ?? "bg-gray-100 text-gray-600";
            const link = `${window.location.origin}/invite/${inv.slug}`;
            const isExpired = inv.status === "expired";

            return (
              <div
                key={inv._id}
                className={`grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] gap-3 md:gap-4 px-5 py-4 items-center ${
                  idx < filtered.length - 1 ? "border-b border-gray-50" : ""
                } ${isExpired ? "bg-gray-50/60" : "hover:bg-gray-50/40"} transition-colors`}
              >
                {/* Couple */}
                <div>
                  <p className={`font-semibold text-sm ${isExpired ? "text-gray-400 line-through" : "text-gray-800"}`}>
                    {inv.groomName} &amp; {inv.brideName}
                  </p>
                  <p className="text-xs text-gray-400 truncate">{inv.venue}</p>
                  {!isExpired && (
                    <a
                      href={link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-blue-500 hover:underline truncate block max-w-[200px]"
                    >
                      {inv.slug}
                    </a>
                  )}
                </div>

                {/* Template */}
                <div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tc}`}>
                    {templateLabel[inv.template] ?? inv.template}
                  </span>
                </div>

                {/* Status */}
                <div>
                  <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full font-medium ${sc.color}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                    {sc.label}
                  </span>
                </div>

                {/* Wedding date */}
                <div className="text-xs text-gray-600">{formatDate(inv.weddingDate)}</div>

                {/* User */}
                <div>
                  {inv.createdBy ? (
                    <>
                      <p className="text-xs font-medium text-gray-700">{inv.createdBy.username}</p>
                      <p className="text-xs text-gray-400 truncate">{inv.createdBy.email}</p>
                    </>
                  ) : (
                    <span className="text-xs text-gray-400">—</span>
                  )}
                </div>

                {/* Expires */}
                <div className={`text-xs ${isExpired ? "text-red-400 font-medium" : "text-gray-500"}`}>
                  {isExpired ? `Expired ${formatDate(inv.expiresAt ?? "")}` : formatDate(inv.expiresAt ?? "")}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminInvites;
