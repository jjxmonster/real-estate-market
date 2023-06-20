import { AreaIcon, CategoryIcon, StarIcon } from "../Icons/Icons";
import React, { FunctionComponent } from "react";
import { URL, formatCurrency } from "../../utils";

import Badge from "../Badge/Badge";
import Image from "next/image";
import { useRouter } from "next/router";

interface ApartmentCardProps {
  title: string;
  area: number;
  category: string;
  location: string;
  image_url: string;
  price: number;
  id: number;
  isHightlight: boolean;
}

const ApartmentCard: FunctionComponent<ApartmentCardProps> = ({
  title,
  area,
  category,
  location,
  image_url,
  price,
  id,
  isHightlight,
}) => {
  const { push } = useRouter();

  return (
    <div
      onClick={() => push(`${URL.OFFER_PAGE}${id}`)}
      className={`max-w-sm rounded-md border-gray-700 border bg-gray-dark mb-10 overflow-hidden shadow-lg ${
        isHightlight && "shadow-2xl shadow-yellow_opacity"
      } cursor-pointer relative after:absolute after:invisible after:top-0 after:left-0 after:border-yellow after:border-l-2 after:border-md after:border-t-2 after:w-0 after:h-0 after:ease after:transition-all	 hover:after:h-full hover:after:w-full hover:after:visible before:absolute before:invisible before:bottom-0 before:right-0 before:rounded-md before:border-yellow before:border-b-2 before:border-r-2 before:w-0 before:h-0 before:ease before:transition-all	 hover:before:h-full hover:before:w-full hover:before:visible after:duration-300 before:duration-300`}
    >
      <div className="p-4 rounded-xl w-full h-56 overflow-hidden mb-5">
        <Image
          className="rounded-md"
          width={1000}
          height={1000}
          placeholder="blur"
          blurDataURL={`${image_url}?auto=format,compress&q=1&blur=500&w=2`}
          src={image_url}
          alt={`${title} image`}
        />
      </div>
      <p className="px-6 text-yellow text-xl font-extrabold">
        {formatCurrency.format(price)}
        <span className="text-gray-500">
          {category === "rent" && " /month"}
        </span>
      </p>
      <div className="px-6 py-4">
        <div className="font-extrabold text-white text-xl mb-2">{title}</div>
        <p className="text-gray-500 text-base">{location}</p>
      </div>
      <div className="p-4 flex justify-between">
        <div className="flex">
          <Badge text={`${String(area)}m²`} icon={<AreaIcon width="4" />} />
          <Badge text={category} icon={<CategoryIcon width="4" />} />
        </div>
        {isHightlight && <StarIcon />}
      </div>
    </div>
  );
};

export default ApartmentCard;
