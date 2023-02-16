import { ApartmentCategory } from "types/common";

const paginate = async (offset: string, category: ApartmentCategory) => {
  let apiURL = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE}/offers?maxRecords=6&view=Grid%20view"`;

  if (offset) {
    apiURL +=
      `&offset=${offset}` +
      encodeURI(`filterByFormula=(category="${category}")`);
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
