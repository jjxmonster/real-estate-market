import React, { FunctionComponent, ReactElement } from "react";

interface BadgeProps {
  text: string;
  icon?: ReactElement;
}

const Badge: FunctionComponent<BadgeProps> = ({ text, icon }) => {
  return (
    <div className="bg-white flex items-center bg-transparent gap-1 rounded-full px-3 py-1 text-sm font-semibold text-gray-500">
      <span className="text-yellow ml">{icon}</span>
      <span>{text}</span>
    </div>
  );
};

export default Badge;
