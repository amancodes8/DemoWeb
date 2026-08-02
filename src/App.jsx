import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Lenis from 'lenis';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import CustomCursor from './components/common/CustomCursor';
import SmokeCanvas from './components/common/SmokeCanvas';
import LuxuryNotification from './components/common/LuxuryNotification';
import CartDrawer from './components/common/CartDrawer';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-zinc-950 text-white font-sans selection:bg-amber-400 selection:text-zinc-950">
        {/* Ambient Canvas Smoke Effect */}
        <SmokeCanvas />

        {/* Floating Glass Navigation Header */}
        <Navbar />

        {/* Main Content Pages */}
        <main className="relative z-10">
          <AppRoutes />
        </main>

        {/* Slide-over Cart Drawer */}
        <CartDrawer />

        {/* Toast Notifications */}
        <LuxuryNotification />

        {/* Luxury Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
