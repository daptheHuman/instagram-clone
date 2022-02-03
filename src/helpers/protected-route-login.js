import React from 'react';
import propTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { DASHBOARD } from '../constants/routes';

const ProtectedRouteLogin = ({ user, children }) => {
  return !user ? children : <Navigate to={DASHBOARD} replace />;
};

ProtectedRouteLogin.propTypes = {
  user: propTypes.objectOf(propTypes.any).isRequired,
  children: propTypes.node.isRequired,
};

export default ProtectedRouteLogin;
