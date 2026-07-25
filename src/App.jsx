import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Workspace from './components/Workspace';
import AuthModal from './components/AuthModal';
import PricingModal from './components/PricingModal';
import PaymentModal from './components/PaymentModal';

export default function App() {
  // 🧠 الذاكرة القوية: حفظ واسترجاع بيانات المستخدم تلقائياً
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('aether_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null;
    }
  });

  // التحكم في الشاشات المنبثقة Modals
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // 💾 التحديث التلقائي للذاكرة مع كل تغيير في بيانات المستخدم
  useEffect(() => {
    if (user) {
      localStorage.setItem('aether_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('aether_user');
    }
  }, [user]);

  // نجاح تسجيل الدخول
  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsAuthOpen(false);
  };

  // تسجيل الخروج
  const handleLogout = () => {
    setUser(null);
  };

  // معالجة الضغط على زر الترقية
  const handleSelectPlan = (plan) => {
    const planName = typeof plan === 'object' ? plan.name : (plan || 'Pro Developer OS');
    const planPrice = typeof plan === 'object' ? plan.price : '$19';

    if (planName.toLowerCase().includes('community') || planName.toLowerCase().includes('free')) {
      if (user) setUser(prev => ({ ...prev, plan: 'Free' }));
      setIsPricingOpen(false);
      return;
    }

    // فتح بوابات الدفع والمحافظ فوراً
    setSelectedPlan({ name: planName, price: planPrice });
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

      {/* Workspace الرئيسي */}
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

      {/* Payment Modal */}
      <PaymentModal 
        isOpen={isPaymentOpen} 
        onClose={() => setIsPaymentOpen(false)} 
        selectedPlan={selectedPlan || { name: 'Pro Developer OS', price: '$19' }}
      />

    </div>
  );
}