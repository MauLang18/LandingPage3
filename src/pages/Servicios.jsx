import "./style.css";
import React, { useState, useEffect } from "react";
import * as signalR from "@microsoft/signalr";
import AlternateImageText from "../components/AlternateImageText";
import { useFetch } from "../hooks/useFetch";

const Servicios = () => {
  const { data, loading, error, setData } = useFetch(
    `https://apiadmin.tranquiexpress.com:8443/ServicioBeneficio`
  );

  const [signalRData, setSignalRData] = useState(null);

  useEffect(() => {
    if (data) {
      setSignalRData(data);
    }
  }, [data]);

  useEffect(() => {
    const connection1 = new signalR.HubConnectionBuilder()
      .withUrl("https://apiadmin.tranquiexpress.com:8443/hub1", {
        withCredentials: true,
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();

    const connection2 = new signalR.HubConnectionBuilder()
      .withUrl("https://apiadmin.tranquiexpress.com:8443/hub2", {
        withCredentials: true,
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();

    /*const connection = new signalR.HubConnectionBuilder()
        .withUrl("https://apiadmin.tranquiexpress.com/hub", {
          withCredentials: true,
        })
        .build();*/

    connection1.on("ServicioBeneficioRegistrado", (banner) => {
      setSignalRData((prevData) => {
        if (!prevData || !prevData.data || !prevData.data.items) {
          return { data: { items: [banner] } };
        }

        const updatedItems = [...prevData.data.items, banner];

        const updatedData = {
          ...prevData,
          data: {
            ...prevData.data,
            items: updatedItems,
          },
        };

        return updatedData;
      });
    });

    connection1.on("ServicioBeneficioActualizado", (banner) => {
      setSignalRData((prevData) => {
        if (!prevData || !prevData.data) {
          return { data: { items: [] } };
        }

        const updatedItems = prevData.data.items.map((item) =>
          item.id === banner.id ? banner : item
        );

        const updatedData = {
          ...prevData,
          data: {
            ...prevData.data,
            items: updatedItems,
          },
        };

        return updatedData;
      });
    });

    connection2.on("ServicioBeneficioActualizado2", (banner) => {
      setSignalRData((prevData) => {
        if (!prevData || !prevData.data) {
          return { data: { items: [] } };
        }

        const updatedItems = prevData.data.items.map((item) =>
          item.id === banner.id ? banner : item
        );

        const updatedData = {
          ...prevData,
          data: {
            ...prevData.data,
            items: updatedItems,
          },
        };

        return updatedData;
      });
    });

    connection1.on("ServicioBeneficioEliminado", (id) => {
      setSignalRData((prevData) => {
        if (!prevData || !prevData.data) {
          return { data: { items: [] } };
        }

        const filteredItems = prevData.data.items.filter(
          (item) => item.id !== id
        );

        const updatedData = {
          ...prevData,
          data: {
            items: filteredItems,
          },
        };

        return updatedData;
      });
    });

    const startConnections = async () => {
      try {
        await connection1.start();
        console.log("Conexión 1 establecida con éxito");
      } catch (error) {
        console.error("Error al iniciar la conexión 1:", error);
      }

      try {
        await connection2.start();
        console.log("Conexión 2 establecida con éxito");
      } catch (error) {
        console.error("Error al iniciar la conexión 2:", error);
      }
    };

    startConnections();

    return () => {
      connection1.stop();
      connection2.stop();
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
                .filter((item) => item.estado === 1)
                .map((item, index) => (
                  <AlternateImageText
                    key={item.id}
                    imageSrc={item.imagen}
                    title={item.titulo}
                    content={item.descripcion}
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
