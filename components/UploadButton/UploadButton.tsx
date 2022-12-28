import React, { FunctionComponent } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

import { UploadIcon } from "../Icons/Icons";
import Image from "next/image";
import { capitalizeFirstLetter } from "../../utils";

interface UploadButtonProps {
  label: string;
  register: UseFormRegisterReturn<string>;
  value: FileList | null;
  error: FieldError | undefined;
}

const UploadButton: FunctionComponent<UploadButtonProps> = ({
  label,
  register,
  value,
  error,
}) => {
  const renerAttachedImages = () => {
    const attachments = value;

    if (attachments != null) {
      const images = [...attachments];

      return images.map((image, index) => {
        return (
          <div
            key={URL.createObjectURL(image)}
            className="w-52 h-52 overflow-hidden"
          >
            <Image
              width={200}
              height={200}
              className="w-52 h-52 object-cover"
              alt={`Attached image number ${index + 1}`}
              src={URL.createObjectURL(image)}
            />
          </div>
        );
      });
    } else {
      return <div className="text-white">No images attached.</div>;
    }
  };
  return (
    <div>
      <label className="text-white font-medium text-xl">{label}</label>
      <div className="my-2">
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
      {error?.message && (
        <p className="text-red font-medium">
          {capitalizeFirstLetter(error.message)}
        </p>
      )}
      <div className="grid grid-cols-4 gap-4 mt-5">{renerAttachedImages()}</div>
    </div>
  );
};

export default UploadButton;
