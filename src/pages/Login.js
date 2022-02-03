import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { DASHBOARD } from '../constants/routes';

const Login = () => {
  const navigate = useNavigate();

  // Credentials state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const isInvalid = password === '' || email === '';

  // Initial render
  useEffect(() => {
    document.title = 'Login - Instagram';
  }, []);

  const handleSubmitLogin = async (event) => {
    event.preventDefault();

    try {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password);

      // Redirect to the dashboard
      navigate(DASHBOARD);
    } catch (error) {
      // Reset the form
      setEmail('');
      setPassword('');

      // Set the error message
      setErrorMsg(error.message);
    }
  };
  return (
    <div className="h-full flex bg-[#fafafa] ">
      <div className="flex grow items-center justify-center p-10">
        <img src="images/loginphone.png" alt="phone" className="w-1/3" />

        <div className="flex flex-col basis-1/4">
          <div className="flex grow flex-col border bg-white px-9 py-5">
            <img
              src="images/logo.png"
              alt="logo"
              className="p-5 pb-2 self-center"
            />
            <p className="text-red-500 text-center my-2">{errorMsg}</p>
            <form
              onSubmit={handleSubmitLogin}
              method="POST"
              className="flex flex-col grow items-stretch "
            >
              <input
                className="text-xs bg-[#fafafa]  w-full border border-gray-200 focus:outline focus:outline-gray-400 rounded-[4px]  px-2 py-2 my-0.5"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              <input
                className="text-xs bg-[#fafafa]  w-full border border-gray-200 focus:outline focus:outline-gray-400 rounded-[4px]  px-2 py-2 my-0.5"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <button
                className="bg-sky-500  font-semibold text-sm text-white  py-1 px-4 my-3 rounded  disabled:opacity-30"
                type="submit"
                disabled={isInvalid}
                onClick={handleSubmitLogin}
              >
                Login
              </button>
            </form>
          </div>
          <div className="p-5 my-2 border bg-white">
            <p className="text-center text-sm">
              Dont have an account?{' '}
              <Link
                to="/signup"
                className="
              text-sky-500 "
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
