import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineClose } from 'react-icons/ai';
import { getUserByUsername } from '../services/firebase';
import AddComment from './timeline/Post/add-comment';
import Action from './timeline/Post/action';
import Detail from './timeline/Post/detail';

const Modal = (props) => {
  const {
    docId,
    username,
    avatar,
    caption,
    imageSrc,
    allComments,
    setComments,
    dateCreated,
    likesCount,
    setLikesCount,
    isLiked,
    setModalActive,
  } = props;
  const location = 'Unknown';
  const hasAvatarProp = (array) =>
    Object.prototype.hasOwnProperty.call(array[0], 'avatar');

  // A function that collect the commentor avatar
  useEffect(async () => {
    const getAvatar = async () => {
      // Add avatar to the commentor
      await Promise.all(
        allComments.map(async (comment) => {
          const { photoURL } = await getUserByUsername(comment.displayName);
          comment.avatar = photoURL;
        })
      );

      setComments([
        // Added a caption as a comment
        {
          comment: caption,
          displayName: username,
          avatar,
        },
        ...allComments,
      ]);
    };

    if (!hasAvatarProp(allComments)) {
      getAvatar();
    }
  }, [allComments]);

  return (
    <div className="fixed inset-0 z-10 bg-gray-600 bg-opacity-50 h-full w-full ">
      <div className="flex items-center justify-center h-full w-full">
        <div className="flex flex-row items-center justify-center w-fit max-w-screen-md h-5/6 bg-white">
          <img src={imageSrc} alt={caption} className="h-full w-auto" />

          <div className="h-full w-3/4 min-w-max flex-col relative">
            <div className="flex p-2 border-b border-gray-200">
              <img src={avatar} alt={username} className="rounded-full h-8" />

              <div className="flex flex-col ml-4">
                <h1 className="text-sm font-medium">{username}</h1>
                <p className="text-sm">{location}</p>
              </div>
            </div>

            <div className="overflow-y-scroll disable-scrollbars h-2/5">
              {hasAvatarProp(allComments) &&
                allComments.map((comment) => {
                  const {
                    displayName,
                    comment: text,
                    avatar: commentAvatar,
                  } = comment;

                  return (
                    <div key={text + displayName} className="flex p-2 ">
                      <img
                        src={commentAvatar}
                        alt={displayName}
                        className="rounded-full h-8"
                      />

                      <div className=" ml-4">
                        <h1 className="text-sm font-medium inline-block">
                          {displayName}
                        </h1>
                        <p className="text-sm font-light inline-block px-2 break-all">
                          {text}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>

            <div className="border-t border-gray-200 p-2 h-fit flex-col flex">
              <Action
                docId={docId}
                isLiked={isLiked}
                likesCount={likesCount}
                setLikesCount={setLikesCount}
              />
              <Detail
                comments={allComments}
                isModal
                username={username}
                dateCreated={dateCreated}
                caption={caption}
                likesCount={likesCount}
              />
            </div>

            <div className="absolute bottom-0 w-full">
              <AddComment
                docId={docId}
                comments={allComments}
                setComments={setComments}
              />
            </div>

            <AiOutlineClose
              className="fixed right-0 mr-4 mt-4 cursor-pointer"
              onClick={() => setModalActive(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  docId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  allComments: PropTypes.arrayOf(PropTypes.object).isRequired,
  setComments: PropTypes.func.isRequired,
  dateCreated: PropTypes.number.isRequired,
  likesCount: PropTypes.number.isRequired,
  setLikesCount: PropTypes.func.isRequired,
  isLiked: PropTypes.bool.isRequired,
  setModalActive: PropTypes.func.isRequired,
};

export default Modal;
