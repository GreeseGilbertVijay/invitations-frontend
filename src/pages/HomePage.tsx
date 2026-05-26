import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const categories = [
  {
    id: "wedding",
    label: "Marriage",
    emoji: "💍",
    description: "Elegant wedding & marriage invitation templates for your big day.",
    gradient: "from-pink-400 to-rose-500",
    tag: "Most Popular",
    tagColor: "bg-pink-100 text-pink-700",
  },
  {
    id: "birthday",
    label: "Birthday",
    emoji: "🎂",
    description: "Fun, vibrant birthday invitation templates for all ages.",
    gradient: "from-yellow-400 to-orange-500",
    tag: "Trending",
    tagColor: "bg-orange-100 text-orange-700",
  },
  {
    id: "anniversary",
    label: "Anniversary",
    emoji: "🥂",
    description: "Celebrate milestones with beautiful anniversary invitation designs.",
    gradient: "from-purple-400 to-indigo-500",
    tag: "New",
    tagColor: "bg-purple-100 text-purple-700",
  },
  {
    id: "babyshower",
    label: "Baby Shower",
    emoji: "🍼",
    description: "Adorable baby shower invitations to welcome the newest arrival.",
    gradient: "from-blue-300 to-cyan-400",
    tag: "",
    tagColor: "",
  },
];

const sidebarLinks = [
  {
    label: "Home",
    href: "/",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    active: true,
  },
  {
    label: "Wedding Invitations",
    href: "#wedding",
    icon: <span className="text-sm">💍</span>,
    active: false,
  },
  {
    label: "Birthday Invitations",
    href: "#birthday",
    icon: <span className="text-sm">🎂</span>,
    active: false,
  },
  {
    label: "Anniversary",
    href: "#anniversary",
    icon: <span className="text-sm">🥂</span>,
    active: false,
  },
  {
    label: "Baby Shower",
    href: "#babyshower",
    icon: <span className="text-sm">🍼</span>,
    active: false,
  },
];

