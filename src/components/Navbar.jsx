import { Sparkles, Cpu, Key, Zap } from 'lucide-react';

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
            href="https://github.com/youssef23f/aether-os" 
            target="_blank" 
            rel="noreferrer"
            className="p-2 rounded-xl glass-card hover:bg-white/10 text-slate-300 transition-all border border-white/10 flex items-center justify-center"
            title="GitHub Repository"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
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