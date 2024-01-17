import React, { useState } from "react";
import ServicioEntrega from "./ServicioEntrega";
import ServicioRecoleccionEntrega from "./ServicioRecoleccionEntrega ";

const Tarifas1 = () => {
  const [mostrarRecoleccionEntrega, setMostrarRecoleccionEntrega] =
    useState(false);
  const [mostrarEntrega, setMostrarEntrega] = useState(false);

  const mostrarComponenteRecoleccionEntrega = () => {
    setMostrarRecoleccionEntrega(true);
    setMostrarEntrega(false);
  };

  const mostrarComponenteEntrega = () => {
    setMostrarRecoleccionEntrega(false);
    setMostrarEntrega(true);
  };

  const volverAComponenteAnterior = () => {
    setMostrarRecoleccionEntrega(false);
    setMostrarEntrega(false);
  };

  return (
    <div className="w-full p-4 flex flex-col items-center">
      {!mostrarRecoleccionEntrega && !mostrarEntrega && (
        <div className="w-full text-center p-4">
          <div className="text-black text-lg font-bold font-['Inter']">
            ¿Necesita servicio de recolección y entrega de sus paquetes?
          </div>
          <div className="w-full mt-4">
            <button
              onClick={mostrarComponenteRecoleccionEntrega}
              className="w-full h-12 bg-red-500 rounded-md text-center text-white text-lg font-bold font-['Inter']"
            >
              Sí, quiero ambos servicios.
            </button>
            <button
              onClick={mostrarComponenteEntrega}
              className="w-full mt-2 h-12 bg-zinc-500 rounded-md text-center text-white text-lg font-bold font-['Inter']"
            >
              Solo requiero entrega.
            </button>
          </div>
          <div className="mt-4 text-justify text-zinc-400 text-sm font-bold font-['Inter']">
            *Si solo utilizará el servicio de entrega deberá llevar su paquete o
            paquetes a una de nuestras sucursales.
          </div>
        </div>
      )}
      {mostrarRecoleccionEntrega && (
        <ServicioRecoleccionEntrega onVolverClick={volverAComponenteAnterior} />
      )}
      {mostrarEntrega && (
        <ServicioEntrega onVolverClick={volverAComponenteAnterior} />
      )}
    </div>
  );
};

export default Tarifas1;
