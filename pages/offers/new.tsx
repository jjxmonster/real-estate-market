import React, { FunctionComponent } from "react";
import { useRouter } from "next/router";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  loadingState,
  notificationState,
  offerFormState,
} from "../../atoms/atoms";
import { categoryDropdownItems, offerFormFields } from "../../utils";
import {
  ApartmentCategory,
  NotificatonType,
  OfferFormStateType,
} from "../../types/common";
import uploadimage from "../../services/offers/upload";

import Dropdown from "../../components/Dropdown/Dropdown";
import InputComponent from "../../components/InputComponent/InputComponent";
import PageHeader from "../../components/PageHeader/PageHeader";
import UploadButton from "../../components/UploadButton/UploadButton";
import Button from "../../components/Button/Button";

const schema = yup
  .object({
    title: yup.string().required().min(5),
    price: yup.number().required().min(1),
    location: yup.string().required(),
    category: yup.string().typeError("Category is a required field"),
    description: yup.string().required().min(10),
    area: yup.number().required().min(10),
    image_url: yup
      .mixed()
      .test(
        "fileUpload",
        "Upload Image is required",
        value => value?.length && true
      ),
  })
  .required();

const NewOffer: FunctionComponent = () => {
  const [{ title, category, location, description, price, area }] =
    useRecoilState(offerFormState);
  const setLoadingState = useSetRecoilState(loadingState);
  const setNotificationState = useSetRecoilState(notificationState);

  const { push } = useRouter();

  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OfferFormStateType>({
    resolver: yupResolver(schema),
    defaultValues: {
      title,
      category,
      location,
      description,
      price,
      area,
    },
  });

  const onSubmit = handleSubmit(async payload => {
    setLoadingState({ isLoading: true, message: "Creating New Offer..." });

    payload.image_url &&
      (await uploadimage(payload.image_url).then(async image_url => {
        const response = await fetch("/api/offers", {
          method: "POST",
          body: JSON.stringify({ ...payload, image_url }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          setLoadingState({ isLoading: false, message: "" });
          push("/offers/thanks");
        } else {
          const payload = await response.json();

          setLoadingState({
            isLoading: false,
            message: "",
          });
          setNotificationState({
            isVisible: true,
            type: NotificatonType.DANGER,
            message: payload.err.details[0]?.message,
          });
        }
      }));
  });

  const renderFields = offerFormFields.map(
    ({ key, label, placeholder, type }) => {
      if (type === "file" && key === "image_url") {
        return (
          <UploadButton
            error={errors[key]}
            value={watch("image_url")}
            key={key}
            label="image"
            register={register("image_url")}
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
        description="Fill the form below and create an offer with your property."
      />
      <form className="w-3/4 flex flex-col gap-10">{renderFields}</form>
      <Button onClick={onSubmit} label="Submit Offer" />
    </div>
  );
};

export default NewOffer;
