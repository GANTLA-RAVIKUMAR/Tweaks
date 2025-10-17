import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext.tsx';

const ProtectedRoutes: React.FC = () => {
  const { state } = useAppContext();
  
  return state.isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
