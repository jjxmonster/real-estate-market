import React, { FunctionComponent, ReactElement } from "react";

interface AppWrapperProps {
  children: ReactElement | Array<ReactElement>;
}

const AppWrapper: FunctionComponent<AppWrapperProps> = ({ children }) => {
  return (
    <div className="w-screen flex flex-col items-center">
      <div className="max-w-screen-xl w-full flex-1">{children}</div>
    </div>
  );
};

export default AppWrapper;