import React, { useState, useEffect } from 'react';
import DashboardLayout from './components/DashboardLayout';

// ── Pages ─────────────────────────────────────────────────
import HomePage      from './pages/HomePage';
import AboutPage     from './pages/AboutPage';
import ServicesPage  from './pages/ServicesPage';
import PricingPage   from './pages/PricingPage';
import BlogPage      from './pages/BlogPage';
import ContactPage   from './pages/ContactPage';
import AdminPage     from './pages/AdminPage';

// ── Existing Components (tab-content pages) ────────────────
import Showcase      from './components/Showcase';
import Calculator    from './components/Calculator';
import DocsChecklist from './components/DocsChecklist';
import Testimonials  from './components/Testimonials';
import FAQ           from './components/FAQ';
import Footer        from './components/Footer';
import AdminPanel    from './components/AdminPanel';

// ── Utils ─────────────────────────────────────────────────
import { sanitizeInput, verifyAdminPasscode, validateWhatsAppNumber } from './utils/security';
import { fetchProductsFromAPI } from './utils/api';

// ─────────────────────────────────────────────────────────
// DEFAULT PRODUCT DATA (fallback when Django API is offline)
// ─────────────────────────────────────────────────────────
const DEFAULT_PRODUCTS = [
  { id: 1, title: 'Drip Irrigation Kit / சொட்டு நீர் பாசனம்',         desc: 'Premium complete agricultural setup for uniform watering up to 5 acres.', price: '₹24,500 / Acre', priceNumeric: 24500, iconClass: 'fa-solid fa-faucet-drip',         image: '/photos/drip.png' },
  { id: 2, title: 'Sprinkler Micro Head System / தெளிப்பு நீர் பாசனம்', desc: 'High-pressure overhead misting for open ground crop layouts.',               price: '₹18,200 / Acre', priceNumeric: 18200, iconClass: 'fa-solid fa-sprinkler',             image: '/photos/sprinkler.png' },
  { id: 3, title: 'Rain Gun Irrigation System / மழை துப்பாக்கி பாசனம்', desc: 'High-throw water cannon for sugarcane, cotton & forage grass.',               price: '₹32,000 / Acre', priceNumeric: 32000, iconClass: 'fa-solid fa-cloud-showers-water', image: '/photos/raingun.png' },
  { id: 4, title: 'Solar Agri Pump Integration / சோலார் பம்ப் செட்',    desc: 'Grid-free solar pump sets with auto-start controls.',                         price: '₹85,000 / Unit', priceNumeric: 85000, iconClass: 'fa-solid fa-solar-panel',          image: '/photos/solar.png' },
];

