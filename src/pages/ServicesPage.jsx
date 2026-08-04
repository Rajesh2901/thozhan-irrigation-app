import React, { useState, useEffect } from 'react';
import { getServices } from '../utils/api';

const DEFAULT_PRODUCTS = [
  {
    id: 1,
    title_en: 'Drip Irrigation Kit',
    title_ta: 'சொட்டு நீர் பாசனம்',
    desc: 'Premium complete agricultural setup engineered for uniform watering. Includes main pipe, sub-main, laterals, emitters, filter unit, fertilizer injector, and pressure regulators. Covers up to 5 acres per kit.',
    price_numeric: 24500,
    price_unit_text: '/ Acre',
    icon_class: 'fa-solid fa-faucet-drip',
    is_subsidy_eligible: true,
    specs: ['Dripper spacing: 30–90 cm configurable', 'Flow rate: 0.5–4 LPH', 'Operating pressure: 1.0–1.5 kg/cm²', 'Pipe warranty: 5 years', 'Emitter warranty: 3 years'],
    crops: ['Banana', 'Tomato', 'Onion', 'Cotton', 'Sugarcane'],
    savings: '60% water saving vs flood irrigation',
  },
  {
    id: 2,
    title_en: 'Sprinkler Micro Head System',
    title_ta: 'தெளிப்பு நீர் பாசனம்',
    desc: 'High-pressure overhead misting systems optimized for open ground crop layouts. Includes risers, impact sprinklers, main + sub-main lines, valve box, and control panel.',
    price_numeric: 18200,
    price_unit_text: '/ Acre',
    icon_class: 'fa-solid fa-sprinkler',
    is_subsidy_eligible: true,
    specs: ['Coverage radius: 5–12 m', 'Application rate: 6–25 mm/hr', 'Operating pressure: 2.0–4.0 kg/cm²', 'Aluminium pipe: 6m lengths', 'Impact sprinkler: 4500 LPH'],
    crops: ['Groundnut', 'Paddy', 'Wheat', 'Vegetables', 'Pulses'],
    savings: '40% water saving vs flood irrigation',
  },
  {
    id: 3,
    title_en: 'Rain Gun Irrigation System',
    title_ta: 'மழை துப்பாக்கி பாசனம்',
    desc: 'High-throw water cannon systems ideal for sugarcane, cotton, and forage grass crops. Single gun can cover 0.5–1 acre per position. Heavy-duty aluminium pipes.',
    price_numeric: 32000,
    price_unit_text: '/ Acre',
    icon_class: 'fa-solid fa-cloud-showers-water',
    is_subsidy_eligible: true,
    specs: ['Throw radius: 25–60 m', 'Flow rate: 6,000–30,000 LPH', 'Operating pressure: 2.5–6.0 kg/cm²', 'Aluminium pipe: 6m × 2" dia', 'Rotation speed: adjustable'],
    crops: ['Sugarcane', 'Cotton', 'Fodder Grass', 'Maize'],
    savings: '35% water saving vs flood irrigation',
  },
  {
    id: 4,
    title_en: 'Solar Agri Pump Integration',
    title_ta: 'சோலார் பம்ப் செட்',
    desc: 'Grid-independent solar power pumping systems with automatic start controls. Compatible with all drip and sprinkler systems. Includes solar panels, VFD controller, and monoblock pump.',
    price_numeric: 85000,
    price_unit_text: '/ Unit',
    icon_class: 'fa-solid fa-solar-panel',
    is_subsidy_eligible: true,
    specs: ['Panel capacity: 1HP–10HP available', 'Daily output: 35,000–60,000 L', 'Head range: 10–70 metres', 'No electricity cost', 'Panel warranty: 25 years'],
    crops: ['All crop types', 'Remote farms', 'Hill areas'],
    savings: '100% electricity cost elimination',
  },
];

const FILTERS = ['All Systems', 'Drip', 'Sprinkler', 'Rain Gun', 'Solar'];

