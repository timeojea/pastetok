'use client';

import type { Metadata } from 'next';
import { useState, FormEvent } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || 'Erreur inconnue.');
        setStatus('error');
        return;
      }
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setErrorMsg('Erreur réseau. Réessayez.');
      setStatus('error');
    }
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">Contact</h1>
      <p className="text-gray-400 text-sm mb-8">
        Une question, un problème ou un partenariat ? Envoyez-nous un message.
      </p>

      {status === 'success' ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl bg-green-900/20 border border-green-800 p-8 text-center">
          <CheckCircle className="h-10 w-10 text-green-400" />
          <p className="text-white font-semibold">Message envoyé !</p>
          <p className="text-sm text-gray-400">Nous vous répondrons dans les plus brefs délais.</p>
          <button
            onClick={() => setStatus('idle')}
            className="mt-2 text-sm text-brand-400 hover:text-brand-300 underline"
          >
            Envoyer un autre message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Nom <span className="text-brand-500">*</span>
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-xl bg-gray-900 border border-gray-700 text-white placeholder-gray-500 px-4 py-3 text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
              placeholder="Votre nom"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Email <span className="text-brand-500">*</span>
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-xl bg-gray-900 border border-gray-700 text-white placeholder-gray-500 px-4 py-3 text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
              placeholder="vous@exemple.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Message <span className="text-brand-500">*</span>
            </label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full rounded-xl bg-gray-900 border border-gray-700 text-white placeholder-gray-500 px-4 py-3 text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all resize-none"
              placeholder="Votre message…"
            />
          </div>

          {status === 'error' && (
            <div className="flex items-center gap-2 rounded-lg bg-red-900/20 border border-red-800 px-4 py-3 text-sm text-red-400">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold py-3 text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Envoi…</>
            ) : (
              <><Send className="h-4 w-4" /> Envoyer</>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
