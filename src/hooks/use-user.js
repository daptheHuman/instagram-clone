import { useState, useEffect, useContext } from 'react';
import UserContext from '../contexts/user';
import { getUserByUid } from '../services/firebase';

const useUser = () => {
  const [user, setUser] = useState({});
  const userContext = useContext(UserContext);

  useEffect(() => {
    const getUserObj = async () => {
      // Get user object from firestore
      const userObj = await getUserByUid(userContext.uid);
      setUser(userObj);
    };

    // "?." return undefined if userContext.uid is undefined/null
    if (userContext?.uid) {
      getUserObj();
    }
  }, [userContext]);

  return user;
};

export default useUser;
