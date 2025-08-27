import React from "react";
import Image from "next/image";
import CommentsSection from "./CommentsSection";

export default function ImageModal({
  bigImgActive,
  closeMore,
  comments,
  isloadingComments,
  isLoadingAddComment,
  commentText,
  setCommentText,
  handleSubmitComment,
  deleteUserComment,
  userId,
  userName,
}) {
  return (
    <div className="absolute lg:fixed left-0  right-0 mx-auto top-0 lg:top-[50px] flex w-[100%] lg:w-[80%] flex-col lg:flex-row bg-white shadow-xl rounded-2xl z-50 pt-12 lg:pt-0 ">
      
      <div
        onClick={() => closeMore()}
        className="fixed top-0 left-0 h-[100vh] w-full bg-black opacity-80 hover:cursor-pointer"
      ></div>

      <div className="w-full content-left z-50 bg-white lg:rounded-l-2xl">
        <div>
        
          <p className="text-center text-[24px] text-myCol font-bold pb-8 pt-6">
            {bigImgActive.title}
          </p>
        </div>
        <div className="relative h-[full] flex justify-center">
          <Image
            src={bigImgActive.imageData}
            height={200}
            width={784}
            alt={"Image"}
            className="h-[100%] object-contain max-h-[600px]  z-50 "
          />
        </div>
        <hr className="h-2 mt-10 mx-6" />
        <p className="text-myCol text-s py-6 pb-8 text-left lg:ml-32 ml-2 z-50">
          <strong>Opis</strong>: {bigImgActive.description}
        </p>
      </div>

      <CommentsSection
        comments={comments}
        isloadingComments={isloadingComments}
        isLoadingAddComment={isLoadingAddComment}
        commentText={commentText}
        setCommentText={setCommentText}
        handleSubmitComment={handleSubmitComment}
        deleteUserComment={deleteUserComment}
        userId={userId}
        userName={userName}
        closeMore={closeMore}
      />
    </div>
  );
}
