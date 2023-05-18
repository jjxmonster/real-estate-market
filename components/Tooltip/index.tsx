import React, { ReactNode } from "react";

import { Tooltip } from "react-tooltip";

interface TooltipProps {
  children: ReactNode;
  text: string;
}

const CustomTooltip: React.FC<TooltipProps> = ({ children, text }) => {
  return (
    <div className="relative inline-block">
      <a data-tooltip-id={`my-tooltip-${text}`} data-tooltip-content={text}>
        {children}
      </a>
      <Tooltip id={`my-tooltip-${text}`} />
    </div>
  );
};

export default CustomTooltip;
