import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaCog } from 'react-icons/fa';
import { SETTINGS } from '../../constants/routes';
import useUser from '../../hooks/use-user';
import {
  updateUnfollowing,
  updateFollowing,
  updateUnfollowed,
  updateFollowed,
} from '../../services/firebase';

const Header = ({ profile, photosCount, followers, setFollowers }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const userLoggedIn = useUser();
  const followButtonActive = profile.username !== userLoggedIn.username;

  useEffect(() => {
    if (profile.username && userLoggedIn.username) {
      const isLoggedInUserFollowing = profile.followers.includes(
        userLoggedIn.userId
      );

      setIsFollowing(isLoggedInUserFollowing);
    }
  }, [profile, userLoggedIn]);

  const handleFollow = async () => {
    if (!isFollowing) {
      setFollowers({ followersCount: followers + 1 });
      setIsFollowing(true);
      await updateFollowing(userLoggedIn.userId, profile.userId);
      await updateFollowed(userLoggedIn.userId, profile.userId);
      console.log('followed');
    } else {
      setFollowers({ followersCount: followers - 1 });
      setIsFollowing(false);
      await updateUnfollowing(userLoggedIn.userId, profile.userId);
      await updateUnfollowed(userLoggedIn.userId, profile.userId);
      console.log('unfollowed');
    }
  };

  if (profile.username) {
    console.log(profile.username, followButtonActive);
    return (
      <div className="flex justify-start mb-10">
        <img
          className="w-40 h-40 rounded-full mx-32"
          src={profile.photoURL}
          alt={profile.caption}
        />

        <div>
          <div className="flex flex-row gap-12 justify-between">
            <div className="text-2xl font-light ">{profile.username}</div>
            {followButtonActive ? (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold  px-4 rounded"
                onClick={handleFollow}
                type="button"
              >
                {isFollowing ? 'Unfollow' : 'Follow'}
              </button>
            ) : (
              <div className="px-4 rounded flex items-center">
                <button
                  className="border rounded-md p-1 font-semibold"
                  type="button"
                >
                  Edit Profile
                </button>
                <Link to={SETTINGS}>
                  <FaCog className="mx-2" size={20} />
                </Link>
              </div>
            )}
          </div>
          <div className="my-4 gap-12 flex">
            <span>
              {' '}
              <span className="font-semibold">{photosCount}</span> photos
            </span>
            <span>
              {' '}
              <span className="font-semibold">{followers}</span> followers
            </span>
            <span>
              {' '}
              <span className="font-semibold">
                {profile.following.length}{' '}
              </span>{' '}
              following
            </span>
          </div>
          <div className="">{profile.fullName}</div>
        </div>
      </div>
    );
  }
  return <div className="flex justify-start mb-10">loading</div>;
};

Header.propTypes = {
  profile: propTypes.objectOf(propTypes.any).isRequired,
  photosCount: propTypes.number.isRequired,
  followers: propTypes.number.isRequired,
  setFollowers: propTypes.func.isRequired,
};

export default Header;
