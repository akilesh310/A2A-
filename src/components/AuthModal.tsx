import React, { useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { AlertCircle, LoaderCircle, LogIn, UserPlus, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { auth } from '../firebase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<'sign-in' | 'sign-up'>('sign-in');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const friendlyError = (value: unknown) => {
    const code = (value as { code?: string }).code;
    if (code === 'auth/invalid-credential') return 'Incorrect email or password.';
    if (code === 'auth/email-already-in-use') return 'An account already uses this email.';
    if (code === 'auth/weak-password') return 'Use a password with at least 6 characters.';
    if (code === 'auth/popup-closed-by-user') return 'Google sign-in was cancelled.';
    if (code === 'auth/operation-not-allowed') return 'Email/password sign-in is disabled in Firebase. Enable it in Firebase Console → Authentication → Sign-in method.';
    if (code === 'auth/configuration-not-found') return 'Firebase Authentication is not initialized for this project. In Firebase Console, open Authentication, click Get started, then enable Email/Password.';
    if (code === 'auth/unauthorized-domain') return 'This site is not authorized for Google sign-in. Add this domain in Firebase Console → Authentication → Settings → Authorized domains.';
    if (code === 'auth/invalid-api-key') return 'Firebase rejected this app configuration. Verify the web API key in Firebase Console → Project settings.';
    if (code === 'auth/network-request-failed') return 'Firebase could not be reached. Check your internet connection and try again.';
    const message = (value as { message?: string }).message;
    return message ? `Firebase error: ${message.replace(/^Firebase:\s*/i, '')}` : 'We could not sign you in. Please try again.';
  };

  const handleEmailAuth = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'sign-up') {
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        if (name.trim()) await updateProfile(credential.user, { displayName: name.trim() });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onClose();
    } catch (reason) {
      setError(friendlyError(reason));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      onClose();
    } catch (reason) {
      setError(friendlyError(reason));
    } finally {
      setLoading(false);
    }
  };

  return <AnimatePresence>{isOpen && (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} aria-label="Close sign in" className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <motion.section initial={{ opacity: 0, y: 18, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18, scale: 0.98 }} className="relative w-full max-w-md border border-white/10 bg-[#121212] p-7 shadow-2xl">
        <button onClick={onClose} className="absolute right-4 top-4 p-2 text-white/60 hover:text-white" aria-label="Close"><X className="w-5 h-5" /></button>
        <p className="font-jakarta text-[10px] font-bold tracking-[0.25em] text-[#D4AF37] uppercase">A2A account</p>
        <h2 className="mt-2 font-cinzel text-2xl text-white">{mode === 'sign-in' ? 'Welcome back' : 'Create your account'}</h2>
        <p className="mt-2 text-xs leading-relaxed text-gray-400">Sign in to save orders and view their live preparation status.</p>
        <button onClick={handleGoogle} disabled={loading} className="mt-6 flex w-full items-center justify-center gap-3 border border-white/20 bg-white py-3 text-xs font-bold text-black hover:bg-gray-100 disabled:opacity-60">
          <span className="text-base font-bold text-[#4285F4]">G</span> Continue with Google
        </button>
        <div className="my-5 flex items-center gap-3 text-[10px] uppercase tracking-widest text-gray-600"><span className="h-px flex-1 bg-white/10" />or<span className="h-px flex-1 bg-white/10" /></div>
        <form onSubmit={handleEmailAuth} className="space-y-3">
          {mode === 'sign-up' && <input required value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" className="w-full border border-white/15 bg-black/40 px-3.5 py-3 text-xs text-white outline-none focus:border-[#D4AF37]" />}
          <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address" className="w-full border border-white/15 bg-black/40 px-3.5 py-3 text-xs text-white outline-none focus:border-[#D4AF37]" />
          <input required minLength={6} type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password (min. 6 characters)" className="w-full border border-white/15 bg-black/40 px-3.5 py-3 text-xs text-white outline-none focus:border-[#D4AF37]" />
          {error && <p className="flex gap-2 text-xs text-red-300"><AlertCircle className="h-4 w-4 shrink-0" />{error}</p>}
          <button disabled={loading} className="flex w-full items-center justify-center gap-2 bg-[#D4AF37] py-3 text-xs font-bold uppercase tracking-wider text-black hover:bg-[#e2bd44] disabled:opacity-60">
            {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : mode === 'sign-in' ? <LogIn className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
            {mode === 'sign-in' ? 'Sign in with email' : 'Create account'}
          </button>
        </form>
        <button onClick={() => { setMode(mode === 'sign-in' ? 'sign-up' : 'sign-in'); setError(''); }} className="mt-5 w-full text-xs text-gray-400 hover:text-[#D4AF37]">
          {mode === 'sign-in' ? 'New to A2A? Create an account' : 'Already have an account? Sign in'}
        </button>
      </motion.section>
    </div>
  )}</AnimatePresence>;
};
