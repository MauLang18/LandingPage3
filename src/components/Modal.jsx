import "./Modal.css";

const Modal = ({ children, isOpen, closeModal }) => {
  const handleModalContainerClick = (e) => e.stopPropagation();

  return (
    <article className={`modal ${isOpen && "is-open"}`} onClick={closeModal}>
      <div className="modal-container" onClick={handleModalContainerClick}>
        {children}
        <button className="modal-close text-black" onClick={closeModal}>
          X
        </button>
      </div>
    </article>
  );
};

export default Modal;
