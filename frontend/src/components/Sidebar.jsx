import React, { useState } from "react";
import { Home, Upload, BarChart2, Compass, Settings, LogOut, ChevronRight, Wallet } from "lucide-react";

const menu = [
  { name: "Dashboard", icon: Home, shortcut: "D" },
  { name: "Trips", icon: Compass, shortcut: "T" },
  { name: "Upload Receipt", icon: Upload, shortcut: "U" },
  { name: "Reports", icon: BarChart2, shortcut: "R" },
  { name: "Settings", icon: Settings, shortcut: "S" },
];

export default function Sidebar({ setPage, activePage, onLogout }) {
  const [collapsed, setCollapsed] = useState(false);

  const storedUser = JSON.parse(localStorage.getItem("user") || '{"username":"User"}');
  const username = storedUser.username || "User";
  const initials = username.slice(0, 2).toUpperCase();

  return (
    <aside
      className="h-full flex flex-col transition-all duration-300 relative"
      style={{
        width: collapsed ? "72px" : "240px",
        background: "linear-gradient(180deg, #0f172a 0%, #1e1b4b 60%, #0f172a 100%)",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        flexShrink: 0,
      }}
    >
      {/* Decorative blur orb */}
      <div
        className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none opacity-20"
        style={{ background: "radial-gradient(circle, #818cf8 0%, transparent 70%)", transform: "translate(30%, -30%)" }}
      />

      {/* ── Brand ── */}
      <div
        className="flex items-center gap-3 px-4 py-5 border-b"
        style={{ borderColor: "rgba(255,255,255,0.07)" }}
      >
        <div
          className="flex items-center justify-center w-9 h-9 rounded-xl flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #818cf8, #c084fc)", boxShadow: "0 4px 16px rgba(129,140,248,0.4)" }}
        >
          <Wallet size={17} className="text-white" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <span className="block text-white font-bold text-base tracking-tight leading-tight whitespace-nowrap">
              TripSpend
            </span>
            <span className="block text-indigo-400 text-[10px] font-medium uppercase tracking-widest whitespace-nowrap">
              Expense Co-Pilot
            </span>
          </div>
        )}
        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="ml-auto flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-lg transition-all hover:bg-white/10"
          style={{ color: "#64748b" }}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronRight
            size={14}
            className="transition-transform duration-300"
            style={{ transform: collapsed ? "rotate(0deg)" : "rotate(180deg)" }}
          />
        </button>
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 py-4 px-2 overflow-y-auto">
        <ul className="space-y-0.5">
          {menu.map(({ name, icon: Icon }) => {
            const isActive = activePage === name || (name === "Trips" && activePage === "TripDetails");
            return (
              <li key={name}>
                <button
                  onClick={() => setPage(name)}
                  title={collapsed ? name : undefined}
                  className="flex items-center gap-3 w-full rounded-xl transition-all duration-200 group relative"
                  style={{
                    padding: collapsed ? "10px 0" : "9px 12px",
                    justifyContent: collapsed ? "center" : "flex-start",
                    background: isActive
                      ? "linear-gradient(135deg, rgba(99,102,241,0.22) 0%, rgba(139,92,246,0.15) 100%)"
                      : "transparent",
                    border: isActive ? "1px solid rgba(99,102,241,0.28)" : "1px solid transparent",
                  }}
                >
                  {/* Active left bar */}
                  {isActive && !collapsed && (
                    <div
                      className="absolute left-0 top-2 bottom-2 w-0.5 rounded-r-full"
                      style={{ background: "linear-gradient(180deg, #818cf8, #c084fc)" }}
                    />
                  )}

                  <Icon
                    size={17}
                    className="flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                    style={{ color: isActive ? "#a5b4fc" : "#475569" }}
                  />

                  {!collapsed && (
                    <span
                      className="text-sm font-medium whitespace-nowrap"
                      style={{ color: isActive ? "#e0e7ff" : "#64748b" }}
                    >
                      {name}
                    </span>
                  )}

                  {/* Hover tooltip when collapsed */}
                  {collapsed && (
                    <div
                      className="absolute left-full ml-3 px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-150 z-50"
                      style={{ background: "#1e293b", color: "#e2e8f0", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      {name}
                    </div>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ── User + Logout ── */}
      <div
        className="px-2 py-4 border-t space-y-1"
        style={{ borderColor: "rgba(255,255,255,0.07)" }}
      >
        {/* User chip */}
        {!collapsed && (
          <div
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff" }}
            >
              {initials}
            </div>
            <div className="overflow-hidden">
              <p className="text-white text-sm font-semibold truncate leading-tight">{username}</p>
              <p className="text-slate-500 text-[10px] truncate">Free plan</p>
            </div>
          </div>
        )}

        {/* Logout */}
        <button
          onClick={onLogout}
          title={collapsed ? "Logout" : undefined}
          className="flex items-center gap-3 w-full rounded-xl transition-all duration-200 group"
          style={{
            padding: collapsed ? "10px 0" : "9px 12px",
            justifyContent: collapsed ? "center" : "flex-start",
            color: "#64748b",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(239,68,68,0.1)";
            e.currentTarget.style.color = "#f87171";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#64748b";
          }}
        >
          <LogOut size={16} className="flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Logout</span>}

          {collapsed && (
            <div
              className="absolute left-full ml-3 px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-150 z-50"
              style={{ background: "#1e293b", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }}
            >
              Logout
            </div>
          )}
        </button>
      </div>
    </aside>
  );
}
