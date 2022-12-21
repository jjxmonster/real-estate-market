import React, { FunctionComponent, useEffect } from "react";
import { useRecoilState } from "recoil";

import Dropdown from "../../../components/Dropdown/Dropdown";
import InputComponent from "../../../components/InputComponent/InputComponent";
import PageHeader from "../../../components/PageHeader/PageHeader";

import { offerFormState } from "../../../atoms/atoms";
import { categoryDropdownItems } from "../../../utils";
import { ApartmentCategory, OfferFormStateType } from "../../../types/common";
import { Controller, useForm } from "react-hook-form";

const NewOffer: FunctionComponent = () => {
  const [{ title, category, address, description, price }, setOfferFormState] =
    useRecoilState(offerFormState);
  const { register, getValues, control, watch } = useForm<OfferFormStateType>({
    defaultValues: {
      title,
      category,
      address,
      description,
      price,
    },
  });

  const titleFieldRegister = register("title");
  const addressFieldRegister = register("address");
  const descriptionFieldRegister = register("description");
  const priceFieldRegister = register("price");

  useEffect(() => {
    return () => {
      let updatedObject = {};
      Object.entries(getValues()).map(value => {
        updatedObject = { ...updatedObject, [String(value[0])]: value[1] };
      });

      setOfferFormState(prevState => ({
        ...prevState,
        ...updatedObject,
      }));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center">
      <PageHeader
        title="Create new offer"
        description="Fill the form below and sell or rent your property."
      />
      <div className="w-3/4 flex flex-col gap-10">
        <InputComponent
          register={titleFieldRegister}
          label="Title"
          placeholder="Beautiful House in New York"
        />
        <Controller
          name="category"
          control={control}
          render={({ field }) => {
            const { value, onChange } = field;
            return (
              <Dropdown
                label="Category"
                items={categoryDropdownItems}
                value={value}
                onChange={(value: ApartmentCategory) => onChange(value)}
              />
            );
          }}
        />
        <InputComponent
          register={register("price")}
          label="Price"
          placeholder={`$ ${watch("category") === "rent" ? "/ month" : ""}`}
        />
        <InputComponent
          register={addressFieldRegister}
          label="Address"
          placeholder="Street 12, New York"
        />
        <InputComponent
          area
          register={descriptionFieldRegister}
          label="Description"
          placeholder="Tell us something more about property that you offer"
        />
      </div>
    </div>
  );
};

export default NewOffer;
