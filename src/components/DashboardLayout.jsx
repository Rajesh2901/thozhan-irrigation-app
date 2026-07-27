import React, { useState } from 'react';

export default function DashboardLayout({ children, activeTab, setActiveTab, isAdmin, triggerAdmin, exitAdmin }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { id: 'home', name: 'Home', icon: 'fa-solid fa-house' },
    { id: 'inventory', name: 'Equipment & Fields', icon: 'fa-solid fa-border-all' },
    { id: 'calculator', name: 'Subsidy Calculator', icon: 'fa-solid fa-calculator' },
    { id: 'docs', name: 'Required Documents', icon: 'fa-solid fa-file-lines' },
    { id: 'support', name: 'FAQ & Support', icon: 'fa-solid fa-circle-question' }
  ];

  return (
    <div className="min-h-screen bg-[#041f14] text-slate-100 flex flex-col lg:flex-row antialiased selection:bg-brand-500 selection:text-white">
      
      {/* 1. LEFT NAVIGATION SIDEBAR (IMAGE & LOGO MATCH) */}
      <aside className={`w-full lg:w-64 bg-[#03170e] border-r border-brand-900/60 p-5 flex flex-col justify-between shrink-0 transition-all duration-300 z-40 ${sidebarOpen ? 'block' : 'hidden lg:flex'}`}>
        <div className="space-y-6">
          
          {/* Official Logo Brand Header */}
          <a href="#" className="flex items-center space-x-3 group pt-1">
            <div className="w-12 h-12 rounded-xl bg-white p-1 flex items-center justify-center shadow-lg border border-yellow-400/40 group-hover:scale-105 transition shrink-0">
              <img src="/logo.png" alt="Thozhan Irrigation Logo" className="max-w-full max-h-full object-contain" />
            </div>
            <div>
              <h1 className="text-sm font-black text-white leading-tight tracking-tight">Thozhan Irrigation</h1>
              <p className="text-[11px] text-yellow-300 font-bold tracking-wide">தோழன் இரிகேஷன்</p>
            </div>
          </a>

          {/* Navigation Links */}
          <nav className="space-y-1.5 pt-2" role="navigation" aria-label="Sidebar Navigation">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                  className={`w-full flex items-center space-x-3.5 px-4 py-3 rounded-xl text-xs font-extrabold transition btn-press ${
                    isActive 
                      ? 'bg-gradient-to-r from-brand-700 to-brand-800 text-white shadow-lg border border-brand-500/50' 
                      : 'text-slate-400 hover:text-white hover:bg-brand-900/40'
                  }`}
                >
                  <i className={`${item.icon} text-sm ${isActive ? 'text-yellow-300' : 'text-slate-400'}`}></i>
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Controls */}
        <div className="pt-6 border-t border-brand-900/60 space-y-3">
          <a 
            href="tel:9489528432"
            className="w-full bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 px-4 py-3 rounded-xl text-xs font-bold transition flex items-center space-x-2.5 justify-center"
          >
            <i className="fa-solid fa-phone text-yellow-300 animate-pulse"></i>
            <span>Hotline: 94895 28432</span>
          </a>

          {isAdmin ? (
            <button 
              onClick={exitAdmin} 
              className="w-full bg-red-950/80 hover:bg-red-900 border border-red-800 text-red-200 px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center space-x-2 justify-center"
            >
              <i className="fa-solid fa-right-from-bracket"></i>
              <span>Exit Admin</span>
            </button>
          ) : (
            <button 
              onClick={triggerAdmin} 
              className="w-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center space-x-2 justify-center"
            >
              <i className="fa-solid fa-user-shield text-amber-400"></i>
              <span>Admin Portal</span>
            </button>
          )}
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Bar */}
        <header className="bg-[#03170e]/95 backdrop-blur-md border-b border-brand-900/60 px-4 md:px-8 py-3.5 flex justify-between items-center z-30 sticky top-0">
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-xl bg-brand-900/60 text-slate-300 hover:text-white"
              aria-label="Toggle navigation drawer"
            >
              <i className="fa-solid fa-bars text-lg"></i>
            </button>
            
            <div className="flex items-center space-x-3">
              <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain lg:hidden bg-white p-0.5 rounded-lg" />
              <div>
                <h2 className="text-sm md:text-lg font-black text-white tracking-tight">Smart Farm Dashboard</h2>
                <p className="text-[10px] text-brand-300 font-extrabold">விவசாயக் கட்டுப்பாட்டு மையம்</p>
              </div>
            </div>
          </div>

          {/* Search Bar & User Profile */}
          <div className="flex items-center space-x-3.5">
            <div className="relative hidden md:block w-56">
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full bg-brand-950/90 border border-brand-800/80 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-brand-500 transition"
              />
            </div>

            <span className="hidden sm:inline-flex items-center space-x-1.5 bg-yellow-400/10 border border-yellow-400/30 text-yellow-300 text-[10px] font-black uppercase px-3 py-1.5 rounded-full">
              <i className="fa-solid fa-certificate"></i>
              <span>TN Govt Authorized</span>
            </span>

            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-white font-bold text-xs shadow-sm border border-brand-300/40">
              <i className="fa-solid fa-user-tie"></i>
            </div>
          </div>
        </header>

        {/* Viewport Children (Clean single scroll container) */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
          {children}
        </main>
      </div>

    </div>
  );
}
