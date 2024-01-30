import { useState, useEffect } from "react";
import * as signalR from "@microsoft/signalr";
import { Carousel } from "react-responsive-carousel";
import { useFetch } from "../hooks/useFetch";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Inicio = () => {
  const isMobile = window.innerWidth <= 768;

  const { data } = useFetch(
    `https://apiadmin.tranquiexpress.com:8443/BannerPrincipal?empresa=3`
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

      connection.on("PublishCore", (banner) => {
        // Convierte la cadena JSON en un objeto
        const item = JSON.parse(banner);
      
        const isEmpresaIdValid = item.EmpresaId === 3;
        const isDirigidoValid =
            (item.Dirigido === "bannerRegistrado" ||
            item.Dirigido === "bannerActualizado" ||
            item.Dirigido === "bannerEliminado");
      
        if (isEmpresaIdValid && isDirigidoValid) {
          setSignalRData((prevData) => {
            if (!prevData || !prevData.data || !prevData.data.items) {
              return { data: { items: [item] } };
            }
      
            if (item.Dirigido === "bannerRegistrado") {
              const updatedItems = [...prevData.data.items, item];
              const updatedData = {
                ...prevData,
                data: {
                  ...prevData.data,
                  items: updatedItems,
                },
              };
              return updatedData;
            } else if (item.Dirigido === "bannerActualizado") {
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
            } else if (item.Dirigido === "bannerEliminado") {
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
            .filter((item) => item.estado === 1 && item.empresaId === 3)
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
