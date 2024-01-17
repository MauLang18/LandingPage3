import React from "react";
import { RiInstagramLine, RiYoutubeLine } from "react-icons/ri";
import { AiFillLinkedin, AiOutlineFacebook } from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";
import useFetchIdAndUpdateSignalR from "../hooks/useFetchIdAndUpdateSignalR";

const SocialLinks = ({ textColor, textSize }) => {
  const INSTAGRAM = useFetchIdAndUpdateSignalR(5) || {};
  const FACEBOOK = useFetchIdAndUpdateSignalR(6) || {};
  const YOUTUBE = useFetchIdAndUpdateSignalR(7) || {};
  const LINKEDIN = useFetchIdAndUpdateSignalR(8) || {};
  const TIKTOK = useFetchIdAndUpdateSignalR(9) || {};

  const extractValue = (data) => {
    if (data && data.data && data.data.valor) {
      return data.data.valor;
    } else if (data && data.valor) {
      return data.valor;
    } else {
      return "";
    }
  };

  return (
    <div className="w-full text-center justify-center items-center mx-auto">
      <p
        className={`text-${textColor} text-${textSize} font-medium mb-2`}
        style={{ fontFamily: "'fuente', sans-serif" }}
      >
        Seguinos en redes
      </p>
      <nav
        className={`flex items-center justify-center md:justify-center md:mr-10 gap-2 md:gap-4 text-${textColor} md:ml-[52px]`}
      >
        <a
          href={extractValue(INSTAGRAM)}
          target="_blank"
          className={`block p-1 text-${textSize}`}
        >
          <RiInstagramLine />
        </a>
        <a
          href={extractValue(FACEBOOK)}
          target="_blank"
          className={`block p-1 text-${textSize}`}
        >
          <AiOutlineFacebook />
        </a>
        <a
          href={extractValue(YOUTUBE)}
          target="_blank"
          className={`block p-1 text-${textSize}`}
        >
          <RiYoutubeLine />
        </a>
        <a
          href={extractValue(LINKEDIN)}
          target="_blank"
          className={`block p-1 text-${textSize}`}
        >
          <AiFillLinkedin />
        </a>
        <a
          href={extractValue(TIKTOK)}
          target="_blank"
          className={`block p-1 text-${textSize}`}
        >
          <FaTiktok />
        </a>
      </nav>
    </div>
  );
};

export default SocialLinks;
