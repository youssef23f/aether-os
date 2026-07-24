import { useState } from 'react';
import { 
  Plus, FolderPlus, Pin, MessageSquare, Trash2, Folder, 
  ChevronRight, ChevronDown, Cpu, Sparkles 
} from 'lucide-react';

export default function ChatSidebar({ 
  chats, 
  folders, 
  activeChatId, 
  onSelectChat, 
  onNewChat, 
  onCreateFolder, 
  onPinChat, 
  onDeleteChat,
  selectedModel,
  onSelectModel
}) {
  const [openFolders, setOpenFolders] = useState({});

  const toggleFolder = (folderId) => {
    setOpenFolders(prev => ({ ...prev, [folderId]: !prev[folderId] }));
  };

  const pinnedChats = chats.filter(c => c.isPinned);
  const unpinnedChats = chats.filter(c => !c.isPinned);

  return (
    <div className="w-64 glass-card border-r border-white/10 p-3 flex flex-col justify-between h-full text-xs font-sans">
      
      {/* 1. Header & Actions */}
      <div className="space-y-3">
        {/* Model Selector dropdown */}
        <div className="p-2 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Cpu className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-semibold">Model:</span>
          </div>
          <select 
            value={selectedModel} 
            onChange={(e) => onSelectModel(e.target.value)}
            className="bg-transparent text-amber-400 font-mono text-[11px] outline-none cursor-pointer font-bold"
          >
            <option value="auto-router" className="bg-slate-900 text-emerald-400">⚡ Auto Smart Router</option>
            <option value="deepseek-chat" className="bg-slate-900 text-purple-400">🧠 DeepSeek Chat</option>
            <option value="llama-3.1-70b-instruct" className="bg-slate-900 text-amber-400">🛡️ Llama 3.1 Instruct</option>
            <option value="flux-1-dev" className="bg-slate-900 text-rose-400">🎨 FLUX.1-dev</option>
          </select>
        </div>

        {/* Buttons for New Chat & New Folder */}
        <div className="flex gap-2">
          <button 
            onClick={onNewChat}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white font-semibold shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            New Chat
          </button>

          <button 
            onClick={onCreateFolder}
            className="p-2 rounded-xl glass-card hover:bg-white/10 border border-white/10 text-slate-300 transition-all cursor-pointer"
            title="Create Folder"
          >
            <FolderPlus className="w-4 h-4 text-purple-400" />
          </button>
        </div>

        {/* 2. Pinned Chats Section */}
        {pinnedChats.length > 0 && (
          <div className="space-y-1 pt-2 border-t border-white/5">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 mb-1">
              <Pin className="w-3 h-3 text-amber-400" />
              Pinned Chats
            </div>
            {pinnedChats.map(chat => (
              <ChatItem 
                key={chat.id} 
                chat={chat} 
                activeChatId={activeChatId} 
                onSelectChat={onSelectChat}
                onPinChat={onPinChat}
                onDeleteChat={onDeleteChat}
              />
            ))}
          </div>
        )}

        {/* 3. Folders & Regular Chats */}
        <div className="space-y-1 max-h-[350px] overflow-y-auto no-scrollbar pt-2 border-t border-white/5">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            All Conversations
          </div>

          {/* Folders List */}
          {folders.map(folder => (
            <div key={folder.id} className="space-y-1">
              <button 
                onClick={() => toggleFolder(folder.id)}
                className="w-full flex items-center justify-between p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-1.5 truncate">
                  {openFolders[folder.id] ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                  <Folder className="w-3.5 h-3.5 text-amber-400" />
                  <span className="truncate">{folder.name}</span>
                </div>
              </button>

              {/* Folder Chat Contents */}
              {openFolders[folder.id] && (
                <div className="pl-3 space-y-1 border-l border-white/10 ml-2">
                  {unpinnedChats.filter(c => c.folderId === folder.id).map(chat => (
                    <ChatItem 
                      key={chat.id} 
                      chat={chat} 
                      activeChatId={activeChatId} 
                      onSelectChat={onSelectChat}
                      onPinChat={onPinChat}
                      onDeleteChat={onDeleteChat}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Root Level Chats (Without Folders) */}
          {unpinnedChats.filter(c => !c.folderId).map(chat => (
            <ChatItem 
              key={chat.id} 
              chat={chat} 
              activeChatId={activeChatId} 
              onSelectChat={onSelectChat}
              onPinChat={onPinChat}
              onDeleteChat={onDeleteChat}
            />
          ))}
        </div>
      </div>

      {/* Footer System Info */}
      <div className="p-2 rounded-xl bg-slate-900/50 border border-white/5 text-[10px] text-slate-500 flex items-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-blue-400" />
        <span>AETHER Memory Engine Active</span>
      </div>
    </div>
  );
}

// Subcomponent for individual Chat Item
function ChatItem({ chat, activeChatId, onSelectChat, onPinChat, onDeleteChat }) {
  return (
    <div 
      onClick={() => onSelectChat(chat.id)}
      className={`group flex items-center justify-between p-2 rounded-xl cursor-pointer transition-all ${
        activeChatId === chat.id 
          ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 font-semibold' 
          : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
      }`}
    >
      <div className="flex items-center gap-2 truncate pr-1">
        <MessageSquare className="w-3.5 h-3.5 shrink-0" />
        <span className="truncate">{chat.title || 'New Conversation'}</span>
      </div>

      <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
        <button 
          onClick={(e) => { e.stopPropagation(); onPinChat(chat.id); }}
          className={`p-1 hover:text-amber-400 ${chat.isPinned ? 'text-amber-400' : ''}`}
          title="Pin Chat"
        >
          <Pin className="w-3 h-3" />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); onDeleteChat(chat.id); }}
          className="p-1 hover:text-rose-400"
          title="Delete Chat"
        >
          <Trash2 className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}