import React, { FunctionComponent } from "react";

interface SingleMessageProps {
  text: string;
  isFromLoggedUser: boolean;
}

const SingleMessage: FunctionComponent<SingleMessageProps> = ({
  text,
  isFromLoggedUser,
}) => {
  return (
    <div className={`w-full flex ${isFromLoggedUser && "justify-end"}`}>
      <div
        className={`shadow-md p-5 border-2 border-gray-dark max-w-[70%] text-white ${
          isFromLoggedUser ? "bg-yellow_opacity" : "bg-transparent"
        } rounded-xl flex mb-10`}
      >
        {text}
      </div>
    </div>
  );
};

export default SingleMessage;
