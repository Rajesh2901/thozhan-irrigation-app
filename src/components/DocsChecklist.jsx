import React from 'react';

export default function DocsChecklist() {
  const docs = [
    { id: 1, name: "Patta / Chitta (பட்டா/சிட்டா)" },
    { id: 2, name: "FMB Map Sketch (வரைபடம்)" },
    { id: 3, name: "Adangal Document (அடங்கள்)" },
    { id: 4, name: "Aadhaar Card Copy (ஆதார் நகல்)" },
    { id: 5, name: "Ration Card Copy (குடும்ப அட்டை நகல்)" },
    { id: 6, name: "Bank Passbook Copy (வங்கி கணக்கு நகல்)" },
    { id: 7, name: "Passport Photos x2 (புகைப்படம்)" },
    { id: 8, name: "Farmer Certificate (சிறு/குறு விவசாயி சான்றிதழ்)" }
  ];

  return (
    <section id="docs" className="space-y-8">
      <div className="glass-dashboard-card rounded-3xl p-6 md:p-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Info Text */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-black text-yellow-400 uppercase tracking-widest">Compliance</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">Subsidy Document Requirements</h2>
            <p className="text-xs text-brand-300 font-semibold leading-relaxed">
              Government grants require precise land records. We guide and compile application paperwork packages to ensure approval speeds are optimized.
            </p>
            
            <div className="bg-brand-950/80 border border-brand-800 p-4 rounded-2xl space-y-2 shadow-md">
              <h4 className="font-bold text-yellow-300 text-xs flex items-center">
                <i className="fa-solid fa-map-location-dot text-emerald-400 mr-2"></i>Dindigul Regional Office
              </h4>
              <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                Bring records directly to our office (21-A, Vijaya Nagar, Seelapadi, Dindigul) or share digital copies securely through WhatsApp for pre-evaluations.
              </p>
            </div>
          </div>

          {/* Grid Checklist */}
          <div className="lg:col-span-7 bg-brand-950/80 p-6 rounded-2xl border border-brand-800 shadow-lg space-y-4">
            <h3 className="font-bold text-white text-sm flex items-center space-x-2 border-b border-brand-900 pb-3">
              <i className="fa-solid fa-clipboard-list text-emerald-400 text-base"></i>
              <span>Documentation Checklist / தேவையான ஆவணங்கள்:</span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold text-slate-200">
              {docs.map((doc) => (
                <div key={doc.id} className="p-3 bg-brand-900/60 rounded-xl border border-brand-800 flex items-center space-x-3 hover:border-brand-500 transition hover-lift">
                  <span className="w-6 h-6 bg-yellow-400 text-brand-950 text-[10px] font-black rounded-full flex items-center justify-center shrink-0">
                    {doc.id}
                  </span>
                  <span>{doc.name}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
