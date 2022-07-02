import React, { Fragment, useEffect, useState } from 'react';
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Breadcrumb from "../common/breadcrumb";
import MaterialTable from "material-table";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import CancelIcon from '@material-ui/icons/Cancel';
import EditAttributesIcon from '@material-ui/icons/EditAttributes';
import Moment from "moment";
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
    const [lisFacturas, setListFacturas] = useState([]);
    const [lisFacturasUno, setListFacturasUno] = useState([]);
    const [lisFacturasDos, setListFacturasDos] = useState([]);
    const [fechaFacturas, setFechaFacturas] = useState("");
    const [loading, setLoading] = useState(false);
    const [control, setControl] = useState(1);
    const [uno, setUno] = useState(0);
    const [dos, setDos] = useState(0);
    const [tres, setTres] = useState(0);
    const [totalFacturas, setTotalFacturas] = useState([]);
    const fechaactual = Moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const [datosClientesFacturas, setDatosClientesFacturas] = useState([]);
    const [datos, setDatos] = useState([]);
    const [datosCrear, setDatosCrear] = useState(false);
    const dispatch = useDispatch();

    console.log("IMAGEN : ", imagen1)

    useEffect(() => {
        const newDet = [];

        let minimo = 0;
        let maximo = 0;
        let rango = 0;

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
                //console.log("FACTURAS : ", res.data)
                newDet.push(res.data);
                setLoading(false);
                if (newDet.length > 0) {
                    setListPedidos(newDet[0].data);
                    setDatosCrear(true);
                }
            }
            ).catch(function (error) {
                console.log("ERROR LEYENDO FACTURAS");
            })
        }
        leeFacturas();
    }, [fechaFacturas])

    //console.log("LISTA PRODUCTOS BK : ", res.data.data);
    useEffect(() => {
        if (datosCrear) {
            const newDet = [];
            let numfactura = lisPedidos.length;
            let contador = 0;
            lisPedidos && lisPedidos.map((facturas, index) => {
                contador = contador + 1;
                const leer = async () => {
                    const params = {
                        factura: facturas.id
                    }

                    await axios({
                        method: 'post',
                        url: 'https://sitbusiness.co/cyclewear/api/202', params
                    }).then(res => {
                        let longitud = res.data.included.length - 1;

                        var caracteres = "012346789";
                        var codigoid = "";
                        for (var i = 0; i < 10; i++)
                            codigoid += caracteres.charAt(
                                Math.floor(Math.random() * caracteres.length)
                            );

                        let item = {
                            type: "Customer",
                            tipotercero: 1,
                            person_type: "Person",
                            id_type: "13",
                            identification: codigoid,
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
                            fecha: fechaactual
                        };
                        newDet.push(item);
                        if (contador === numfactura) {
                            //alert("ENTRE")
                            console.log("CONTADOR : ", contador, "NUM FACTURA : ", numfactura)
                            if (newDet.length === numfactura) {
                                const esperacinco = async event => {
                                    await sleep(1000);
                                    console.log("NEW DET : ", newDet);
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
            setDatosCrear(false);
        }
    }, [datosCrear])

    const sleep = () => (
        setTimeout(() => { alert("Esperando!") }, 10000)
    );

    //const leerDatosFacturas = async () => {
    const crearClientes = () => {
        //setLoading(false);
        setLoading(true);
        const newDet = [];
        let longitud = datosClientesFacturas.length;
        let contador = 0;

        for (var i = 0; i < longitud; i++) {
            contador = contador + 1;
            console.log("CONTADOR : ", contador)
            sleep();

            const params = {
                active: datosClientesFacturas[i].active,
                address: datosClientesFacturas[i].address,
                apellido: datosClientesFacturas[i].apellido,
                branch_office: datosClientesFacturas[i].branch_office,
                check_digit: datosClientesFacturas[i].check_digit,
                city_code: datosClientesFacturas[i].city_code,
                ciudad: datosClientesFacturas[i].ciudad,
                code: datosClientesFacturas[i].code,
                comments: datosClientesFacturas[i].comments,
                commercial_name: datosClientesFacturas[i].commercial_name,
                country_code: datosClientesFacturas[i].country_code,
                email: datosClientesFacturas[i].email,
                estado: datosClientesFacturas[i].estado,
                extension: datosClientesFacturas[i].extension,
                fecha: datosClientesFacturas[i].fecha,
                first_name: datosClientesFacturas[i].first_name,
                id_type: datosClientesFacturas[i].id_type,
                identification: datosClientesFacturas[i].identification,
                indicative: datosClientesFacturas[i].indicative,
                indicativofacturacion: datosClientesFacturas[i].indicativofacturacion,
                last_name: datosClientesFacturas[i].last_name,
                nombre: datosClientesFacturas[i].nombre,
                number: datosClientesFacturas[i].number,
                person_type: datosClientesFacturas[i].person_type,
                postal_code: datosClientesFacturas[i].postal_code,
                state_code: datosClientesFacturas[i].state_code,
                sucursal: datosClientesFacturas[i].sucursal,
                tipoderegimen: datosClientesFacturas[i].tipoderegimen,
                tipotercero: datosClientesFacturas[i].tipotercero,
                type: datosClientesFacturas[i].type,
                usuarioasignado: datosClientesFacturas[i].usuarioasignado,
                vat_responsible: datosClientesFacturas[i].vat_responsible,
            }

            console.log("PARAMETROS : ", params);

            axios({
                method: 'post',
                url: 'https://sitbusiness.co/cyclewear/api/113', params
            }).then(res => {

                console.log("GRABO : ", i)

                if (contador === longitud)
                    setLoading(false);
            }
            ).catch(function (error) {
                console.log("ERROR LEYENDO FACTURAS");
            })
        }

        console.log("TOTAL CLIENTES : ", datosClientesFacturas)
        console.log("CONTADOR : ", contador, " LONGITUD : ", longitud);
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
                    <Col xl={5} lg={5} md={5} xs={5} className='mt-10'>
                        <h4>
                            Ingresa Fecha para leer facturas:
                        </h4>

                    </Col>
                    <Col xl={6} lg={6} md={6} xs={6}>
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
            </Row>
            <hr />
            {

                <table id="ubicacionesequipos" className="table">
                    <thead>
                        <tr>
                            <th>IDENTIFICACION</th>
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
                                        <td>{facturas.fechafactura}</td>
                                        <td>{facturas.nombre}</td>
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