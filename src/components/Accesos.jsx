import React, { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import CustomButton from "./CustomButton";
import useFetchIdAndUpdateSignalR from "../hooks/useFetchIdAndUpdateSignalR";

const Accesos = ({ clases, modal, modal1 }) => {
  const handleAlert = (url) => {
    window.open(url, "_blank");
  };

  const ENVIO = useFetchIdAndUpdateSignalR(11) || {};
  const CUENTA = useFetchIdAndUpdateSignalR(13) || {};

  const extractValue = (data) => {
    if (data && data.data && data.data.valor) {
      return data.data.valor;
    } else if (data && data.Valor) {
      return data.Valor;
    } else {
      return "";
    }
  };

  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 mt-[-250px] lg:w-[850px] w-full ${clases}`}
      style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
    >
      <CustomButton
        label={"Tarifa y Rutas"}
        className={
          "bg-white text-center text-neutral-700 text-xl font-bold w-full relative group transition-transform transform hover:text-white hover:scale-105 border-t border-neutral-300 hover:shadow-2xl hover:bg-red-500 h-[174px] mt-4 lg:w-[210px]"
        }
        onClick={modal1}
        img={"tarifas.png"}
        img2={"tarifas-blanco.png"}
      />
      <CustomButton
        label={"Programar recolección"}
        className={
          "bg-white text-center text-neutral-700 text-xl font-bold w-full relative group transition-transform transform hover:text-white hover:scale-105 border-t border-neutral-300 hover:shadow-2xl hover:bg-red-500 h-[174px] mt-4 lg:w-[210px]"
        }
        onClick={modal}
        img={"programar.png"}
        img2={"programar-blanco.png"}
      />
      <CustomButton
        label={"Realizar envío"}
        className={
          "bg-white text-center text-neutral-700 text-xl font-bold w-full relative group transition-transform transform hover:text-white hover:scale-105 border-t border-neutral-300 hover:bg-red-500 h-[174px] mt-4 lg:w-[210px]"
        }
        onClick={() => handleAlert(extractValue(ENVIO))}
        img={"envio.png"}
        img2={"envio-blanco.png"}
      />
      <CustomButton
        label={"Administrar cuenta"}
        className={
          "bg-white text-center text-neutral-700 text-xl font-bold w-full relative group transition-transform transform hover:text-white hover:scale-105 border-t border-neutral-300 hover:bg-red-500 h-[174px] mt-4 lg:w-[210px]"
        }
        onClick={() => handleAlert(extractValue(CUENTA))}
        img={"administrar.png"}
        img2={"administrar-blanco.png"}
      />
    </div>
  );
};

export default Accesos;
