import axios from "axios";

export const getImageUrl = async (file: File): Promise<string | null> => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_cloudPreset);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_cloudName
      }/image/upload`,
      formData
    );

    return response.data.secure_url || null;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};
