import supabase from "../supabaseClient";

const upload = async (image: FileList): Promise<string> => {
  const { data, error } = await supabase.storage
    .from("images")
    .upload(`${image[0].name}-${Date.now()}`, image[0]);

  if (error) {
    throw new Error("Upload image error");
  }

  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${data.path}`;
};

export default upload;
