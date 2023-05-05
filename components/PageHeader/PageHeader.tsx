import React, { FunctionComponent } from "react";

interface PageHeaderProps {
  title: string;
  description: string;
}

const PageHeader: FunctionComponent<PageHeaderProps> = ({
  title,
  description,
}) => {
  return (
    <div className="flex flex-col items-center mb-12 mt-16">
      <h2 className="text-white font-bold text-4xl relative before:right-0 before:left-0 before:m-auto before:absolute before:w-2/5 before:h-full before:border-b-2 before:border-yellow ">
        {title}
      </h2>
      <p className="text-gray-500 mt-5">{description}</p>
    </div>
  );
};

export default PageHeader;
