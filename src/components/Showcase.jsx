import React from 'react';

export default function Showcase({ products, isAdmin, onSelectProduct, onUpdateProduct, onDeleteProduct, onAddProduct }) {
  
  const handleBlur = (id, field, event) => {
    const value = event.target.innerText.trim();
    onUpdateProduct(id, field, value);
  };

  return (
    <section id="inventory" className="py-16 md:py-24 px-4 md:px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-xs font-black text-brand-700 uppercase tracking-widest">Our Operations</span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 leading-tight">Irrigation Systems Portfolio</h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            Authorized configuration systems for state financial subsidy support. Select layout to compute pricing metrics.
          </p>
        </div>

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div key={p.id} className="bg-white rounded-3xl border border-slate-200 hover:border-brand-300 shadow-sm overflow-hidden flex flex-col group relative transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="bg-slate-200 h-44 w-full relative flex items-center justify-center overflow-hidden">
                {p.image ? (
                  <img src={p.image} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt={p.title} />
                ) : (
                  <div className="bg-gradient-to-br from-brand-900 to-brand-950 w-full h-full flex items-center justify-center text-brand-100/30">
                    <i className={`${p.iconClass} text-6xl group-hover:scale-110 transition duration-300 text-brand-300/40`}></i>
                  </div>
                )}
                <span className="absolute top-4 left-4 bg-yellow-400 text-brand-950 text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider font-extrabold shadow-sm">Subsidy Eligible</span>
              </div>
              
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div className="space-y-2 flex-grow">
                  <h3 
                    className={`font-bold text-base text-slate-800 outline-none ${isAdmin ? 'editable-highlight' : ''}`}
                    contentEditable={isAdmin}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => handleBlur(p.id, 'title', e)}
                  >
                    {p.title}
                  </h3>
                  <p 
                    className={`text-slate-500 text-xs leading-relaxed outline-none ${isAdmin ? 'editable-highlight' : ''}`}
                    contentEditable={isAdmin}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => handleBlur(p.id, 'desc', e)}
                  >
                    {p.desc}
                  </p>
                  
                  {isAdmin && (
                    <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-semibold">
                      <span>Photo URL:</span>
                      <input 
                        type="text" 
                        defaultValue={p.image || ''} 
                        onBlur={(e) => onUpdateProduct(p.id, 'image', e.target.value)}
                        className="border rounded px-1.5 py-0.5 bg-slate-50 text-slate-600 outline-none w-2/3 text-left font-mono"
                        placeholder="e.g. /photos/drip.png"
                      />
                    </div>
                  )}
                </div>
                
                <div className="mt-6 pt-4 border-t flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Unit Rate</span>
                    <span 
                      className={`text-base font-black text-brand-800 outline-none ${isAdmin ? 'editable-highlight' : ''}`}
                      contentEditable={isAdmin}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => handleBlur(p.id, 'price', e)}
                    >
                      {p.price}
                    </span>
                  </div>
                  <button 
                    onClick={() => onSelectProduct(p.title)} 
                    className="bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-sm"
                  >
                    Get Quote
                  </button>
                </div>
              </div>

              {/* Trash icon visible in admin view */}
              {isAdmin && (
                <button 
                  onClick={() => onDeleteProduct(p.id)} 
                  className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white p-2.5 rounded-full shadow transition"
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
              className="border-2 border-dashed border-slate-300 hover:border-brand-500 rounded-3xl h-full min-h-[340px] flex flex-col items-center justify-center space-y-3 bg-white/50 text-slate-400 hover:text-brand-700 transition group p-6"
            >
              <div className="w-12 h-12 rounded-full bg-slate-100 group-hover:bg-brand-50 flex items-center justify-center transition">
                <i className="fa-solid fa-plus text-xl"></i>
              </div>
              <span className="font-bold text-sm">Add New System Module</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
