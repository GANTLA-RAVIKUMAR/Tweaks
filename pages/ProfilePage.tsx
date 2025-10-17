import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext.tsx';
import Icon from '../components/Icon.tsx';
import Modal from '../components/Modal.tsx';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useAppContext();
  const { myInfo } = state;
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingField, setEditingField] = useState<'name' | 'status'>('name');
  const [editText, setEditText] = useState('');

  const handleEdit = (field: 'name' | 'status') => {
    setEditingField(field);
    setEditText(field === 'name' ? myInfo?.name || '' : myInfo?.statusText || '');
    setIsModalOpen(true);
  };

  const handleSave = () => {
    const updatedName = editingField === 'name' ? editText : myInfo?.name || '';
    const updatedStatus = editingField === 'status' ? editText : myInfo?.statusText || '';
    dispatch({ type: 'UPDATE_PROFILE', payload: { name: updatedName, statusText: updatedStatus } });
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  if (!myInfo) {
    return null; // Or a loading spinner
  }

  return (
    <div className="flex flex-col h-screen bg-slate-100">
      <header className="flex items-center p-4 bg-blue-600 text-white shadow-md">
        <button onClick={() => navigate(-1)} className="mr-4">
          <Icon name="arrow_back" />
        </button>
        <h1 className="text-xl font-bold">Profile</h1>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="flex flex-col items-center py-8">
          <div className="relative">
            <img src={myInfo.avatar} className="w-32 h-32 rounded-full object-cover shadow-lg" alt="Profile" />
             <button className="absolute bottom-1 right-1 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center border-2 border-white">
                <Icon name="photo_camera" className="text-lg"/>
            </button>
          </div>
        </div>
        
        <div className="bg-white">
          <div className="p-4 border-b border-slate-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-blue-600">Name</p>
                <p className="text-slate-800">{myInfo.name}</p>
              </div>
              <button onClick={() => handleEdit('name')} className="text-slate-500"><Icon name="edit" /></button>
            </div>
          </div>
          <div className="p-4 border-b border-slate-200">
             <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-blue-600">About</p>
                <p className="text-slate-800">{myInfo.statusText}</p>
              </div>
              <button onClick={() => handleEdit('status')} className="text-slate-500"><Icon name="edit" /></button>
            </div>
          </div>
           <div className="p-4">
            <p className="text-xs text-blue-600">Phone</p>
            <p className="text-slate-800">{myInfo.mobile}</p>
          </div>
        </div>
        
        <div className="mt-8 px-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-lg"
          >
            <Icon name="logout" />
            <span>Log Out</span>
          </button>
        </div>
      </main>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3 className="text-lg font-bold mb-4">Edit {editingField}</h3>
        <input 
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg mb-4"
        />
        <div className="flex justify-end gap-2">
          <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Save</button>
        </div>
      </Modal>
    </div>
  );
};

export default ProfilePage;
