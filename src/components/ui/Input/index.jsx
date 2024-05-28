import { forwardRef } from "react";

const Input = forwardRef(
  ({ type, placeholder, name, value, onChange }, ref) => {
    return (
      <input
        type={type}
        className="text-sm border border-color-gray-300 rounded w-full py-2 px-3 text-color-dark placeholder-opacity-50 mb-4 focus:border-color-green focus:outline-none"
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        value={value}
        id={name}
        ref={ref}
      />
    );
  }
);

export default Input;
