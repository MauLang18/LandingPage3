import { useState, useEffect } from "react";
import * as signalR from "@microsoft/signalr";

const useFetchIdAndUpdateSignalR = (id) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Función para detener la conexión
    const stopConnection = async (connection) => {
      try {
        if (connection.state === signalR.HubConnectionState.Connected) {
          await connection.stop();
          console.log("Conexión detenida con éxito");
        }
      } catch (error) {
        console.error("Error al detener la conexión:", error);
      }
    };

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

    // Inicializar la conexión en el montaje del componente
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://apiadmin.tranquiexpress.com:8443/hub", {
        withCredentials: true,
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();

    const startConnection = async () => {
      try {
        await connection.start();
        console.log("Conexión establecida con éxito");
      } catch (error) {
        console.error("Error al iniciar la conexión:", error);
      }
    };

    // Manejar eventos de SignalR
    connection.on("PublishCore", (updatedData) => {
      // Muestra la propiedad 'Dirigido' del objeto
      const item = JSON.parse(updatedData);

      const isEmpresaIdValid = item.EmpresaId === 3;
      const isDirigidoValid = item.Dirigido === "parametroActualizado";
      const isIdValid = item.Id === id;
    
      if (isEmpresaIdValid && isDirigidoValid && isIdValid) {
        setData(item);
      }
    });

    // Iniciar la conexión y fetch de datos cuando cambia el id
    startConnection();
    fetchData();

    // Cleanup: Detener la conexión cuando el componente se desmonta o el id cambia
    return () => {
      stopConnection(connection);
    };
  }, [id]);

  return data;
};

export default useFetchIdAndUpdateSignalR;
