import React, { FunctionComponent } from "react";

interface InputComponentProps {
  label: string;
  placeholder: string;
}

const InputComponent: FunctionComponent<InputComponentProps> = ({
  label,
  placeholder,
}) => {
  return (
    <div>
      <label className="text-white font-medium text-xl">{label}</label>
      <input
        placeholder={placeholder}
        className="p-2 mt-2 text-white w-full outline-none ring-0 bg-transparent transition border-b-2 border-yellow"
      />
    </div>
  );
};

export default InputComponent;
