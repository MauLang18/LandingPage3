import React from "react";
import "./style.css";
import CustomCard from "../components/CustomCard";
import useFetchIdAndUpdateSignalR from "../hooks/useFetchIdAndUpdateSignalR";

const Mas = () => {
  const TUTORIAL = useFetchIdAndUpdateSignalR(10) || {};
  const REGISTRO = useFetchIdAndUpdateSignalR(14) || {};

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
    <div className="lg:h-[548px] w-full relative mx-auto">
      <img
        className="w-full h-[507px]"
        src="https://via.placeholder.com/1363x507"
      />
    </div>
  );
};

export default Mas;
