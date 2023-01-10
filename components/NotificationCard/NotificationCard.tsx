import React, { useState, useEffect } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";

import { notificationState } from "../../atoms/atoms";

import {
  CloseIcon,
  DangerousIcon,
  InfoIcon,
  SuccessIcon,
} from "../Icons/Icons";
import { NotificatonType } from "../../types/common";

const NotificationCard = () => {
  const { isVisible, message, type } = useRecoilValue(notificationState);
  const resetNotificationState = useResetRecoilState(notificationState);
  const [boxBackground, setBoxBackground] = useState<string>();

  const iconType = () => {
    switch (type) {
      case NotificatonType.DANGER:
        return <DangerousIcon />;
      case NotificatonType.INFORMATION:
        return <InfoIcon />;
      case NotificatonType.SUCCESS:
        return <SuccessIcon />;

      default:
        null;
    }
  };

  useEffect(() => {
    switch (type) {
      case NotificatonType.DANGER:
        return setBoxBackground("bg-danger");
      case NotificatonType.INFORMATION:
        return setBoxBackground("bg-information");
      case NotificatonType.SUCCESS:
        return setBoxBackground("bg-success");

      default:
        null;
    }
  }, [type]);

  useEffect(() => {
    isVisible &&
      setTimeout(() => {
        resetNotificationState();
      }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  return (
    <div
      className={` ${
        !isVisible && "hidden"
      } flex justify-between ${boxBackground} items-center space-x-4 p-3 mb-4 border-black border-solid border-2  fixed right-5 top-5 z-50 rounded-lg shadow text-white `}
      role="alert"
    >
      {iconType()}
      <p className="text-s">{message}</p>
      <button onClick={resetNotificationState}>
        <CloseIcon />
      </button>
    </div>
  );
};

export default NotificationCard;
