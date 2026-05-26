import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { isSuperAdmin } from "../utils/auth";

const commonNav = [
  {
    to: "/dashboard",
    end: true,
    label: "Dashboard",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    to: "/invites",
    end: false,
    label: "My Invitations",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    to: "/create",
    end: false,
    label: "Create Invitation",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
  {
    to: "/profile",
    end: false,
    label: "My Profile",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
];

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
    isActive
      ? "bg-pink-600 text-white shadow-sm"
      : "text-gray-300 hover:bg-gray-700 hover:text-white"
  }`;

const adminLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
    isActive
      ? "bg-purple-600 text-white shadow-sm"
      : "text-gray-300 hover:bg-gray-700 hover:text-white"
  }`;

const TopNav = () => {
  const navigate = useNavigate();
  const isAdmin = isSuperAdmin();
  const [mobileOpen, setMobileOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const renderCommonLinks = (onClick?: () => void) =>
    commonNav.map(({ to, end, label, icon }) => (
      <NavLink key={to} to={to} end={end} onClick={onClick} className={linkClass}>
        {icon}
        {label}
      </NavLink>
    ));

  return (
    <header className="bg-gray-900 text-white sticky top-0 z-30 shadow-md">
      <div className="px-4 flex items-center justify-between h-14">
        {/* Brand */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-7 h-7 bg-pink-500 rounded-lg flex items-center justify-center text-sm">
            💍
          </div>
          <span className="font-bold tracking-wide text-base">Wedding Invite</span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 ml-6">
          {/* Common links — all users */}
          {renderCommonLinks()}

          {/* All Invitations — superadmin only */}
          {isAdmin && (
            <NavLink to="/admin/invites" className={adminLinkClass}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
              </svg>
              All Invitations
              <span className="ml-1 text-[10px] bg-purple-500/30 text-purple-300 px-1.5 py-0.5 rounded-full leading-none">
                SA
              </span>
            </NavLink>
          )}
        </nav>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3 ml-auto">
          {isAdmin && (
            <span className="flex items-center gap-1.5 text-xs bg-purple-500/20 text-purple-300 px-2.5 py-1 rounded-full font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              Superadmin
            </span>
          )}
          <button
            onClick={logout}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white ml-auto"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <nav className="md:hidden px-3 pb-3 border-t border-gray-700/60 space-y-1 pt-2">
          {/* Common links — all users */}
          {renderCommonLinks(() => setMobileOpen(false))}

          {/* All Invitations — superadmin only */}
          {isAdmin && (
            <NavLink
              to="/admin/invites"
              onClick={() => setMobileOpen(false)}
              className={adminLinkClass}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
              </svg>
              All Invitations
              <span className="ml-1 text-[10px] bg-purple-500/30 text-purple-300 px-1.5 py-0.5 rounded-full leading-none">
                SA
              </span>
            </NavLink>
          )}

          <div className="pt-2 border-t border-gray-700/60">
            {isAdmin && (
              <div className="mb-2 px-3 py-1.5 rounded-lg bg-purple-500/10 text-purple-300 text-xs font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                Superadmin
              </div>
            )}
            <button
              onClick={logout}
              className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default TopNav;
