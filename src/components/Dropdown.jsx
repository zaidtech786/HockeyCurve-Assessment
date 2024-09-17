import React, { useState } from 'react';
import "../Styles/DropDown.css"

export const DropDown = ({ options, onChange, value }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="customSelect">
      <div className="selectedOption" onClick={() => setIsOpen(!isOpen)}>
        {value || 'Select Priority'}
      </div>
      {isOpen && (
        <div className="optionsList">
          {options.map((option, index) => (
            <div
              key={index}
              className="optionItem"
              onClick={() => handleSelect(option)}
            >
              <span>{option.label}</span>
              <span
                style={{
                  width: '15px',
                  height: '15px',
                  backgroundColor: option.color,
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginLeft: '10px'
                }}
              ></span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
