import React from 'react';
import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const PrivateRoute = ({ component }) => {
  const [cookies] = useCookies(['user']);
  
  return cookies.user ? component : <Navigate to="/login" />;
};

export default PrivateRoute;
