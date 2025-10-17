import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext.tsx';
import Logo from '../components/Logo.tsx';

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useAppContext();
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !mobile || !email) {
      setError('All fields are required.');
      return;
    }
    if (mobile.length !== 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    
    const userExists = state.users.some(user => user.mobile === mobile || user.email === email);
    if (userExists) {
      setError('A user with this mobile or email already exists.');
      return;
    }

    dispatch({ type: 'SIGNUP', payload: { name, mobile, email } });
    // Redirect to login page after successful signup
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4">
       <div className="w-full max-w-sm">
        <div className="bg-blue-600 p-8 rounded-t-lg">
           <Logo />
        </div>
        <div className="bg-white p-8 rounded-b-lg shadow-lg">
          <h1 className="text-2xl font-bold text-slate-800 mb-1">Create Account</h1>
          <p className="text-slate-500 mb-6">Join Tweaks today!</p>
          
          <form onSubmit={handleSignUp}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-slate-600 mb-1">Full Name</label>
              <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg" required/>
            </div>
             <div className="mb-4">
              <label htmlFor="mobile" className="block text-sm font-medium text-slate-600 mb-1">Mobile Number</label>
              <input id="mobile" type="tel" value={mobile} onChange={e => setMobile(e.target.value.replace(/\D/g, ''))} maxLength={10} className="w-full px-3 py-2 border border-slate-300 rounded-lg" required/>
            </div>
             <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-slate-600 mb-1">Email Address</label>
              <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg" required/>
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              Sign Up
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account? <Link to="/login" className="font-semibold text-blue-600 hover:underline">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
