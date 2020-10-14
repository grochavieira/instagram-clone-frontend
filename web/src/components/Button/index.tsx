import React from "react";

import "./styles.scss";

interface ButtonProps {
  name: string;
  onAction: () => void;
}

const Button: React.FC<ButtonProps> = ({ name, onAction }) => {
  return (
    <div className="button">
      <button onClick={() => onAction()}>{name}</button>
    </div>
  );
};

export default Button;
