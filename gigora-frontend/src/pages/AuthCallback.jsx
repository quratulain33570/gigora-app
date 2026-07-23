import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { supabase } from '../supabaseClient';

export default function AuthCallback() {
  const [state, setState] = useState('loading');
  useEffect(() => {
    let active = true;
    const finish = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session && active) setState('success');
      else if (active) setState('error');
    };
    finish();
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (active && session && ['SIGNED_IN', 'PASSWORD_RECOVERY'].includes(event)) setState('success');
    });
    return () => { active = false; listener.subscription.unsubscribe(); };
  }, []);
  if (state === 'success') return <Navigate to="/dashboard" replace state={{ verified: true }} />;
  return <main className="auth-page"><section className="auth-card text-center"><div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-violet-500/15 text-violet-200">{state === 'loading' ? <Loader2 className="animate-spin" /> : <CheckCircle2 />}</div><h1 className="mt-6 text-2xl font-black text-white">{state === 'loading' ? 'Completing sign-in' : 'This link has expired'}</h1><p className="mt-3 text-sm leading-6 text-slate-300">{state === 'loading' ? 'We’re securely confirming your session and opening your dashboard.' : 'Request a new verification email from the login screen, then open the latest link.'}</p>{state === 'error' && <a href="/login" className="auth-primary mt-7">Return to login</a>}</section></main>;
}
