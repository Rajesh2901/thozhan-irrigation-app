import React, { useEffect } from 'react';

const TEAM = [
  {
    name: 'ஜெயசந்திரன் (Jayachandran)',
    role: 'Founder & Proprietor',
    desc: 'Over 12 years of experience in agricultural irrigation, government scheme processing, and field installation.',
    icon: 'fa-solid fa-user-tie',
    color: 'from-brand-700 to-brand-900',
  },
  {
    name: 'Field Installation Team',
    role: 'Certified Technicians',
    desc: 'District-level certified engineers trained in drip, sprinkler, and solar pump installations.',
    icon: 'fa-solid fa-hard-hat',
    color: 'from-amber-700 to-amber-900',
  },
  {
    name: 'Subsidy Documentation Cell',
    role: 'Govt. Liaison Officers',
    desc: 'Specialized officers who handle all paperwork — Patta, Chitta, Adangal — end to end on your behalf.',
    icon: 'fa-solid fa-file-signature',
    color: 'from-sky-700 to-sky-900',
  },
];

const VALUES = [
  { icon: 'fa-solid fa-handshake', label: 'Integrity', desc: 'Transparent pricing. No hidden charges. What we quote is what you pay.' },
  { icon: 'fa-solid fa-seedling', label: 'Sustainability', desc: 'Every system we install saves 40–60% water compared to flood irrigation.' },
  { icon: 'fa-solid fa-award', label: 'Quality', desc: 'ISI-certified pipes, drippers, and controllers from Netafim & Jain partners.' },
  { icon: 'fa-solid fa-phone-volume', label: 'After-Sales', desc: '1-year free maintenance warranty and 24-hour emergency support hotline.' },
];

const CERTIFICATIONS = [
  'TN Horticulture & Plantation Crops Dept. Authorized Dealer',
  'PMKSY (Pradhan Mantri Krishi Sinchayee Yojana) Registered',
  'National Bank for Agriculture & Rural Development (NABARD) Empaneled',
  'GSTIN Registered: 33BSXPJ5723P1ZX',
  'ISO 9001:2015 Quality Management Compliant (System Design)',
];

export default function AboutPage({ onNavigate }) {
  useEffect(() => {
    document.title = 'About Us — Thozhan Irrigation, Dindigul';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Learn about Thozhan Irrigation — founded in 2012 in Dindigul, Tamil Nadu, serving 1200+ farmers across 18 districts with government-subsidized irrigation systems.');
  }, []);

  return (
    <div className="space-y-12">

      {/* ── PAGE HEADER ───────────────────────────── */}
      <section className="glass-dashboard-card rounded-3xl p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative max-w-2xl">
          <span className="text-brand-400 text-xs font-black uppercase tracking-widest mb-3 block">About Us / எங்களைப் பற்றி</span>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-4">Empowering Tamil Nadu Farmers Since 2012</h1>
          <p className="text-slate-300 text-base leading-relaxed">
            Thozhan Irrigation was born from a simple belief: <em className="text-brand-300 not-italic font-semibold">every farmer deserves access to modern water management, regardless of land size or income.</em> We help farmers navigate government subsidy schemes, handle all paperwork, and install certified systems — from start to finish.
          </p>
        </div>
      </section>

      {/* ── MISSION & VISION ──────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="glass-dashboard-card rounded-2xl p-7 border-l-4 border-brand-500">
          <div className="flex items-center space-x-3 mb-4">
            <i className="fa-solid fa-bullseye text-brand-400 text-2xl"></i>
            <h2 className="text-lg font-black text-white">Our Mission</h2>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">
            To make precision irrigation accessible to every Tamil Nadu farmer by combining modern technology, government subsidies, and field-level support — eliminating water wastage and increasing crop yields by 30–40%.
          </p>
        </div>
        <div className="glass-dashboard-card rounded-2xl p-7 border-l-4 border-yellow-500">
          <div className="flex items-center space-x-3 mb-4">
            <i className="fa-solid fa-eye text-yellow-400 text-2xl"></i>
            <h2 className="text-lg font-black text-white">Our Vision</h2>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">
            A Tamil Nadu where no farmer relies on flood irrigation. By 2030, we aim to complete 5,000 subsidized installations across all 32 districts, making drip irrigation the default standard for every crop type.
          </p>
        </div>
      </div>

      {/* ── CORE VALUES ───────────────────────────── */}
      <section>
        <h2 className="text-xl font-black text-white mb-5 flex items-center space-x-2">
          <i className="fa-solid fa-star text-yellow-400"></i>
          <span>Core Values</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {VALUES.map((v, i) => (
            <div key={i} className="glass-dashboard-card rounded-2xl p-5 hover-lift text-center space-y-2">
              <i className={`${v.icon} text-brand-400 text-2xl`}></i>
              <h3 className="text-white font-bold text-sm">{v.label}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TEAM ──────────────────────────────────── */}
      <section>
        <h2 className="text-xl font-black text-white mb-5 flex items-center space-x-2">
          <i className="fa-solid fa-people-group text-brand-400"></i>
          <span>Our Team</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TEAM.map((t, i) => (
            <div key={i} className="glass-dashboard-card rounded-2xl overflow-hidden hover-lift">
              <div className={`h-2 w-full bg-gradient-to-r ${t.color}`}></div>
              <div className="p-6 space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-brand-800 flex items-center justify-center">
                    <i className={`${t.icon} text-brand-300`}></i>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm">{t.name}</h3>
                    <p className="text-brand-400 text-xs">{t.role}</p>
                  </div>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CERTIFICATIONS ────────────────────────── */}
      <section className="glass-dashboard-card rounded-3xl p-7">
        <h2 className="text-lg font-black text-white mb-5 flex items-center space-x-2">
          <i className="fa-solid fa-certificate text-yellow-400"></i>
          <span>Certifications & Authorizations</span>
        </h2>
        <ul className="space-y-3">
          {CERTIFICATIONS.map((c, i) => (
            <li key={i} className="flex items-start space-x-3 text-sm text-slate-300">
              <i className="fa-solid fa-circle-check text-brand-400 mt-0.5 shrink-0"></i>
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── CONTACT CTA ───────────────────────────── */}
      <section className="rounded-3xl bg-gradient-to-r from-brand-800 to-[#041f14] border border-brand-700 p-8 text-center">
        <h2 className="text-xl font-black text-white mb-2">Have Questions About Our Services?</h2>
        <p className="text-slate-400 text-sm mb-5">Our team is available Monday–Saturday, 9 AM to 6 PM IST.</p>
        <button
          onClick={() => onNavigate && onNavigate('contact')}
          className="bg-brand-600 hover:bg-brand-500 text-white font-bold px-7 py-3 rounded-xl transition hover-lift inline-flex items-center space-x-2"
        >
          <i className="fa-solid fa-envelope"></i>
          <span>Contact Us</span>
        </button>
      </section>

    </div>
  );
}
