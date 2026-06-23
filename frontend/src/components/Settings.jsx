import React, { useState } from "react";
import { Camera, Save, LogOut, Shield, Bell, Globe, CheckCircle, User } from "lucide-react";

const inputCls = "w-full px-3.5 py-2.5 rounded-xl text-sm text-slate-700 placeholder-slate-400 outline-none transition-all duration-200 input-glow";
const inputStyle = { background: "#f8fafc", border: "1px solid #e2e8f0" };
const labelCls = "block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5";

export default function Settings({ user, onLogout }) {
  const [username, setUsername] = useState(user?.username || "User");
  const [email, setEmail] = useState(`${user?.username || "user"}@example.com`);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [saved, setSaved] = useState(false);
  const [currency, setCurrency] = useState("INR");
  const [notifications, setNotifications] = useState(true);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfilePhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const initials = username.slice(0, 2).toUpperCase();

  return (
    <div className="max-w-2xl mx-auto space-y-5 animate-slide-up">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Manage your profile and app preferences</p>
      </div>

      {/* Profile Card */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: "#fff", border: "1px solid #f1f5f9", boxShadow: "0 1px 8px rgba(0,0,0,0.04)" }}
      >
        {/* Cover banner */}
        <div
          className="h-24 relative"
          style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)" }}
        >
          <div
            className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full opacity-15"
            style={{ background: "radial-gradient(circle, #a5b4fc 0%, transparent 70%)" }}
          />
          <div
            className="absolute bottom-0 left-0 w-24 h-24 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #e879f9 0%, transparent 70%)" }}
          />
        </div>

        <div className="px-6 pb-6">
          {/* Avatar + name row */}
          <div className="flex items-end gap-4 -mt-10 mb-6">
            <div className="relative">
              <div
                className="w-20 h-20 rounded-2xl border-4 border-white overflow-hidden flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  boxShadow: "0 4px 16px rgba(99,102,241,0.3)",
                }}
              >
                {profilePhoto ? (
                  <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl font-bold text-white">{initials}</span>
                )}
              </div>
              <label
                className="absolute -bottom-1 -right-1 w-7 h-7 flex items-center justify-center rounded-lg cursor-pointer transition-all"
                style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 2px 8px rgba(99,102,241,0.4)" }}
                title="Change photo"
              >
                <Camera size={12} className="text-white" />
                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
              </label>
            </div>
            <div className="pb-2">
              <p className="font-bold text-slate-800 text-lg leading-tight">{username}</p>
              <p className="text-sm text-slate-400 mt-0.5">{email}</p>
              <div
                className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                style={{ background: "#f0fdf4", color: "#15803d", border: "1px solid #bbf7d0" }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Active
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3" style={{ color: "#6366f1" }}>
              <User size={14} />
              <span className="text-sm font-semibold">Profile Information</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className={inputCls}
                  style={inputStyle}
                  placeholder="Enter username"
                />
              </div>
              <div>
                <label className={labelCls}>Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className={inputCls}
                  style={inputStyle}
                  placeholder="Enter email"
                />
              </div>
            </div>

            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 active:scale-95"
              style={{
                background: saved
                  ? "linear-gradient(135deg, #10b981, #059669)"
                  : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                boxShadow: saved ? "0 4px 14px rgba(16,185,129,0.3)" : "0 4px 14px rgba(99,102,241,0.3)",
              }}
            >
              {saved ? <CheckCircle size={14} /> : <Save size={14} />}
              {saved ? "Changes Saved!" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>

      {/* Preferences Card */}
      <div
        className="rounded-2xl p-6 space-y-5"
        style={{ background: "#fff", border: "1px solid #f1f5f9", boxShadow: "0 1px 8px rgba(0,0,0,0.04)" }}
      >
        <div className="flex items-center gap-2" style={{ color: "#6366f1" }}>
          <Globe size={14} />
          <h2 className="text-sm font-semibold text-slate-700">Preferences</h2>
        </div>

        {/* Currency */}
        <div className="flex items-center justify-between py-3.5" style={{ borderBottom: "1px solid #f8fafc" }}>
          <div>
            <p className="text-sm font-medium text-slate-700">Currency</p>
            <p className="text-xs text-slate-400 mt-0.5">Preferred currency for display</p>
          </div>
          <select
            value={currency}
            onChange={e => setCurrency(e.target.value)}
            className="px-3 py-2 text-sm rounded-xl outline-none input-glow cursor-pointer"
            style={{ background: "#f8fafc", border: "1px solid #e2e8f0", color: "#475569" }}
          >
            <option value="INR">₹ INR</option>
            <option value="USD">$ USD</option>
            <option value="EUR">€ EUR</option>
            <option value="GBP">£ GBP</option>
          </select>
        </div>

        {/* Notifications toggle */}
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
              <Bell size={13} style={{ color: "#94a3b8" }} />
              Budget Notifications
            </p>
            <p className="text-xs text-slate-400 mt-0.5">Alert when 80% of budget is used</p>
          </div>
          <button
            onClick={() => setNotifications(n => !n)}
            className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none"
            style={{ background: notifications ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "#e2e8f0" }}
            role="switch"
            aria-checked={notifications}
          >
            <span
              className="inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200"
              style={{ transform: notifications ? "translateX(24px)" : "translateX(4px)" }}
            />
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div
        className="rounded-2xl p-6"
        style={{ background: "#fff", border: "1px solid #fecdd3", boxShadow: "0 1px 8px rgba(0,0,0,0.04)" }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Shield size={14} style={{ color: "#f43f5e" }} />
          <h2 className="text-sm font-semibold" style={{ color: "#f43f5e" }}>Account</h2>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-700">Sign Out</p>
            <p className="text-xs text-slate-400 mt-0.5">Log out of your TripSpend account</p>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-95"
            style={{ background: "#fef2f2", color: "#f43f5e", border: "1px solid #fecdd3" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#ffe4e6"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#fef2f2"; }}
          >
            <LogOut size={13} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
