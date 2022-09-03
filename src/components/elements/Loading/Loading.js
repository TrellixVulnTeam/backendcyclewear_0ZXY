import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from "reactstrap";
import "./loading.css";

function Loading(props) {
    return (
        <div className="divPadre" >
            <div style={{ width: "6rem", height: "6rem" }}
  className="w-20 d-flex text-[#DC2626] justify-content-center align-items-center">
                <br />
                <Spinner size='xl' color="primary" className="tamaño" />
            </div>
        </div>
    );
}

export default Loading;