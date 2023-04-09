import React from 'react';
import { educations } from 'scrapedin/src/profile/profileScraperTemplate';

const PriceSlider = ({ priceFilter, setPriceFilter }) => {
  const [minValue, maxValue] = priceFilter.split('-');

  const handleMinChange = (e) => {
    const newMinValue = parseInt(e.target.value);
    const newMaxValue = parseInt(maxValue);
    if (newMinValue > newMaxValue) {
      setPriceFilter(`${newMaxValue}-${newMaxValue}`);
    } else {
      setPriceFilter(`${newMinValue}-${newMaxValue}`);
    }
  };

  const handleMaxChange = (e) => {
    const newMinValue = parseInt(minValue);
    const newMaxValue = parseInt(e.target.value);
    if (newMaxValue < newMinValue) {
      setPriceFilter(`${newMaxValue}-${newMinValue}`);
    } else {
      setPriceFilter(`${newMinValue}-${newMaxValue}`);
    }
  };

  return (
    <div className="mb-3">
      <label htmlFor="minPriceRange" className="form-label">
        Min Price: ${minValue}
      </label>
      <input
        type="range"
        className="form-range"
        id="minPriceRange"
        value={minValue}
        min="0"
        max="5000"
        step="100"
        onChange={handleMinChange}
      />
      <label htmlFor="maxPriceRange" className="form-label">
        Max Price: ${maxValue}
      </label>
      <input
        type="range"
        className="form-range"
        id="maxPriceRange"
        value={maxValue}
        min="0"
        max="5000"
        step="100"
        onChange={handleMaxChange}
      />
    </div>
  );
};

export default PriceSlider;
