import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Package, DollarSign, Star, TrendingUp, LogOut, Sliders, CheckCircle2, Box, Trash2 } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function BrandDashboard() {
  const navigate = useNavigate();
  const { brandAuth, logoutBrand, products, customerOrders, updateOrderStatus, deleteProduct } = useStore();

  if (!brandAuth.isLoggedIn) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center pt-28">
        <div className="text-center space-y-4">
          <p className="text-zinc-400 text-sm">Please log in as a verified Brand Partner.</p>
          <Link to="/brand/login" className="px-6 py-2.5 rounded-xl bg-amber-500 text-zinc-950 font-bold text-xs uppercase">
            Brand Login
          </Link>
        </div>
      </div>
    );
  }

  // Filter products belonging strictly to this logged-in brand partner
  const brandProducts = products.filter((p) => {
    if (!p.brand || !brandAuth.brandName) return false;
    const b1 = p.brand.toLowerCase().trim();
    const b2 = brandAuth.brandName.toLowerCase().trim();
    return b1.includes(b2) || b2.includes(b1);
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-900 pb-6">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-serif-luxury uppercase tracking-widest">
              <Box className="w-4 h-4" /> Verified Brand Partner • {brandAuth.brandId}
            </div>
            <h1 className="font-serif-luxury text-3xl font-extrabold text-white">
              {brandAuth.brandName} <span className="text-gold-gradient">Console</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/brand/add-product"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-zinc-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/20 hover:scale-105 transition-all"
            >
              <Plus className="w-4 h-4" /> List New Product & Specifications
            </Link>

            <button
              onClick={() => {
                logoutBrand();
                navigate('/');
              }}
              className="px-4 py-3 rounded-xl glass-panel text-zinc-400 hover:text-rose-400 text-xs font-bold uppercase flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>

        {/* Brand Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-zinc-800 space-y-2">
            <span className="text-xs text-zinc-400 uppercase font-semibold">Active Products Listed</span>
            <h3 className="font-serif-luxury text-2xl font-bold text-white">{brandProducts.length}</h3>
          </div>
          <div className="glass-panel p-6 rounded-2xl border border-zinc-800 space-y-2">
            <span className="text-xs text-zinc-400 uppercase font-semibold">Brand YTD Sales</span>
            <h3 className="font-serif-luxury text-2xl font-bold text-gold-gradient">₹6,42,800</h3>
          </div>
          <div className="glass-panel p-6 rounded-2xl border border-zinc-800 space-y-2">
            <span className="text-xs text-zinc-400 uppercase font-semibold">Customer Fulfillment</span>
            <h3 className="font-serif-luxury text-2xl font-bold text-emerald-400">99.8%</h3>
          </div>
          <div className="glass-panel p-6 rounded-2xl border border-zinc-800 space-y-2">
            <span className="text-xs text-zinc-400 uppercase font-semibold">Average Brand Rating</span>
            <h3 className="font-serif-luxury text-2xl font-bold text-amber-400 flex items-center gap-1">
              4.98 <Star className="w-5 h-5 fill-amber-400" />
            </h3>
          </div>
        </div>

        {/* Listed Products & Specifications Table */}
        <div className="glass-panel rounded-3xl p-6 border border-zinc-800 space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <div>
              <h3 className="font-serif-luxury text-lg font-bold text-white">
                Brand Catalog & Technical Specifications
              </h3>
              <p className="text-xs text-zinc-400">Manage listed creations, prices, and 3D parameters</p>
            </div>
            <Link
              to="/brand/add-product"
              className="text-xs font-bold text-amber-400 hover:text-amber-300 uppercase flex items-center gap-1"
            >
              + Add Specification
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-zinc-300">
              <thead className="text-[10px] text-zinc-500 uppercase tracking-wider border-b border-zinc-800">
                <tr>
                  <th className="py-3 px-4">Preview</th>
                  <th className="py-3 px-4">Product Name</th>
                  <th className="py-3 px-4">Brand</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Leaf Blend Specs</th>
                  <th className="py-3 px-4">Nicotine/Tar</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {brandProducts.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-zinc-500">
                      No allocations currently listed under <strong>{brandAuth.brandName}</strong>.{' '}
                      <Link to="/brand/add-product" className="text-amber-400 underline font-semibold">
                        + List New Product & Specifications
                      </Link>
                    </td>
                  </tr>
                ) : (
                  brandProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-zinc-900/40 transition-colors">
                      <td className="py-3 px-4">
                        <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-zinc-900" />
                      </td>
                      <td className="py-3 px-4 font-bold text-white">{p.name}</td>
                      <td className="py-3 px-4 text-amber-400 font-semibold">{p.brand}</td>
                      <td className="py-3 px-4 text-zinc-400">{p.category}</td>
                      <td className="py-3 px-4 font-bold text-gold-gradient">₹{p.price.toFixed(2)}</td>
                      <td className="py-3 px-4 text-zinc-300 max-w-xs truncate">{p.blend}</td>
                      <td className="py-3 px-4 text-zinc-400">{p.nicotine} / {p.tar}</td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/brand/edit/${p.id}`}
                            className="px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500 hover:text-zinc-950 font-bold text-[11px] transition-colors"
                          >
                            Edit 3D & Specs
                          </Link>
                          <button
                            onClick={() => {
                              if (window.confirm(`Are you sure you want to delete "${p.name}"?`)) {
                                deleteProduct(p.id);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500 hover:text-white transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Real-time Order Dispatch Console */}
        <div className="glass-panel rounded-3xl p-6 border border-zinc-800 space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <h3 className="font-serif-luxury text-lg font-bold text-white">
              Customer Order Dispatch Console
            </h3>
            <span className="text-xs text-amber-400 uppercase font-semibold">Live Fulfillment Controls</span>
          </div>

          <div className="space-y-4">
            {customerOrders.map((ord) => (
              <div key={ord.id} className="glass-panel p-4 rounded-2xl border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
                <div>
                  <div className="flex items-center gap-2 font-bold text-white">
                    <span className="font-mono text-amber-400">{ord.id}</span>
                    <span>• {ord.items[0]?.name || 'Custom Allocation'}</span>
                  </div>
                  <div className="text-zinc-400 pt-1">
                    Status: <strong className="text-amber-300">{ord.status}</strong> (ETA: ~{ord.estimatedMins} mins)
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateOrderStatus(ord.id, 'In Atelier', 8)}
                    className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-amber-300 font-semibold text-[11px]"
                  >
                    Set: In Atelier
                  </button>
                  <button
                    onClick={() => updateOrderStatus(ord.id, 'Out for Delivery', 4)}
                    className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-amber-300 font-semibold text-[11px]"
                  >
                    Set: Out for Delivery
                  </button>
                  <button
                    onClick={() => updateOrderStatus(ord.id, 'Delivered', 0)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-[11px]"
                  >
                    Set: Delivered
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
