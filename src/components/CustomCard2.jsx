import React from "react";

const CustomCard = ({ imageSrc, buttonText, buttonLink, title, img }) => {
  const formattedTitle = {
    __html: title,
  };

  return (
    <div className="w-auto p-4">
      <div className="bg-white rounded-lg shadow-lg">
        <img
          className={`${img ? "w-auto h-auto rounded-t-lg" : "hidden"}`}
          src={imageSrc}
          alt="Tutorial Image"
        />
        <div className="p-4 w-auto">
          <div
            className="text-black text-2xl font-bold text-center mb-2"
            style={{ fontFamily: "'fuente', sans-serif" }}
            dangerouslySetInnerHTML={formattedTitle}
          ></div>
          <div className="text-center">
            <button
              onClick={buttonLink}
              className="text-white text-2xl font-bold py-2 px-4 bg-red-500 rounded-lg"
              style={{ fontFamily: "'fuente', sans-serif" }}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomCard;
