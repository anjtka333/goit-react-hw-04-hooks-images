import { createPortal } from "react-dom";
import { Component } from "react";
import s from "./Modal.module.css";
import PropsType from "prop-types";

const modalRoot = document.querySelector("#modal-root");

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };
  handleBackDropClick = (e) => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={s.Overlay} onClick={this.handleBackDropClick}>
        <div className={s.Modal}>
          <img src={this.props.modalUrl} alt={this.props.modalTitle} />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propsType = {
  onClose: PropsType.func,
};

export default Modal;
