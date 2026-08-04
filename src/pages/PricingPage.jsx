import React, { useState, useEffect } from 'react';

const PLANS = [
  {
    id: 'small',
    name: 'Small Farmer Plan',
    nameTa: 'சிறு விவசாயி',
    acres: 'Up to 5 Acres',
    subsidy: 100,
    badge: '100% FREE',
    badgeColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
    isPopular: true,
    features: [
      'Full installation cost covered by Govt.',
      'Drip, sprinkler, or rain gun eligible',
      'Patta/Chitta processing by our team',
      'Free site assessment',
      '1-year free maintenance',
      'PMKSY + TN Horticulture scheme',
    ],
    cta: 'Check Eligibility',
  },
  {
    id: 'other',
    name: 'Other Farmer Plan',
    nameTa: 'இதர விவசாயி',
    acres: '5.1 – 12 Acres',
    subsidy: 75,
    badge: '75% SUBSIDY',
    badgeColor: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
    isPopular: false,
    features: [
      '75% cost covered by Govt.',
      'You pay only 25% of total cost',
      'All system types eligible',
      'Patta/Chitta processing support',
      'Free site assessment',
      '6-month free maintenance',
    ],
    cta: 'Calculate Cost',
  },
  {
    id: 'large',
    name: 'Large Farm Plan',
    nameTa: 'பெரும் நில விவசாயி',
    acres: 'Above 12 Acres',
    subsidy: 50,
    badge: '50% SUBSIDY',
    badgeColor: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
    isPopular: false,
    features: [
      '50% cost covered by Govt.',
      'Phased installation available',
      'Custom design & engineering',
      'Priority site assessment',
      'Dedicated project manager',
      'Full documentation support',
    ],
    cta: 'Request Custom Quote',
  },
];

const FAQ_PRICING = [
  {
    q: 'Who qualifies for 100% subsidy?',
    a: 'Farmers with land up to 5 acres (as per Patta records) qualify under the PMKSY small farmer scheme. SC/ST farmers get additional priority.',
  },
  {
    q: 'What documents do I need?',
    a: 'Patta, Chitta, Adangal (or FMB), Aadhaar card, and a bank passbook copy. We handle all document processing on your behalf.',
  },
  {
    q: 'How long does subsidy approval take?',
    a: 'Typically 30–45 working days after document submission. We track the application for you and notify you at every stage.',
  },
  {
    q: 'Is there any upfront payment required?',
    a: 'For 100% subsidy farmers — zero upfront cost. For 75% and 50% tiers, only the farmer contribution (25% or 50%) is payable after installation.',
  },
];

