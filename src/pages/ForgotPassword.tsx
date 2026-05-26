import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

type Step = "email" | "otp" | "reset";

const steps = ["Email", "Verify OTP", "New Password"];

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const stepIndex = { email: 0, otp: 1, reset: 2 }[step];

  const sendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await axiosClient.post("/auth/forgot-password", { email });
      setStep("otp");
    } catch (err: any) {
      setError(err.response?.data?.msg || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) { setError("Enter the 6-digit OTP sent to your email."); return; }
    setError("");
    setStep("reset");
  };

  const resetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (newPassword !== confirmPassword) { setError("Passwords do not match."); return; }
    if (newPassword.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true);
    try {
      await axiosClient.post("/auth/reset-password", { email, otp, newPassword });
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.msg || "Failed to reset password.");
      if (err.response?.data?.msg?.includes("OTP")) setStep("otp");
    } finally {
      setLoading(false);
    }
  };

  const EyeIcon = ({ open }: { open: boolean }) =>
    open ? (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ) : (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.97 9.97 0 012.555-4.27M9.88 9.88a3 3 0 104.24 4.24M3 3l18 18" />
      </svg>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="flex items-center gap-2 mb-8 justify-center">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-200">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <span className="font-bold text-gray-800 text-lg">ShopAdmin</span>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {/* Step indicator */}
          <div className="flex items-center mb-8">
            {steps.map((label, i) => (
              <div key={label} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    i < stepIndex ? "bg-blue-600 text-white" :
                    i === stepIndex ? "bg-blue-600 text-white ring-4 ring-blue-100" :
                    "bg-gray-100 text-gray-400"
                  }`}>
                    {i < stepIndex ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : i + 1}
                  </div>
                  <span className={`text-[10px] font-medium hidden sm:block ${i === stepIndex ? "text-blue-600" : "text-gray-400"}`}>
                    {label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 mb-4 rounded-full transition-colors ${i < stepIndex ? "bg-blue-600" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-5">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          {/* Step 1 */}
          {step === "email" && (
            <>
              <h1 className="text-xl font-bold text-gray-800 mb-1">Forgot your password?</h1>
              <p className="text-gray-500 text-sm mb-6">Enter your email and we'll send a 6-digit reset code.</p>
              <form onSubmit={sendOtp} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email address</label>
                  <input
                    type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                    placeholder="you@example.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
                <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors text-sm disabled:opacity-60">
                  {loading ? "Sending..." : "Send Reset Code"}
                </button>
              </form>
            </>
          )}

          {/* Step 2 */}
          {step === "otp" && (
            <>
              <h1 className="text-xl font-bold text-gray-800 mb-1">Enter reset code</h1>
              <p className="text-gray-500 text-sm mb-6">
                We sent a 6-digit code to <span className="font-semibold text-gray-700">{email}</span>. It expires in 10 minutes.
              </p>
              <form onSubmit={verifyOtp} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">OTP Code</label>
                  <input
                    type="text" inputMode="numeric" maxLength={6} value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    required placeholder="123456"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-center text-2xl tracking-[0.5em] font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors text-sm">
                  Verify Code
                </button>
                <button
                  type="button"
                  onClick={() => { setStep("email"); setOtp(""); setError(""); }}
                  className="w-full text-sm text-gray-500 hover:text-gray-700 font-medium py-2 transition-colors"
                >
                  Didn't receive it? Resend
                </button>
              </form>
            </>
          )}

          {/* Step 3 */}
          {step === "reset" && (
            <>
              <h1 className="text-xl font-bold text-gray-800 mb-1">Set new password</h1>
              <p className="text-gray-500 text-sm mb-6">Choose a strong password for your account.</p>
              <form onSubmit={resetPassword} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">New Password</label>
                  <div className="relative">
                    <input
                      type={showPwd ? "text" : "password"} value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)} required placeholder="Min. 6 characters"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                    <button type="button" onClick={() => setShowPwd((v) => !v)} className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600">
                      <EyeIcon open={showPwd} />
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirm ? "text" : "password"} value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)} required placeholder="Re-enter password"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                    <button type="button" onClick={() => setShowConfirm((v) => !v)} className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600">
                      <EyeIcon open={showConfirm} />
                    </button>
                  </div>
                </div>
                <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors text-sm disabled:opacity-60">
                  {loading ? "Resetting..." : "Reset Password"}
                </button>
              </form>
            </>
          )}

          <p className="text-center text-sm text-gray-400 mt-6">
            Remember it?{" "}
            <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
