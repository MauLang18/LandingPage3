import { useState, useEffect } from "react";
import * as signalR from "@microsoft/signalr";
import { Carousel } from "react-responsive-carousel";
import { useFetch } from "../hooks/useFetch";

const Inicio = () => {
  const isMobile = window.innerWidth <= 768;

  const { data } = useFetch(
    `https://apiadmin.tranquiexpress.com:8443/BannerPrincipal`
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

    connection.on("BannerRegistrado", (banner) => {
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

    connection.on("BannerActualizado", (banner) => {
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

    connection.on("BannerEliminado", (id) => {
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
        await connection.start();
        console.log("Conexión establecida con éxito");
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