export default function PricingPage({ onNavigate }) {
  const [land, setLand]           = useState(3);
  const [pricePerAcre, setPrice]  = useState(24500);
  const [selectedPlan, selectPlan] = useState(null);

  useEffect(() => {
    document.title = 'Pricing & Subsidy Plans — Thozhan Irrigation';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Understand Tamil Nadu government irrigation subsidy tiers: 100% for up to 5 acres, 75% for 5–12 acres, and 50% for large farms. Calculate your exact cost instantly.');
  }, []);

  const projectCost = Math.round(pricePerAcre * land);
  const subsidyPct  = land <= 5 ? 100 : land <= 12 ? 75 : 50;
  const subsidy     = Math.round(projectCost * subsidyPct / 100);
  const contribution = projectCost - subsidy;

  return (
    <div className="space-y-10">

      {/* ── PAGE HEADER ─────────────────────────────── */}
      <section className="glass-dashboard-card rounded-3xl p-7 md:p-10">
        <span className="text-brand-400 text-xs font-black uppercase tracking-widest mb-2 block">Pricing & Subsidy / மானியத் திட்டங்கள்</span>
        <h1 className="text-3xl font-black text-white mb-2">Government Subsidy Tiers</h1>
        <p className="text-slate-400 text-sm max-w-xl">
          The Tamil Nadu Government under PMKSY and TN Horticulture provides up to 100% installation subsidy for drip and sprinkler irrigation. Your eligibility depends on your land size (Patta records).
        </p>
      </section>

      {/* ── PLAN CARDS ──────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {PLANS.map(plan => (
          <div
            key={plan.id}
            onClick={() => selectPlan(plan.id === selectedPlan ? null : plan.id)}
            className={`glass-dashboard-card rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover-lift ${
              plan.isPopular ? 'ring-2 ring-brand-500' : ''
            } ${selectedPlan === plan.id ? 'ring-2 ring-yellow-400' : ''}`}
          >
            {plan.isPopular && (
              <div className="bg-brand-600 text-white text-[10px] font-black text-center py-1.5 uppercase tracking-widest">
                ★ Most Popular — Small Farmer Scheme
              </div>
            )}
            <div className="p-6 space-y-4">
              <div>
                <h2 className="text-white font-black text-lg">{plan.name}</h2>
                <p className="text-slate-400 text-xs">{plan.nameTa}</p>
                <p className="text-slate-300 text-sm mt-1">{plan.acres}</p>
              </div>

              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-black border ${plan.badgeColor}`}>
                {plan.badge}
              </span>

              <ul className="space-y-2">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start space-x-2 text-xs text-slate-300">
                    <i className="fa-solid fa-circle-check text-brand-400 mt-0.5 shrink-0"></i>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={e => { e.stopPropagation(); onNavigate && onNavigate('calculator'); }}
                className="w-full bg-brand-700 hover:bg-brand-600 text-white font-bold py-2.5 rounded-xl text-xs transition btn-press"
              >
                {plan.cta}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── LIVE COST CALCULATOR ────────────────────── */}
      <section className="glass-dashboard-card rounded-3xl p-7 md:p-10">
        <h2 className="text-xl font-black text-white mb-6 flex items-center space-x-2">
          <i className="fa-solid fa-calculator text-brand-400"></i>
          <span>Quick Cost Estimator</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="space-y-6">
            <div>
              <label className="text-slate-300 text-xs font-bold mb-2 block">
                Land Size: <span className="text-white">{land} Acres</span>
              </label>
              <input
                type="range" min={0.5} max={25} step={0.5} value={land}
                onChange={e => setLand(Number(e.target.value))}
                className="w-full accent-brand-500"
              />
              <div className="flex justify-between text-slate-500 text-[10px] mt-1">
                <span>0.5 Acre</span><span>25 Acres</span>
              </div>
            </div>

            <div>
              <label className="text-slate-300 text-xs font-bold mb-2 block">
                System Type (Price per Acre)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Drip Kit', value: 24500 },
                  { label: 'Sprinkler', value: 18200 },
                  { label: 'Rain Gun', value: 32000 },
                  { label: 'Solar Pump', value: 85000 },
                ].map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setPrice(opt.value)}
                    className={`py-2 rounded-xl text-xs font-bold transition btn-press ${
                      pricePerAcre === opt.value
                        ? 'bg-brand-600 text-white'
                        : 'bg-brand-950/80 text-slate-400 border border-brand-800 hover:text-white'
                    }`}
                  >
                    {opt.label}<br />
                    <span className="text-[10px] opacity-70">₹{opt.value.toLocaleString()}/Acre</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result */}
          <div className="bg-brand-950/80 rounded-2xl border border-brand-800 p-6 space-y-4">
            <div className={`text-center py-2 rounded-xl font-black text-sm ${
              subsidyPct === 100 ? 'bg-emerald-400/10 text-emerald-300 border border-emerald-400/30'
              : subsidyPct === 75 ? 'bg-blue-400/10 text-blue-300 border border-blue-400/30'
              : 'bg-yellow-400/10 text-yellow-300 border border-yellow-400/30'
            }`}>
              {subsidyPct}% Government Grant Applies
            </div>

            {[
              { label: 'Total Project Cost', value: `₹${projectCost.toLocaleString()}`, color: 'text-white' },
              { label: 'Government Subsidy', value: `₹${subsidy.toLocaleString()}`, color: 'text-emerald-400' },
              { label: 'Your Contribution', value: `₹${contribution.toLocaleString()}`, color: contribution === 0 ? 'text-emerald-400' : 'text-yellow-300' },
            ].map(item => (
              <div key={item.label} className="flex justify-between items-center">
                <span className="text-slate-400 text-xs">{item.label}</span>
                <span className={`font-black text-sm ${item.color}`}>{item.value}</span>
              </div>
            ))}

            <div className="border-t border-brand-800 pt-3">
              {contribution === 0 ? (
                <p className="text-emerald-400 text-xs text-center font-bold">
                  🎉 Zero out-of-pocket cost for you!
                </p>
              ) : (
                <p className="text-slate-400 text-[10px] text-center">
                  Your contribution paid after government approves installation
                </p>
              )}
            </div>

            <button
              onClick={() => onNavigate && onNavigate('calculator')}
              className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-2.5 rounded-xl text-xs transition btn-press flex items-center justify-center space-x-2"
            >
              <i className="fa-solid fa-paper-plane"></i>
              <span>Send Full Quote to WhatsApp</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── PRICING FAQ ─────────────────────────────── */}
      <section className="glass-dashboard-card rounded-3xl p-7">
        <h2 className="text-lg font-black text-white mb-5 flex items-center space-x-2">
          <i className="fa-solid fa-circle-question text-brand-400"></i>
          <span>Pricing Questions</span>
        </h2>
        <div className="space-y-4">
          {FAQ_PRICING.map((faq, i) => (
            <div key={i} className="border-b border-brand-900 pb-4 last:border-0 last:pb-0">
              <h3 className="text-white font-bold text-sm mb-1.5">{faq.q}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
