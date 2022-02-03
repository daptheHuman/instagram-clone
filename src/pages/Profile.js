import React, { useEffect, useState } from 'react';
import { useParams, Route, useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { getUserByUsername } from '../services/firebase';
import { NOT_FOUND } from '../constants/routes';
import Header from '../components/Header';
import UserProfile from '../components/profile';

const Profile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);

  const Navigate = useNavigate();

  if (user) {
    document.title = user.fullName
      ? `${user.fullName} (@${username}) - Instagram`
      : `@${username} - Instagram`;
  }

  useEffect(() => {
    const getUser = async () => {
      const userProfile = await getUserByUsername(username);
      if (userProfile) {
        setUser(userProfile);
      } else {
        setUser(null);
        Navigate(NOT_FOUND);
      }
    };

    getUser();
  }, [username]);

  if (!user) {
    return (
      <div className="profile-header flex items-center px-20 py-20 ">
        <Header />
        <Skeleton
          count={1}
          height={140}
          width={140}
          circle
          containerClassName="mx-40"
        />
        <div>
          <Skeleton height={25} width={200} />
          <Skeleton count={2} height={25} width={400} />
        </div>
      </div>
    );
  }
  return (
    <div className="py-20">
      <Header />
      <div className="">
        <UserProfile user={user} />
      </div>
    </div>
  );
};

export default Profile;
