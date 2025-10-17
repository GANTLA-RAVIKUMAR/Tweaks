import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext.tsx';
import Logo from '../components/Logo.tsx';

const SplashPage: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useAppContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (state.isAuthenticated) {
        navigate('/', { replace: true });
      } else {
        navigate('/login', { replace: true });
      }
    }, 2000); // Show splash for 2 seconds

    return () => clearTimeout(timer);
  }, [navigate, state.isAuthenticated]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-600">
      <div className="text-white">
        <Logo />
      </div>
      <p className="text-white/80 mt-4">Your private messenger.</p>
    </div>
  );
};

export default SplashPage;
