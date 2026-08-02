import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Eye, Star, Sparkles } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function ProductCard({ product, onQuickView }) {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const isWishlisted = wishlist.includes(product.id);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateY: mousePos.x * 12,
        rotateX: -mousePos.y * 12,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ transformStyle: 'preserve-3d' }}
      className="group relative rounded-2xl glass-panel p-5 border border-white/10 hover:border-amber-500/40 transition-all duration-500 flex flex-col justify-between"
    >
      {/* Background Gold Ambient Glow on Hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-amber-500/0 via-amber-500/0 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Top Badges & Wishlist Button */}
      <div className="flex items-center justify-between z-10 mb-3">
        {product.isNew ? (
          <span className="px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-bold tracking-widest uppercase flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> New Release
          </span>
        ) : (
          <span className="px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-[10px] font-medium tracking-widest uppercase">
            {product.category}
          </span>
        )}

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id, product.name);
          }}
          className={`p-2 rounded-full transition-all duration-300 ${
            isWishlisted
              ? 'bg-amber-500 text-zinc-950 shadow-lg shadow-amber-500/30'
              : 'bg-zinc-900/80 text-zinc-400 hover:text-amber-400 hover:bg-zinc-800'
          }`}
          title="Save to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-zinc-950' : ''}`} />
        </button>
      </div>

      {/* Image Preview Container */}
      <Link to={`/product/${product.id}`} className="relative block h-52 rounded-xl overflow-hidden mb-4 bg-zinc-900/50 group/img">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />

        {/* Quick Preview Hover Overlay Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (onQuickView) onQuickView(product);
          }}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full glass-panel-gold text-amber-300 text-xs font-semibold uppercase tracking-wider opacity-0 group-hover/img:opacity-100 transition-all duration-300 flex items-center gap-1.5 shadow-xl"
        >
          <Eye className="w-3.5 h-3.5" /> Quick Studio
        </button>
      </Link>

      {/* Product Content Details */}
      <div className="space-y-2 z-10 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[10px] tracking-[0.25em] text-amber-400/90 font-serif-luxury uppercase block mb-1">
            {product.brand}
          </span>
          <Link to={`/product/${product.id}`}>
            <h3 className="font-serif-luxury text-base font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-zinc-400 line-clamp-2 mt-1 font-sans-luxury">
            {product.tagline || product.description}
          </p>
        </div>

        {/* Price & Rating */}
        <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-zinc-400 block">Price</span>
            <span className="font-serif-luxury text-lg font-bold text-gold-gradient">
              ₹{product.price.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{product.rating}</span>
            <span className="text-zinc-400 font-normal text-[10px]">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex gap-2">
          <button
            onClick={() => addToCart(product)}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-zinc-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 hover:shadow-lg hover:shadow-amber-500/30 active:scale-95 transition-all duration-300"
          >
            <ShoppingBag className="w-3.5 h-3.5" /> ADD
          </button>
        </div>
      </div>
    </motion.div>
  );
}
