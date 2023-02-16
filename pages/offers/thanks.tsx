import * as React from "react";

import Button from "../../components/Button/Button";
import PageHeader from "../../components/PageHeader/PageHeader";
import { URL } from "../../utils";
import { useRouter } from "next/router";

const Thanks = () => {
  const { push } = useRouter();
  return (
    <div>
      <PageHeader
        title="Thanks for submitting new offer"
        description="Upon positive verification it will show in our listing."
      />
      <div className="w-full flex flex-col items-center">
        <Button onClick={() => push(URL.HOME_PAGE)} label="Go to homepage" />
      </div>
    </div>
  );
};

export default Thanks;
