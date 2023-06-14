import { NextApiRequest, NextApiResponse } from "next";

import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const upload = async (_req: NextApiRequest, res: NextApiResponse) => {
  const timestamp = Number(new Date());
  const api_key = process.env.NEXT_PUBLIC_CLOUDINARY_KEY;
  const sig = await cloudinary.v2.utils.api_sign_request(
    { timestamp },
    process.env.CLOUDINARY_SECRET as string
  );

  res.status(200).json({ timestamp, sig, api_key });
};

export default upload;
