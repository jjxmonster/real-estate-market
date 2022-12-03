import Airtable from "airtable";

const api_key = process.env.AIRTABLE_API_KEY;
const base = process.env.AIRTABLE_BASE;

if (!api_key || !base) {
  throw new Error("environment variables missing");
}

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: api_key,
});

export default Airtable.base(base);
