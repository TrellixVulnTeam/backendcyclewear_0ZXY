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

function ValidateThird(props) {
    const [lisPedidos, setListPedidos] = useState([]);
    const [listIdentificacion, setListIdentificacion] = useState([]);
    const [listaTercerosCreados, setListaTercerosCreados] = useState([]);
    const [fechaFacturas, setFechaFacturas] = useState(false);
    const [tipoTercero, setTipoTercero] = useState("");
    const [loading, setLoading] = useState(false);
    const fechaactual = Moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const [datosClientesFacturas, setDatosClientesFacturas] = useState([]);
    const [datos, setDatos] = useState([]);
    const [datosCrear, setDatosCrear] = useState(false);
    const dispatch = useDispatch();
    const [leeFacturas, setLeeFacturas] = useState(false);

    //console.log("IMAGEN : ", imagen1)

    useEffect(() => {
        if (fechaFacturas) {
            const newDet = [];
            const newDetId = [];

            const leeFacturas = async () => {
                setLoading(true);
                const params = {
                    fecha: fechaFacturas
                }
                //console.log("FECHA ", params);
                await axios({
                    method: 'post',
                    url: 'https://sitbusiness.co/cyclewear/api/205', params
                }).then(res => {
                    newDet.push(res.data);
                    //console.log("LONGITUD FACTURAS : ", newDet[0].data.length)
                    let contador = newDet[0].data.length;
                    let contadordos = 0;
                    /*
                    if (newDet[0].data.length > 0) {
                        setListPedidos(newDet[0].data);
                        newDet[0].data && newDet[0].data.map((facturas, index) => {
                            const params = {
                                factura: newDet[0].data[index].id
                            }
                            //console.log("ID FACTURAS LEIDAS : ", facturas);
                            //console.log("ID FACTURAS LEIDAS : ", params);
                            //console.log("ENVOICE : ", params);

                            const leeIdentificacion = async () => {
                                await axios({
                                    method: 'post',
                                    url: 'https://sitbusiness.co/cyclewear/api/709', params
                                }).then(res => {
                                    newDetId(res.data);
                                    if (contadordos === contador) {
                                        //console.log("NUEVO ARREGLO  : ", newDetId);
                                        setListIdentificacion(newDetId[0]);
                                        setLoading(false);
                                        //console.log("LONGITUD : ", contador, "CONTADOR : ", contadordos, newDetId)
                                    }
                                }
                                ).catch(function (error) {
                                    console.log("ERROR LEYENDO FACTURAS");
                                })
                            }
                            leeIdentificacion();
                        })
                    }
                    */
                }
                ).catch(function (error) {
                    console.log("ERROR LEYENDO FACTURAS");
                })
            }
            leeFacturas();
        }
    }, [fechaFacturas])

    //console.log("LISTA PRODUCTOS BK : ", res.data.data);
    const validarDatos = () => {
        //console.log("ERROR LEYENDO FACTURAS");
        //console.log("Facturas : ", lisPedidos);

        const newDet = [];
        const newDetCli = [];
        let numfactura = lisPedidos.length;
        let contador = 0;
        let identificacion = 0;
        lisPedidos && lisPedidos.map((facturas, index) => {
            contador = contador + 1;
            const leer = async () => {
                const params = {
                    factura: facturas.id
                }

                listIdentificacion && listIdentificacion.map((row, index) => {
                    if (row.invoice === facturas.id) {
                        identificacion = row.identificaction;
                    }
                })

                await axios({
                    method: 'get',
                    url: 'https://sitbusiness.co/cyclewear/api/202', params
                }).then(res => {
                    console.log("RES DATA : ", res.data)
                    let longitud = res.data.included.length - 1;

                    let item = {
                        type: "Customer",
                        tipotercero: 1,
                        person_type: "Person",
                        id_type: "13",
                        identification: identificacion,
                        check_digit: 0,
                        nombre: res.data.included[longitud].attributes.first_name,
                        apellido: res.data.included[longitud].attributes.surname,
                        commercial_name: "Siigo",
                        branch_office: 0,
                        active: "true",
                        vat_responsible: "false",
                        code: "R-99-PN",
                        address: res.data.included[longitud].attributes.address,
                        country_code: "Co",
                        state_code: "05",
                        city_code: "05631",
                        postal_code: "110911",
                        indicative: "57",
                        number: res.data.included[longitud].attributes.phone,
                        extension: "000",
                        first_name: res.data.included[longitud].attributes.first_name,
                        last_name: res.data.included[longitud].attributes.surname,
                        email: res.data.included[longitud].attributes.email_address,
                        indicative: "57",
                        number: res.data.included[longitud].attributes.phone,
                        extension: "000",
                        comments: "Comentarios",
                        sucursal: 0,
                        estado: 1,
                        ciudad: 167,
                        tipoderegimen: 1,
                        indicativofacturacion: 0,
                        usuarioasignado: 0,
                        fecha: fechaactual,
                        pedido: facturas.id
                    };

                    newDet.push(item);

                    if (contador === numfactura) {
                        //alert("ENTRE")
                        //console.log("CONTADOR : ", contador, "NUM FACTURA : ", numfactura)
                        if (newDet.length === numfactura) {
                            const esperacinco = async event => {
                                await sleep(1000);
                                //console.log("NEW DET : ", newDet);
                                setDatosClientesFacturas(newDet);
                            }
                            esperacinco();
                        }
                    }
                }
                ).catch(function (error) {
                    console.log("ERROR LEYENDO FACTURAS");
                })
            }
            leer();
        })

        /*
                    const leerClientes = async () => {
                        const params = {
                            tipotercero: tipoTercero
                        }
        
                        await axios({
                            method: 'post',
                            url: 'https://sitbusiness.co/cyclewear/api/114', params
                        }).then(res => {
                            console.log("RETORNA : ", res.data);
                            if (res) {
                                setListaTercerosCreados(res.data);
                            }
                            setLoading(false);
                        }
                        ).catch(function (error) {
                            console.log("ERROR LEYENDO FACTURAS");
                        })
                    }
                    */
        //setListaTercerosCreados(newDetCli[0]);
        //console.log("NEW DET XXXX : ", newDetCli[0]);

    }

    const sleep = () => (
        setTimeout(() => { console.log("Esperando!") }, 100)
    );

    //const leerDatosFacturas = async () => {
    const crearClientes = () => {
        setLoading(true);
        //console.log("TERCEROS CREADOS : ", listaTercerosCreados);
        console.log("CEDULAS : ", listIdentificacion);
        setLoading(false)
return
        const newDetCli = [];
        if (!tipoTercero) {
            swal(
                "CYCLE WEAR",
                "Recuerda, debes ingresar el tipo de tercero!",
                "warning",
                { button: "Aceptar" }
            );
            setLoading(false);
            return;
        }

        let longitud = datosClientesFacturas.length;
        let contador = 0;

        datosClientesFacturas && datosClientesFacturas.forEach((row) => {
            const leerClientes = async () => {
                const params = {
                    tipotercero: tipoTercero,
                    identificacion: row.identification
                }
                await axios({
                    method: 'post',
                    url: 'https://sitbusiness.co/cyclewear/api/102', params
                }).then(res => {
                    console.log("DATOS CLIENTE : ", res.data);
                    if (res) {
                        //setListaTercerosCreados(res.data);
                    }
                    setLoading(false);
                }
                ).catch(function (error) {
                    console.log("ERROR LEYENDO FACTURAS");
                })
            }
            leerClientes()
        });
        //setCarrocerias(newDet);

        for (var i = 0; i < 1; i++) {
            contador = contador + 1;

            const params = datosClientesFacturas[i];
            console.log("PARAMETROS : ", params);

            axios({
                method: 'post',
                url: 'https://sitbusiness.co/cyclewear/api/101', params
            }).then(res => {

                console.log("RESPONSE : ", res)

                if (contador === longitud)
                    setLoading(false);
            }
            ).catch(function (error) {
                console.log("ERROR LEYENDO FACTURAS");
            })

        }
        //console.log("TOTAL CLIENTES : ", datosClientesFacturas)
        //console.log("CONTADOR : ", contador, " LONGITUD : ", longitud);
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

    const handleChangeTipoTercero = async (selectedOptions) => {
        setTipoTercero(selectedOptions)
    }

    return (
        <div>
            {loading ? <Loading /> : null}
            <br />
            <div className='mb-30 ml-10'>
                <Row>
                    <Col xl={2} lg={2} md={2} xs={2}>
                        <div className='tamañofuentetercero'>
                            Tipo de Tercero:
                        </div>
                    </Col>
                    <Col xl={3} lg={3} md={3} xs={3}>
                        <div className="form-horizontal auth-form">
                            <div>
                                <input
                                    name="tipotercero"
                                    type="text"
                                    className="form-control"
                                    placeholder="Ingrese Tipo Tercero"
                                    id="exampleInputEmail12"
                                    onChange={(e) =>
                                        handleChangeTipoTercero(
                                            e.target
                                                .value
                                        )}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col xl={2} lg={2} md={2} xs={2}>
                        <div className='tamañofuentetercero'>
                            Fecha facturas:
                        </div>
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
                </Row>
            </div>

            <hr />
            <Row>
                <Col xl={3} lg={3} md={3} xs={3}>

                </Col>
                <Col xl={3} lg={3} md={3} xs={3}>
                    <button className='botoncrearcliente' color="primary" >
                        <ReactHTMLTableToExcel
                            table="ubicacionesequipos"
                            filename="DatosClientesCWR"
                            sheet="Sheet"
                            buttonText="Exportar a Excel"
                        />
                    </button>
                </Col>

                <Col xl={3} lg={3} md={3} xs={3}>
                    <button className='botoncrearcliente' color="primary" onClick={crearClientes}>
                        Crear Clientes
                    </button>
                </Col>
                <Col xl={3} lg={3} md={3} xs={3}>
                    <button className='botoncrearcliente' color="primary" onClick={validarDatos}>
                        Validar Datos
                    </button>
                </Col>
            </Row>
            <hr />
            {

                <table id="ubicacionesequipos" className="table">
                    <thead>
                        <tr>
                            <th>IDENTIFICACION</th>
                            <th>PEDIDO</th>
                            <th>FECHA</th>
                            <th>NOMBRE</th>
                            <th>APELLIDO</th>
                            <th>EMAIL</th>
                            <th>CIUDAD</th>
                            <th>TELEFONO</th>
                            <th>DIRECCION</th>
                            <th>ESTADO</th>
                            <th>TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            datosClientesFacturas && datosClientesFacturas.map((facturas, index) => {
                                return (
                                    <tr>
                                        <td>{facturas.identification}</td>
                                        <td>{facturas.pedido}</td>
                                        <td>{facturas.fecha}</td>
                                        <td>{facturas.apellido}</td>
                                        <td>{facturas.email}</td>
                                        <td>{facturas.ciudad}</td>
                                        <td>{facturas.telefono}</td>
                                        <td>{facturas.direccion}</td>
                                        <td>{facturas.estado}</td>
                                        <td>{facturas.valor}</td>
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

export default ValidateThird;