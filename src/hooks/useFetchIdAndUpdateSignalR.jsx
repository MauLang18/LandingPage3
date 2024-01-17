import { useState, useEffect } from "react";
import * as signalR from "@microsoft/signalr";

const useFetchIdAndUpdateSignalR = (id) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://apiadmin.tranquiexpress.com:8443/Parametro/${id}`
        );
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://apiadmin.tranquiexpress.com:8443/hub1", {
        withCredentials: true,
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();

    connection
      .start()
      .then(() => {
        console.log("Conexión establecida con éxito");
      })
      .catch((error) => {
        console.error("Error al iniciar la conexión:", error);
      });

    connection.on("ParametroActualizado", (updatedData) => {
      if (updatedData.id === id) {
        setData(updatedData);
      }
    });

    return () => {
      connection.stop();
    };
  }, [id]);

  return data;
};

export default useFetchIdAndUpdateSignalR;
