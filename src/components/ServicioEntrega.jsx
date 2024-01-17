import React, { useState, useEffect } from "react";
import TarifasEntrega from "./TarifasEntrega";

const ServicioEntrega = ({ onVolverClick }) => {
  const [provincia, setProvincia] = useState("");
  const [canton, setCanton] = useState("");
  const [distrito, setDistrito] = useState("");
  const [provincias, setProvincias] = useState([]);
  const [cantones, setCantones] = useState([]);
  const [distritos, setDistritos] = useState([]);
  const [data, setData] = useState({
    cantonesPorProvincia: {},
    distritosPorCanton: {},
  });

  const [mostrarTarifa, setMostrarTarifa] = useState(false);

  useEffect(() => {
    const jsonFilePath = "src/assets/provincias-cantones-distritos.json";

    fetch(jsonFilePath)
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
        setProvincias(jsonData.provincias);
      })
      .catch((error) => {
        console.error("Error al cargar el archivo JSON:", error);
      });
  }, []);

  const handleProvinciaChange = (selectedProvincia) => {
    setProvincia(selectedProvincia);
    setCanton("");
    setDistrito("");
    if (selectedProvincia) {
      setCantones(data.cantonesPorProvincia[selectedProvincia]);
    } else {
      setCantones([]);
    }
  };

  const handleCantonChange = (selectedCanton) => {
    setCanton(selectedCanton);
    setDistrito("");
    if (selectedCanton) {
      setDistritos(data.distritosPorCanton[selectedCanton]);
    } else {
      setDistritos([]);
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
                  Dirección de entrega
                </div>
                <select
                  className="w-full h-10 bg-red-500 bg-opacity-25 rounded-md"
                  onChange={(e) => handleProvinciaChange(e.target.value)}
                  value={provincia}
                >
                  <option value="">Seleccione una provincia</option>
                  {provincias.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                <select
                  className="w-full mt-2 h-10 bg-red-500 bg-opacity-25 rounded-md"
                  onChange={(e) => handleCantonChange(e.target.value)}
                  value={canton}
                >
                  <option value="">Seleccione un cantón</option>
                  {cantones.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <select
                  className="w-full mt-2 h-10 bg-red-500 bg-opacity-25 rounded-md"
                  onChange={(e) => setDistrito(e.target.value)}
                  value={distrito}
                >
                  <option value="">Seleccione un distrito</option>
                  {distritos.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <div className="text-black text-sm font-bold font-['Inter']">
                  Sucursal Tranqui Express
                </div>
                <select className="w-full h-10 bg-red-500 bg-opacity-25 rounded-md">
                  {/* Agrega opciones de sucursales aquí */}
                </select>
              </div>
              <div className="text-black text-xl font-bold font-['Inter']">
                Servicio de entrega
              </div>
              <div className="text-neutral-500 text-xs font-bold font-['Inter']">
                *Deberá indicar la sucursal en la que desea entregar su paquete
                o paquetes y la dirección donde se realizará la entrega de los
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
        <TarifasEntrega onVolverClick={volverAComponenteAnterior} />
      )}
    </>
  );
};

export default ServicioEntrega;
