import React, { useState } from "react";
import { Eye, EyeOff, Compass, ArrowRight, ShieldCheck, Zap, BarChart3 } from "lucide-react";

const features = [
  { icon: <Zap size={18} />, title: "AI Receipt Scanning", desc: "Snap a photo, we extract every detail instantly." },
  { icon: <BarChart3 size={18} />, title: "Smart Analytics", desc: "Visual breakdowns of where your money goes." },
  { icon: <ShieldCheck size={18} />, title: "Trip Budgets", desc: "Set limits, track overspend, split with friends." },
];

export default function Login({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    if (isRegister && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const endpoint = isRegister ? "/api/register" : "/api/login";
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.error || "Something went wrong.");

      if (result.success) {
        localStorage.setItem("user", JSON.stringify(result.user));
        onLogin(result.user);
      } else {
        setError(result.error || "Authentication failed.");
      }
    } catch (err) {
      if (err.name === "TypeError" && err.message.includes("fetch")) {
        setError("Cannot connect to backend. Make sure the server is running on port 5000.");
      } else {
        setError(err.message || "Failed to authenticate.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* ── Left: Branding Panel ── */}
      <div
        className="hidden lg:flex flex-col justify-between w-[52%] relative overflow-hidden p-12"
        style={{
          background: "linear-gradient(145deg, #0f172a 0%, #1e1b4b 40%, #312e81 70%, #4c1d95 100%)",
        }}
      >
        {/* Decorative orbs */}
        <div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #818cf8 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #c084fc 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, #e0e7ff 0%, transparent 70%)" }}
        />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div
            className="flex items-center justify-center w-10 h-10 rounded-xl"
            style={{ background: "linear-gradient(135deg, #818cf8, #c084fc)" }}
          >
            <Compass size={20} className="text-white animate-spin-slow" />
          </div>
          <span className="text-white font-bold text-xl tracking-tight">TripSpend</span>
          <span
            className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
            style={{ background: "rgba(255,255,255,0.1)", color: "#a5b4fc" }}
          >
            Beta
          </span>
        </div>

        {/* Main headline */}
        <div className="relative z-10 space-y-6">
          <div className="space-y-3">
            <h1 className="text-5xl font-black text-white leading-tight">
              Travel smarter,<br />
              <span style={{ background: "linear-gradient(90deg, #a5b4fc, #e879f9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                spend wiser.
              </span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed max-w-md">
              The all-in-one expense tracker built for travellers. Scan receipts, manage budgets, and settle up with ease.
            </p>
          </div>

          <div className="space-y-4">
            {features.map((f) => (
              <div key={f.title} className="flex items-start gap-3.5 group">
                <div
                  className="flex items-center justify-center w-9 h-9 rounded-xl flex-shrink-0 mt-0.5"
                  style={{ background: "rgba(129,140,248,0.15)", color: "#a5b4fc", border: "1px solid rgba(129,140,248,0.2)" }}
                >
                  {f.icon}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{f.title}</p>
                  <p className="text-slate-400 text-sm mt-0.5">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10">
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} TripSpend. Built for explorers.
          </p>
        </div>
      </div>

      {/* ── Right: Auth Form ── */}
      <div className="flex-1 flex items-center justify-center p-6 bg-slate-50">
        <div className="w-full max-w-[420px] animate-slide-up">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 mb-8">
            <div
              className="flex items-center justify-center w-8 h-8 rounded-lg"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
            >
              <Compass size={16} className="text-white" />
            </div>
            <span className="font-bold text-slate-800 text-lg">TripSpend</span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900">
              {isRegister ? "Create account" : "Welcome back"}
            </h2>
            <p className="text-slate-500 mt-1.5 text-sm">
              {isRegister
                ? "Start tracking your travel expenses today."
                : "Sign in to continue to your dashboard."}
            </p>
          </div>

          {/* Tab switch */}
          <div
            className="flex p-1 mb-7 rounded-xl"
            style={{ background: "#e2e8f0" }}
          >
            {["Login", "Register"].map((tab) => {
              const active = (tab === "Login") ? !isRegister : isRegister;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => { setIsRegister(tab === "Register"); setError(""); }}
                  className="flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200"
                  style={{
                    background: active ? "#fff" : "transparent",
                    color: active ? "#4f46e5" : "#64748b",
                    boxShadow: active ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Error */}
          {error && (
            <div
              className="flex items-start gap-2.5 p-3.5 rounded-xl mb-5 text-sm"
              style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626" }}
            >
              <span className="mt-0.5 flex-shrink-0">⚠</span>
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Username
              </label>
              <input
                type="text"
                placeholder="e.g. john_traveller"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                className="w-full px-4 py-3 rounded-xl text-sm text-slate-800 placeholder-slate-400 transition-all duration-200 input-glow"
                style={{
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  outline: "none",
                }}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete={isRegister ? "new-password" : "current-password"}
                  className="w-full px-4 py-3 pr-12 rounded-xl text-sm text-slate-800 placeholder-slate-400 transition-all duration-200 input-glow"
                  style={{
                    background: "#fff",
                    border: "1px solid #e2e8f0",
                    outline: "none",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm password */}
            {isRegister && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Confirm Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                  className="w-full px-4 py-3 rounded-xl text-sm text-slate-800 placeholder-slate-400 transition-all duration-200 input-glow"
                  style={{
                    background: "#fff",
                    border: "1px solid #e2e8f0",
                    outline: "none",
                  }}
                />
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-semibold text-sm text-white mt-2 transition-all duration-200"
              style={{
                background: loading
                  ? "#6366f1"
                  : "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                opacity: loading ? 0.8 : 1,
                boxShadow: "0 4px 20px rgba(99,102,241,0.4)",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Please wait…</span>
                </>
              ) : (
                <>
                  <span>{isRegister ? "Create Account" : "Sign In"}</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-slate-400 mt-7">
            By continuing, you agree to our{" "}
            <span className="text-indigo-500 cursor-pointer hover:underline">Terms</span>{" "}
            and{" "}
            <span className="text-indigo-500 cursor-pointer hover:underline">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
