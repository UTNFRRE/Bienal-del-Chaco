import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../LoginContexto';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  console.log('location', location);

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;