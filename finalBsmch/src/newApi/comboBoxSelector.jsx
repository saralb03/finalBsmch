import React, { useState } from 'react';

const ComboBoxSelector = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    onSelect(value); // Notify parent component of the selected option if needed
  };

  return (
    <select value={selectedOption} onChange={handleSelectChange}>
      <option value="" disabled>
        Select an option
      </option>
      {options.map((option,index) => (
        <option key={index+1} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
export default ComboBoxSelector

