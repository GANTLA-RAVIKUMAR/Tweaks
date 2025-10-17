
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// FIX: Added .tsx extension to the import path to resolve module loading issue.
import { useAppContext } from '../contexts/AppContext.tsx';
import Icon from '../components/Icon';
// FIX: Added .ts extension to the import path to resolve module loading issue.
import { CallType } from '../types.ts';

const CallingScreen: React.FC = () => {
  const { callType, contactId } = useParams<{ callType: CallType; contactId: string }>();
  const navigate = useNavigate();
  const { state } = useAppContext();
  const [callStatus, setCallStatus] = useState('Ringing...');
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const contact = state.contacts.find(c => c.id === contactId);

  useEffect(() => {
    // Simulate call connection
    const timer = setTimeout(() => {
      setCallStatus('00:01');
    }, 3000);

    // Simulate call timer
    // FIX: Replaced NodeJS.Timeout with ReturnType<typeof setInterval> for browser compatibility.
    let interval: ReturnType<typeof setInterval>;
    if (callStatus.includes(':')) {
      let seconds = 1;
      interval = setInterval(() => {
        seconds++;
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        setCallStatus(`${mins}:${secs}`);
      }, 1000);
    }
    
    // Request media permissions for video call
    if (callType === CallType.VIDEO) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => {
          console.error("Error accessing media devices.", err);
          setCallStatus('Permission Denied');
        });
    } else {
       navigator.mediaDevices.getUserMedia({ audio: true })
        .catch(err => {
          console.error("Error accessing media devices.", err);
           setCallStatus('Permission Denied');
        });
    }

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [callStatus, callType]);

  if (!contact) {
    return <div className="flex items-center justify-center h-screen">Contact not found.</div>;
  }

  return (
    <div className="relative flex flex-col h-screen bg-slate-800 text-white justify-between">
      {callType === CallType.VIDEO && (
        <div className="absolute inset-0 bg-black">
          {/* Remote video would go here */}
        </div>
      )}
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: `url(${contact.avatar})`, filter: 'blur(20px) brightness(0.5)' }}
      ></div>

      <div className="relative flex flex-col items-center justify-center text-center pt-20 z-10">
        <img src={contact.avatar} className="w-32 h-32 rounded-full object-cover border-4 border-white/50 mb-4" alt={contact.name} />
        <h1 className="text-3xl font-bold">{contact.name}</h1>
        <p className="text-lg opacity-80 mt-2">{callStatus}</p>
      </div>

      {callType === CallType.VIDEO && (
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted
          className="absolute w-24 h-36 bottom-36 right-4 rounded-lg object-cover border-2 border-white/50 z-20"
        ></video>
      )}

      <div className="relative flex justify-around items-center bg-black/30 backdrop-blur-md p-6 rounded-t-3xl z-10">
        <button onClick={() => setIsMuted(!isMuted)} className={`flex flex-col items-center gap-1 transition-colors ${isMuted ? 'text-yellow-400': 'text-white/80'}`}>
          <Icon name={isMuted ? 'mic_off' : 'mic'} className="text-3xl" />
          <span className="text-xs">Mute</span>
        </button>
        <button onClick={() => setIsSpeakerOn(!isSpeakerOn)} className={`flex flex-col items-center gap-1 transition-colors ${isSpeakerOn ? 'text-yellow-400': 'text-white/80'}`}>
          <Icon name="volume_up" className="text-3xl" />
          <span className="text-xs">Speaker</span>
        </button>
        {callType === CallType.VIDEO && (
          <button className="flex flex-col items-center gap-1 text-white/80">
            <Icon name="flip_camera_ios" className="text-3xl" />
            <span className="text-xs">Flip</span>
          </button>
        )}
        <button onClick={() => navigate(-1)} className="bg-red-500 w-16 h-16 rounded-full flex items-center justify-center transform hover:scale-105 transition-transform">
          <Icon name="call_end" className="text-4xl" />
        </button>
      </div>
    </div>
  );
};

export default CallingScreen;