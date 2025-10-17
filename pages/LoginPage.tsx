import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext.tsx';
import Logo from '../components/Logo.tsx';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useAppContext();
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobile.length !== 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    
    const userExists = state.users.some(user => user.mobile === mobile);
    if (userExists) {
      // Pass mobile number to OTP page
      navigate(`/otp?mobile=${mobile}`);
    } else {
      setError('This mobile number is not registered. Please sign up.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-50 p-4">
      <div className="w-full max-w-sm">
        <div className="bg-blue-600 p-8 rounded-t-lg">
           <Logo />
        </div>
        <div className="bg-white p-8 rounded-b-lg shadow-lg">
          <h1 className="text-2xl font-bold text-slate-800 mb-1">Welcome Back!</h1>
          <p className="text-slate-500 mb-6">Log in to continue.</p>
          
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="mobile" className="block text-sm font-medium text-slate-600 mb-1">Mobile Number</label>
              <input
                id="mobile"
                type="tel"
                value={mobile}
                onChange={e => {
                  setMobile(e.target.value.replace(/\D/g, ''));
                  setError('');
                }}
                maxLength={10}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your mobile number"
              />
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get OTP
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Don't have an account? <Link to="/signup" className="font-semibold text-blue-600 hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
