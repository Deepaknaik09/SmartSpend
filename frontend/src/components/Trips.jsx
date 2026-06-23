import React, { useState, useEffect } from "react";
import { Plus, Calendar, Users, Trash2, MapPin, AlertTriangle, Compass, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const inputCls = "w-full px-3.5 py-2.5 rounded-xl text-sm text-slate-700 placeholder-slate-400 outline-none transition-all duration-200 input-glow";
const inputStyle = { background: "#f8fafc", border: "1px solid #e2e8f0" };
const labelCls = "block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5";

export default function Trips({ user, onSelectTrip }) {
  const [trips, setTrips] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [participantsText, setParticipantsText] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const [tripsRes, expensesRes] = await Promise.all([
        fetch(`http://localhost:5000/api/trips?username=${user.username}`),
        fetch("http://localhost:5000/api/expenses"),
      ]);
      const tripsData = await tripsRes.json();
      const expensesData = await expensesRes.json();
      if (tripsData.success) setTrips(tripsData.trips);
      if (expensesData.success) setExpenses(expensesData.expenses);
    } catch (err) {
      setError("Failed to load trips data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [user.username]);

  const handleCreateTrip = async (e) => {
    e.preventDefault();
    setError("");
    if (!destination.trim() || !budget || !startDate || !endDate) {
      setError("Please fill in all required fields.");
      return;
    }
    const participants = participantsText.split(",").map(p => p.trim()).filter(Boolean);
    try {
      const res = await fetch("http://localhost:5000/api/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ destination, budget: parseFloat(budget), startDate, endDate, participants, createdBy: user.username }),
      });
      const result = await res.json();
      if (result.success) {
        setTrips(prev => [...prev, result.trip]);
        setShowModal(false);
        setDestination(""); setBudget(""); setStartDate(""); setEndDate(""); setParticipantsText("");
      } else {
        setError(result.error || "Failed to create trip.");
      }
    } catch { setError("Server error. Failed to create trip."); }
  };

  const handleDeleteTrip = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm("Delete this trip? Linked expenses will lose trip association.")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/trips/${id}`, { method: "DELETE" });
      const result = await res.json();
      if (result.success) setTrips(prev => prev.filter(t => t.id !== id));
    } catch {}
  };

  const getTripSpent = (tripId) =>
    expenses.filter(e => e.tripId === tripId).reduce((s, e) => s + e.amount, 0);

  const statusColor = (pct) => {
    if (pct >= 100) return { bar: "#ef4444", bg: "#fef2f2", text: "#dc2626", label: "Over budget", border: "#fecaca" };
    if (pct >= 80) return { bar: "#f59e0b", bg: "#fffbeb", text: "#d97706", label: "Near limit", border: "#fde68a" };
    return { bar: "#10b981", bg: "#f0fdf4", text: "#059669", label: "On track", border: "#bbf7d0" };
  };

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2.5">
            <div
              className="flex items-center justify-center w-9 h-9 rounded-xl"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 4px 14px rgba(99,102,241,0.35)" }}
            >
              <Compass size={17} className="text-white" />
            </div>
            My Trips
          </h1>
          <p className="text-sm text-slate-500 mt-1 ml-11">Manage budgets and track expenses per trip</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all active:scale-95"
          style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 4px 14px rgba(99,102,241,0.3)" }}
        >
          <Plus size={15} />
          New Trip
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center items-center py-28">
          <div className="w-9 h-9 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : trips.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-24 rounded-2xl text-center"
          style={{ background: "#fff", border: "1px solid #f1f5f9", boxShadow: "0 1px 8px rgba(0,0,0,0.04)" }}
        >
          <div
            className="flex items-center justify-center w-16 h-16 rounded-2xl mb-5"
            style={{ background: "linear-gradient(135deg, #eef2ff, #f5f3ff)" }}
          >
            <Compass size={28} style={{ color: "#6366f1" }} />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">No trips yet</h2>
          <p className="text-slate-500 text-sm max-w-xs mb-6">
            Create a trip to set a budget, log receipts, and split costs with your travel companions.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 4px 14px rgba(99,102,241,0.3)" }}
          >
            Create Your First Trip
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {trips.map((trip) => {
              const spent = getTripSpent(trip.id);
              const pct = trip.budget > 0 ? (spent / trip.budget) * 100 : 0;
              const status = statusColor(pct);
              return (
                <motion.div
                  key={trip.id}
                  onClick={() => onSelectTrip(trip.id)}
                  className="relative rounded-2xl p-5 cursor-pointer flex flex-col gap-4 card-hover overflow-hidden group"
                  style={{ background: "#fff", border: "1px solid #f1f5f9", boxShadow: "0 1px 8px rgba(0,0,0,0.04)" }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ y: -3 }}
                >
                  {/* Top color accent */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                    style={{ background: status.bar }}
                  />

                  {/* Header row */}
                  <div className="flex items-start justify-between pt-1">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: "#eef2ff" }}
                      >
                        <MapPin size={14} style={{ color: "#6366f1" }} />
                      </div>
                      <h3 className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors leading-tight">
                        {trip.destination}
                      </h3>
                    </div>
                    <button
                      onClick={(e) => handleDeleteTrip(trip.id, e)}
                      className="p-1.5 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                      style={{ color: "#94a3b8" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "#fef2f2"; e.currentTarget.style.color = "#ef4444"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#94a3b8"; }}
                      title="Delete Trip"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs" style={{ color: "#94a3b8" }}>
                    <span className="flex items-center gap-1">
                      <Calendar size={11} />
                      {trip.startDate} → {trip.endDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={11} />
                      {trip.participants?.length || 1} traveller{(trip.participants?.length || 1) !== 1 ? "s" : ""}
                    </span>
                  </div>

                  {/* Budget bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-500">₹{spent.toLocaleString("en-IN", { maximumFractionDigits: 0 })} spent</span>
                      <span className="text-slate-700">₹{trip.budget.toLocaleString("en-IN", { maximumFractionDigits: 0 })} budget</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "#f1f5f9" }}>
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(pct, 100)}%`, background: status.bar }}
                      />
                    </div>
                    <div
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold"
                      style={{ background: status.bg, color: status.text, border: `1px solid ${status.border}` }}
                    >
                      {pct >= 80 && <AlertTriangle size={10} />}
                      {status.label} · {Math.min(Math.round(pct), 100)}%
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Create Trip Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(15,23,42,0.6)", backdropFilter: "blur(8px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}
          >
            <motion.div
              className="w-full max-w-md rounded-2xl overflow-hidden"
              style={{ background: "#fff", boxShadow: "0 24px 64px rgba(0,0,0,0.2)" }}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              {/* Modal Header */}
              <div
                className="px-6 py-5 flex items-center justify-between"
                style={{ background: "linear-gradient(135deg, #1e1b4b, #312e81)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div>
                  <h2 className="font-bold text-white text-base">Plan a New Trip</h2>
                  <p className="text-indigo-300 text-xs mt-0.5">Set your budget and dates</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex items-center justify-center w-8 h-8 rounded-xl transition-all"
                  style={{ background: "rgba(255,255,255,0.1)", color: "#a5b4fc" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
                >
                  <X size={15} />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleCreateTrip} className="p-6 space-y-4">
                {error && (
                  <div
                    className="flex items-center gap-2.5 p-3.5 rounded-xl text-sm"
                    style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626" }}
                  >
                    <AlertTriangle size={14} />
                    <span>{error}</span>
                  </div>
                )}

                <div>
                  <label className={labelCls}>Destination *</label>
                  <input
                    type="text"
                    placeholder="e.g. Goa, Paris, Tokyo"
                    value={destination}
                    onChange={e => setDestination(e.target.value)}
                    className={inputCls}
                    style={inputStyle}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Start Date *</label>
                    <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className={inputCls} style={inputStyle} required />
                  </div>
                  <div>
                    <label className={labelCls}>End Date *</label>
                    <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className={inputCls} style={inputStyle} required />
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Budget (₹) *</label>
                  <input
                    type="number"
                    placeholder="e.g. 50000"
                    min="0"
                    value={budget}
                    onChange={e => setBudget(e.target.value)}
                    className={inputCls}
                    style={inputStyle}
                    required
                  />
                </div>

                <div>
                  <label className={labelCls}>Participants (comma-separated)</label>
                  <input
                    type="text"
                    placeholder="e.g. Alice, Bob (you are auto-added)"
                    value={participantsText}
                    onChange={e => setParticipantsText(e.target.value)}
                    className={inputCls}
                    style={inputStyle}
                  />
                </div>

                <div
                  className="flex justify-end gap-3 pt-2"
                  style={{ borderTop: "1px solid #f1f5f9" }}
                >
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
                    style={{ background: "#f1f5f9", color: "#64748b" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#e2e8f0"}
                    onMouseLeave={e => e.currentTarget.style.background = "#f1f5f9"}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all active:scale-95"
                    style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 4px 14px rgba(99,102,241,0.3)" }}
                  >
                    Create Trip
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
