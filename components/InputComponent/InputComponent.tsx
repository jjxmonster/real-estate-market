import React, { FunctionComponent } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputComponentProps {
  label: string;
  placeholder: string;
  register: UseFormRegisterReturn<string>;
  area?: boolean;
}

const inputStyles =
  "p-2 mt-2 text-white w-full outline-none ring-0 bg-transparent transition border-b-2 border-yellow";

const InputComponent: FunctionComponent<InputComponentProps> = ({
  label,
  placeholder,
  register,
  area = false,
}) => {
  return (
    <div>
      <label className="text-white font-medium text-xl">{label}</label>
      {area ? (
        <textarea
          placeholder={placeholder}
          {...register}
          className={`${inputStyles} h-24`}
        />
      ) : (
        <input
          {...register}
          placeholder={placeholder}
          className={inputStyles}
        />
      )}
    </div>
  );
};

export default InputComponent;
