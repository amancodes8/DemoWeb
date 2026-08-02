import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Compass, Sparkles } from 'lucide-react';
import Hero3DCanvas from '../components/three/Hero3DCanvas';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center pt-24 pb-16 px-4 relative overflow-hidden">
      <div className="max-w-xl w-full text-center space-y-8 relative z-10 glass-panel p-10 rounded-3xl border border-amber-500/30 shadow-2xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest">
          <Compass className="w-4 h-4 text-amber-400" />
          <span>404 Lost Allocation</span>
        </div>

        <h1 className="font-serif-luxury text-6xl sm:text-8xl font-black text-gold-gradient tracking-tight">
          404
        </h1>

        <div className="space-y-2">
          <h2 className="font-serif-luxury text-xl font-bold text-white">
            Unregistered Coordinate
          </h2>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
            The private vault page or bespoke allocation you are searching for does not exist in our Geneva registry.
          </p>
        </div>

        <div className="h-44 w-full">
          <Hero3DCanvas />
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-amber-500 text-zinc-950 font-bold text-xs uppercase tracking-widest shadow-xl hover:bg-amber-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Atelier Safety
        </Link>
      </div>
    </div>
  );
}
