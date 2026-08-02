import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Sparkles, Zap, MapPin } from 'lucide-react';
import ExpressCard from '../components/cards/ExpressCard';
import { useStore } from '../store/useStore';

export default function Products() {
  const { products, searchQuery, setSearchQuery, deliveryLocation } = useStore();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedQuickProduct, setSelectedQuickProduct] = useState(null);

  const categories = ['All', 'Cigarettes', 'Slims', 'Botanical', 'Flavored', 'Cigarillos'];
  const brands = ['All Brands', ...Array.from(new Set(products.map((p) => p.brand).filter(Boolean)))];

  // Filter products by category, brand & search query
  let filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesBrand = selectedBrand === 'All Brands' || p.brand.toLowerCase() === selectedBrand.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.blend.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesBrand && matchesSearch;
  });

  // Sort products
  if (sortBy === 'price-low') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 text-xs font-black uppercase tracking-widest shadow-lg">
            <Zap className="w-4 h-4 fill-zinc-950" /> 10-Minute Express Store
          </div>
          <h1 className="font-serif-luxury text-4xl sm:text-6xl font-bold text-white">
            Instant Express <span className="text-gold-gradient">Cigarette Store</span>
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm flex items-center justify-center gap-1">
            <MapPin className="w-4 h-4 text-amber-400" /> Delivering express orders to: <strong className="text-amber-300">{deliveryLocation}</strong>
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="glass-panel p-4 rounded-2xl border border-amber-500/20 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 overflow-x-auto w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-zinc-950 shadow-lg shadow-amber-500/30 font-bold'
                    : 'bg-zinc-900/60 text-zinc-300 hover:text-white hover:bg-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search, Brand Filter & Sort Dropdown */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Search input by product or brand name */}
            <div className="relative flex-1 min-w-[200px] md:w-56">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name, brand, or blend..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 text-xs text-white rounded-xl pl-9 pr-4 py-2.5 focus:outline-none"
              />
            </div>

            {/* Brand Filter Dropdown */}
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="bg-zinc-900 border border-amber-500/30 focus:border-amber-500 text-xs text-amber-300 rounded-xl px-3.5 py-2.5 focus:outline-none uppercase font-bold cursor-pointer"
            >
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b === 'All Brands' ? 'Filter by Brand: All' : `Brand: ${b}`}
                </option>
              ))}
            </select>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 focus:border-amber-500 text-xs text-zinc-300 rounded-xl px-3 py-2.5 focus:outline-none uppercase font-semibold cursor-pointer"
            >
              <option value="featured">Sort: Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Express Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 glass-panel rounded-3xl space-y-4">
            <Sparkles className="w-12 h-12 text-zinc-600 mx-auto" />
            <h3 className="font-serif-luxury text-lg font-bold text-zinc-300">
              No Products Found
            </h3>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedBrand('All Brands');
                setSearchQuery('');
              }}
              className="px-6 py-2.5 rounded-full bg-amber-500 text-zinc-950 font-bold text-xs uppercase"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ExpressCard
                key={product.id}
                product={product}
                onQuickView={(p) => setSelectedQuickProduct(p)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      {selectedQuickProduct && (
        <div className="fixed inset-0 z-50 bg-zinc-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-amber-500/30 rounded-3xl max-w-2xl w-full p-6 space-y-6 relative shadow-2xl">
            <div className="flex justify-between items-center">
              <h3 className="font-serif-luxury text-lg font-bold text-gold-gradient">
                {selectedQuickProduct.name}
              </h3>
              <button
                onClick={() => setSelectedQuickProduct(null)}
                className="text-zinc-400 hover:text-white"
              >
                Close
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <img
                src={selectedQuickProduct.image}
                alt={selectedQuickProduct.name}
                className="rounded-2xl h-56 w-full object-cover"
              />
              <div className="space-y-3">
                <p className="text-zinc-300">{selectedQuickProduct.description}</p>
                <div className="space-y-1 text-zinc-400">
                  <div><strong className="text-white">Brand:</strong> {selectedQuickProduct.brand}</div>
                  <div><strong className="text-white">Blend:</strong> {selectedQuickProduct.blend}</div>
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
