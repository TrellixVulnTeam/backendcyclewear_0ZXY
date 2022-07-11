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
import ListarProductos from '../products/physical/ListarProductos';

function CreateInvoice(props) {
    const [lisPedidos, setListPedidos] = useState([]);
    const [lisProductosSiigo, setListProductosSiigo] = useState([]);
    const [listIdentificacion, setListIdentificacion] = useState([]);
    const [listDetalleFacturas, setListDetalleFacturas] = useState([]);
    const [pagina, setPagina] = useState(false);
    const [tipoTercero, setTipoTercero] = useState("");
    const [loading, setLoading] = useState(false);
    const fechaactual = Moment(new Date()).format("YYYY-MM-DD");
    //const fechaactual = Moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const [datosClientesFacturas, setDatosClientesFacturas] = useState([]);
    const [datos, setDatos] = useState([]);
    const dispatch = useDispatch();
    const [leeFacturas, setLeeFacturas] = useState(false);
    const [leePedidos, setLeePedidos] = useState(false);
    const [actualizaBD, setActualizaBD] = useState(false);
    const [validarDatos, setValidarDatos] = useState(false);

    //console.log("IMAGEN : ", imagen1)

    useEffect(() => {
        if (leePedidos) {
            const newDet = [];
            setLeePedidos(false);
            let contador = 94;
            let contadordos = 0;

            const consultaFacturas = async () => {
                setLoading(true);
                for (var i = 89; i < 96; i++) {
                    const params = {
                        pagina: i
                    }
                    if (i == 95) {
                        //setLoading(false);
                        setLeeFacturas(true);
                        break;
                    }
                    contadordos = i;
                    //console.log("FECHA ", params);
                    await axios({
                        method: 'post',
                        url: 'https://sitbusiness.co/cyclewear/api/201', params
                    }).then(res => {
                        console.log("DATOS RETORNA : ", res.data.data);
                        //return;

                        res.data.data && res.data.data.map((row, index) => {
                            //console.log("ID FACTURAS LEIDAS : ", row);
                            let date = new Date(row.attributes.created_at);
                            let fecha = String(date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + date.getDate()).padStart(2, '0');
                            //console.log("FECHA : ", fecha);
                            let item = {
                                id_fact: row.id,
                                id_siigo: 0,
                                comprobante: 0,
                                prefijo: 0,
                                facturasiigo: 0,
                                fechafactura: fecha,
                                idcliente: 0,
                                valorfactura: row.attributes.subtotal,
                                descuento: row.attributes.discount,
                                cost_center: 235,
                                seller: row.attributes.seller_id,
                                valorimpuesto: row.attributes.tax_total,
                                porcentajeimpto: 0,
                                Observaciones: ""
                            };

                            newDet.push(item);
                        })

                        setListPedidos(newDet);

                        newDet && newDet.map((params, index) => {
                            //console.log("PEDIDOS LEIDOS : ", params);

                            const grabarpedidos = async () => {
                                await axios({
                                    method: 'post',
                                    url: 'https://sitbusiness.co/cyclewear/api/206', params
                                }).then(res => {
                                    //console.log("VALOR CONTADOR DOS : ", contadordos);
                                    //setListIdentificacion(newDetId[0]);
                                }
                                ).catch(function (error) {
                                    console.log("ERROR LEYENDO FACTURAS");
                                })
                            }
                            grabarpedidos()
                        })
                    }
                    ).catch(function (error) {
                        console.log("ERROR LEYENDO FACTURAS");
                    })
                }
            }
            consultaFacturas();
        }
    }, [leePedidos])

    useEffect(() => {
        if (leeFacturas) {
            //console.log("NUMERO DE PEDIDOS : ", lisPedidos.length);
            //console.log("PEDIDOS : ", lisPedidos);
            setLoading(true);
            const newDetPed = [];

            let control = 0;
            let numeropedidos = lisPedidos.length;

            lisPedidos && lisPedidos.map((facturas, index) => {
                const leer = async () => {
                    const params = {
                        factura: facturas.id_fact
                    }
                    //console.log("LISTADO PEDIDOS : ", params)

                    await axios({
                        method: 'get',
                        url: 'https://sitbusiness.co/cyclewear/api/202', params
                    }).then(res => {
                        let tamaño = res.data.included.length;
                        let posicion = tamaño - 1;
                        let direccion = res.data.included[posicion].attributes.address;
                        //console.log("DETALLE PEDIDOD : ", res.data.included[posicion].attributes.address, "TAMAÑO : ", tamaño);
                        //return
                        res.data.included && res.data.included.map((itempedido, index) => {
                            //console.log("ITEM PEDIDOS : ", itempedido);
                            let codigoproducto;
                            /*
                            lisProductosSiigo && lisProductosSiigo.forEach((producto) => {
                                if (itempedido.attributes.variant_sku === producto.sku) {
                                    codigoproducto = producto.codigo;
                                }
                            })
                            */

                            //console.log("TIPO PEDIDOD : ", itempedido.type);

                            if (itempedido.type == 'line_items') {
                                //console.log("GRABANDO PEDIDOD : ", params);
                                let item = {
                                    itempedido: itempedido.id,
                                    pedido: itempedido.attributes.invoice_id,
                                    advert_name: itempedido.attributes.advert_name,
                                    advert_code: itempedido.attributes.advert_code,
                                    brand_name: itempedido.attributes.brand_name,
                                    price: itempedido.attributes.price,
                                    quantity: itempedido.attributes.quantity,
                                    subtotal: itempedido.attributes.subtotal,
                                    tax_total: itempedido.attributes.tax_total,
                                    taxon_name: itempedido.attributes.taxon_name,
                                    total: itempedido.attributes.total,
                                    variant_barcode: itempedido.attributes.variant_barcode,
                                    variant_name: itempedido.attributes.variant_name,
                                    variant_sku: itempedido.attributes.variant_sku,
                                    codigoproductosiigo: 0, //codigoproducto,
                                    direccion: direccion,
                                    observaciones: ""
                                };
                                //console.log("ITEM PEDIDO : ", item)
                                newDetPed.push(item);
                            }
                        })
                    }
                    ).catch(function (error) {
                        console.log("ERROR LEYENDO FACTURAS");
                    })

                    control = control + 1;
                    //console.log("VALOR CONTROL : ", control);
                    if (control === numeropedidos) {
                        console.log("LOADING EN FALSE");
                        setLoading(false);
                        actualizarDatosBD();
                    }
                }
                leer();


            })

            setListDetalleFacturas(newDetPed);
            setLeeFacturas(false);
        }
    }, [leeFacturas]);

    const readPedidos = () => {
        setLeePedidos(true);
        //setLeeFacturas(true);
    }

    const sleep = () => (
        setTimeout(() => { console.log("Esperando!") }, 100)
    );

    useEffect(() => {
        //setLoading(true);
        //console.log("TERCEROS CREADOS : ", listaTercerosCreados);
        //console.log("FACTURAS LEIDAS : ", datosClientesFacturas);

        //console.log("ENCABEZADO PEDIDOS : ", lisPedidos);
        console.log("DETALLE PEDIDOS : ", listDetalleFacturas);

        let longitud = lisPedidos.length;
        let contador = 0;

        contador = 0;
        longitud = listDetalleFacturas.length;
        console.log("NUMERO ITEMS PEDIDOS : ", longitud)

        listDetalleFacturas && listDetalleFacturas.forEach((row) => {
            const leerItems = async () => {
                contador = contador + 1;

                //let anno = row.fechafactura.getFullYear();
                //let mes = row.fechafactura.getMonth();
                //let dia = row.fechafactura. getDate();
                //console.log("VALOR FECHA : ", Moment.format("YYYY/MM/DD", row.fechafactura));

                const params = {
                    itempedido: row.itempedido,
                    pedido: row.pedido,
                    advert_name: row.advert_name,
                    advert_code: row.advert_code,
                    brand_name: row.brand_name,
                    proce: row.price,
                    quantity: row.quantity,
                    subtotal: row.subtotal,
                    tax_total: row.tax_total,
                    taxon_name: row.taxon_name,
                    total: row.total,
                    variant_barcode: row.variant_barcode,
                    variant_name: row.variant_name,
                    variant_sku: row.variant_sku,
                    codigoproductosiigo: row.codigoproductosiigo,
                    direccion: row.direccion,
                    observaciones: "Items pedido # " + row.pedido
                }
                await axios({
                    method: 'post',
                    url: 'https://sitbusiness.co/cyclewear/api/207', params
                }).then(res => {
                    if (contador === longitud) {
                        console.log("VALOR RESPONSE : ", res)
                        setLoading(false);
                    }
                }
                ).catch(function (error) {
                    console.log("ERROR LEYENDO FACTURAS");
                })
            }
            leerItems()
        });
    }, [actualizaBD]);

    //const leerDatosFacturas = async () => {
    const actualizarDatosBD = () => {
        setActualizaBD(true);
    }

    const handleChangePagina = async (selectedOptions) => {
        setPagina(selectedOptions)
    }

    const leerProductoSiigo = async () => {
        setLoading(true);
        const newDetPed = [];

        const leeProductosSiigo = async () => {

            for (var i = 1; i < 11; i++) {
                const params = {
                    pagina: i
                }

                if (i == 10) {
                    setLoading(false);
                    setListProductosSiigo(newDetPed);
                    break;
                }

                await axios({
                    method: 'post',
                    url: 'https://sitbusiness.co/cyclewear/api/715', params
                }).then(res => {
                    console.log("PAGINA : ", params);
                    res.data && res.data.map((row, index) => {
                        //console.log("ID FACTURAS LEIDAS : ", row);
                        let item = {
                            code: row.code,
                            id: row.id,
                            name: row.name,
                            cantidad: row.cantidad,
                            impuestos: row.impuestos
                        };
                        newDetPed.push(item);
                    })
                    //setLeeFacturas(true);
                }
                ).catch(function (error) {
                    console.log("ERROR LEYENDO FACTURAS");
                })
            }
        }
        leeProductosSiigo();
    }

    useEffect(() => {
        if (validarDatos) {
            const productos = async () => {
                await axios({
                    method: 'post',
                    url: 'https://sitbusiness.co/cyclewear/api/27'
                }).then(res => {
                    console.log("PRODUCTOS : ", res)
                }
                ).catch(function (error) {
                    console.log("ERROR LEYENDO PRODUCTOS");
                })
            }
            productos();

            const pedidos = async () => {
                await axios({
                    method: 'post',
                    url: 'https://sitbusiness.co/cyclewear/api/210'
                }).then(res => {
                    console.log("PEDIDOS : ", res)
                }
                ).catch(function (error) {
                    console.log("ERROR LEYENDO PEDIDOS");
                })
            }
            pedidos();

            const itemspedidos = async () => {
                await axios({
                    method: 'post',
                    url: 'https://sitbusiness.co/cyclewear/api/211'
                }).then(res => {
                    console.log("ITEMS PEDIDOS : ", res)
                }
                ).catch(function (error) {
                    console.log("ERROR LEYENDO PEDIDOS");
                })
            }
            itemspedidos();
        }
    }, [validarDatos]);

    const itemspedidos = async () => {
        setValidarDatos(true);
    }

    return (
        <div>
            {loading ? <Loading /> : null}
            <br />
            <div className='mb-30 ml-10'>
                <Row>
                    <Col xl={3} lg={3} md={3} xs={3}>
                        <div className='tamañofuentetercero'>
                            Pagina inicial:
                        </div>
                    </Col>
                    <Col xl={3} lg={3} md={3} xs={3} className="mlmenos50 mtmenos5">
                        <div className="form-horizontal auth-form">
                            <div>
                                <input
                                    name="pagina"
                                    type="numeric"
                                    className="form-control"
                                    placeholder="Ingresé página inicial"
                                    id="exampleInputEmail12"
                                    onChange={(e) =>
                                        handleChangePagina(
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
                    <button className='botoncrearcliente' color="primary" onClick={readPedidos}>
                        Lee Pedidos BE
                    </button>
                </Col>
                <Col xl={3} lg={3} md={3} xs={3}>
                    <button className='botoncrearcliente' color="primary" onClick={actualizarDatosBD}>
                        Actualizar BD
                    </button>
                </Col>
                <Col xl={3} lg={3} md={3} xs={3}>
                    <button className='botoncrearcliente' color="primary" onClick={leerProductoSiigo}>
                        Leer Productos
                    </button>
                </Col>
                <Col xl={3} lg={3} md={3} xs={3}>
                    <button className='botoncrearcliente' color="primary" onClick={itemspedidos}>
                        Validar Datos
                    </button>
                </Col>
            </Row>
            <hr />
            {
                <table id="ubicacionesequipos" className="table">
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Cantidad</th>
                            <th>Impuestos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            lisProductosSiigo && lisProductosSiigo.map((facturas, index) => {
                                return (
                                    <tr>
                                        <td>{facturas.code}</td>
                                        <td>{facturas.id}</td>
                                        <td>{facturas.name}</td>
                                        <td>{facturas.cantidad}</td>
                                        <td>{facturas.impuestos}</td>
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

export default CreateInvoice;