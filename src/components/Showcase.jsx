import React from 'react';
import { decodeSanitizedInput } from '../utils/security';

export default function Showcase({ products, isAdmin, onSelectProduct, onUpdateProduct, onDeleteProduct, onAddProduct }) {
  
  const handleBlur = (id, field, event) => {
    const value = event.target.innerText.trim();
    onUpdateProduct(id, field, value);
  };

  const handleImageError = (e, iconClass) => {
    e.target.onerror = null;
    e.target.style.display = 'none';
    if (e.target.nextElementSibling) {
      e.target.nextElementSibling.style.display = 'flex';
    }
  };

  return (
    <section id="inventory" className="space-y-8">
      <div className="glass-dashboard-card rounded-3xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-brand-900/80 pb-5 gap-4">
          <div>
            <span className="text-xs font-black text-yellow-400 uppercase tracking-widest">Our Operations & Equipment</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">Irrigation Systems Portfolio</h2>
            <p className="text-xs text-brand-300 font-semibold mt-1">
              Authorized configuration systems for state financial subsidy support. Select layout to compute pricing metrics.
            </p>
          </div>
          <span className="bg-brand-800 text-brand-200 border border-brand-600 text-xs font-extrabold px-4 py-2 rounded-xl">
            {products.length} Active System Configurations
          </span>
        </div>

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div key={p.id} className="bg-brand-950/80 rounded-3xl border border-brand-800 hover:border-brand-500 shadow-xl overflow-hidden flex flex-col group relative hover-lift gpu-accelerated">
              <div className="bg-brand-900/60 h-44 w-full relative flex items-center justify-center overflow-hidden">
                {p.image && (
                  <img 
                    src={p.image} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500 gpu-accelerated opacity-90" 
                    alt={decodeSanitizedInput(p.title)} 
                    onError={(e) => handleImageError(e, p.iconClass)}
                  />
                )}
                <div 
                  className={`bg-gradient-to-br from-brand-900 to-brand-950 w-full h-full items-center justify-center text-brand-100/30 ${p.image ? 'hidden' : 'flex'}`}
                >
                  <i className={`${p.iconClass || 'fa-solid fa-seedling'} text-6xl group-hover:scale-110 transition duration-300 text-brand-300/40`}></i>
                </div>
                <span className="absolute top-4 left-4 bg-yellow-400 text-brand-950 text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider font-extrabold shadow-sm">Subsidy Eligible</span>
              </div>
              
              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-2 flex-grow">
                  <h3 
                    className={`font-bold text-base text-white outline-none ${isAdmin ? 'editable-highlight' : ''}`}
                    contentEditable={isAdmin}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => handleBlur(p.id, 'title', e)}
                  >
                    {decodeSanitizedInput(p.title)}
                  </h3>
                  <p 
                    className={`text-slate-300 text-xs leading-relaxed outline-none ${isAdmin ? 'editable-highlight' : ''}`}
                    contentEditable={isAdmin}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => handleBlur(p.id, 'desc', e)}
                  >
                    {decodeSanitizedInput(p.desc)}
                  </p>
                  
                  {isAdmin && (
                    <div className="mt-2 pt-2 border-t border-brand-800 flex items-center justify-between text-[10px] text-slate-400 font-semibold">
                      <label htmlFor={`photo-url-${p.id}`}>Photo URL:</label>
                      <input 
                        id={`photo-url-${p.id}`}
                        type="text" 
                        defaultValue={p.image || ''} 
                        onBlur={(e) => onUpdateProduct(p.id, 'image', e.target.value)}
                        className="border border-brand-700 rounded px-1.5 py-0.5 bg-brand-900 text-white outline-none w-2/3 text-left font-mono"
                        placeholder="e.g. /photos/drip.png"
                      />
                    </div>
                  )}
                </div>
                
                <div className="pt-4 border-t border-brand-900 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Unit Rate</span>
                    <span 
                      className={`text-sm font-black text-yellow-300 outline-none ${isAdmin ? 'editable-highlight' : ''}`}
                      contentEditable={isAdmin}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => handleBlur(p.id, 'price', e)}
                    >
                      {decodeSanitizedInput(p.price)}
                    </span>
                  </div>
                  <button 
                    onClick={() => onSelectProduct(p.title)} 
                    aria-label={`Get subsidy quote for ${decodeSanitizedInput(p.title)}`}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-sm btn-press outline-none"
                  >
                    Get Quote
                  </button>
                </div>
              </div>

              {/* Trash icon visible in admin view */}
              {isAdmin && (
                <button 
                  onClick={() => onDeleteProduct(p.id)} 
                  aria-label={`Delete system module ${decodeSanitizedInput(p.title)}`}
                  className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white p-2.5 rounded-full shadow transition outline-none btn-press focus:ring-2 focus:ring-red-400"
                >
                  <i className="fa-solid fa-trash-can text-xs"></i>
                </button>
              )}
            </div>
          ))}

          {/* Admin Create Product Card Trigger */}
          {isAdmin && (
            <button 
              onClick={onAddProduct} 
              aria-label="Add New System Module"
              className="border-2 border-dashed border-brand-700 hover:border-yellow-400 rounded-3xl h-full min-h-[340px] flex flex-col items-center justify-center space-y-3 bg-brand-950/40 text-slate-400 hover:text-yellow-300 transition group p-6 outline-none"
            >
              <div className="w-12 h-12 rounded-full bg-brand-900 group-hover:bg-brand-800 flex items-center justify-center transition">
                <i className="fa-solid fa-plus text-xl text-yellow-400"></i>
              </div>
              <span className="font-bold text-xs">Add New System Module</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
