import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const User = (props) => {
  const { fullName, username, photoURL } = props;

  // Profiles Skeleton
  const profilesSkeleton = (
    <div className="flex ">
      <Skeleton
        circle
        containerClassName="h-9 w-10 mr-2"
        className="h-9 w-auto"
      />
      <Skeleton
        count={2}
        containerClassName="w-full h-1/2"
        width="100%"
        height="100%"
      />
    </div>
  );

  return (
    <div className="">
      {fullName && username ? (
        <Link to={`/p/${username}`} className="flex items-center mb-5">
          <div className="h-10">
            <img
              src={photoURL || '/images/default-user.svg'}
              alt="profile"
              className="h-10 w-10 rounded-full mr-2"
            />
          </div>
          <div className="ml-3">
            <h1 className="font-bold">{username}</h1>
            <h2 className="text-gray-500">{fullName}</h2>
          </div>
        </Link>
      ) : (
        <div className="w-full">{profilesSkeleton}</div>
      )}
    </div>
  );
};

User.propTypes = {
  fullName: PropTypes.string,
  username: PropTypes.string,
  photoURL: PropTypes.string,
};

User.defaultProps = {
  fullName: '',
  username: '',
  photoURL: '',
};

export default User;
