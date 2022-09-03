import React, { useState, useEffect, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InfoIcon from "@material-ui/icons/Info";
import "./mensajes.css";

function ModalMensajes(props) {
  const { shown, close, titulo, mensaje, tipo } = props;
  const [toggle, setToogle] = useState(true);

  return shown ? (
    <div className="divmodal">
      <Modal.Dialog
      className="modal-mensajes-login"
      >
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Modal body text goes here.</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary">Close</Button>
        <Button variant="primary">Save changes</Button>
      </Modal.Footer>
    </Modal.Dialog>
    </div>
  ) : null;
}

export default ModalMensajes;
