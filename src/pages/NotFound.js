/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  useEffect(() => {
    document.title = 'Page Not Found - Instagram';
  }, []);
  return (
    <div className="text-neutral-700 text-center m-10">
      <p className="text-2xl font-semibold mb-5 ">
        Sorry, this page isn't available.
      </p>
      <p>
        The link you followed may be broken, or the page may have been removed.{' '}
        <Link className="text-blue-800" to="/">
          Go back to Instagram.
        </Link>
      </p>
    </div>
  );
};

export default NotFound;
