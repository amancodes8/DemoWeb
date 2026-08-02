import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, ArrowLeft, Sparkles, Box, Sliders, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function BrandAddProduct() {
  const navigate = useNavigate();
  const { brandAuth, addProduct } = useStore();

  const [form, setForm] = useState({
    name: 'Imperial Rose Gold Reserve',
    brand: brandAuth.brandName || 'AURA PRIVÉ',
    category: 'Slims',
    tagline: 'Hand-Finished 24K Filigree & Rose Leaf Casing',
    price: 220.00,
    blend: 'Aged Flake Virginia & Damascena Rose Extract',
    nicotine: '0.6mg',
    tar: '6mg',
    packaging: 'Rose Gold Embossed Magnetic Coffer (20 Pieces)',
    description: 'Bespoke hand-rolled allocation wrapped in rose-infused organic hemp paper with dual 24K rose gold filigree bands.',
    length: '99mm',
    diameter: '6.1mm',
    filterType: 'Japanese Silk & Activated Charcoal',
    paperType: 'French Linen Unbleached',
    origin: 'Geneva Atelier',
    image: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?q=80&w=800&auto=format&fit=crop',
    // 3D Shader Preset
    filterShape: 'Round',
    filterColor: '#e5b887',
    wrapperColor: '#5c2a38',
    wrapperTexture: 'Leather',
    bandColor: '#ffd700',
    metalness: 0.85,
    roughness: 0.2,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProductPayload = {
      name: form.name,
      brand: form.brand,
      category: form.category,
      tagline: form.tagline,
      price: parseFloat(form.price),
      blend: form.blend,
      nicotine: form.nicotine,
      tar: form.tar,
      packaging: form.packaging,
      description: form.description,
      colors: {
        wrapper: form.wrapperColor,
        filter: form.filterColor,
        band: form.bandColor,
        tip: '#121215',
      },
      specs: {
        length: form.length,
        diameter: form.diameter,
        filterType: form.filterType,
        paperType: form.paperType,
        origin: form.origin,
      },
      image: form.image,
      '3dModelPreset': {
        filterShape: form.filterShape,
        filterColor: form.filterColor,
        wrapperColor: form.wrapperColor,
        wrapperTexture: form.wrapperTexture,
        bandColor: form.bandColor,
        metalness: parseFloat(form.metalness),
        roughness: parseFloat(form.roughness),
      },
    };

    addProduct(newProductPayload);
    navigate('/brand/dashboard');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-900 pb-6">
          <div className="space-y-1">
            <Link
              to="/brand/dashboard"
              className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-bold uppercase tracking-wider mb-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Brand Console
            </Link>
            <h1 className="font-serif-luxury text-3xl font-extrabold text-white">
              List New Product & <span className="text-gold-gradient">Technical Specifications</span>
            </h1>
            <p className="text-xs text-zinc-400">
              Enter complete allocation specs to publish directly to the customer store and 3D customizer.
            </p>
          </div>
        </div>

        {/* Product Specification Form */}
        <form onSubmit={handleSubmit} className="glass-panel p-8 rounded-3xl border border-zinc-800 space-y-8 text-xs">
          
          {/* SECTION 1: BASIC INFORMATION */}
          <div className="space-y-4">
            <h3 className="font-serif-luxury text-sm font-bold text-amber-400 uppercase tracking-wider border-b border-zinc-800 pb-2">
              1. Basic Product & Brand Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-zinc-400 uppercase font-semibold block mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-zinc-400 uppercase font-semibold block mb-1">Brand Name</label>
                <input
                  type="text"
                  required
                  value={form.brand}
                  onChange={(e) => setForm({ ...form, brand: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-zinc-400 uppercase font-semibold block mb-1">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-white focus:outline-none"
                >
                  <option value="Cigarettes">Cigarettes</option>
                  <option value="Slims">Slims</option>
                  <option value="Botanical">Botanical</option>
                  <option value="Flavored">Flavored</option>
                  <option value="Cigarillos">Cigarillos</option>
                </select>
              </div>

              <div>
                <label className="text-zinc-400 uppercase font-semibold block mb-1">Product Price (₹)</label>
                <input
                  type="number"
                  required
                  step="0.01"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-zinc-400 uppercase font-semibold block mb-1">Image URL</label>
                <input
                  type="url"
                  required
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-zinc-400 uppercase font-semibold block mb-1">Tagline</label>
              <input
                type="text"
                value={form.tagline}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="text-zinc-400 uppercase font-semibold block mb-1">Full Craft Description</label>
              <textarea
                rows={3}
                required
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-white focus:outline-none"
              />
            </div>
          </div>

          {/* SECTION 2: TECHNICAL & BLEND SPECIFICATIONS */}
          <div className="space-y-4">
            <h3 className="font-serif-luxury text-sm font-bold text-amber-400 uppercase tracking-wider border-b border-zinc-800 pb-2">
              2. Technical & Botanical Specifications
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-zinc-400 uppercase font-semibold block mb-1">Tobacco / Leaf Blend</label>
                <input
                  type="text"
                  required
                  value={form.blend}
                  onChange={(e) => setForm({ ...form, blend: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-zinc-400 uppercase font-semibold block mb-1">Packaging Hardshell Spec</label>
                <input
                  type="text"
                  required
                  value={form.packaging}
                  onChange={(e) => setForm({ ...form, packaging: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="text-zinc-400 uppercase font-semibold block mb-1">Nicotine (mg)</label>
                <input
                  type="text"
                  value={form.nicotine}
                  onChange={(e) => setForm({ ...form, nicotine: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-zinc-400 uppercase font-semibold block mb-1">Tar (mg)</label>
                <input
                  type="text"
                  value={form.tar}
                  onChange={(e) => setForm({ ...form, tar: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-zinc-400 uppercase font-semibold block mb-1">Length (mm)</label>
                <input
                  type="text"
                  value={form.length}
                  onChange={(e) => setForm({ ...form, length: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-zinc-400 uppercase font-semibold block mb-1">Diameter (mm)</label>
                <input
                  type="text"
                  value={form.diameter}
                  onChange={(e) => setForm({ ...form, diameter: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* SECTION 3: 3D MODEL & SHADER PRESETS */}
          <div className="space-y-4">
            <h3 className="font-serif-luxury text-sm font-bold text-amber-400 uppercase tracking-wider border-b border-zinc-800 pb-2">
              3. 3D WebGL Model & Material Parameters
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-zinc-400 uppercase font-semibold block mb-1">Filter Geometry</label>
                <select
                  value={form.filterShape}
                  onChange={(e) => setForm({ ...form, filterShape: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-white focus:outline-none"
                >
                  <option value="Round">Round</option>
                  <option value="Hexagon">Hexagon</option>
                  <option value="Star">Star</option>
                  <option value="Square">Square</option>
                </select>
              </div>

              <div>
                <label className="text-zinc-400 uppercase font-semibold block mb-1">Casing Texture</label>
                <select
                  value={form.wrapperTexture}
                  onChange={(e) => setForm({ ...form, wrapperTexture: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-white focus:outline-none"
                >
                  <option value="Leather">Leather</option>
                  <option value="Paper">Paper</option>
                  <option value="Gloss">Gloss</option>
                  <option value="Carbon Fiber">Carbon Fiber</option>
                  <option value="Vintage">Vintage</option>
                </select>
              </div>

              <div>
                <label className="text-zinc-400 uppercase font-semibold block mb-1">Casing Color Hex</label>
                <input
                  type="color"
                  value={form.wrapperColor}
                  onChange={(e) => setForm({ ...form, wrapperColor: e.target.value })}
                  className="w-full h-10 bg-zinc-900 border border-zinc-800 rounded-xl p-1 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-zinc-950 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-amber-500/25 hover:scale-105 transition-all"
          >
            <Plus className="w-4 h-4" /> Publish Product to Store
          </button>
        </form>
      </div>
    </div>
  );
}
