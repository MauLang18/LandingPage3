import React from "react";

const Logo = ({ width, height, linkUrl }) => {
  return (
    <div className="w-full mx-auto">
      <img
        className={`${width} ${height}`}
        src="motornova_logo_blanco.png"
        alt="Logo MotorNova"
      />
    </div>
  );
};

export default Logo;
