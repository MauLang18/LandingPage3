import { Route, Routes } from "react-router-dom";
import Home from "./screen/home";
import Envio from "./screen/Envio";
import AdministrarCuenta from "./screen/AdministrarCuenta";
import Rastreo from "./screen/Rastreo";
import RealizarEnvio from "./screen/RealizarEnvio";
import Login from "./screen/Login";
import Registro from "./screen/Registro";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/envio" element={<Envio />} />
        <Route path="/administrarCuenta" element={<AdministrarCuenta />} />
        <Route path="/rastreo" element={<Rastreo />} />
        <Route path="/realizarEnvio" element={<RealizarEnvio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </>
  );
}

export default App;
