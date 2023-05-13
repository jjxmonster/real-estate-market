import * as yup from "yup";

import {
  ApartmentCategory,
  ApartmentOffer,
  NotificatonType,
  OfferFormKeysType,
  OfferFormType,
} from "../../../types/common";
import { Controller, useForm } from "react-hook-form";
import React, { FunctionComponent, useEffect } from "react";
import { URL, categoryDropdownItems, offerFormFields } from "../../../utils";
import { loadingState, notificationState } from "../../../atoms/atoms";

import Button from "../../../components/Button/Button";
import { GetServerSideProps } from "next";
import Head from "next/head";
import InputComponent from "../../../components/InputComponent/InputComponent";
import PageHeader from "../../../components/PageHeader/PageHeader";
import Selector from "../../../components/Selector/Selector";
import getOfferByID from "services/offers/get";
import { getSession } from "next-auth/react";
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
    mobile: yup.string().required().min(9).max(9),
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

  const { push } = useRouter();

  const {
    register,
    watch,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OfferFormType>({
    resolver: yupResolver(schema),
  });
  const onSubmit = handleSubmit(async payload => {
    setLoadingState({ isLoading: true, message: "Updating Offer..." });

    const response = await fetch(`/api/offers/${offer.id}`, {
      method: "PUT",
      body: JSON.stringify({ ...payload }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      setLoadingState({ isLoading: false, message: "" });
      push(`${URL.OFFER_PAGE}${offer.id}`);
    } else {
      const response_json = await response.json();

      setLoadingState({
        isLoading: false,
        message: "",
      });
      setNotificationState({
        isVisible: true,
        type: NotificatonType.DANGER,
        message: response_json.error,
      });
    }
  });

  const renderFields = offerFormFields.map(
    ({ key, label, placeholder, type }) => {
      if (type === "file" && key === "image_url") {
        return null;
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
    const available_keys = [
      "title",
      "location",
      "price",
      "description",
      "area",
      "category",
      "image_url",
      "mobile",
    ];
    Object.entries(offer).forEach(([key, value]) => {
      if (available_keys.includes(key)) {
        setValue(
          key as OfferFormKeysType,
          key === "mobile"
            ? Number(value)
            : (value as string | number | FileList | null)
        );
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
