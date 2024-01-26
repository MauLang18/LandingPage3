import "./style.css";
import SectionData from "../components/SectionData";
import useFetchIdAndUpdateSignalR from "../hooks/useFetchIdAndUpdateSignalR";

const Nosotros = () => {
  const MISION = useFetchIdAndUpdateSignalR(28) || {};
  const VISION = useFetchIdAndUpdateSignalR(29) || {};
  const VALORES = useFetchIdAndUpdateSignalR(30) || {};

  const extractValue = (data) => {
    if (data && data.data && data.data.valor) {
      return data.data.valor;
    } else if (data && data.valor) {
      return data.valor;
    } else {
      return "";
    }
  };

  const imageData = {
    imageSrc: "nosotros.png",
  };

  const sectionData = {
    titles: ["Misión", "Visión", "Valores"],
    contents: [
      extractValue(MISION),
      extractValue(VISION),
      extractValue(VALORES),
    ],
  };
  return (
    <section id="nosotros" className="xl:mt-20 mt-[-450px]">
      <div className="white p-8 flex flex-col items-center justify-center gap-8 mt-[500px] xl:mt-0">
        <SectionData {...imageData} {...sectionData} imageFirst={false} />
      </div>
    </section>
  );
};

export default Nosotros;
