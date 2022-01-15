import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  getAuth,
  updateProfile,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import FirebaseContext from '../contexts/firebase';

import { DASHBOARD } from '../constants/routes';
import { doesUsernameExist, addProfile } from '../services/firebase';

const Register = () => {
  const navigate = useNavigate();
  const firebase = useContext(FirebaseContext);

  // Credentials state
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const isInvalid =
    password === '' || email === '' || username === '' || fullName === '';

  // Initial render
  useEffect(() => {
    document.title = 'Sign Up - Instagram';
  }, []);

  const handleSubmitSignup = async (event) => {
    event.preventDefault();

    const usernameExist = await doesUsernameExist(username);
    console.log(usernameExist);
    if (!usernameExist) {
      try {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;

        // Set the display name of the account to their fullName
        updateProfile(user, {
          displayName: fullName,
        });

        // Add the user data to the users collection
        await addProfile(user, username);

        // Redirect to the dashboard
        navigate(DASHBOARD);
      } catch (error) {
        console.log(error);

        // Reset the form
        setEmail('');
        setUsername('');
        setPassword('');

        // Set the error message
        setErrorMsg(error.message);
      }
    } else {
      setErrorMsg('Username already taken, please try another.');
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
            <p className="font-semibold text-gray-400 text-center">
              Sign up to see photos and videos from your friends.
            </p>
            <p className="text-red-500 text-center my-2">{errorMsg}</p>

            <form
              onSubmit={handleSubmitSignup}
              method="POST"
              className="flex flex-col grow items-stretch"
            >
              <input
                className="text-xs bg-[#fafafa]  w-full border border-gray-200 focus:outline focus:outline-gray-400 rounded-[4px]  px-2 py-2 my-0.5"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Mobile Number or Email"
              />
              <input
                className="text-xs bg-[#fafafa] w-full border border-gray-200 focus:outline focus:outline-gray-400 rounded-[4px]  px-2 py-2 my-0.5"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
              />
              <input
                className="text-xs bg-[#fafafa] w-full border border-gray-200 focus:outline focus:outline-gray-400 rounded-[4px]  px-2 py-2 my-0.5"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
              <input
                className="text-xs bg-[#fafafa]  w-full border border-gray-200 focus:outline focus:outline -gray-400 rounded-[4px]  px-2 py-2 my-0.5"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <button
                className="bg-sky-500 font-semibold text-sm text-white  py-1 px-4 my-3 rounded  disabled:opacity-30"
                type="submit"
                disabled={isInvalid}
                onClick={handleSubmitSignup}
              >
                Sign up
              </button>
            </form>
          </div>
          <div className="p-5 my-2 border bg-white">
            <p className="text-center text-sm">
              Have an account?{' '}
              <Link
                to="/login"
                className="
              text-sky-500"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
