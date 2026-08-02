import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sliders, Save, Sparkles, Eye, CheckCircle2, RotateCcw, Box, ArrowLeft } from 'lucide-react';
import Configurator3D from '../components/three/Configurator3D';
import { useStore } from '../store/useStore';

export default function ProductEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, updateProduct, configurator, setConfiguratorParam, loadConfigPreset } = useStore();

  const currentProduct = products.find((p) => p.id === id) || products[0];

  const [productForm, setProductForm] = useState({
    name: '',
    brand: '',
    category: 'Cigarettes',
    price: 185.00,
    tagline: '',
    blend: '',
    description: '',
    nicotine: '0.8mg',
    tar: '8mg',
  });

  useEffect(() => {
    if (currentProduct) {
      setProductForm({
        name: currentProduct.name || '',
        brand: currentProduct.brand || 'AURA PRIVÉ',
        category: currentProduct.category || 'Cigarettes',
        price: currentProduct.price || 185.00,
        tagline: currentProduct.tagline || '',
        blend: currentProduct.blend || '',
        description: currentProduct.description || '',
        nicotine: currentProduct.nicotine || '0.8mg',
        tar: currentProduct.tar || '8mg',
      });
      const initialPreset = {
        wrapperColor: currentProduct?.colors?.wrapper || currentProduct?.['3dModelPreset']?.wrapperColor || '#121215',
        filterColor: currentProduct?.colors?.filter || currentProduct?.['3dModelPreset']?.filterColor || '#d4af37',
        bandColor: currentProduct?.colors?.band || currentProduct?.['3dModelPreset']?.bandColor || '#ffd700',
        ...(currentProduct?.['3dModelPreset'] || {}),
      };
      loadConfigPreset(initialPreset);
    }
  }, [id, currentProduct, loadConfigPreset]);

  const handleSaveProduct = (e) => {
    e.preventDefault();
    const updatedPayload = {
      ...productForm,
      price: parseFloat(productForm.price),
      colors: {
        ...currentProduct?.colors,
        wrapper: configurator.wrapperColor,
        filter: configurator.filterColor,
        band: configurator.bandColor,
      },
      '3dModelPreset': {
        ...currentProduct?.['3dModelPreset'],
        filterShape: configurator.filterShape,
        filterColor: configurator.filterColor,
        wrapperColor: configurator.wrapperColor,
        wrapperTexture: configurator.wrapperTexture,
        bandColor: configurator.bandColor,
        metalness: configurator.metalness,
        roughness: configurator.roughness,
      },
    };

    updateProduct(currentProduct.id, updatedPayload);
    navigate('/brand/dashboard');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-900 pb-6">
          <div className="space-y-1">
            <Link
              to="/brand/dashboard"
              className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-bold uppercase tracking-wider mb-1"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Brand Console
            </Link>
            <h1 className="font-serif-luxury text-3xl font-extrabold text-white">
              Edit Product: <span className="text-gold-gradient">{productForm.name || 'Allocation'}</span>
            </h1>
          </div>

          <button
            onClick={handleSaveProduct}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-zinc-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/20 hover:scale-105 transition-all"
          >
            <Save className="w-4 h-4" /> Save Allocation to Registry
          </button>
        </div>

        {/* Split Screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Editing Form Controls (Cols 6) */}
          <form onSubmit={handleSaveProduct} className="lg:col-span-6 glass-panel rounded-3xl p-6 border border-zinc-800 space-y-6">
            <h3 className="font-serif-luxury text-base font-bold text-white border-b border-zinc-800 pb-3 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-400" /> Product Metadata & Shading
            </h3>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-zinc-400 uppercase font-semibold block mb-1">Product Title</label>
                <input
                  type="text"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-zinc-400 uppercase font-semibold block mb-1">Brand Name</label>
                <input
                  type="text"
                  value={productForm.brand}
                  onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-zinc-400 uppercase font-semibold block mb-1">Price (₹)</label>
                <input
                  type="number"
                  value={productForm.price}
                  onChange={(e) => setProductForm({ ...productForm, price: parseFloat(e.target.value) })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-zinc-400 uppercase font-semibold block mb-1">Category</label>
                <select
                  value={productForm.category}
                  onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Cigarettes">Cigarettes</option>
                  <option value="Slims">Slims</option>
                  <option value="Botanical">Botanical</option>
                  <option value="Cigarillos">Cigarillos</option>
                </select>
              </div>
            </div>

            <div className="text-xs">
              <label className="text-zinc-400 uppercase font-semibold block mb-1">Description</label>
              <textarea
                rows={3}
                value={productForm.description}
                onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Live 3D Color & Material Tweaks */}
            <div className="pt-4 border-t border-zinc-800 space-y-4 text-xs">
              <h4 className="font-serif-luxury text-xs font-bold text-amber-400 uppercase tracking-widest">
                Live 3D Material Controls
              </h4>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-zinc-400 uppercase font-semibold block mb-1">Casing Color</label>
                  <input
                    type="color"
                    value={configurator.wrapperColor}
                    onChange={(e) => setConfiguratorParam('wrapperColor', e.target.value)}
                    className="w-full h-10 bg-zinc-900 border border-zinc-800 rounded-xl p-1 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 uppercase font-semibold block mb-1">Filter Color</label>
                  <input
                    type="color"
                    value={configurator.filterColor}
                    onChange={(e) => setConfiguratorParam('filterColor', e.target.value)}
                    className="w-full h-10 bg-zinc-900 border border-zinc-800 rounded-xl p-1 cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="text-zinc-400 uppercase font-semibold block mb-1">
                  Metalness Reflectivity ({configurator.metalness})
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={configurator.metalness}
                  onChange={(e) => setConfiguratorParam('metalness', parseFloat(e.target.value))}
                  className="w-full accent-amber-400"
                />
              </div>
            </div>
          </form>

          {/* Right Live 3D Studio Preview (Cols 6) */}
          <div className="lg:col-span-6 h-[600px] rounded-3xl glass-panel border border-amber-500/30 shadow-2xl relative overflow-hidden flex flex-col justify-between p-4">
            <div className="z-20 flex justify-between items-center text-xs text-amber-300">
              <span className="font-serif-luxury font-bold uppercase tracking-widest flex items-center gap-1.5">
                <Box className="w-4 h-4" /> Live 3D Preview Engine
              </span>
              <span className="bg-amber-500/20 border border-amber-500/30 px-3 py-1 rounded-full text-[10px] font-bold">
                Realtime WebGL
              </span>
            </div>

            <div className="flex-1 w-full h-full">
              <Configurator3D />
            </div>

            <div className="z-20 text-center text-xs text-zinc-400 bg-zinc-950/80 backdrop-blur-md py-2 px-4 rounded-xl border border-zinc-800">
              Every parameter change on the left immediately updates the 3D model in real time.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
