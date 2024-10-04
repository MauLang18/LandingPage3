import React, { useEffect, useState } from "react";

const Bitrix24Button = () => {
  const [buttonLoaded, setButtonLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.bitrix24.es/b26751413/crm/site_button/loader_1_394x0x.js?" + (Date.now() / 60000 | 0);
    script.async = true;

    script.onload = () => {
      setButtonLoaded(true);
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  if (!buttonLoaded) {
    return <div>Cargando botón...</div>;
  }

  return null; 
};

export default Bitrix24Button;
