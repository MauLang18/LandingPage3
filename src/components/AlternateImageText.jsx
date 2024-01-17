import React from "react";
import "./style.css";

const AlternateImageText = ({ imageSrc, title, content, imageFirst }) => {
  return (
    <div
      className={`flex flex-col lg:flex-row mb-10 ${
        imageFirst ? "" : "lg:flex-row-reverse"
      }`}
    >
      <div className="lg:w-[35%]">
        <img
          className="w-auto h-auto rounded-t-lg"
          src={imageSrc}
          alt="Tutorial Image"
        />
      </div>
      <div
        className={`${
          imageFirst ? "lg:w-[55%] p-4 md:ml-10" : "lg:w-[55%] p-4 md:mr-10"
        }`}
        style={{ fontFamily: "'fuente', sans-serif" }}
      >
        <h2
          className="text-black text-xl font-bold text-center mb-1"
          style={{ fontFamily: "'fuente', sans-serif" }}
        >
          {title}
        </h2>
        <p className="text-left text-black text-lg font-normal">{content}</p>
      </div>
    </div>
  );
};

export default AlternateImageText;
