import { NavLink, useNavigate } from "react-router-dom";
import { isSuperAdmin } from "../utils/auth";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const nav = [
  {
    to: "/dashboard", end: true, label: "Dashboard",
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
  },
  {
    to: "/invites", label: "My Invitations",
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  },
  {
    to: "/create", label: "Create Invitation",
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>,
  },
  {
    to: "/profile", label: "My Profile",
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
  },
];

const Sidebar = ({ open, onClose }: SidebarProps) => {
  const navigate = useNavigate();
  const isAdmin = isSuperAdmin();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-gray-900 text-white z-30 flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 lg:z-auto lg:flex-shrink-0
        `}
      >
        {/* Brand */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-700/60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center text-base">
              💍
            </div>
            <span className="text-lg font-bold tracking-wide">Wedding Invite</span>
          </div>
          <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-white">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
          <p className="px-4 mb-2 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
            Menu
          </p>
          {nav.map(({ to, end, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-pink-600 text-white shadow-md shadow-pink-900/40"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              {icon}
              {label}
            </NavLink>
          ))}

          {/* Superadmin section */}
          {isAdmin && (
            <>
              <p className="px-4 mt-5 mb-2 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                Admin
              </p>
              <NavLink
                to="/admin/invites"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-purple-600 text-white shadow-md shadow-purple-900/40"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  }`
                }
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                </svg>
                All Invitations
                <span className="ml-auto text-[10px] bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded-full">SA</span>
              </NavLink>
            </>
          )}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-gray-700/60">
          {isAdmin && (
            <div className="mb-2 px-4 py-1.5 rounded-xl bg-purple-500/10 text-purple-300 text-xs font-medium flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              Superadmin
            </div>
          )}
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
