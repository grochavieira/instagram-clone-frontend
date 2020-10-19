import React from "react";

import "./styles.scss";

interface InputProps {
  placeholder: string;
  error?: boolean;
  type?: string;
  value: string;
  setValue: (value: string) => void;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  error,
  type,
  value,
  setValue,
}) => {
  return (
    <div className={error ? "input error" : "input"}>
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
