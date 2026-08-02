import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, Key, Building2, ArrowRight } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function BrandLogin() {
  const navigate = useNavigate();
  const { loginBrand } = useStore();

  const [brandId, setBrandId] = useState('VOLUTE-PRIVE-01');
  const [brandName, setBrandName] = useState('VOLUTE PRIVÉ');

  const presetBrands = [
    { id: 'VOLUTE-PRIVE-01', name: 'VOLUTE PRIVÉ' },
    { id: 'VOLUTE-HERBAL-02', name: 'VOLUTE HERBAL' },
    { id: 'VOLUTE-MONARCH-03', name: 'VOLUTE MONARCH' },
    { id: 'VOLUTE-SOLSTICE-04', name: 'VOLUTE SOLSTICE' },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    loginBrand(brandId, brandName);
    navigate('/brand/dashboard');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center pt-28 pb-16 px-4">
      <div className="max-w-md w-full glass-panel p-8 rounded-3xl border border-amber-500/30 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Glow ambient background sphere */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 blur-[80px] rounded-full pointer-events-none" />

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-300 to-amber-600 p-[1px] mx-auto mb-3">
            <div className="w-full h-full bg-zinc-950 rounded-full flex items-center justify-center">
              <Building2 className="w-6 h-6 text-amber-400" />
            </div>
          </div>
          <span className="text-[10px] font-serif-luxury text-amber-400 uppercase tracking-widest block">
            Partner Portal
          </span>
          <h1 className="font-serif-luxury text-2xl font-bold text-white">
            Brand Partner Login
          </h1>
          <p className="text-xs text-zinc-400">
            Access your brand dashboard, manage specifications, and list new 3D creations.
          </p>
        </div>

        {/* Quick Select Brand Presets */}
        <div className="space-y-2">
          <label className="text-[10px] text-zinc-500 uppercase font-semibold block">Select Verified Brand</label>
          <div className="grid grid-cols-2 gap-2">
            {presetBrands.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => {
                  setBrandId(b.id);
                  setBrandName(b.name);
                }}
                className={`p-2 rounded-xl text-left border transition-all text-xs ${
                  brandId === b.id
                    ? 'border-amber-500 bg-amber-500/15 text-amber-300 font-bold'
                    : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white'
                }`}
              >
                <div className="truncate font-semibold">{b.name}</div>
                <div className="text-[9px] font-mono text-zinc-500">{b.id}</div>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="text-zinc-400 uppercase font-semibold block mb-1">Brand ID Key</label>
            <input
              type="text"
              required
              value={brandId}
              onChange={(e) => setBrandId(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 rounded-xl px-3.5 py-3 text-white font-mono focus:outline-none uppercase"
            />
          </div>

          <div>
            <label className="text-zinc-400 uppercase font-semibold block mb-1">Brand Display Name</label>
            <input
              type="text"
              required
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 rounded-xl px-3.5 py-3 text-white focus:outline-none uppercase"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-zinc-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 hover:scale-105 transition-all"
          >
            Enter Brand Studio <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
