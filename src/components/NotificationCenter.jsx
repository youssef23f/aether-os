import { useState } from 'react';
import { 
  Bell, CheckCircle2, AlertTriangle, Sparkles, 
  Trash2, X, Info, ShieldAlert, Check
} from 'lucide-react';

export default function NotificationCenter({ isOpen, onClose }) {
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "تحديث الموديل الجديد",
      message: "تم دمج محرك Groq السريع لإنشاء الأكواد البرمجية بنجاح.",
      type: "ai",
      time: "منذ 5 دقائق",
      read: false
    },
    {
      id: 2,
      title: "تنبيه استهلاك التوكنز",
      message: "لقد استهلكت 80% من الرصيد المجاني لهذا اليوم في بيئة IDE.",
      type: "warning",
      time: "منذ ساعة",
      read: false
    },
    {
      id: 3,
      title: "تم حفظ الذاكرة",
      message: "تم تحديث تفضيلاتك البرمجية (JavaScript / Python) في الذاكرة الدائمة.",
      type: "system",
      time: "منذ ساعتين",
      read: true
    },
    {
      id: 4,
      title: "فحص الأمان المتقدم",
      message: "لا توجد أي ثغرات أمنية في الكود المولد بملف index.html.",
      type: "success",
      time: "أمس",
      read: true
    }
  ]);

  if (!isOpen) return null;

  const handleMarkAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'all') return true;
    return n.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type) => {
    switch(type) {
      case 'ai': return <Sparkles className="w-4 h-4 text-purple-400" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      case 'success': return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      default: return <Info className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-sm bg-slate-950 border-l border-white/10 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-slate-900/50">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-blue-400 animate-bounce" />
            <h3 className="font-bold text-white text-sm">مركز الإشعارات</h3>
            {unreadCount > 0 && (
              <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                {unreadCount} جديد
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <button onClick={handleClearAll} className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg transition-colors" title="مسح الكل">
              <Trash2 className="w-4 h-4" />
            </button>
            <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-1 p-2 bg-slate-900/80 border-b border-white/5 text-xs overflow-x-auto">
          {[
            { id: 'all', label: 'الكل' },
            { id: 'ai', label: 'الذكاء الاصطناعي' },
            { id: 'warning', label: 'تنبيهات' },
            { id: 'system', label: 'النظام' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3 py-1 rounded-lg transition-all whitespace-nowrap ${
                filter === tab.id ? 'bg-blue-600 text-white font-medium' : 'text-slate-400 hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
          {filteredNotifications.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 text-center p-6 space-y-2">
              <ShieldAlert className="w-10 h-10 text-slate-600 stroke-1" />
              <p className="text-xs font-medium">لا توجد إشعارات حالياً</p>
            </div>
          ) : (
            filteredNotifications.map((item) => (
              <div 
                key={item.id} 
                className={`p-3 rounded-xl border transition-all relative flex gap-3 ${
                  item.read 
                    ? 'bg-slate-900/40 border-white/5 text-slate-400' 
                    : 'bg-slate-900 border-blue-500/30 text-white shadow-lg shadow-blue-500/5'
                }`}
              >
                <div className="mt-0.5 p-2 rounded-lg bg-slate-950 border border-white/5 h-fit">
                  {getIcon(item.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-semibold">{item.title}</h4>
                    <span className="text-[10px] text-slate-500">{item.time}</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-300">{item.message}</p>
                  
                  {!item.read && (
                    <button 
                      onClick={() => handleMarkAsRead(item.id)}
                      className="mt-2 flex items-center gap-1 text-[10px] text-blue-400 hover:text-blue-300 transition-colors font-medium"
                    >
                      <Check className="w-3 h-3" /> تعليم كمقروء
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-white/10 bg-slate-900/50 text-center text-[11px] text-slate-500">
          AETHER Engine v2.5 • يتم تحديث الإشعارات لحظياً
        </div>

      </div>
    </div>
  );
}