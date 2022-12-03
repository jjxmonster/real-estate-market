import Image from "next/image";
import { type } from "os";
import React, { FunctionComponent } from "react";

import Badge from "../Badge/Badge";
import { AreaIcon, CategoryIcon, LocationIcon } from "../Icons/Icons";

interface ApartmentCardProps {
  title: string;
  description: string;
  area: number;
  category: string;
  location: string;
  image_url: string;
}

const ApartmentCard: FunctionComponent<ApartmentCardProps> = ({
  title,
  description,
  area,
  category,
  location,
  image_url,
}) => {
  return (
    <div className="max-w-sm rounded-md shadow-xl border-gray-700 border bg-gray-dark	overflow-hidden shadow-lg cursor-pointer relative after:absolute after:invisible after:top-0 after:left-0 after:border-yellow after:border-l-2 after:border-t-2 after:w-0 after:h-0 after:ease after:transition-all	 hover:after:h-full hover:after:w-full hover:after:visible before:absolute before:invisible before:bottom-0 before:right-0 before:border-yellow before:border-b-2 before:border-r-2 before:w-0 before:h-0 before:ease before:transition-all	 hover:before:h-full hover:before:w-full hover:before:visible after:duration-300 before:duration-300">
      <div className="p-4 rounded-md overflow-hidden">
        <Image
          className="rounded-md"
          width={500}
          height={500}
          placeholder="blur"
          blurDataURL={`${image_url}?auto=format,compress&q=1&blur=500&w=2`}
          src={image_url}
          alt="Sunset in the mountains"
        />
      </div>
      <div className="px-6 py-4">
        <div className="font-extrabold text-white text-xl mb-2">{title}</div>
        <p className="text-gray-500 text-base">{description}</p>
      </div>
      <p className="px-6 text-yellow text-xl font-extrabold">$500,000</p>
      <div className="pl-4 pt-4 pb-4 flex">
        <Badge text={`${String(area)}m²`} icon={AreaIcon} />
        <Badge text={category} icon={CategoryIcon} />
        <Badge text={location} icon={LocationIcon} />
      </div>
    </div>
  );
};

export default ApartmentCard;
