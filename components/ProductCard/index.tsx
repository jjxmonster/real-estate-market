import React, { FunctionComponent } from "react";

import Button from "components/Button/Button";
import { ProductType } from "types/common";
import { formatCurrency } from "utils";

interface ProductCardProps {
  product: ProductType;
  handleGetHighlight: (productID: string) => void;
}

const ProductCard: FunctionComponent<ProductCardProps> = ({
  product,
  handleGetHighlight,
}) => {
  console.log(product);
  return (
    <div className="flex flex-col gap-y-10 flex-1 pb-10 m-10 max-w-[400px] overflow-hidden items-center  border-b-8 shadow-xl border-yellow cursor-pointer relative after:absolute after:w-full after:h-3/5 after:inset-0 after:z-0 after:bg-yellow after:rounded-b-full">
      <div className="py-12 w-full flex flex-col items-center gap-y-5 ">
        <h3 className="text-black z-50 text-2xl font-bold">
          {product.duration} DAYS
        </h3>
        <span className="text-black font-bold text-3xl z-50">
          {formatCurrency.format(product.priceCents / 100)}
        </span>
      </div>
      <div className="!z-50">
        <Button
          label={`GET ${product.duration} DAYS HIGHLIGHT`}
          onClick={() => handleGetHighlight(product.airtableID)}
        />
      </div>
    </div>
  );
};

export default ProductCard;
