import React, { FunctionComponent } from "react";
import { useRecoilState } from "recoil";

import Dropdown from "../../../components/Dropdown/Dropdown";
import InputComponent from "../../../components/InputComponent/InputComponent";
import PageHeader from "../../../components/PageHeader/PageHeader";

import { offerFormState } from "../../../atoms/atoms";
import { categoryDropdownItems } from "../../../utils";
import { ApartmentCategory } from "../../../types/common";

const NewOffer: FunctionComponent = () => {
  const [offerFormStateValue, setOfferFormState] =
    useRecoilState(offerFormState);

  return (
    <div className="flex flex-col items-center">
      <PageHeader
        title="Create new offer"
        description="Fill the form below and sell or rent your property."
      />
      <div className="w-3/4 flex flex-col gap-10">
        <InputComponent label="Title" placeholder="Title of your offer" />
        <Dropdown
          label="Category"
          items={categoryDropdownItems}
          value={offerFormStateValue.category}
          onChange={(value: ApartmentCategory) =>
            setOfferFormState(prevState => ({ ...prevState, category: value }))
          }
        />
      </div>
    </div>
  );
};

export default NewOffer;
