import React, { useEffect } from "react";

const Bitrix24Form = () => {
  const [formLoaded, setFormLoaded] = React.useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://cdn.bitrix24.es/b26751413/crm/form/loader_1.js";
    script.onload = () => {
      setFormLoaded(true);
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  if (!formLoaded) {
    return <div>Cargando formulario...</div>;
  }

  return (
    <script data-b24-form="inline/1/lm1olq" data-skip-moving="true"></script>
  );
};

export default Bitrix24Form;
