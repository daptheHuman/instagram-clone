import React, { useState } from 'react';
import propTypes from 'prop-types';
import Header from './header';
import Image from './image';
import Action from './action';
import Detail from './detail';
import AddComment from './add-comment';
import Modal from '../../Modal';
import Comment from './comment';
import TimeAgo from './timeago';

const Post = (props) => {
  const {
    docId,
    username,
    photoURL: avatar,
    caption,
    comments: allComments,
    imageSrc,
    dateCreated,
    likes,
    isLiked,
  } = props;

  const [comments, setComments] = useState(allComments);
  const [likesCount, setLikesCount] = useState(likes.length);
  const [modalActive, setModalActive] = useState(false);

  if (props) {
    return (
      <div className="bg-white border pt-4">
        {modalActive && (
          <Modal
            docId={docId}
            username={username}
            avatar={avatar}
            caption={caption}
            imageSrc={imageSrc}
            allComments={comments}
            setComments={setComments}
            dateCreated={dateCreated}
            likesCount={likesCount}
            setLikesCount={setLikesCount}
            isLiked={isLiked}
            setModalActive={setModalActive}
          />
        )}
        <Header username={username} avatar={avatar} />
        <Image imageSrc={imageSrc} caption={caption} />
        <div className="px-6 ">
          <Action
            docId={docId}
            isLiked={isLiked}
            likesCount={likesCount}
            setLikesCount={setLikesCount}
            setModalActive={setModalActive}
          />
          <Detail
            username={username}
            caption={caption}
            likesCount={likesCount}
            isModal={false}
          />
        </div>
<<<<<<< HEAD
        <div className="px-6">
          <Comment allComments={comments} setModalActive={setModalActive} />
          <TimeAgo dateCreated={dateCreated} />
          <AddComment
            docId={docId}
            comments={comments}
            setComments={setComments}
          />
        </div>
=======
        <Comment allComments={comments} setModalActive={setModalActive} />
        <TimeAgo dateCreated={dateCreated} />
        <AddComment
          docId={docId}
          comments={comments}
          setComments={setComments}
        />
>>>>>>> 1c4366642e8ecbc0905855a6e84f1188f9b17c1d
      </div>
    );
  }
  return null;
};

Post.propTypes = {
  docId: propTypes.string.isRequired,
  username: propTypes.string.isRequired,
  photoURL: propTypes.string.isRequired,
  caption: propTypes.string.isRequired,
  comments: propTypes.arrayOf(propTypes.object).isRequired,
  imageSrc: propTypes.string.isRequired,
  dateCreated: propTypes.number.isRequired,
  likes: propTypes.arrayOf(propTypes.string).isRequired,
  isLiked: propTypes.bool.isRequired,
};

export default Post;
