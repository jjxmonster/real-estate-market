import React, { FunctionComponent, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

import { UploadIcon } from "../Icons/Icons";

interface UploadButtonProps {
  label: string;
  register: UseFormRegisterReturn<string>;
}

const UploadButton: FunctionComponent<UploadButtonProps> = ({
  label,
  register,
}) => {
  return (
    <div>
      <label className="text-white font-medium text-xl">{label}</label>
      <div className="mt-2">
        <label htmlFor="file_input">
          <a
            className="cursor-pointer text-gray-dark bg-yellow font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
            type="button"
          >
            Choose File
            {UploadIcon}
          </a>
        </label>
        <input
          {...register}
          accept="image/*"
          className="hidden"
          id="file_input"
          type="file"
          multiple
        />
      </div>
      <div></div>
    </div>
  );
};

export default UploadButton;
