import React from 'react';

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-slate-950 text-white py-20 md:py-28 px-4 md:px-6">
      {/* Background radial & grid patterns */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-500/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-500/15 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Core Taglines & Value Proposition */}
        <div className="lg:col-span-7 space-y-6 md:space-y-8">
          <span className="inline-flex items-center space-x-2 bg-brand-800/80 border border-brand-600 text-yellow-300 text-xs font-extrabold uppercase tracking-widest px-4 py-2 rounded-full shadow-md">
            <i className="fa-solid fa-award text-yellow-400"></i>
            <span>Govt Authorized Integrator Scheme 2026</span>
          </span>

          <div className="space-y-4">
            <h2 className="text-3xl md:text-6xl font-black leading-tight tracking-tight text-white">
              பாசனத்தில் புரட்சி,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-brand-300 to-emerald-400">விவசாயிகளின் தோழன்!</span>
            </h2>
            <h3 className="text-lg md:text-2xl font-bold text-brand-200">
              Revolutionizing Micro-Irrigation, Empowering Farmers.
            </h3>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-xl font-medium">
              தோழன் இரிகேஷன் சொட்டுநீர் மற்றும் தெளிப்புநீர் பாசன அமைப்புகளை அமைப்பதில் தமிழகத்தின் முன்னணி நிறுவனம். 100% அரசு மானிய வழிகாட்டுதலுடன் முழுத் தயாரிப்புச் சான்றிதழ்.
            </p>
          </div>

          {/* Trust Metrics */}
          <div className="grid grid-cols-3 gap-4 pt-2 border-t border-brand-800/60 max-w-lg">
            <div>
              <div className="text-2xl md:text-3xl font-black text-yellow-400">100%</div>
              <div className="text-[10px] text-brand-200 uppercase font-bold tracking-wider">Small Farmer Grant</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-black text-white">5,000+</div>
              <div className="text-[10px] text-brand-200 uppercase font-bold tracking-wider">Farms Integrated</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-black text-emerald-400">₹12.5 Cr</div>
              <div className="text-[10px] text-brand-200 uppercase font-bold tracking-wider">Subsidies Sanctioned</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <a 
              href="#calculator" 
              className="bg-yellow-400 hover:bg-yellow-500 text-brand-950 font-black text-sm px-8 py-4 rounded-xl shadow-xl transition transform hover:-translate-y-1 flex items-center space-x-3"
            >
              <i className="fa-solid fa-calculator text-lg"></i>
              <span>Calculate Subsidy Scheme</span>
            </a>
            <a 
              href="#inventory" 
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm px-7 py-4 rounded-xl transition flex items-center space-x-2"
            >
              <span>Explore Portfolio</span>
              <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>

        {/* Hero Side Subsidy Tier Card */}
        <div className="lg:col-span-5 relative">
          <div className="glass-dark rounded-3xl p-8 border border-white/15 shadow-2xl relative">
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-yellow-400 text-brand-950 rounded-full flex flex-col items-center justify-center font-black text-xs rotate-12 shadow-xl z-10 border-2 border-white">
              <span>100%</span>
              <span className="text-[9px] tracking-tight">GRANT</span>
            </div>

            <div className="flex justify-between items-center border-b border-brand-800 pb-4 mb-6">
              <div>
                <h3 className="font-extrabold text-lg text-yellow-300">Govt Subsidy Brackets</h3>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">TN Horticulture Dept Guidelines</p>
              </div>
              <span className="bg-yellow-400 text-brand-950 font-black text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">Active</span>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-white text-sm">Under 5 Acres (சிறு/குறு விவசாயி)</span>
                  <span className="bg-emerald-500 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow">100% Grant</span>
                </div>
                <p className="text-xs text-slate-300">Government covers full drip setup installation budget.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-white text-sm">5 to 12 Acres (இதர விவசாயி)</span>
                  <span className="bg-blue-500 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow">75% Grant</span>
                </div>
                <p className="text-xs text-slate-300">75% State government funding + 25% farmer contribution.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-white text-sm">Above 12 Acres (வணிகப் பிரிவு)</span>
                  <span className="bg-amber-500 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow">50% Custom</span>
                </div>
                <p className="text-xs text-slate-300">Customized high-volume agri-pump & rain gun setup.</p>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-white/10 flex justify-between items-center text-xs text-slate-300 font-semibold">
              <span><i className="fa-solid fa-circle-check text-yellow-400 mr-1.5"></i>Authorized Engineering</span>
              <span><i className="fa-solid fa-circle-check text-yellow-400 mr-1.5"></i>Paperwork Support</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
