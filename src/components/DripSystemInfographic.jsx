import React from 'react';

export default function DripSystemInfographic() {
  const benefits = [
    { title: "SAVES WATER", desc: "Reduces water loss by up to 60%", icon: "fa-solid fa-droplet text-cyan-400" },
    { title: "BETTER GROWTH", desc: "Delivers water and nutrients directly to the roots", icon: "fa-solid fa-seedling text-emerald-400" },
    { title: "SAVES COST", desc: "Lower water, energy and labor cost", icon: "fa-solid fa-indian-rupee-sign text-yellow-400" },
    { title: "SAVES TIME", desc: "Less manual effort and more efficiency", icon: "fa-solid fa-clock text-amber-400" },
    { title: "REDUCES WEED & SOIL LOSS", desc: "Keeps weeds away and prevents soil erosion", icon: "fa-solid fa-shield-halved text-blue-400" }
  ];

  const products = [
    { name: "Drip Pipe / Drip Tape", icon: "fa-solid fa-circle-notch" },
    { name: "Inline Dripper", icon: "fa-solid fa-circle-dot" },
    { name: "Online Dripper", icon: "fa-solid fa-bullseye" },
    { name: "Pressure Compensating Dripper", icon: "fa-solid fa-sliders" },
    { name: "Filters (Disc / Screen)", icon: "fa-solid fa-filter" },
    { name: "Fertilizer Injector (Venturi)", icon: "fa-solid fa-vial-circle-check" },
    { name: "Valves & Fittings", icon: "fa-solid fa-gears" }
  ];

  const applications = [
    { name: "Agriculture", icon: "fa-solid fa-wheat-awn text-amber-400" },
    { name: "Horticulture", icon: "fa-solid fa-tree text-emerald-400" },
    { name: "Greenhouse", icon: "fa-solid fa-house-chimney-window text-cyan-400" },
    { name: "Landscaping", icon: "fa-solid fa-leaf text-green-400" }
  ];

  return (
    <section id="system-diagram" className="space-y-10">
      
      {/* 1. SECTION HEADER (IMAGE 2 MATCH) */}
      <div className="glass-dashboard-card rounded-3xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-brand-900/80 pb-5 gap-4">
          <div>
            <span className="text-xs font-black text-yellow-400 uppercase tracking-widest">Engineering Blueprint</span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-white">Complete Drip Irrigation System</h2>
            <p className="text-xs text-brand-300 font-semibold mt-1">Smart Watering for Better Tomorrow • தமிழ் அரசு மானிய அங்கீகாரம்</p>
          </div>
          <span className="bg-emerald-500 text-white font-black text-xs px-4 py-2 rounded-xl shadow-lg uppercase tracking-wider flex items-center space-x-2">
            <i className="fa-solid fa-certificate"></i>
            <span>TADA Authorized</span>
          </span>
        </div>

        {/* Infographic Component Flow Diagrams */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
          <div className="bg-brand-950/80 border border-brand-800 p-3.5 rounded-2xl space-y-2 hover-lift">
            <div className="w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-400 mx-auto flex items-center justify-center text-lg">
              <i className="fa-solid fa-water"></i>
            </div>
            <div className="text-xs font-bold text-white">Water Source</div>
            <div className="text-[10px] text-slate-400">Well / Borewell</div>
          </div>

          <div className="bg-brand-950/80 border border-brand-800 p-3.5 rounded-2xl space-y-2 hover-lift">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center text-lg">
              <i className="fa-solid fa-charging-station"></i>
            </div>
            <div className="text-xs font-bold text-white">Monoblock Pump</div>
            <div className="text-[10px] text-slate-400">High Pressure</div>
          </div>

          <div className="bg-brand-950/80 border border-brand-800 p-3.5 rounded-2xl space-y-2 hover-lift">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 mx-auto flex items-center justify-center text-lg">
              <i className="fa-solid fa-filter"></i>
            </div>
            <div className="text-xs font-bold text-white">Filter Unit</div>
            <div className="text-[10px] text-slate-400">Disc & Screen</div>
          </div>

          <div className="bg-brand-950/80 border border-brand-800 p-3.5 rounded-2xl space-y-2 hover-lift">
            <div className="w-10 h-10 rounded-full bg-yellow-500/20 text-yellow-400 mx-auto flex items-center justify-center text-lg">
              <i className="fa-solid fa-vial-circle-check"></i>
            </div>
            <div className="text-xs font-bold text-white">Venturi Injector</div>
            <div className="text-[10px] text-slate-400">Fertigation Tank</div>
          </div>

          <div className="bg-brand-950/80 border border-brand-800 p-3.5 rounded-2xl space-y-2 hover-lift">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center text-lg">
              <i className="fa-solid fa-gauge-high"></i>
            </div>
            <div className="text-xs font-bold text-white">Pressure Regulator</div>
            <div className="text-[10px] text-slate-400">Main Line PVC</div>
          </div>

          <div className="bg-brand-950/80 border border-brand-800 p-3.5 rounded-2xl space-y-2 hover-lift">
            <div className="w-10 h-10 rounded-full bg-green-500/20 text-green-400 mx-auto flex items-center justify-center text-lg">
              <i className="fa-solid fa-grip-lines-vertical"></i>
            </div>
            <div className="text-xs font-bold text-white">Drip Tape / Line</div>
            <div className="text-[10px] text-slate-400">Emitter End Caps</div>
          </div>
        </div>
      </div>

      {/* 2. BENEFITS & APPLICATIONS GRID (IMAGE 2 MATCH) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: System Benefits List */}
        <div className="lg:col-span-8 glass-dashboard-card rounded-3xl p-6 md:p-8 space-y-6">
          <h3 className="text-xl font-black text-white flex items-center space-x-2">
            <i className="fa-solid fa-thumbs-up text-yellow-400"></i>
            <span>System Benefits / நன்மைகள்</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((b, idx) => (
              <div key={idx} className="bg-brand-950/70 border border-brand-800/80 p-4 rounded-2xl flex items-start space-x-3 hover-lift">
                <i className={`${b.icon} text-2xl mt-0.5 shrink-0`}></i>
                <div>
                  <h4 className="font-extrabold text-sm text-white">{b.title}</h4>
                  <p className="text-xs text-slate-300 mt-1">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Product Lineup */}
          <div className="pt-4 border-t border-brand-900">
            <h4 className="text-xs font-bold text-yellow-300 uppercase tracking-wider mb-3">Our Product Lineup</h4>
            <div className="flex flex-wrap gap-2">
              {products.map((p, idx) => (
                <span key={idx} className="bg-brand-900/80 border border-brand-700 text-slate-200 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-2">
                  <i className={`${p.icon} text-brand-400 text-xs`}></i>
                  <span>{p.name}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Applications Grid */}
        <div className="lg:col-span-4 glass-dashboard-card rounded-3xl p-6 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-lg font-black text-white flex items-center space-x-2">
              <i className="fa-solid fa-shapes text-emerald-400"></i>
              <span>Applications</span>
            </h3>

            <div className="space-y-3">
              {applications.map((app, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-brand-950/70 border border-brand-800 flex items-center justify-between">
                  <span className="font-bold text-sm text-white">{app.name}</span>
                  <i className={`${app.icon} text-lg`}></i>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-brand-900 border border-yellow-500/40 text-center space-y-2">
            <i className="fa-solid fa-seedling text-yellow-300 text-2xl animate-bounce"></i>
            <h4 className="font-black text-sm text-yellow-300">Precision Irrigation</h4>
            <p className="text-[11px] text-slate-200">Higher Yield • Sustainable Future</p>
          </div>
        </div>

      </div>

      {/* 3. OFFICIAL BUSINESS CREDENTIALS FOOTER (IMAGE 3 MATCH) */}
      <div className="glass-dashboard-card rounded-3xl p-6 md:p-8 space-y-6 border-t-4 border-yellow-400">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          
          {/* Column 1: Proprietor */}
          <div className="space-y-2">
            <span className="text-[10px] font-black text-yellow-400 uppercase tracking-widest block">Proprietor / உரிமையாளர்</span>
            <div className="text-base font-black text-white">ஜெயசந்திரன் (Jayachandran)</div>
            <p className="text-slate-300">Smart Watering Specialist & TN Govt Authorized Integrator</p>
          </div>

          {/* Column 2: Contact & Phone */}
          <div className="space-y-2">
            <span className="text-[10px] font-black text-yellow-400 uppercase tracking-widest block">Contact & Hotline</span>
            <a href="tel:9489528432" className="text-base font-black text-emerald-400 block hover:underline">
              <i className="fa-solid fa-phone mr-1.5"></i>94895 28432
            </a>
            <div className="text-slate-300">thozhanirrigation@gmail.com</div>
          </div>

          {/* Column 3: GSTIN & Tax Details */}
          <div className="space-y-2">
            <span className="text-[10px] font-black text-yellow-400 uppercase tracking-widest block">GST Registration</span>
            <div className="text-sm font-mono font-black text-yellow-300">GSTIN: 33BSXPJ5723P1ZX</div>
            <p className="text-slate-300">100% Tax Compliant Invoice Billing</p>
          </div>

          {/* Column 4: Dindigul Base Address */}
          <div className="space-y-2">
            <span className="text-[10px] font-black text-yellow-400 uppercase tracking-widest block">Base Address / முகவரி</span>
            <div className="text-slate-200 font-bold leading-relaxed">
              21-A, Vijaya Nagar, SSI ITI College,<br />
              Seelapadi, Dindigul - 624 004.
            </div>
          </div>

        </div>

        {/* Tagline Strip */}
        <div className="pt-4 border-t border-brand-900/80 text-center text-xs text-brand-300 font-extrabold tracking-wider">
          நீர் சேமிப்போம் | நிலம் வளப்படுத்துவோம் | எதிர்காலத்தை பாதுகாப்போம்
        </div>
      </div>

    </section>
  );
}
