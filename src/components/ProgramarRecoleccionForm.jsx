import { useForm } from "../hooks/useForm";

const initialForm = {
  name: "",
  lastname: "",
  phone: "",
  email: "",
  fechaRecoleccion: "",
  horaRecoleccion: "",
  lugarRecoleccion: "",
  fechaEntrega: "",
  desde: "",
  hasta: "",
  paquetes: "",
  desc: "",
  fragil: "",
  quimico: "",
  message: "",
};

const validateForm = (form) => {
  let errores = {};

  if (!form.name.trim()) {
    errores.name = "El campo 'Nombre' es requerido";
  }
  if (!form.lastname.trim()) {
    errores.lastname = "El campo 'Apellido' es requerido";
  }
  if (!form.phone.trim()) {
    errores.phone = "El campo 'Teléfono' es requerido";
  }
  if (!form.email.trim()) {
    errores.email = "El campo 'Correo' es requerido";
  }
  if (!form.phone.trim()) {
    errores.phone = "El campo 'Teléfono' es requerido";
  }
  if (!form.fechaRecoleccion.trim()) {
    errores.phone = "El campo 'Fecha de recolección' es requerido";
  }
  if (!form.horaRecoleccion.trim()) {
    errores.phone = "El campo 'Hora de recolección' es requerido";
  }

  return errores;
};

const ProgramarRecoleccionForm = ({ closeModal }) => {
  const {
    form,
    errores,
    loading,
    response,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm(initialForm, validateForm, () => closeModal());

  return (
    <form className="shake" onSubmit={handleSubmit}>
      <div className="flex lg:flex-row items-center w-auto h-[121px] bg-white">
        <img
          src="logo_tranqui.png"
          alt="Logo"
          className="md:w-[275px] md:h-[275px] w-[200px] h-[200px] mr-[-30px] ml-[-25px] md:ml-0 md:mr-[500px] mb-4 md:mb-0 flex-shrink-0"
        />
      </div>
      <label className="block text-gray-700 text-md font-bold mb-4 mt-10">
        Información de usuario
      </label>
      <div className="flex flex-wrap -mx-2 mb-4">
        <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Nombre
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            name="name"
            placeholder="Ingrese su nombre"
            onBlur={handleBlur}
            onChange={handleChange}
            value={form.name}
            required
          />
          {errores.name && (
            <p className="font-bold text-red-500">{errores.name}</p>
          )}
        </div>
        <div className="w-full md:w-1/2 px-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="lastname"
          >
            Apellido
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="lastname"
            type="text"
            name="lastname"
            placeholder="Ingrese su apellido"
            onBlur={handleBlur}
            onChange={handleChange}
            value={form.lastname}
            required
          />
        </div>
      </div>
      <div className="form-group mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="phone"
        >
          Teléfono
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="phone"
          type="tel"
          name="phone"
          placeholder="Ingrese su teléfono"
          onBlur={handleBlur}
          onChange={handleChange}
          value={form.phone}
          required
        />
      </div>
      <div className="form-group mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Correo
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          name="email"
          placeholder="Ingrese su correo"
          onBlur={handleBlur}
          onChange={handleChange}
          value={form.email}
          required
        />
      </div>
      <label className="block text-gray-700 text-md font-bold mb-4">
        Información de recolección
      </label>
      <div className="flex flex-wrap -mx-2 mb-4">
        <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="fechaRecoleccion"
          >
            Fecha de recolección
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="fechaRecoleccion"
            type="date"
            name="fechaRecoleccion"
            onBlur={handleBlur}
            onChange={handleChange}
            value={form.fechaRecoleccion}
            required
          />
        </div>
        <div className="w-full md:w-1/2 px-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="horaRecoleccion"
          >
            Hora de recolección
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="horaRecoleccion"
            type="time"
            name="horaRecoleccion"
            onBlur={handleBlur}
            onChange={handleChange}
            value={form.horaRecoleccion}
            required
          />
        </div>
      </div>
      <div className="form-group mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="lugarRecoleccion"
        >
          Lugar de recolección
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="lugarRecoleccion"
          type="text"
          name="lugarRecoleccion"
          placeholder="Ingrese el lugar de recolección"
          onBlur={handleBlur}
          onChange={handleChange}
          value={form.lugarRecoleccion}
          required
        />
      </div>
      <div className="flex flex-wrap -mx-2 mb-4">
        <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="fechaEntrega"
          >
            Fecha de entrega
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="fechaEntrega"
            type="date"
            name="fechaEntrega"
            onBlur={handleBlur}
            onChange={handleChange}
            value={form.fechaEntrega}
            required
          />
        </div>
        <div className="flex flex-auto">
          <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="desde"
            >
              Horario de entrega
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="desde"
              type="time"
              name="desde"
              onBlur={handleBlur}
              onChange={handleChange}
              value={form.desde}
              required
            />
          </div>
          <div className="w-full md:w-1/2 px-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="hasta"
            >
              Horario de entrega
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="hasta"
              type="time"
              name="hasta"
              onBlur={handleBlur}
              onChange={handleChange}
              value={form.hasta}
              required
            />
          </div>
        </div>
      </div>
      <label className="block text-gray-700 text-md font-bold mb-4">
        Información de paquetes
      </label>
      <div className="form-group mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="paquetes"
        >
          Cantidad de paquetes
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="paquetes"
          type="number"
          name="paquetes"
          placeholder="Ingrese la cantidad de paquetes"
          onBlur={handleBlur}
          onChange={handleChange}
          value={form.paquetes}
          required
        />
      </div>
      <div className="form-group mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="desc"
        >
          Descripción de productos
        </label>
        <textarea
          className="border py-2 px-3 form-textarea mt-1 block w-full rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          id="desc"
          name="desc"
          rows="3"
          placeholder="Escriba la descripción de los productos"
          onBlur={handleBlur}
          onChange={handleChange}
          value={form.desc}
          required
        ></textarea>
      </div>
      <div className="flex flex-wrap -mx-2 mb-4">
        <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="fragil"
          >
            ¿Es producto frágil?
          </label>
          <select
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="fragil"
            name="fragil"
            value={form.fragil}
            onBlur={handleBlur}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una opción</option>
            <option value="Si">Sí</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="w-full md:w-1/2 px-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="quimico"
          >
            ¿Es producto químico?
          </label>
          <select
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="quimico"
            name="quimico"
            value={form.quimico}
            onBlur={handleBlur}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una opción</option>
            <option value="Si">Sí</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>
      <div className="form-group mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="message"
        >
          Observaciones
        </label>
        <textarea
          className="border py-2 px-3 form-textarea mt-1 block w-full rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          id="message"
          name="message"
          rows="3"
          placeholder="Escriba las observaciones"
          onBlur={handleBlur}
          onChange={handleChange}
          value={form.message}
        ></textarea>
      </div>
      <div className="form-submit mt-5">
        <button
          type="submit"
          className="bg-red-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Enviar
        </button>
        <button
          type="button" // Cambiamos el tipo de botón a "button"
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded ml-2 focus:outline-none focus:shadow-outline"
          onClick={closeModal}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default ProgramarRecoleccionForm;
