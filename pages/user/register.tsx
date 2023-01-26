import React, { FunctionComponent } from "react";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { loadingState, notificationState } from "../../atoms/atoms";
import { URL, registerFormFields } from "../../utils";
import { NotificatonType, RegisterFormType } from "../../types/common";

import InputComponent from "../../components/InputComponent/InputComponent";
import PageHeader from "../../components/PageHeader/PageHeader";
import Button from "../../components/Button/Button";
import Head from "next/head";

const schema = yup
  .object({
    name: yup.string().required().min(3),
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  })
  .required();

const Register: FunctionComponent = () => {
  const setLoadingState = useSetRecoilState(loadingState);
  const setNotificationState = useSetRecoilState(notificationState);

  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormType>({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit(async ({ name, password, email }) => {
    setLoadingState({ isLoading: true, message: "Creating your account..." });

    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ name, password, email }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      setLoadingState({ isLoading: false, message: "" });
      push(URL.HOME_PAGE);
    } else {
      const payload = await response.json();

      setLoadingState({
        isLoading: false,
        message: "",
      });
      setNotificationState({
        isVisible: true,
        type: NotificatonType.DANGER,
        message: `Account not created: ${payload.error}`,
      });
    }
  });

  const renderFields = registerFormFields.map(
    ({ key, label, placeholder, type }) => {
      return (
        <InputComponent
          error={errors[key]}
          key={key}
          type={type}
          register={register(key)}
          label={label}
          placeholder={placeholder}
        />
      );
    }
  );

  return (
    <>
      <Head>
        <title>HOME4U | New offer</title>
      </Head>
      <div className="flex flex-col items-center">
        <PageHeader
          title="Create new account"
          description="Fill the form below in order to register."
        />
        <form className="w-3/4 flex mb-12 flex-col gap-10">{renderFields}</form>
        <Button onClick={onSubmit} label="Create new account" />
      </div>
    </>
  );
};

export default Register;
