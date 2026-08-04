import React, { useState, useEffect } from 'react';
import { submitContact } from '../utils/api';

function validate(form) {
  const errors = {};
  if (!form.name.trim())                          errors.name    = 'Full name is required';
  if (!form.email.match(/^\S+@\S+\.\S+$/))        errors.email   = 'Enter a valid email address';
  if (!form.phone.match(/^[6-9]\d{9}$/))          errors.phone   = 'Enter a valid 10-digit Indian mobile number';
  if (!form.subject.trim())                        errors.subject = 'Subject is required';
  if (form.message.trim().length < 10)             errors.message = 'Message must be at least 10 characters';
  return errors;
}

const TN_DISTRICTS = [
  'Ariyalur','Chengalpattu','Chennai','Coimbatore','Cuddalore','Dharmapuri',
  'Dindigul','Erode','Kallakurichi','Kancheepuram','Kanniyakumari','Karur',
  'Krishnagiri','Madurai','Mayiladuthurai','Nagapattinam','Namakkal','Nilgiris',
  'Perambalur','Pudukkottai','Ramanathapuram','Ranipet','Salem','Sivaganga',
  'Tenkasi','Thanjavur','Theni','Thoothukudi','Tiruchirappalli','Tirunelveli',
  'Tirupathur','Tiruppur','Tiruvallur','Tiruvannamalai','Tiruvarur','Vellore',
  'Viluppuram','Virudhunagar'
];

const CONTACT_INFO = [
  { icon: 'fa-solid fa-phone', label: 'Primary Hotline', value: '94895 28432', href: 'tel:9489528432', color: 'text-emerald-400' },
  { icon: 'fa-brands fa-whatsapp', label: 'WhatsApp', value: '+91 94895 28432', href: 'https://wa.me/919489528432', color: 'text-green-400' },
  { icon: 'fa-solid fa-envelope', label: 'Email', value: 'thozhanirrigation@gmail.com', href: 'mailto:thozhanirrigation@gmail.com', color: 'text-blue-400' },
  { icon: 'fa-solid fa-location-dot', label: 'Office Address', value: '21-A, Vijaya Nagar, SSI ITI College Road, Seelapadi, Dindigul — 624 004', href: null, color: 'text-yellow-400' },
  { icon: 'fa-solid fa-id-badge', label: 'GSTIN', value: '33BSXPJ5723P1ZX', href: null, color: 'text-slate-400' },
  { icon: 'fa-solid fa-clock', label: 'Working Hours', value: 'Mon–Sat: 9:00 AM – 6:00 PM IST', href: null, color: 'text-brand-400' },
];

