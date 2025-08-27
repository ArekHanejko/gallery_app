import React from "react";
import Image from "next/image";


export default function ImageCard({ image, showMore, index, isUserImage, deleteUserImage }) {
  return (
    <div
      key={index}
      className="md:w-[350px] md:h-[400px] w-[100%] bg-black m-8 text-center grid rounded-2xl relative overflow-hidden shadow-2xl grid justify-items-center"
    >
      <img
        src={image.imageData}
        onClick={() => showMore(image)}
        className=" size-full justify-center rounded-t-2xl rounded-t-2xl transition-transform duration-300 transform hover:scale-110 hover:cursor-pointer"
        alt={`Obrazek ${index}`}
      />
      {isUserImage&&<Image src='/trash.png' width='64' height='64' alt='delete icon' className="  lg:block right-[0px] absolute mt-2 mr-2 hover:cursor-pointer transition-transform duration-300 transform hover:scale-125 z-99"  onClick={()=>deleteUserImage(image._id)}/>}
      <span className="text-myBg align-center absolute bottom-0 left-0 right-0 z-10 bg-black py-4 opacity-80 ">
        {image.title}
      </span>
    </div>
  );
}
