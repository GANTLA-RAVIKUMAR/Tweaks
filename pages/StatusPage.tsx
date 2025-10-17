import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext.tsx';
import Layout from '../components/Layout.tsx';
import Icon from '../components/Icon.tsx';

const StatusPage: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const myStatus = state.statuses.find(s => s.contactId === state.myInfo?.id);
  
  const recentUpdates = useMemo(() => {
    return state.statuses.filter(status => {
      const contact = state.contacts.find(c => c.id === status.contactId);
      return status.contactId !== state.myInfo?.id && !status.viewed && contact?.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [state.statuses, state.contacts, state.myInfo, searchQuery]);

  const viewedUpdates = useMemo(() => {
    return state.statuses.filter(status => {
      const contact = state.contacts.find(c => c.id === status.contactId);
      return status.contactId !== state.myInfo?.id && status.viewed && contact?.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [state.statuses, state.contacts, state.myInfo, searchQuery]);
  
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
              placeholder="Search statuses..."
              className="w-full px-3 py-2 rounded-lg border border-slate-300"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        )}

        <div className="p-3">
          <div className="flex items-center cursor-pointer">
            <div className="relative">
              <img src={myStatus?.imageUrl || myInfo?.avatar} className="w-14 h-14 rounded-full object-cover" alt="My Status" />
              <button onClick={() => navigate('/add-status')} className="absolute bottom-0 right-0 bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
                <Icon name="add" className="text-base" />
              </button>
            </div>
            <div className="ml-4">
              <p className="font-semibold text-slate-800">My Status</p>
              <p className="text-sm text-slate-500">{myStatus ? myStatus.timestamp : 'Add to my status'}</p>
            </div>
          </div>
        </div>

        {recentUpdates.length > 0 && (
          <div>
            <p className="px-3 py-2 bg-slate-100 text-sm font-semibold text-slate-600">Recent updates</p>
            {recentUpdates.map(status => {
              const contact = state.contacts.find(c => c.id === status.contactId);
              return (
                <div key={status.id} className="flex items-center p-3 hover:bg-slate-50 cursor-pointer">
                  <div className="p-0.5 border-2 border-blue-500 rounded-full">
                    <img src={status.imageUrl} className="w-14 h-14 rounded-full object-cover" alt={contact?.name} />
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold text-slate-800">{contact?.name}</p>
                    <p className="text-sm text-slate-500">{status.timestamp}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {viewedUpdates.length > 0 && (
          <div>
            <p className="px-3 py-2 bg-slate-100 text-sm font-semibold text-slate-600">Viewed updates</p>
            {viewedUpdates.map(status => {
              const contact = state.contacts.find(c => c.id === status.contactId);
              return (
                <div key={status.id} className="flex items-center p-3 hover:bg-slate-50 cursor-pointer">
                   <div className="p-0.5 border-2 border-slate-300 rounded-full">
                    <img src={status.imageUrl} className="w-14 h-14 rounded-full object-cover" alt={contact?.name} />
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold text-slate-800">{contact?.name}</p>
                    <p className="text-sm text-slate-500">{status.timestamp}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <button onClick={() => navigate('/add-status')} className="fixed bottom-20 right-5 bg-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg">
        <Icon name="camera_alt" />
      </button>
    </Layout>
  );
};

export default StatusPage;
