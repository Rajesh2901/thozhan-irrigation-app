import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Showcase from './components/Showcase';
import Calculator from './components/Calculator';
import DocsChecklist from './components/DocsChecklist';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';

const DEFAULT_PRODUCTS = [
  {
    id: 1,
    title: "Drip Irrigation Kit / சொட்டு நீர் பாசனம்",
    desc: "Premium complete agricultural setup engineered for uniform watering spans up to 5 acres.",
    price: "₹24,500 / Acre",
    priceNumeric: 24500,
    iconClass: "fa-solid fa-faucet-drip",
    image: "/photos/drip.png"
  },
  {
    id: 2,
    title: "Sprinkler Micro Head System / தெளிப்பு நீர் பாசனம்",
    desc: "High-pressure overhead misting systems optimized for open ground crop layouts.",
    price: "₹18,200 / Acre",
    priceNumeric: 18200,
    iconClass: "fa-solid fa-sprinkler",
    image: "/photos/sprinkler.png"
  },
  {
    id: 3,
    title: "Rain Gun Irrigation System / மழை துப்பாக்கி பாசனம்",
    desc: "High-throw water cannon systems ideal for sugarcane, cotton, and forage grass crops.",
    price: "₹32,000 / Acre",
    priceNumeric: 32000,
    iconClass: "fa-solid fa-cloud-showers-water",
    image: "/photos/raingun.png"
  },
  {
    id: 4,
    title: "Solar Agri Pump Integration / சோலார் பம்ப் செட்",
    desc: "Grid-independent solar power pumping systems with automatic start controls.",
    price: "₹85,000 / Unit",
    priceNumeric: 85000,
    iconClass: "fa-solid fa-solar-panel",
    image: "/photos/solar.png"
  }
];

