import React, { FunctionComponent, ReactElement } from "react";

interface AppWrapperProps {
  children: ReactElement | Array<ReactElement>;
}

const AppWrapper: FunctionComponent<AppWrapperProps> = ({ children }) => {
  return (
    <div className="w-screen relative flex flex-col items-center min-h-screen">
      <div className="max-w-screen-xl w-full flex-1 relative">{children}</div>
    </div>
  );
};

export default AppWrapper;
