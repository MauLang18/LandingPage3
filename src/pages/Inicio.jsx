import React, { useState, useEffect } from "react";
import * as signalR from "@microsoft/signalr";
import { Carousel } from "react-responsive-carousel";
import Tracking from "../components/Tracking";
import Accesos from "../components/Accesos";
import { useModal } from "../hooks/useModal";
import Modal2 from "../components/Modal2";
import ProgramarRecoleccionForm from "../components/ProgramarRecoleccionForm";
import Tarifas1 from "../components/Tarifas1";
import { useFetch } from "../hooks/useFetch";

const Inicio = () => {
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const [isOpenModal1, openModal1, closeModal1] = useModal(false);
  const isMobile = window.innerWidth <= 768;

  const { data, loading, error, setData } = useFetch(
    `https://apiadmin.tranquiexpress.com:8443/BannerPrincipal`
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

    connection1.on("BannerRegistrado", (banner) => {
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

    connection1.on("BannerActualizado", (banner) => {
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

    connection2.on("BannerActualizado2", (banner) => {
      console.log(banner);
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

    connection1.on("BannerEliminado", (id) => {
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
    <section id="home" className="relative">
      <Carousel
        showArrows={true}
        showStatus={false}
        showThumbs={false}
        showIndicators={false}
        className={`h-${isMobile ? "96" : "500"} lg:w-auto`}
        autoPlay={true}
        interval={3000}
        infiniteLoop={true}
        emulateTouch={true}
        dynamicHeight={false}
      >
        {signalRData &&
          signalRData.data &&
          signalRData.data.items &&
          signalRData.data.items
            .filter((item) => item.estado === 1)
            .map((item) => (
              <div key={item.id}>
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  className="h-[430px]"
                />
              </div>
            ))}
      </Carousel>
    </section>
  );
};

export default Inicio;
