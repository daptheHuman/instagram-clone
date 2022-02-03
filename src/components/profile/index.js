import React, { useEffect, useReducer } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import propTypes from 'prop-types';
import Header from './Header';
import Photos from './Photos';

import { getPhotoByUserId, getUserByUsername } from '../../services/firebase';

const UserProfile = ({ user }) => {
  const reducer = (state, newState) => ({ ...state, ...newState });
  const initialState = {
    profile: {},
    photoCollections: [],
    followersCount: 0,
  };

  const [{ profile, photoCollections, followersCount }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const { username, userId } = user;

  useEffect(() => {
    const getUserPhotosAndUserDetails = async () => {
      const userProfile = await getUserByUsername(username);
      const userPhotos = await getPhotoByUserId(userId);

      // Update userProfile and userPhotos in useReducer state
      dispatch({
        profile: userProfile,
        photoCollections: userPhotos,
        followersCount: userProfile.followers.length,
      });
    };

    getUserPhotosAndUserDetails();
  }, []);

  return (
    <div className="px-20">
      <Header
        profile={profile}
        photosCount={photoCollections.length}
        followers={followersCount}
        setFollowers={dispatch}
      />
      <Photos photos={photoCollections} />
    </div>
  );
};

UserProfile.propTypes = {
  user: propTypes.objectOf(propTypes.any).isRequired,
};

export default UserProfile;
