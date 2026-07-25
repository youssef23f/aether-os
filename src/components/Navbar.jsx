import { Sparkles, LogIn, LogOut, CreditCard } from 'lucide-react';

export default function Navbar({ user, onOpenAuth, onOpenPricing, onLogout }) {
  return (
    <nav className="w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-[1700px] mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* اللوجو والعلامة التجارية */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600/20 border border-blue-500/30 rounded-xl">
            <Sparkles className="w-5 h-5 text-blue-400" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-white tracking-wider">AETHER<span className="text-blue-500">.OS</span></span>
            <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full font-mono">v2.0</span>
          </div>
        </div>

        {/* أزرار التفاعل (الأسعار والحساب) */}
        <div className="flex items-center gap-3">
          
          {/* زر الترقية والخطط */}
          <button
            onClick={onOpenPricing}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-white/10 rounded-xl text-xs font-medium text-slate-300 hover:text-white transition-all"
          >
            <CreditCard className="w-3.5 h-3.5 text-blue-400" />
            <span>الخطط والترقية</span>
          </button>

          {/* حالة المستخدم: تسجيل الدخول أو الحساب الحالي */}
          {user ? (
            <div className="flex items-center gap-3 bg-slate-900 border border-white/10 p-1.5 pl-3 rounded-xl">
              <img 
                src={user.avatar || "https://api.dicebear.com/7.x/bottts/svg?seed=user"} 
                alt="Avatar" 
                className="w-7 h-7 rounded-lg border border-white/10 bg-slate-800" 
              />
              <div className="hidden sm:block text-right">
                <p className="text-xs font-bold text-white leading-tight">{user.name}</p>
                <span className="text-[10px] text-emerald-400 font-mono font-semibold">{user.plan || 'Free Plan'}</span>
              </div>
              <button 
                onClick={onLogout} 
                title="تسجيل الخروج" 
                className="p-1.5 text-slate-400 hover:text-rose-400 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button 
              onClick={onOpenAuth}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition-all shadow-lg shadow-blue-600/20"
            >
              <LogIn className="w-4 h-4" />
              <span>تسجيل الدخول</span>
            </button>
          )}

        </div>

      </div>
    </nav>
  );
}