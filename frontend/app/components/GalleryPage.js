"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../userContext";
import ImageCard from "../components/ImageCard";
import ImageModal from "../components/ImageModal";

export default function GalleryPage({ fetchImages, isUserGallery = false }) {
  const [allImages, setAllImages] = useState([]);
  const [bigImgActive, setBigImgActive] = useState();
  const [loading, setLoading] = useState(false);
  const [isloadingComments, setIsLoadingComments] = useState(false);
  const [isLoadingAddComment, setIsLoadingAddComment] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const { userName, userId } = useUser();

  // ---------------- pobieranie zdjęć ----------------
  useEffect(() => {
    const loadImages = async () => {
      try {
        setLoading(true);
        const data = await fetchImages(userId);

        const convertedImages = data.map((image) => {
          if (image.image_data && image.imgType) {
            const imageData = `data:${image.imgType};base64,${Buffer.from(
              image.image_data.data
            ).toString("base64")}`;
            return { ...image, imageData };
          }
          return null;
        });

        setAllImages(convertedImages.filter(Boolean).reverse());
      } catch (error) {
        console.error("Błąd podczas wczytywania zdjęć:", error);
        setAllImages([]); // fallback
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, [userId, fetchImages]);

  // ---------------- komentarze ----------------
  const showMore = async (image) => {
    setBigImgActive(image);
    setIsLoadingComments(true);
    window.scrollTo({ top: 210, behavior: "smooth" });

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Comment/byId/${image._id}`
      );
      setComments(response.data);
    } catch (error) {
      console.error("Błąd podczas pobierania komentarzy:", error);
      setComments([]); // fallback
    } finally {
      setIsLoadingComments(false);
    }
  };

  const closeMore = () => {
    setBigImgActive(null);
    setCommentText("");
  };

  const deleteUserComment = async (commentIdToDelete) => {
    const confirmed = window.confirm("Czy na pewno chcesz usunąć ten komentarz ?");
    if (!confirmed) return;

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/deleteComment/${commentIdToDelete}`
      );
      setComments((prev) => prev.filter((c) => c._id !== commentIdToDelete));
    } catch (error) {
      console.error("Błąd podczas usuwania komentarza:", error);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    setIsLoadingAddComment(true);

    try {
      const currentDate = new Date();
      const formattedDate = `${String(currentDate.getDate()).padStart(
        2,
        "0"
      )}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(
        currentDate.getFullYear()
      ).slice(-2)}`;

      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/createComment`, {
        id_IMG: bigImgActive._id,
        id_User: userId,
        text: commentText,
        date: formattedDate,
      });

      showMore(bigImgActive); // odśwież komentarze
      setCommentText("");
    } catch (error) {
      console.error("Błąd podczas dodawania komentarza:", error);
    } finally {
      setIsLoadingAddComment(false);
    }
  };

  const deleteUserImage = async (imageId) => {
    const confirmed = window.confirm("Czy na pewno chcesz usunąć to zdjęcie?");
    if (!confirmed) return;
  
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/deleteImage/${imageId}`);
      
      // Usuń zdjęcie z galerii w stanie
      setAllImages((prevImages) => prevImages.filter((img) => img._id !== imageId));
  
      console.log("Zdjęcie usunięte pomyślnie");
    } catch (error) {
      console.error("Błąd podczas usuwania zdjęcia:", error);
    }
  };

  // ---------------- render ----------------
  return (
    <div className="relative">
      {/* Loader */}
      {loading ? (
        <svg
          aria-hidden="true"
          className=" lg:mx-[46%] mx-auto mt-[200px] w-32 h-32 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 transition-transform duration-300"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      ) : (
        <span></span>
      )}

      {/* Modal */}
      {bigImgActive && (
        <ImageModal
          bigImgActive={bigImgActive}
          closeMore={closeMore}
          comments={comments}
          isloadingComments={isloadingComments}
          isLoadingAddComment={isLoadingAddComment}
          commentText={commentText}
          setCommentText={setCommentText}
          handleSubmitComment={handleSubmitComment}
          deleteUserComment={deleteUserComment}
          userId={userId}
          userName={userName}
        />
      )}

      {/* Lista zdjęć */}
      <div className="flex flex-wrap justify-around lg:w-3/4 w-100 mx-auto mt-16 relative">
        {allImages.map((image, index) => (
          <ImageCard
            key={index}
            image={image}
            showMore={showMore}
            index={index}
            isUserImage={isUserGallery}
            deleteUserImage={deleteUserImage}
          />
        ))}
      </div>
    </div>
  );
}