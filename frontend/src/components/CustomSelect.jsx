import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomSelect({ value, onChange, options, placeholder = "Select...", className = "", style = {} }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => 
    typeof opt === 'string' ? opt === value : opt.value === value
  );
  
  const displayLabel = selectedOption 
    ? (typeof selectedOption === 'string' ? selectedOption : selectedOption.label) 
    : placeholder;

  return (
    <div className={`relative ${className}`} ref={containerRef} style={style}>
      <div 
        className="flex items-center justify-between w-full h-full cursor-pointer px-3.5 py-2.5"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`text-sm truncate ${!value ? "text-slate-400" : "text-slate-700"}`}>
          {displayLabel}
        </span>
        <ChevronDown 
          size={16} 
          className={`text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} 
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 w-full mt-1 bg-white rounded-xl shadow-lg overflow-hidden border border-slate-100"
            style={{ 
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)" 
            }}
          >
            <div className="max-h-60 overflow-y-auto py-1 custom-scrollbar">
              {options.map((opt, i) => {
                const optValue = typeof opt === 'string' ? opt : opt.value;
                const optLabel = typeof opt === 'string' ? opt : opt.label;
                const isSelected = value === optValue;

                return (
                  <div
                    key={i}
                    className="flex items-center justify-between px-3.5 py-2.5 text-sm cursor-pointer transition-colors"
                    style={{ 
                      background: isSelected ? "#f8fafc" : "transparent",
                      color: isSelected ? "#4f46e5" : "#334155"
                    }}
                    onMouseEnter={e => {
                      if (!isSelected) {
                        e.currentTarget.style.background = "#f8fafc";
                        e.currentTarget.style.color = "#0f172a";
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isSelected) {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "#334155";
                      }
                    }}
                    onClick={() => {
                      onChange(optValue);
                      setIsOpen(false);
                    }}
                  >
                    <span className={isSelected ? "font-semibold" : "font-medium"}>{optLabel}</span>
                    {isSelected && <Check size={14} className="text-indigo-600" />}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
