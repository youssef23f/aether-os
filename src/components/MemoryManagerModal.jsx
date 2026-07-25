import { X, Brain, Trash2, Plus, Sparkles } from 'lucide-react';
import { useState } from 'react';

export default function MemoryManagerModal({ isOpen, onClose, memories, onDeleteMemory, onAddMemory }) {
  const [newMemoryText, setNewMemoryText] = useState('');

  if (!isOpen) return null;

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newMemoryText.trim()) return;
    onAddMemory(newMemoryText);
    setNewMemoryText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl glass-card rounded-2xl border border-white/10 p-6 shadow-2xl bg-slate-950 text-white">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 left-4 p-1.5 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-white/10">
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-purple-600/20 border border-purple-500/30 rounded-2xl">
            <Brain className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold">إدارة ذاكرة AETHER المتقدمة</h2>
            <p className="text-xs text-slate-400">البيانات والمعلومات التي يتذكرها النظام عنك وعن مشاريعك</p>
          </div>
        </div>

        {/* Add Memory Form */}
        <form onSubmit={handleAdd} className="flex gap-2 mb-6">
          <input 
            type="text" 
            value={newMemoryText}
            onChange={(e) => setNewMemoryText(e.target.value)}
            placeholder="أضف معلومة جديدة ليتذكرها النظام (مثال: اسم مشروعي المتجر الذكي)..."
            className="flex-1 px-4 py-2.5 bg-slate-900 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
          />
          <button type="submit" className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl text-xs flex items-center gap-1.5">
            <Plus className="w-4 h-4" />
            <span>حفظ</span>
          </button>
        </form>

        {/* Memories List */}
        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1 no-scrollbar">
          {memories.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-xs">
              لا توجد ذكريات محفوظة حالياً.
            </div>
          ) : (
            memories.map((mem) => (
              <div key={mem.id} className="flex items-center justify-between p-3 bg-slate-900/80 border border-white/5 rounded-xl text-xs group hover:border-purple-500/30 transition-all">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span className="text-slate-200">{mem.text}</span>
                </div>
                <button 
                  onClick={() => onDeleteMemory(mem.id)}
                  className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors opacity-80 group-hover:opacity-100"
                  title="Forget this (مسح المعلومة)"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}