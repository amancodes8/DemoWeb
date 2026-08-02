import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Award, Palette, Eye, ChevronDown, CheckCircle2, Star, Mail, Compass } from 'lucide-react';
import Hero3DCanvas from '../components/three/Hero3DCanvas';
import ExplodedCigarette3D from '../components/three/ExplodedCigarette3D';
import ExpressCard from '../components/cards/ExpressCard';
import { useStore } from '../store/useStore';

export default function Home() {
  const { products } = useStore();
  const [explodeProgress, setExplodeProgress] = useState(0.4);
  const [selectedQuickProduct, setSelectedQuickProduct] = useState(null);

  const featuredProducts = products.filter((p) => p.isFeatured);

  return (
    <div className="min-h-screen bg-zinc-950 text-white overflow-hidden">
      
      {/* CANVA HERO SECTION - "THE ART OF DISTINCTION" */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        
        {/* Backlit Spotlight Ambient Beam behind 3D Product */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-gradient-to-tr from-amber-500/20 via-amber-300/10 to-transparent blur-[170px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          
          {/* Left Text Content */}
          <div className="space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel-gold border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Volute Bespoke Atelier • Geneva 2026</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight"
            >
              THE ART OF <br />
              <span className="text-gold-gradient">DISTINCTION</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans-luxury"
            >
              Master-crafted tobacco and botanical creations encased in 24K edible gold leaf filigree, Japanese silk filtration, and architectural 3D precision.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
            >
              <Link
                to="/product/volute-gold-leaf-no1"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-zinc-950 font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-105 transition-all duration-300"
              >
                <Palette className="w-4 h-4" /> Launch 3D Studio
              </Link>
              <Link
                to="/products"
                className="px-8 py-4 rounded-full glass-panel border border-white/15 text-zinc-200 hover:text-white hover:border-amber-500/40 text-xs font-bold uppercase tracking-widest transition-all duration-300"
              >
                Explore Collection
              </Link>
            </motion.div>
          </div>

          {/* Right 3D Floating Hero Model */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-[500px] lg:h-[600px] w-full relative"
          >
            <Hero3DCanvas />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500 text-[10px] uppercase tracking-widest animate-bounce">
          <span>Scroll to Explore Distinction</span>
          <ChevronDown className="w-4 h-4 text-amber-400" />
        </div>
      </section>

      {/* CANVA SECTION 1 - "CRAFT EXCELLENCE" */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-serif-luxury text-amber-400 tracking-[0.3em] uppercase block">
            Uncompromising Standards
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white">
            CRAFT <span className="text-gold-gradient">EXCELLENCE</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-panel p-8 rounded-3xl border border-zinc-800 hover:border-amber-500/40 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-serif-luxury font-bold text-xl">
              24K
            </div>
            <h3 className="font-serif-luxury text-lg font-bold text-white">24K Edible Gold Foil</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Precision-embossed filigree gold leaf regulates burn temperature while elevating aesthetics to an Awwwards-worthy standard.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-zinc-800 hover:border-amber-500/40 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-serif-luxury font-bold text-xl">
              Silk
            </div>
            <h3 className="font-serif-luxury text-lg font-bold text-white">Japanese Silk Core</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Triple-stage natural silk fibers combined with active coconut charcoal granules ensure an extraordinarily smooth airflow.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-zinc-800 hover:border-amber-500/40 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-serif-luxury font-bold text-xl">
              Leaf
            </div>
            <h3 className="font-serif-luxury text-lg font-bold text-white">Aged Virginia Bright</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Hand-harvested from high-altitude micro-estates and sun-cured for 36 months in cedar casks for peak flavor harmony.
            </p>
          </div>
        </div>
      </section>

      {/* CANVA SECTION 2 - "THE TASTE OF PURITY" */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-900/50 border-y border-amber-500/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="h-[450px] rounded-3xl overflow-hidden glass-panel border border-amber-500/30 relative">
            <img
              src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=800&auto=format&fit=crop"
              alt="Taste of Purity"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl glass-panel text-xs text-amber-300">
              <span className="font-serif-luxury font-bold uppercase tracking-wider block">Geneva Laboratory Test</span>
              <span className="text-zinc-400">Zero synthetic additives • Pure botanical infusion</span>
            </div>
          </div>

          <div className="space-y-6">
            <span className="text-xs font-serif-luxury text-amber-400 tracking-[0.3em] uppercase block">
              Purity Protocol
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white leading-tight">
              THE TASTE OF <br />
              <span className="text-gold-gradient">PURITY</span>
            </h2>
            <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
              Engineered with zero artificial humectants or synthetic glues. Unbleached organic hemp paper meets pure mountain botanical extracts for a clean draw.
            </p>

            <ul className="space-y-3 text-xs text-zinc-300">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>10-Minute Express Delivery in Mumbai & Bengaluru</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>24K Gold Foil Micro-Encapsulation Technology</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Certified Sustainable Botanical Terpene Blends</span>
              </li>
            </ul>

            <Link
              to="/products"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-amber-500 text-zinc-950 font-bold text-xs uppercase tracking-widest hover:bg-amber-400 transition-colors"
            >
              Explore Cigarettes <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CANVA SECTION 3 - "MAKE IT YOURS" 3D CUSTOMIZER */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 border-b border-amber-500/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-serif-luxury text-amber-400 tracking-[0.3em] uppercase block">
              Bespoke Monogram Customization
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white leading-tight">
              MAKE IT <br />
              <span className="text-gold-gradient">YOURS</span>
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Design your custom filter geometry, 24K gold foil bands, leather casing texture, and laser-engraved monogram initials with instant WebGL 3D preview.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-amber-500 text-zinc-950 font-bold text-xs uppercase tracking-widest shadow-xl hover:bg-amber-400 transition-colors"
              >
                Explore Collection <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/brand/login"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full glass-panel border border-amber-500/40 text-amber-300 font-bold text-xs uppercase tracking-widest hover:bg-zinc-900 transition-colors"
              >
                Brand Design Studio <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="h-[450px] rounded-3xl glass-panel-gold border border-amber-500/30 overflow-hidden relative p-8 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] uppercase text-amber-400 font-bold tracking-widest">Monogram Studio</span>
              <h3 className="font-serif-luxury text-xl font-bold text-white">Live 3D Shader Rendering</h3>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop"
                alt="3D Customizer"
                className="max-h-64 rounded-2xl object-cover shadow-2xl border border-amber-500/30"
              />
            </div>
            <div className="flex justify-between items-center text-xs text-amber-300">
              <span>Interactive Controls</span>
              <span className="font-bold">Realtime WebGL</span>
            </div>
          </div>
        </div>
      </section>

      {/* CANVA SECTION 4 - "HERITAGE STATEMENT" BLOCK */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative bg-zinc-950 overflow-hidden text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-zinc-950 to-zinc-950 pointer-events-none" />
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <Sparkles className="w-10 h-10 text-amber-400 mx-auto animate-pulse" />
          <span className="text-xs font-serif-luxury text-amber-400 uppercase tracking-[0.35em] block">
            The Volute Philosophy
          </span>
          <blockquote className="font-serif-luxury text-2xl sm:text-4xl font-extrabold text-white leading-relaxed italic">
            "We do not simply craft allocations; we engineer architectural moments of distinction."
          </blockquote>
          <p className="text-xs text-zinc-400 uppercase tracking-widest">
            — Geneva Master Atelier • Est. 1924
          </p>
        </div>
      </section>

      {/* CANVA SECTION 5 - EXPLODED 3D ARCHITECTURE */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 border-t border-amber-500/10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-serif-luxury text-amber-400 tracking-[0.3em] uppercase block">
            Deconstructed 3D Mechanics
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white">
            ARCHITECTURAL <span className="text-gold-gradient">DECONSTRUCTION</span>
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm">
            Interactive scroll engine separating micro-components into exploded 3D layers.
          </p>

          <div className="max-w-md mx-auto pt-4 flex items-center gap-4">
            <span className="text-xs font-semibold text-zinc-400 uppercase">Assembled</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={explodeProgress}
              onChange={(e) => setExplodeProgress(parseFloat(e.target.value))}
              className="flex-1 accent-amber-400 bg-zinc-900 rounded-lg cursor-pointer"
            />
            <span className="text-xs font-semibold text-amber-400 uppercase">Exploded</span>
          </div>
        </div>

        <div className="h-[550px] w-full glass-panel rounded-3xl border border-amber-500/20 shadow-2xl relative overflow-hidden">
          <ExplodedCigarette3D explodeProgress={explodeProgress} />
        </div>
      </section>

      {/* CANVA SECTION 6 - "THE SELECTION" */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="text-xs font-serif-luxury text-amber-400 tracking-[0.3em] uppercase block">
              Privé Collection
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white">
              THE <span className="text-gold-gradient">SELECTION</span>
            </h2>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 tracking-widest uppercase"
          >
            View Full Collection <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ExpressCard
              key={product.id}
              product={product}
              onQuickView={(p) => setSelectedQuickProduct(p)}
            />
          ))}
        </div>
      </section>

      {/* CANVA SECTION 7 - "JOIN THE CIRCLE" NEWSLETTER REGISTRY */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-6">
        <div className="glass-panel-gold p-10 rounded-3xl border border-amber-500/30 shadow-2xl space-y-6">
          <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500 text-amber-400 flex items-center justify-center mx-auto">
            <Mail className="w-6 h-6" />
          </div>
          <div className="space-y-2 max-w-xl mx-auto">
            <h3 className="font-serif-luxury text-2xl font-bold text-white uppercase tracking-wider">
              JOIN THE VOLUTE <span className="text-gold-gradient">CIRCLE</span>
            </h3>
            <p className="text-xs text-zinc-300">
              Request private invitations to limited-edition 24K gold allocations and bespoke releases.
            </p>
          </div>

          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address..."
              required
              className="flex-1 bg-zinc-950 border border-zinc-800 text-xs text-white rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-amber-500 text-zinc-950 font-bold text-xs uppercase shrink-0"
            >
              Request Access
            </button>
          </form>
        </div>
      </section>

      {/* QUICK VIEW MODAL */}
      {selectedQuickProduct && (
        <div className="fixed inset-0 z-50 bg-zinc-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-amber-500/30 rounded-3xl max-w-2xl w-full p-6 space-y-6 relative shadow-2xl text-xs">
            <div className="flex justify-between items-center">
              <h3 className="font-serif-luxury text-lg font-bold text-gold-gradient">
                {selectedQuickProduct.name}
              </h3>
              <button onClick={() => setSelectedQuickProduct(null)} className="text-zinc-400 hover:text-white">
                Close
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <img
                src={selectedQuickProduct.image}
                alt={selectedQuickProduct.name}
                className="rounded-2xl h-56 w-full object-cover"
              />
              <div className="space-y-3">
                <p className="text-zinc-300">{selectedQuickProduct.description}</p>
                <div className="space-y-1 text-zinc-400">
                  <div><strong className="text-white">Blend:</strong> {selectedQuickProduct.blend}</div>
                  <div><strong className="text-white">Packaging:</strong> {selectedQuickProduct.packaging}</div>
                  <div><strong className="text-white">Price:</strong> ${selectedQuickProduct.price.toFixed(2)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
