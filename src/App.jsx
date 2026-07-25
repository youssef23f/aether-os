import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Workspace from './components/Workspace';
import AuthModal from './components/AuthModal';
import PricingModal from './components/PricingModal';
import PaymentModal from './components/PaymentModal'; // 👈 استيراد مودال الدفع الجديد

export default function App() {
  // حالة المستخدم
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('aether_user');
    return saved ? JSON.parse(saved) : null;
  });

  // التحكم في الـ Modals
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false); // 👈 حالة فتح نافذة الدفع
  const [selectedPlan, setSelectedPlan] = useState(null);    // 👈 حفظ الخطة المختارة

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

  // عند اختيار خطة من PricingModal
  const handleSelectPlan = (plan) => {
    // 1. لو مش مسجل دخول، افتح نافذة التسجيل
    if (!user) {
      setIsPricingOpen(false);
      setIsAuthOpen(true);
      return;
    }

    // 2. لو الخطة المجانية، قم بالتحديث المباشر
    if (typeof plan === 'string' && plan.toLowerCase() === 'free') {
      setUser(prev => ({ ...prev, plan: 'Free' }));
      setIsPricingOpen(false);
      return;
    }

    // 3. لو خطة مدفوعة، اغلق الاسعار وافتح نافذة الدفع بالمحافظ
    setSelectedPlan(typeof plan === 'object' ? plan : { name: plan, price: '$29' });
    setIsPricingOpen(false);
    setIsPaymentOpen(true);
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

      {/* Payment Modal (تيلدا، فوري، بايبال، بينانس، OKX) */}
      <PaymentModal 
        isOpen={isPaymentOpen} 
        onClose={() => setIsPaymentOpen(false)} 
        selectedPlan={selectedPlan}
      />

    </div>
  );
}