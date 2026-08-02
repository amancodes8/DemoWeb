import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Tag, Sparkles } from 'lucide-react';
import { useStore } from '../../store/useStore';
import confetti from 'canvas-confetti';

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, removeFromCart, updateCartQty, clearCart, addNotification } = useStore();

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart' | 'checkout' | 'success'
  const [formData, setFormData] = useState({
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    address: 'Flat 402, Sea Crest Towers, Bandra West',
    city: 'Mumbai',
    country: 'India',
    cardNumber: '4242 •••• •••• 9842',
  });

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * 0.05;
  const shipping = subtotal > 499 ? 0 : 49;
  const finalTotal = Math.max(0, subtotal + tax + shipping - discount);

  const applyPromo = (e) => {
    e.preventDefault();
    if (promoCode.toUpperCase() === 'SAVE20') {
      setDiscount(subtotal * 0.2);
      addNotification('Promo Code SAVE20 Applied (20% Discount)!', 'success');
    } else {
      addNotification('Invalid Promo Code. Try "SAVE20"', 'info');
    }
  };

  const handleCompleteOrder = (e) => {
    e.preventDefault();
    setCheckoutStep('success');
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#d4af37', '#ffd700', '#ffffff', '#e5b887'],
    });
    addNotification('Order Successfully Placed! Delivery within 10 minutes.', 'success');
  };

  return (
    <AnimatePresence>
      {cartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="absolute inset-0 bg-zinc-950/80 backdrop-blur-md"
          />

          {/* Drawer Container */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="w-screen max-w-md bg-zinc-950 border-l border-amber-500/20 shadow-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-6 border-b border-zinc-900 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5 text-amber-400" />
                  <h2 className="font-serif-luxury text-lg font-bold text-gold-gradient uppercase tracking-widest">
                    {checkoutStep === 'cart' && 'Your Shopping Cart'}
                    {checkoutStep === 'checkout' && 'Checkout & Delivery'}
                    {checkoutStep === 'success' && 'Order Placed'}
                  </h2>
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  className="p-2 text-zinc-400 hover:text-white rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {checkoutStep === 'cart' && (
                  <>
                    {cart.length === 0 ? (
                      <div className="text-center py-16 space-y-4">
                        <ShoppingBag className="w-12 h-12 text-zinc-700 mx-auto" />
                        <p className="font-serif-luxury text-zinc-400 text-sm">
                          Your cart is currently empty.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {cart.map((item) => (
                          <div
                            key={item.id}
                            className="flex gap-4 p-3 rounded-xl glass-panel border border-zinc-800"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-lg bg-zinc-900 shrink-0"
                            />
                            <div className="flex-1 min-w-0 flex flex-col justify-between">
                              <div className="flex justify-between items-start">
                                <h4 className="font-serif-luxury text-xs font-bold text-white truncate">
                                  {item.name}
                                </h4>
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="text-zinc-500 hover:text-rose-400"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              <div className="flex items-center justify-between pt-2">
                                <span className="font-serif-luxury text-xs font-bold text-gold-gradient">
                                  ₹{(item.price * item.qty).toFixed(2)}
                                </span>

                                <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-700 rounded-lg px-2 py-0.5">
                                  <button
                                    onClick={() => updateCartQty(item.id, item.qty - 1)}
                                    className="text-zinc-400 hover:text-white"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="text-xs font-bold text-white">{item.qty}</span>
                                  <button
                                    onClick={() => updateCartQty(item.id, item.qty + 1)}
                                    className="text-zinc-400 hover:text-white"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}

                        {/* Promo Code Form */}
                        <form onSubmit={applyPromo} className="flex gap-2 pt-2">
                          <input
                            type="text"
                            placeholder="Promo Code (e.g. SAVE20)"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            className="flex-1 bg-zinc-900 border border-zinc-800 text-xs text-white rounded-xl px-3 py-2 focus:outline-none focus:border-amber-500 uppercase"
                          />
                          <button
                            type="submit"
                            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-amber-300 font-semibold text-xs rounded-xl uppercase"
                          >
                            Apply
                          </button>
                        </form>
                      </div>
                    )}
                  </>
                )}

                {checkoutStep === 'checkout' && (
                  <form onSubmit={handleCompleteOrder} className="space-y-4 text-xs">
                    <h3 className="font-serif-luxury text-sm font-bold text-amber-400 uppercase tracking-wider">
                      Delivery Details
                    </h3>
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Delivery Address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500"
                    />

                    <h3 className="font-serif-luxury text-sm font-bold text-amber-400 uppercase tracking-wider pt-2">
                      Payment Options (UPI / Card / Cash on Delivery)
                    </h3>
                    <input
                      type="text"
                      required
                      placeholder="UPI ID or Card Number"
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500"
                    />

                    <div className="pt-4 flex justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => setCheckoutStep('cart')}
                        className="w-1/2 py-3 rounded-xl bg-zinc-900 text-zinc-300 font-bold uppercase"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="w-1/2 py-3 rounded-xl bg-amber-500 text-zinc-950 font-bold uppercase shadow-lg shadow-amber-500/20"
                      >
                        Pay ₹{finalTotal.toFixed(2)}
                      </button>
                    </div>
                  </form>
                )}

                {checkoutStep === 'success' && (
                  <div className="text-center py-10 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500 text-amber-400 flex items-center justify-center mx-auto">
                      <Sparkles className="w-8 h-8" />
                    </div>
                    <h3 className="font-serif-luxury text-lg font-bold text-gold-gradient">
                      Order Placed Successfully!
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Thank you, {formData.name}. Your order #ORD-{(Math.random()*90000+10000).toFixed(0)} has been placed and will be delivered to {formData.address} in under 10 minutes.
                    </p>
                    <button
                      onClick={() => {
                        clearCart();
                        setCheckoutStep('cart');
                        setCartOpen(false);
                      }}
                      className="w-full py-3 rounded-xl bg-amber-500 text-zinc-950 font-bold uppercase text-xs"
                    >
                      Continue Shopping
                    </button>
                  </div>
                )}
              </div>

              {/* Drawer Footer Summary */}
              {cart.length > 0 && checkoutStep === 'cart' && (
                <div className="p-6 border-t border-zinc-900 space-y-4">
                  <div className="space-y-1.5 text-xs text-zinc-400">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-white">₹{subtotal.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-amber-400">
                        <span>Discount (20%)</span>
                        <span>-₹{discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Express Delivery Charge</span>
                      <span className="text-white">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                    </div>
                    <div className="flex justify-between font-bold text-sm text-gold-gradient pt-2 border-t border-zinc-800">
                      <span>Total Amount</span>
                      <span>₹{finalTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setCheckoutStep('checkout')}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-zinc-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 hover:shadow-amber-500/40 transition-all"
                  >
                    Proceed to Checkout <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
