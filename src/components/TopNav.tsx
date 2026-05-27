import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MdHouse, MdDashboard, MdEmail, MdAdd, MdPerson, MdViewList, MdLogout, MdClose, MdMenu, MdApps } from "react-icons/md";
import { isSuperAdmin, getTokenPayload } from "../utils/auth";

const TopNav = () => {
  const navigate = useNavigate();

  const isLoggedIn = getTokenPayload() !== null;
  const isAdmin = isSuperAdmin();

  const [mobileOpen, setMobileOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Single merged menu
  const navItems = [
    {
      to: "/",
      label: "Home",
      icon: <MdHouse className="w-4 h-4" />,
      show: true,
      admin: false,
    },
    {
      to: "/templates",
      label: "Templates",
      icon: <MdApps className="w-4 h-4" />,
      show: true,
      admin: false,
    },
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: <MdDashboard className="w-4 h-4" />,
      show: isLoggedIn && isAdmin,
      admin: false,
    },
    {
      to: "/invites",
      label: "My Invitations",
      icon: <MdEmail className="w-4 h-4" />,
      show: isLoggedIn,
      admin: false,
    },
    {
      to: "/create",
      label: "Create Invitation",
      icon: <MdAdd className="w-4 h-4" />,
      show: isLoggedIn,
      admin: false,
    },
    {
      to: "/profile",
      label: "My Profile",
      icon: <MdPerson className="w-4 h-4" />,
      show: isLoggedIn,
      admin: false,
    },
    {
      to: "/admin/invites",
      label: "All Invitations",
      icon: <MdViewList className="w-4 h-4" />,
      show: isLoggedIn && isAdmin,
      admin: true,
    },
  ];

  const getLinkClass = (isActive: boolean, admin?: boolean) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
      isActive
        ? admin
          ? "bg-purple-600 text-white shadow-sm"
          : "bg-pink-600 text-white shadow-sm"
        : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  const renderLinks = (onClick?: () => void) =>
    navItems
      .filter((item) => item.show)
      .map(({ to, label, icon, admin }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/dashboard"}
          onClick={onClick}
          className={({ isActive }) => getLinkClass(isActive, admin)}
        >
          {icon}
          {label}

          {admin && (
            <span className="ml-1 text-[10px] bg-purple-500/30 text-purple-300 px-1.5 py-0.5 rounded-full leading-none">
              SA
            </span>
          )}
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

          <span className="font-bold tracking-wide text-base">
            Wedding Invite
          </span>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-1 ml-6">
          {renderLinks()}
        </nav>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-3 ml-auto">
          {isLoggedIn ? (
            <>
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
                <MdLogout className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-all"
              >
                Sign In
              </NavLink>

              <NavLink
                to="/register"
                className="px-4 py-2 rounded-lg text-sm font-medium bg-pink-600 text-white hover:bg-pink-700 transition-all"
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white ml-auto"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? (
            <MdClose className="w-5 h-5" />
          ) : (
            <MdMenu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-700/60 px-3 py-3 space-y-2">
          {/* Nav links — public links always shown, protected links shown when logged in */}
          {renderLinks(() => setMobileOpen(false))}

          {isLoggedIn ? (
            <>
              {isAdmin && (
                <div className="px-3 py-2 rounded-lg bg-purple-500/10 text-purple-300 text-xs font-medium flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  Superadmin
                </div>
              )}
              <button
                onClick={logout}
                className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all"
              >
                <MdLogout className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-2 pt-1 border-t border-gray-700/40">
              <NavLink
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-all text-center"
              >
                Sign In
              </NavLink>
              <NavLink
                to="/register"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-pink-600 text-white hover:bg-pink-700 transition-all text-center"
              >
                Sign Up
              </NavLink>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default TopNav;