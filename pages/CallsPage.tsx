import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext.tsx';
import Layout from '../components/Layout.tsx';
import Icon from '../components/Icon.tsx';
import { CallType } from '../types.ts';

const CallsPage: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  
  const myInfo = state.myInfo;

  const filteredCalls = useMemo(() => {
    return state.calls.filter(call => {
      const contact = state.contacts.find(c => c.id === call.contactId);
      return contact?.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [searchQuery, state.calls, state.contacts]);

  const getCallIcon = (direction: 'incoming' | 'outgoing' | 'missed') => {
    switch (direction) {
      case 'incoming': return { icon: 'call_received', color: 'text-green-500' };
      case 'outgoing': return { icon: 'call_made', color: 'text-blue-500' };
      case 'missed': return { icon: 'call_missed', color: 'text-red-500' };
    }
  };

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
        <button onClick={() => setIsSearchVisible(!isSearchVisible)} className="text-white">
          <Icon name="search" />
        </button>
      }
    >
      <div className="flex flex-col">
        {isSearchVisible && (
          <div className="p-2 bg-slate-100">
            <input
              type="text"
              placeholder="Search calls..."
              className="w-full px-3 py-2 rounded-lg border border-slate-300"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        )}
        <div className="p-4 font-semibold text-slate-700 border-b border-slate-200">
          Recent Calls
        </div>
        <div className="flex-1">
          {filteredCalls.map(call => {
            const contact = state.contacts.find(c => c.id === call.contactId);
            const callIcon = getCallIcon(call.direction);
            return (
              <div key={call.id} className="flex items-center p-3 hover:bg-slate-50 cursor-pointer border-b border-slate-100">
                <img src={contact?.avatar} className="w-12 h-12 rounded-full object-cover mr-4" alt={contact?.name} />
                <div className="flex-1">
                  <p className={`font-semibold ${call.direction === 'missed' ? 'text-red-500' : 'text-slate-800'}`}>{contact?.name}</p>
                  <div className="flex items-center text-sm text-slate-500">
                    <Icon name={callIcon.icon} className={`mr-1 text-base ${callIcon.color}`} />
                    <span>{call.timestamp}</span>
                  </div>
                </div>
                <button onClick={() => navigate(`/call/${call.type}/${contact?.id}`)} className="text-blue-600">
                  <Icon name={call.type === CallType.VIDEO ? 'videocam' : 'call'} className="text-2xl" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
       <button className="fixed bottom-20 right-5 bg-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg">
        <Icon name="add_ic_call" />
      </button>
    </Layout>
  );
};

export default CallsPage;
