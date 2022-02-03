import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  limit,
} from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { db } from '../lib/firebase';

const doesUsernameExist = async (username) => {
  const userRef = collection(db, 'users');
  const userQuery = query(userRef, where('username', '==', username));
  const snapshot = await getDocs(userQuery);
  const result = snapshot.docs.length;

  return result;
};

const getUserByUsername = async (username) => {
  const userRef = collection(db, 'users');
  const userQuery = query(userRef, where('username', '==', username));
  const snapshot = await getDocs(userQuery);
  const result =
    snapshot.docs.length > 0
      ? { ...snapshot.docs[0].data(), docId: snapshot.docs.id }
      : null;

  return result;
};

const getUserByUid = async (userId) => {
  const userRef = collection(db, 'users');
  const userQuery = query(userRef, where('userId', '==', userId));
  const snapshot = await getDocs(userQuery);
  const result = { ...snapshot.docs[0].data(), docId: snapshot.docs[0].id };

  return result;
};

const getPhotoByUserId = async (userId) => {
  const photoRef = collection(db, 'photos');
  const photoQuery = query(photoRef, where('userId', '==', userId));
  const snapshot = await getDocs(photoQuery);
  const result = snapshot.docs.map((doc) => ({ ...doc.data(), docId: doc.id }));

  return result;
};

const getPhotosByFollowing = async (following, loggedInUid) => {
  const photosRef = collection(db, 'photos');
  const photos = following.length
    ? query(photosRef, where('userId', 'in', following))
    : query(photosRef, where('userId', '==', loggedInUid));

  const snapshot = await getDocs(photos);
  const result = snapshot.docs.map((doc) => ({ ...doc.data(), docId: doc.id }));

  const getPhotosDetails = async () => {
    // wait until each map is done with "Promise.all"
    await Promise.all(
      result.map(async (photo) => {
        const { username, photoURL } = await getUserByUid(photo.userId);
        photo.isLiked = false;

        if (photo.likes.length > 0 && photo.likes.includes(loggedInUid)) {
          photo.isLiked = true;
        }
        photo.username = username;
        photo.photoURL = photoURL;
      })
    );
  };

  await getPhotosDetails();
  return result;
};

const getSuggestedProfile = async (userId, following) => {
  const userRef = collection(db, 'users');

  const userQuery = following.length
    ? query(userRef, where('userId', 'not-in', following), limit(5))
    : query(userRef, limit(5));

  const snapshot = await getDocs(userQuery);
  const result = snapshot.docs
    .filter((doc) => doc.data().userId !== userId)
    .map((doc) => doc.data());

  return result;
};

const updateFollowing = async (followingUid, followedUid) => {
  const userRef = collection(db, 'users');
  const userQuery = query(userRef, where('userId', '==', followingUid));
  const snapshot = await getDocs(userQuery);

  const { following } = snapshot.docs[0].data();
  // add followed uid to following array
  following.push(followedUid);

  // update following
  await updateDoc(snapshot.docs[0].ref, {
    following,
  });
};

const updateUnfollowing = async (followingUid, followedUid) => {
  const userRef = collection(db, 'users');
  const userQuery = query(userRef, where('userId', '==', followingUid));
  const snapshot = await getDocs(userQuery);

  const { following } = snapshot.docs[0].data();
  // remove followed uid from following array
  following.splice(following.indexOf(followedUid), 1);

  // update following
  await updateDoc(snapshot.docs[0].ref, {
    following,
  });
};

const updateFollowed = async (followingUid, followedUid) => {
  const userRef = collection(db, 'users');
  const userQuery = query(userRef, where('userId', '==', followedUid));
  const snapshot = await getDocs(userQuery);
  const { followers } = snapshot.docs[0].data();
  followers.push(followingUid);

  await updateDoc(snapshot.docs[0].ref, {
    followers,
  });
};

const updateUnfollowed = async (followingUid, followedUid) => {
  const userRef = collection(db, 'users');
  const userQuery = query(userRef, where('userId', '==', followedUid));
  const snapshot = await getDocs(userQuery);
  const { followers } = snapshot.docs[0].data();
  followers.splice(followers.indexOf(followingUid), 1);

  await updateDoc(snapshot.docs[0].ref, {
    followers,
  });
};

const updateLike = async (photoId, userId, isLiked) => {
  const photoRef = collection(db, 'photos');
  const snapshot = await getDocs(photoRef);

  const photo = snapshot.docs.filter((doc) => doc.id === photoId)[0];
  const { likes } = photo.data();
  const index = likes.indexOf(userId);

  if (isLiked) {
    if (index === -1) {
      likes.push(userId);
    }
  } else if (index !== -1) {
    likes.splice(index, 1);
  }

  await updateDoc(snapshot.docs[0].ref, {
    likes,
  });
  console.log('updated like');
};

const updateComment = async (photoId, displayName, comment) => {
  const photoRef = collection(db, 'photos');
  const snapshot = await getDocs(photoRef);

  const photo = snapshot.docs.filter((doc) => doc.id === photoId)[0];
  const { comments } = photo.data();
  comments.push({ displayName, comment });

  await updateDoc(snapshot.docs[0].ref, {
    comments,
  });
  console.log('updated comment', comments);
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
    photoURL: userProfile.photoURL,
  });

  return userDoc;
};

const changeProfilePicture = async (storage, userId, images) => {
  const storageRef = ref(storage, `users/profile/${userId}/profile.jpg`);
  const uploadTask = uploadBytesResumable(storageRef, images);

  // Listen when the upload is completed or fails
  uploadTask.on('state_changed', () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
      const userRef = collection(db, 'users');
      const userQuery = query(userRef, where('userId', '==', userId));
      const snapshot = await getDocs(userQuery);

      await updateDoc(snapshot.docs[0].ref, {
        photoURL: downloadURL,
      });
    });
  });
};

export {
  doesUsernameExist,
  getUserByUid,
  getUserByUsername,
  getPhotoByUserId,
  getSuggestedProfile,
  getPhotosByFollowing,
  changeProfilePicture,
  updateFollowing,
  updateUnfollowing,
  updateFollowed,
  updateUnfollowed,
  updateLike,
  updateComment,
  addProfile,
};
