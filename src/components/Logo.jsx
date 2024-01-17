import React from "react";

const Logo = ({ width, height, linkUrl }) => {
  return (
    <div className="w-full mx-auto">
      <img
        className={`${width} ${height}`}
        src="tranqui_logo_blanco.png"
        alt="Logo Tranqui Express"
      />
    </div>
  );
};

export default Logo;
