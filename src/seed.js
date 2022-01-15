/* eslint-disable no-plusplus */
// disable prettier/prettier

import { collection, addDoc } from 'firebase/firestore';

// NOTE: replace 'LCI7smrsW7MT1XagIi9VqcjS3503' with your Firebase auth user id(can be taken from Firebase)
export default async function seedDatabase(db) {
  const users = [
    {
      userId: 'LCI7smrsW7MT1XagIi9VqcjS3503',
      username: 'dap',
      fullName: 'Dafa Aqilla',
      emailAddress: 'dafaaqilla72@gmail.com',
      following: ['2'],
      followers: ['2', '3', '4'],
      dateCreated: Date.now(),
    },
    {
      userId: '2',
      username: 'raphael',
      fullName: 'Raffaello Sanzio da Urbino',
      emailAddress: 'raphael@sanzio.com',
      following: [],
      followers: ['LCI7smrsW7MT1XagIi9VqcjS3503'],
      dateCreated: Date.now(),
    },
    {
      userId: '3',
      username: 'dali',
      fullName: 'Salvador Dalí',
      emailAddress: 'salvador@dali.com',
      following: [],
      followers: ['LCI7smrsW7MT1XagIi9VqcjS3503'],
      dateCreated: Date.now(),
    },
    {
      userId: '4',
      username: 'orwell',
      fullName: 'George Orwell',
      emailAddress: 'george@orwell.com',
      following: [],
      followers: ['LCI7smrsW7MT1XagIi9VqcjS3503'],
      dateCreated: Date.now(),
    },
  ];

  // eslint-disable-next-line prefer-const
  for (let k = 0; k < users.length; k++) {
    // eslint-disable-next-line no-await-in-loop
    await addDoc(collection(db, 'users'), users[k]);
  }

  // eslint-disable-next-line prefer-const
  for (let i = 1; i <= 5; ++i) {
    // eslint-disable-next-line no-await-in-loop
    await addDoc(collection(db, 'photos'), {
      photoId: i,
      userId: '2',
      imageSrc: `/images/users/raphael/${i}.jpg`,
      caption: 'Saint George and the Dragon',
      likes: [],
      comments: [
        {
          displayName: 'dali',
          comment: 'Love this place, looks like my animal farm!',
        },
        {
          displayName: 'orwell',
          comment: 'Would you mind if I used this picture?',
        },
      ],
      userLatitude: '40.7128°',
      userLongitude: '74.0060°',
      dateCreated: Date.now(),
    });
  }
}
