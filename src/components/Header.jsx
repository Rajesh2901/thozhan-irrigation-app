import React, { useState } from 'react';

export default function Header({ isAdmin, triggerAdmin, exitAdmin }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b sticky top-0 z-50 shadow-sm transition-all duration-300">
      <div class="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center h-20">
        {/* Branding Logo */}
        <a href="#" className="flex items-center space-x-3">
          <img src="/thozhan_logo.png" className="w-12 h-12 object-contain rounded-full border border-brand-200 shadow-sm bg-white p-0.5" alt="Thozhan Irrigation Logo" />
          <div>
            <h1 className="text-xl md:text-2xl font-black text-brand-900 tracking-wide">தோழன் இரிகேஷன்</h1>
            <p className="text-[10px] text-slate-500 font-extrabold tracking-widest uppercase">Thozhan Irrigation</p>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8 text-sm font-semibold text-slate-600">
          <a href="#hero" className="hover:text-brand-700 transition">Home</a>
          <a href="#inventory" className="hover:text-brand-700 transition">Irrigation Systems</a>
          <a href="#calculator" className="hover:text-brand-700 transition">Subsidy Estimator</a>
          <a href="#about" className="hover:text-brand-700 transition">Required Documents</a>
          <a href="#faqs" className="hover:text-brand-700 transition">FAQs</a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2.5">
          <a href="tel:9489528432" className="flex items-center space-x-2 bg-brand-50 hover:bg-brand-100 border border-brand-200 hover:border-brand-300 px-4 py-2.5 rounded-full text-brand-700 font-extrabold transition shadow-sm">
            <i className="fa-solid fa-phone text-sm text-brand-600 animate-bounce"></i>
            <span className="text-sm md:text-base tracking-wide">9489528432</span>
          </a>

          {/* Mobile hamburger menu toggle */}
          <button onClick={toggleMenu} className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition">
            <i className={`fa-solid ${mobileOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t bg-white px-6 py-5 flex flex-col space-y-4 shadow-md animate-in fade-in slide-in-from-top-4 duration-200">
          <a href="#hero" onClick={toggleMenu} className="text-slate-700 font-medium hover:text-brand-700 py-1 border-b border-slate-100">Home</a>
          <a href="#inventory" onClick={toggleMenu} className="text-slate-700 font-medium hover:text-brand-700 py-1 border-b border-slate-100">Irrigation Systems</a>
          <a href="#calculator" onClick={toggleMenu} className="text-slate-700 font-medium hover:text-brand-700 py-1 border-b border-slate-100">Subsidy Estimator</a>
          <a href="#about" onClick={toggleMenu} className="text-slate-700 font-medium hover:text-brand-700 py-1 border-b border-slate-100">Required Documents</a>
          <a href="#faqs" onClick={toggleMenu} className="text-slate-700 font-medium hover:text-brand-700 py-1">FAQs</a>
          {isAdmin ? (
            <button onClick={() => { exitAdmin(); toggleMenu(); }} className="text-left text-red-600 font-bold py-1 flex items-center">
              <i class="fa-solid fa-right-from-bracket mr-2"></i> Exit Admin Mode
            </button>
          ) : (
            <button onClick={() => { triggerAdmin(); toggleMenu(); }} className="text-left text-yellow-600 font-bold py-1 flex items-center">
              <i className="fa-solid fa-user-shield mr-2"></i> Admin Portal
            </button>
          )}
        </div>
      )}
    </header>
  );
}
