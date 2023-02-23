import React from 'react';
import PropTypes from 'prop-types';

const Rating = ({ value, text }) => {
  return (
    <div className="rating my-3">
      {[...Array(5)].map((el, i) => (
        <span key={i} className="">
          <i
            style={{ color: '#f9e925' }}
            className={`
							my-2
							${
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

//type checking
Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};

export default Rating;
