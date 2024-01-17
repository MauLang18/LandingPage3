import React, { useState, useEffect } from "react";
import { RiCloseLine, RiMenu3Fill } from "react-icons/ri";
import "./style.css";
import useFetchIdAndUpdateSignalR from "../hooks/useFetchIdAndUpdateSignalR";

const NavBar = () => {
  const [navbarFixed, setNavbarFixed] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleAlert = (url) => {
    window.open(url, "_blank");
  };

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setNavbarFixed(true);
    } else {
      setNavbarFixed(false);
    }
  };

  const scrollToSection = (sectionId) => {
    const navbarHeight = 69;

    if (sectionId) {
      const section = document.getElementById(sectionId);
      const sectionPosition = section.offsetTop - navbarHeight;
      window.scrollTo({
        top: sectionPosition,
        behavior: "smooth",
      });
      setSelectedOption(sectionId);
      setShowMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const mobileMenuStyles = showMenu
    ? "top-0 xl:static flex-1 flex flex-col xl:flex-row items-center justify-center gap-10 transition-all duration-500 z-50"
    : "hidden";

  const ENVIO = useFetchIdAndUpdateSignalR(11) || {};
  const RASTREO = useFetchIdAndUpdateSignalR(12) || {};
  const LOGIN = useFetchIdAndUpdateSignalR(15) || {};

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
    <>
      <div
        className={`md:hidden flex flex-col items-center ${
          navbarFixed
            ? "fixed top-0 left-0 right-0 bg-red-500 shadow-md w-full transition-transform transform translate-y-0"
            : "relative bg-red-500 w-full"
        }`}
        style={{ zIndex: 1000 }}
      >
        <div className="flex items-center justify-between w-full p-4">
          {/* <button
            className="w-[50px] h-[50px] flex items-center justify-center text-center"
            onClick={() => handleAlert(extractValue(LOGIN))}
          >
            <img src="on-off.png" alt="Icono" className="w-6 h-6" />
          </button> */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="text-2xl p-2"
          >
            {showMenu ? (
              <RiCloseLine className="text-white" />
            ) : (
              <RiMenu3Fill className="text-white" />
            )}
          </button>
        </div>
        {showMenu && (
          <nav
            className={`bg-red-500 text-white ${mobileMenuStyles} flex-1 mb-10`}
          >
            <a
              href="#nosotros"
              onClick={() => scrollToSection("nosotros")}
              className={`${selectedOption === "nosotros" ? "underline" : ""}`}
              style={{ fontFamily: "'fuente', sans-serif" }}
            >
              Nosotros
            </a>
            <a
              href="#productos"
              onClick={() => scrollToSection("productos")}
              className={`${selectedOption === "productos" ? "underline" : ""}`}
              style={{ fontFamily: "'fuente', sans-serif" }}
            >
              Productos
            </a>
            <a
              href="#contacto"
              onClick={() => scrollToSection("contacto")}
              className={`${selectedOption === "contacto" ? "underline" : ""}`}
              style={{ fontFamily: "'fuente', sans-serif" }}
            >
              Contáctenos
            </a>
            <a
              href="#"
              className={`${selectedOption === "puntos" ? "underline" : ""}`}
              style={{ fontFamily: "'fuente', sans-serif" }}
            >
              Puntos autorizados
            </a>
          </nav>
        )}
      </div>

      <nav
        className={`hidden md:flex justify-center ${
          navbarFixed
            ? "fixed top-0 left-0 right-0 bg-red-500 shadow-md w-full transition-transform transform translate-y-0"
            : "relative bg-red-500 w-full"
        }`}
        style={{ zIndex: 999 }}
      >
        <div className="w-[1300px] h-[69px] flex items-center justify-start gap-8 ml-[60px]">
          <a
            href="#nosotros"
            className={`${
              selectedOption === "nosotros" ? "underline" : ""
            } text-white text-lg font-medium transition-colors hover:underline`}
            style={{ fontFamily: "'fuente', sans-serif" }}
            onClick={() => scrollToSection("nosotros")}
          >
            Nosotros
          </a>
          <a
            href="#productos"
            className={`${
              selectedOption === "productos" ? "underline" : ""
            } text-white text-lg font-medium transition-colors hover:underline`}
            style={{ fontFamily: "'fuente', sans-serif" }}
            onClick={() => scrollToSection("productos")}
          >
            Productos
          </a>
          <a
            href="#contacto"
            className={`${
              selectedOption === "contacto" ? "underline" : ""
            } text-white text-lg font-medium transition-colors hover:underline`}
            style={{ fontFamily: "'fuente', sans-serif" }}
            onClick={() => scrollToSection("contacto")}
          >
            Contáctenos
          </a>
          <a
            href="#"
            className={`${
              selectedOption === "puntos" ? "underline" : ""
            } text-white text-lg font-medium transition-colors hover:underline`}
            style={{ fontFamily: "'fuente', sans-serif" }}
          >
            Puntos autorizados
          </a>
        </div>
        {/* <div
          className="w-[350px] h-[54px] flex items-center justify-center text-center text-white text-lg font-medium my-auto lg:mr-[-20px] mr-[0px]"
          style={{ fontFamily: "'fuente', sans-serif" }}
        >
          <button className="" onClick={() => handleAlert(extractValue(LOGIN))}>
            Registrarse / Iniciar sesión
          </button>
        </div>
        <div className="xl:flex xl:items-center xl:justify-center lg:mr-[70px] my-auto">
          <button
            className="w-[50px] h-[50px] flex items-center justify-center text-center"
            onClick={() => handleAlert(extractValue(LOGIN))}
          >
            <img src="on-off.png" alt="Icono" className="w-6 h-6" />
          </button>
        </div> */}
      </nav>
    </>
  );
};

export default NavBar;
