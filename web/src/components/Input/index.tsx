import React from "react";

import "./styles.css";

interface InputProps {
  placeholder: string;
  type?: string;
  value: string;
  setValue: (value: string) => void;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  type,
  value,
  setValue,
}) => {
  return (
    <div className="input-block">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type={type ? type : "text"}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
