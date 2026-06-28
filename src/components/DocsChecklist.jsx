import React from 'react';

export default function DocsChecklist() {
  return (
    <section id="about" className="py-16 md:py-24 px-4 md:px-6 bg-slate-50 border-t border-b">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Info Text */}
        <div className="lg:col-span-5 space-y-6">
          <span className="text-xs font-black text-brand-700 uppercase tracking-widest">Compliance</span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 leading-tight">Subsidy Document Requirements</h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            Government grants require precise land records. We guide and compile the application paperwork packages to ensure approval speeds are optimized.
          </p>
          
          <div className="bg-white border p-5 rounded-2xl space-y-2.5 shadow-sm">
            <h4 class="font-bold text-slate-800 text-sm flex items-center"><i class="fa-solid fa-map-location-dot text-brand-600 mr-2"></i>Dindigul Regional Office</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Bring records directly to our office or share digital copies securely through WhatsApp for pre-evaluations.
            </p>
          </div>
        </div>

        {/* Grid Checklist */}
        <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="font-bold text-slate-800 text-base flex items-center space-x-2 border-b pb-4">
            <i className="fa-solid fa-clipboard-list text-brand-600 text-lg"></i>
            <span>Documentation Checklist / தேவையான ஆவணங்கள்:</span>
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs font-semibold text-slate-700">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center space-x-3 hover:border-brand-200 transition">
              <span className="w-6 h-6 bg-brand-100 text-brand-800 text-[10px] font-black rounded-full flex items-center justify-center shrink-0">1</span>
              <span>Patta / Chitta (பட்டா/சிட்டா)</span>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center space-x-3 hover:border-brand-200 transition">
              <span className="w-6 h-6 bg-brand-100 text-brand-800 text-[10px] font-black rounded-full flex items-center justify-center shrink-0">2</span>
              <span>FMB Map Sketch (வரைபடம்)</span>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center space-x-3 hover:border-brand-200 transition">
              <span className="w-6 h-6 bg-brand-100 text-brand-800 text-[10px] font-black rounded-full flex items-center justify-center shrink-0">3</span>
              <span>Adangal Document (அடங்கள்)</span>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center space-x-3 hover:border-brand-200 transition">
              <span className="w-6 h-6 bg-brand-100 text-brand-800 text-[10px] font-black rounded-full flex items-center justify-center shrink-0">4</span>
              <span>Aadhaar Card Copy (ஆதார் நகல்)</span>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center space-x-3 hover:border-brand-200 transition">
              <span className="w-6 h-6 bg-brand-100 text-brand-800 text-[10px] font-black rounded-full flex items-center justify-center shrink-0">5</span>
              <span>Ration Card Copy (குடும்ப அட்டை நகல்)</span>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center space-x-3 hover:border-brand-200 transition">
              <span className="w-6 h-6 bg-brand-100 text-brand-800 text-[10px] font-black rounded-full flex items-center justify-center shrink-0">6</span>
              <span>Bank Passbook Copy (வங்கி கணக்கு நகல்)</span>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center space-x-3 hover:border-brand-200 transition">
              <span className="w-6 h-6 bg-brand-100 text-brand-800 text-[10px] font-black rounded-full flex items-center justify-center shrink-0">7</span>
              <span>Passport Photos x2 (புகைப்படம்)</span>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center space-x-3 hover:border-brand-200 transition">
              <span className="w-6 h-6 bg-brand-100 text-brand-800 text-[10px] font-black rounded-full flex items-center justify-center shrink-0">8</span>
              <span>Farmer Certificate (சிறு/குறு விவசாயி சான்றிதழ்)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
