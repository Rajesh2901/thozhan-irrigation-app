import React, { useState, useEffect } from 'react';
import { validateFarmerName, validateLandSize, sanitizeInput } from '../utils/security';

export default function Calculator({ products, whatsAppNumber, selectedProductName, setSelectedProductName, showToast }) {
  const [farmerName, setFarmerName] = useState('');
  const [district, setDistrict] = useState('Dindigul');
  const [landSize, setLandSize] = useState('');

  // Projections state variables
  const [projectCost, setProjectCost] = useState(0);
  const [subsidyAmount, setSubsidyAmount] = useState(0);
  const [farmerAmount, setFarmerAmount] = useState(0);
  const [explanationText, setExplanationText] = useState('');
  const [badgeText, setBadgeText] = useState('Configure');
  const [badgeClass, setBadgeClass] = useState('bg-brand-800 text-brand-200');

  useEffect(() => {
    calculateProjections();
  }, [landSize, selectedProductName, products]);

  const calculateProjections = () => {
    const size = parseFloat(landSize);
    if (isNaN(size) || size <= 0 || !selectedProductName) {
      setProjectCost(0);
      setSubsidyAmount(0);
      setFarmerAmount(0);
      setExplanationText('Please configure the land size and setup selection to compute exact Government program subsidies.');
      setBadgeText('Configure');
      setBadgeClass('bg-brand-800 text-brand-200');
      return;
    }

    const selectedProduct = products.find(p => p.title === selectedProductName);
    if (!selectedProduct) return;

    const unitRate = selectedProduct.priceNumeric || 0;
    const cost = Math.round(unitRate * size);
    let pct = 0;
    let descText = "";
    let badgeTxt = "";
    let bClass = "";

    if (size <= 5) {
      pct = 100;
      descText = "சிறு/குறு விவசாயி பிரிவின் கீழ் 100% அரசு மானியத்திற்கு தகுதி பெறுகிறீர்கள் (Under 5 Acres scheme). Government covers the full setup cost.";
      badgeTxt = "100% Subsidy";
      bClass = "bg-emerald-500 text-white shadow";
    } else if (size > 5 && size <= 12) {
      pct = 75;
      descText = "இதர விவசாயி பிரிவின் கீழ் 75% அரசு மானியம் வழங்கப்படுகிறது (5.1 to 12 Acres scheme). Farmer contributes 25% of the total budget.";
      badgeTxt = "75% Subsidy";
      bClass = "bg-blue-500 text-white shadow";
    } else {
      pct = 50;
      descText = "12 ஏக்கருக்கு மேல் நில அளவு உள்ளதால் அரசு மானியங்கள் மாறுபடலாம். சிறப்பு மானியம் 50% வரை வாய்ப்புள்ளது. Custom estimate required.";
      badgeTxt = "Custom Plan";
      bClass = "bg-amber-500 text-white shadow";
    }

    const subsidy = Math.round(cost * (pct / 100));
    const farmer = Math.max(0, cost - subsidy);

    setProjectCost(cost);
    setSubsidyAmount(subsidy);
    setFarmerAmount(farmer);
    setExplanationText(descText);
    setBadgeText(badgeTxt);
    setBadgeClass(bClass);
  };

  const handleWhatsAppSend = () => {
    const nameVal = validateFarmerName(farmerName);
    if (!nameVal.valid) {
      showToast(nameVal.message, "error");
      return;
    }

    const landVal = validateLandSize(landSize);
    if (!landVal.valid) {
      showToast(landVal.message, "error");
      return;
    }

    const cleanDistrict = sanitizeInput(district.trim() || 'Dindigul');
    const cleanProductName = sanitizeInput(selectedProductName);

    let subsidyPercentStr = landVal.value <= 5 ? "100%" : (landVal.value <= 12 ? "75%" : "Custom Review Required");

    const textMessage = `*Thozhan Irrigation - New Ingestion Request*\n\n` +
                        `• *Farmer Name:* ${nameVal.value}\n` +
                        `• *District:* ${cleanDistrict}\n` +
                        `• *Chosen Setup:* ${cleanProductName}\n` +
                        `• *Land Extent:* ${landVal.value} Acres\n` +
                        `• *Estimated Subsidy:* ${subsidyPercentStr}\n\n` +
                        `Kindly process our subsidy blueprint quotation and send us information.`;

    const cleanUrl = `https://wa.me/91${whatsAppNumber}?text=${encodeURIComponent(textMessage)}`;
    window.open(cleanUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="calculator" className="space-y-8">
      <div className="glass-dashboard-card rounded-3xl p-6 md:p-8 space-y-6">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-brand-900/80 pb-5 gap-4">
          <div>
            <span className="text-xs font-black text-yellow-400 uppercase tracking-widest">Online Subsidy Calculator</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">Subsidy & Projections Calculator</h2>
            <p className="text-xs text-brand-300 font-semibold mt-1">Configure parameters to calculate budget brackets instantaneously.</p>
          </div>
          <span className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold px-3.5 py-1.5 rounded-full">
            TN Horticulture Guidelines
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Inputs Section */}
          <div className="lg:col-span-6 bg-brand-950/80 border border-brand-800 rounded-2xl p-6 shadow-lg space-y-5">
            <h3 className="font-bold text-white text-base flex items-center space-x-2 border-b border-brand-900 pb-3">
              <i className="fa-solid fa-sliders text-yellow-400"></i>
              <span>Configure Parameters</span>
            </h3>
            
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="system-config-select" className="block text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">Selected System Configuration</label>
                <select 
                  id="system-config-select"
                  value={selectedProductName}
                  onChange={(e) => setSelectedProductName(e.target.value)}
                  className="w-full border border-brand-700 p-3 rounded-xl bg-brand-900 text-white focus:ring-2 focus:ring-brand-500 outline-none font-semibold text-xs transition"
                >
                  {products.map(p => (
                    <option key={p.id} value={p.title}>{p.title}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label htmlFor="farmer-name-input" className="block text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">Farmer Name / பெயர்</label>
                  <input 
                    id="farmer-name-input"
                    type="text" 
                    value={farmerName}
                    onChange={(e) => setFarmerName(e.target.value)}
                    required 
                    placeholder="Enter full name" 
                    className="w-full border border-brand-700 p-3 rounded-xl bg-brand-900 text-white placeholder-slate-500 focus:ring-2 focus:ring-brand-500 outline-none text-xs transition"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="district-input" className="block text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">District / மாவட்டம்</label>
                  <input 
                    id="district-input"
                    type="text" 
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    required 
                    className="w-full border border-brand-700 p-3 rounded-xl bg-brand-900 text-white font-semibold focus:ring-2 focus:ring-brand-500 outline-none text-xs transition"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="land-size-input" className="block text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">Total Land Extent Size (In Acres)</label>
                <div className="relative">
                  <input 
                    id="land-size-input"
                    type="number" 
                    step="0.1" 
                    min="0.1"
                    max="500"
                    value={landSize}
                    onChange={(e) => setLandSize(e.target.value)}
                    required 
                    placeholder="e.g., 4.5" 
                    className="w-full border border-brand-700 p-3 rounded-xl bg-brand-900 text-white font-bold text-sm focus:ring-2 focus:ring-brand-500 outline-none transition pr-16"
                  />
                  <span className="absolute right-4 inset-y-0 flex items-center text-xs font-extrabold text-brand-400 uppercase tracking-wider">Acres</span>
                </div>
              </div>
            </form>
          </div>

          {/* Outputs Section */}
          <div className="lg:col-span-6 bg-brand-950 text-white border border-brand-800 rounded-2xl p-6 shadow-xl flex flex-col space-y-5">
            <div className="flex justify-between items-center border-b border-brand-900 pb-3">
              <div>
                <h4 className="font-bold text-yellow-300 text-sm">Live Projections Output</h4>
                <p className="text-[10px] text-brand-300 uppercase tracking-wider font-semibold mt-0.5">Subject to documentation approvals</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${badgeClass}`}>
                {badgeText}
              </span>
            </div>

            {/* Calculations Grid */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-300 font-medium">Estimated Project Cost:</span>
                <span className="font-bold font-mono text-sm">₹{projectCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300 font-medium">Projected Govt Subsidy:</span>
                <span className="font-bold text-emerald-400 font-mono text-sm">₹{subsidyAmount.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center border-t border-brand-900 pt-3">
                <div>
                  <span className="text-white font-bold block">Farmer Contribution:</span>
                  <span className="text-[10px] text-slate-400">Out of pocket (estimated)</span>
                </div>
                <span className="font-black text-lg text-yellow-300 font-mono">
                  ₹{farmerAmount.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Alert / Explanation text box */}
            <div className="p-3.5 rounded-xl bg-brand-900/60 border border-brand-800 flex items-start space-x-2.5">
              <i className="fa-solid fa-circle-info text-yellow-400 mt-0.5 text-xs shrink-0"></i>
              <p className="text-xs text-slate-200 leading-relaxed font-medium">
                {explanationText}
              </p>
            </div>

            {/* Send Quote to WhatsApp CTA */}
            <button 
              type="button" 
              onClick={handleWhatsAppSend} 
              className="w-full bg-[#25D366] hover:bg-[#20ba56] text-white p-3.5 rounded-xl font-extrabold text-xs transition flex items-center justify-center space-x-2 shadow-md btn-press outline-none"
            >
              <i className="fa-brands fa-whatsapp text-lg"></i>
              <span>Submit Specs to WhatsApp Manager</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
