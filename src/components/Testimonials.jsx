import React, { useState } from 'react';

const TESTIMONIALS = [
  { name: "Murugan K.", meta: "Dindigul | 4.2 Acres Drip System", quote: "தோழன் இரிகேஷன் மூலம் எனது சொட்டு நீர் பாசனம் அமைக்கப்பட்டு அரசு மானியம் 100% கிடைத்தது. தண்ணீரும் சேமிப்பாகிறது, மகசூலும் அதிகரித்துள்ளது. மிக்க நன்றி!" },
  { name: "Rengasamy P.", meta: "Theni | 8.5 Acres Sprinkler System", quote: "We configured a custom 8.5-acre sprinkler system with 75% subsidy support. The paperwork was entirely handled by Thozhan within 3 weeks. Highly professional installation." },
  { name: "Meenakshi S.", meta: "Madurai | 3.0 Acres Rain Gun System", quote: "மழை துப்பாக்கி பாசனம் அமைத்து கொடுத்தார்கள். குறைந்த அளவு தண்ணீரில் அதிக பரப்புக்கு பாய்ச்ச முடிகிறது. இவர்களின் சேவை அருமை." }
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((index + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setIndex((index - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[index];

  return (
    <section id="testimonials" className="py-16 md:py-24 px-4 md:px-6 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-xs font-black text-brand-700 uppercase tracking-widest">Reviews</span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900">Farmer Success Stories</h2>
          <p class="text-slate-500 text-sm">Read accounts from farms set up by Thozhan.</p>
        </div>

        {/* Carousel block */}
        <div className="relative max-w-3xl mx-auto">
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm relative min-h-[220px] flex flex-col justify-between">
            <i className="fa-solid fa-quote-left text-slate-200 text-6xl absolute top-6 left-6 pointer-events-none"></i>
            <div className="relative z-10 space-y-6">
              <p className="text-slate-600 text-sm md:text-base leading-relaxed italic font-medium">
                "{current.quote}"
              </p>
              <div className="flex items-center space-x-4 border-t pt-4">
                <div className="w-12 h-12 rounded-full bg-brand-100 text-brand-800 font-black flex items-center justify-center text-sm">
                  {current.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm md:text-base">{current.name}</h4>
                  <p className="text-xs text-brand-700 font-semibold">{current.meta}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Action arrows */}
          <div className="flex justify-center space-x-3 mt-6">
            <button onClick={handlePrev} className="w-10 h-10 rounded-full border border-slate-200 hover:border-brand-500 hover:text-brand-600 transition flex items-center justify-center bg-white">
              <i className="fa-solid fa-chevron-left text-xs"></i>
            </button>
            <button onClick={handleNext} className="w-10 h-10 rounded-full border border-slate-200 hover:border-brand-500 hover:text-brand-600 transition flex items-center justify-center bg-white">
              <i className="fa-solid fa-chevron-right text-xs"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
