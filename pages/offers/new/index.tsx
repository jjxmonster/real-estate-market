import React, { FunctionComponent } from "react";
import { useRecoilState } from "recoil";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { offerFormState } from "../../../atoms/atoms";
import { categoryDropdownItems, offerFormFields } from "../../../utils";
import { ApartmentCategory, OfferFormStateType } from "../../../types/common";

import Dropdown from "../../../components/Dropdown/Dropdown";
import InputComponent from "../../../components/InputComponent/InputComponent";
import PageHeader from "../../../components/PageHeader/PageHeader";
import UploadButton from "../../../components/UploadButton/UploadButton";
import Button from "../../../components/Button/Button";

const schema = yup
  .object({
    title: yup.string().required().min(5),
    price: yup.number().required().min(1),
    address: yup.string().required(),
    category: yup.string().required(),
    description: yup.string().required().min(10),
    area: yup.number().required().min(10),
    images: yup
      .mixed()
      .test(
        "fileUpload",
        "Upload Image is required",
        value => value?.length && true
      ),
  })
  .required();

const NewOffer: FunctionComponent = () => {
  const [{ title, category, address, description, price, area }] =
    useRecoilState(offerFormState);
  const {
    register,
    watch,
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<OfferFormStateType>({
    resolver: yupResolver(schema),
    defaultValues: {
      title,
      category,
      address,
      description,
      price,
      area,
    },
  });

  const onSubmit = handleSubmit(data => {
    console.log(data);
  });

  const renderFields = offerFormFields.map(
    ({ key, label, placeholder, type }) => {
      if (type === "file" && key === "images") {
        return (
          <UploadButton
            error={errors[key]}
            value={watch("images")}
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
                  error={errors[key]}
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
          error={errors[key]}
          area={type === "area"}
          key={key}
          type={type}
          register={register(key)}
          label={`${label} ${
            (key === "price" && watch("category")) === "rent" ? "/month" : ""
          }`}
          placeholder={placeholder}
        />
      );
    }
  );

  return (
    <div className="flex flex-col items-center">
      <PageHeader
        title="Create new offer"
        description="Fill the form below and sell or rent your property."
      />
      <form className="w-3/4 flex flex-col gap-10">{renderFields}</form>
      <Button onClick={onSubmit} label="Submit Offer" />
    </div>
  );
};

export default NewOffer;
