import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

const doesUsernameExist = async (username) => {
  const userRef = collection(db, 'users');
  const userQuery = query(userRef, where('username', '==', username));
  const snapshot = await getDocs(userQuery);

  //   check the snapshot size is it greater than 0?
  return snapshot.docs.length;
};

const addProfile = async (userProfile, username) => {
  const userRef = collection(db, 'users');
  const userDoc = await addDoc(userRef, {
    dateCreated: Date.now(),
    following: [],
    email: userProfile.email.toLowerCase(),
    fullName: userProfile.displayName,
    userId: userProfile.uid,
    username: username.toLowerCase(),
  });

  return userDoc;
};

export { doesUsernameExist, addProfile };
