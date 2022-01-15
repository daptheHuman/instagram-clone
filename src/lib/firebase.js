import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// import seedDatabase from '../seed';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA89o5JYmZKbaiVEqzSTFPNV5Z9YkNafiM',
  authDomain: 'instagram-clone-e440b.firebaseapp.com',
  projectId: 'instagram-clone-e440b',
  storageBucket: 'instagram-clone-e440b.appspot.com',
  messagingSenderId: '230960467547',
  appId: '1:230960467547:web:738b255a17028eb741397e',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log('firebase', app, db);

// Call seedDatabase() to seed the database with data
// seedDatabase(db);

export { app, db };
