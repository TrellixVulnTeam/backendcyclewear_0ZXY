import React, { Fragment, useEffect, useState } from 'react';
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Moment from "moment";
//import Loading from "../../../components/elements/Loading";
import EditIcon from '@material-ui/icons/Edit';
import imagen1 from "../../assets/images/imagenes/bicicleta.jpg";
import Loading from '../elements/Loading/Loading';
import ListarProductos from '../products/physical/ListarProductos';
import { Col, Row } from "reactstrap";

function SaveInvoiceSiigo(props) {
    const [lisPedidos, setListPedidos] = useState([]);
    const [lisProductosSiigo, setListProductosSiigo] = useState([]);
    const [listDetalleFacturas, setListDetalleFacturas] = useState([]);
    const [fechaFacturas, setFechaFacturas] = useState(true);
    const [tipoTercero, setTipoTercero] = useState("");
    const [loading, setLoading] = useState(false);
    const fechaactual = Moment(new Date()).format("YYYY-MM-DD");
    //const fechaactual = Moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const [datosClientesFacturas, setDatosClientesFacturas] = useState([]);
    const [datos, setDatos] = useState([]);
    const dispatch = useDispatch();
    const [leeFacturas, setLeeFacturas] = useState(false);

    //console.log("IMAGEN : ", imagen1)

    useEffect(() => {
        if (fechaFacturas) {
            const newDet = [];
            let contadordos = 0;
            setLoading(true);
            const leeFacturas = async () => {
                await axios({
                    method: 'get',
                    url: 'https://sitbusiness.co/cyclewear/api/210'
                }).then(res => {
                    setListPedidos(res.data);
                }
                ).catch(function (error) {
                    console.log("ERROR LEYENDO FACTURAS");
                })
            }
            leeFacturas();

            console.log("ID FACTURAS LEIDAS : ", newDet);
            //setListPedidos(newDet);

            const newDetPed = [];
            const leeItemsPedidosSiigo = async () => {
                await axios({
                    method: 'get',
                    url: 'https://sitbusiness.co/cyclewear/api/211'
                }).then(res => {
                    setListDetalleFacturas(res.data);
                }
                ).catch(function (error) {
                    console.log("ERROR LEYENDO FACTURAS");
                })
            }
            leeItemsPedidosSiigo();

            console.log("ITEMS PEDIDOS : ", newDetPed);

            const leeProductosSiigo = async () => {
                await axios({
                    method: 'post',
                    url: 'https://sitbusiness.co/cyclewear/api/27'
                }).then(res => {
                    setLoading(false);
                    setListProductosSiigo(res.data);
                    //setLeeFacturas(true);
                }
                ).catch(function (error) {
                    console.log("ERROR LEYENDO FACTURAS");
                })
            }
            leeProductosSiigo();
        }
        setLoading(false);
    }, [fechaFacturas])

    const crearFacturas = () => {
        console.log("Productos  : ", lisProductosSiigo);
        console.log("Pedidos  : ", lisPedidos)
        console.log("Items pedidos  : ", listDetalleFacturas)

        setLoading(true);

        lisPedidos && lisPedidos.map((facturas, index) => {
            let control = 0;
            if (facturas.id_fact == 108608) {

                //var fecha = new Date();
                let date = new Date(facturas.fechafactura);
                let fecha = String(date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + date.getDate()).padStart(2, '0');
                //contador = contador + 1;

                listDetalleFacturas && listDetalleFacturas.map((items, row) => {
                    control = control + 1;

                    if (items.pedido == facturas.id_fact) {
                        console.log("ITEMS PEDIDOS : ", items)
                        let valor = 0;
                        let valorpayment = 0;
                        let valoritem = 0;
                        let descuento = 0;

                        //if (items.tipoimpuesto == 745) {
                            valor = items.price; // / 1.19;
                            valoritem = (valor - (facturas.descuento * -1)).toFixed(4);
                            valorpayment = facturas.valorfactura;
                            descuento = 0;
                        /*} else {
                            valoritem = items.price;
                            valoritem = (items.price - (facturas.descuento * -1)).toFixed(0);
                            valorpayment = valoritem;
                            descuento = 0;
                        }*/ 

                        // descuento = (((items.price-(items.price / 1.19))/items.price)*100).toFixed(4);
                        let comentario = "API - "+facturas.id_fact
                        const leer = async () => {
                            let params = {
                                id: 1397,
                                date: "2022-08-29",  //fecha
                                identification: facturas.idcliente,
                                cost_center: facturas.cost_center,
                                seller: facturas.seller,
                                code: items.codigoproductosiigo,
                                description: items.advert_name,
                                quantity: items.quantity,
                                discount: descuento,
                                price: valoritem,
                                value: valorpayment,
                                idpayments: 7500,
                                due_date: "2022-08-29", // fecha
                                idtaxes: 745, //items.tipoimpuesto,
                                observations: comentario,
                                pedido: facturas.id_fact
                            };
                            console.log("DATOS A FACTURAR : ", params)

                            await axios({
                                method: 'post',
                                url: 'https://sitbusiness.co/cyclewear/api/731', params
                            }).then(res => {
                                setLoading(false);
                                console.log("DATOS RESPONSE : ", res)
                            }
                            ).catch(function (error) {
                                console.log("ERROR LEYENDO FACTURAS");
                            })
                        }
                        leer();

                    }
                })

            }
        })
        setLoading(false);
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
            <div className='mb-30 ml-10'>
                <Row>
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
                    <button className='botoncrearcliente' color="primary" onClick={crearFacturas}>
                        Crear Facturas
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
                            lisPedidos && lisPedidos.map((facturas, index) => {
                                return (
                                    <tr>
                                        <td>{facturas.idcliente}</td>
                                        <td>{facturas.id_fact}</td>
                                        <td>{facturas.fecha}</td>
                                        <td>{facturas.nombre}</td>
                                        <td>{facturas.apellido}</td>
                                        <td>{facturas.email}</td>
                                        <td>{facturas.ciudad}</td>
                                        <td>0</td>
                                        <td>{facturas.direccion}</td>
                                        <td>{facturas.status}</td>
                                        <td>{facturas.valorfactura}</td>
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

export default SaveInvoiceSiigo;