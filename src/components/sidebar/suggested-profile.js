import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { updateFollowing, updateFollowed } from '../../services/firebase';

const SuggestedProfile = (props) => {
  const { loggedInUid, suggestedUid, username, photoURL } = props;
  const [isFollowing, setFollowing] = useState(false);

  // follow user
  const followHandler = async (followedUid, followingUid) => {
    setFollowing(true);
    await updateFollowing(followingUid, followedUid);
    await updateFollowed(followingUid, followedUid);
  };

  return !isFollowing ? (
    <div className="flex items-center justify-between gap-5">
      <Link to={`/p/${username}`}>
        <div className="flex items-center my-2">
          <img
            src={photoURL || '/images/default-user.svg'}
            alt="profile"
            className="h-9 w-9 rounded-full mr-2"
          />

          <h1 className="ml-3 font-bold">{username}</h1>
        </div>
      </Link>
      <button
        type="button"
        className="text-sky-500 font-semibold justify-self-end"
        onClick={() => followHandler(suggestedUid, loggedInUid)}
      >
        Follow
      </button>
    </div>
  ) : null;
};

SuggestedProfile.propTypes = {
  loggedInUid: PropTypes.string.isRequired,
  suggestedUid: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  photoURL: PropTypes.string,
};

SuggestedProfile.defaultProps = {
  photoURL: null,
};
export default SuggestedProfile;
