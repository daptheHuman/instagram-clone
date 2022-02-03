import { useState, useEffect, useContext } from 'react';
import UserContext from '../contexts/user';
import { getUserByUid, getPhotosByFollowing } from '../services/firebase';

const usePhotos = () => {
  const [photos, setPhotos] = useState(null);
  const { uid: loggedInUid } = useContext(UserContext) || {};

  useEffect(async () => {
    const getPhotos = async () => {
      const user = await getUserByUid(loggedInUid);
      const { following } = user;
      if (!following || !following.length) {
        setPhotos([]);
        return;
      }

      const photosQuery = await getPhotosByFollowing(following, loggedInUid);
      setPhotos(photosQuery);
    };

    getPhotos();
  }, [loggedInUid]);

  return photos;
};

export default usePhotos;
