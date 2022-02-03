import { useEffect, useState, useContext } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import FirebaseContext from '../contexts/firebase';

const useAuthListener = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        // Set on localStorage the userAuth
        localStorage.setItem('user', JSON.stringify(userAuth));
        setUser(userAuth);
      } else {
        localStorage.removeItem('user');
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [firebase]);

  return { user };
};

export default useAuthListener;
