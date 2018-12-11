import React, { useEffect } from "react";
import { Dialog } from "@reach/dialog";
import { Button } from "../styles";
import "@reach/dialog/styles.css";

const Modal = ({ open, hideModal, showModal, handleDelete }) => {
  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  });

  const onKeyDown = ({ key }) => {
    if (key === "Escape") {
      open && hideModal();
    }
  };

  return (
    <>
      <span onClick={showModal}>Delete</span>

      <Dialog isOpen={open}>
        <h2>Are you sure you want to delete this?</h2>
        <div>
          <Button delete onClick={handleDelete} style={{ margin: "0 20px" }}>
            Delete
          </Button>
          <Button onClick={hideModal} style={{ margin: "0 20px" }}>
            No
          </Button>
        </div>
      </Dialog>
    </>
  );
};

export default Modal;
