import { useEffect, useState } from 'react';
import { Copy, Trash2, X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import DashboardLayout from '../components/DashboardLayout';
import DashboardHome from '../components/DashboardHome';
import ProposalGenerator from '../components/ProposalGenerator';
import ProfileAnalyzer from './ProfileAnalyzer';
import SeoOptimizer from './SeoOptimizer';
import { deleteHistoryApi, getDashboardStatsApi, getHistoryApi, getUserProfileApi } from '../services/api';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('home');
  const [stats, setStats] = useState(null);
  const [history, setHistory] = useState([]);
  const [profile, setProfile] = useState(null);
  const [selected, setSelected] = useState(null);
  const [upgradeOpen, setUpgradeOpen] = useState(false);

  const refresh = async () => {
    try {
      const [nextStats, nextHistory, nextProfile] = await Promise.all([getDashboardStatsApi(), getHistoryApi(), getUserProfileApi()]);
      setStats(nextStats); setHistory(nextHistory); setProfile(nextProfile);
    } catch (error) { toast.error(error.message); }
  };
  useEffect(() => { refresh(); }, []);
  const onRateLimit = () => setUpgradeOpen(true);
  const remove = async (id) => { try { await deleteHistoryApi(id); setHistory((items) => items.filter((item) => item.id !== id)); setSelected(null); toast.success('Deleted'); refresh(); } catch (error) { toast.error(error.message); } };
  const copy = async () => { await navigator.clipboard.writeText(selected.output); toast.success('Copied!'); };
  const content = activeTab === 'profile' ? <ProfileAnalyzer onRateLimit={onRateLimit} onComplete={refresh} />
    : activeTab === 'seo' ? <SeoOptimizer onRateLimit={onRateLimit} onComplete={refresh} />
    : activeTab === 'proposal' ? <ProposalGenerator onRateLimit={onRateLimit} onComplete={refresh} />
    : activeTab === 'history' ? <HistoryList history={history} onView={setSelected} onDelete={remove} />
    : activeTab === 'pricing' ? <Pricing />
    : activeTab === 'account' ? <Account profile={profile} />
    : <DashboardHome setActiveTab={setActiveTab} userName={profile?.name || 'Freelancer'} stats={stats} recentHistory={history.slice(0, 3)} loading={!stats} />;
  return <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab} userName={profile?.name || 'Freelancer'} plan={profile?.plan || stats?.plan}>{content}
    {selected && <div className="fixed inset-0 z-[60] grid place-items-center bg-slate-950/50 p-4"><div role="dialog" aria-modal="true" className="max-h-[90vh] w-full max-w-2xl overflow-auto rounded-3xl bg-white p-6 shadow-2xl"><div className="flex justify-between"><h2 className="text-xl font-bold">{selected.type}</h2><button aria-label="Close" onClick={() => setSelected(null)}><X /></button></div><pre className="mt-4 whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-sm text-slate-700">{selected.output}</pre><h3 className="mt-4 font-bold">Metadata</h3><pre className="mt-2 overflow-auto rounded-xl bg-slate-50 p-3 text-xs">{JSON.stringify(selected.metadata, null, 2)}</pre><button onClick={copy} className="mt-4 min-h-12 rounded-xl bg-indigo-600 px-4 font-bold text-white"><Copy className="mr-1 inline h-4 w-4" />Copy</button></div></div>}
    {upgradeOpen && <div className="fixed inset-0 z-[60] grid place-items-center bg-slate-950/50 p-4"><div className="w-full max-w-md rounded-3xl bg-white p-6 text-center shadow-2xl"><h2 className="text-2xl font-black">Upgrade to Pro</h2><p className="mt-2 text-slate-600">You have used all of your free generations.</p><button onClick={() => { setUpgradeOpen(false); setActiveTab('pricing'); }} className="mt-5 min-h-12 rounded-xl bg-purple-600 px-5 font-bold text-white">View plans</button><button onClick={() => setUpgradeOpen(false)} className="ml-2 min-h-12 px-4 font-bold text-slate-600">Close</button></div></div>}
  </DashboardLayout>;
}

