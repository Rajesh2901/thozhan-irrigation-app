import React, { useEffect, useState } from 'react';
import SmartFarm3DView from '../components/SmartFarm3DView';
import Stats from '../components/Stats';
import DripSystemInfographic from '../components/DripSystemInfographic';

const FEATURES = [
  { icon: 'fa-solid fa-droplet', label: 'Drip Irrigation', desc: 'Precision water delivery directly to root zones. Save up to 60% water.' },
  { icon: 'fa-solid fa-cloud-showers-water', label: 'Rain Gun Systems', desc: 'High-throw coverage for large fields. Ideal for sugarcane & cotton.' },
  { icon: 'fa-solid fa-solar-panel', label: 'Solar Integration', desc: 'Grid-free solar pump sets with auto-start controls for remote farms.' },
  { icon: 'fa-solid fa-indian-rupee-sign', label: 'Govt Subsidy Help', desc: '100% free for small farmers (<5 acres) under PMKSY scheme.' },
];

const MILESTONES = [
  { year: '2012', event: 'Founded in Dindigul, Tamil Nadu' },
  { year: '2015', event: 'First bulk drip kit order — 200 farmers in Natham block' },
  { year: '2018', event: 'Became TN Horticulture Dept authorized dealer' },
  { year: '2021', event: 'Crossed ₹5 Crore in subsidy-assisted installations' },
  { year: '2024', event: 'Solar pump integration program launched' },
  { year: '2026', event: '1200+ satisfied farmers across 18 districts' },
];

export default function HomePage({ onNavigate }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    document.title = 'Thozhan Irrigation — Smart Farming Solutions, Dindigul';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Thozhan Irrigation offers government-subsidized drip irrigation, sprinkler, rain gun, and solar pump systems across Tamil Nadu. 100% subsidy for small farmers.');
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <div className={`space-y-16 transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>

      {/* ── HERO BANNER ──────────────────────────────── */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand-900 via-[#041f14] to-[#052e16] border border-brand-800/60 p-8 md:p-14">
        {/* Background glow blobs */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-brand-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-56 h-56 bg-yellow-400/5 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative max-w-3xl">
          <span className="inline-flex items-center space-x-2 bg-yellow-400/10 border border-yellow-400/30 text-yellow-300 text-xs font-bold uppercase px-4 py-1.5 rounded-full mb-5">
            <i className="fa-solid fa-certificate animate-pulse"></i>
            <span>TN Govt Authorized Dealer · GSTIN: 33BSXPJ5723P1ZX</span>
          </span>

          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">
            Smart Irrigation for<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-brand-500">Tamil Nadu Farmers</span>
          </h1>

          <p className="text-slate-300 text-base md:text-lg font-medium leading-relaxed mb-8 max-w-xl">
            Premium drip, sprinkler & rain gun systems with <strong className="text-white">100% Government Subsidy</strong> for small farmers under the PMKSY scheme. Over 1,200 installations across 18 districts.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('calculator')}
              className="bg-brand-600 hover:bg-brand-500 text-white font-bold px-6 py-3 rounded-xl transition hover-lift flex items-center space-x-2 shadow-lg shadow-brand-900/50"
            >
              <i className="fa-solid fa-calculator"></i>
              <span>Check My Subsidy</span>
            </button>
            <button
              onClick={() => onNavigate('products')}
              className="bg-white/5 hover:bg-white/10 border border-white/20 text-white font-bold px-6 py-3 rounded-xl transition hover-lift flex items-center space-x-2"
            >
              <i className="fa-solid fa-border-all"></i>
              <span>View Equipment</span>
            </button>
            <a
              href="tel:9489528432"
              className="bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 font-bold px-6 py-3 rounded-xl transition hover-lift flex items-center space-x-2"
            >
              <i className="fa-solid fa-phone animate-pulse"></i>
              <span>94895 28432</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── 3D FARM VIEW ─────────────────────────────── */}
      <SmartFarm3DView />

      {/* ── TRUST STATS ──────────────────────────────── */}
      <Stats />

      {/* ── KEY FEATURES GRID ────────────────────────── */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-2">What We Offer</h2>
          <p className="text-slate-400 text-sm">Government-backed irrigation solutions engineered for Tamil Nadu's soil & climate</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className="glass-dashboard-card rounded-2xl p-6 hover-lift text-center space-y-3 cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-800/60 flex items-center justify-center mx-auto">
                <i className={`${f.icon} text-brand-300 text-xl`}></i>
              </div>
              <h3 className="text-white font-bold text-sm">{f.label}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── COMPANY TIMELINE ─────────────────────────── */}
      <section className="glass-dashboard-card rounded-3xl p-8">
        <h2 className="text-xl font-black text-white mb-8 flex items-center space-x-2">
          <i className="fa-solid fa-timeline text-brand-400"></i>
          <span>Our Journey</span>
        </h2>
        <div className="space-y-5">
          {MILESTONES.map((m, i) => (
            <div key={i} className="flex items-start space-x-4">
              <div className="w-16 text-right shrink-0">
                <span className="text-brand-400 font-black text-sm">{m.year}</span>
              </div>
              <div className="w-px bg-brand-700 self-stretch mx-2 shrink-0"></div>
              <p className="text-slate-300 text-sm pt-0.5">{m.event}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TECHNICAL SYSTEM DIAGRAM ─────────────────── */}
      <DripSystemInfographic />

      {/* ── CTA BANNER ───────────────────────────────── */}
      <section className="rounded-3xl bg-gradient-to-r from-brand-800 to-brand-900 border border-brand-700 p-8 md:p-10 text-center">
        <h2 className="text-2xl md:text-3xl font-black text-white mb-3">Ready to Transform Your Farm?</h2>
        <p className="text-slate-300 text-sm mb-6">Get a free on-site assessment. Jayachandran's team covers all 18 districts of Tamil Nadu.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => onNavigate('contact')}
            className="bg-white text-brand-900 font-black px-8 py-3 rounded-xl hover:bg-brand-100 transition hover-lift shadow-lg"
          >
            <i className="fa-solid fa-paper-plane mr-2"></i> Get Free Assessment
          </button>
          <a
            href="https://wa.me/919489528432"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-500 text-white font-black px-8 py-3 rounded-xl transition hover-lift shadow-lg"
          >
            <i className="fa-brands fa-whatsapp mr-2"></i> WhatsApp Us
          </a>
        </div>
      </section>

    </div>
  );
}
