import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Terminal } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen pt-36 pb-20 flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      
      {/* Badge علوي بدقات وسلسلة حركات */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-blue-500/30 text-blue-400 text-xs font-medium mb-8 shadow-lg shadow-blue-500/10"
      >
        <Sparkles className="w-3.5 h-3.5 animate-pulse text-purple-400" />
        <span>Next-Gen Self-Hosted AI Cloud Operating System</span>
      </motion.div>

      {/* العنوان الرئيسي الستايليش */}
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl leading-tight"
      >
        Your Personal <br />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-500">
          AI Cloud Operating System
        </span>
      </motion.h1>

      {/* الوصف البسيط */}
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 text-slate-400 text-base md:text-lg max-w-2xl font-light leading-relaxed"
      >
        Build, deploy, and scale custom AI models directly on your private infrastructure with zero API rate limits and complete data sovereignty.
      </motion.p>

      {/* زار الـ Call to Action */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-10 flex flex-wrap justify-center items-center gap-4"
      >
        <a 
          href="#workspace"
          className="relative group px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300 flex items-center gap-3"
        >
          <span>Start Building AI</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>

        <a 
          href="#models"
          className="px-6 py-4 rounded-xl glass-card text-slate-300 hover:text-white font-semibold text-sm border border-white/10 hover:border-white/20 transition-all flex items-center gap-2"
        >
          <Terminal className="w-4 h-4 text-blue-400" />
          <span>Explore Models</span>
        </a>
      </motion.div>
    </section>
  );
}