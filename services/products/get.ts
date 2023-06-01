import { ProductType } from "types/common";
import airDB from "services/airtableClient";

const get = async (airtableID: string): Promise<ProductType> => {
  const product = await airDB("products").find(airtableID);

  if (product) {
    return { id: product.id, ...(product.fields as Omit<ProductType, "id">) };
  }
  return product;
};

export default get;
