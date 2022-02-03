import React, { useState } from 'react';
import propTypes from 'prop-types';
import Header from './header';
import Image from './image';
import Action from './action';
import Detail from './detail';
import AddComment from './add-comment';

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

  return (
    <div className="bg-white border pt-4">
      <Header username={username} avatar={avatar} />
      <Image imageSrc={imageSrc} caption={caption} />

      <div className="px-6 ">
        <Action
          docId={docId}
          likes={likes}
          isLiked={isLiked}
          likesCount={likesCount}
          setLikesCount={setLikesCount}
        />
        <Detail
          username={username}
          dateCreated={dateCreated}
          caption={caption}
          comments={comments}
          likesCount={likesCount}
        />
      </div>
      <AddComment docId={docId} comments={comments} setComments={setComments} />
    </div>
  );
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
