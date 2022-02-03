import React from 'react';

// Icons
import {
  AiOutlineSearch,
  AiFillHome,
  AiOutlineCompass,
  AiOutlineHeart,
} from 'react-icons/ai';
import { RiMessengerLine } from 'react-icons/ri';
import { FiPlusSquare } from 'react-icons/fi';

import { Link } from 'react-router-dom';
import { LOGIN, SIGNUP, DASHBOARD, SETTINGS } from '../constants/routes';
import useUser from '../hooks/use-user';

const Header = () => {
  const { username, photoURL } = useUser() || {};

  return (
    <nav className="bg-white border-b p-4 fixed w-full top-0 lg:px-10 z-10">
      <div className="flex justify-between items-center lg:ml-10 xl:mx-60">
        <div className=" items-center justify-end ">
          <img
            src="/images/instagram-logo.png"
            alt="Instagram logo"
            className="h-full w-auto inline-block"
          />
        </div>

        {/* Searchbar */}
        <div className="hidden shrink bg-gray-100 px-5 rounded-lg text-gray-400  xl:justify-center md:flex">
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
          >
            <AiOutlineSearch />
          </button>
          <input
            type="text"
            className="active:bg-transparent focus:bg-transparent focus:outline-none placeholder:text-gray-400 bg-transparent  text-black border-none w-full p-2"
            placeholder="Search"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
          />
        </div>

        {username ? (
          /* Navigation */
          <div className="flex gap-4 content-center items-center md:ml-20">
            <Link to={DASHBOARD}>
              <button type="button" className="btn btn-outline-secondary">
                <AiFillHome size="1.5rem" />
              </button>
            </Link>
            <button type="button" className="btn btn-outline-secondary">
              <RiMessengerLine size="1.5rem" />
            </button>
            <button type="button" className="btn btn-outline-secondary">
              <FiPlusSquare size="1.5rem" />
            </button>
            <button type="button" className="btn btn-outline-secondary">
              <AiOutlineCompass size="1.5rem" />
            </button>
            <button type="button" className="btn btn-outline-secondary">
              <AiOutlineHeart size="1.5rem" />
            </button>

            {/* User */}
            <Link to={SETTINGS}>
              <button type="button" className="btn btn-outline-secondary">
                <img
                  src={photoURL || 'images/default-user.svg'}
                  alt="profile"
                  className="rounded-full w-6 h-6"
                />
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex justify-end md:ml-20">
            {/* Sign in Button */}
            <Link to={LOGIN}>
              <button
                className="bg-sky-500 font-semibold text-sm text-white  py-2 px-3 rounded disabled:opacity-30"
                type="button"
              >
                Login
              </button>
            </Link>

            {/* Sign up Button */}
            <Link to={SIGNUP}>
              <button
                className="font-semibold text-sm text-sky-500  py-2 px-3 rounded disabled:opacity-30"
                type="button"
              >
                Sign up
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
