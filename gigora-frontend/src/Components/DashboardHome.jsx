import { FileText, History, Search, Sparkles, UserCheck } from 'lucide-react';

const actions = [
  { id: 'profile', label: 'Analyze Profile', icon: UserCheck, color: 'bg-blue-600' },
  { id: 'seo', label: 'Optimize Gig', icon: Search, color: 'bg-emerald-600' },
  { id: 'proposal', label: 'Generate Proposal', icon: FileText, color: 'bg-purple-600' },
];

export default function DashboardHome({ setActiveTab, userName = 'Freelancer', stats, recentHistory, loading }) {
  const statCards = [
    ['Total Proposals', stats?.total_proposals],
    ['SEO Optimizations', stats?.seo_optimizations],
    ['Profile Analyses', stats?.profile_analyses],
  ];

  return <div className="space-y-6 sm:space-y-8">
    <section className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 p-6 text-white shadow-xl sm:p-8">
      <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-emerald-300"><Sparkles className="h-3.5 w-3.5" /> AI workspace</span>
      <h1 className="mt-4 text-3xl font-extrabold">Welcome back, {userName}.</h1>
      <p className="mt-2 text-sm text-slate-300">Choose an action and turn your next client opportunity into a win.</p>
      <p className="mt-5 inline-flex rounded-xl bg-white/10 px-4 py-2 text-sm font-bold">{stats ? `${stats.remaining_uses} of 5 free uses remaining` : 'Loading usage…'}</p>
    </section>

    <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {statCards.map(([label, value]) => <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
        <p className="mt-2 text-3xl font-black text-slate-900">{loading ? <span className="block h-9 w-16 animate-pulse rounded bg-slate-100" /> : value ?? '—'}</p>
      </div>)}
    </section>

    <section><h2 className="mb-4 text-xl font-bold text-slate-900">Quick actions</h2><div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {actions.map(({ id, label, icon: Icon, color }) => <button key={id} onClick={() => setActiveTab(id)} className={`${color} flex min-h-28 items-center justify-center gap-3 rounded-2xl px-5 text-base font-bold text-white shadow-md transition hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-indigo-200`}><Icon className="h-6 w-6" />{label}</button>)}
    </div></section>

    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"><div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-bold text-slate-900">Recent history</h2><button onClick={() => setActiveTab('history')} className="min-h-12 text-sm font-bold text-indigo-600">View all</button></div>
      {recentHistory?.length ? <div className="space-y-3">{recentHistory.map((item) => <div key={item.id} className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 p-3"><div className="min-w-0"><p className="text-sm font-bold text-slate-800">{item.type}</p><p className="truncate text-xs text-slate-500">{item.output?.slice(0, 100)}</p></div><button onClick={() => setActiveTab('history')} className="min-h-12 shrink-0 text-sm font-bold text-indigo-600">View</button></div>)}</div> : <div className="py-8 text-center text-slate-500"><History className="mx-auto mb-2 h-8 w-8" /><p className="font-semibold">No history yet.</p><button onClick={() => setActiveTab('proposal')} className="mt-3 min-h-12 rounded-xl bg-indigo-600 px-4 text-sm font-bold text-white">Start Generating</button></div>}
    </section>
  </div>;
}
