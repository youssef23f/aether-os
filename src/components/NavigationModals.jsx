import { X, Cpu, Key, Zap, Check, Sparkles, ShieldCheck } from 'lucide-react';

export default function NavigationModals({ activeModal, onClose }) {
  if (!activeModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl glass-card rounded-3xl border border-white/10 p-6 shadow-2xl overflow-hidden">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 🤖 1. Models Modal */}
        {activeModal === 'models' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Cpu className="w-6 h-6 text-blue-400" />
                AI Engines & Models
              </h3>
              <p className="text-xs text-slate-400 mt-1">Select or inspect the intelligence engine powering AETHER.OS</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-blue-600/10 border border-blue-500/30 relative">
                <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500 text-white">Active</span>
                <h4 className="text-sm font-bold text-white">Llama 3.3 70B Versatile</h4>
                <p className="text-xs text-slate-400 mt-1">Ultra-fast, optimized for code generation and fullstack architecture.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-white/10 transition-all opacity-80">
                <h4 className="text-sm font-bold text-white">Qwen 2.5 Coder 32B</h4>
                <p className="text-xs text-slate-400 mt-1">Specialized in deep logic parsing, bug fixing, and multi-file refactoring.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-white/10 transition-all opacity-80">
                <h4 className="text-sm font-bold text-white">DeepSeek R1 (Reasoning)</h4>
                <p className="text-xs text-slate-400 mt-1">Advanced chain-of-thought analysis for complex backend systems.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-white/10 transition-all opacity-80">
                <h4 className="text-sm font-bold text-white">Claude 3.5 Sonnet Bridge</h4>
                <p className="text-xs text-slate-400 mt-1">State-of-the-art UI/UX design generation and React component design.</p>
              </div>
            </div>
          </div>
        )}

        {/* 🔑 2. API Keys Modal */}
        {activeModal === 'apikeys' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Key className="w-6 h-6 text-purple-400" />
                Custom API Key Settings
              </h3>
              <p className="text-xs text-slate-400 mt-1">Bring your own key (Groq, OpenAI, or Anthropic) for unlimited generation.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Groq Cloud API Key</label>
                <input 
                  type="password" 
                  placeholder="gsk_*********************************"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">OpenAI / Custom Endpoint Key</label>
                <input 
                  type="password" 
                  placeholder="sk-proj-*********************************"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2 text-xs text-emerald-400">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Your API Keys are stored locally in your browser memory and never saved on external servers.</span>
              </div>

              <button 
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-all shadow-lg shadow-purple-600/20"
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}

        {/* 💎 3. Pricing Modal */}
        {activeModal === 'pricing' && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-white flex items-center justify-center gap-2">
                <Zap className="w-6 h-6 text-amber-400" />
                AETHER.OS Tier Plans
              </h3>
              <p className="text-xs text-slate-400 mt-1">Scale your AI coding workspace according to your project needs</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Free Tier */}
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Community / Developer</h4>
                  <div className="text-2xl font-extrabold text-white my-2">$0 <span className="text-xs text-slate-400 font-normal">/ forever</span></div>
                  <ul className="space-y-2 text-xs text-slate-300 mt-4">
                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Monaco AI Editor</li>
                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Groq Llama 3.3 Access</li>
                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Local Ollama Sandbox</li>
                  </ul>
                </div>
                <button onClick={onClose} className="mt-6 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all">
                  Current Plan
                </button>
              </div>

              {/* Pro Tier */}
              <div className="p-5 rounded-2xl bg-gradient-to-b from-blue-900/40 to-purple-900/40 border border-blue-500/40 relative flex flex-col justify-between">
                <span className="absolute -top-3 right-4 px-3 py-0.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-[10px] font-bold shadow-lg">
                  POPULAR
                </span>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                    Pro Developer OS
                  </h4>
                  <div className="text-2xl font-extrabold text-white my-2">$19 <span className="text-xs text-slate-400 font-normal">/ month</span></div>
                  <ul className="space-y-2 text-xs text-slate-300 mt-4">
                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-400" /> Unlimited Cloud AI Tokens</li>
                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-400" /> Multi-repo GitHub Integration</li>
                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-400" /> DeepSeek R1 & Claude Access</li>
                  </ul>
                </div>
                <button onClick={onClose} className="mt-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white text-xs font-semibold transition-all shadow-lg shadow-blue-600/30">
                  Upgrade to Pro
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}