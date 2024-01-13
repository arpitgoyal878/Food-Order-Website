import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
//REMEMBER THAT YOU CAN CLOSE THE DIDALOG WITH ESCAPE KEY AND NO LONGER OPEN IT
function Modal({ children, open, onClose, className = "" }) {
  const dialog = useRef();

  useEffect(() => {
    //it is recoomened to use save the value of dialog.current because it may change later theoritically it will not occur in this case but saving the value is a good practice
    const modal = dialog.current;
    if (open) {
      modal.showModal();
    }
    return () => modal.close();
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}

export default Modal;
