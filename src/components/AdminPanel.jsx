import React, { useState } from 'react';

export default function AdminPanel({ 
  showAuth, 
  showSettings, 
  whatsAppNumber, 
  onCloseAuth, 
  onCloseSettings, 
  onVerifyCode, 
  onApplySettings 
}) {
  const [passcode, setPasscode] = useState('');
  const [inputNumber, setInputNumber] = useState(whatsAppNumber);

  const handleVerify = () => {
    onVerifyCode(passcode);
    setPasscode('');
  };

  const handleApply = () => {
    onApplySettings(inputNumber);
  };

  return (
    <>
      {/* 1. AUTH PASSCODE MODAL */}
      {showAuth && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-sm shadow-2xl overflow-hidden animate-[modal-slide_0.3s_ease]">
            <div className="bg-brand-850 p-5 text-center border-b">
              <div className="w-12 h-12 bg-brand-100 text-brand-800 rounded-full flex items-center justify-center mx-auto text-xl mb-2">
                <i className="fa-solid fa-lock"></i>
              </div>
              <h3 className="font-bold text-slate-800">Enter Admin Passcode</h3>
              <p className="text-xs text-slate-400 mt-1">Provide secret code key to trigger edit functions.</p>
            </div>
            
            <div className="p-5 space-y-4">
              <input 
                type="password" 
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Passcode (e.g. thozhan-secret)" 
                className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-center font-bold text-sm"
              />
              <button 
                onClick={handleVerify}
                className="w-full bg-brand-700 hover:bg-brand-800 text-white p-3 rounded-xl font-bold transition text-sm"
              >
                Verify Credentials
              </button>
            </div>
            
            <div className="bg-slate-50 p-3 text-center border-t">
              <button onClick={onCloseAuth} className="text-xs font-semibold text-slate-500 hover:underline outline-none">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. SETTINGS PANEL CONFIG MODAL */}
      {showSettings && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="bg-amber-500 text-white p-5 flex justify-between items-center">
              <h3 className="font-bold text-lg"><i className="fa-solid fa-cog mr-2"></i>Configuration Manager</h3>
              <button onClick={onCloseSettings} className="text-white hover:text-slate-200 outline-none">
                <i className="fa-solid fa-times text-lg"></i>
              </button>
            </div>
            
            <div className="p-6 space-y-5">
              <div className="form-group">
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">WhatsApp Contact Number</label>
                <input 
                  type="text" 
                  value={inputNumber}
                  onChange={(e) => setInputNumber(e.target.value)}
                  className="w-full border p-3.5 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none font-bold text-sm"
                  placeholder="9489528432"
                />
              </div>
              <div className="form-group">
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Subsidy Program Version</label>
                <input 
                  type="text" 
                  readOnly
                  className="w-full border border-slate-100 bg-slate-50 p-3.5 rounded-xl outline-none font-semibold text-slate-400 text-sm" 
                  value="TN-HORT-2026"
                />
              </div>
            </div>
            
            <div className="bg-slate-50 p-4 border-t flex justify-end space-x-3">
              <button onClick={onCloseSettings} className="border px-4 py-2.5 rounded-xl text-slate-600 text-sm font-semibold hover:bg-slate-100 transition">Cancel</button>
              <button onClick={handleApply} className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-md transition">Apply Configurations</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
