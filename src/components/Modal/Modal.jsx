import { createPortal } from "react-dom";
import { useEffect } from "react";
import s from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

const Modal = ({ onClose, modalUrl, modalTitle }) => {
  console.log(modalTitle);

  const handleKeyDown = (e) => {
    if (e.code === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      return window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleBackDropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={s.Overlay} onClick={handleBackDropClick}>
      <div className={s.Modal}>
        <img src={modalUrl} alt={modalTitle} />
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
