import React, { lazy, Suspense } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import * as ROUTES from './constants/routes';
import UserContext from './contexts/user';
import useAuthListener from './hooks/use-auth-listener';
import ProtectedRoute from './helpers/protected-route';
import ProtectedRouteLogin from './helpers/protected-route-login';

const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Profile = lazy(() => import('./pages/Profile'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));
const NotFound = lazy(() => import('./pages/NotFound'));

const App = () => {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={user}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route
              path={ROUTES.LOGIN}
              element={
                <ProtectedRouteLogin user={user}>
                  <Login />
                </ProtectedRouteLogin>
              }
            />
            <Route
              path={ROUTES.SIGNUP}
              element={
                <ProtectedRouteLogin user={user}>
                  <Signup />
                </ProtectedRouteLogin>
              }
            />
            <Route path={ROUTES.PROFILE} element={<Profile />} />
            <Route
              path={ROUTES.DASHBOARD}
              element={
                <ProtectedRoute user={user}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.SETTINGS}
              element={
                <ProtectedRoute user={user}>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
            <Route path="*" element={<Navigate to={ROUTES.NOT_FOUND} />} />
          </Routes>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
