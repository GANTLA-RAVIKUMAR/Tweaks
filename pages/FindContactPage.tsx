import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext.tsx';
import Icon from '../components/Icon.tsx';
import { User } from '../types.ts';

const FindContactPage: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useAppContext();
  const [mobile, setMobile] = useState('');
  const [searchResult, setSearchResult] = useState<'notFound' | User | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobile.length !== 10) {
        setSearchResult(null);
        return;
    }
    const foundUser = state.users.find(user => user.mobile === mobile);
    setSearchResult(foundUser || 'notFound');
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <header className="flex items-center p-3 text-white shadow-md sticky top-0 z-10 bg-blue-600">
        <button onClick={() => navigate(-1)} className="mr-3">
          <Icon name="arrow_back" />
        </button>
        <h1 className="text-xl font-bold">Find Friends on Tweaks</h1>
      </header>

      <main className="flex-1 p-4">
        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
            <input
                type="tel"
                placeholder="Enter mobile number..."
                value={mobile}
                onChange={e => setMobile(e.target.value.replace(/\D/g, ''))}
                maxLength={10}
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Search
            </button>
        </form>

        <div className="mt-4">
            {searchResult === 'notFound' && (
                <div className="text-center p-8 bg-slate-50 rounded-lg">
                    <Icon name="person_off" className="text-5xl text-slate-400 mb-4" />
                    <h2 className="text-lg font-semibold text-slate-700">User not found</h2>
                    <p className="text-slate-500 mb-4">This number isn't on Tweaks yet.</p>
                    <button
                        onClick={() => navigator.clipboard.writeText(`Join me on Tweaks! Download the app here: [App Link]`)}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                        Invite to Tweaks
                    </button>
                </div>
            )}
            {searchResult && typeof searchResult === 'object' && (
                <div className="p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center">
                        <img src={searchResult.avatar} className="w-16 h-16 rounded-full object-cover mr-4" alt={searchResult.name} />
                        <div>
                            <p className="text-xl font-bold text-slate-800">{searchResult.name}</p>
                            <p className="text-slate-500">{searchResult.mobile}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
      </main>
    </div>
  );
};

export default FindContactPage;
