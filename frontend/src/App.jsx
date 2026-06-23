import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import UploadCard from "./components/UploadCard";
import Reports from "./components/Reports";
import Settings from "./components/Settings";
import Trips from "./components/Trips";
import TripDetails from "./components/TripDetails";
import Login from "./components/Login";

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("Dashboard");
  const [selectedTripId, setSelectedTripId] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try { setUser(JSON.parse(storedUser)); }
      catch (e) { localStorage.removeItem("user"); }
    }
    setCheckingAuth(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setSelectedTripId(null);
    setPage("Dashboard");
  };

  if (checkingAuth) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        style={{ background: "linear-gradient(135deg, #0f172a, #1e1b4b)" }}
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #818cf8, #c084fc)", boxShadow: "0 0 32px rgba(129,140,248,0.4)" }}
          >
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-slate-400 text-sm font-medium">Loading TripSpend…</p>
        </div>
      </div>
    );
  }

  if (!user) return <Login onLogin={setUser} />;

  let content;
  if (page === "Dashboard") {
    content = <Dashboard />;
  } else if (page === "Trips") {
    content = (
      <Trips
        user={user}
        onSelectTrip={(id) => { setSelectedTripId(id); setPage("TripDetails"); }}
      />
    );
  } else if (page === "TripDetails") {
    content = (
      <TripDetails
        user={user}
        tripId={selectedTripId}
        onBack={() => setPage("Trips")}
      />
    );
  } else if (page === "Upload Receipt") {
    content = (
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800">Upload Receipt</h1>
          <p className="text-sm text-slate-500 mt-1">Scan a receipt or enter expense details manually</p>
        </div>
        <UploadCard />
      </div>
    );
  } else if (page === "Reports") {
    content = <Reports />;
  } else if (page === "Settings") {
    content = <Settings user={user} onLogout={handleLogout} />;
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#f8fafc" }}>
      <Sidebar setPage={setPage} activePage={page} onLogout={handleLogout} />
      <div className="flex flex-col flex-1 min-w-0">
        <Navbar activePage={page} />
        <main className="flex-1 overflow-auto p-6">
          <div className="page-enter">
            {content}
          </div>
        </main>
      </div>
    </div>
  );
}
