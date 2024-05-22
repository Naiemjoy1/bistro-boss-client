import { useState } from "react";
import axios from "axios";

const useImgApi = () => {
  const [imageUrl, setImageUrl] = useState(null);

  const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("image", image);

    try {
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`,
        formData
      );
      const url = data.data.display_url;
      setImageUrl(url);
      return url; // Return the URL here
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  return { imageUrl, uploadImage };
};

export default useImgApi;
