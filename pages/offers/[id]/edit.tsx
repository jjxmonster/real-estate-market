import * as yup from "yup";

import {
  ApartmentCategory,
  ApartmentOffer,
  NotificatonType,
  OfferFormType,
} from "../../../types/common";
import { Controller, useForm } from "react-hook-form";
import React, { FunctionComponent, useEffect } from "react";
import { URL, categoryDropdownItems, offerFormFields } from "../../../utils";
import { getSession, useSession } from "next-auth/react";
import { loadingState, notificationState } from "../../../atoms/atoms";

import Button from "../../../components/Button/Button";
import { GetServerSideProps } from "next";
import Head from "next/head";
import InputComponent from "../../../components/InputComponent/InputComponent";
import PageHeader from "../../../components/PageHeader/PageHeader";
import Selector from "../../../components/Selector/Selector";
import UploadButton from "../../../components/UploadButton/UploadButton";
import getOfferByID from "services/offers/get";
import isAuthorized from "services/offers/isAuthorized";
import uploadimage from "../../../services/offers/upload";
import { useRouter } from "next/router";
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
    contact: yup.number().required().min(9).max(9),
    image_url: yup
      .mixed()
      .test(
        "fileUpload",
        "Upload Image is required",
        value => value?.length && true
      ),
  })
  .required();

interface OfferEditPageProps {
  offer: ApartmentOffer;
}

const OfferEditPageProps: FunctionComponent<OfferEditPageProps> = ({
  offer,
}) => {
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

  return (
    <>
      <Head>
        <title>HOME4U | Edit offer</title>
      </Head>
      <div className="flex flex-col items-center">
        <PageHeader
          title="Edit that offer"
          description="Update the information and save your changes to keep your offer up-to-date."
        />
        <form className="w-3/4 flex flex-col gap-10">{renderFields}</form>
        <Button onClick={onSubmit} label="Save Changes" />
      </div>
    </>
  );
};

export default OfferEditPageProps;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const session = await getSession({ req });
  const offer = await getOfferByID(query.id as string);

  if (!isAuthorized(offer, session) || !offer) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      offer,
    },
  };
};
