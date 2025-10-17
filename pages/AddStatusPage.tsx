
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// FIX: Added .tsx extension to the import path to resolve module loading issue.
import { useAppContext } from '../contexts/AppContext.tsx';
import Icon from '../components/Icon';

const AddStatusPage: React.FC = () => {
    const navigate = useNavigate();
    const { dispatch } = useAppContext();
    const [caption, setCaption] = useState('');
    
    // Simulate picking an image
    const randomImageUrl = `https://picsum.photos/seed/${Date.now()}/400/800`;

    const handlePostStatus = () => {
        if (!randomImageUrl) return;
        dispatch({
            type: 'ADD_STATUS',
            payload: {
                imageUrl: randomImageUrl,
                timestamp: 'Just now',
            }
        });
        navigate('/status');
    };

    return (
        <div className="flex flex-col h-screen bg-slate-900 text-white">
            <header className="flex items-center p-3 justify-between">
                <button onClick={() => navigate(-1)}>
                    <Icon name="close" />
                </button>
            </header>

            <main className="flex-1 flex items-center justify-center p-4">
                <img src={randomImageUrl} alt="New status" className="max-h-[70vh] rounded-lg shadow-2xl"/>
            </main>

            <footer className="p-3">
                <div className="flex items-center bg-slate-800 rounded-full p-1">
                     <input
                        type="text"
                        placeholder="Add a caption..."
                        className="flex-1 bg-transparent px-3 focus:outline-none"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                    />
                    <button 
                        onClick={handlePostStatus}
                        className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center ml-2 flex-shrink-0"
                    >
                        <Icon name="send" />
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default AddStatusPage;