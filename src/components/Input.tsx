import React from "react";

interface InputProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({ placeholder, value, onChange, type = "text", className }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`border p-2 rounded-lg w-full ${className}`}
    />
  );
};

export default Input;
