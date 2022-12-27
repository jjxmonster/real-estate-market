import React, { FunctionComponent, useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";
import { Controller, useForm } from "react-hook-form";

import Dropdown from "../../../components/Dropdown/Dropdown";
import InputComponent from "../../../components/InputComponent/InputComponent";
import PageHeader from "../../../components/PageHeader/PageHeader";

import { offerFormState } from "../../../atoms/atoms";
import { categoryDropdownItems, offerFormFields } from "../../../utils";
import { ApartmentCategory, OfferFormStateType } from "../../../types/common";
import UploadButton from "../../../components/UploadButton/UploadButton";

const NewOffer: FunctionComponent = () => {
  const [
    { title, category, address, description, price, area },
    setOfferFormState,
  ] = useRecoilState(offerFormState);
  const { register, watch, control } = useForm<OfferFormStateType>({
    defaultValues: {
      title,
      category,
      address,
      description,
      price,
      area,
    },
  });

  const renderFields = offerFormFields.map(
    ({ key, label, placeholder, type }) => {
      if (type === "file" && key === "images") {
        return (
          <UploadButton
            key={key}
            label="Images"
            register={register("images")}
          />
        );
      }
      if (type === "dropdown" && key === "category") {
        return (
          <Controller
            key={key}
            name={key}
            control={control}
            render={({ field }) => {
              const { value, onChange } = field;
              return (
                <Dropdown
                  label={label}
                  items={categoryDropdownItems}
                  value={value}
                  onChange={(value: ApartmentCategory) => onChange(value)}
                />
              );
            }}
          />
        );
      }
      return (
        <InputComponent
          area={type === "area"}
          key={key}
          type={type}
          register={register(key)}
          label={label}
          placeholder={placeholder}
        />
      );
    }
  );

  // useEffect(() => {
  //   return () => {
  //     let updatedObject = {};
  //     Object.entries(getValues()).map(value => {
  //       updatedObject = { ...updatedObject, [String(value[0])]: value[1] };
  //     });

  //     setOfferFormState(prevState => {
  //       console.log({ ...updatedObject });
  //       return {
  //         ...Object.freeze(prevState),
  //         // ...Object.freeze(updatedObject),
  //       };
  //     });
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  const renderImages = () => {
    const attachments = watch("images");

    if (attachments != null) {
      const reader = new FileReader();
      const images = [...attachments];

      return images.map((image, index) => {
        return (
          <div
            key={URL.createObjectURL(image)}
            className="w-52 h-52 overflow-hidden"
          >
            <img
              className="w-52 h-52 object-cover"
              alt={`Attached image number ${index + 1}`}
              src={URL.createObjectURL(image)}
            />
          </div>
        );
      });
    } else {
      return null;
    }
  };
  return (
    <div className="flex flex-col items-center">
      <PageHeader
        title="Create new offer"
        description="Fill the form below and sell or rent your property."
      />
      <div className="w-3/4 flex flex-col gap-10">
        {renderFields}
        <div className="grid grid-cols-4 gap-4 mt-5">{renderImages()}</div>
      </div>
    </div>
  );
};

export default NewOffer;
