import React from "react";

const Copyright = ({ year, textColor, textSize, marginTop }) => {
  const currentYear = new Date().getFullYear();

  return (
    <div className={`mt-${marginTop} mx-auto`}>
      <p
        className={`text-${textColor} text-center text-${textSize}`}
        style={{ fontFamily: "'fuente', sans-serif" }}
      >
        © MotorNova {year || currentYear} - All Rights Reserved
      </p>
    </div>
  );
};

export default Copyright;
