import React from 'react';
import moment from 'moment';
import propTypes from 'prop-types';

const TimeAgo = ({ dateCreated }) => {
  const timePosted = new Date(dateCreated);
  const timeNow = new Date();
  const timeDiff = timePosted.getTime() - timeNow.getTime();
  const timeAgo = moment.duration(timeDiff).humanize(true).toUpperCase();

  return (
    <div>
      <p className="text-xs font-thin text-gray-500 my-2">{timeAgo}</p>
    </div>
  );
};

TimeAgo.propTypes = {
  dateCreated: propTypes.number.isRequired,
};

export default TimeAgo;
