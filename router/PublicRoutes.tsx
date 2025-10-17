import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext.tsx';

const PublicRoutes: React.FC = () => {
  const { state } = useAppContext();

  return !state.isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default PublicRoutes;
