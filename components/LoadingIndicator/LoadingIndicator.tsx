import * as React from "react";

import Spinner from "components/Spinner";
import { loadingState } from "../../atoms/atoms";
import { useRecoilValue } from "recoil";

const LoadingIndicator = () => {
  const { isLoading, message } = useRecoilValue(loadingState);

  return isLoading ? (
    <div className="w-full h-full fixed bg-black top-0 bg-opacity-75 z-50 flex items-center justify-center">
      <Spinner />
      <h2 className="ml-2 text-white">{message}</h2>
    </div>
  ) : null;
};

export default LoadingIndicator;
