import { Link } from "react-router-dom";
import { MdEmail, MdPhone } from "react-icons/md";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { getTokenPayload } from "../utils/auth";

const publicLinks = [
  { to: "/", label: "Home" },
  { to: "/templates", label: "Templates" },
];

const authLinks = [
  { to: "/invites", label: "My Invitations" },
  { to: "/create", label: "Create Invitation" },
  { to: "/profile", label: "My Profile" },
];

const Footer = () => {
  const isLoggedIn = getTokenPayload() !== null;
  const links = isLoggedIn ? [...publicLinks, ...authLinks] : publicLinks;

  return (
    <footer className="bg-gray-900 text-gray-400 px-4 lg:px-12 pt-12 pb-6">
      <div className="max-w-6xl mx-auto">
        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-gray-700/60">
          {/* Left — Brand */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2 w-fit">
              <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center text-base">
                💍
              </div>
              <span className="font-bold text-white tracking-wide text-base">
                Wedding Invite
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
              Create stunning digital invitations for weddings, birthdays, and
              special occasions. Share instantly with a link — no printing
              needed.
            </p>
            <span className="text-xs text-gray-600">
              © {new Date().getFullYear()} Wedding Invite. All rights reserved.
            </span>
          </div>

          {/* Middle — Page Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2.5">
              {links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-400 hover:text-pink-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {!isLoggedIn && (
                <>
                  <li>
                    <Link
                      to="/login"
                      className="text-sm text-gray-400 hover:text-pink-400 transition-colors"
                    >
                      Sign In
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/signup"
                      className="text-sm text-gray-400 hover:text-pink-400 transition-colors"
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Right — Contact & Social */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Contact Us
            </h4>
            <ul className="flex flex-col gap-3 mb-6">
              <li>
                <a
                  href="mailto:info@weddinginvite.in"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-pink-400 transition-colors"
                >
                  <MdEmail className="w-4 h-4 text-pink-500 flex-shrink-0" />
                  info@weddinginvite.in
                </a>
              </li>
              <li>
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-pink-400 transition-colors"
                >
                  <MdPhone className="w-4 h-4 text-pink-500 flex-shrink-0" />
                  +91 98765 43210
                </a>
              </li>
            </ul>

            <h4 className="text-white font-semibold text-sm mb-3 uppercase tracking-wider">
              Follow Us
            </h4>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-gray-800 hover:bg-pink-600 flex items-center justify-center transition-colors"
              >
                <FaInstagram className="w-3.5 h-3.5 text-gray-300" />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-colors"
              >
                <FaFacebookF className="w-3.5 h-3.5 text-gray-300" />
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-8 h-8 rounded-full bg-gray-800 hover:bg-green-600 flex items-center justify-center transition-colors"
              >
                <FaWhatsapp className="w-3.5 h-3.5 text-gray-300" />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-gray-800 hover:bg-red-600 flex items-center justify-center transition-colors"
              >
                <FaYoutube className="w-3.5 h-3.5 text-gray-300" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <p className="text-center text-xs text-gray-600 pt-5">
          Made with ❤️ for every special occasion · Powered by Wedding Invite
        </p>
      </div>
    </footer>
  );
};

export default Footer;
