import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, ArrowRight, Award, Globe } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="relative bg-zinc-950 border-t border-amber-500/20 pt-20 pb-12 overflow-hidden text-zinc-400">
      {/* Glow ambient background element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-zinc-900">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 p-[1px]">
                <div className="w-full h-full bg-zinc-950 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-serif-luxury text-2xl font-extrabold tracking-[0.3em] text-gold-gradient uppercase">
                  Volute
                </span>
                <span className="text-[9px] tracking-[0.35em] text-zinc-400 uppercase">
                  Geneva • Zurich • Mayfair • Tokyo
                </span>
              </div>
            </Link>

            <p className="text-xs leading-relaxed text-zinc-400 max-w-sm">
              The pinnacle of bespoke tobacco craftsmanship and luxury 3D customization. Engineered for collectors, connoisseurs, and refined palates worldwide.
            </p>

            <div className="flex items-center gap-4 text-xs text-amber-400">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 border border-amber-500/30">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Certified Atelier 21+</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 border border-amber-500/30">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Awwwards Design</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif-luxury text-xs tracking-[0.2em] font-semibold text-zinc-200 uppercase mb-5">
              The Collection
            </h4>
            <ul className="space-y-3 text-xs">
              <li><Link to="/products" className="hover:text-amber-400 transition-colors">Gold Leaf Series</Link></li>
              <li><Link to="/products" className="hover:text-amber-400 transition-colors">Obsidian Slims</Link></li>
              <li><Link to="/products" className="hover:text-amber-400 transition-colors">Emerald Reserve</Link></li>
              <li><Link to="/products" className="hover:text-amber-400 transition-colors">Monarch Cigarillos</Link></li>
              <li><Link to="/products" className="hover:text-amber-400 transition-colors">3D Products Catalog</Link></li>
            </ul>
          </div>

          {/* System Portals */}
          <div>
            <h4 className="font-serif-luxury text-xs tracking-[0.2em] font-semibold text-zinc-200 uppercase mb-5">
              System Portals
            </h4>
            <ul className="space-y-3 text-xs">
              <li><Link to="/customer/orders" className="hover:text-amber-400 transition-colors">Order Tracker & Ratings</Link></li>
              <li><Link to="/brand/login" className="hover:text-amber-400 transition-colors">Brand Partner Login</Link></li>
              <li><Link to="/brand/dashboard" className="hover:text-amber-400 transition-colors">Brand Admin Console</Link></li>
              <li><Link to="/brand/add-product" className="hover:text-amber-400 transition-colors">List New Product</Link></li>
              <li><Link to="/about" className="hover:text-amber-400 transition-colors">Volute Heritage</Link></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="font-serif-luxury text-xs tracking-[0.2em] font-semibold text-zinc-200 uppercase mb-5">
              Private Gazette
            </h4>
            <p className="text-xs text-zinc-400 mb-4">
              Receive private invitations to limited-edition allocations and bespoke releases.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
                Thank you. You have been added to the Volute private registry.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 text-xs text-white rounded-xl px-3.5 py-3 pr-10 focus:outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-amber-500 text-zinc-950 hover:bg-amber-400 transition-colors"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400">
          <p>© {new Date().getFullYear()} VOLUTE ATELIER DE TABAC S.A. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-zinc-300 transition-colors cursor-pointer">Terms of Distinction</span>
            <span className="hover:text-zinc-300 transition-colors cursor-pointer">Privacy Protocol</span>
            <span className="hover:text-zinc-300 transition-colors cursor-pointer">21+ Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
