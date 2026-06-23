import React, { useState } from "react";
import { Bell, Search, ChevronDown } from "lucide-react";
import StatusIndicator from "./StatusIndicator";

export default function Navbar({ activePage }) {
  const storedUser = JSON.parse(localStorage.getItem("user") || '{"username":"User"}');
  const username = storedUser.username || "User";
  const initials = username.slice(0, 2).toUpperCase();

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  const [searchFocused, setSearchFocused] = useState(false);

  const pageLabels = {
    Dashboard: "Dashboard",
    Trips: "My Trips",
    TripDetails: "Trip Details",
    "Upload Receipt": "Upload Receipt",
    Reports: "Reports",
    Settings: "Settings",
  };

  return (
    <header
      className="flex items-center justify-between px-6 h-16 flex-shrink-0"
      style={{
        background: "#fff",
        borderBottom: "1px solid #f1f5f9",
        boxShadow: "0 1px 0 0 #f1f5f9",
      }}
    >
      {/* Left: breadcrumb / page title */}
      <div className="flex items-center gap-2">
        <h1 className="text-base font-semibold text-slate-800">
          {pageLabels[activePage] || activePage || "Dashboard"}
        </h1>
      </div>

      {/* Center: Search bar */}
      <div
        className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all duration-200"
        style={{
          background: searchFocused ? "#fff" : "#f8fafc",
          border: searchFocused ? "1.5px solid #6366f1" : "1.5px solid #e2e8f0",
          boxShadow: searchFocused ? "0 0 0 3px rgba(99,102,241,0.12)" : "none",
          width: searchFocused ? "260px" : "220px",
        }}
      >
        <Search size={14} style={{ color: "#94a3b8" }} />
        <input
          type="text"
          placeholder="Search expenses, trips…"
          className="bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none w-full"
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
        <kbd
          className="text-[10px] font-mono px-1.5 py-0.5 rounded hidden lg:block"
          style={{ background: "#e2e8f0", color: "#94a3b8" }}
        >
          /
        </kbd>
      </div>

      {/* Right: Status + notifications + user */}
      <div className="flex items-center gap-3">
        <StatusIndicator />

        {/* Notification bell */}
        <button
          className="relative flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 hover:bg-slate-100"
          style={{ color: "#94a3b8" }}
          title="Notifications"
        >
          <Bell size={17} />
          <span
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
            style={{ background: "#f59e0b", boxShadow: "0 0 0 2px #fff" }}
          />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-slate-100" />

        {/* User chip */}
        <button
          className="flex items-center gap-2.5 pl-1 pr-2.5 py-1 rounded-xl transition-all duration-200 hover:bg-slate-100 group"
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff" }}
          >
            {initials}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-slate-700 leading-tight">{username}</p>
            <p className="text-[10px] text-slate-400 leading-tight">{getGreeting()}</p>
          </div>
          <ChevronDown size={12} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
        </button>
      </div>
    </header>
  );
}
