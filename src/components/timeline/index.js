import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Post from './Post';
import Stories from './Stories';
import usePhotos from '../../hooks/use-photos';

const Timeline = () => {
  const photos = usePhotos();

  return (
    <div className="col-span-2 overflow-auto py-20 h-screen disable-scrollbars">
      <Stories />

      <div className="grid gap-4 mx-auto">
        {photos ? (
          photos.length > 0 ? (
            photos.map((photo) => {
              const {
                docId,
                username,
                photoURL,
                caption,
                comments,
                imageSrc,
                dateCreated,
                likes,
                isLiked,
              } = photo;

              return (
                <Post
                  key={docId}
                  docId={docId}
                  username={username}
                  photoURL={photoURL}
                  caption={caption}
                  comments={comments}
                  imageSrc={imageSrc}
                  dateCreated={dateCreated}
                  likes={likes}
                  isLiked={isLiked}
                />
              );
            })
          ) : (
            <div className="text-center">No photos to show</div>
          )
        ) : (
          <div className=" gap-4 ">
            {new Array(2).fill(0).map((list) => {
              return (
                <div key={list + Math.random()} className="bg-white border">
                  <div className="flex px-5 py-4 w-full items-center">
                    <Skeleton width={40} height={40} circle />
                    <div className="font-semibold text-base mx-4">
                      <Skeleton width={100} />
                    </div>
                  </div>
                  {/* Skeleton full width */}
                  <Skeleton
                    height={200}
                    width="100%"
                    className="w-full"
                    containerClassName="w-full"
                  />

                  <div className="px-6 py-4">
                    <Skeleton height={20} count={2} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Timeline;
