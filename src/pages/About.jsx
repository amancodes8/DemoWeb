import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, Award, Globe, Heart, Compass } from 'lucide-react';

export default function About() {
  const milestones = [
    { year: '1924', title: 'Atelier Founded in Geneva', desc: 'Established as a private custom blend house for European nobility and connoisseurs.' },
    { year: '1968', title: '24K Gold Foil Innovation', desc: 'Pioneered edible 24K gold foil micro-encapsulation for thermal regulation.' },
    { year: '2012', title: 'Botanical Reserve Program', desc: 'Introduced zero-pesticide organic lavender, mint, and damiana botanical blends.' },
    { year: '2026', title: 'Interactive 3D Bespoke Atelier', desc: 'Launched Awwwards-grade WebGL 3D configurator for global private clients.' },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Heritage & Philosophy</span>
          </div>
          <h1 className="font-serif-luxury text-4xl sm:text-6xl font-bold text-white">
            The Legacy of <span className="text-gold-gradient">Aura Royale</span>
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
            A century of uncompromising luxury, architectural 3D precision, and ethical botanical craftsmanship.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="font-serif-luxury text-3xl font-bold text-white">
              Bespoke Crafting <br />
              <span className="text-gold-gradient">Since 1924</span>
            </h2>
            <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-sans-luxury">
              Founded on the pristine shores of Lake Geneva, AURA ROYALE was established to redefine tobacco into a high-art form. Combining century-old sun-curing traditions with modern 3D CAD modeling, every cigarette box is an engineered masterpiece.
            </p>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Our leaf blends are selected exclusively from high-altitude micro-farms, paired with Japanese silk filtration and 24K gold foil bands applied by hand in our Zurich and Geneva laboratories.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 text-xs">
              <div className="glass-panel p-4 rounded-2xl border border-amber-500/20">
                <span className="font-serif-luxury text-2xl font-bold text-gold-gradient block">100%</span>
                <span className="text-zinc-400">Certified Organic Leaves</span>
              </div>
              <div className="glass-panel p-4 rounded-2xl border border-amber-500/20">
                <span className="font-serif-luxury text-2xl font-bold text-gold-gradient block">24K</span>
                <span className="text-zinc-400">Edible Gold Leaf Foil</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden glass-panel border border-amber-500/30 shadow-2xl relative h-[450px]">
            <img
              src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=800&auto=format&fit=crop"
              alt="Atelier Heritage"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl glass-panel text-xs text-amber-300">
              <span className="font-serif-luxury font-bold uppercase tracking-wider block">Geneva Master Lab</span>
              <span className="text-zinc-400">Hand-assembling bespoke gold allocations</span>
            </div>
          </div>
        </div>

        {/* Timeline Grid */}
        <div className="space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-serif-luxury text-amber-400 uppercase tracking-widest">Chronology</span>
            <h2 className="font-serif-luxury text-3xl font-bold text-white">Century Timeline</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m) => (
              <div key={m.year} className="glass-panel p-6 rounded-2xl border border-zinc-800 space-y-3">
                <span className="font-serif-luxury text-3xl font-extrabold text-gold-gradient">{m.year}</span>
                <h4 className="font-serif-luxury text-sm font-bold text-white">{m.title}</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
