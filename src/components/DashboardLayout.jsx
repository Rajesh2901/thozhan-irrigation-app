import React, { useState } from 'react';

export default function DashboardLayout({ children, isAdmin, triggerAdmin, exitAdmin }) {
  const [activeTab, setActiveTab] = useState('Home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { name: 'Home', icon: 'fa-solid fa-house' },
    { name: 'Fields', icon: 'fa-solid fa-border-all' },
    { name: 'Pump', icon: 'fa-solid fa-faucet-drip' },
    { name: 'Maps', icon: 'fa-solid fa-map-location-dot' },
    { name: 'Records', icon: 'fa-solid fa-file-lines' },
    { name: 'Support', icon: 'fa-solid fa-circle-question' }
  ];

  return (
    <div className="min-h-screen bg-[#041f14] text-slate-100 flex flex-col lg:flex-row antialiased selection:bg-brand-500 selection:text-white">
      
      {/* 1. LEFT NAVIGATION SIDEBAR (IMAGE 1 MATCH) */}
      <aside className={`w-full lg:w-64 bg-[#03170e] border-r border-brand-900/60 p-5 flex flex-col justify-between shrink-0 transition-all duration-300 z-40 ${sidebarOpen ? 'block' : 'hidden lg:flex'}`}>
        <div className="space-y-8">
          {/* Logo & Brand Header */}
          <a href="#" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-800 flex items-center justify-center text-white text-xl shadow-lg border border-brand-400/30 group-hover:scale-105 transition">
              <i className="fa-solid fa-seedling text-yellow-300"></i>
            </div>
            <div>
              <h1 className="text-base font-black text-white leading-none tracking-tight">Thozhan Irrigation</h1>
              <p className="text-[10px] text-brand-300 font-extrabold tracking-wider uppercase mt-0.5">தோழன் நீர்ப்பாசனம்</p>
            </div>
          </a>

          {/* Navigation Links */}
          <nav className="space-y-1.5" role="navigation" aria-label="Sidebar Navigation">
            {navItems.map((item) => {
              const isActive = activeTab === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => { setActiveTab(item.name); setSidebarOpen(false); }}
                  className={`w-full flex items-center space-x-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition btn-press ${
                    isActive 
                      ? 'bg-gradient-to-r from-brand-700 to-brand-800 text-white shadow-md border border-brand-500/40' 
                      : 'text-slate-400 hover:text-white hover:bg-brand-900/40'
                  }`}
                >
                  <i className={`${item.icon} text-base ${isActive ? 'text-yellow-300' : 'text-slate-400'}`}></i>
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Controls */}
        <div className="pt-6 border-t border-brand-900/60 space-y-3">
          <button 
            onClick={() => setActiveTab('Settings')}
            className="w-full flex items-center space-x-3.5 px-4 py-3 rounded-xl text-sm font-semibold text-slate-400 hover:text-white hover:bg-brand-900/40 transition btn-press"
          >
            <i className="fa-solid fa-gear text-base"></i>
            <span>Settings</span>
          </button>

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
              className="w-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center space-x-2 justify-center"
            >
              <i className="fa-solid fa-user-shield text-amber-400"></i>
              <span>Admin Portal</span>
            </button>
          )}
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA (IMAGE 1 MATCH) */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Bar */}
        <header className="bg-[#03170e]/90 backdrop-blur-md border-b border-brand-900/60 px-4 md:px-8 py-4 flex justify-between items-center z-30">
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-xl bg-brand-900/60 text-slate-300 hover:text-white"
              aria-label="Toggle navigation drawer"
            >
              <i className="fa-solid fa-bars text-lg"></i>
            </button>
            
            <div>
              <h2 className="text-base md:text-xl font-extrabold text-white tracking-tight">Smart Farm Dashboard</h2>
              <p className="text-[11px] text-brand-300 font-semibold">விவசாயக் கட்டுப்பாட்டு மையம்</p>
            </div>
          </div>

          {/* Search Bar & Notifications */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block w-64">
              <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
              <input 
                type="text" 
                placeholder="Search fields, pumps, records..." 
                className="w-full bg-brand-950/80 border border-brand-800/80 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-brand-500 font-medium transition"
              />
            </div>

            <div className="flex items-center space-x-3">
              <button aria-label="Messages" className="w-9 h-9 rounded-xl bg-brand-950/80 border border-brand-800 flex items-center justify-center text-slate-300 hover:text-white transition">
                <i className="fa-regular fa-comment-dots text-sm"></i>
              </button>
              
              <button aria-label="Notifications" className="w-9 h-9 rounded-xl bg-brand-950/80 border border-brand-800 flex items-center justify-center text-slate-300 hover:text-white relative transition">
                <i className="fa-regular fa-bell text-sm"></i>
                <span className="w-2 h-2 rounded-full bg-red-500 absolute top-2 right-2 animate-ping"></span>
                <span className="w-2 h-2 rounded-full bg-red-500 absolute top-2 right-2"></span>
              </button>

              <div className="flex items-center space-x-2 pl-2 border-l border-brand-900">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-white font-bold text-xs shadow-sm border border-brand-300/40">
                  <i className="fa-solid fa-user-tie"></i>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Viewport Children */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto space-y-8">
          {children}
        </main>
      </div>

    </div>
  );
}
