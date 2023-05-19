import { ProductType } from "types/common";
import airDB from "services/airtableClient";

const getAll = async (): Promise<Array<ProductType>> => {
  const products = await airDB("products").select().firstPage();

  if (products) {
    return products.map(product => ({
      airtableID: product.id,
      ...(product.fields as Omit<ProductType, "airtableID">),
    }));
  }

  return [];
};

export default getAll;
