import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Workspace from './components/Workspace';
import AuthModal from './components/AuthModal';
import PricingModal from './components/PricingModal';
import PaymentModal from './components/PaymentModal';

export default function App() {
  // 🧠 الذاكرة القوية (Persistent User Memory): استرجاع بيانات المستخدم المحفوظة
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('aether_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      console.error("Error loading user memory:", e);
      return null;
    }
  });

  // 🧠 الذاكرة القوية للمشاريع والمحادثات
  const [workspaceMemory, setWorkspaceMemory] = useState(() => {
    try {
      const savedMemory = localStorage.getItem('aether_workspace_memory');
      return savedMemory ? JSON.parse(savedMemory) : { chats: [], activeFiles: [] };
    } catch (e) {
      return { chats: [], activeFiles: [] };
    }
  });

  // حالات فتح/إغلاق النوافذ (Modals)
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // 💾 حفظ المستخدم تلقائياً في الذاكرة عند أي تغيير
  useEffect(() => {
    if (user) {
      localStorage.setItem('aether_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('aether_user');
    }
  }, [user]);

  // 💾 حفظ ذاكرة مساحة العمل والبيانات عند التحديث
  useEffect(() => {
    if (workspaceMemory) {
      localStorage.setItem('aether_workspace_memory', JSON.stringify(workspaceMemory));
    }
  }, [workspaceMemory]);

  // دالة تسجيل الدخول والاحتفاظ بالحساب
  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsAuthOpen(false);
  };

  // دالة تسجيل الخروج
  const handleLogout = () => {
    setUser(null);
  };

  // 💳 معالجة اختيار خطة الأسعار والتحويل لبوابة الدفع
  const handleSelectPlan = (plan) => {
    const planName = typeof plan === 'object' ? plan.name : (plan || 'Pro Developer OS');
    const planPrice = typeof plan === 'object' ? plan.price : '$19';

    // لو اختار الخطة المجانية
    if (planName.toLowerCase().includes('community') || planName.toLowerCase().includes('free')) {
      if (user) setUser(prev => ({ ...prev, plan: 'Free' }));
      setIsPricingOpen(false);
      return;
    }

    // تجهيز الخطة المختارة وفتح بوابة الدفع فوراً
    setSelectedPlan({ name: planName, price: planPrice });
    setIsPricingOpen(false);
    setIsPaymentOpen(true); // 👈 فتح بوابة الدفع مباشرة
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* 1️⃣ الشريط العلوي Navbar */}
      <Navbar 
        user={user} 
        onOpenAuth={() => setIsAuthOpen(true)} 
        onOpenPricing={() => setIsPricingOpen(true)}
        onLogout={handleLogout} 
      />

      {/* 2️⃣ منطقة العمل الرئيسية Workspace المربوطة بالذاكرة */}
      <main className="flex-1 overflow-hidden">
        <Workspace 
          user={user} 
          onOpenPricing={() => setIsPricingOpen(true)}
          workspaceMemory={workspaceMemory}
          setWorkspaceMemory={setWorkspaceMemory}
        />
      </main>

      {/* 3️⃣ نافذة تسجيل الدخول AuthModal */}
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onLoginSuccess={handleLoginSuccess} 
      />

      {/* 4️⃣ نافذة خطط الأسعار PricingModal */}
      <PricingModal 
        isOpen={isPricingOpen} 
        onClose={() => setIsPricingOpen(false)} 
        currentPlan={user?.plan || 'Free'}
        onSelectPlan={handleSelectPlan}
      />

      {/* 5️⃣ نافذة وبوابة الدفع بالمحافظ والعملات PaymentModal */}
      <PaymentModal 
        isOpen={isPaymentOpen} 
        onClose={() => setIsPaymentOpen(false)} 
        selectedPlan={selectedPlan || { name: 'Pro Developer OS', price: '$19' }}
      />

    </div>
  );
}