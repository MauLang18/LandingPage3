import React from "react";
import "./style.css";

const Head = () => {
  return (
    <div className="flex lg:flex-row items-center w-auto h-[121px] bg-white">
      <img
        src="logo_tranqui.png"
        alt="Logo"
        className="md:w-[275px] md:h-[275px] w-[200px] h-[200px] mr-[-30px] ml-[-25px] md:ml-0 md:mr-[500px] mb-4 md:mb-0 flex-shrink-0"
      />
      <div
        className="text-stone-800 ml-[-220px] text-[22px] md:text-lg lg:text-[28px] lg:ml-0 font-black italic text-right flex-shrink-0"
        style={{ fontFamily: "'fuente', sans-serif" }}
      >
        <p className="md:hidden text-lg ml-[250px]">
          Somos
          <br />
          Mayoristas
        </p>
        <p className="hidden md:block">Somos Mayoristas</p>
      </div>
    </div>
  );
};

export default Head;
