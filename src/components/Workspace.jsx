import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { 
  Code2, Terminal as TerminalIcon, Send, FileCode, Folder, 
  Play, Sparkles, Copy, Check, UploadCloud, Loader2, Plus,
  Wand2, Cpu, FileSearch, Layout
} from 'lucide-react';

export default function Workspace() {
  const [activeTab, setActiveTab] = useState('editor'); // editor | terminal
  const [inputPrompt, setInputPrompt] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  // قائمة الملفات الديناميكية
  const [files, setFiles] = useState({
    'App.jsx': `// Welcome to AETHER.OS Realtime AI Engine
import React from 'react';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <h1 className="text-3xl font-bold text-blue-400">AETHER.OS Active Environment</h1>
    </div>
  );
}`
  });

  const [activeFile, setActiveFile] = useState('App.jsx');

  // مخرجات الترمينال
  const [terminalLogs, setTerminalLogs] = useState([
    '$ aether-os --init local-cluster',
    '[SUCCESS] Monaco Editor & AI Engine Integrated',
    '$ ready for project instructions_'
  ]);

  // سجل المحادثة
  const [chatHistory, setChatHistory] = useState([
    { 
      sender: 'ai', 
      text: 'مرحباً بك! أنا مهندس البرمجيات الخاص بك في AETHER.OS. اختر كارت من الأوامر السريعة أو أطلب مني بناء أي مكون!' 
    }
  ]);

  // تحديد لغة الملف تلقائياً لـ Monaco Editor
  const getLanguage = (filename) => {
    if (filename.endsWith('.js') || filename.endsWith('.jsx')) return 'javascript';
    if (filename.endsWith('.ts') || filename.endsWith('.tsx')) return 'typescript';
    if (filename.endsWith('.css')) return 'css';
    if (filename.endsWith('.html')) return 'html';
    if (filename.endsWith('.json')) return 'json';
    if (filename.endsWith('.py')) return 'python';
    return 'javascript';
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(files[activeFile] || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCreateNewFile = () => {
    const fileName = prompt('Enter new file name (e.g. Navbar.jsx, styles.css):');
    if (fileName && !files[fileName]) {
      setFiles(prev => ({ ...prev, [fileName]: `// New file: ${fileName}\n` }));
      setActiveFile(fileName);
    }
  };

  const handleRunCode = () => {
    setActiveTab('terminal');
    setTerminalLogs(prev => [
      ...prev,
      `\n$ npm run build --file=${activeFile}`,
      `[BUILD] Compiling ${activeFile} with Vite...`,
      `[SUCCESS] Active file executed successfully in Monaco Sandbox ✨`
    ]);
  };

  // Quick Action Click Handler
  const handleQuickAction = (promptText) => {
    setInputPrompt(promptText);
  };

  const handleSendMessage = async () => {
    if (!inputPrompt.trim() || loading) return;

    const userQuery = inputPrompt;
    setInputPrompt('');
    
    setChatHistory((prev) => [...prev, { sender: 'user', text: userQuery }]);
    setLoading(true);

    try {
      // الاتصال بالـ Serverless Endpoint المرفوع
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: `Target File Context: ${activeFile}\nExisting Files: ${Object.keys(files).join(', ')}\nUser Request: ${userQuery}` 
        }),
      });

      let aiResponse = "";

      if (response.ok) {
        const data = await response.json();
        aiResponse = data.result;
      } else {
        // قراءة رسالة الخطأ القادمة من Vercel أو السيرفر بالتفصيل
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server Status ${response.status}: Failed to reach API`);
      }

      setChatHistory((prev) => [...prev, { sender: 'ai', text: aiResponse }]);

      if (aiResponse.includes('```')) {
        const extractedCode = aiResponse.split('```')[1].replace(/^[a-zA-Z]+\n/, '');
        const fileNameMatch = aiResponse.match(/(?:file|component|filename):\s*([a-zA-Z0-9_\-\.]+)/i);
        
        let targetFileName = activeFile;
        if (fileNameMatch && fileNameMatch[1]) {
          targetFileName = fileNameMatch[1].trim();
        }

        setFiles(prev => ({ ...prev, [targetFileName]: extractedCode }));
        setActiveFile(targetFileName);
      }
    } catch (err) {
      // طباعة الخطأ الصريح في الشات
      setChatHistory((prev) => [
        ...prev, 
        { sender: 'ai', text: `⚠️ API Connection Notice: ${err.message}` }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="workspace" className="py-8 px-4 max-w-7xl mx-auto space-y-6">
      
      {/* 🚀 Quick Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button 
          onClick={() => handleQuickAction("Create a new fullstack project architecture with React and Tailwind.")}
          className="p-4 rounded-2xl glass-card border border-white/10 hover:border-blue-500/50 hover:bg-white/5 transition-all text-left group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-3 group-hover:scale-110 transition-transform">
            <Wand2 className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">Create Project</h3>
          <p className="text-xs text-slate-400 mt-1">Initialize clean AI boilerplate</p>
        </button>

        <button 
          onClick={() => handleQuickAction("Write a clean production-ready React component with modern hooks.")}
          className="p-4 rounded-2xl glass-card border border-white/10 hover:border-purple-500/50 hover:bg-white/5 transition-all text-left group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-3 group-hover:scale-110 transition-transform">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">Generate Code</h3>
          <p className="text-xs text-slate-400 mt-1">Write optimized architecture</p>
        </button>

        <button 
          onClick={() => handleQuickAction("Analyze current code for security bugs and performance improvements.")}
          className="p-4 rounded-2xl glass-card border border-white/10 hover:border-emerald-500/50 hover:bg-white/5 transition-all text-left group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-110 transition-transform">
            <FileSearch className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">Analyze Files</h3>
          <p className="text-xs text-slate-400 mt-1">Audit and refactor codebase</p>
        </button>

        <button 
          onClick={() => handleQuickAction("Build a modern cyberpunk landing page UI component.")}
          className="p-4 rounded-2xl glass-card border border-white/10 hover:border-amber-500/50 hover:bg-white/5 transition-all text-left group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-3 group-hover:scale-110 transition-transform">
            <Layout className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">Build Website</h3>
          <p className="text-xs text-slate-400 mt-1">Prompt to React / Next UI</p>
        </button>
      </div>

      {/* Header Studio Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-400" />
            AI Developer Studio
          </h2>
          <p className="text-xs text-slate-400">Monaco IDE Powered Realtime Code Environment</p>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass-card text-xs font-medium hover:bg-white/10 text-slate-300 transition-all border border-white/10 cursor-pointer">
            <UploadCloud className="w-4 h-4 text-purple-400" />
            <span>Upload Context</span>
            <input type="file" className="hidden" />
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
        
        {/* 1. Dynamic File Tree Sidebar */}
        <div className="lg:col-span-3 glass-card rounded-2xl p-4 border border-white/10 flex flex-col justify-between overflow-hidden">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Folder className="w-4 h-4 text-amber-400" />
                src/
              </span>
              <button 
                onClick={handleCreateNewFile}
                className="p-1 rounded bg-white/10 hover:bg-blue-600 text-white transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-1 text-xs max-h-[480px] overflow-y-auto no-scrollbar">
              {Object.keys(files).map((fileName) => (
                <button
                  key={fileName}
                  onClick={() => setActiveFile(fileName)}
                  className={`w-full flex items-center gap-2 p-2 rounded-xl transition-all text-left cursor-pointer ${
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

          <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 text-xs flex items-center justify-between mt-auto">
            <span className="text-slate-400">Editing:</span>
            <span className="text-blue-400 font-mono font-bold truncate max-w-[120px]">{activeFile}</span>
          </div>
        </div>

        {/* 2. Monaco Editor & Live Terminal */}
        <div className="lg:col-span-5 glass-card rounded-2xl border border-white/10 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-slate-900/60 border-b border-white/10">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setActiveTab('editor')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${activeTab === 'editor' ? 'bg-blue-600/30 text-blue-400 border border-blue-500/30' : 'text-slate-400 hover:text-white'}`}
              >
                <Code2 className="w-3.5 h-3.5" />
                Editor
              </button>
              <button 
                onClick={() => setActiveTab('terminal')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${activeTab === 'terminal' ? 'bg-purple-600/30 text-purple-400 border border-purple-500/30' : 'text-slate-400 hover:text-white'}`}
              >
                <TerminalIcon className="w-3.5 h-3.5" />
                Terminal
              </button>
            </div>

            <button onClick={handleCopy} className="text-slate-400 hover:text-white text-xs p-1 cursor-pointer">
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {activeTab === 'editor' ? (
            <div className="w-full h-full pt-2 bg-[#1e1e1e]">
              <Editor
                height="100%"
                theme="vs-dark"
                language={getLanguage(activeFile)}
                value={files[activeFile] || ''}
                onChange={(value) => setFiles({ ...files, [activeFile]: value || '' })}
                options={{
                  fontSize: 12,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 2,
                  fontFamily: 'Fira Code, monospace',
                }}
              />
            </div>
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

        {/* 3. Right Column: AI Chat */}
        <div className="lg:col-span-4 glass-card rounded-2xl border border-white/10 flex flex-col overflow-hidden">
          <div className="px-4 py-3 bg-slate-900/60 border-b border-white/10 flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              AI Assistant
            </span>
            <span className="text-[10px] text-slate-400">Target: {activeFile}</span>
          </div>

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
                <span>AETHER AI is coding in Monaco...</span>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-white/10 bg-slate-950/50">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
              className="relative"
            >
              <input
                type="text"
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                placeholder="Ask AI to code or click a Quick Action above..."
                className="w-full pl-3 pr-10 py-2.5 bg-slate-900 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all"
                disabled={loading}
              />
              <button 
                type="submit"
                disabled={loading || !inputPrompt.trim()}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 disabled:opacity-50 transition-opacity cursor-pointer"
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