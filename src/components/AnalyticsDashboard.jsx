import { 
  BarChart3, TrendingUp, Code2, Cpu, Zap, 
  Clock, Activity, Layers, ArrowUpRight, CheckCircle 
} from 'lucide-react';

export default function AnalyticsDashboard() {
  // إحصائيات تقريبية واقعية للعرض
  const stats = [
    { title: "التوكنز المستهلكة (اليوم)", value: "24,500", change: "+12%", icon: <Zap className="text-amber-400" />, trend: "up" },
    { title: "الأسطر البرمجية المولدة", value: "1,420", change: "+850 اليوم", icon: <Code2 className="text-blue-400" />, trend: "up" },
    { title: "المشاريع النشطة", value: "8", change: "2 في الـ IDE", icon: <Layers className="text-purple-400" />, trend: "neutral" },
    { title: "متوسط سرعة الاستجابة", value: "0.4s", change: "Groq Engine", icon: <Activity className="text-emerald-400" />, trend: "up" },
  ];

  const languageUsage = [
    { lang: "JavaScript / React", percentage: 55, color: "bg-amber-400" },
    { lang: "HTML / Tailwind CSS", percentage: 25, color: "bg-blue-500" },
    { lang: "Python", percentage: 15, color: "bg-emerald-500" },
    { lang: "Other (JSON, SQL)", percentage: 5, color: "bg-purple-500" },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1400px] mx-auto text-white overflow-y-auto max-h-[80vh] no-scrollbar">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-blue-400" />
            لوحة تحليلات الأداء (AETHER Analytics)
          </h2>
          <p className="text-xs text-slate-400 mt-1">تتبع كفاءة توليد الكود واستهلاك الذكاء الاصطناعي لحظياً.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            الأنظمة تعمل بكفاءة 100%
          </span>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-slate-900/80 border border-white/10 p-4 rounded-2xl relative overflow-hidden shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-slate-400 font-medium">{stat.title}</span>
              <div className="p-2 bg-slate-950 rounded-xl border border-white/5">{stat.icon}</div>
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-black tracking-tight">{stat.value}</h3>
              <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-0.5 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                {stat.change} <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Language Distribution */}
        <div className="lg:col-span-6 bg-slate-900/80 border border-white/10 p-5 rounded-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold flex items-center gap-2 mb-4">
              <Code2 className="w-4 h-4 text-blue-400" />
              توزيع اللغات البرمجية المولدة
            </h3>
            
            <div className="space-y-4 my-2">
              {languageUsage.map((item, index) => (
                <div key={index} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-300">{item.lang}</span>
                    <span className="text-slate-400">{item.percentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-white/5">
                    <div className={`h-full rounded-full ${item.color} transition-all duration-1000`} style={{ width: `${item.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
            <span>التفضيل الحالي في الذاكرة: JavaScript</span>
            <span className="text-blue-400 cursor-pointer hover:underline">تعديل التفضيلات &larr;</span>
          </div>
        </div>

        {/* Model Efficiency & Performance */}
        <div className="lg:col-span-6 bg-slate-900/80 border border-white/10 p-5 rounded-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold flex items-center gap-2 mb-4">
              <Cpu className="w-4 h-4 text-purple-400" />
              أداء نماذج الذكاء الاصطناعي (Model Routing)
            </h3>

            <div className="space-y-3">
              <div className="p-3 bg-slate-950 border border-white/5 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 font-bold text-xs">
                    G
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Groq Llama-3 (70B)</h4>
                    <p className="text-[10px] text-slate-400">المحرك الافتراضي للـ IDE • استجابة فائقة</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-emerald-400 font-bold">98.2% دقة</span>
              </div>

              <div className="p-3 bg-slate-950 border border-white/5 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold text-xs">
                    C
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Claude 3.5 Sonnet</h4>
                    <p className="text-[10px] text-slate-400">للمهام المعقدة والهندسة البرمجية (Arch Mode)</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-blue-400 font-bold">نشط عند الطلب</span>
              </div>
            </div>
          </div>

          {/* Quick Stats Banner */}
          <div className="mt-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/20 p-3 rounded-xl flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
            <p className="text-[11px] text-slate-300">
              أنت تستخدم وضع <strong className="text-white">Auto-Router</strong> الذكي، مما يوفر لك حوالي <strong className="text-emerald-400">35% من التوكنز</strong> عن طريق اختيار الموديل المناسب لكل مهمة تلقائياً.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}