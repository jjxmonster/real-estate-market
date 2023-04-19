import { ApartmentCategory } from "types/common";

const paginate = async (offset: string, category: ApartmentCategory) => {
  let apiURL = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE}/offers?pageSize=3&view=Grid%20view`;

  if (offset) {
    apiURL += `&offset=${offset}`;
  }

  const response = await fetch(apiURL, {
    headers: {
      Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
    },
  });

  const records = await response.json();

  return records;
};

export default paginate;
