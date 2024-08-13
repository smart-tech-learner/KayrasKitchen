const uploadUrl = `https://api.cloudinary.com/v1_1/${
  import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
}/auto/upload`;

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "infinity-food-delivery");

  const response = await fetch(uploadUrl, {
    method: "post",
    body: formData,
  });

  const responseData = await response.json();
  return responseData;
};
