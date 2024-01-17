import React, { useState, useEffect } from "react";
import TarifasRecoleccionEntrega from "./TarifasRecoleccionEntrega";

const ServicioRecoleccionEntrega = ({ onVolverClick }) => {
  const [provinciaRecoleccion, setProvinciaRecoleccion] = useState("");
  const [cantonRecoleccion, setCantonRecoleccion] = useState("");
  const [distritoRecoleccion, setDistritoRecoleccion] = useState("");
  const [provinciasRecoleccion, setProvinciasRecoleccion] = useState([]);
  const [cantonesRecoleccion, setCantonesRecoleccion] = useState([]);
  const [distritosRecoleccion, setDistritosRecoleccion] = useState([]);
  const [dataRecoleccion, setDataRecoleccion] = useState({
    cantonesPorProvincia: {},
    distritosPorCanton: {},
  });

  const [provinciaEntrega, setProvinciaEntrega] = useState("");
  const [cantonEntrega, setCantonEntrega] = useState("");
  const [distritoEntrega, setDistritoEntrega] = useState("");
  const [provinciasEntrega, setProvinciasEntrega] = useState([]);
  const [cantonesEntrega, setCantonesEntrega] = useState([]);
  const [distritosEntrega, setDistritosEntrega] = useState([]);
  const [dataEntrega, setDataEntrega] = useState({
    cantonesPorProvincia: {},
    distritosPorCanton: {},
  });

  const [mostrarTarifa, setMostrarTarifa] = useState(false);

  useEffect(() => {
    const jsonFilePath = "src/assets/provincias-cantones-distritos.json";

    fetch(jsonFilePath)
      .then((response) => response.json())
      .then((jsonData) => {
        setDataRecoleccion(jsonData);
        setProvinciasRecoleccion(jsonData.provincias);
        setDataEntrega(jsonData);
        setProvinciasEntrega(jsonData.provincias);
      })
      .catch((error) => {
        console.error("Error al cargar el archivo JSON:", error);
      });
  }, []);

  const handleProvinciaRecoleccionChange = (selectedProvincia) => {
    setProvinciaRecoleccion(selectedProvincia);
    setCantonRecoleccion("");
    setDistritoRecoleccion("");
    if (selectedProvincia) {
      setCantonesRecoleccion(
        dataRecoleccion.cantonesPorProvincia[selectedProvincia]
      );
    } else {
      setCantonesRecoleccion([]);
    }
  };

  const handleCantonRecoleccionChange = (selectedCanton) => {
    setCantonRecoleccion(selectedCanton);
    setDistritoRecoleccion("");
    if (selectedCanton) {
      setDistritosRecoleccion(
        dataRecoleccion.distritosPorCanton[selectedCanton]
      );
    } else {
      setDistritosRecoleccion([]);
    }
  };

  const handleProvinciaEntregaChange = (selectedProvincia) => {
    setProvinciaEntrega(selectedProvincia);
    setCantonEntrega("");
    setDistritoEntrega("");
    if (selectedProvincia) {
      setCantonesEntrega(dataEntrega.cantonesPorProvincia[selectedProvincia]);
    } else {
      setCantonesEntrega([]);
    }
  };

  const handleCantonEntregaChange = (selectedCanton) => {
    setCantonEntrega(selectedCanton);
    setDistritoEntrega("");
    if (selectedCanton) {
      setDistritosEntrega(dataEntrega.distritosPorCanton[selectedCanton]);
    } else {
      setDistritosEntrega([]);
    }
  };

  const mostrarComponenteTarifa = () => {
    setMostrarTarifa(true);
  };

  const volverAComponenteAnterior = () => {
    setMostrarTarifa(false);
  };

  return (
    <>
      {!mostrarTarifa && (
        <div className="w-full flex flex-col justify-center items-center p-4">
          <div className="w-full max-w-screen-xl mx-auto">
            <div className="p-4 bg-white rounded-lg shadow-md">
              <div className="mb-4">
                <div className="text-black text-sm font-bold font-['Inter']">
                  Dirección de recolección
                </div>
                <select
                  className="w-full h-10 bg-red-500 bg-opacity-25 rounded-md"
                  onChange={(e) =>
                    handleProvinciaRecoleccionChange(e.target.value)
                  }
                  value={provinciaRecoleccion}
                >
                  <option value="">Seleccione una provincia</option>
                  {provinciasRecoleccion.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                <select
                  className="w-full mt-2 h-10 bg-red-500 bg-opacity-25 rounded-md"
                  onChange={(e) =>
                    handleCantonRecoleccionChange(e.target.value)
                  }
                  value={cantonRecoleccion}
                >
                  <option value="">Seleccione un cantón</option>
                  {cantonesRecoleccion.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <select
                  className="w-full mt-2 h-10 bg-red-500 bg-opacity-25 rounded-md"
                  onChange={(e) => setDistritoRecoleccion(e.target.value)}
                  value={distritoRecoleccion}
                >
                  <option value="">Seleccione un distrito</option>
                  {distritosRecoleccion.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <div className="text-black text-sm font-bold font-['Inter']">
                  Dirección de entrega
                </div>
                <select
                  className="w-full h-10 bg-red-500 bg-opacity-25 rounded-md"
                  onChange={(e) => handleProvinciaEntregaChange(e.target.value)}
                  value={provinciaEntrega}
                >
                  <option value="">Seleccione una provincia</option>
                  {provinciasEntrega.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                <select
                  className="w-full mt-2 h-10 bg-red-500 bg-opacity-25 rounded-md"
                  onChange={(e) => handleCantonEntregaChange(e.target.value)}
                  value={cantonEntrega}
                >
                  <option value="">Seleccione un cantón</option>
                  {cantonesEntrega.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <select
                  className="w-full mt-2 h-10 bg-red-500 bg-opacity-25 rounded-md"
                  onChange={(e) => setDistritoEntrega(e.target.value)}
                  value={distritoEntrega}
                >
                  <option value="">Seleccione un distrito</option>
                  {distritosEntrega.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-black text-xl font-bold font-['Inter']">
                Servicio de recolección y entrega
              </div>
              <div className="text-neutral-500 text-xs font-bold font-['Inter']">
                *Deberá indicar la ubicación de recolección de su paquete o
                paquetes y la dirección donde se realizará la entrega de los
                mismos.
              </div>
            </div>
          </div>
          <div className="w-full mt-4">
            <button
              className="w-full h-10 bg-red-500 rounded-md text-center text-white text-lg font-bold font-['Inter']"
              onClick={mostrarComponenteTarifa}
            >
              Listo
            </button>
            <button
              className="w-full mt-2 h-10 bg-zinc-500 rounded-md text-center text-white text-lg font-bold font-['Inter']"
              onClick={() => onVolverClick()}
            >
              Volver
            </button>
          </div>
        </div>
      )}
      {mostrarTarifa && (
        <TarifasRecoleccionEntrega onVolverClick={volverAComponenteAnterior} />
      )}
    </>
  );
};

export default ServicioRecoleccionEntrega;
