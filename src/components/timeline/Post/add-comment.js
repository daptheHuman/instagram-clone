import React, { useState } from 'react';
import { AiOutlineSmile } from 'react-icons/ai';
import propTypes from 'prop-types';
import { updateComment } from '../../../services/firebase';
import useUser from '../../../hooks/use-user';

const AddComment = ({ docId, comments, setComments, inputRef }) => {
  const [inputComment, setInputComment] = useState('');
  const { username } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateComment(docId, username, inputComment);
    setComments([
      ...comments,
      { comment: inputComment, displayName: username },
    ]);
    setInputComment('');
  };

  return (
    <div className="flex flex-row no-wrap items-center justify-center border-t px-4 py-2">
      <AiOutlineSmile size={25} />
      <input
        className="grow p-2 text-sm focus:outline-none"
        placeholder="Add a comment..."
        value={inputComment}
        ref={inputRef}
        onChange={(e) => setInputComment(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit(e);
          }
        }}
      />
      <button
        className="text-blue-500 font-semibold"
        type="button"
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        Post
      </button>
    </div>
  );
};

AddComment.propTypes = {
  docId: propTypes.string.isRequired,
  setComments: propTypes.func.isRequired,
  comments: propTypes.arrayOf(propTypes.object, propTypes.string).isRequired,
  inputRef: propTypes.objectOf(propTypes.any),
};

AddComment.defaultProps = {
  inputRef: null,
};

export default AddComment;
