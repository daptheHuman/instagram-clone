import React from 'react';
import propTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { LOGIN } from '../constants/routes';

const ProtectedRoute = ({ user, children }) => {
  return user ? children : <Navigate to={LOGIN} replace />;
};

ProtectedRoute.propTypes = {
  user: propTypes.objectOf(propTypes.any).isRequired,
  children: propTypes.node.isRequired,
};

export default ProtectedRoute;
