import React, { useState } from 'react';

export default function Header({ isAdmin, triggerAdmin, exitAdmin }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <header className="glass-panel sticky top-0 z-50 shadow-sm border-b border-slate-200/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center h-20">
        {/* Branding Logo */}
        <a href="#" className="flex items-center space-x-3.5 group">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-700 to-brand-950 flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-105 transition border border-brand-500/30">
              <i className="fa-solid fa-seedling text-yellow-300"></i>
            </div>
            <span className="absolute -bottom-1 -right-1 bg-yellow-400 text-brand-950 text-[9px] px-1 rounded font-black shadow-sm">TN</span>
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-black text-brand-950 tracking-tight leading-none">தோழன் இரிகேஷன்</h1>
            <p className="text-[10px] text-brand-700 font-extrabold tracking-widest uppercase mt-0.5">Thozhan Irrigation</p>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8 text-xs font-bold uppercase tracking-wider text-slate-700">
          <a href="#hero" className="hover:text-brand-700 transition">Home</a>
          <a href="#inventory" className="hover:text-brand-700 transition">Systems Portfolio</a>
          <a href="#calculator" className="hover:text-brand-700 transition">Subsidy Estimator</a>
          <a href="#about" className="hover:text-brand-700 transition">Required Documents</a>
          <a href="#faqs" className="hover:text-brand-700 transition">FAQs</a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <a 
            href="tel:9489528432" 
            className="flex items-center space-x-2 bg-brand-50 hover:bg-brand-100 border border-brand-200 hover:border-brand-300 px-4 py-2.5 rounded-xl text-brand-800 font-extrabold transition shadow-sm text-xs"
          >
            <i className="fa-solid fa-phone text-sm text-brand-600 animate-bounce"></i>
            <span className="tracking-wide">94895 28432</span>
          </a>

          {isAdmin ? (
            <button 
              onClick={exitAdmin}
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-3.5 py-2.5 rounded-xl transition shadow-sm"
              title="Exit Admin Edit Mode"
            >
              <i className="fa-solid fa-right-from-bracket"></i>
            </button>
          ) : (
            <button 
              onClick={triggerAdmin}
              className="bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 font-bold text-xs px-3.5 py-2.5 rounded-xl transition"
              title="Admin Portal"
            >
              <i className="fa-solid fa-user-shield text-amber-600"></i>
            </button>
          )}

          {/* Mobile hamburger menu toggle */}
          <button 
            onClick={toggleMenu} 
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 transition border border-slate-200"
          >
            <i className={`fa-solid ${mobileOpen ? 'fa-xmark' : 'fa-bars'} text-lg`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t bg-white px-6 py-5 flex flex-col space-y-4 shadow-xl animate-in fade-in slide-in-from-top-4 duration-200">
          <a href="#hero" onClick={toggleMenu} className="text-slate-800 font-bold hover:text-brand-700 py-1 border-b border-slate-100">Home</a>
          <a href="#inventory" onClick={toggleMenu} className="text-slate-800 font-bold hover:text-brand-700 py-1 border-b border-slate-100">Systems Portfolio</a>
          <a href="#calculator" onClick={toggleMenu} className="text-slate-800 font-bold hover:text-brand-700 py-1 border-b border-slate-100">Subsidy Estimator</a>
          <a href="#about" onClick={toggleMenu} className="text-slate-800 font-bold hover:text-brand-700 py-1 border-b border-slate-100">Required Documents</a>
          <a href="#faqs" onClick={toggleMenu} className="text-slate-800 font-bold hover:text-brand-700 py-1">FAQs</a>
          {isAdmin ? (
            <button onClick={() => { exitAdmin(); toggleMenu(); }} className="text-left text-red-600 font-extrabold py-2 flex items-center">
              <i className="fa-solid fa-right-from-bracket mr-2"></i> Exit Admin Mode
            </button>
          ) : (
            <button onClick={() => { triggerAdmin(); toggleMenu(); }} className="text-left text-yellow-700 font-extrabold py-2 flex items-center">
              <i className="fa-solid fa-user-shield mr-2"></i> Admin Portal Login
            </button>
          )}
        </div>
      )}
    </header>
  );
}
