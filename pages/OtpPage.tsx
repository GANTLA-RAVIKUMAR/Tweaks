import React, { useState, useRef, ChangeEvent, KeyboardEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext.tsx';
import Logo from '../components/Logo.tsx';

const OtpPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { dispatch } = useAppContext();
  const [otp, setOtp] = useState<string[]>(new Array(4).fill(""));
  const [error, setError] = useState('');
  
  // FIX: Added type annotation for the ref array.
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const mobile = new URLSearchParams(location.search).get('mobile');

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input
    if (element.nextSibling && element.value) {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    // Move focus to previous input on backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    // Simulate OTP check
    if (enteredOtp === '1234') { // Using a mock OTP
      if(mobile) {
        dispatch({ type: 'LOGIN', payload: { mobile } });
        navigate('/', { replace: true });
      } else {
        setError('Mobile number not found. Please try again.');
      }
    } else {
      setError('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-50 p-4">
      <div className="w-full max-w-sm">
        <div className="bg-blue-600 p-8 rounded-t-lg">
           <Logo />
        </div>
        <div className="bg-white p-8 rounded-b-lg shadow-lg text-center">
          <h1 className="text-xl font-bold text-slate-800 mb-1">Verify OTP</h1>
          <p className="text-slate-500 mb-6">Enter the 4-digit code sent to your number.</p>
          
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center gap-2 mb-4">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={data}
                  onChange={e => handleChange(e.target, index)}
                  onKeyDown={e => handleKeyDown(e, index)}
                  // FIX: Corrected ref callback to ensure void return type.
                  ref={el => { inputsRef.current[index] = el; }}
                  className="w-12 h-14 text-center text-2xl font-semibold border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>
             {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Verify
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OtpPage;
