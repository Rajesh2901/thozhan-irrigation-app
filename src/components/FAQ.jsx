import React, { useState } from 'react';

const FAQS = [
  {
    q: "How long does the government subsidy approval take? / மானியம் கிடைக்க எவ்வளவு காலம் ஆகும்?",
    a: "Document validation and field inspection by horticulture officials typically takes 2 to 4 weeks. Once approved, setup installation begins immediately."
  },
  {
    q: "Who qualifies for the 100% subsidy scheme? / 100% மானியத்திற்கு தகுதியானவர்கள் யார்?",
    a: "Small and marginal farmers holding land records under 5 acres (2 hectares) total qualify for the 100% financial subsidy program. A Small Farmer Certificate (சிறு விவசாயி சான்றிதழ்) is required."
  },
  {
    q: "What warranties are provided on irrigation equipment? / உபகரணங்களுக்கான உத்தரவாதம் என்ன?",
    a: "All our pipes, drip lines, and micro-emitters carry an official 5-year replacement warranty, matching the rigorous BIS quality standards approved by government departments."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <section id="faqs" className="py-16 md:py-24 px-4 md:px-6 bg-slate-50 border-t">
      <div className="max-w-4xl mx-auto space-y-12">
        
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-xs font-black text-brand-700 uppercase tracking-widest">Support FAQ</span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
          <p className="text-slate-500 text-sm">Answers to common subsidy questions.</p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="bg-white border rounded-2xl overflow-hidden transition duration-300">
              <button 
                onClick={() => toggleFAQ(idx)} 
                className="w-full text-left p-5 md:p-6 font-bold text-sm md:text-base text-slate-800 hover:text-brand-700 flex justify-between items-center transition select-none outline-none"
              >
                <span>{faq.q}</span>
                <i className={`fa-solid fa-chevron-down text-slate-400 text-xs transition duration-300 ${openIndex === idx ? 'rotate-180' : ''}`}></i>
              </button>
              
              {openIndex === idx && (
                <div className="px-5 md:px-6 pb-6 text-xs md:text-sm text-slate-500 leading-relaxed border-t border-slate-50 pt-4 animate-in fade-in slide-in-from-top-1 duration-200">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
