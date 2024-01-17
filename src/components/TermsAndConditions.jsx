import React, { useState } from "react";
import { useModal } from "../hooks/useModal";
import Modal from "./Modal";

const TermsAndConditions = ({ textColor, textSize, terms, title, isModal }) => {
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const [selectedTerm, setSelectedTerm] = useState(null);

  const handleTermClick = (term) => {
    if (term.id) {
      const element = document.getElementById(term.id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (term.url) {
      window.open(term.url, "_blank");
    } else {
      setSelectedTerm(term);
      if (isModal) {
        openModal();
      }
    }
  };

  const renderTermContent = (term) => {
    return { __html: term.text }; // Esta línea permite renderizar HTML de manera segura.
  };

  return (
    <div className={`mt-2 md:mt-0 text-center mx-auto`}>
      <p
        className={`text-${textColor} text-${textSize} font-bold mb-2 md:text-left`}
        style={{ fontFamily: "'fuente', sans-serif" }}
      >
        {title}
      </p>
      <ul className={`text-${textColor} md:text-left`}>
        {terms.map((term, index) => (
          <li key={index}>
            <button onClick={() => handleTermClick(term)}>{term.label}</button>
          </li>
        ))}
      </ul>
      {selectedTerm && isModal && (
        <Modal isOpen={isOpenModal} closeModal={closeModal}>
          <h3 className="text-black">
            <b>{selectedTerm.label}</b>
          </h3>
          <div dangerouslySetInnerHTML={renderTermContent(selectedTerm)} />
        </Modal>
      )}
    </div>
  );
};

export default TermsAndConditions;
