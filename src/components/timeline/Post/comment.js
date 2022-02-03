import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Comment = ({ allComments: comments }) => {
  return (
    <div className=" ">
      {comments.length >= 3 ? (
        <div>
          <p className="font-thin text-gray-500">
            {' '}
            View all {comments.length} comments
          </p>
        </div>
      ) : (
        comments.slice(0, 3).map((comment) => (
          <div key={`${comment.displayName} - ${comment.comment}`}>
            <Link to={`/p/${comment.displayName}`}>
              <div className="inline font-medium">{comment.displayName} </div>
            </Link>
            <div className="inline">{comment.comment}</div>
          </div>
        ))
      )}
    </div>
  );
};

Comment.propTypes = {
  allComments: propTypes.arrayOf(propTypes.object).isRequired,
};

export default Comment;
