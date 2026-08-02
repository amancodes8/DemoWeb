import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, Search, Menu, X, Sparkles, Zap, MapPin, Building2, Truck, Palette, Headset, ShieldCheck } from 'lucide-react';
import { useStore } from '../../store/useStore';
import CustomerSupportModal from './CustomerSupportModal';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [supportModalOpen, setSupportModalOpen] = useState(false);

  const location = useLocation();
  const { cart, wishlist, setCartOpen, searchQuery, setSearchQuery, deliveryLocation, setDeliveryLocation, brandAuth } = useStore();

  const totalCartQty = cart.reduce((sum, item) => sum + item.qty, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Collection', path: '/products' },
    { name: 'Orders & Tracking', path: '/customer/orders' },
    { name: 'Heritage', path: '/about' },
  ];

  return (
    <>
      {/* Top Speed Bar */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-zinc-950 py-1.5 px-4 text-[11px] font-extrabold uppercase tracking-wider flex items-center justify-between z-50 relative">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer hover:underline" onClick={() => setLocationModalOpen(true)}>
            <Zap className="w-3.5 h-3.5 fill-zinc-950" />
            <span>10-MIN EXPRESS DELIVERY • DELIVERING TO:</span>
            <span className="underline font-black flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {deliveryLocation}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/customer/orders" className="hover:underline flex items-center gap-1">
              <Truck className="w-3.5 h-3.5" /> Live Delivery Tracker
            </Link>
            <span>•</span>
            <Link
              to={brandAuth.isLoggedIn ? '/brand/dashboard' : '/brand/login'}
              className="hover:underline flex items-center gap-1 font-black bg-zinc-950 text-amber-300 px-2.5 py-0.5 rounded-full"
            >
              <Building2 className="w-3 h-3" />
              {brandAuth.isLoggedIn ? `Brand: ${brandAuth.brandName}` : 'Brand Partner Portal'}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Glass Header Navigation */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-8 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-zinc-950/85 backdrop-blur-xl border-b border-amber-500/15 shadow-2xl'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Monogram */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 p-[1px] shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all duration-300">
              <div className="w-full h-full bg-zinc-950 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-serif-luxury text-xl tracking-[0.3em] font-extrabold text-gold-gradient uppercase">
                Volute
              </span>
              <span className="text-[8px] tracking-[0.35em] text-zinc-400 uppercase font-sans-luxury">
                Bespoke Atelier • Geneva
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 glass-panel px-6 py-2 rounded-full border border-white/10">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative text-xs tracking-wider font-medium uppercase transition-colors duration-300 ${
                    isActive ? 'text-amber-400 font-semibold' : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions Bar */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2.5 rounded-full text-zinc-300 hover:text-amber-400 hover:bg-zinc-900/60 transition-all"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            <Link
              to="/wishlist"
              className="relative p-2.5 rounded-full text-zinc-300 hover:text-amber-400 hover:bg-zinc-900/60 transition-all"
              title="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-amber-500 text-[10px] font-bold text-zinc-950 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2.5 rounded-full text-zinc-300 hover:text-amber-400 hover:bg-zinc-900/60 transition-all"
              title="Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalCartQty > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-amber-400 text-[10px] font-bold text-zinc-950 flex items-center justify-center">
                  {totalCartQty}
                </span>
              )}
            </button>

            {/* 24/7 Concierge Support Trigger */}
            <button
              onClick={() => setSupportModalOpen(true)}
              className="p-2.5 rounded-full text-zinc-300 hover:text-amber-400 hover:bg-zinc-900/60 transition-all"
              title="24/7 Concierge Support"
            >
              <Headset className="w-4 h-4 text-amber-400" />
            </button>

            {/* Quick Action Button */}
            {brandAuth.isLoggedIn ? (
              <Link
                to="/brand/dashboard"
                className="hidden sm:flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-zinc-950 font-bold text-xs tracking-wider uppercase shadow-lg shadow-amber-500/20 hover:scale-105 transition-all"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Brand Console</span>
              </Link>
            ) : (
              <Link
                to="/products"
                className="hidden sm:flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-zinc-950 font-bold text-xs tracking-wider uppercase shadow-lg shadow-amber-500/20 hover:scale-105 transition-all"
              >
                <Zap className="w-3.5 h-3.5 fill-zinc-950" />
                <span>Express Store</span>
              </Link>
            )}

            {/* Mobile Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full text-zinc-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-24 z-40 bg-zinc-950/95 border-b border-amber-500/20 backdrop-blur-2xl p-6 lg:hidden shadow-2xl space-y-4"
          >
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm uppercase font-bold tracking-wider py-2 border-b border-zinc-900 ${
                    location.pathname === link.path ? 'text-amber-400' : 'text-zinc-300'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to={brandAuth.isLoggedIn ? '/brand/dashboard' : '/brand/login'}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm uppercase font-bold tracking-wider py-2 text-amber-300 flex items-center gap-2"
              >
                <Building2 className="w-4 h-4 text-amber-400" />
                {brandAuth.isLoggedIn ? `Brand: ${brandAuth.brandName}` : 'Brand Partner Portal'}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delivery Location Modal */}
      <AnimatePresence>
        {locationModalOpen && (
          <div className="fixed inset-0 z-50 bg-zinc-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-zinc-900 border border-amber-500/30 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl relative"
            >
              <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
                <h3 className="font-serif-luxury text-sm font-bold text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-400" /> Select 10-Min Delivery Location
                </h3>
                <button onClick={() => setLocationModalOpen(false)} className="text-zinc-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 text-xs">
                {[
                  'Bandra West, Mumbai',
                  'Indiranagar, Bengaluru',
                  'Connaught Place, New Delhi',
                  'Jubilee Hills, Hyderabad',
                ].map((loc) => (
                  <button
                    key={loc}
                    onClick={() => {
                      setDeliveryLocation(loc);
                      setLocationModalOpen(false);
                    }}
                    className={`w-full p-3 rounded-xl text-left border transition-all ${
                      deliveryLocation === loc
                        ? 'border-amber-500 bg-amber-500/20 text-amber-300 font-bold'
                        : 'border-zinc-800 bg-zinc-950 text-zinc-300 hover:text-white'
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-zinc-950/90 backdrop-blur-xl flex items-start justify-center pt-28 px-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: -20 }}
              className="w-full max-w-2xl bg-zinc-900 border border-amber-500/30 rounded-2xl p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4 border-b border-zinc-800 pb-4">
                <div className="flex items-center gap-3 text-amber-400">
                  <Search className="w-5 h-5" />
                  <span className="font-serif-luxury text-sm uppercase tracking-widest text-zinc-300">
                    Search VOLUTE Collection
                  </span>
                </div>
                <button onClick={() => setSearchOpen(false)} className="text-zinc-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <input
                type="text"
                autoFocus
                placeholder="Search products by brand, leaf blend, format or packaging..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 focus:border-amber-500 text-white rounded-xl px-4 py-3 text-sm focus:outline-none mb-4"
              />

              <div className="flex justify-end">
                <Link
                  to="/products"
                  onClick={() => setSearchOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 text-zinc-950 font-bold text-xs uppercase"
                >
                  View Search Results
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating 24/7 Support Concierge Widget (Bottom Right) */}
      <button
        onClick={() => setSupportModalOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-zinc-950 shadow-2xl shadow-amber-500/40 hover:scale-110 transition-transform duration-300 flex items-center gap-2 font-bold text-xs uppercase"
        title="24/7 Geneva Concierge Support"
      >
        <Headset className="w-5 h-5 fill-zinc-950" />
        <span className="hidden sm:inline">24/7 Concierge</span>
      </button>

      {/* 24/7 Customer Support Modal */}
      <CustomerSupportModal
        isOpen={supportModalOpen}
        onClose={() => setSupportModalOpen(false)}
      />
    </>
  );
}
