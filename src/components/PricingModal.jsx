import { X, Check, Zap, Crown, ShieldCheck, Sparkles } from 'lucide-react';

export default function PricingModal({ isOpen, onClose, currentPlan, onSelectPlan }) {
  if (!isOpen) return null;

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'مجاناً للأبد',
      icon: Sparkles,
      color: 'border-slate-800 bg-slate-900/50',
      buttonBg: 'bg-slate-800 hover:bg-slate-700 text-white',
      features: [
        '20 رسالة يومياً',
        '3 صور يومياً (FLUX.1)',
        'رفع ملفات بحجم 5MB (TXT/Code)',
        'الموديل الافتراضي (Llama 3.3)',
        'ذاكرة قصيرة المدى'
      ]
    },
    {
      name: 'Pro',
      price: '$15',
      period: 'شهرياً',
      popular: true,
      icon: Zap,
      color: 'border-blue-500/50 bg-blue-950/20 shadow-xl shadow-blue-600/10',
      buttonBg: 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30',
      features: [
        'رسائل غير محدودة',
        '50 صورة يومياً (HD FLUX)',
        'رفع جميع أنواع الملفات حتى 50MB (PDF, DOCX, CSV)',
        'جميع الموديلات (DeepSeek R1 + Llama 3.3)',
        'ذاكرة طويلة المدى لكل مشروع',
        'دعم أولوية وسرعة فائقة'
      ]
    },
    {
      name: 'Team',
      price: '$49',
      period: 'شهرياً / للفرق',
      icon: Crown,
      color: 'border-purple-500/50 bg-purple-950/20',
      buttonBg: 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/30',
      features: [
        'كل مميزات باقة Pro',
        'إمكانية إضافة 5 أعضاء',
        'مساحة عمل جماعية مشتركة',
        'API Access للربط المباشر',
        'ذاكرة مؤسسية فائقة',
        'دعم فني خاص على مدار الساعة'
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl glass-card rounded-2xl border border-white/10 p-6 md:p-8 shadow-2xl bg-slate-950 text-white my-8">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 left-4 p-1.5 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-white/10">
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-blue-600/20 border border-blue-500/30 rounded-2xl mb-3">
            <Crown className="w-6 h-6 text-amber-400" />
          </div>
          <h2 className="text-2xl font-bold">اختر الباقة المناسبة لك</h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">ترقية بسيطة لتفتك كل إمكانيات الذكاء الاصطناعي بدون حدود</p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isCurrent = currentPlan === plan.name;

            return (
              <div 
                key={plan.name} 
                className={`relative rounded-2xl p-6 border flex flex-col justify-between transition-all duration-300 ${plan.color}`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 right-1/2 translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                    الأكثر شبيعة 🔥
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 bg-slate-900 rounded-xl border border-white/10">
                      <Icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <span className="text-xs font-semibold text-slate-400">{plan.name}</span>
                  </div>

                  <div className="mb-6">
                    <span className="text-3xl font-extrabold">{plan.price}</span>
                    <span className="text-xs text-slate-400 font-normal mr-1">/ {plan.period}</span>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3 mb-6 text-xs text-slate-300">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => onSelectPlan(plan.name)}
                  disabled={isCurrent}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isCurrent 
                      ? 'bg-slate-800 text-slate-500 cursor-default border border-white/5' 
                      : plan.buttonBg
                  }`}
                >
                  {isCurrent ? 'باقتك الحالية' : `الاشتراك في ${plan.name}`}
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}