export default function App() {
  const [products, setProducts] = useState([]);
  const [whatsAppNumber, setWhatsAppNumber] = useState('9489528432');
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedProductName, setSelectedProductName] = useState('');
  
  // Modals visibility state
  const [showAuth, setShowAuth] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    // 1. Initial configurations loading
    const savedProducts = localStorage.getItem('thozhan_products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      setProducts([...DEFAULT_PRODUCTS]);
    }

    const savedPhone = localStorage.getItem('thozhan_whatsapp');
    if (savedPhone) {
      setWhatsAppNumber(savedPhone);
    }

    // 2. Check admin validation
    const params = new URLSearchParams(window.location.search);
    if (params.get('auth') === 'thozhan-secret' || sessionStorage.getItem('isAdmin') === 'true') {
      sessionStorage.setItem('isAdmin', 'true');
      setIsAdmin(true);
    }
  }, []);

  // Sync selected product defaults once list is loaded
  useEffect(() => {
    if (products.length > 0 && !selectedProductName) {
      setSelectedProductName(products[0].title);
    }
  }, [products]);

  // Toast Notification handler
  const showToast = (message, type = "success") => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  // Select system from card trigger
  const handleSelectProduct = (name) => {
    setSelectedProductName(name);
    showToast(`Selected: ${name.split('/')[0]}`, "success");
    const calcSec = document.getElementById('calculator');
    if (calcSec) {
      calcSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Admin inline field blur triggers
  const handleUpdateProduct = (id, field, value) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        const updated = { ...p, [field]: value };
        // Parse numeric value on price changes
        if (field === 'price') {
          const matches = value.replace(/,/g, '').match(/\d+/);
          if (matches) {
            updated.priceNumeric = parseInt(matches[0]);
          }
        }
        return updated;
      }
      return p;
    }));
  };

  // Add Product Setup
  const handleAddProduct = () => {
    const newId = Date.now();
    setProducts(prev => [
      ...prev,
      {
        id: newId,
        title: "New Irrigation System Module",
        desc: "Description specifications for agricultural field irrigation systems.",
        price: "₹15,000 / Acre",
        priceNumeric: 15000,
        iconClass: "fa-solid fa-seedling",
        image: "/photos/drip.png"
      }
    ]);
    showToast("Added new system draft card. Edit inline.", "success");
  };

  // Delete Product
  const handleDeleteProduct = (id) => {
    if (window.confirm("Remove this equipment module permanently from local state view?")) {
      setProducts(prev => prev.filter(p => p.id !== id));
      showToast("Product configuration removed.", "success");
    }
  };

  // Save changes locally in browser storage
  const handleSaveAdminChanges = () => {
    localStorage.setItem('thozhan_products', JSON.stringify(products));
    localStorage.setItem('thozhan_whatsapp', whatsAppNumber);
    showToast("Configurations saved in browser storage!", "success");
  };

  // Settings configs apply
  const handleApplySettings = (newNumber) => {
    setWhatsAppNumber(newNumber);
    localStorage.setItem('thozhan_whatsapp', newNumber);
    setShowSettings(false);
    showToast("WhatsApp routing configuration updated.", "success");
  };

  // Passcode authentication
  const handleVerifyPasscode = (code) => {
    if (code === 'thozhan-secret') {
      sessionStorage.setItem('isAdmin', 'true');
      setIsAdmin(true);
      setShowAuth(false);
      showToast("Admin Verified. Edit mode activated.", "success");
      // Add query parameter to preserve state across page reloads
      window.history.replaceState({}, '', '?auth=thozhan-secret');
    } else {
      showToast("Invalid secret code phrase.", "error");
    }
  };

  // Exit Admin View
  const handleExitAdminMode = () => {
    sessionStorage.removeItem('isAdmin');
    setIsAdmin(false);
    window.history.replaceState({}, '', window.location.pathname);
    showToast("Exited admin mode.", "success");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* 1. ADMIN SYSTEM CONTROL BANNER */}
      {isAdmin && (
        <div className="bg-amber-500 text-white px-4 py-3 text-center text-sm font-semibold shadow-md sticky top-0 z-[100] flex justify-between items-center transition-all duration-300">
          <div className="mx-auto flex items-center space-x-2">
            <i className="fa-solid fa-screwdriver-wrench animate-pulse text-lg"></i>
            <span><strong>Admin System Active:</strong> You can edit equipment prices, titles, and descriptions directly on the screen. Click "Save Configuration" to sync.</span>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setShowSettings(true)} 
              className="bg-amber-700 hover:bg-amber-800 text-white px-3 py-1.5 rounded shadow text-xs font-bold transition flex items-center"
            >
              <i className="fa-solid fa-cog mr-1"></i> Config Manager
            </button>
            <button 
              onClick={handleSaveAdminChanges} 
              className="bg-white text-amber-700 hover:bg-amber-100 px-3 py-1.5 rounded shadow text-xs font-bold transition flex items-center"
            >
              <i className="fa-solid fa-floppy-disk mr-1"></i> Save Configuration
            </button>
            <button 
              onClick={handleExitAdminMode} 
              className="bg-red-600 hover:bg-red-700 text-white px-2.5 py-1.5 rounded shadow text-xs font-bold transition"
            >
              <i className="fa-solid fa-right-from-bracket"></i>
            </button>
          </div>
        </div>
      )}

      {/* UPPER UTILITY STRIP */}
      <div className="bg-brand-950 text-brand-100 text-xs py-2 border-b border-brand-900 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span><i className="fa-solid fa-circle-check text-yellow-400 mr-1.5"></i>Tamil Nadu Govt Subsidy Authorized Integrator</span>
            <span><i className="fa-solid fa-location-dot mr-1.5"></i>Dindigul Base (Serving statewide)</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#about" className="hover:underline">Documentation Guide</a>
            <a href="#calculator" className="hover:underline">Subsidy Estimation</a>
            <button 
              onClick={() => isAdmin ? handleExitAdminMode() : setShowAuth(true)} 
              className="hover:text-yellow-300 transition text-[11px] font-bold outline-none"
            >
              <i className="fa-solid fa-user-shield mr-1"></i>
              {isAdmin ? "Exit Admin" : "Admin Portal"}
            </button>
          </div>
        </div>
      </div>

      {/* CORE COMPONENTS GRID */}
      <Header 
        isAdmin={isAdmin} 
        triggerAdmin={() => setShowAuth(true)} 
        exitAdmin={handleExitAdminMode} 
      />
      
      <main className="flex-grow">
        <Hero />
        
        <Stats />
        
        <Showcase 
          products={products}
          isAdmin={isAdmin}
          onSelectProduct={handleSelectProduct}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
          onAddProduct={handleAddProduct}
        />
        
        {products.length > 0 && (
          <Calculator 
            products={products}
            whatsAppNumber={whatsAppNumber}
            selectedProductName={selectedProductName}
            setSelectedProductName={setSelectedProductName}
            showToast={showToast}
          />
        )}
        
        <DocsChecklist />
        
        <Testimonials />
        
        <FAQ />
      </main>

      <Footer />

      {/* 2. ADMIN MODALS CONTAINER */}
      <AdminPanel 
        showAuth={showAuth}
        showSettings={showSettings}
        whatsAppNumber={whatsAppNumber}
        onCloseAuth={() => setShowAuth(false)}
        onCloseSettings={() => setShowSettings(false)}
        onVerifyCode={handleVerifyPasscode}
        onApplySettings={handleApplySettings}
      />

      {/* 3. TOAST MESSAGES EMITTER */}
      <div className="fixed bottom-6 right-6 z-[300] flex flex-col space-y-2">
        {toasts.map(toast => (
          <div 
            key={toast.id}
            className={`p-4 rounded-xl shadow-lg border text-xs font-bold text-white flex items-center space-x-2 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 ${
              toast.type === 'success' ? 'bg-brand-900 border-brand-700' : 'bg-red-950 border-red-800'
            }`}
          >
            <i className={`fa-solid ${toast.type === 'success' ? 'fa-circle-check text-brand-400' : 'fa-circle-xmark text-red-400'} text-sm`}></i>
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
