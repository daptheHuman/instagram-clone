import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

const Header = ({ username, avatar }) => (
  <Link to={`/p/${username}`} className="flex px-5 items-center">
    <img className="h-10 w-10 rounded-full mr-4" src={avatar} alt={username} />
    <div className="font-semibold text-base">{username}</div>
  </Link>
);

Header.propTypes = {
  username: propTypes.string.isRequired,
  avatar: propTypes.string.isRequired,
};

export default Header;
