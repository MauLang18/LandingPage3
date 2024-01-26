import { useState, useEffect } from "react";
import * as signalR from "@microsoft/signalr";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./style.css";
import Modal from "../components/Modal";
import { useModal } from "../hooks/useModal";
import CustomCard from "../components/CustomCard2";
import { useFetch } from "../hooks/useFetch";

const Boletin = () => {
  const [isOpenModal1, openModal1, closeModal1] = useModal(false);

  const { data, loading, error } = useFetch(
    `https://apiadmin.tranquiexpress.com:8443/Boletin`
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

    connection.on("BoletinRegistrado", (banner) => {
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

    connection.on("BoletinActualizado", (banner) => {
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

    connection.on("BoletinEliminado", (id) => {
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

  const handleOpenModal = () => {
    if (
      signalRData &&
      signalRData.data.items.some((item) => item.estado === 1 && item.empresaId === 3)
    ) {
      openModal1();
    }
  };

  return (
    <section id="boletin">
      <div className="w-full relative mx-auto mt-28">
        <div
          className="text-center text-orange-400 text-3xl font-bold relative top-0 left-1/2 transform -translate-x-1/2"
          style={{ fontFamily: "'fuente', sans-serif" }}
        >
          Boletín Informativo
        </div>
        <CustomCard
          img={false}
          buttonText={"Leer más"}
          buttonLink={handleOpenModal}
          title={`Nuestro boletín informativo contiene información importante <br/> sobre eventos que podrían afectar nuestro servicio regular.`}
        />
      </div>{" "}
      <Modal isOpen={isOpenModal1} closeModal={closeModal1}>
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        {data &&
          data.data &&
          signalRData &&
          signalRData.data &&
          signalRData.data.items && (
            <ul>
              {signalRData &&
                signalRData.data &&
                signalRData.data.items &&
                signalRData.data.items
                  .filter((item) => item.estado === 1 && item.empresaId === 3)
                  .slice(0, 1)
                  .map((item) => (
                    <li key={item.id}>
                      <img src={item.imagen} alt={item.nombre} />
                    </li>
                  ))}
            </ul>
          )}
      </Modal>
    </section>
  );
};

export default Boletin;
