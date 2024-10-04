import React, { useState, useEffect } from "react";
import "./style.css";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "../hooks/useForm2";
import { useModal } from "../hooks/useModal";
import Modal from "../components/Modal";
import useFetchIdAndUpdateSignalR from "../hooks/useFetchIdAndUpdateSignalR";

const initialForm = {
  name: "",
  lastname: "",
  phone: "",
  email: "",
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
  if (!form.message.trim()) {
    errores.message = "El campo 'Mensaje' es requerido";
  }

  return errores;
};

const ContactForm = () => {
  const {
    form,
    errores,
    loading,
    response,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm(initialForm, validateForm);

  const getErrorForField = (fieldName) => {
    return errores[fieldName] ? (
      <p className="font-bold text-red-500">{errores[fieldName]}</p>
    ) : null;
  };

  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [isOpenModal, openModal, closeModal] = useModal(false);

  const renderTermContent = (term) => {
    return { __html: term };
  };

  const CORREO_ELECTRONICO = useFetchIdAndUpdateSignalR(19) || {};
  const NUMERO_TELEFONO = useFetchIdAndUpdateSignalR(20) || {};
  const NUMERO_WHATSAPP = useFetchIdAndUpdateSignalR(21) || {};

  const extractValue = (data) => {
    if (data && data.data && data.data.valor) {
      return data.data.valor;
    } else if (data && data.Valor) {
      return data.Valor;
    } else {
      return "";
    }
  };

  const handleRecaptchaChange = (token) => {
    setRecaptchaTokens(token);
  };

  return (
    <div className="container mx-auto p-8" id="contacto">
      <div id="titulo">
        <div className="col-md-12 wow animated fadeInLeft" data-wow-delay=".2s">
          <h1
            className="text-center text-black-400 text-3xl font-bold mt-4 mb-20"
            style={{ fontFamily: "'fuente', sans-serif" }}
          >
            <b>Contáctenos</b>
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
        <div className="mr-3">
          <div id="textoC" className="text-left lg:text-lg">
            <p>Para nosotros es un place atenderte.</p>
          </div>
          <div id="textoC" className="mt-10 text-left lg:text-xl">
            <ul>
              <li className="mb-1">
                <b className="lg:text-xl">Correo electrónico</b>
                <p className="lg:text-lg">{extractValue(CORREO_ELECTRONICO)}</p>
              </li>
              <li className="mb-2">
                <b className="lg:text-xl">Número de teléfono</b>
                <p className="lg:text-lg">{extractValue(NUMERO_TELEFONO)}</p>
              </li>
              <li>
                <b className="lg:text-xl">WhatsApp</b>
                <p className="lg:text-lg">{extractValue(NUMERO_WHATSAPP)}</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="wow animated fadeInRight" data-wow-delay=".2s">
          <form className="shake" onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-2 mb-4">
              <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Nombre <span className="text-red-500">*</span>
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Ingrese su nombre"
                  value={form.name}
                  required
                />
                {getErrorForField("name")}
              </div>
              <div className="w-full md:w-1/2 px-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="lastname"
                >
                  Apellido <span className="text-red-500">*</span>
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="lastname"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="lastname"
                  placeholder="Ingrese su apellido"
                  value={form.lastname}
                  required
                />
                {getErrorForField("lastname")}
              </div>
              <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="phone"
                >
                  Teléfono <span className="text-red-500">*</span>
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="phone"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="phone"
                  placeholder="Ingrese su teléfono"
                  value={form.phone}
                  required
                />
                {getErrorForField("phone")}
              </div>
              <div className="w-full md:w-1/2 px-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Correo electrónico <span className="text-red-500">*</span>
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="email"
                  placeholder="Ingrese su correo electrónico"
                  value={form.email}
                  required
                />
                {getErrorForField("email")}
              </div>
              <div className="w-full px-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="message"
                >
                  Mensaje <span className="text-red-500">*</span>
                </label>
                <textarea
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="message"
                  name="message"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Ingrese su mensaje"
                  value={form.message}
                  required
                ></textarea>
                {getErrorForField("message")}
              </div>
            </div>
            <div className="flex mt-8">
              <ReCAPTCHA
                sitekey="6LfZg0oqAAAAAMbUbspcCIyyYCfnG9l2DxklapTK"
                onChange={handleRecaptchaChange}
              />
            </div>
            <button
              type="submit"
              className="bg-red-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>

      <Modal isOpen={isOpenModal} closeModal={closeModal}>
        <h3 className="text-black text-center">
          <b>Preguntas Frecuentes</b>
        </h3>
        <div
          dangerouslySetInnerHTML={renderTermContent(
            "<div style='text-align: left;'><b>Garantía</b><br>1. ¿Qué hago si me llega el producto dañado durante el transporte?<br>R/<br>2. ¿Qué garantía me ofrecen en caso de extraviar mi paquete?<br>R/ Contamos con un seguro que cubre el 100% de su paquete en caso de extravío.<br><br><b>Pagos</b><br>1. ¿Es seguro realizar el pago por este medio?<br>R/ Nuestra plataforma es una pasarela de pago segura que garantice los máximos estándares de seguridad.<br>2. ¿Dónde puedo ver mi factura?<br>R/ A su correo personal llegarán las facturas que se emitan por cada compra que realice.<br>3. ¿Qué tipos de métodos de pagos tienen?<br>R/ Tarjeta de crédito, débito, Transferencia bancaria o Sinpe.<br>4. ¿Emiten factura electrónica?<br>R/ Sí.<br><br><b>Precios</b><br>5. ¿Cuánto cuesta el envío?<br>R/ Esto dependerá de las dimensiones y distancia en donde se recogerá o dejará el paquete. Para más información puede visitar Tarifas y Rutas.<br><br><b>Envíos</b><br>1. ¿Cubren envíos en todo Costa Rica?<br>R/ Sí.<br>2. ¿Cómo puedo cancelar un servicio?<br>R/<br>3. ¿Cuánto tarda el envío?<br>R/<br><br><b>Horarios</b><br>4. ¿Cuál es el horario de atención?<br>R/ De lunes a viernes de 7:30 a 6:00pm y sábados de 7:30 am a 4:00pm.<br><br><b>Servicio al Cliente</b><br>1. ¿Cómo pongo una queja?<br>R/ Puede escribir al correo info@tranquiexpress.com.<br>2. ¿Cómo puedo contactar a un ejecutivo de servicio al cliente?<br>R/ Llamando al 4080-6999.<br></div>"
          )}
        />
      </Modal>
    </div>
  );
};

export default ContactForm;
