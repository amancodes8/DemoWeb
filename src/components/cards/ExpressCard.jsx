import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Minus, Star, Zap, Eye, Heart } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function ExpressCard({ product, onQuickView }) {
  const { cart, addToCart, updateCartQty, wishlist, toggleWishlist } = useStore();

  const cartItem = cart.find((i) => i.productId === product.id && !i.customConfig);
  const qtyInCart = cartItem ? cartItem.qty : 0;
  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="group relative rounded-2xl glass-panel p-4 border border-white/10 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between">
      {/* 10-Min Express Badge & Wishlist Button */}
      <div className="flex items-center justify-between z-10 mb-2">
        <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 text-[10px] font-black tracking-wider uppercase flex items-center gap-1 shadow-md">
          <Zap className="w-3 h-3 fill-zinc-950" /> 10 MINS EXPRESS
        </span>

        <button
          onClick={() => toggleWishlist(product.id, product.name)}
          className={`p-1.5 rounded-full transition-colors ${
            isWishlisted ? 'text-amber-400 bg-amber-500/20' : 'text-zinc-500 hover:text-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-amber-400' : ''}`} />
        </button>
      </div>

      {/* Product Image & Quick Studio Preview */}
      <Link to={`/product/${product.id}`} className="relative h-44 rounded-xl overflow-hidden bg-zinc-900 mb-3 block group/img">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-60" />

        {/* Quick Studio Hover */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (onQuickView) onQuickView(product);
          }}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full glass-panel-gold text-amber-300 text-[10px] font-bold uppercase tracking-wider opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center gap-1"
        >
          <Eye className="w-3 h-3" /> 3D Preview
        </button>
      </Link>

      {/* Product Info */}
      <div className="space-y-1.5 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[10px] font-serif-luxury text-amber-400/90 uppercase tracking-widest block">
            {product.brand}
          </span>
          <Link to={`/product/${product.id}`}>
            <h3 className="font-serif-luxury text-sm font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-[11px] text-zinc-400 line-clamp-1">{product.blend}</p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 text-[11px] text-amber-400 font-semibold pt-1">
          <Star className="w-3 h-3 fill-amber-400" />
          <span>{product.rating}</span>
          <span className="text-zinc-500 font-normal">({product.reviewsCount})</span>
        </div>

        {/* Price & Express Instant Quantity Adjuster */}
        <div className="pt-2 border-t border-zinc-800 flex items-center justify-between">
          <div>
            <span className="text-[9px] text-zinc-500 uppercase block">Price</span>
            <span className="font-serif-luxury text-base font-bold text-gold-gradient">
              ₹{product.price.toFixed(2)}
            </span>
          </div>

          {/* Quick Add (+/-) Counter */}
          {qtyInCart > 0 ? (
            <div className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-600 rounded-xl px-2.5 py-1 text-zinc-950 font-bold text-xs shadow-lg">
              <button
                onClick={() => updateCartQty(cartItem.id, qtyInCart - 1)}
                className="hover:scale-125 transition-transform"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="px-1">{qtyInCart}</span>
              <button
                onClick={() => updateCartQty(cartItem.id, qtyInCart + 1)}
                className="hover:scale-125 transition-transform"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart(product)}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-amber-500/30 active:scale-95 transition-all flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> ADD
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
