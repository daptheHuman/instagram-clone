import React, { useState, useContext } from 'react';
import propTypes from 'prop-types';
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineSend,
} from 'react-icons/ai';
import UserContext from '../../../contexts/user';
import { updateLike } from '../../../services/firebase';

const Action = ({
  docId,
  isLiked,
  likesCount,
  setLikesCount,
  setModalActive,
}) => {
  const [toggleLiked, setToggleLiked] = useState(isLiked);
  const { uid } = useContext(UserContext) || {};

  const handleLike = async () => {
    setToggleLiked(!toggleLiked);
    if (toggleLiked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }

    await updateLike(docId, uid, toggleLiked);
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-5  w-fit">
        {toggleLiked ? (
          <AiFillHeart
            color="red"
            className="inline-block"
            size={25}
            onClick={handleLike}
          />
        ) : (
          <AiOutlineHeart
            className="inline-block"
            size={25}
            onClick={handleLike}
          />
        )}
        <AiOutlineMessage
          className="inline-block "
          size={25}
          onClick={() => setModalActive(true)}
        />
        <AiOutlineSend className="inline-block " size={25} />
      </div>
    </div>
  );
};

Action.propTypes = {
  docId: propTypes.string.isRequired,
  isLiked: propTypes.bool.isRequired,
  likesCount: propTypes.number.isRequired,
  setLikesCount: propTypes.func.isRequired,
  setModalActive: propTypes.func.isRequired,
};

export default Action;
