import React from 'react';

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-emerald-950 text-white py-16 md:py-24 px-4 md:px-6">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-500/20 rounded-full filter blur-[80px] pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-yellow-500/10 rounded-full filter blur-[80px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 relative items-center">
        {/* Core Taglines */}
        <div className="lg:col-span-7 space-y-6 md:space-y-8">
          <span className="inline-flex items-center space-x-2 bg-brand-800/60 border border-brand-700 text-brand-300 text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-ping"></span>
            <span>Govt Subsidy Assistance Active</span>
          </span>
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
              பாசனத்தில் புரட்சி,<br />விவசாயிகளின் தோழன்!
            </h2>
            <h3 className="text-xl md:text-2xl font-bold text-brand-300">
              Revolutionizing Irrigation, Supporting Farmers.
            </h3>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-xl">
              தோழன் இரிகேஷன் சொட்டுநீர் மற்றும் தெளிப்புநீர் பாசன அமைப்புகளை அமைப்பதில் தமிழகத்தின் முன்னணி நிறுவனம். அரசு மானியங்களைப் பெற்றுத் தருவதில் 100% நம்பகமான வழிகாட்டி.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 pt-2">
            <a href="#calculator" className="bg-yellow-400 hover:bg-yellow-500 text-brand-950 font-black text-sm px-6 py-3.5 rounded-xl shadow-lg transition transform hover:-translate-y-0.5 flex items-center space-x-2">
              <i className="fa-solid fa-calculator"></i>
              <span>Free Subsidy Estimate</span>
            </a>
            <a href="#inventory" className="bg-brand-800/80 hover:bg-brand-800 border border-brand-600 text-white font-bold text-sm px-6 py-3.5 rounded-xl transition flex items-center space-x-2">
              <span>Explore Systems</span>
              <i class="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>
        
        {/* Floating Side Card */}
        <div className="lg:col-span-5 relative">
          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-6 md:p-8 shadow-2xl relative">
            <div className="absolute -top-6 -right-6 w-16 h-16 bg-yellow-400 text-brand-950 rounded-full flex items-center justify-center font-black text-sm rotate-12 shadow-lg z-10 border-2 border-white">
              100%<br />Subsidy
            </div>
            <h4 className="text-lg font-bold mb-4 flex items-center space-x-2 text-yellow-300">
              <i className="fa-solid fa-bookmark"></i>
              <span>Subsidy Tiers</span>
            </h4>
            <div className="space-y-4 text-xs font-semibold">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
                <div>
                  <div className="text-white text-sm">Under 5 Acres (சிறு விவசாயி)</div>
                  <div className="text-slate-400 mt-0.5">Small / Marginal Farmers</div>
                </div>
                <span className="bg-brand-600 text-white px-2.5 py-1 rounded-full text-[10px] uppercase font-black tracking-wide">100% Grant</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
                <div>
                  <div className="text-white text-sm">5 to 12 Acres (இதர விவசாயி)</div>
                  <div className="text-slate-400 mt-0.5">Other Farmers</div>
                </div>
                <span class="bg-blue-600 text-white px-2.5 py-1 rounded-full text-[10px] uppercase font-black tracking-wide">75% Grant</span>
              </div>
            </div>
            <div className="mt-6 pt-5 border-t border-white/10 flex justify-between items-center text-xs text-slate-300">
              <span><i className="fa-solid fa-check text-yellow-400 mr-1.5"></i>TADA Approved</span>
              <span><i className="fa-solid fa-check text-yellow-400 mr-1.5"></i>Full Paperwork Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