export default function ServicesPage({ onNavigate }) {
  const [products, setProducts]       = useState(DEFAULT_PRODUCTS);
  const [activeFilter, setFilter]     = useState('All Systems');
  const [expanded, setExpanded]       = useState(null);
  const [loading, setLoading]         = useState(false);

  useEffect(() => {
    document.title = 'Services & Equipment — Thozhan Irrigation';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Explore Thozhan Irrigation\'s complete equipment range: drip kits, sprinkler systems, rain guns, and solar pumps — all with TN government subsidies up to 100%.');

    setLoading(true);
    getServices().then(data => {
      if (data && data.length > 0) setProducts(data);
    }).finally(() => setLoading(false));
  }, []);

  const filtered = activeFilter === 'All Systems'
    ? products
    : products.filter(p =>
        p.title_en.toLowerCase().includes(activeFilter.toLowerCase()) ||
        (p.title_ta && p.title_ta.toLowerCase().includes(activeFilter.toLowerCase()))
      );

  return (
    <div className="space-y-10">

      {/* ── PAGE HEADER ─────────────────────────── */}
      <section className="glass-dashboard-card rounded-3xl p-7 md:p-10">
        <span className="text-brand-400 text-xs font-black uppercase tracking-widest mb-2 block">Equipment Catalog / கருவிகள்</span>
        <h1 className="text-3xl font-black text-white mb-2">Irrigation Systems & Services</h1>
        <p className="text-slate-400 text-sm max-w-xl">
          Government-certified irrigation systems for every farm size. All products are eligible for Tamil Nadu Horticulture Department subsidy schemes. Free site assessment included.
        </p>
      </section>

      {/* ── FILTER BAR ──────────────────────────── */}
      <div className="flex flex-wrap gap-2">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition btn-press ${
              activeFilter === f
                ? 'bg-brand-600 text-white shadow-lg'
                : 'bg-brand-950/80 text-slate-400 border border-brand-800 hover:text-white'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* ── PRODUCT CARDS ───────────────────────── */}
      {loading ? (
        <div className="text-center py-12 text-slate-400 text-sm">
          <i className="fa-solid fa-spinner fa-spin mr-2"></i> Loading equipment catalog...
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filtered.map((p) => (
            <div key={p.id} className="glass-dashboard-card rounded-2xl overflow-hidden hover-lift">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-brand-900 to-[#041f14] p-5 flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-brand-800/80 flex items-center justify-center shrink-0">
                    <i className={`${p.icon_class} text-brand-300 text-xl`}></i>
                  </div>
                  <div>
                    <h2 className="text-white font-black text-sm leading-tight">{p.title_en}</h2>
                    <p className="text-brand-400 text-xs">{p.title_ta}</p>
                  </div>
                </div>
                <div className="text-right shrink-0 ml-3">
                  <p className="text-white font-black">₹{p.price_numeric.toLocaleString()}</p>
                  <p className="text-slate-400 text-xs">{p.price_unit_text}</p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-4">
                <p className="text-slate-300 text-xs leading-relaxed">{p.desc}</p>

                {/* Subsidy Badge */}
                {p.is_subsidy_eligible && (
                  <span className="inline-flex items-center space-x-1.5 bg-yellow-400/10 border border-yellow-400/30 text-yellow-300 text-[10px] font-black uppercase px-3 py-1 rounded-full">
                    <i className="fa-solid fa-star"></i>
                    <span>Subsidy Eligible — up to 100%</span>
                  </span>
                )}

                {/* Expandable Technical Specs */}
                {p.specs && (
                  <div>
                    <button
                      onClick={() => setExpanded(expanded === p.id ? null : p.id)}
                      className="text-brand-400 hover:text-brand-300 text-xs font-bold flex items-center space-x-1 transition"
                    >
                      <i className={`fa-solid fa-chevron-${expanded === p.id ? 'up' : 'down'} text-[10px]`}></i>
                      <span>Technical Specifications</span>
                    </button>

                    {expanded === p.id && (
                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <p className="text-slate-500 text-[10px] uppercase font-bold mb-1.5">Specs</p>
                          <ul className="space-y-1">
                            {p.specs.map((s, i) => (
                              <li key={i} className="flex items-start space-x-2 text-xs text-slate-300">
                                <i className="fa-solid fa-circle-dot text-brand-500 mt-0.5 text-[8px] shrink-0"></i>
                                <span>{s}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        {p.crops && (
                          <div>
                            <p className="text-slate-500 text-[10px] uppercase font-bold mb-1.5">Suitable Crops</p>
                            <div className="flex flex-wrap gap-1">
                              {p.crops.map((c, i) => (
                                <span key={i} className="bg-brand-900/80 border border-brand-700 text-brand-300 text-[10px] px-2 py-0.5 rounded-full">{c}</span>
                              ))}
                            </div>
                            {p.savings && (
                              <p className="text-emerald-400 text-xs font-bold mt-3">
                                <i className="fa-solid fa-droplet mr-1"></i>{p.savings}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => onNavigate && onNavigate('calculator')}
                    className="flex-1 bg-brand-700 hover:bg-brand-600 text-white text-xs font-bold py-2.5 rounded-xl transition btn-press flex items-center justify-center space-x-1.5"
                  >
                    <i className="fa-solid fa-calculator"></i>
                    <span>Calculate Subsidy</span>
                  </button>
                  <a
                    href={`https://wa.me/919489528432?text=I am interested in ${p.title_en}. Please send details.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-green-700 hover:bg-green-600 text-white text-xs font-bold py-2.5 rounded-xl transition btn-press flex items-center justify-center space-x-1.5"
                  >
                    <i className="fa-brands fa-whatsapp"></i>
                    <span>Get Quote</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
