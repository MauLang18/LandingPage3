import "./style.css";
import { useState, useEffect } from "react";
import * as signalR from "@microsoft/signalr";
import AlternateImageText from "../components/AlternateImageText";
import { useFetch } from "../hooks/useFetch";

const Servicios = () => {
  const { data } = useFetch(
    `https://apiadmin.tranquiexpress.com:8443/ServicioBeneficio?empresa=3`
  );

  const [signalRData, setSignalRData] = useState(null);

  useEffect(() => {
    if (data) {
      setSignalRData(data);
    }
  }, [data]);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://apiadmin.tranquiexpress.com:8443/hub", {
        withCredentials: true,
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();

      connection.on("PublishCore", (servicioBeneficio) => {
        // Convierte la cadena JSON en un objeto
        const item = JSON.parse(servicioBeneficio);
      
        const isEmpresaIdValid = item && item.EmpresaId === 3;
        const isDirigidoValid =
          item &&
            (item.Dirigido === "servicioBeneficioRegistrado" ||
            item.Dirigido === "servicioBeneficioActualizado" ||
            item.Dirigido === "servicioBeneficioEliminado");
      
        if (isEmpresaIdValid && isDirigidoValid) {
          setSignalRData((prevData) => {
            if (!prevData || !prevData.data || !prevData.data.items) {
              return { data: { items: [item] } };
            }
      
            if (item.Dirigido === "servicioBeneficioRegistrado") {
              const updatedItems = [...prevData.data.items, item];
              const updatedData = {
                ...prevData,
                data: {
                  ...prevData.data,
                  items: updatedItems,
                },
              };
              return updatedData;
            } else if (item.Dirigido === "servicioBeneficioActualizado") {
              const updatedItems = prevData.data.items.map((prevItem) =>
                prevItem.id === item.Id ? item : prevItem
              );
              const updatedData = {
                ...prevData,
                data: {
                  ...prevData.data,
                  items: updatedItems,
                },
              };
              return updatedData;
            } else if (item.Dirigido === "servicioBeneficioEliminado") {
              const filteredItems = prevData.data.items.filter(
                (prevItem) => prevItem.id !== item.Id
              );
              const updatedData = {
                ...prevData,
                data: {
                  items: filteredItems,
                },
              };
              return updatedData;
            }
          });
        }
      });            

    const startConnections = async () => {
      try {
        if (connection.state !== signalR.HubConnectionState.Connected) {
          await connection.start();
          console.log("Conexión establecida con éxito");
        }
      } catch (error) {
        console.error("Error al iniciar la conexión:", error);
      }
    };

    startConnections();

    return () => {
      connection.stop();
    };
  }, []);

  return (
    <section id="productos" className="mt-20">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 mx-auto">
        <div className="max-w-7xl mx-auto">
          <h1
            className="text-center text-3xl font-extrabold text-black-400 mt-10"
            style={{ fontFamily: "'fuente', sans-serif" }}
          >
            Productos
          </h1>
          <div className="mt-10 grid grid-cols-1 gap-10">
            {signalRData &&
              signalRData.data &&
              signalRData.data.items &&
              signalRData.data.items
                .filter((item) => (item.estado === 1 && item.empresaId === 3) || (item.Estado === 1 && item.EmpresaId === 3))
                .map((item, index) => (
                  <AlternateImageText
                    key={item.id || item.Id}
                    imageSrc={item.imagen || item.Imagen}
                    title={item.titulo || item.Titulo}
                    content={item.descripcion || item.Descripcion}
                    imageFirst={index % 2 === 0}
                  />
                ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Servicios;
