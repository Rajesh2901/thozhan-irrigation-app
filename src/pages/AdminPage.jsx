import React, { useState, useEffect } from 'react';
import { getQuotes } from '../utils/api';

const MOCK_LEADS = [
  { id: 1, farmer_name: 'Murugesan K.', phone_number: '9876543210', district: 'Dindigul', land_size_acres: 3, subsidy_percent: 100, farmer_contribution: 0, estimated_project_cost: 73500, status: 'APPROVED', created_at: '2025-07-01T09:00:00Z' },
  { id: 2, farmer_name: 'Selvam T.', phone_number: '8765432109', district: 'Karur', land_size_acres: 8, subsidy_percent: 75, farmer_contribution: 36400, estimated_project_cost: 145600, status: 'PENDING', created_at: '2025-07-10T12:00:00Z' },
  { id: 3, farmer_name: 'Lakshmi Bai', phone_number: '9654321098', district: 'Madurai', land_size_acres: 1.5, subsidy_percent: 100, farmer_contribution: 0, estimated_project_cost: 36750, status: 'COMPLETED', created_at: '2025-06-20T11:00:00Z' },
];

const STATUS_COLOR = {
  PENDING:   'bg-yellow-400/10 text-yellow-300 border-yellow-400/30',
  APPROVED:  'bg-blue-400/10 text-blue-300 border-blue-400/30',
  COMPLETED: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/30',
  REJECTED:  'bg-red-400/10 text-red-300 border-red-400/30',
};

