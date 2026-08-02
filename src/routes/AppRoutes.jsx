import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Products from '../pages/Products';
import ProductDetail from '../pages/ProductDetail';
import Wishlist from '../pages/Wishlist';
import CustomerOrders from '../pages/customer/CustomerOrders';
import About from '../pages/About';

import BrandLogin from '../pages/brand/BrandLogin';
import BrandDashboard from '../pages/brand/BrandDashboard';
import BrandAddProduct from '../pages/brand/BrandAddProduct';
import ProductEditor from '../pages/ProductEditor';
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Customer Store Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/customer/orders" element={<CustomerOrders />} />
      <Route path="/about" element={<About />} />

      {/* Brand Partner Portal Routes */}
      <Route path="/brand/login" element={<BrandLogin />} />
      <Route path="/brand/dashboard" element={<BrandDashboard />} />
      <Route path="/brand/add-product" element={<BrandAddProduct />} />
      <Route path="/brand/edit/:id" element={<ProductEditor />} />

      {/* 404 Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
