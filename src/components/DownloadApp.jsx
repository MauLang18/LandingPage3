import React from "react";

const DownloadApp = ({ width, height }) => {
  return (
    <div
      className={`w-${width} h-${height} relative flex flex-col items-center justify-center mb-[-150px] p-4 sm:p-8 lg:p-12`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col items-center mb-4">
          <div className="w-[230px] h-[130px] relative">
            <a href="https://play.google.com/store/games?device=windows&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1">
              <img
                alt="Disponible en Google Play"
                src="https://play.google.com/intl/en_us/badges/static/images/badges/es-419_badge_web_generic.png"
              />
            </a>
          </div>
          <div className="w-[230px] h-[130px] relative">
            <img
              className="w-[117px] h-[117px] shadow mt-2 mx-auto"
              src="https://via.placeholder.com/118x118"
              alt="Image 2"
            />
          </div>
        </div>
        <div className="flex flex-col items-center mb-4">
          <div className="w-[230px] h-[130px] relative">
            <a href="https://play.google.com/store/games?device=windows&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1">
              <img
                alt="Disponible en Google Play"
                src="https://play.google.com/intl/en_us/badges/static/images/badges/es-419_badge_web_generic.png"
              />
            </a>
          </div>
          <div className="w-[230px] h-[130px] relative">
            <img
              className="w-[117px] h-[117px] shadow mt-2 mx-auto"
              src="https://via.placeholder.com/118x118"
              alt="Image 2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadApp;
