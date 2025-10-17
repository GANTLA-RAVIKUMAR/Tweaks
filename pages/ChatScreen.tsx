import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext.tsx';
import Icon from '../components/Icon.tsx';
import { Message } from '../types.ts';

interface ChatScreenProps {
  isIncognito: boolean;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ isIncognito }) => {
  const { chatId } = useParams<{ chatId: string }>();
  const navigate = useNavigate();
  const { state, dispatch } = useAppContext();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chat = isIncognito
    ? state.incognitoChats.find(c => c.id === chatId)
    : state.chats.find(c => c.id === chatId);

  const contact = state.contacts.find(c => c.id === chat?.contactId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat?.messages]);

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      senderId: 'me',
      status: 'sent',
    };

    dispatch({
      type: 'SEND_MESSAGE',
      payload: { chatId: chatId!, message: newMessage, isIncognito },
    });

    setInputText('');
  };
  
  if (!chat || !contact) {
    return <div className="flex items-center justify-center h-screen">Chat not found.</div>;
  }
  
  const headerClass = isIncognito ? 'bg-slate-800' : 'bg-blue-600';
  const backgroundClass = isIncognito ? 'bg-slate-900' : 'bg-slate-100';
  const myMessageClass = isIncognito ? 'bg-slate-700' : 'bg-blue-500 text-white';
  const contactMessageClass = isIncognito ? 'bg-slate-600' : 'bg-white';

  return (
    <div className="flex flex-col h-screen">
      <header className={`flex items-center p-3 text-white shadow-md sticky top-0 z-10 ${headerClass}`}>
        <button onClick={() => navigate('/')} className="mr-3">
          <Icon name="arrow_back" />
        </button>
        <img src={contact.avatar} className="w-10 h-10 rounded-full object-cover mr-3" alt={contact.name} />
        <div className="flex-1">
          <h1 className="text-lg font-bold">{contact.name}</h1>
          <p className="text-xs opacity-80">{contact.onlineStatus}</p>
        </div>
        <div className="flex items-center gap-4">
          <button><Icon name="videocam" /></button>
          <button><Icon name="call" /></button>
          <button><Icon name="more_vert" /></button>
        </div>
      </header>

      <main className={`flex-1 overflow-y-auto p-4 ${backgroundClass}`}>
        {chat.messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'} mb-3`}>
            <div className={`max-w-xs md:max-w-md p-3 rounded-2xl shadow ${msg.senderId === 'me' ? myMessageClass + ' rounded-br-none' : contactMessageClass + ' rounded-bl-none'}`}>
              <p className="text-sm">{msg.text}</p>
              <p className={`text-xs mt-1 text-right ${msg.senderId === 'me' ? 'text-white/70' : 'text-slate-400'}`}>{msg.timestamp}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>

      <footer className={`p-2 border-t sticky bottom-0 ${isIncognito ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
        <div className="flex items-center">
          <button className="p-2 text-slate-500"><Icon name="mood" /></button>
          <input
            type="text"
            placeholder="Message"
            className="flex-1 bg-slate-100 rounded-full px-4 py-2 focus:outline-none"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
          />
          <button className="p-2 text-slate-500"><Icon name="attach_file" /></button>
          <button onClick={handleSendMessage} className="p-2 text-blue-600"><Icon name="send" /></button>
          <button onClick={() => navigate('/')} className="p-2 text-red-500" title="Emergency Exit">
            <Icon name="exit_to_app" />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ChatScreen;
