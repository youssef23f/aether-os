import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Workspace from './components/Workspace';
import AuthModal from './components/AuthModal';
import PricingModal from './components/PricingModal';

export default function App() {
  // حالة المستخدم
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('aether_user');
    return saved ? JSON.parse(saved) : null;
  });

  // التحكم في الـ Modals
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);

  // حفظ بيانات المستخدم
  useEffect(() => {
    if (user) {
      localStorage.setItem('aether_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('aether_user');
    }
  }, [user]);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleSelectPlan = (planName) => {
    if (!user) {
      setIsPricingOpen(false);
      setIsAuthOpen(true);
      return;
    }
    setUser(prev => ({ ...prev, plan: planName }));
    setIsPricingOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Navbar */}
      <Navbar 
        user={user} 
        onOpenAuth={() => setIsAuthOpen(true)} 
        onOpenPricing={() => setIsPricingOpen(true)}
        onLogout={handleLogout} 
      />

      {/* Main Workspace */}
      <main className="flex-1 overflow-hidden">
        <Workspace user={user} onOpenPricing={() => setIsPricingOpen(true)} />
      </main>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onLoginSuccess={handleLoginSuccess} 
      />

      {/* Pricing Modal */}
      <PricingModal 
        isOpen={isPricingOpen} 
        onClose={() => setIsPricingOpen(false)} 
        currentPlan={user?.plan || 'Free'}
        onSelectPlan={handleSelectPlan}
      />

    </div>
  );
}