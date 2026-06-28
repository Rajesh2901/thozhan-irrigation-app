import React, { useState, useEffect } from 'react';

export default function Calculator({ products, whatsAppNumber, selectedProductName, setSelectedProductName, showToast }) {
  const [farmerName, setFarmerName] = useState('');
  const [district, setDistrict] = useState('Dindigul');
  const [landSize, setLandSize] = useState('');

  // Projections state variables
  const [projectCost, setProjectCost] = useState(0);
  const [subsidyAmount, setSubsidyAmount] = useState(0);
  const [farmerAmount, setFarmerAmount] = useState(0);
  const [subsidyPercent, setSubsidyPercent] = useState(0);
  const [explanationText, setExplanationText] = useState('');
  const [badgeText, setBadgeText] = useState('Configure');
  const [badgeClass, setBadgeClass] = useState('bg-brand-800 text-brand-200');
  const [alertClass, setAlertClass] = useState('bg-brand-900/50 border border-brand-800');

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
      setAlertClass('bg-brand-900/50 border border-brand-800');
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
    let aClass = "";

    if (size <= 5) {
      pct = 100;
      descText = "சிறு/குறு விவசாயி பிரிவின் கீழ் 100% அரசு மானியத்திற்கு தகுதி பெறுகிறீர்கள் (Under 5 Acres scheme). Government covers the full setup cost.";
      badgeTxt = "100% Subsidy";
      bClass = "bg-brand-600 text-white shadow";
      aClass = "bg-brand-900/80 border border-brand-700 text-brand-100";
    } else if (size > 5 && size <= 12) {
      pct = 75;
      descText = "இதர விவசாயி பிரிவின் கீழ் 75% அரசு மானியம் வழங்கப்படுகிறது (5.1 to 12 Acres scheme). Farmer contributes 25% of the total budget.";
      badgeTxt = "75% Subsidy";
      bClass = "bg-blue-600 text-white shadow";
      aClass = "bg-blue-950/80 border border-blue-900 text-blue-100";
    } else {
      pct = 50;
      descText = "12 ஏக்கருக்கு மேல் நில அளவு உள்ளதால் அரசு மானியங்கள் மாறுபடலாம். சிறப்பு மானியம் 50% வரை வாய்ப்புள்ளது. Custom estimate required.";
      badgeTxt = "Custom Plan";
      bClass = "bg-amber-500 text-white shadow";
      aClass = "bg-amber-950/80 border border-amber-900 text-amber-100";
    }

    const subsidy = Math.round(cost * (pct / 100));
    const farmer = Math.max(0, cost - subsidy);

    setProjectCost(cost);
    setSubsidyAmount(subsidy);
    setFarmerAmount(farmer);
    setSubsidyPercent(pct);
    setExplanationText(descText);
    setBadgeText(badgeTxt);
    setBadgeClass(bClass);
    setAlertClass(aClass);
  };

  const handleWhatsAppSend = () => {
    if (!farmerName.trim() || !landSize || isNaN(parseFloat(landSize)) || parseFloat(landSize) <= 0) {
      showToast("விவசாயி பெயர் மற்றும் நில அளவை சரியாக உள்ளிடவும்.", "error");
      return;
    }

    let subsidyPercentStr = parseFloat(landSize) <= 5 ? "100%" : (parseFloat(landSize) <= 12 ? "75%" : "Custom Review Required");

    const textMessage = `*Thozhan Irrigation - New Ingestion Request*\n\n` +
                        `• *Farmer Name:* ${farmerName}\n` +
                        `• *District:* ${district}\n` +
                        `• *Chosen Setup:* ${selectedProductName}\n` +
                        `• *Land Extent:* ${landSize} Acres\n` +
                        `• *Estimated Subsidy:* ${subsidyPercentStr}\n\n` +
                        `Kindly process our subsidy blueprint quotation and send us information.`;

    const cleanUrl = `https://wa.me/91${whatsAppNumber}?text=${encodeURIComponent(textMessage)}`;
    window.open(cleanUrl, '_blank');
  };

  return (
    <section id="calculator" className="py-16 md:py-24 px-4 md:px-6 bg-white relative">
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,var(--color-primary-rgb),transparent_60%)] pointer-events-none"></div>
      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-xs font-black text-brand-700 uppercase tracking-widest">Online Tool</span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900">Subsidy & Projections Calculator</h2>
          <p className="text-slate-500 text-sm">Configure parameters to calculate budget brackets instantaneously.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Inputs Section */}
          <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
            <h3 className="font-bold text-slate-800 text-lg mb-6 flex items-center space-x-2">
              <i className="fa-solid fa-sliders text-brand-600"></i>
              <span>Configure Parameters</span>
            </h3>
            
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Selected System Configuration</label>
                <select 
                  value={selectedProductName}
                  onChange={(e) => setSelectedProductName(e.target.value)}
                  className="w-full border border-slate-200 p-3.5 rounded-xl bg-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none font-semibold text-sm transition"
                >
                  {products.map(p => (
                    <option key={p.id} value={p.title}>{p.title}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Farmer Name / விவசாயி பெயர்</label>
                  <input 
                    type="text" 
                    value={farmerName}
                    onChange={(e) => setFarmerName(e.target.value)}
                    required 
                    placeholder="Enter full name" 
                    className="w-full border border-slate-200 p-3.5 rounded-xl bg-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none text-sm transition"
                  />
                </div>
                <div className="form-group">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">District / மாவட்டம்</label>
                  <input 
                    type="text" 
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    required 
                    className="w-full border border-slate-200 p-3.5 rounded-xl bg-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none text-sm font-semibold transition"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Total Land Extent Size (In Acres)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    step="0.1" 
                    value={landSize}
                    onChange={(e) => setLandSize(e.target.value)}
                    required 
                    placeholder="e.g., 4.5" 
                    className="w-full border border-slate-200 p-3.5 rounded-xl bg-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none font-bold text-base transition pr-16"
                  />
                  <span className="absolute right-4 inset-y-0 flex items-center text-xs font-extrabold text-slate-400 uppercase tracking-wider">Acres</span>
                </div>
              </div>
            </form>
          </div>

          {/* Outputs Section */}
          <div className="lg:col-span-6 bg-brand-950 text-white border border-brand-900 rounded-2xl p-6 md:p-8 shadow-xl flex flex-col space-y-6">
            <div className="flex justify-between items-center border-b border-brand-900 pb-4">
              <div>
                <h4 className="font-bold text-yellow-300">Live Projections Output</h4>
                <p className="text-[10px] text-brand-300 uppercase tracking-wider font-semibold mt-0.5">Subject to documentation approvals</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${badgeClass}`}>
                {badgeText}
              </span>
            </div>

            {/* Calculations Grid */}
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-brand-300 font-medium">Estimated Project Cost:</span>
                <span className="font-bold font-mono text-base">₹{projectCost.toLocaleString()}</span>
              </div>
              <div class="flex justify-between items-center text-sm">
                <span className="text-brand-300 font-medium">Projected Govt Subsidy:</span>
                <span className="font-bold text-brand-400 font-mono text-base">₹{subsidyAmount.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center border-t border-brand-900 pt-4">
                <div>
                  <span className="text-white font-bold text-sm block">Farmer Contribution:</span>
                  <span className="text-[10px] text-slate-400">Out of pocket (estimated)</span>
                </div>
                <span className="font-black text-xl text-yellow-300 font-mono">
                  ₹{farmerAmount.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Alert / Explanation text box */}
            <div className={`p-4 rounded-xl flex items-start space-x-3 ${alertClass}`}>
              <i className="fa-solid fa-circle-info text-yellow-400 mt-1 text-sm shrink-0"></i>
              <p className="text-xs text-brand-100 leading-relaxed font-semibold">
                {explanationText}
              </p>
            </div>

            {/* Send Quote to WhatsApp CTA */}
            <button 
              type="button" 
              onClick={handleWhatsAppSend} 
              className="w-full bg-[#25D366] hover:bg-[#20ba56] text-white p-4 rounded-xl font-extrabold text-base transition flex items-center justify-center space-x-2.5 shadow-md"
            >
              <i className="fa-brands fa-whatsapp text-xl"></i>
              <span>Submit Specs to WhatsApp Manager</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
