import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Detail = ({ username, caption, likesCount, isModal }) => {
  return (
    <div className="mt-3 min-h-fit">
      <div className="text-black font-semibold">
        {likesCount > 0 ? likesCount : null} {likesCount > 0 ? 'likes' : null}
      </div>
      {caption && !isModal && (
        <div className="">
          <Link
            to={`p/${username}`}
            className="text-black font-semibold inline-block text-base mr-1"
          >
            {username}
          </Link>
          <div className="text-gray-700 inline-block text-base mb-2">
            {caption}
          </div>
        </div>
      )}
    </div>
  );
};

Detail.propTypes = {
  username: propTypes.string.isRequired,
  caption: propTypes.string.isRequired,
  likesCount: propTypes.number.isRequired,
  isModal: propTypes.bool.isRequired,
};

export default Detail;
