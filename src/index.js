import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import FirebaseContext from './contexts/firebase';
import { app, db } from './lib/firebase';

ReactDOM.render(
  <React.StrictMode>
    {/* eslint-disable-next-line react/jsx-no-constructed-context-values */}
    <FirebaseContext.Provider value={{ app, db }}>
      <App />
    </FirebaseContext.Provider>
  </React.StrictMode>,
  // eslint-disable-next-line prettier/prettier
  document.getElementById('root')
);
