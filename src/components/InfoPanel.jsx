import React from "react";

const InfoPanel = ({ title, content, backgroundColor, textColor }) => {
  const panelStyle = {
    backgroundColor: backgroundColor || "transparent",
    color: textColor || "black",
  };

  return (
    <div className="w-full md:w-[359px] h-[352px] relative">
      <div
        className="w-full md:w-[359px] h-[352px] left-0 top-0 absolute"
        style={panelStyle}
      />
      <div
        className="w-full md:w-0 md:left-[134px] top-[12px] absolute text-center text-[28px]"
        style={panelStyle}
      >
        {title}
      </div>
      <div
        className="w-full md:w-[333px] h-[257px] md:left-[13px] top-[54px] absolute text-justify md:text-[19px] text-[17px]"
        style={panelStyle}
      >
        {content}
      </div>
    </div>
  );
};

export default InfoPanel;
