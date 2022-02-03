import React, { useState, useContext } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { LOGIN } from '../constants/routes';
import FirebaseContext from '../contexts/firebase';

import { changeProfilePicture } from '../services/firebase';
import useUser from '../hooks/use-user';

const Settings = () => {
  const { storage } = useContext(FirebaseContext);
  const auth = getAuth();
  const { userId } = useUser() || {};
  const [profilePicture, setProfilePicture] = useState(null);

  return (
    <div>
      <h1>Settings</h1>
      {/* Log out button */}
      <Link to={LOGIN}>
        <button type="button" onClick={() => signOut(auth)}>
          Log out
        </button>
      </Link>

      {/* Change profile picture */}
      <div>
        <label htmlFor="profile-picture">
          <input
            type="file"
            id="profile-picture"
            accept="image/*"
            onChange={(e) => {
              setProfilePicture(e.target.files[0]);
            }}
          />
          <button
            type="button"
            onClick={async () => {
              changeProfilePicture(storage, userId, profilePicture);
            }}
          >
            Upload profile picture
          </button>
        </label>
      </div>
    </div>
  );
};

export default Settings;
