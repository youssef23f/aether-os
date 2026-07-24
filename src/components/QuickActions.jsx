import { motion } from 'framer-motion';
import { Code2, Sparkles, FileSearch, Globe } from 'lucide-react';

export default function QuickActions() {
  const actions = [
    { title: 'Create Project', desc: 'Initialize new AI repo', icon: Code2, color: 'from-blue-500/20 to-indigo-500/10' },
    { title: 'Generate Code', desc: 'Write clean architecture', icon: Sparkles, color: 'from-purple-500/20 to-pink-500/10' },
    { title: 'Analyze Files', desc: 'Upload & parse codebase', icon: FileSearch, color: 'from-emerald-500/20 to-teal-500/10' },
    { title: 'Build Website', desc: 'Prompt to React/Next UI', icon: Globe, color: 'from-amber-500/20 to-orange-500/10' },
  ];

  return (
    <section className="py-12 px-4 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((act, index) => {
          const Icon = act.icon;
          return (
            <motion.button
              key={act.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -2 }}
              className={`glass-card p-4 rounded-xl flex items-center gap-4 bg-gradient-to-br ${act.color} border border-white/10 hover:border-white/20 transition-all cursor-pointer`}
            >
              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/10 text-white">
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-bold text-white">{act.title}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{act.desc}</p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}