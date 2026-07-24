import { Terminal, Cpu, Layout, Key, CreditCard, User } from 'lucide-react';

export default function Navbar() {
  const navItems = [
    { name: 'Workspace', icon: Layout },
    { name: 'Models', icon: Cpu },
    { name: 'API', icon: Key },
    { name: 'Pricing', icon: CreditCard },
  ];

  return (
    <header className="fixed top-5 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-6xl">
      <nav className="glass-card rounded-2xl px-6 py-3 flex items-center justify-between border border-white/10 shadow-2xl">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 shadow-lg shadow-blue-500/30">
            <Terminal className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
            AETHER<span className="text-blue-500">.OS</span>
          </span>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={`#${item.name.toLowerCase()}`}
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-2"
              >
                <Icon className="w-4 h-4 text-blue-400/80" />
                {item.name}
              </a>
            );
          })}
        </div>

        {/* Profile Button */}
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl glass-card hover:bg-white/10 text-xs font-semibold tracking-wide border border-white/10 transition-all cursor-pointer">
            <User className="w-4 h-4 text-purple-400" />
            <span>Profile</span>
          </button>
        </div>
      </nav>
    </header>
  );
}