const HomePage = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAuth = !!localStorage.getItem("token");

  const handleCategoryClick = (categoryId: string) => {
    if (isAuth) {
      navigate(`/create?category=${categoryId}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Left Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-gray-900 text-white z-30 flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 lg:z-auto lg:flex-shrink-0
        `}
      >
        {/* Brand / Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-700/60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center text-base">
              💍
            </div>
            <span className="text-lg font-bold tracking-wide">InviteBox</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-5 overflow-y-auto">
          <p className="px-4 mb-3 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
            Invitations
          </p>
          <div className="space-y-1">
            {sidebarLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  link.active
                    ? "bg-pink-600 text-white shadow-md shadow-pink-900/40"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                {link.icon}
                {link.label}
              </a>
            ))}
          </div>
        </nav>

        {/* Auth buttons at bottom */}
        <div className="px-4 py-5 border-t border-gray-700/60 space-y-2">
          <Link
            to="/login"
            className="block w-full text-center px-4 py-2.5 rounded-xl text-sm font-medium text-gray-300 border border-gray-600 hover:bg-gray-800 hover:text-white transition-all"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="block w-full text-center px-4 py-2.5 rounded-xl text-sm font-medium bg-pink-600 hover:bg-pink-700 text-white transition-all shadow-md shadow-pink-900/30"
          >
            Sign Up Free
          </Link>
        </div>
      </aside>

      {/* Main area */}
      <div className="lg:ml-0 flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-4 lg:px-8 py-3 flex items-center justify-between gap-4">
            {/* Mobile: hamburger + logo */}
            <div className="flex items-center gap-3 lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="flex items-center gap-2">
                <span className="text-lg">💍</span>
                <span className="font-bold text-gray-800">InviteBox</span>
              </div>
            </div>

            {/* Desktop: nav links */}
            <nav className="hidden lg:flex items-center gap-6">
              <a href="/" className="text-sm font-semibold text-gray-800 hover:text-pink-600 transition-colors">
                Home
              </a>
              <a href="#templates" className="text-sm font-medium text-gray-500 hover:text-pink-600 transition-colors">
                Templates
              </a>
              <a href="#features" className="text-sm font-medium text-gray-500 hover:text-pink-600 transition-colors">
                Features
              </a>
            </nav>

            {/* Auth buttons */}
            <div className="flex items-center gap-2 ml-auto">
              <Link
                to="/login"
                className="text-sm font-medium text-gray-600 hover:text-pink-600 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="text-sm font-semibold bg-pink-600 hover:bg-pink-700 text-white px-5 py-2 rounded-lg transition-all shadow-sm shadow-pink-200"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1">
          {/* Hero */}
          <section className="py-14 lg:py-20 px-4 lg:px-12 text-center bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-2xl mx-auto">
              <span className="inline-block mb-4 px-4 py-1.5 bg-pink-50 text-pink-600 text-xs font-semibold rounded-full border border-pink-100 uppercase tracking-wide">
                Digital Invitations Made Easy
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
                Beautiful Invitations,{" "}
                <span className="text-pink-600">Made in Minutes</span>
              </h1>
              <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                Create stunning digital invitations for weddings, birthdays, and special occasions. Share instantly with a link.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  to="/signup"
                  className="px-8 py-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-xl transition-all shadow-md shadow-pink-200 text-sm"
                >
                  Get Started Free
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-3 border border-gray-200 text-gray-600 hover:border-pink-300 hover:text-pink-600 font-medium rounded-xl transition-all text-sm"
                >
                  Sign In to Dashboard
                </Link>
              </div>
            </div>
          </section>

          {/* Template Categories */}
          <section id="templates" className="px-4 lg:px-12 py-12">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                  Choose Your Invitation Type
                </h2>
                <p className="text-gray-500">
                  Pick a category and customize your invitation with beautiful templates
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    id={cat.id}
                    onClick={() => handleCategoryClick(cat.id)}
                    className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all overflow-hidden text-left cursor-pointer"
                  >
                    {/* Gradient header */}
                    <div
                      className={`relative h-36 bg-gradient-to-br ${cat.gradient} flex items-center justify-center overflow-hidden`}
                    >
                      <span className="text-7xl drop-shadow-md select-none">{cat.emoji}</span>
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                      {cat.tag && (
                        <span
                          className={`absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full ${cat.tagColor}`}
                        >
                          {cat.tag}
                        </span>
                      )}
                    </div>

                    {/* Card body */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-gray-800 mb-1">{cat.label}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{cat.description}</p>
                      <div className="mt-4 flex items-center gap-1.5 text-pink-600 text-sm font-semibold group-hover:gap-2.5 transition-all">
                        Browse templates
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Features strip */}
          <section id="features" className="px-4 lg:px-12 py-12 bg-white border-t border-gray-100">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                {[
                  { icon: "⚡", title: "Instant Sharing", desc: "Share your invitation via a unique link instantly with all your guests." },
                  { icon: "🎨", title: "Beautiful Templates", desc: "Professionally designed templates for every occasion and style." },
                  { icon: "📱", title: "Mobile Friendly", desc: "Invitations look gorgeous on every device — phone, tablet, or desktop." },
                ].map((f) => (
                  <div key={f.title} className="flex flex-col items-center">
                    <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center text-2xl mb-4">
                      {f.icon}
                    </div>
                    <h3 className="font-bold text-gray-800 mb-1">{f.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Banner */}
          <section className="px-4 lg:px-12 py-12 bg-gradient-to-br from-pink-600 to-rose-600">
            <div className="max-w-2xl mx-auto text-center text-white">
              <h2 className="text-2xl lg:text-3xl font-bold mb-3">Ready to create your invitation?</h2>
              <p className="text-pink-100 mb-7 text-sm">
                Join thousands of people who have already created beautiful digital invitations.
              </p>
              <Link
                to="/signup"
                className="inline-block px-8 py-3 bg-white text-pink-600 font-semibold rounded-xl hover:bg-pink-50 transition-all shadow-lg text-sm"
              >
                Create Free Invitation →
              </Link>
            </div>
          </section>

          {/* Footer */}
          <footer className="px-4 lg:px-12 py-6 bg-gray-900 text-gray-400 text-center text-xs">
            © {new Date().getFullYear()} InviteBox. All rights reserved.
            <span className="mx-2">·</span>
            <Link to="/login" className="hover:text-white transition-colors">Sign In</Link>
            <span className="mx-2">·</span>
            <Link to="/signup" className="hover:text-white transition-colors">Sign Up</Link>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
