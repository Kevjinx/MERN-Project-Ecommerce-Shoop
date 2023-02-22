import React from 'react';
import PropTypes from 'prop-types';

const Rating = ({ value, text }) => {
  return (
    <div className="rating">
      {[...Array(5)].map((el, i) => (
        <span key={i}>
          <i
            style={{ color: 'dark yellow' }}
            className={`${
              value >= i + 1
                ? 'fas fa-star'
                : value >= i + 0.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }`}
          ></i>
        </span>
      ))}
      <span>{text && text}</span>
    </div>
  );
};

//make it easier to debug later when using larger datasets
Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};

export default Rating;