export default function App() {
  const [activeTab, setActiveTab]               = useState('home');
  const [products, setProducts]                 = useState([]);
  const [whatsAppNumber, setWhatsAppNumber]     = useState('9489528432');
  const [isAdmin, setIsAdmin]                   = useState(false);
  const [selectedProductName, setSelectedProductName] = useState('');
  const [showAuth, setShowAuth]                 = useState(false);
  const [showSettings, setShowSettings]         = useState(false);
  const [toasts, setToasts]                     = useState([]);

  // ── Load products from Django REST API on mount ───────────
  useEffect(() => {
    async function loadProducts() {
      const apiProducts = await fetchProductsFromAPI();
      if (apiProducts && apiProducts.length > 0) {
        setProducts(apiProducts.map(p => ({
          id:           p.id,
          title:        `${p.title_en} / ${p.title_ta}`,
          desc:         p.desc,
          price:        `₹${p.price_numeric.toLocaleString()} ${p.price_unit_text}`,
          priceNumeric: p.price_numeric,
          iconClass:    p.icon_class || 'fa-solid fa-seedling',
          image:        p.image_url  || '/photos/drip.png',
        })));
      } else {
        const saved = localStorage.getItem('thozhan_products');
        try { const parsed = JSON.parse(saved); if (Array.isArray(parsed) && parsed.length > 0) { setProducts(parsed); return; } } catch {}
        setProducts([...DEFAULT_PRODUCTS]);
      }
    }
    loadProducts();

    const savedPhone = localStorage.getItem('thozhan_whatsapp');
    if (savedPhone) setWhatsAppNumber(savedPhone);
    if (sessionStorage.getItem('isAdmin') === 'true') setIsAdmin(true);
  }, []);

  useEffect(() => {
    if (products.length > 0 && !selectedProductName) setSelectedProductName(products[0].title);
  }, [products]);

  // ── Toast helper ─────────────────────────────────────────
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message: sanitizeInput(message), type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  };

  // ── Handlers ─────────────────────────────────────────────
  const handleSelectProduct = name => {
    setSelectedProductName(name);
    setActiveTab('calculator');
    showToast(`Selected: ${name.split('/')[0].trim()} — Calculator opened`, 'success');
  };

  const handleUpdateProduct = (id, field, value) => {
    const v = sanitizeInput(value);
    setProducts(prev => prev.map(p => {
      if (p.id !== id) return p;
      const updated = { ...p, [field]: v };
      if (field === 'price') {
        const m = String(v).replace(/,/g, '').match(/\d+/);
        if (m) updated.priceNumeric = parseInt(m[0], 10);
      }
      return updated;
    }));
  };

  const handleAddProduct = () => {
    setProducts(prev => [...prev, { id: Date.now(), title: 'New System Module', desc: 'Edit description here.', price: '₹15,000 / Acre', priceNumeric: 15000, iconClass: 'fa-solid fa-seedling', image: '/photos/drip.png' }]);
    showToast('New product draft added. Edit inline.', 'success');
  };

  const handleDeleteProduct = id => {
    if (window.confirm('Remove this product?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
      showToast('Product removed.', 'success');
    }
  };

  const handleSaveAdminChanges = () => {
    localStorage.setItem('thozhan_products', JSON.stringify(products));
    localStorage.setItem('thozhan_whatsapp', whatsAppNumber);
    showToast('Configuration saved to local storage.', 'success');
  };

  const handleApplySettings = newNumber => {
    const result = validateWhatsAppNumber(newNumber);
    if (!result.valid) { showToast(result.message, 'error'); return; }
    setWhatsAppNumber(result.value);
    localStorage.setItem('thozhan_whatsapp', result.value);
    setShowSettings(false);
    showToast('WhatsApp number updated.', 'success');
  };

  const handleVerifyPasscode = code => {
    if (verifyAdminPasscode(code)) {
      sessionStorage.setItem('isAdmin', 'true');
      setIsAdmin(true);
      setShowAuth(false);
      showToast('Admin authenticated. Edit mode active.', 'success');
    } else {
      showToast('Incorrect passcode.', 'error');
    }
  };

  const handleExitAdmin = () => {
    sessionStorage.removeItem('isAdmin');
    setIsAdmin(false);
    showToast('Exited admin mode.', 'success');
  };

  // ─────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────
  return (
    <DashboardLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      isAdmin={isAdmin}
      triggerAdmin={() => setShowAuth(true)}
      exitAdmin={handleExitAdmin}
    >
      {/* Admin edit banner */}
      {isAdmin && (
        <div className="bg-amber-500 text-white px-4 py-3 rounded-2xl text-xs font-semibold shadow flex flex-wrap justify-between items-center gap-3 mb-4">
          <div className="flex items-center space-x-2">
            <i className="fa-solid fa-screwdriver-wrench animate-pulse"></i>
            <span><strong>Admin Active:</strong> Edit product cards inline, then click Save.</span>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowSettings(true)} className="bg-amber-700 hover:bg-amber-800 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center">
              <i className="fa-solid fa-cog mr-1"></i> Config
            </button>
            <button onClick={handleSaveAdminChanges} className="bg-white text-amber-700 hover:bg-amber-100 px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center">
              <i className="fa-solid fa-floppy-disk mr-1"></i> Save
            </button>
          </div>
        </div>
      )}

      {/* ── PAGE ROUTING ────────────────────────────────── */}
      {activeTab === 'home' && (
        <HomePage onNavigate={setActiveTab} />
      )}

      {activeTab === 'about' && (
        <AboutPage onNavigate={setActiveTab} />
      )}

      {activeTab === 'services' && (
        <ServicesPage onNavigate={setActiveTab} />
      )}

      {activeTab === 'pricing' && (
        <PricingPage onNavigate={setActiveTab} />
      )}

      {activeTab === 'blog' && (
        <BlogPage onNavigate={setActiveTab} />
      )}

      {/* Legacy product catalog tab */}
      {activeTab === 'products' && (
        <Showcase
          products={products}
          isAdmin={isAdmin}
          onSelectProduct={handleSelectProduct}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
          onAddProduct={handleAddProduct}
        />
      )}

      {/* Subsidy calculator tab */}
      {activeTab === 'calculator' && products.length > 0 && (
        <Calculator
          products={products}
          whatsAppNumber={whatsAppNumber}
          selectedProductName={selectedProductName}
          setSelectedProductName={setSelectedProductName}
          showToast={showToast}
        />
      )}

      {/* Required documents tab */}
      {activeTab === 'documents' && (
        <DocsChecklist />
      )}

      {/* Contact & HQ tab */}
      {activeTab === 'contact' && (
        <ContactPage showToast={showToast} />
      )}

      {/* FAQ & Support tab */}
      {activeTab === 'support' && (
        <div className="space-y-8">
          <FAQ />
          <Testimonials />
        </div>
      )}

      {/* Admin dashboard tab */}
      {activeTab === 'admin' && (
        <AdminPage isAdmin={isAdmin} />
      )}

      <Footer />

      {/* Auth & Settings Modals */}
      <AdminPanel
        showAuth={showAuth}
        showSettings={showSettings}
        whatsAppNumber={whatsAppNumber}
        onCloseAuth={() => setShowAuth(false)}
        onCloseSettings={() => setShowSettings(false)}
        onVerifyCode={handleVerifyPasscode}
        onApplySettings={handleApplySettings}
      />

      {/* Toast notifications */}
      <div className="fixed bottom-6 right-6 z-[300] flex flex-col space-y-2" role="status" aria-live="polite">
        {toasts.map(t => (
          <div key={t.id}
            className={`px-4 py-3 rounded-xl shadow-xl border text-xs font-bold text-white flex items-center space-x-2 animate-in fade-in slide-in-from-bottom-4 duration-200 ${
              t.type === 'success' ? 'bg-brand-900 border-brand-700' : 'bg-red-950 border-red-800'
            }`}
          >
            <i className={`fa-solid ${t.type === 'success' ? 'fa-circle-check text-brand-400' : 'fa-circle-xmark text-red-400'}`}></i>
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
