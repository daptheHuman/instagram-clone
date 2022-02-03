import React from 'react';
import useUser from '../../hooks/use-user';

import User from './User';
import Suggestions from './Suggestions';

const Sidebar = () => {
  const { fullName, username, photoURL, userId, following } = useUser();

  return (
    <div className="sidebar h-fit my-auto hidden lg:inline-block">
      <User fullName={fullName} username={username} photoURL={photoURL} />
      <Suggestions loggedInUid={userId} following={following} />
    </div>
  );
};

export default Sidebar;
