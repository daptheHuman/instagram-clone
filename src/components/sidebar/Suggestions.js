import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { getSuggestedProfile } from '../../services/firebase';
import SuggestedProfile from './suggested-profile';
import 'react-loading-skeleton/dist/skeleton.css';

const Suggestions = (props) => {
  const { loggedInUid, following } = props;
  const [profiles, setProfiles] = useState(null);

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

  // get the suggested profiles
  useEffect(() => {
    const getSuggestedProfiles = async () => {
      const suggestedProfiles = await getSuggestedProfile(
        loggedInUid,
        following
      );
      setProfiles(suggestedProfiles);
    };

    if (loggedInUid) {
      getSuggestedProfiles();
    }
  }, [loggedInUid, following]);

  return (
    <div>
      <h1 className="font-semibold text-gray-400">Suggestions for you</h1>

      {profiles ? (
        profiles.map((profile) => {
          const { userId, username, photoURL } = profile;

          return (
            <SuggestedProfile
              key={userId}
              loggedInUid={loggedInUid}
              suggestedUid={userId}
              username={username}
              photoURL={photoURL}
            />
          );
        })
      ) : (
        // Make 3 profilesSkeleton
        <div className="w-full">
          {profilesSkeleton}
          {profilesSkeleton}
          {profilesSkeleton}
        </div>
      )}
    </div>
  );
};

Suggestions.propTypes = {
  loggedInUid: PropTypes.string,
  following: PropTypes.arrayOf(PropTypes.string),
};

Suggestions.defaultProps = {
  loggedInUid: '',
  following: [],
};

export default Suggestions;
