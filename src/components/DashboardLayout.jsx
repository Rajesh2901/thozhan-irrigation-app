import React, { useState } from 'react';

const NAV_ITEMS = [
  { id: 'home',       name: 'Home',                icon: 'fa-solid fa-house',           section: 'main' },
  { id: 'about',      name: 'About Us',             icon: 'fa-solid fa-circle-info',     section: 'main' },
  { id: 'services',   name: 'Services & Equipment', icon: 'fa-solid fa-border-all',      section: 'main' },
  { id: 'pricing',    name: 'Pricing & Subsidy',    icon: 'fa-solid fa-tags',            section: 'main' },
  { id: 'blog',       name: 'Blog & Guides',        icon: 'fa-solid fa-newspaper',       section: 'main' },
  { id: 'contact',    name: 'Contact & HQ',         icon: 'fa-solid fa-location-dot',    section: 'main' },
  { id: 'calculator', name: 'Subsidy Calculator',   icon: 'fa-solid fa-calculator',      section: 'tools' },
  { id: 'documents',  name: 'Required Documents',   icon: 'fa-solid fa-file-lines',      section: 'tools' },
  { id: 'support',    name: 'FAQ & Support',        icon: 'fa-solid fa-circle-question', section: 'tools' },
];

export default function DashboardLayout({ children, activeTab, setActiveTab, isAdmin, triggerAdmin, exitAdmin }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const mainNav  = NAV_ITEMS.filter(n => n.section === 'main');
  const toolsNav = NAV_ITEMS.filter(n => n.section === 'tools');

  const NavBtn = ({ item }) => {
    const active = activeTab === item.id;
    return (
      <button
        key={item.id}
        onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
        aria-current={active ? 'page' : undefined}
        className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition btn-press ${
          active
            ? 'bg-gradient-to-r from-brand-700 to-brand-800 text-white shadow-md border border-brand-600/40'
            : 'text-slate-400 hover:text-white hover:bg-brand-900/40'
        }`}
      >
        <i className={`${item.icon} text-sm w-4 text-center ${active ? 'text-yellow-300' : 'text-slate-500'}`}></i>
        <span>{item.name}</span>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-[#041f14] text-slate-100 flex flex-col lg:flex-row antialiased">

      {/* ── SIDEBAR ─────────────────────────────────── */}
      <aside
        className={`w-64 shrink-0 bg-[#03170e] border-r border-brand-900/60 flex flex-col justify-between z-40 transition-all duration-300 ${
          sidebarOpen ? 'fixed inset-y-0 left-0 shadow-2xl' : 'hidden lg:flex lg:sticky lg:top-0 lg:h-screen'
        }`}
      >
        {/* Sidebar scroll area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">

          {/* Official Brand Logo */}
          <button onClick={() => { setActiveTab('home'); setSidebarOpen(false); }} className="w-full pt-1 group">
            <div className="bg-white/95 rounded-2xl p-2.5 shadow-xl border border-yellow-400/30 group-hover:scale-[1.02] transition flex items-center justify-center">
              <img
                src="/logo.png"
                alt="Thozhan Irrigation — Official Logo"
                className="w-full h-auto max-h-16 object-contain"
              />
            </div>
          </button>

          {/* Main Navigation */}
          <nav aria-label="Main navigation">
            <p className="text-[9px] text-slate-600 font-black uppercase tracking-widest px-3 mb-1.5">Website</p>
            <div className="space-y-0.5">
              {mainNav.map(item => <NavBtn key={item.id} item={item} />)}
            </div>
          </nav>

          {/* Tools Section */}
          <nav aria-label="Tools navigation">
            <p className="text-[9px] text-slate-600 font-black uppercase tracking-widest px-3 mb-1.5">Tools</p>
            <div className="space-y-0.5">
              {toolsNav.map(item => <NavBtn key={item.id} item={item} />)}
            </div>
          </nav>
        </div>

        {/* Sidebar Bottom Actions */}
        <div className="p-4 border-t border-brand-900/60 space-y-2">
          <a
            href="tel:9489528432"
            className="w-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2"
          >
            <i className="fa-solid fa-phone text-yellow-300 animate-pulse"></i>
            <span>94895 28432</span>
          </a>

          {isAdmin ? (
            <button
              onClick={exitAdmin}
              className="w-full bg-red-950/80 hover:bg-red-900 border border-red-800/60 text-red-300 px-3 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2"
            >
              <i className="fa-solid fa-right-from-bracket"></i>
              <span>Exit Admin</span>
            </button>
          ) : (
            <button
              onClick={triggerAdmin}
              className="w-full bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/20 text-amber-300 px-3 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2"
            >
              <i className="fa-solid fa-user-shield"></i>
              <span>Admin Portal</span>
            </button>
          )}
        </div>
      </aside>

      {/* Sidebar backdrop (mobile) */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* ── MAIN CONTENT AREA ───────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Sticky Top Header */}
        <header className="bg-[#03170e]/95 backdrop-blur-md border-b border-brand-900/60 px-4 md:px-6 py-3 flex justify-between items-center z-20 sticky top-0">
          <div className="flex items-center space-x-3">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-xl bg-brand-900/60 text-slate-300 hover:text-white"
              aria-label="Open navigation menu"
              aria-expanded={sidebarOpen}
            >
              <i className={`fa-solid ${sidebarOpen ? 'fa-xmark' : 'fa-bars'} text-lg`}></i>
            </button>

            {/* Logo visible only on mobile header */}
            <img src="/logo.png" alt="Thozhan Irrigation" className="h-8 w-auto object-contain bg-white/90 p-1 rounded-lg lg:hidden" />

            <div className="hidden sm:block">
              <h2 className="text-sm font-black text-white leading-tight">Thozhan Irrigation — Smart Farm Portal</h2>
              <p className="text-[10px] text-brand-400 font-bold">விவசாயக் கட்டுப்பாட்டு மையம் · Dindigul, TN</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Search */}
            <div className="relative hidden md:block">
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs"></i>
              <input
                type="search"
                placeholder="Search..."
                aria-label="Search website content"
                className="w-48 bg-brand-950/80 border border-brand-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition"
              />
            </div>

            {/* Auth badge */}
            <span className="hidden sm:inline-flex items-center space-x-1 bg-yellow-400/10 border border-yellow-400/20 text-yellow-300 text-[10px] font-black uppercase px-3 py-1.5 rounded-full whitespace-nowrap">
              <i className="fa-solid fa-certificate"></i>
              <span>TN Govt Authorized</span>
            </span>

            {/* User avatar */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-800 flex items-center justify-center text-white text-xs border border-brand-500/30" aria-label="User menu">
              <i className="fa-solid fa-user-tie"></i>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main id="main-content" className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