function HistoryList({ history, onView, onDelete }) { return <section className="space-y-4"><h1 className="text-2xl font-black text-slate-900">History</h1>{history.length ? history.map((item) => <article key={item.id} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200"><div className="flex flex-wrap items-center justify-between gap-3"><div><span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">{item.type}</span><p className="mt-2 text-xs text-slate-500">{new Date(item.date).toLocaleString()}</p><p className="mt-2 text-sm text-slate-700">{item.output?.slice(0, 100)}</p></div><div className="flex gap-2"><button onClick={() => onView(item)} className="min-h-12 rounded-xl border px-4 font-bold text-indigo-600">View</button><button onClick={() => onDelete(item.id)} className="min-h-12 rounded-xl border border-rose-200 px-4 text-rose-600" aria-label="Delete"><Trash2 /></button></div></div></article>) : <div className="rounded-3xl bg-white py-20 text-center shadow-sm"><p className="text-lg font-bold">No history yet.</p><p className="mt-1 text-slate-500">Start generating to see your work here.</p></div>}</section>; }
function Pricing() { return <section className="space-y-7 text-slate-900"><div><p className="text-sm font-bold uppercase tracking-widest text-violet-600">Pricing</p><h1 className="mt-2 text-3xl font-black tracking-tight">Simple, transparent plans</h1><p className="mt-2 text-slate-600">Start with free daily generations or unlock unlimited access.</p></div><div className="grid gap-5 lg:grid-cols-2"><article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><p className="font-bold text-slate-500">Free Plan</p><p className="mt-4 text-4xl font-black">Free</p><p className="mt-2 text-slate-600">5 uses/day</p><button className="mt-7 min-h-12 w-full rounded-xl border border-violet-200 font-bold text-violet-700 transition hover:bg-violet-50">Current plan</button></article><article className="rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-700 p-7 text-white shadow-xl shadow-violet-300/40 transition hover:-translate-y-1 hover:shadow-2xl"><p className="font-bold text-violet-100">Pro Plan</p><p className="mt-4 text-4xl font-black">$5<span className="text-base font-semibold text-violet-100">/month</span></p><p className="mt-2 text-violet-100">Unlimited access</p><button className="mt-7 min-h-12 w-full rounded-xl bg-white font-bold text-violet-700 transition hover:bg-violet-50">Upgrade to Pro</button></article></div><div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm"><table className="w-full min-w-[560px] border-collapse text-left text-sm"><thead className="bg-slate-50 text-slate-900"><tr><th className="border-b border-slate-200 p-4 font-bold">Feature</th><th className="border-b border-slate-200 p-4 font-bold">Free</th><th className="border-b border-slate-200 p-4 font-bold">Pro</th></tr></thead><tbody><tr><td className="border-b border-slate-100 p-4 font-semibold">AI generations</td><td className="border-b border-slate-100 p-4">5 per day</td><td className="border-b border-slate-100 p-4">Unlimited</td></tr><tr><td className="p-4 font-semibold">History</td><td className="p-4">Basic</td><td className="p-4">Full history</td></tr></tbody></table></div></section>; }
function Account({ profile }) { return <section className="rounded-3xl bg-white p-6 shadow-sm"><h1 className="text-2xl font-black">Profile</h1>{profile && <dl className="mt-5 space-y-3 text-slate-700"><div><dt className="text-xs font-bold uppercase">Name</dt><dd>{profile.name}</dd></div><div><dt className="text-xs font-bold uppercase">Email</dt><dd>{profile.email}</dd></div><div><dt className="text-xs font-bold uppercase">Plan</dt><dd><span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-800">{profile.plan}</span></dd></div><div><dt className="text-xs font-bold uppercase">Join date</dt><dd>{profile.join_date}</dd></div></dl>}</section>; }
