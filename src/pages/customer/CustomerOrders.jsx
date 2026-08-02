import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Truck, CheckCircle2, Clock, Star, Sparkles, MapPin } from 'lucide-react';
import { useStore } from '../../store/useStore';
import OrderTrackerModal from '../../components/common/OrderTrackerModal';

export default function CustomerOrders() {
  const { customerOrders } = useStore();
  const [selectedTrackerOrder, setSelectedTrackerOrder] = useState(null);

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest">
            <Truck className="w-4 h-4 text-amber-400" />
            <span>VOLUTE Express Delivery Log</span>
          </div>
          <h1 className="font-serif-luxury text-4xl font-bold text-white">
            Customer Orders & <span className="text-gold-gradient">Live Tracking</span>
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm">
            Track your 10-minute luxury allocations, rate products, and review delivery history.
          </p>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {customerOrders.map((ord) => (
            <div
              key={ord.id}
              className="glass-panel p-6 rounded-3xl border border-zinc-800 space-y-6 flex flex-col justify-between"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-amber-400 font-bold text-sm">{ord.id}</span>
                    <span className="text-xs text-zinc-400">• {ord.date}</span>
                  </div>
                  <span className="text-xs text-zinc-300 font-semibold pt-1 block">
                    Courier: {ord.riderName}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    ord.status === 'Delivered'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
                  }`}>
                    {ord.status} ({ord.estimatedMins > 0 ? `~${ord.estimatedMins} Mins` : 'Completed'})
                  </span>

                  <button
                    onClick={() => setSelectedTrackerOrder(ord)}
                    className="px-4 py-2 rounded-xl bg-amber-500 text-zinc-950 font-bold text-xs uppercase flex items-center gap-1.5 shadow-md"
                  >
                    <Truck className="w-3.5 h-3.5" /> Track / Rate
                  </button>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                {ord.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover bg-zinc-900" />
                      <div>
                        <h4 className="font-bold text-white">{item.name}</h4>
                        <span className="text-zinc-500 text-[11px]">Qty: {item.qty}</span>
                      </div>
                    </div>
                    <span className="font-bold text-gold-gradient">${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Total & Rating */}
              <div className="pt-4 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <div>
                  <span className="text-zinc-400">Total Paid: </span>
                  <span className="font-bold text-gold-gradient text-sm">${ord.total.toFixed(2)}</span>
                </div>

                {ord.rating ? (
                  <div className="flex items-center gap-2 text-amber-400 font-bold">
                    <span>Rated: {ord.rating} ★</span>
                    <span className="text-zinc-400 font-normal italic">"{ord.review}"</span>
                  </div>
                ) : (
                  <span className="text-zinc-500 italic">Unrated allocation</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tracker Modal */}
      {selectedTrackerOrder && (
        <OrderTrackerModal
          isOpen={!!selectedTrackerOrder}
          onClose={() => setSelectedTrackerOrder(null)}
        />
      )}
    </div>
  );
}
