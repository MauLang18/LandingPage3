import React from "react";

const TarifasRecoleccionEntrega = ({ onVolverClick }) => {
  return (
    <div className="max-w-screen-xl mx-auto bg-white p-4 md:p-6 lg:p-8 rounded-lg shadow-lg">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-inter my-4 md:my-6 lg:my-8">
        Proyección servicio de recolección y entrega
      </h1>
      <div className="mt-2 md:mt-4">
        <span className="text-sm md:text-base font-bold font-inter text-neutral-500">
          Estas tarifas son una aproximación. Los precios pueden variar.
        </span>
      </div>
      <table className="w-full border border-red-500 mt-2 md:mt-4">
        <thead>
          <tr className="bg-red-500 text-white text-center">
            <th className="py-2 md:py-4 px-2 md:px-4">Descripción</th>
            <th className="py-2 md:py-4 px-2 md:px-4">Tarifa</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white text-center">
            <td className="py-2 md:py-4 px-2 md:px-4 font-inter">
              Primeros 2Kg
            </td>
            <td className="py-2 md:py-4 px-2 md:px-4 font-inter">
              ₡-------------
            </td>
          </tr>
          <tr className="bg-white text-center">
            <td className="py-2 md:py-4 px-2 md:px-4 font-inter">
              Kg adicional
            </td>
            <td className="py-2 md:py-4 px-2 md:px-4 font-inter">
              ₡------ (por kg adicional)
            </td>
          </tr>
        </tbody>
      </table>
      <span className="text-xs md:text-sm font-bold font-inter text-neutral-500">
        *El precio del IVA no está incluido.
      </span>
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-inter my-4 md:my-6 lg:my-8">
        Rutas programadas para recolección
      </h1>
      <div className="mb-2 md:mb-4">
        <span className="text-neutral-500 text-sm md:text-base font-bold font-inter">
          Contamos con las siguientes rutas y horarios según la zona
          seleccionada. También puede programar la recolección y entrega en un
          horario personalizado, por un costo adicional de
        </span>
        <span className="text-neutral-500 text-sm md:text-base font-normal font-inter">
          {" "}
          ₡-------------
        </span>
      </div>
      <table className="w-full border border-red-500">
        <thead>
          <tr className="bg-red-500 text-white text-center">
            <th className="py-2 md:py-4 px-2 md:px-4">Provincia</th>
            <th className="py-2 md:py-4 px-2 md:px-4">Horario</th>
            <th className="py-2 md:py-4 px-2 md:px-4">Horas</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white text-center">
            <td className="py-2 md:py-4 px-2 md:px-4 font-inter">San José</td>
            <td className="py-2 md:py-4 px-2 md:px-4 font-inter">
              Lunes, Miércoles y Jueves
            </td>
            <td className="py-2 md:py-4 px-2 md:px-4 font-inter">
              10a.m a 7p.m
            </td>
          </tr>
        </tbody>
      </table>
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-inter my-4 md:my-6 lg:my-8">
        Rutas programadas para entrega
      </h1>
      <table className="w-full border border-red-500">
        <thead>
          <tr className="bg-red-500 text-white text-center">
            <th className="py-2 md:py-4 px-2 md:px-4">Provincia</th>
            <th className="py-2 md:py-4 px-2 md:px-4">Horario</th>
            <th className="py-2 md:py-4 px-2 md:px-4">Horas</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white text-center">
            <td className="py-2 md:py-4 px-2 md:px-4 font-inter">San José</td>
            <td className="py-2 md:py-4 px-2 md:px-4 font-inter">
              Lunes, Miércoles y Jueves
            </td>
            <td className="py-2 md:py-4 px-2 md:px-4 font-inter">
              10a.m a 7p.m
            </td>
          </tr>
        </tbody>
      </table>
      <div className="w-full mt-4">
        <button className="w-full h-10 bg-red-500 rounded-md text-center text-white text-lg font-bold font-['Inter']">
          Listo
        </button>
        <button
          className="w-full mt-2 h-10 bg-zinc-500 rounded-md text-center text-white text-lg font-bold font-['Inter']"
          onClick={() => onVolverClick()}
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default TarifasRecoleccionEntrega;
