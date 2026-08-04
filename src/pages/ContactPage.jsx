import React, { useState } from 'react';
import { sanitizeInput } from '../utils/security';

export default function ContactPage({ showToast }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('Dindigul');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanName = sanitizeInput(name);
    const cleanPhone = sanitizeInput(phone);
    const cleanDistrict = sanitizeInput(district);
    const cleanMsg = sanitizeInput(message);

    const whatsappText = `*Thozhan Irrigation - Inquiry*\n` +
                         `• *Name:* ${cleanName}\n` +
                         `• *Phone:* ${cleanPhone}\n` +
                         `• *District:* ${cleanDistrict}\n` +
                         `• *Note:* ${cleanMsg}`;

    window.open(`https://wa.me/919489528432?text=${encodeURIComponent(whatsappText)}`, '_blank');
    if (showToast) showToast("Opening WhatsApp Hotline to connect with Regional Manager Jayachandran.", "success");
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="glass-dashboard-card rounded-3xl p-6 md:p-8 border-b border-brand-900">
        <span className="text-xs font-black text-yellow-400 uppercase tracking-widest">Regional Office & Support</span>
        <h2 className="text-2xl md:text-4xl font-extrabold text-white mt-1">Contact Thozhan Irrigation</h2>
        <p className="text-xs md:text-sm text-brand-300 font-semibold mt-1">
          Authorized Tamil Nadu Micro-Irrigation Integrator • Dindigul Headquarters
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Office Details */}
        <div className="lg:col-span-6 glass-dashboard-card rounded-3xl p-6 md:p-8 space-y-6">
          <h3 className="text-xl font-black text-white flex items-center space-x-2 border-b border-brand-900 pb-4">
            <i className="fa-solid fa-building text-yellow-400"></i>
            <span>Headquarters & Credentials</span>
          </h3>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-brand-950/80 border border-brand-800 space-y-1">
              <span className="text-[10px] font-black text-yellow-400 uppercase tracking-wider block">Proprietor / உரிமையாளர்</span>
              <div className="text-base font-black text-white">ஜெயசந்திரன் (Jayachandran)</div>
              <p className="text-slate-300 text-[11px]">Senior Micro-Irrigation Engineer & TN Govt Authorized Consultant</p>
            </div>

            <div className="p-4 rounded-2xl bg-brand-950/80 border border-brand-800 space-y-1">
              <span className="text-[10px] font-black text-yellow-400 uppercase tracking-wider block">Direct Phone & WhatsApp Hotline</span>
              <a href="tel:9489528432" className="text-base font-black text-emerald-400 hover:underline block font-mono">
                <i className="fa-solid fa-phone mr-2"></i>+91 94895 28432
              </a>
              <div className="text-slate-300 text-[11px]">thozhanirrigation@gmail.com</div>
            </div>

            <div className="p-4 rounded-2xl bg-brand-950/80 border border-brand-800 space-y-1">
              <span className="text-[10px] font-black text-yellow-400 uppercase tracking-wider block">GSTIN Registration</span>
              <div className="text-sm font-mono font-black text-yellow-300">GSTIN: 33BSXPJ5723P1ZX</div>
              <p className="text-slate-300 text-[11px]">100% Tax Invoice & Government Subsidy Clearance</p>
            </div>

            <div className="p-4 rounded-2xl bg-brand-950/80 border border-brand-800 space-y-1">
              <span className="text-[10px] font-black text-yellow-400 uppercase tracking-wider block">Dindigul Office Address</span>
              <div className="text-white font-bold leading-relaxed">
                21-A, Vijaya Nagar, SSI ITI College,<br />
                Seelapadi, Dindigul - 624 004, Tamil Nadu.
              </div>
            </div>
          </div>
        </div>

        {/* Instant Inquiry Form */}
        <div className="lg:col-span-6 glass-dashboard-card rounded-3xl p-6 md:p-8 space-y-6">
          <h3 className="text-xl font-black text-white flex items-center space-x-2 border-b border-brand-900 pb-4">
            <i className="fa-solid fa-paper-plane text-emerald-400"></i>
            <span>Send Direct Inquiry</span>
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
            <div>
              <label className="block text-slate-300 uppercase tracking-wider mb-1.5">Your Full Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
                placeholder="Enter farmer / enterprise name" 
                className="w-full bg-brand-900 border border-brand-700 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 uppercase tracking-wider mb-1.5">Phone Number</label>
                <input 
                  type="text" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  required 
                  placeholder="e.g. 9876543210" 
                  className="w-full bg-brand-900 border border-brand-700 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 uppercase tracking-wider mb-1.5">District / மாவட்டம்</label>
                <input 
                  type="text" 
                  value={district} 
                  onChange={(e) => setDistrict(e.target.value)} 
                  required 
                  className="w-full bg-brand-900 border border-brand-700 rounded-xl p-3 text-white focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 uppercase tracking-wider mb-1.5">Inquiry Details</label>
              <textarea 
                rows="4" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                placeholder="Specify your land size, crop type, or subsidy questions..." 
                className="w-full bg-brand-900 border border-brand-700 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm p-4 rounded-xl shadow-lg transition btn-press flex items-center justify-center space-x-2"
            >
              <i className="fa-brands fa-whatsapp text-lg"></i>
              <span>Connect directly with Jayachandran on WhatsApp</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
