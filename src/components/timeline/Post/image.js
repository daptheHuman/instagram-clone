import React from 'react';
import propTypes from 'prop-types';

const Image = ({ imageSrc, caption }) => {
  return (
    <div className="bg-white border overflow-hidden my-4">
      <img className="w-auto" src={imageSrc} alt={caption} />
    </div>
  );
};

Image.propTypes = {
  imageSrc: propTypes.string.isRequired,
  caption: propTypes.string.isRequired,
};

export default Image;
