import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Wishlist() {
  const { products, wishlist, toggleWishlist, addToCart } = useStore();

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest">
            <Heart className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>Private Vault</span>
          </div>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl font-bold text-white">
            Saved <span className="text-gold-gradient">Allocations</span>
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm">
            Your reserved list of bespoke tobacco creations and custom 3D designs.
          </p>
        </div>

        {wishlistedProducts.length === 0 ? (
          <div className="text-center py-20 glass-panel rounded-3xl space-y-6 max-w-md mx-auto">
            <Heart className="w-12 h-12 text-zinc-700 mx-auto" />
            <div className="space-y-2">
              <h3 className="font-serif-luxury text-lg font-bold text-zinc-300">
                Your Vault is Empty
              </h3>
              <p className="text-xs text-zinc-400">
                You have not saved any luxury creations to your private wishlist yet.
              </p>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500 text-zinc-950 font-bold text-xs uppercase tracking-wider"
            >
              Explore Collection <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlistedProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-panel p-5 rounded-2xl border border-zinc-800 space-y-4 flex flex-col justify-between"
              >
                <div className="relative h-48 rounded-xl overflow-hidden bg-zinc-900">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => toggleWishlist(product.id, product.name)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-zinc-950/80 text-rose-400 hover:bg-rose-500 hover:text-white transition-colors"
                    title="Remove from Wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-2 flex-1">
                  <span className="text-[10px] text-amber-400 font-serif-luxury uppercase tracking-widest">
                    {product.brand}
                  </span>
                  <h3 className="font-serif-luxury text-base font-bold text-white">
                    {product.name}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2">{product.description}</p>
                </div>

                <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
                  <span className="font-serif-luxury text-base font-bold text-gold-gradient">
                    ${product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="px-4 py-2 rounded-xl bg-amber-500 text-zinc-950 font-bold text-xs uppercase flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" /> Acquire
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
