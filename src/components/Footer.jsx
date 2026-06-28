import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-brand-950 text-white border-t-4 border-yellow-400">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <img src="/thozhan_logo.png" className="w-10 h-10 object-contain rounded-full bg-white border border-brand-200 shadow-sm p-0.5" alt="Thozhan Irrigation Logo" />
            <span className="text-xl font-bold tracking-wide">தோழன் இரிகேஷன்</span>
          </div>
          <p className="text-xs text-brand-200 leading-relaxed max-w-sm">
            Thozhan Irrigation delivers premium custom micro-irrigation system setups for agricultural landowners throughout Tamil Nadu, optimizing water efficiency and crop yields.
          </p>
        </div>
        <div className="space-y-4">
          <h4 className="font-bold text-yellow-300 text-sm uppercase tracking-wider">Quick Links</h4>
          <ul className="text-xs text-brand-200 space-y-2.5">
            <li><a href="#inventory" className="hover:underline">Irrigation Inventory</a></li>
            <li><a href="#calculator" className="hover:underline">Subsidy Estimation Engine</a></li>
            <li><a href="#about" className="hover:underline">Required Documents Checklist</a></li>
            <li><a href="#faqs" className="hover:underline">Platform FAQs Support</a></li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="font-bold text-yellow-300 text-sm uppercase tracking-wider">Contact Info</h4>
          <ul className="text-xs text-brand-200 space-y-2.5 font-semibold">
            <li><i className="fa-solid fa-phone text-brand-400 mr-2"></i>9489528432</li>
            <li><i className="fa-brands fa-whatsapp text-brand-400 mr-2"></i>9489528432</li>
            <li><i className="fa-solid fa-location-dot text-brand-400 mr-2"></i>Dindigul, Tamil Nadu, India</li>
          </ul>
        </div>
      </div>
      <div className="bg-brand-950 border-t border-brand-900/60 py-6 text-center text-xs text-brand-300/80">
        <p className="font-bold text-yellow-300 mb-1">நீரின்றி அமையாது உலகு - Water is life</p>
        <p>&copy; 2026 Thozhan Irrigation. All Rights Reserved. Manufactured and aligned under state guidelines.</p>
      </div>
    </footer>
  );
}
