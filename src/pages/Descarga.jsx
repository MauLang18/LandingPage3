import DownloadApp from "../components/DownloadApp";

const Descarga = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <div className="text-orange-400 text-2xl font-bold font-inter mb-3">
        Descargá nuestra app
      </div>
      <DownloadApp width="591px" height="319.92px" />
    </div>
  );
};

export default Descarga;
