import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Workspace from './components/Workspace';
import NavigationModals from './components/NavigationModals';

export default function App() {
  const [activeModal, setActiveModal] = useState(null); // 'models' | 'apikeys' | 'pricing' | null

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-500 selection:text-white relative overflow-hidden font-sans">
      
      {/* Background Neon Glow Effects */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Navbar */}
      <Navbar onOpenModal={(modalName) => setActiveModal(modalName)} />

      {/* Hero Header */}
      <Hero />

      {/* Dynamic Monaco AI Studio Workspace */}
      <Workspace />

      {/* Navigation Modals (Models, API Keys, Pricing) */}
      <NavigationModals 
        activeModal={activeModal} 
        onClose={() => setActiveModal(null)} 
      />

      {/* Footer */}
      <footer className="py-8 text-center text-xs text-slate-500 border-t border-white/5">
        <p>AETHER.OS © 2026 — Next-Gen AI Developer Environment</p>
      </footer>
    </div>
  );
}