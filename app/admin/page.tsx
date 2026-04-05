'use client';

import { useState, useEffect } from 'react';
import { BarChart3, Download, TrendingUp, Lock, Loader2 } from 'lucide-react';

interface StatsData {
  total: number;
  byType: { downloadType: string; _count: number }[];
  dailyCounts: { date: string; count: number }[];
  days: number;
}

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function fetchStats(pwd: string) {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/stats?days=30', {
        headers: { Authorization: `Bearer ${pwd}` },
      });
      if (res.status === 401) {
        setError('Mot de passe incorrect.');
        return;
      }
      const data = await res.json();
      setStats(data);
      setAuthed(true);
    } catch {
      setError('Erreur réseau.');
    } finally {
      setLoading(false);
    }
  }

  if (!authed) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="w-full max-w-sm rounded-2xl bg-gray-900 border border-gray-800 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Lock className="h-5 w-5 text-brand-400" />
            <h1 className="text-white font-bold">Admin Dashboard</h1>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchStats(password)}
            placeholder="Mot de passe admin"
            className="w-full rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 px-4 py-3 text-sm mb-3 focus:outline-none focus:border-brand-500"
          />
          {error && <p className="text-red-400 text-xs mb-3">{error}</p>}
          <button
            onClick={() => fetchStats(password)}
            disabled={loading}
            className="w-full rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold py-3 text-sm flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
            Accéder
          </button>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center gap-3 mb-8">
        <BarChart3 className="h-7 w-7 text-brand-400" />
        <h1 className="text-2xl font-bold text-white">Dashboard Admin</h1>
        <span className="text-xs text-gray-500 ml-auto">30 derniers jours</span>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="rounded-2xl bg-gray-900 border border-gray-800 p-5">
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
            <Download className="h-4 w-4" /> Total téléchargements
          </div>
          <p className="text-3xl font-black text-white">{stats.total.toLocaleString()}</p>
        </div>
        {stats.byType.map((t) => (
          <div key={t.downloadType} className="rounded-2xl bg-gray-900 border border-gray-800 p-5">
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
              <TrendingUp className="h-4 w-4" /> {t.downloadType}
            </div>
            <p className="text-3xl font-black text-white">{Number(t._count).toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* Daily chart (simple text table) */}
      <div className="rounded-2xl bg-gray-900 border border-gray-800 p-5">
        <h2 className="text-white font-semibold mb-4 text-sm">Téléchargements par jour</h2>
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {stats.dailyCounts.map((d) => (
            <div key={d.date} className="flex items-center gap-3 text-xs">
              <span className="text-gray-400 w-24 flex-shrink-0">{d.date}</span>
              <div className="flex-1 bg-gray-800 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-brand-500 rounded-full"
                  style={{
                    width: `${Math.min(100, (Number(d.count) / Math.max(...stats.dailyCounts.map((x) => Number(x.count)))) * 100)}%`,
                  }}
                />
              </div>
              <span className="text-gray-300 w-8 text-right">{Number(d.count)}</span>
            </div>
          ))}
          {stats.dailyCounts.length === 0 && (
            <p className="text-gray-500 text-xs">Aucune donnée pour cette période.</p>
          )}
        </div>
      </div>
    </div>
  );
}
