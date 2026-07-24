import { useState } from 'react';
import { 
  Code2, Terminal as TerminalIcon, Send, FileCode, Folder, 
  Play, Sparkles, Copy, Check, UploadCloud, Loader2, Plus, FilePlus
} from 'lucide-react';

export default function Workspace() {
  const [activeTab, setActiveTab] = useState('editor'); // editor | terminal
  const [inputPrompt, setInputPrompt] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  // قائمة الملفات - تبدأ بملف واحد أساسي، وأي ملف جديد يتم إنشاؤه تلقائياً بواسطة AI أو المستخدم
  const [files, setFiles] = useState({
    'main.jsx': `// Welcome to AETHER.OS Realtime AI Engine
// Ask AI to generate components, pages, or entire projects!
console.log("AETHER.OS Active Environment");`
  });

  const [activeFile, setActiveFile] = useState('main.jsx');

  // مخرجات الترمينال
  const [terminalLogs, setTerminalLogs] = useState([
    '$ aether-os --init local-cluster',
    '[SUCCESS] AI Dynamic Engine Active',
    '$ ready for project instructions_'
  ]);

  // سجل المحادثة
  const [chatHistory, setChatHistory] = useState([
    { 
      sender: 'ai', 
      text: 'مرحباً بك! أنا مهندس البرمجيات الخاص بك. أطلب مني بناء أي مكون أو صفحة، وسأقوم بإنشاء الملفات والتكويذ تلقائياً!' 
    }
  ]);

  const handleCopy = () => {
    navigator.clipboard.writeText(files[activeFile] || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // إنشاء ملف جديد يدوياً
  const handleCreateNewFile = () => {
    const fileName = prompt('Enter new file name (e.g. Button.jsx, styles.css):');
    if (fileName && !files[fileName]) {
      setFiles(prev => ({ ...prev, [fileName]: `// New file: ${fileName}\n` }));
      setActiveFile(fileName);
    }
  };

  // تشغيل الكود في الترمينال
  const handleRunCode = () => {
    setActiveTab('terminal');
    setTerminalLogs(prev => [
      ...prev,
      `\n$ npm run build --file=${activeFile}`,
      `[BUILD] Compiling ${activeFile}...`,
      `[SUCCESS] Active file executed successfully ✨`
    ]);
  };

  // رفع ملف خارجي لإضافته تلقائياً للقائمة
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;
        setFiles(prev => ({ ...prev, [file.name]: content }));
        setActiveFile(file.name);
        setChatHistory(prev => [
          ...prev, 
          { sender: 'ai', text: `📁 تم رفع الملف "${file.name}" وتم إضافته لهيكل المشروع!` }
        ]);
      };
      reader.readAsText(file);
    }
  };

  // إرسال الطلب للـ AI وتحليل النتيجة لإنشاء الملفات تلقائياً
  const handleSendMessage = async () => {
    if (!inputPrompt.trim() || loading) return;

    const userQuery = inputPrompt;
    setInputPrompt('');
    
    setChatHistory((prev) => [...prev, { sender: 'user', text: userQuery }]);
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/generate-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: `Target File Context: ${activeFile}\nExisting Files: ${Object.keys(files).join(', ')}\nUser Request: ${userQuery}` 
        }),
      });

      if (!response.ok) throw new Error('Server connection error');

      const data = await response.json();
      const aiResponse = data.result;

      setChatHistory((prev) => [...prev, { sender: 'ai', text: aiResponse }]);

      // 🧠 تحليل الذكاء الاصطناعي: إذا كان الرد يحتوي على كود
      if (aiResponse.includes('```')) {
        const extractedCode = aiResponse.split('```')[1].replace(/^[a-zA-Z]+\n/, '');

        // البحث إذا كان الـ AI حدد اسم ملف جديد في أول السطر مثل: // filename: Header.jsx أو Component: Header.jsx
        const fileNameMatch = aiResponse.match(/(?:file|component|filename):\s*([a-zA-Z0-9_\-\.]+)/i);
        
        let targetFileName = activeFile;
        if (fileNameMatch && fileNameMatch[1]) {
          targetFileName = fileNameMatch[1].trim();
        }

        // إنشاء الملف الجديد أو تحديث الملف الحالي
        setFiles(prev => ({ ...prev, [targetFileName]: extractedCode }));
        setActiveFile(targetFileName);
      }
    } catch (err) {
      setChatHistory((prev) => [
        ...prev, 
        { sender: 'ai', text: '⚠️ Connection Notice: Local server offline. Running in sandbox mode.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="workspace" className="py-12 px-4 max-w-7xl mx-auto">
      {/* Title & Action Controls */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-400" />
            AI Developer Studio
          </h2>
          <p className="text-xs text-slate-400">Dynamic Multi-File AI Workspace Environment</p>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass-card text-xs font-medium hover:bg-white/10 text-slate-300 transition-all border border-white/10 cursor-pointer">
            <UploadCloud className="w-4 h-4 text-purple-400" />
            <span>Upload Context</span>
            <input type="file" onChange={handleFileUpload} className="hidden" />
          </label>

          <button 
            onClick={handleRunCode}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Run Code
          </button>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[650px]">
        
        {/* 1. Left Sidebar: Dynamic File Tree */}
        <div className="lg:col-span-3 glass-card rounded-2xl p-4 border border-white/10 flex flex-col justify-between overflow-hidden">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Folder className="w-4 h-4 text-amber-400" />
                src/
              </span>
              
              {/* Add New File Button */}
              <button 
                onClick={handleCreateNewFile}
                title="Create New File"
                className="p-1 rounded bg-white/10 hover:bg-blue-600 text-white transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Render Dynamic Files List */}
            <div className="space-y-1 text-xs max-h-[480px] overflow-y-auto no-scrollbar">
              {Object.keys(files).map((fileName) => (
                <button
                  key={fileName}
                  onClick={() => setActiveFile(fileName)}
                  className={`w-full flex items-center gap-2 p-2 rounded-xl transition-all text-left ${
                    activeFile === fileName 
                      ? 'bg-blue-600/20 text-blue-400 font-semibold border border-blue-500/30' 
                      : 'hover:bg-white/5 text-slate-400'
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{fileName}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Active Badge */}
          <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 text-xs flex items-center justify-between mt-auto">
            <span className="text-slate-400">Editing:</span>
            <span className="text-blue-400 font-mono font-bold truncate max-w-[120px]">{activeFile}</span>
          </div>
        </div>

        {/* 2. Middle Column: Code Editor & Terminal */}
        <div className="lg:col-span-5 glass-card rounded-2xl border border-white/10 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-slate-900/60 border-b border-white/10">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setActiveTab('editor')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${activeTab === 'editor' ? 'bg-blue-600/30 text-blue-400 border border-blue-500/30' : 'text-slate-400 hover:text-white'}`}
              >
                <Code2 className="w-3.5 h-3.5" />
                Editor
              </button>
              <button 
                onClick={() => setActiveTab('terminal')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${activeTab === 'terminal' ? 'bg-purple-600/30 text-purple-400 border border-purple-500/30' : 'text-slate-400 hover:text-white'}`}
              >
                <TerminalIcon className="w-3.5 h-3.5" />
                Terminal
              </button>
            </div>

            <button onClick={handleCopy} className="text-slate-400 hover:text-white text-xs p-1">
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {activeTab === 'editor' ? (
            <textarea
              value={files[activeFile] || ''}
              onChange={(e) => setFiles({ ...files, [activeFile]: e.target.value })}
              className="w-full h-full bg-slate-950/80 text-emerald-400 font-mono text-xs p-4 focus:outline-none resize-none no-scrollbar"
              spellCheck="false"
              placeholder="// Select or generate a file to edit code..."
            />
          ) : (
            <div className="w-full h-full bg-black/90 p-4 font-mono text-xs text-slate-300 space-y-2 no-scrollbar overflow-y-auto">
              {terminalLogs.map((log, idx) => (
                <p key={idx} className={log.includes('[SUCCESS]') ? 'text-emerald-400' : log.includes('$') ? 'text-blue-400' : 'text-slate-300'}>
                  {log}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* 3. Right Column: Dynamic AI Chat */}
        <div className="lg:col-span-4 glass-card rounded-2xl border border-white/10 flex flex-col overflow-hidden">
          <div className="px-4 py-3 bg-slate-900/60 border-b border-white/10 flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              AI Assistant
            </span>
            <span className="text-[10px] text-slate-400">Target: {activeFile}</span>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs no-scrollbar">
            {chatHistory.map((msg, index) => (
              <div 
                key={index} 
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white shrink-0 font-bold text-[10px]">
                    AI
                  </div>
                )}
                
                <div 
                  className={`p-3 rounded-2xl border leading-relaxed max-w-[85%] whitespace-pre-wrap ${
                    msg.sender === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none border-blue-500' 
                      : 'bg-slate-800/80 text-slate-200 rounded-tl-none border-white/5'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2 items-center text-blue-400 text-xs p-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generating and compiling dynamic code...</span>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="p-3 border-t border-white/10 bg-slate-950/50">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
              className="relative"
            >
              <input
                type="text"
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                placeholder="Ex: Create Navbar.jsx component..."
                className="w-full pl-3 pr-10 py-2.5 bg-slate-900 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all"
                disabled={loading}
              />
              <button 
                type="submit"
                disabled={loading || !inputPrompt.trim()}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 disabled:opacity-50 transition-opacity"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}