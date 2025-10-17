import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext.tsx';
import Layout from '../components/Layout.tsx';
import Icon from '../components/Icon.tsx';

const ChatsPage: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useAppContext();
  const [activeTab, setActiveTab] = useState<'all' | 'incognito'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const filteredChats = useMemo(() => {
    const chats = activeTab === 'all' ? state.chats : state.incognitoChats;
    return chats.filter(chat => {
      const contact = state.contacts.find(c => c.id === chat.contactId);
      return contact?.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [searchQuery, activeTab, state.chats, state.incognitoChats, state.contacts]);
  
  const myInfo = state.myInfo;

  return (
    <Layout
      leftActions={
        <img
          src={myInfo?.avatar}
          alt="Profile"
          className="w-9 h-9 rounded-full cursor-pointer"
          onClick={() => navigate('/profile')}
        />
      }
      rightActions={
        <>
          <button onClick={() => setIsSearchVisible(!isSearchVisible)} className="text-white">
            <Icon name="search" />
          </button>
          <button className="text-white">
            <Icon name="more_vert" />
          </button>
        </>
      }
    >
      <div className="flex flex-col">
        {isSearchVisible && (
          <div className="p-2 bg-slate-100">
            <input
              type="text"
              placeholder="Search chats..."
              className="w-full px-3 py-2 rounded-lg border border-slate-300"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        )}
        <div className="flex border-b border-slate-200">
          <button onClick={() => setActiveTab('all')} className={`flex-1 p-3 font-semibold ${activeTab === 'all' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500'}`}>
            All Chats
          </button>
          <button onClick={() => setActiveTab('incognito')} className={`flex-1 p-3 font-semibold ${activeTab === 'incognito' ? 'text-slate-800 border-b-2 border-slate-800' : 'text-slate-500'}`}>
            Incognito
          </button>
        </div>
        
        <div className="flex-1">
          {filteredChats.map(chat => {
            const contact = state.contacts.find(c => c.id === chat.contactId);
            const lastMessage = chat.messages[chat.messages.length - 1];
            return (
              <div key={chat.id} onClick={() => navigate(activeTab === 'all' ? `/chat/${chat.id}` : `/incognito-chat/${chat.id}`)} className="flex items-center p-3 hover:bg-slate-50 cursor-pointer border-b border-slate-100">
                <img src={contact?.avatar} className="w-12 h-12 rounded-full object-cover mr-4" alt={contact?.name} />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className={`font-semibold ${activeTab === 'incognito' ? 'text-slate-800' : 'text-slate-900'}`}>{contact?.name}</p>
                    <p className="text-xs text-slate-400">{lastMessage?.timestamp}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-slate-500 truncate">
                      {activeTab === 'incognito' ? 'Tap to view messages' : lastMessage?.text}
                    </p>
                    {chat.unreadCount > 0 && (
                      <span className="bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{chat.unreadCount}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
       <div className="fixed bottom-20 right-5 flex flex-col gap-3">
          <button onClick={() => navigate('/find-contact')} className="bg-slate-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
            <Icon name="person_search" />
          </button>
         <button onClick={() => navigate('/new-chat')} className="bg-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg">
            <Icon name="chat" />
          </button>
       </div>
    </Layout>
  );
};

export default ChatsPage;
