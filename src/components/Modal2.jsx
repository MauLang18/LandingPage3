import "./Modal.css";

const Modal2 = ({ children, isOpen, closeModal }) => {
  const handleModalContainerClick = (e) => e.stopPropagation();

  return (
    <article className={`modal ${isOpen && "is-open"}`}>
      <div className="modal-container" onClick={handleModalContainerClick}>
        {children}
        <button className="modal-close text-black" onClick={closeModal}>
          X
        </button>
      </div>
    </article>
  );
};

export default Modal2;
