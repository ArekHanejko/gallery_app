"use client"
import GalleryPage from "./components/GalleryPage";
import withoutAuth from "./withoutAuth";
import axios from "axios";

function Images() {
  const fetchImages = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Images`
      );
      return response.data;
    } catch (error) {
      console.error("Błąd podczas pobierania zdjęć użytkownika:", error);
      return []; // fallback
    }
  };



  return (
    <GalleryPage
      fetchImages={fetchImages}
      isUserGallery={false}
    />
  );
}

export default Images;
