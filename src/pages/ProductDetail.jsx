import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, ShoppingBag, Heart, Palette, Sparkles, ArrowRight, Rotate3d, CheckCircle2 } from 'lucide-react';
import ProductViewer3D from '../components/three/ProductViewer3D';
import { useStore } from '../store/useStore';
import ProductCard from '../components/cards/ProductCard';

export default function ProductDetail() {
  const { id } = useParams();
  const { products, addToCart, wishlist, toggleWishlist } = useStore();

  const product = products.find((p) => p.id === id) || products[0];
  const isWishlisted = product ? wishlist.includes(product.id) : false;

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'specs' | 'reviews'

  // Related products
  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Main Grid: 3D Viewer Left, Info Panel Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left 3D Studio Canvas (Cols 7) */}
          <div className="lg:col-span-7 h-[500px] lg:h-[650px] rounded-3xl glass-panel border border-amber-500/20 shadow-2xl relative overflow-hidden">
            <ProductViewer3D product={product} />

            <div className="absolute bottom-4 right-4 z-20 pointer-events-none text-[10px] text-amber-300/80 uppercase font-serif-luxury tracking-widest bg-zinc-950/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-amber-500/30">
              3D Real-Time WebGL Studio
            </div>
          </div>

          {/* Right Product Details & Actions (Cols 5) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-serif-luxury text-amber-400 tracking-[0.25em] uppercase">
                  {product.brand}
                </span>
                <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-zinc-500">({product.reviewsCount} Reviews)</span>
                </div>
              </div>

              <h1 className="font-serif-luxury text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                {product.name}
              </h1>

              <p className="text-xs text-amber-200/90 font-medium italic">
                "{product.tagline}"
              </p>

              <div className="pt-2 flex items-baseline gap-3">
                <span className="font-serif-luxury text-3xl font-extrabold text-gold-gradient">
                  ₹{product.price.toFixed(2)}
                </span>
                <span className="text-xs text-zinc-400">per pack (20 cigarettes)</span>
              </div>
            </div>

            <p className="text-zinc-300 text-xs leading-relaxed font-sans-luxury">
              {product.description}
            </p>

            {/* Quick Specs Pill Badges */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs">
                <span className="text-zinc-500 text-[10px] uppercase block">Nicotine / Tar</span>
                <span className="font-semibold text-zinc-200">{product.nicotine} / {product.tar}</span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs">
                <span className="text-zinc-500 text-[10px] uppercase block">Format</span>
                <span className="font-semibold text-zinc-200">{product.specs.length} × {product.specs.diameter}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-zinc-800">
              <div className="flex gap-3">
                <button
                  onClick={() => addToCart(product)}
                  className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-zinc-950 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 active:scale-95 transition-all"
                >
                  <ShoppingBag className="w-4 h-4" /> ADD TO CART
                </button>

                <button
                  onClick={() => toggleWishlist(product.id, product.name)}
                  className={`p-4 rounded-2xl border transition-all ${
                    isWishlisted
                      ? 'bg-amber-500 text-zinc-950 border-amber-500'
                      : 'glass-panel text-zinc-300 border-zinc-700 hover:text-amber-400'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-zinc-950' : ''}`} />
                </button>
              </div>

              {/* Brand Admin 3D Editor Link */}
              <Link
                to={`/brand/edit/${product.id}`}
                className="w-full py-3.5 rounded-2xl glass-panel-gold border border-amber-500/40 text-amber-300 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-amber-500/10 transition-colors"
              >
                <Rotate3d className="w-4 h-4 text-amber-400" /> Inspect / Edit 3D Material Specifications
              </Link>
            </div>
          </div>
        </div>

        {/* Tabbed Detailed Information */}
        <div className="space-y-8">
          <div className="flex border-b border-zinc-800 gap-8">
            {['overview', 'specs', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-xs font-serif-luxury font-bold uppercase tracking-widest transition-colors relative ${
                  activeTab === tab ? 'text-amber-400' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="productTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-400"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs text-zinc-300 leading-relaxed">
              <div className="glass-panel p-6 rounded-2xl space-y-2">
                <span className="text-amber-400 font-bold uppercase tracking-widest text-[10px]">Leaf Selection</span>
                <h4 className="font-serif-luxury text-sm font-bold text-white">Sun-Cured Bright Leaf</h4>
                <p>Hand-picked from certified sustainable highland estates, naturally aged for 36 months to ensure rich flavor profile.</p>
              </div>
              <div className="glass-panel p-6 rounded-2xl space-y-2">
                <span className="text-amber-400 font-bold uppercase tracking-widest text-[10px]">Filigree Casing</span>
                <h4 className="font-serif-luxury text-sm font-bold text-white">24K Edible Gold Foil</h4>
                <p>Embossed with micro-perforations for smooth draw and thermal regulation.</p>
              </div>
              <div className="glass-panel p-6 rounded-2xl space-y-2">
                <span className="text-amber-400 font-bold uppercase tracking-widest text-[10px]">Filtration</span>
                <h4 className="font-serif-luxury text-sm font-bold text-white">Japanese Silk Core</h4>
                <p>High-density natural silk fibers combined with active coconut charcoal granules for clean vapor output.</p>
              </div>
            </div>
          )}

          {/* Tab 2: Specs */}
          {activeTab === 'specs' && (
            <div className="max-w-2xl glass-panel rounded-2xl p-6 divide-y divide-zinc-800 text-xs">
              <div className="py-3 flex justify-between">
                <span className="text-zinc-400">Length</span>
                <span className="font-semibold text-white">{product.specs.length}</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-zinc-400">Diameter</span>
                <span className="font-semibold text-white">{product.specs.diameter}</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-zinc-400">Filter Element</span>
                <span className="font-semibold text-white">{product.specs.filterType}</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-zinc-400">Paper Fiber</span>
                <span className="font-semibold text-white">{product.specs.paperType}</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-zinc-400">Atelier Origin</span>
                <span className="font-semibold text-white">{product.specs.origin}</span>
              </div>
            </div>
          )}

          {/* Tab 3: Reviews */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="glass-panel p-6 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs">Lord Sterling (London)</span>
                  <span className="text-amber-400 text-xs flex gap-1">★★★★★</span>
                </div>
                <p className="text-xs text-zinc-300">
                  "Exquisite craftsmanship. The 24K gold foil band and silk filter offer an unparalleled smooth draw. Shipped directly from Geneva in 48 hours."
                </p>
              </div>
              <div className="glass-panel p-6 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs">Baroness von Hirsch (Zurich)</span>
                  <span className="text-amber-400 text-xs flex gap-1">★★★★★</span>
                </div>
                <p className="text-xs text-zinc-300">
                  "The 3D customizer allowed us to engrave our private family crest onto the hardshell box. Truly Awwwards-worthy design."
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Related Products Carousel */}
        <div className="space-y-8 pt-8 border-t border-zinc-900">
          <h3 className="font-serif-luxury text-2xl font-bold text-white">
            Complementary <span className="text-gold-gradient">Allocations</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
