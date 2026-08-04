import React, { useState, useEffect } from 'react';
import { getBlogPosts } from '../utils/api';

const SAMPLE_POSTS = [
  {
    id: 1,
    title: 'How to Apply for PMKSY Drip Irrigation Subsidy in Tamil Nadu (2025 Guide)',
    slug: 'pmksy-drip-irrigation-subsidy-tamilnadu-2025',
    summary: 'Step-by-step guide to applying for the Pradhan Mantri Krishi Sinchayee Yojana drip irrigation subsidy through the TN Horticulture Department — from document collection to disbursement.',
    author: 'Jayachandran',
    cover_image: null,
    tags: ['subsidy', 'pmksy', 'how-to'],
    created_at: '2025-03-15T10:00:00Z',
  },
  {
    id: 2,
    title: 'Drip vs Sprinkler: Which System is Right for Your Tamil Nadu Farm?',
    slug: 'drip-vs-sprinkler-tamilnadu-comparison',
    summary: 'A practical comparison of drip and sprinkler irrigation for the most common Tamil Nadu crops — banana, paddy, tomato, groundnut, and sugarcane.',
    author: 'Jayachandran',
    cover_image: null,
    tags: ['drip', 'sprinkler', 'comparison'],
    created_at: '2025-02-10T10:00:00Z',
  },
  {
    id: 3,
    title: 'Solar Pump Integration with Drip Systems: Complete Cost & Benefit Analysis',
    slug: 'solar-pump-drip-system-integration-cost-benefit',
    summary: 'How combining a solar pump set with your drip irrigation system eliminates electricity costs entirely and achieves payback within 3–4 years.',
    author: 'Jayachandran',
    cover_image: null,
    tags: ['solar', 'cost-analysis'],
    created_at: '2025-01-20T10:00:00Z',
  },
  {
    id: 4,
    title: '5 Common Mistakes Farmers Make with Drip Irrigation (And How to Avoid Them)',
    slug: 'common-drip-irrigation-mistakes-farmers',
    summary: 'From using the wrong emitter spacing to skipping the filter maintenance schedule — learn from the 1,200+ installations Thozhan has completed.',
    author: 'Jayachandran',
    cover_image: null,
    tags: ['tips', 'drip', 'maintenance'],
    created_at: '2024-12-05T10:00:00Z',
  },
  {
    id: 5,
    title: 'Chitta & Adangal: The Complete Document Guide for Irrigation Subsidy Applications',
    slug: 'chitta-adangal-document-guide-irrigation-subsidy',
    summary: 'Everything you need to know about getting your Chitta, Patta, Adangal, and FMB documents ready for a successful subsidy application in Tamil Nadu.',
    author: 'Jayachandran',
    cover_image: null,
    tags: ['documents', 'subsidy', 'guide'],
    created_at: '2024-11-12T10:00:00Z',
  },
  {
    id: 6,
    title: 'Rain Gun vs Flood Irrigation for Sugarcane: Water Savings & Yield Data',
    slug: 'rain-gun-vs-flood-sugarcane-comparison',
    summary: 'Field data from 50 Dindigul-district sugarcane farmers who switched from flood to rain gun irrigation in 2023 — with water savings, yield changes, and ROI calculations.',
    author: 'Jayachandran',
    cover_image: null,
    tags: ['rain-gun', 'sugarcane', 'data'],
    created_at: '2024-10-08T10:00:00Z',
  },
];

const ALL_TAGS = ['All', 'subsidy', 'drip', 'sprinkler', 'solar', 'documents', 'tips', 'data', 'how-to'];

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
}

const TAG_ICONS = {
  subsidy: 'fa-indian-rupee-sign',
  drip: 'fa-faucet-drip',
  sprinkler: 'fa-sprinkler',
  solar: 'fa-solar-panel',
  documents: 'fa-file-lines',
  tips: 'fa-lightbulb',
  data: 'fa-chart-bar',
  'how-to': 'fa-list-check',
  'rain-gun': 'fa-cloud-showers-water',
};

