import React, { FunctionComponent } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { capitalizeFirstLetter } from "../../utils";

interface InputComponentProps {
  label: string;
  placeholder: string;
  register: UseFormRegisterReturn<string>;
  area?: boolean;
  type: string;
  error: FieldError | undefined;
}

const inputStyles =
  "p-2 my-2 text-white w-full outline-none ring-0 bg-transparent transition border-b-2 border-yellow";

const InputComponent: FunctionComponent<InputComponentProps> = ({
  label,
  placeholder,
  register,
  area = false,
  type,
  error,
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
          type={type}
          {...register}
          placeholder={placeholder}
          className={inputStyles}
        />
      )}
      {error?.message && (
        <p className="text-red font-medium">
          {capitalizeFirstLetter(error.message)}
        </p>
      )}
    </div>
  );
};

export default InputComponent;
