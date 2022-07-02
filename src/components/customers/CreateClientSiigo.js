import React, { Fragment, useEffect, useState } from 'react';
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Breadcrumb from "../common/breadcrumb";
import MaterialTable from "material-table";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import CancelIcon from '@material-ui/icons/Cancel';
import EditAttributesIcon from '@material-ui/icons/EditAttributes';
import Moment from "moment";
import swal from "sweetalert";
import {
    Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row, Button, Modal, ModalFooter,
    ModalHeader, ModalBody
} from "reactstrap";
//import Loading from "../../../components/elements/Loading";
import EditIcon from '@material-ui/icons/Edit';
import imagen1 from "../../assets/images/imagenes/bicicleta.jpg";
import Loading from '../elements/Loading/Loading';

/*import imagen2 from "../../../assets/images/imagenes/bolsa.jpg";
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
import { CommentSharp } from '@material-ui/icons';*/

function CreateClientSiigo(props) {
    const [lisPedidos, setListPedidos] = useState([]);
    const [listaTercerosCreados, setListaTercerosCreados] = useState([]);
    const [fechaFacturas, setFechaFacturas] = useState("");
    const [tipoTercero, setTipoTercero] = useState("");
    const [loading, setLoading] = useState(false);
    const fechaactual = Moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const [datosClientesFacturas, setDatosClientesFacturas] = useState([]);
    const [datos, setDatos] = useState([]);
    const [datosCrear, setDatosCrear] = useState(false);
    const dispatch = useDispatch();

    const crearClientes = () => {
        const newDet = [];
        const leeTercerosSiigo = async () => {
            setLoading(true);
            console.log("FECHA : ", fechaFacturas)

            const params = {
                fecha: fechaFacturas
            }

            await axios({
                method: 'get',
                url: 'https://sitbusiness.co/cyclewear/api/100', params
            }).then(res => {
                console.log("RETORNA : ", res.data);
                if (res) {
                    setListaTercerosCreados(res.data.results);
                }
                setLoading(false);
            }
            ).catch(function (error) {
                console.log("ERROR LEYENDO FACTURAS");
            })
        }
        leeTercerosSiigo();
    }

    const handleChangeFecha = async (selectedOptions) => {
        const newDet = [];
        //console.log("FECHA : ", selectedOptions)
        setFechaFacturas(selectedOptions)

        let contador = 0;
        lisPedidos && lisPedidos.map((facturas, index) => {
            let item = {
                id: facturas.id
            };
            newDet.push(item);
        })
        setDatos(newDet)
        //console.log("PEDIDOS : ", newDet)
    }

    return (
        <div>
            {loading ? <Loading /> : null}
            <br />
            <div className='mb-30 ml-60'>
                <Row>
                    <Col xl={4} lg={4} md={4} xs={4} className='mt-10'>
                        <h4>
                            Fecha Leer Terceros Siigo:
                        </h4>

                    </Col>
                    <Col xl={3} lg={3} md={3} xs={3}>
                        <div className="form-horizontal auth-form">
                            <div>
                                <input
                                    name="fecha"
                                    type="date"
                                    className="form-control"
                                    placeholder="Ingrese fecha"
                                    id="exampleInputEmail12"
                                    onChange={(e) =>
                                        handleChangeFecha(
                                            e.target
                                                .value
                                        )}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col xl={3} lg={3} md={3} xs={3}>
                        <button className='botoncrearcliente' color="primary" onClick={crearClientes}>
                            Leer Clientes
                        </button>
                    </Col>
                </Row>
            </div>

            <hr />
            <Row>
                <Col xl={3} lg={3} md={3} xs={3}>
                </Col>
                <Col xl={3} lg={3} md={3} xs={3}>
                    <button className='botoncrearcliente' color="primary" >
                        <ReactHTMLTableToExcel
                            table="terceros"
                            filename="DatosClientesSiigo"
                            sheet="Sheet"
                            buttonText="Exportar a Excel"
                        />
                    </button>
                </Col>
            </Row>
            <hr />
            {

                <table id="terceros" className="table">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>tipotercero</th>
                            <th>tipopersona</th>
                            <th>tipoidentificacion</th>
                            <th>identificacion</th>
                            <th>digitodeverificacion</th>
                            <th>razonsocial</th>
                            <th>nombres</th>
                            <th>apellidos</th>
                            <th>nombrecomercial</th>
                            <th>sucursal</th>
                            <th>estado</th>
                            <th>ciudad</th>
                            <th>direccion</th>
                            <th>indicativo</th>
                            <th>telefono</th>
                            <th>extension</th>
                            <th>nombrescontacto</th>
                            <th>apellidoscontacto</th>
                            <th>correocontacto</th>
                            <th>tipoderegimen</th>
                            <th>codigoresponsabilidadfiscal</th>
                            <th>indicativofacturacion</th>
                            <th>telefonofacturacion</th>
                            <th>codigopostalfacturacion</th>
                            <th>usuarioasignado</th>
                            <th>observacion</th>
                            <th>fechacreacion</th>
                            <th>fechamodificacion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listaTercerosCreados && listaTercerosCreados.map((facturas, index) => {
                                console.log("DATOS : ",facturas)
                              
                                return (
                                    <tr>
                                        <td>{0}</td>
                                        <td>{1}</td>
                                        <td>{1}</td>
                                        <td>{facturas.id_type.code}</td>
                                        <td>{facturas.identification}</td>
                                        <td>{0}</td>
                                        <td>{facturas.contacts[0].first_name}{" "}{facturas.contacts[0].last_name}</td>
                                        <td>{facturas.contacts[0].first_name}</td>
                                        <td>{facturas.contacts[0].last_name}</td>
                                        <td>{facturas.contacts[0].first_name}{" "}{facturas.contacts[0].last_name}</td>
                                        <td>{0}</td>
                                        <td>{1}</td>
                                        <td>{facturas.address.city.city_code}</td>
                                        <td>{facturas.address.address}</td>
                                        <td>{facturas.phones[0].indicative}</td>
                                        <td>{facturas.phones[0].number}</td>
                                        <td>{facturas.phones[0].indicative}</td>
                                        <td>{facturas.contacts[0].first_name}</td>
                                        <td>{facturas.contacts[0].last_name}</td>
                                        <td>{facturas.contacts[0].email}</td>
                                        <td>{1}</td>
                                        <td>{facturas.fiscal_responsibilities[0].code}</td>
                                        <td>{facturas.phones[0].indicative}</td>
                                        <td>{facturas.phones[0].number}</td>
                                        <td>{facturas.address.postal_code}</td>
                                        <td>{0}</td>
                                        <td>{facturas.type}</td>
                                        <td>{facturas.metadata.created}</td>
                                        <td>{facturas.metadata.created}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

            }
        </div>
    );
}

export default CreateClientSiigo;