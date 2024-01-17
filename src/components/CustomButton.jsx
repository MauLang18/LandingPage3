import { useState } from "react";
import "./style.css";

const CustomButton = ({ label, onClick, className, img, img2 }) => {
  const [showImg, setShowImg] = useState(false);

  const [hovered, setHovered] = useState(false);

  const toggleImage = () => {
    setShowImg(!showImg);
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <button
      className={`${className} shadow-lg`}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ fontFamily: "'fuente', sans-serif" }}
    >
      {label}
      {img && (
        <img
          className={`${
            showImg
              ? ""
              : "hidden lg:block w-[76.33px] h-[76.33px] mx-auto my-3"
          }`}
          src={hovered ? img2 : img}
          alt="Imagen opcional"
        />
      )}
    </button>
  );
};

export default CustomButton;
