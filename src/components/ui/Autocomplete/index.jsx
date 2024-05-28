import React, { useState } from "react";

const Autocomplete = ({ label, options, value, onChange }) => {
  const [filteredOptions, setFilteredOptions] = useState([]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    onChange(inputValue);

    const filtered = options.filter((option) =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const handleOptionClick = (option) => {
    onChange(option);
    setFilteredOptions([]);
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        className="p-2 border border-color-gray-300 rounded-md w-full"
      />
      {filteredOptions.length > 0 && (
        <ul className="absolute z-10 bg-white border border-color-gray-300 w-full max-h-60 overflow-y-auto rounded-md mt-1">
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              className="p-2 cursor-pointer hover:bg-gray-200"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
