import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Clock, MapPin, Star, Sparkles, Send, Truck } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function OrderTrackerModal({ isOpen, onClose }) {
  const { customerOrders, rateOrder } = useStore();
  const [selectedRating, setSelectedRating] = useState(5);
  const [reviewText, setReviewText] = useState('');

  const activeOrder = customerOrders[0] || null;

  if (!isOpen || !activeOrder) return null;

  const steps = [
    { title: 'Order Placed', desc: 'Allocation confirmed by Atelier' },
    { title: 'In Atelier', desc: 'Hand-sealing gold foil casing' },
    { title: 'Out for Delivery', desc: `${activeOrder.riderName} is on the way` },
    { title: 'Delivered', desc: 'Handed to recipient' },
  ];

  const getCurrentStepIndex = (status) => {
    switch (status) {
      case 'Placed': return 0;
      case 'In Atelier': return 1;
      case 'Out for Delivery': return 2;
      case 'Delivered': return 3;
      default: return 0;
    }
  };

  const currentIndex = getCurrentStepIndex(activeOrder.status);

  const handleSubmitRating = (e) => {
    e.preventDefault();
    rateOrder(activeOrder.id, selectedRating, reviewText);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-zinc-950/80 backdrop-blur-md flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-zinc-900 border border-amber-500/30 rounded-3xl max-w-xl w-full p-6 space-y-6 shadow-2xl relative overflow-hidden"
        >
          {/* Header */}
          <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
            <div className="flex items-center gap-2 text-amber-400">
              <Truck className="w-5 h-5" />
              <span className="font-serif-luxury text-sm font-bold uppercase tracking-wider text-white">
                Live Delivery Tracker ({activeOrder.id})
              </span>
            </div>
            <button onClick={onClose} className="text-zinc-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Speed Delivery ETA Banner */}
          <div className="glass-panel-gold p-4 rounded-2xl border border-amber-500/40 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] text-amber-400 uppercase font-bold tracking-widest block">
                VOLUTE Express Guarantee
              </span>
              <h3 className="font-serif-luxury text-xl font-bold text-white">
                {activeOrder.status === 'Delivered'
                  ? 'Delivered to your location!'
                  : `Estimated Arrival: ~${activeOrder.estimatedMins} Mins`}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-amber-500 text-zinc-950 flex items-center justify-center font-bold text-lg animate-pulse">
              ⚡
            </div>
          </div>

          {/* Status Timeline */}
          <div className="space-y-4">
            {steps.map((step, idx) => {
              const isCompleted = idx <= currentIndex;
              const isCurrent = idx === currentIndex;

              return (
                <div key={step.title} className="flex items-start gap-4 text-xs">
                  <div className="relative flex flex-col items-center">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                        isCompleted
                          ? 'bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/30'
                          : 'bg-zinc-800 text-zinc-500 border border-zinc-700'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>
                    {idx < steps.length - 1 && (
                      <div
                        className={`w-0.5 h-8 mt-1 ${
                          idx < currentIndex ? 'bg-amber-500' : 'bg-zinc-800'
                        }`}
                      />
                    )}
                  </div>

                  <div className="flex-1 space-y-0.5">
                    <h4
                      className={`font-bold ${
                        isCurrent
                          ? 'text-amber-400 text-sm'
                          : isCompleted
                          ? 'text-white'
                          : 'text-zinc-500'
                      }`}
                    >
                      {step.title}
                    </h4>
                    <p className="text-[11px] text-zinc-400">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Rating Section if Delivered */}
          {activeOrder.status === 'Delivered' && !activeOrder.rating && (
            <form onSubmit={handleSubmitRating} className="pt-4 border-t border-zinc-800 space-y-4">
              <h4 className="font-serif-luxury text-xs font-bold text-amber-400 uppercase tracking-widest">
                Rate Product & Express Delivery
              </h4>

              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setSelectedRating(star)}
                    className="p-1 text-amber-400 hover:scale-125 transition-transform"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= selectedRating ? 'fill-amber-400' : 'text-zinc-700'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <textarea
                rows={2}
                placeholder="Share feedback on flavor, gold casing, or delivery speed..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              />

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-amber-500 text-zinc-950 font-bold text-xs uppercase flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" /> Submit Review
              </button>
            </form>
          )}

          {activeOrder.rating && (
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
              <span className="font-bold">Your Rating:</span> {activeOrder.rating} ★ — "{activeOrder.review}"
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
