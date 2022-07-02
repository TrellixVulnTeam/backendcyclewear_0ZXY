import React, { Fragment, useEffect, useState } from 'react';
import Breadcrumb from "../../common/breadcrumb";
import MaterialTable from "material-table";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import CancelIcon from '@material-ui/icons/Cancel';
import EditAttributesIcon from '@material-ui/icons/EditAttributes';
import {
    Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row, Button, Modal, ModalFooter,
    ModalHeader, ModalBody
} from "reactstrap";
import EditIcon from '@material-ui/icons/Edit';
import imagen1 from "../../../assets/images/imagenes/bicicleta.jpg";
import imagen2 from "../../../assets/images/imagenes/bolsa.jpg";
import imagen3 from "../../../assets/images/imagenes/camisetas.jpg";
import imagen4 from "../../../assets/images/imagenes/camisetas1.jpg";
import imagen5 from "../../../assets/images/imagenes/caramañola.jpg";
import imagen6 from "../../../assets/images/imagenes/caramañola1.jpg";
import imagen7 from "../../../assets/images/imagenes/caramañola2.jpg";
import imagen8 from "../../../assets/images/imagenes/casco1.jpg";
import imagen9 from "../../../assets/images/imagenes/sillin.jpg";
import imagen10 from "../../../assets/images/imagenes/sillin1.jpg";
import imagen11 from "../../../assets/images/imagenes/sillin3.jpg";
import imagen12 from "../../../assets/images/imagenes/zapatillas.jpg";
import imagen13 from "../../../assets/images/imagenes/zapatillas1.jpg";
import imagen14 from "../../../assets/images/imagenes/zapatillas2.jpg";
import imagen15 from "../../../assets/images/imagenes/zapatillas3.jpg";
import imagen16 from "../../../assets/images/imagenes/casco.jpg";

function ListarProductos(props) {
    const { useState } = React;

    const [columns, setColumns] = useState([
        { title: 'Name', field: 'name' },
        { title: 'Surname', field: 'surname', initialEditValue: 'initial edit value' },
        { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
        {
            title: 'Birth Place',
            field: 'birthCity',
            lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
        },
    ]);

    const [data, setData] = useState([
        { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
        { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
    ]);

    return (
        <Fragment>
            <Breadcrumb title="Listar Productos" parent="Physical" />
            <div id="basicScenario" className="product-physical">
                <MaterialTable
                    title="Editable Preview"
                    columns={columns}
                    data={data}
                    editable={{
                        
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    const dataUpdate = [...data];
                                    const index = oldData.tableData.id;
                                    dataUpdate[index] = newData;
                                    setData([...dataUpdate]);

                                    resolve();
                                }, 1000)
                            }),
                       
                    }}
                />
            </div>
        </Fragment>
    );
}

export default ListarProductos;