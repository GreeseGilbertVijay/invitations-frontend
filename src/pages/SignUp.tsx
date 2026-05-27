import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import TopNav from "../components/TopNav";

const EyeIcon = ({ open }: { open: boolean }) =>
  open ? (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.97 9.97 0 012.555-4.27M9.88 9.88a3 3 0 104.24 4.24M3 3l18 18" />
    </svg>
  );

const SignUp = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) { setError("Passwords do not match."); return; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true);
    try {
      await axiosClient.post("/auth/register", {
        username: form.username,
        email: form.email,
        password: form.password,
      });
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.msg || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <TopNav />
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-blue-700 to-blue-800 flex-col justify-between p-12">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <span className="text-white font-bold text-lg">Wedding Invitations</span>
        </div>
        <div>
          <h2 className="text-4xl font-bold text-white leading-tight">
            Start Managing Your Cards Today.
          </h2>
          <p className="text-blue-200 mt-4 text-base leading-relaxed">
            Join thousands of happy couples who trust Wedding Invitations to create and manage their invites beautifully.
          </p>
        </div>
        <div>
           <p className="text-blue-300 text-sm">© {new Date().getFullYear()} Wedding Invitations</p>
           <p className="text-blue-300 text-sm">For Personal Customization Mail Us greesegilbertvijay@gmail.com</p>
        </div>
        
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile brand */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <span className="font-bold text-gray-800 text-lg">Wedding Invitations</span>
          </div>

          <h1 className="text-2xl lg:text-3xl cursor-pointer font-bold text-gray-800 mb-1">Create account</h1>
          <p className="text-gray-500 text-sm mb-8">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
              Sign in
            </Link>
          </p>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-5">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={submit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Username</label>
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                placeholder="johndoe"
                className="w-full border border-gray-200 bg-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email address</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full border border-gray-200 bg-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="Min. 6 characters"
                  className="w-full border border-gray-200 bg-white rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
                <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600">
                  <EyeIcon open={showPassword} />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Confirm Password</label>
              <div className="relative">
                <input
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Re-enter your password"
                  className="w-full border border-gray-200 bg-white rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
                <button type="button" onClick={() => setShowConfirm((v) => !v)} className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600">
                  <EyeIcon open={showConfirm} />
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors text-sm disabled:opacity-60 shadow-sm shadow-blue-200"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SignUp;