export default function AdminPage({ isAdmin }) {
  const [leads, setLeads]         = useState([]);
  const [statusFilter, setFilter] = useState('ALL');
  const [search, setSearch]       = useState('');
  const [loading, setLoading]     = useState(false);

  useEffect(() => {
    document.title = 'Admin Dashboard — Thozhan Irrigation';
    if (!isAdmin) return;

    setLoading(true);
    getQuotes().then(data => {
      if (data && data.length > 0) setLeads(data);
      else setLeads(MOCK_LEADS);
    }).catch(() => setLeads(MOCK_LEADS)).finally(() => setLoading(false));
  }, [isAdmin]);

  if (!isAdmin) {
    return (
      <div className="glass-dashboard-card rounded-2xl p-12 text-center space-y-4">
        <i className="fa-solid fa-lock text-slate-600 text-5xl"></i>
        <h2 className="text-white font-black text-xl">Admin Access Required</h2>
        <p className="text-slate-400 text-sm">Click the Admin Portal button in the sidebar to authenticate.</p>
      </div>
    );
  }

  const filtered = leads.filter(l => {
    const matchStatus = statusFilter === 'ALL' || l.status === statusFilter;
    const matchSearch = !search ||
      l.farmer_name.toLowerCase().includes(search.toLowerCase()) ||
      l.district.toLowerCase().includes(search.toLowerCase()) ||
      l.phone_number.includes(search);
    return matchStatus && matchSearch;
  });

  const stats = {
    total:     leads.length,
    pending:   leads.filter(l => l.status === 'PENDING').length,
    approved:  leads.filter(l => l.status === 'APPROVED').length,
    completed: leads.filter(l => l.status === 'COMPLETED').length,
    totalSubsidy: leads.reduce((s, l) => s + (Number(l.estimated_project_cost) - Number(l.farmer_contribution)), 0),
  };

  return (
    <div className="space-y-8">

      {/* ── ADMIN HEADER ─────────────────────────── */}
      <section className="glass-dashboard-card rounded-3xl p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-amber-400 text-xs font-black uppercase tracking-widest mb-1 block">Admin Panel</span>
          <h1 className="text-2xl font-black text-white">Lead Management Dashboard</h1>
          <p className="text-slate-400 text-xs mt-1">All farmer subsidy quote requests ingested via the website calculator</p>
        </div>
        <span className="inline-flex items-center space-x-2 bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold px-3 py-2 rounded-xl">
          <i className="fa-solid fa-user-shield"></i>
          <span>Admin Mode Active</span>
        </span>
      </section>

      {/* ── STATS STRIP ──────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Leads',    value: stats.total,     icon: 'fa-users',             color: 'text-white' },
          { label: 'Pending Review', value: stats.pending,   icon: 'fa-hourglass-half',    color: 'text-yellow-300' },
          { label: 'Approved',       value: stats.approved,  icon: 'fa-circle-check',      color: 'text-blue-300' },
          { label: 'Completed',      value: stats.completed, icon: 'fa-flag-checkered',    color: 'text-emerald-300' },
        ].map((s, i) => (
          <div key={i} className="glass-dashboard-card rounded-2xl p-5 text-center">
            <i className={`fa-solid ${s.icon} ${s.color} text-2xl mb-2`}></i>
            <p className={`font-black text-2xl ${s.color}`}>{s.value}</p>
            <p className="text-slate-500 text-xs">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ── LEAD TABLE ───────────────────────────── */}
      <div className="glass-dashboard-card rounded-2xl overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-brand-900 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[180px]">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs"></i>
            <input
              type="text" placeholder="Search farmer, district..."
              value={search} onChange={e => setSearch(e.target.value)}
              className="w-full bg-brand-950/80 border border-brand-800 rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition"
            />
          </div>
          <div className="flex gap-2">
            {['ALL', 'PENDING', 'APPROVED', 'COMPLETED', 'REJECTED'].map(s => (
              <button key={s} onClick={() => setFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition btn-press ${
                  statusFilter === s ? 'bg-brand-600 text-white' : 'text-slate-400 border border-brand-800 hover:text-white'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="p-10 text-center text-slate-400 text-sm">
            <i className="fa-solid fa-spinner fa-spin mr-2"></i> Loading leads...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-brand-900 text-slate-500 uppercase tracking-wider">
                  {['#', 'Farmer', 'District', 'Phone', 'Acres', 'Cost', 'Subsidy%', 'Your Contribution', 'Status', 'Date'].map(h => (
                    <th key={h} className="px-4 py-3 text-left font-bold whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead, i) => (
                  <tr key={lead.id} className={`border-b border-brand-900/50 hover:bg-brand-900/30 transition ${i % 2 === 0 ? '' : 'bg-brand-950/20'}`}>
                    <td className="px-4 py-3 text-slate-500">#{lead.id}</td>
                    <td className="px-4 py-3 text-white font-semibold whitespace-nowrap">{lead.farmer_name}</td>
                    <td className="px-4 py-3 text-slate-300">{lead.district}</td>
                    <td className="px-4 py-3">
                      <a href={`tel:${lead.phone_number}`} className="text-brand-400 hover:text-brand-300">{lead.phone_number}</a>
                    </td>
                    <td className="px-4 py-3 text-slate-300">{lead.land_size_acres}</td>
                    <td className="px-4 py-3 text-slate-300">₹{Number(lead.estimated_project_cost).toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold ${lead.subsidy_percent === 100 ? 'text-emerald-300 border-emerald-400/30' : 'text-yellow-300 border-yellow-400/30'}`}>
                        {lead.subsidy_percent}%
                      </span>
                    </td>
                    <td className="px-4 py-3 font-bold">
                      <span className={Number(lead.farmer_contribution) === 0 ? 'text-emerald-400' : 'text-yellow-300'}>
                        ₹{Number(lead.farmer_contribution).toLocaleString()}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold ${STATUS_COLOR[lead.status] || 'text-slate-400'}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                      {new Date(lead.created_at).toLocaleDateString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <div className="py-10 text-center text-slate-500 text-sm">
                No leads matching your filters.
              </div>
            )}
          </div>
        )}

        {/* Summary Footer */}
        <div className="p-4 border-t border-brand-900 text-xs text-slate-500 flex flex-wrap gap-4">
          <span>Total Subsidy Assisted: <strong className="text-emerald-400">₹{stats.totalSubsidy.toLocaleString()}</strong></span>
          <span>Showing <strong className="text-white">{filtered.length}</strong> of <strong className="text-white">{leads.length}</strong> records</span>
        </div>
      </div>

    </div>
  );
}