export default function BlogPage({ onNavigate }) {
  const [posts, setPosts]       = useState(SAMPLE_POSTS);
  const [activeTag, setTag]     = useState('All');
  const [search, setSearch]     = useState('');
  const [loading, setLoading]   = useState(false);

  useEffect(() => {
    document.title = 'Blog & Guides — Thozhan Irrigation';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Thozhan Irrigation blog: practical guides on PMKSY subsidy applications, drip vs sprinkler comparisons, solar pump integration, and document checklists for Tamil Nadu farmers.');

    setLoading(true);
    getBlogPosts().then(data => {
      if (data && data.length > 0) setPosts(data);
    }).finally(() => setLoading(false));
  }, []);

  const filtered = posts.filter(p => {
    const matchTag = activeTag === 'All' || (p.tags && p.tags.includes(activeTag));
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase())
                        || p.summary.toLowerCase().includes(search.toLowerCase());
    return matchTag && matchSearch;
  });

  return (
    <div className="space-y-10">

      {/* ── PAGE HEADER ────────────────────────────── */}
      <section className="glass-dashboard-card rounded-3xl p-7 md:p-10">
        <span className="text-brand-400 text-xs font-black uppercase tracking-widest mb-2 block">Knowledge Hub / வழிகாட்டி</span>
        <h1 className="text-3xl font-black text-white mb-2">Farm Guides & Irrigation News</h1>
        <p className="text-slate-400 text-sm max-w-xl">
          Practical articles, subsidy application step-by-steps, system comparison data, and crop-specific guides from Thozhan's field team.
        </p>

        {/* Search Bar */}
        <div className="relative mt-5 max-w-sm">
          <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-brand-950/90 border border-brand-800 rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition"
          />
        </div>
      </section>

      {/* ── TAG FILTER ─────────────────────────────── */}
      <div className="flex flex-wrap gap-2">
        {ALL_TAGS.map(tag => (
          <button
            key={tag}
            onClick={() => setTag(tag)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition btn-press flex items-center space-x-1.5 ${
              activeTag === tag
                ? 'bg-brand-600 text-white'
                : 'bg-brand-950/80 border border-brand-800 text-slate-400 hover:text-white'
            }`}
          >
            {tag !== 'All' && <i className={`fa-solid ${TAG_ICONS[tag] || 'fa-tag'} text-[10px]`}></i>}
            <span className="capitalize">{tag}</span>
          </button>
        ))}
      </div>

      {/* ── POST GRID ──────────────────────────────── */}
      {loading ? (
        <div className="text-center py-12 text-slate-400 text-sm">
          <i className="fa-solid fa-spinner fa-spin mr-2"></i> Loading articles...
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-slate-400 text-sm">
          <i className="fa-solid fa-magnifying-glass mr-2"></i> No articles found for your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map(post => (
            <article
              key={post.id}
              className="glass-dashboard-card rounded-2xl overflow-hidden hover-lift flex flex-col"
            >
              {/* Cover image / placeholder */}
              <div className="h-36 bg-gradient-to-br from-brand-900 to-[#041f14] flex items-center justify-center relative overflow-hidden">
                {post.cover_image ? (
                  <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
                ) : (
                  <>
                    <i className="fa-solid fa-newspaper text-brand-700 text-6xl"></i>
                    <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
                      {post.tags && post.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="bg-brand-900/80 border border-brand-700 text-brand-400 text-[9px] font-black uppercase px-2 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Card content */}
              <div className="p-5 flex flex-col flex-1 space-y-3">
                <div className="flex items-center space-x-2 text-[10px] text-slate-500">
                  <i className="fa-regular fa-calendar"></i>
                  <span>{formatDate(post.created_at)}</span>
                  <span>·</span>
                  <i className="fa-regular fa-user"></i>
                  <span>{post.author}</span>
                </div>
                <h2 className="text-white font-black text-sm leading-snug line-clamp-2">{post.title}</h2>
                <p className="text-slate-400 text-xs leading-relaxed line-clamp-3 flex-1">{post.summary}</p>

                <button
                  onClick={() => onNavigate && onNavigate(`blog-${post.slug}`)}
                  className="self-start text-brand-400 hover:text-brand-300 text-xs font-bold flex items-center space-x-1 transition mt-auto"
                >
                  <span>Read Full Guide</span>
                  <i className="fa-solid fa-arrow-right text-[10px]"></i>
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* ── NEWSLETTER CTA ─────────────────────────── */}
      <section className="glass-dashboard-card rounded-3xl p-7 text-center">
        <i className="fa-solid fa-envelope-open-text text-brand-400 text-3xl mb-3"></i>
        <h2 className="text-lg font-black text-white mb-2">Get Subsidy Alerts on WhatsApp</h2>
        <p className="text-slate-400 text-sm mb-5">
          We notify registered farmers when new subsidy schemes open. Free service.
        </p>
        <a
          href="https://wa.me/919489528432?text=Please add me to the subsidy alert list."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-2.5 rounded-xl transition hover-lift"
        >
          <i className="fa-brands fa-whatsapp"></i>
          <span>Subscribe via WhatsApp</span>
        </a>
      </section>

    </div>
  );
}
