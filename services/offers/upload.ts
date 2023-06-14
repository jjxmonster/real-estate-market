const upload = async (image: FileList): Promise<string> => {
  let response = await fetch("/api/upload");
  let data = await response.json();
  const formData = new FormData();
  formData.append("file", image[0]);
  formData.append("api_key", data.api_key);
  formData.append("timestamp", data.timestamp);
  formData.append("signature", data.sig);
  console.log(data);
  response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  data = await response.json();

  return data.secure_url;
};

export default upload;
