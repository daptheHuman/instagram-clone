import React, { lazy, Suspense } from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import * as ROUTES from './constants/routes';

const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const NotFound = lazy(() => import('./pages/NotFound'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.SIGNUP} element={<Signup />} />
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
