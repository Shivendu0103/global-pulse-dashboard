import React from 'react';

const YearSlider = ({ min, max, value, onChange }) => {
    return (
        <div className="slider-wrapper">
            <label className="slider-label">Viewing Year: {value}</label>
            <input
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="slider-input"
            />
        </div>
    );
};

export default YearSlider;
