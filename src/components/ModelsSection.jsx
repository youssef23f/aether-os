import { motion } from 'framer-motion';
import { aiModels } from '../config/modelsData';
import { Cpu, Activity } from 'lucide-react';

export default function ModelsSection() {
  return (
    <section id="models" className="py-20 px-4 max-w-6xl mx-auto relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
          Deployed AI Models
        </h2>
        <p className="text-slate-400 text-sm mt-2">Active instances running on your local cloud cluster</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {aiModels.map((model, index) => (
          <motion.div
            key={model.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="glass-card p-6 rounded-2xl relative overflow-hidden group border border-white/10 hover:border-blue-500/30 transition-all duration-300"
          >
            {/* Ambient Background Glow Effect on Hover */}
            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl group-hover:bg-purple-600/20 transition-all" />

            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-slate-800/80 border border-white/5 group-hover:border-blue-500/30 transition-colors">
                  <Cpu className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white group-hover:text-blue-300 transition-colors">
                    {model.name}
                  </h3>
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold border mt-1 ${model.badgeColor}`}>
                    {model.type}
                  </span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/60 border border-white/5 text-xs">
                <span className={`w-2 h-2 rounded-full ${model.status === 'Online' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                <span className="text-slate-300 font-medium">{model.status}</span>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              {model.description}
            </p>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-white/5">
              <span className="flex items-center gap-1">
                <Activity className="w-3.5 h-3.5 text-blue-400" />
                Latency: ~24ms
              </span>
              <button className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                Launch Instance &rarr;
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}