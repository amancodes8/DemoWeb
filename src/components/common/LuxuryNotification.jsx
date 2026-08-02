import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Info, X } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function LuxuryNotification() {
  const { notifications, removeNotification } = useStore();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm pointer-events-none">
      <AnimatePresence>
        {notifications.map((n) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-auto flex items-center gap-3 px-4 py-3.5 rounded-xl glass-panel-gold shadow-2xl border border-amber-500/30 text-amber-100"
          >
            {n.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
            ) : (
              <Info className="w-5 h-5 text-amber-400 shrink-0" />
            )}
            <span className="text-xs tracking-wide font-medium flex-1">{n.message}</span>
            <button
              onClick={() => removeNotification(n.id)}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
