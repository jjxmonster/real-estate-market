import * as yup from "yup";

import React, { FunctionComponent } from "react";

import { ContactFormType } from "types/common";
import InputComponent from "components/InputComponent/InputComponent";
import { contactFormFields } from "utils";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  message: yup.string().required().min(10),
  name: yup.string().required().min(10),
  email: yup.string().email().required().min(10),
});

interface ContactFormProps {}

const ContactForm: FunctionComponent<ContactFormProps> = () => {
  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormType>({
    resolver: yupResolver(schema),
  });

  const renderFields = contactFormFields.map(
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
    <div>
      <div className="flex justify-centesr w-full">
        <div className=" my-20 w-60 border-2 border-yellow"></div>
      </div>
      <h3 className="text-2xl text-white">
        Are you interested? Send a message to owner!
      </h3>
      <form className="w-2/4 flex my-12 flex-col gap-10">{renderFields}</form>
    </div>
  );
};

export default ContactForm;
