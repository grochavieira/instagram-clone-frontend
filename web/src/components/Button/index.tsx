import React from "react";

import "./styles.css";

interface ButtonProps {
  name: string;
  onAction: () => void;
}

const Button: React.FC<ButtonProps> = ({ name, onAction }) => {
  return (
    <div className="button-block">
      <button onClick={() => onAction()}>{name}</button>
    </div>
  );
};

export default Button;
