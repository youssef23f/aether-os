import { Sparkles, Cpu, Key, Zap, Github } from 'lucide-react';

export default function Navbar({ onOpenModal }) {
  return (
    <nav className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-wider text-white">AETHER<span className="text-blue-400">.OS</span></span>
            <span className="block text-[9px] text-slate-400 tracking-widest uppercase font-mono">Realtime AI Studio</span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
          <button 
            onClick={() => onOpenModal('models')} 
            className="flex items-center gap-1.5 hover:text-blue-400 transition-colors cursor-pointer"
          >
            <Cpu className="w-4 h-4 text-blue-400" />
            Models
          </button>

          <button 
            onClick={() => onOpenModal('apikeys')} 
            className="flex items-center gap-1.5 hover:text-purple-400 transition-colors cursor-pointer"
          >
            <Key className="w-4 h-4 text-purple-400" />
            API Keys
          </button>

          <button 
            onClick={() => onOpenModal('pricing')} 
            className="flex items-center gap-1.5 hover:text-amber-400 transition-colors cursor-pointer"
          >
            <Zap className="w-4 h-4 text-amber-400" />
            Pricing
          </button>
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noreferrer"
            className="p-2 rounded-xl glass-card hover:bg-white/10 text-slate-300 transition-all border border-white/10"
          >
            <Github className="w-4 h-4" />
          </a>

          <a 
            href="#workspace"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white text-xs font-semibold shadow-lg shadow-blue-600/20 transition-all"
          >
            Launch Studio
          </a>
        </div>

      </div>
    </nav>
  );
}