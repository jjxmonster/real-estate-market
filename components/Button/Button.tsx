import React, { FunctionComponent } from "react";

interface ButtonProps {
  label: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: FunctionComponent<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-3.5 py-2 rounded-md  m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-yellow text-yellow text-gray-dark"
    >
      <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-yellow top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
      <span className="relative text-yellow transition duration-300 group-hover:text-gray-dark ease">
        {label}
      </span>
    </button>
  );
};

export default Button;
