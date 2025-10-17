
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// FIX: Added .tsx extension to the import path to resolve module loading issue.
import { useAppContext } from '../contexts/AppContext.tsx';
import Icon from '../components/Icon';

const NewChatPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, dispatch } = useAppContext();
  
  const isIncognitoMode = new URLSearchParams(location.search).get('incognito') === 'true';

  const handleContactClick = (contactId: string) => {
    if (isIncognitoMode) {
      let chat = state.incognitoChats.find(c => c.contactId === contactId);
      if (chat) {
        navigate(`/incognito-chat/${chat.id}`);
      } else {
        const newChatId = `incog-${Date.now()}`;
        dispatch({ type: 'START_INCOGNITO_CHAT', payload: { contactId, id: newChatId } });
        navigate(`/incognito-chat/${newChatId}`);
      }
    } else {
      let chat = state.chats.find(c => c.contactId === contactId);
      if (chat) {
        navigate(`/chat/${chat.id}`);
      } else {
         const newChatId = `chat-${Date.now()}`;
        dispatch({ type: 'START_CHAT', payload: { contactId, id: newChatId } });
        navigate(`/chat/${newChatId}`);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <header className={`flex items-center p-3 text-white shadow-md sticky top-0 z-10 ${isIncognitoMode ? 'bg-slate-800' : 'bg-blue-600'}`}>
        <button onClick={() => navigate(-1)} className="mr-3">
          <Icon name="arrow_back" />
        </button>
        <div>
          <h1 className="text-xl font-bold">{isIncognitoMode ? 'New Incognito Chat' : 'Select Contact'}</h1>
          <p className="text-sm opacity-80">{state.contacts.filter(c => c.id !== 'me').length} contacts</p>
        </div>
      </header>
      
      <main className="flex-1 overflow-y-auto">
        {!isIncognitoMode && (
          <div className="p-2 border-b border-slate-100">
            <div onClick={() => navigate('/new-chat?incognito=true')} className="flex items-center p-3 text-blue-700 hover:bg-blue-50 rounded-lg cursor-pointer">
              <div className="bg-blue-100 p-2 rounded-full mr-4">
                <Icon name="privacy_tip" />
              </div>
              <span className="font-semibold">New Incognito Chat</span>
            </div>
          </div>
        )}
        
        {isIncognitoMode && (
             <div className="p-4 bg-slate-100 text-sm text-slate-600">
                <p>Chats are end-to-end encrypted. Messages in this chat will be removed when you close the app.</p>
            </div>
        )}

        <div>
          {state.contacts.filter(c => c.id !== 'me').map(contact => (
            <div key={contact.id} onClick={() => handleContactClick(contact.id)} className="flex items-center p-3 hover:bg-slate-50 cursor-pointer border-b border-slate-100">
              <img src={contact.avatar} className="w-11 h-11 rounded-full object-cover mr-4" alt={contact.name} />
              <div>
                <p className="font-semibold text-slate-800">{contact.name}</p>
                <p className="text-sm text-slate-500">{contact.statusText}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default NewChatPage;