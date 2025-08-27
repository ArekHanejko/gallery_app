"use client"
import GalleryPage from "./components/GalleryPage";
import withoutAuth from "./withoutAuth";
import axios from "axios";

function UserImages() {
  const fetchUserImages = async (userId) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Image/by-owner/${userId}`
      );
      return response.data;
    } catch (error) {
      console.error("Błąd podczas pobierania zdjęć użytkownika:", error);
      return []; // fallback
    }
  };



  return (
    <GalleryPage
      fetchImages={fetchUserImages}
      isUserGallery={false}
    />
  );
}

export default withoutAuth(UserImages);
