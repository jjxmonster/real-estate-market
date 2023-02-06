import React, { FunctionComponent } from "react";

interface ButtonProps {
  label: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "primary" | "secondary";
}

const Button: FunctionComponent<ButtonProps> = ({
  label,
  onClick,
  type = "primary",
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-2 rounded-md  m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-yellow text-yellow text-gray-dark ${
        type === "secondary" ? "bg-yellow" : ""
      }`}
    >
      <span
        className={`absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20  top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease ${
          type === "secondary" ? "bg-gray-dark" : "bg-yellow"
        }`}
      ></span>
      <span
        className={`relative ${
          type === "secondary"
            ? "text-gray-dark group-hover:text-yellow "
            : "text-yellow group-hover:text-gray-dark "
        } transition duration-300 ease`}
      >
        {label}
      </span>
    </button>
  );
};

export default Button;
