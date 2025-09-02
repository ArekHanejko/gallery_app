import React from "react";
import Image from "next/image";

export default function CommentsSection({
  comments,
  isloadingComments,
  isLoadingAddComment,
  commentText,
  setCommentText,
  handleSubmitComment,
  deleteUserComment,
  userId,
  userName,
  closeMore,
}) {
  return (
    <div className="lg:w-1/2 w-1/1  z-50 bg-white rounded-b-2xl lg:rounded-r-2xl lg:rounded-l-none relative ">
      <div>
        <p className="text-center  text-myCol text-[24px] pt-6">Komentarze</p>
        <br />
        <hr className="h-0.5 bg-myCol mr-6" />
        <div className="overflow-auto max-h-[300px] lg:max-h-[500px] ">
          {isloadingComments && (
            <svg
              aria-hidden="true"
              className="ml-[50%] mt-8 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
          )}
          {comments == "" && !isloadingComments ? (
            <p className="text-center pt-8 text-[#595959]">
              Bądź pierwszym komentującym !
            </p>
          ) : (
            <span className="hidden"></span>
          )}
          {!isloadingComments &&
            comments
              .toReversed()
              .map((comment, index) => (
                <div
                  key={index}
                  className="relative text-myCol px-4 text-xs pt-6 text-center z-50"
                >
                  <p className="text-myCol font-bold text-left pb-">
                    {comment.id_User}
                  </p>
                  <p className="text-left">{comment.text}</p>
                  <p className="text-left">{comment.date}</p>
                  {userName == comment.id_User ? (
                    <span
                      onClick={() => deleteUserComment(comment._id)}
                      className="absolute top-[50%] right-[24px] font-bold text-[24px] hover:cursor-pointer"
                    >
                      x
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
              ))}
        </div>
      </div>

      {userId ? (
        <div className="h-[200px]">
          <div className="w-[100%] z-50 mb-auto h-auto lg:absolute lg:bottom-0 ">
            <p className=" text-[18px] text-myCol px-4 pt-8 z-50">
              Dodaj komentarz
            </p>

            <form
              onSubmit={handleSubmitComment}
              className="w-[100%] lg:w-[100%] px-4 z-50"
            >
              <div className=" z-50">
                <textarea
                  id="description"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className=" z-50 resize-none px-2 w-[100%] h-[102px] text-[18px] lg:w-[100%] border border-[#858585] rounded bg-formInputBgCol"
                  required
                />
                <div className="flex">
                  <button
                    type="submit"
                    className=" z-50 bg-myCol p-2 rounded-md text-myBg shadow-lg px-8 my-4"
                  >
                    Dodaj
                  </button>
                  {isLoadingAddComment && (
                    <svg
                      aria-hidden="true"
                      className="ml-2 mt-5 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <p className=" text-center text-myCol py-12">
          Aby móc dodać komentarz{" "}
          <a href="/login" className="font-bold">
            Zaloguj się
          </a>{" "}
          lub{" "}
          <a href="/register" className="font-bold ">
            Zarejestruj
          </a>
        </p>
      )}
    </div>
  );
}
