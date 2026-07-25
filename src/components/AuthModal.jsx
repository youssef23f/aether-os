import { useState } from 'react';
import { X, Mail, Lock, User, Sparkles, Chrome, Github } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // محاكاة تسجيل الدخول (سيتم ربطها بـ Supabase / Firebase)
    const userData = {
      name: name || (email ? email.split('@')[0] : 'المستخدم'),
      email: email,
      plan: 'Free',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email || 'user'}`
    };
    onLoginSuccess(userData);
    onClose();
  };

  const handleOAuth = (provider) => {
    const userData = {
      name: `${provider} User`,
      email: `user@${provider.toLowerCase()}.com`,
      plan: 'Free',
      avatar: provider === 'Google' 
        ? 'https://api.dicebear.com/7.x/bottts/svg?seed=google' 
        : 'https://api.dicebear.com/7.x/identicon/svg?seed=github'
    };
    onLoginSuccess(userData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-md glass-card rounded-2xl border border-white/10 p-6 shadow-2xl bg-slate-950 text-white">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 left-4 p-1 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-white/10">
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex p-3 bg-blue-600/20 border border-blue-500/30 rounded-2xl mb-3">
            <Sparkles className="w-6 h-6 text-blue-400" />
          </div>
          <h2 className="text-xl font-bold">{isRegister ? 'إنشاء حساب جديد' : 'مرحباً بك مجدداً'}</h2>
          <p className="text-xs text-slate-400 mt-1">انضم إلى AETHER.OS واستمتع بجميع الميزات</p>
        </div>

        {/* Social Auth Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <button 
            type="button"
            onClick={() => handleOAuth('Google')}
            className="flex items-center justify-center gap-2 py-2.5 px-3 bg-slate-900 hover:bg-slate-800 border border-white/10 rounded-xl text-xs font-semibold transition-all"
          >
            <Chrome className="w-4 h-4 text-rose-400" />
            <span>Google</span>
          </button>

          <button 
            type="button"
            onClick={() => handleOAuth('GitHub')}
            className="flex items-center justify-center gap-2 py-2.5 px-3 bg-slate-900 hover:bg-slate-800 border border-white/10 rounded-xl text-xs font-semibold transition-all"
          >
            <Github className="w-4 h-4 text-white" />
            <span>GitHub</span>
          </button>
        </div>

        <div className="relative flex py-2 items-center mb-5">
          <div className="flex-grow border-t border-white/10"></div>
          <span className="flex-shrink mx-3 text-[10px] text-slate-500 uppercase tracking-widest font-mono">أو عبر البريد</span>
          <div className="flex-grow border-t border-white/10"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {isRegister && (
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
              <input 
                type="text" 
                placeholder="الاسم الكامل" 
                required 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pr-10 pl-3 py-2.5 bg-slate-900 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
            <input 
              type="email" 
              placeholder="البريد الإلكتروني" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pr-10 pl-3 py-2.5 bg-slate-900 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
            <input 
              type="password" 
              placeholder="كلمة المرور" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pr-10 pl-3 py-2.5 bg-slate-900 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-xs transition-all shadow-lg shadow-blue-600/20 mt-2"
          >
            {isRegister ? 'إنشاء الحساب' : 'تسجيل الدخول'}
          </button>
        </form>

        {/* Toggle Login/Register */}
        <div className="text-center mt-4">
          <button 
            onClick={() => setIsRegister(!isRegister)} 
            className="text-xs text-slate-400 hover:text-blue-400 transition-colors"
          >
            {isRegister ? 'لديك حساب بالفعل؟ سجل دخولك' : 'ليس لديك حساب؟ أنشئ حساباً الآن'}
          </button>
        </div>

      </div>
    </div>
  );
}