import React from 'react';

export default function Stats() {
  return (
    <section className="bg-white py-8 border-b shadow-sm relative z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 border-r last:border-0 border-slate-100 flex flex-col items-center">
            <span className="text-2xl md:text-4xl font-extrabold text-brand-800">500+</span>
            <span className="text-xs text-slate-500 font-bold uppercase mt-1">Farmers Served</span>
          </div>
          <div className="p-4 border-r last:border-0 border-slate-100 flex flex-col items-center">
            <span className="text-2xl md:text-4xl font-extrabold text-brand-800">1,500+</span>
            <span className="text-xs text-slate-500 font-bold uppercase mt-1">Acres Irrigated</span>
          </div>
          <div className="p-4 border-r last:border-0 border-slate-100 flex flex-col items-center">
            <span className="text-2xl md:text-4xl font-extrabold text-brand-800">100%</span>
            <span className="text-xs text-slate-500 font-bold uppercase mt-1">Paperwork Assist</span>
          </div>
          <div className="p-4 border-r last:border-0 border-slate-100 flex flex-col items-center">
            <span className="text-2xl md:text-4xl font-extrabold text-brand-800">24Hr</span>
            <span className="text-xs text-slate-500 font-bold uppercase mt-1">WhatsApp Quotes</span>
          </div>
        </div>
      </div>
    </section>
  );
}