export default function ContactPage({ showToast }) {
  const [form, setForm]   = useState({ name: '', email: '', phone: '', district: 'Dindigul', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    document.title = 'Contact Us — Thozhan Irrigation, Dindigul';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Contact Thozhan Irrigation at Dindigul. Call Jayachandran at 94895 28432, or send a WhatsApp message for free site assessment and subsidy inquiries.');
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setStatus('loading');
    try {
      await submitContact(form);
      setStatus('success');
      showToast && showToast('Message sent! We\'ll respond within 24 hours.', 'success');
    } catch (err) {
      setErrors(err.errors || {});
      setStatus('error');
      showToast && showToast('Failed to send. Please call us directly.', 'error');
    }
  };

  const inputClass = name =>
    `w-full bg-brand-950/80 border ${errors[name] ? 'border-red-500' : 'border-brand-800'} rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition`;

  return (
    <div className="space-y-10">

      {/* ── PAGE HEADER ─────────────────────────── */}
      <section className="glass-dashboard-card rounded-3xl p-7 md:p-10">
        <span className="text-brand-400 text-xs font-black uppercase tracking-widest mb-2 block">Contact / தொடர்பு கொள்ளுங்கள்</span>
        <h1 className="text-3xl font-black text-white mb-2">Get In Touch</h1>
        <p className="text-slate-400 text-sm max-w-xl">
          Reach Jayachandran's team for free site assessments, subsidy inquiries, or installation support. We serve all 18 districts of Tamil Nadu.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* ── CONTACT DETAILS (left panel) ──────── */}
        <aside className="lg:col-span-2 space-y-4">
          {/* Proprietor card */}
          <div className="glass-dashboard-card rounded-2xl p-6 space-y-3">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-600 to-brand-900 flex items-center justify-center shadow-lg text-2xl">
                <i className="fa-solid fa-user-tie text-white"></i>
              </div>
              <div>
                <h2 className="text-white font-black text-base">ஜெயசந்திரன்</h2>
                <p className="text-brand-400 text-xs">Jayachandran — Proprietor</p>
                <p className="text-slate-400 text-xs">Thozhan Irrigation, Dindigul</p>
              </div>
            </div>
          </div>

          {/* Contact links */}
          <div className="glass-dashboard-card rounded-2xl p-5 space-y-3">
            {CONTACT_INFO.map((item, i) => (
              <div key={i} className="flex items-start space-x-3">
                <i className={`${item.icon} ${item.color} text-sm mt-0.5 w-4 shrink-0`}></i>
                <div>
                  <p className="text-slate-500 text-[10px] font-bold uppercase">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                      className={`${item.color} text-xs font-semibold hover:opacity-80 transition`}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-slate-300 text-xs">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* WhatsApp direct CTA */}
          <a
            href="https://wa.me/919489528432?text=Hi Jayachandran, I need information about irrigation subsidy."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-3 w-full bg-green-700 hover:bg-green-600 text-white font-bold py-3.5 rounded-2xl transition hover-lift shadow-lg"
          >
            <i className="fa-brands fa-whatsapp text-xl"></i>
            <span>Chat on WhatsApp Now</span>
          </a>
        </aside>

        {/* ── CONTACT FORM (right panel) ────────── */}
        <div className="lg:col-span-3">
          {status === 'success' ? (
            <div className="glass-dashboard-card rounded-2xl p-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-brand-800 flex items-center justify-center mx-auto">
                <i className="fa-solid fa-circle-check text-brand-400 text-3xl"></i>
              </div>
              <h2 className="text-white font-black text-xl">Message Sent!</h2>
              <p className="text-slate-400 text-sm">We'll respond within 24 hours. For urgent matters, call <strong className="text-white">94895 28432</strong>.</p>
              <button onClick={() => setStatus('idle')} className="bg-brand-700 hover:bg-brand-600 text-white font-bold px-6 py-2.5 rounded-xl transition text-sm">
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="glass-dashboard-card rounded-2xl p-6 space-y-4">
              <h2 className="text-white font-black text-lg mb-1">Send a Message</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="text-slate-400 text-xs font-bold mb-1.5 block">Full Name *</label>
                  <input id="contact-name" name="name" type="text" value={form.name} onChange={handleChange}
                    placeholder="e.g. Murugesan" className={inputClass('name')} />
                  {errors.name && <p className="text-red-400 text-[10px] mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="contact-phone" className="text-slate-400 text-xs font-bold mb-1.5 block">Mobile Number *</label>
                  <input id="contact-phone" name="phone" type="tel" value={form.phone} onChange={handleChange}
                    placeholder="e.g. 9876543210" className={inputClass('phone')} />
                  {errors.phone && <p className="text-red-400 text-[10px] mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="contact-email" className="text-slate-400 text-xs font-bold mb-1.5 block">Email Address *</label>
                <input id="contact-email" name="email" type="email" value={form.email} onChange={handleChange}
                  placeholder="e.g. farmer@gmail.com" className={inputClass('email')} />
                {errors.email && <p className="text-red-400 text-[10px] mt-1">{errors.email}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-district" className="text-slate-400 text-xs font-bold mb-1.5 block">District</label>
                  <select id="contact-district" name="district" value={form.district} onChange={handleChange}
                    className={`${inputClass('district')} cursor-pointer`}
                  >
                    {TN_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="contact-subject" className="text-slate-400 text-xs font-bold mb-1.5 block">Subject *</label>
                  <input id="contact-subject" name="subject" type="text" value={form.subject} onChange={handleChange}
                    placeholder="e.g. Drip system inquiry" className={inputClass('subject')} />
                  {errors.subject && <p className="text-red-400 text-[10px] mt-1">{errors.subject}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="text-slate-400 text-xs font-bold mb-1.5 block">Message *</label>
                <textarea id="contact-message" name="message" rows={5} value={form.message} onChange={handleChange}
                  placeholder="Tell us your land size, crop type, and any questions about the subsidy process..."
                  className={inputClass('message')}
                />
                {errors.message && <p className="text-red-400 text-[10px] mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-brand-600 hover:bg-brand-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-black py-3 rounded-xl transition btn-press flex items-center justify-center space-x-2 text-sm"
              >
                {status === 'loading' ? (
                  <><i className="fa-solid fa-spinner fa-spin"></i><span>Sending...</span></>
                ) : (
                  <><i className="fa-solid fa-paper-plane"></i><span>Send Message</span></>
                )}
              </button>

              <p className="text-slate-500 text-[10px] text-center">
                We respond within 24 hours · All conversations are confidential
              </p>
            </form>
          )}
        </div>
      </div>

    </div>
  );
}
