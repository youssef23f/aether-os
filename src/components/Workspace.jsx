import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import ChatSidebar from './ChatSidebar';
import { 
  Send, Sparkles, Copy, Loader2, 
  ThumbsUp, ThumbsDown, Mic, Box, PanelLeftOpen, PanelLeftClose, Menu, X
} from 'lucide-react';

export default function Workspace() {
  const [activeTab, setActiveTab] = useState('editor');
  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // 👁️ التحكم في IDE
  const [isIdeOpen, setIsIdeOpen] = useState(false);
  
  // 📱 التحكم في القائمة الجانبية للموبايل
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // 🤖 الموديلات والـ Persona
  const [selectedModel, setSelectedModel] = useState('auto-router');
  const [systemPersona, setSystemPersona] = useState('developer'); 

  // 📂 الذاكرة
  const [folders, setFolders] = useState(() => {
    const saved = localStorage.getItem('aether_folders');
    return saved ? JSON.parse(saved) : [{ id: 'f1', name: 'Web Apps' }];
  });

  const [chats, setChats] = useState(() => {
    const saved = localStorage.getItem('aether_chats');
    return saved ? JSON.parse(saved) : [
      { id: 'c1', title: 'محادثة جديدة', folderId: 'f1', isPinned: false, messages: [] }
    ];
  });

  const [activeChatId, setActiveChatId] = useState('c1');

  // 🎨 Artifacts State
  const [artifacts, setArtifacts] = useState([]);
  const [activeArtifact, setActiveArtifact] = useState(null);

  // 🧠 إدارة الملفات
  const [files, setFiles] = useState({
    'index.html': `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
  <title>AETHER App</title>
</head>
<body class="bg-slate-950 text-white min-h-screen flex items-center justify-center p-4">
  <div class="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center max-w-md shadow-2xl">
    <h1 class="text-2xl font-bold text-blue-400">تحديث AETHER الشامل 🚀</h1>
    <p class="text-slate-400 text-sm mt-2">معاينة حية وميزات ذكاء اصطناعية متطورة.</p>
  </div>
</body>
</html>`,
    'styles.css': `body { font-family: system-ui, sans-serif; }`,
    'script.js': `console.log("AETHER Engine Ready");`
  });

  const [activeFile, setActiveFile] = useState('index.html');
  const [srcDoc, setSrcDoc] = useState('');

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('aether_folders', JSON.stringify(folders));
    localStorage.setItem('aether_chats', JSON.stringify(chats));
  }, [folders, chats]);

  // Update Live Preview
  useEffect(() => {
    const html = files['index.html'] || '';
    const css = files['styles.css'] || '';
    const js = files['script.js'] || '';

    setSrcDoc(`
      <!DOCTYPE html>
      <html>
        <head><style>${css}</style></head>
        <body>${html}<script>${js}</script></body>
      </html>
    `);
  }, [files]);

  // 🎙️ Speech-to-Text
  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('المتصفح لا يدعم التعرف على الصوت.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'ar-SA';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      setInputPrompt((prev) => prev + ' ' + event.results[0][0].transcript);
    };

    recognition.start();
  };

  // 📝 Chat Actions
  const handleNewChat = () => {
    const newId = 'c_' + Date.now();
    const newChat = { id: newId, title: 'محادثة جديدة', folderId: null, isPinned: false, messages: [] };
    setChats(prev => [newChat, ...prev]);
    setActiveChatId(newId);
    setIsIdeOpen(false);
    setIsMobileSidebarOpen(false);
  };

  const handleCreateFolder = () => {
    const name = prompt('أدخل اسم المجلد الجديد:');
    if (name) setFolders(prev => [...prev, { id: 'f_' + Date.now(), name }]);
  };

  const handlePinChat = (id) => {
    setChats(prev => prev.map(c => c.id === id ? { ...c, isPinned: !c.isPinned } : c));
  };

  const handleDeleteChat = (id) => {
    setChats(prev => prev.filter(c => c.id !== id));
    if (activeChatId === id && chats.length > 1) setActiveChatId(chats[0].id);
  };

  // ✉️ Send Message
  const handleSendMessage = async () => {
    if (!inputPrompt.trim() || loading) return;

    const userText = inputPrompt;
    setInputPrompt('');

    const currentChat = chats.find(c => c.id === activeChatId) || { messages: [] };
    
    let updatedTitle = currentChat.title;
    if (currentChat.messages.length === 0 || currentChat.title === 'محادثة جديدة') {
      updatedTitle = userText.slice(0, 25) + '...';
    }

    const userMsg = { sender: 'user', text: userText, feedback: null };
    const updatedMessages = [...currentChat.messages, userMsg];

    setChats(prev => prev.map(c => c.id === activeChatId ? { ...c, title: updatedTitle, messages: updatedMessages } : c));
    setLoading(true);

    const isCodeRequested = /كود|برمج|صفحة|html|css|javascript|react|python|build|create/i.test(userText);
    if (isCodeRequested) setIsIdeOpen(true);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: userText,
          preferredModel: selectedModel,
          systemPersona: systemPersona
        }),
      });

      let aiText = "";
      let generatedImg = null;

      if (response.ok) {
        const data = await response.json();
        aiText = data.result;
        if (data.image) generatedImg = data.image;
      } else {
        aiText = "أنا جاهز لمساعدتك! يمكنك طلب أي كود أو استفسار.";
      }

      if (aiText.includes('```')) {
        setIsIdeOpen(true);
        const match = aiText.match(/```(\w+)?\n([\s\S]*?)```/);
        if (match) {
          const codeContent = match[2];
          const lang = match[1] ? match[1].toLowerCase() : 'html';

          if (lang === 'html') setFiles(prev => ({ ...prev, 'index.html': codeContent }));
          else if (lang === 'css') setFiles(prev => ({ ...prev, 'styles.css': codeContent }));
          else if (lang === 'javascript' || lang === 'js') setFiles(prev => ({ ...prev, 'script.js': codeContent }));

          const newArtifact = {
            id: 'art_' + Date.now(),
            title: `Code Snippet - ${userText.slice(0, 15)}`,
            type: lang,
            content: codeContent
          };
          setArtifacts(prev => [newArtifact, ...prev]);
          setActiveArtifact(newArtifact);
        }
      }

      const aiMsg = { sender: 'ai', text: aiText, image: generatedImg, feedback: null };
      setChats(prev => prev.map(c => c.id === activeChatId ? { ...c, messages: [...c.messages, aiMsg] } : c));

    } catch (err) {
      const errorMsg = { sender: 'ai', text: `خطأ في الاتصال: ${err.message}`, feedback: null };
      setChats(prev => prev.map(c => c.id === activeChatId ? { ...c, messages: [...c.messages, errorMsg] } : c));
    } finally {
      setLoading(false);
    }
  };

  const handleFeedback = (msgIndex, type) => {
    setChats(prev => prev.map(chat => {
      if (chat.id === activeChatId) {
        const updatedMsgs = [...chat.messages];
        updatedMsgs[msgIndex].feedback = type;
        return { ...chat, messages: updatedMsgs };
      }
      return chat;
    }));
  };

  const currentChat = chats.find(c => c.id === activeChatId) || { messages: [] };

  return (
    <section className="py-2 md:py-6 px-2 md:px-4 max-w-[1700px] mx-auto flex flex-col md:flex-row gap-4 h-[calc(100vh-80px)] md:h-[830px]">
      
      {/* 📱 Overlay Overlay for Mobile Sidebar */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/70 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* 📁 Sidebar Drawer Component */}
      <div className={`
        fixed md:relative z-50 md:z-auto top-0 right-0 h-full w-[280px] md:w-auto
        transform transition-transform duration-300 ease-in-out bg-slate-950 md:bg-transparent
        ${isMobileSidebarOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
      `}>
        <ChatSidebar 
          chats={chats}
          folders={folders}
          activeChatId={activeChatId}
          onSelectChat={(id) => { setActiveChatId(id); setIsMobileSidebarOpen(false); }}
          onNewChat={handleNewChat}
          onCreateFolder={handleCreateFolder}
          onPinChat={handlePinChat}
          onDeleteChat={handleDeleteChat}
          selectedModel={selectedModel}
          onSelectModel={setSelectedModel}
        />
      </div>

      {/* 💻 Studio Area */}
      <div className="flex-1 flex flex-col gap-3 h-full overflow-hidden">
        
        {/* Top Navigation Bar */}
        <div className="glass-card p-2 md:p-3 rounded-2xl border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            
            {/* ☰ Mobile Sidebar Toggle */}
            <button 
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className="p-1.5 md:hidden bg-slate-900 rounded-xl text-slate-300 border border-white/10"
            >
              {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="hidden sm:inline">AETHER Studio</span>
            </span>

            {/* Mode Persona */}
            <div className="flex items-center gap-1 bg-slate-900/80 p-0.5 md:p-1 rounded-xl border border-white/5 text-[10px] md:text-[11px]">
              <button 
                onClick={() => setSystemPersona('developer')} 
                className={`px-2 py-0.5 rounded-lg transition-all ${systemPersona === 'developer' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
              >
                Dev
              </button>
              <button 
                onClick={() => setSystemPersona('architect')} 
                className={`px-2 py-0.5 rounded-lg transition-all ${systemPersona === 'architect' ? 'bg-purple-600 text-white' : 'text-slate-400'}`}
              >
                Arch
              </button>
            </div>
          </div>

          {/* IDE Toggle */}
          <button 
            onClick={() => setIsIdeOpen(!isIdeOpen)}
            className={`flex items-center gap-1.5 px-2.5 py-1 md:px-3 md:py-1.5 rounded-xl text-xs font-medium border transition-all ${
              isIdeOpen 
                ? 'bg-blue-600/20 text-blue-400 border-blue-500/30' 
                : 'bg-slate-900 text-slate-400 border-white/10 hover:text-white'
            }`}
          >
            {isIdeOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
            <span className="hidden sm:inline">{isIdeOpen ? 'Hide IDE' : 'Show IDE'}</span>
          </button>
        </div>

        {/* Dynamic Layout */}
        <div className="flex flex-col md:grid md:grid-cols-12 gap-4 flex-1 overflow-hidden">
          
          {/* IDE Workspace (In Desktop/Mobile when active) */}
          {isIdeOpen && (
            <div className="h-[40vh] md:h-auto md:col-span-7 glass-card rounded-2xl border border-white/10 overflow-hidden flex flex-col">
              <div className="flex items-center justify-between px-3 py-2 bg-slate-900/80 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <button onClick={() => setActiveTab('editor')} className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${activeTab === 'editor' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>Editor</button>
                  <button onClick={() => setActiveTab('preview')} className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${activeTab === 'preview' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}>Preview</button>
                  <button onClick={() => setActiveTab('artifacts')} className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${activeTab === 'artifacts' ? 'bg-purple-600 text-white' : 'text-slate-400'}`}>Artifacts</button>
                </div>
              </div>

              <div className="flex-1 bg-slate-950 overflow-hidden">
                {activeTab === 'editor' && (
                  <Editor height="100%" theme="vs-dark" language="html" value={files[activeFile]} onChange={(val) => setFiles({ ...files, [activeFile]: val || '' })} />
                )}
                {activeTab === 'preview' && (
                  <iframe title="Live Preview" srcDoc={srcDoc} className="w-full h-full bg-white border-none" />
                )}
                {activeTab === 'artifacts' && (
                  <div className="p-4 space-y-3 h-full bg-slate-950 overflow-y-auto">
                    <pre className="p-3 bg-slate-900 rounded-xl text-xs font-mono text-emerald-400 overflow-x-auto">
                      {activeArtifact?.content || 'لا توجد عناصر مخرجة بعد.'}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* AI Chat Window */}
          <div className={`${isIdeOpen ? 'md:col-span-5' : 'md:col-span-12'} flex-1 glass-card rounded-2xl border border-white/10 flex flex-col justify-between overflow-hidden`}>
            
            {/* Messages List */}
            <div className="p-3 md:p-4 overflow-y-auto space-y-3 text-xs flex-1 no-scrollbar">
              {currentChat.messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-2 text-center p-4">
                  <Sparkles className="w-8 h-8 text-blue-500/40 animate-pulse" />
                  <p className="text-xs md:text-sm font-medium">مرحباً بك! اسأل أو اطلب كود لفتح الـ IDE تلقائياً.</p>
                </div>
              ) : (
                currentChat.messages.map((msg, idx) => (
                  <div key={idx} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`p-3 rounded-2xl max-w-[90%] md:max-w-[85%] ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-200 border border-white/5'}`}>
                      {msg.text}
                      {msg.image && (
                        <img src={msg.image} alt="Generated" className="mt-2 rounded-xl w-full border border-white/10 shadow-lg" />
                      )}
                    </div>

                    {msg.sender === 'ai' && (
                      <div className="flex items-center gap-3 mt-1 px-1 text-[10px] text-slate-400">
                        <button onClick={() => navigator.clipboard.writeText(msg.text)} className="hover:text-white flex items-center gap-0.5">
                          <Copy className="w-3 h-3" /> نسخ
                        </button>
                        <button onClick={() => handleFeedback(idx, 'like')} className={`hover:text-emerald-400 ${msg.feedback === 'like' ? 'text-emerald-400' : ''}`}>
                          <ThumbsUp className="w-3 h-3" />
                        </button>
                        <button onClick={() => handleFeedback(idx, 'dislike')} className={`hover:text-rose-400 ${msg.feedback === 'dislike' ? 'text-rose-400' : ''}`}>
                          <ThumbsDown className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
              {loading && <Loader2 className="w-4 h-4 animate-spin text-blue-400" />}
            </div>

            {/* Input Form */}
            <div className="p-2 md:p-3 border-t border-white/10 bg-slate-950/60">
              <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex items-center gap-2">
                <button 
                  type="button" 
                  onClick={handleVoiceInput}
                  className={`p-2 md:p-2.5 rounded-xl border border-white/10 ${isListening ? 'bg-rose-600 text-white animate-pulse' : 'bg-slate-900 text-slate-400 hover:text-white'}`}
                >
                  <Mic className="w-4 h-4" />
                </button>

                <input
                  type="text"
                  value={inputPrompt}
                  onChange={(e) => setInputPrompt(e.target.value)}
                  placeholder="اسأل الذكاء الاصطناعي..."
                  className="flex-1 px-3 md:px-4 py-2 md:py-2.5 bg-slate-900 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                />

                <button type="submit" disabled={loading} className="p-2 md:p-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl">
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}