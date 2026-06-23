import React from "react";
import { Home, Upload, BarChart2, Compass, Settings, LogOut } from "lucide-react";

export default function Sidebar({ setPage, activePage, onLogout }) {
  const menu = [
    { name: "Dashboard", icon: <Home size={18} /> },
    { name: "Trips", icon: <Compass size={18} /> },
    { name: "Upload Receipt", icon: <Upload size={18} /> },
    { name: "Reports", icon: <BarChart2 size={18} /> },
    { name: "Settings", icon: <Settings size={18} /> },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-100 h-full flex flex-col py-6">
      {/* Brand Header */}
      <div className="px-6 mb-8 flex items-center gap-3">
        <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent tracking-tight">
          TripSpend
        </span>
        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-indigo-50 text-indigo-600 uppercase">
          v1.2
        </span>
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 px-3">
        <ul className="space-y-1">
          {menu.map((item) => {
            const isActive = activePage === item.name || (item.name === "Trips" && activePage === "TripDetails");
            return (
              <li key={item.name}>
                <button
                  className={`flex items-center gap-3 px-4 py-2.5 w-full text-left rounded-xl transition-all duration-200 relative group ${
                    isActive
                      ? "bg-indigo-50/70 text-indigo-600 font-semibold shadow-sm shadow-indigo-100/50" 
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                  onClick={() => setPage(item.name)}
                >
                  {/* Active Indicator Line */}
                  {isActive && (
                    <div className="absolute left-0 top-3 bottom-3 w-1 bg-indigo-600 rounded-r-full" />
                  )}
                  <span className={`transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`}>
                    {item.icon}
                  </span>
                  <span className="text-sm tracking-wide">{item.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Footer */}
      <div className="px-3 mt-auto pt-4 border-t border-slate-100">
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-2.5 w-full text-left rounded-xl text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-all duration-200 group"
        >
          <span className="text-rose-400 group-hover:text-rose-600 transition-transform duration-200 group-hover:scale-110">
            <LogOut size={18} />
          </span>
          <span className="text-sm font-medium tracking-wide">Logout</span>
        </button>
      </div>
    </aside>
  );
}
