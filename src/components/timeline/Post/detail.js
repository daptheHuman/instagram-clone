import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Comment from './comment';

const Detail = ({ username, dateCreated, caption, comments, likesCount }) => {
  const timePosted = new Date(dateCreated);
  const timeNow = new Date();
  const timeDiff = timePosted.getTime() - timeNow.getTime();
  const timeAgo = moment.duration(timeDiff).humanize(true).toUpperCase();

  return (
    <div className="my-3">
      <div className="text-black font-semibold">
        {likesCount > 0 ? likesCount : null} {likesCount > 0 ? 'likes' : null}
      </div>
      {caption && (
        <div className="mb-4">
          <Link
            to={`p/${username}`}
            className="text-black font-semibold inline-block text-base mr-1"
          >
            {username}
          </Link>
          <div className="text-gray-700 inline-block text-base mb-2">
            {caption}
          </div>
          <Comment allComments={comments} />
          <p className="text-xs font-thin text-gray-500 my-2">{timeAgo}</p>
        </div>
      )}
    </div>
  );
};

Detail.propTypes = {
  username: propTypes.string.isRequired,
  caption: propTypes.string.isRequired,
  comments: propTypes.arrayOf(propTypes.object).isRequired,
  dateCreated: propTypes.number.isRequired,
  likesCount: propTypes.number.isRequired,
};

export default Detail;
