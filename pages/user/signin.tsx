import * as yup from "yup";

import { NotificatonType, RegisterFormType } from "../../types/common";
import React, { FunctionComponent } from "react";
import { URL, loginrormFields } from "../../utils";
import { loadingState, notificationState } from "../../atoms/atoms";

import Button from "../../components/Button/Button";
import Head from "next/head";
import InputComponent from "../../components/InputComponent/InputComponent";
import PageHeader from "../../components/PageHeader/PageHeader";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
  })
  .required();

const SignIn: FunctionComponent = () => {
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

  const onSubmit = handleSubmit(async ({ email, password }) => {
    setLoadingState({ isLoading: true, message: "Login in progress..." });

    const response = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (response?.ok) {
      setLoadingState({ isLoading: false, message: "" });

      push(URL.HOME_PAGE);
    } else {
      setNotificationState({
        isVisible: true,
        type: NotificatonType.DANGER,
        message: `Not authorized. Try Again`,
      });
      setLoadingState({ isLoading: false, message: "" });
    }
  });

  const renderFields = loginrormFields.map(
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
          title="Welcome back!"
          description="Sign in with your email and password"
        />
        <form className="w-3/4 flex mb-12 flex-col gap-10">{renderFields}</form>
        <Button onClick={onSubmit} label="Sign In" />
      </div>
    </>
  );
};

export default SignIn;
