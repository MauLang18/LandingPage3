import Header from "../pages/header";
import Inicio from "../pages/Inicio";
import Nosotros from "../pages/Nosotros";
import Servicios from "../pages/Servicios";
import Mas from "../pages/Mas";
import ContactUs from "../pages/ContactUs";
import WhatsAppButton from "../components/WhatsappButton";
import Footer from "../pages/Footer";

function Home() {
  return (
    <>
      <Header />
      <Inicio />
      {/* <Boletin /> */}
      <Nosotros />
      <Servicios />
      <Mas />
      <ContactUs />
      {/* <Descarga /> */}
      <WhatsAppButton />
      <Footer />
    </>
  );
}

export default Home;
