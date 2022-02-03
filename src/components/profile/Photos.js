import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { FaComment, FaHeart } from 'react-icons/fa';

const Photos = ({ photos }) => {
  return (
    <div>
      <div className="flex justify-center gap-20 col-span-3  my-10 border-t">
        <button
          type="button"
          ref={(el) => {
            if (el) {
              el.focus();
            }
          }}
          className="focus:border-t focus:outline-none active:outline-none border-black pt-2"
        >
          POSTS
        </button>
        <button type="submit" className=" focus:border-t border-black pt-2">
          REELS
        </button>
      </div>
      {photos ? (
        photos.length > 0 ? (
          <div className="grid grid-cols-3 gap-2 w-fit mx-auto">
            {photos.map((photo) => {
              return (
                <div key={photo.docId} className="relative w-72 group">
                  <div className="image-item w-72">
                    <img
                      className="object-fill "
                      src={photo.imageSrc}
                      alt={photo.caption}
                    />
                  </div>
                  <div className="image-detail group-hover:visible invisible bg-black/30 absolute inset-y-0 bottom-0 flex justify-center items-center w-full h-full text-white font-semibold">
                    <FaHeart className="mx-3" color="white" size={20} />{' '}
                    {photo.likes.length}
                    <FaComment className="mx-3" color="white" size={20} />{' '}
                    {photo.comments.length}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center">No photos to show</div>
        )
      ) : (
        <div className="gap-4 grid grid-cols-3 mx-auto">
          {new Array(6).fill(0).map((list) => {
            return (
              <div key={list + Math.random()} className="mx-auto">
                <Skeleton width={300} height={200} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

Photos.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Photos;
