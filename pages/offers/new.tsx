import * as yup from "yup";

import {
  ApartmentCategory,
  NotificatonType,
  OfferFormType,
} from "../../types/common";
import { Controller, useForm } from "react-hook-form";
import React, { FunctionComponent, useEffect } from "react";
import { URL, categoryDropdownItems, offerFormFields } from "../../utils";
import { loadingState, notificationState } from "../../atoms/atoms";

import Button from "../../components/Button/Button";
import Head from "next/head";
import InputComponent from "../../components/InputComponent/InputComponent";
import PageHeader from "../../components/PageHeader/PageHeader";
import Selector from "../../components/Selector/Selector";
import UploadButton from "../../components/UploadButton/UploadButton";
import uploadimage from "../../services/offers/upload";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useSetRecoilState } from "recoil";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
  .object({
    title: yup.string().required().min(5),
    price: yup.number().required().min(1),
    location: yup.string().required(),
    category: yup.string().typeError("Category is a required field"),
    description: yup.string().required().min(10),
    area: yup.number().required().min(10),
    mobile: yup.number().required().min(9).max(9),
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
  const setLoadingState = useSetRecoilState(loadingState);
  const setNotificationState = useSetRecoilState(notificationState);
  const { status } = useSession();

  const { push } = useRouter();

  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OfferFormType>({
    resolver: yupResolver(schema),
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
          push(URL.THANKS_PAGE);
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
                <Selector
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

  useEffect(() => {
    setLoadingState({ isLoading: false, message: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === "loading") {
    setLoadingState({ isLoading: true, message: "Loading..." });

    return null;
  } else if (status === "unauthenticated") {
    setLoadingState({ isLoading: true, message: "Redirecting..." });

    setTimeout(() => {
      setLoadingState({ isLoading: false, message: "" });

      push(URL.HOME_PAGE);
    }, 1000);

    return null;
  }

  return (
    <>
      <Head>
        <title>HOME4U | New offer</title>
      </Head>
      <div className="flex flex-col items-center">
        <PageHeader
          title="Create new offer"
          description="Fill the form below and create an offer with your property."
        />
        <form className="w-3/4 flex flex-col gap-10">{renderFields}</form>
        <Button onClick={onSubmit} label="Submit Offer" />
      </div>
    </>
  );
};

export default NewOffer;
