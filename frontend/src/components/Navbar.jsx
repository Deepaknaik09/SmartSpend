import React from "react";
import { UserCircle, Compass } from "lucide-react";
import StatusIndicator from "./StatusIndicator";

export default function Navbar() {
  const storedUser = JSON.parse(localStorage.getItem('user') || '{"username": "User"}');
  const username = storedUser.username || "User";

  // Determine dynamic greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  // Get initials for profile fallback
  const getInitials = (name) => {
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <nav className="flex items-center justify-between h-16 px-8 bg-white border-b border-slate-100 text-slate-800">
      <div className="flex items-center gap-3">
        {/* Custom Premium Compass Icon in Circle */}
        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-600 text-white shadow-sm shadow-indigo-200">
          <Compass size={18} className="animate-spin-slow" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight text-slate-900 leading-none">TripSpend</h1>
          <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">Expense Co-Pilot</span>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <StatusIndicator />
        <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
          <div className="text-right">
            <p className="text-xs text-slate-400 font-medium">{getGreeting()},</p>
            <p className="text-sm font-semibold text-slate-700">{username}</p>
          </div>
          <button 
            className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-tr from-slate-100 to-slate-200 text-slate-700 font-semibold text-xs border border-slate-200 hover:border-indigo-400 hover:text-indigo-600 shadow-sm transition-all" 
            title={username}
          >
            {getInitials(username)}
          </button>
        </div>
      </div>
    </nav>
  );
}
