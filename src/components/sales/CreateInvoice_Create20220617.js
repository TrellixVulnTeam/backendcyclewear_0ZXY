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

function CreateInvoice(props) {
    const [lisPedidos, setListPedidos] = useState([]);
    const [lisProductosSiigo, setListProductosSiigo] = useState([]);
    const [listIdentificacion, setListIdentificacion] = useState([]);
    const [listDetalleFacturas, setListDetalleFacturas] = useState([]);
    const [fechaFacturas, setFechaFacturas] = useState(false);
    const [tipoTercero, setTipoTercero] = useState("");
    const [loading, setLoading] = useState(false);
    const fechaactual = Moment(new Date()).format("YYYY-MM-DD");
    //const fechaactual = Moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const [datosClientesFacturas, setDatosClientesFacturas] = useState([]);
    const [datos, setDatos] = useState([]);
    const dispatch = useDispatch();
    const [leeFacturas, setLeeFacturas] = useState(false);
    const [invoice, setInvoice] = useState([]);

    const [genera, setGenera] = useState([])

    //console.log("IMAGEN : ", imagen1)

    useEffect(() => {

        if (fechaFacturas) {
            const newDet = [];
            let contador = invoice.length;
            let contadordos = 0;
            invoice && invoice.map((row, index) => {
                contadordos = contadordos + 1;
                const leeFacturas = async () => {
                    //setLoading(true);
                    const params = {
                        pedido: row
                    }
                    //console.log("FECHA ", params);
                    await axios({
                        method: 'get',
                        url: 'https://sitbusiness.co/cyclewear/api/209', params
                    }).then(res => {
                        let item = {
                            id_fact: res.data[0].id_fact,
                            id_siigo: res.data[0].id_siigo,
                            comprobante: res.data[0].comprobante,
                            prefijo: res.data[0].prefijo,
                            facturasiigo: res.data[0].facturasiigo,
                            fechafactura: res.data[0].fechafactura,
                            idcliente: res.data[0].idcliente,
                            valorfactura: res.data[0].valorfactura,
                            descuento: res.data[0].descuento,
                            cost_center: res.data[0].cost_center,
                            seller: res.data[0].seller,
                            valorimpuesto: res.data[0].valorimpuesto,
                            porcentajeimpto: res.data[0].porcentajeimpto,
                            observaciones: res.data[0].observaciones,
                        };
                        //console.log("ID FACTURAS LEIDAS : ", item);
                        newDet.push(item);
                    }
                    ).catch(function (error) {
                        console.log("ERROR LEYENDO FACTURAS");
                    })
                }
                leeFacturas();
                if (contador == contadordos) {
                    console.log("ID FACTURAS LEIDAS : ", newDet);
                    setListPedidos(newDet);
                }
            })

            setLoading(true);
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
        
    }, [fechaFacturas])

    useEffect(() => {
        if (leeFacturas) {
            let contador = 0;
            console.log("NUMERO DE PEDIDOS : ", lisPedidos.length);
            setLoading(true);

            const newDetPed = [];
            lisPedidos && lisPedidos.map((facturas, index) => {
                contador = contador + 1;
                const leer = async () => {
                    const params = {
                        factura: facturas.id_fact
                    }
                    //console.log("LISTADO PEDIDOS : ", params)

                    await axios({
                        method: 'get',
                        url: 'https://sitbusiness.co/cyclewear/api/202', params
                    }).then(res => {
                        //console.log("DETALLE PEDIDOD : ", res.data.included);

                        res.data.included && res.data.included.map((itempedido, index) => {
                            //console.log("ITEM PEDIDOS : ", itempedido);
                            let codigoproducto;
                            let idimpuesto;
                            lisProductosSiigo && lisProductosSiigo.forEach((producto) => {

                                if (itempedido.attributes.variant_sku == producto.sku) {
                                    codigoproducto = producto.codigo;
                                    idimpuesto = producto.tipoimpuesto;
                                }
                            })

                            if (itempedido.type == 'line_items') {
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
                                    codigoproductosiigo: codigoproducto,
                                    tipoimpuesto: idimpuesto,
                                    observaciones: ""
                                };
                                //console.log("ITEM PEDIDO : ", res.data)
                                newDetPed.push(item);
                            }
                        })
                    }
                    ).catch(function (error) {
                        console.log("ERROR LEYENDO FACTURAS");
                    })
                }
                leer();
                if (contador === 263) {
                    setLoading(false)
                }
            })
            setListDetalleFacturas(newDetPed);
            setLeeFacturas(false);
        }
    }, [leeFacturas])

    const validarDatos = () => {
        //console.log("Productos  : ", lisProductosSiigo);
        const newDetId = [];
        let contador = 0;
        let contadordos = lisPedidos.length;

        setLeeFacturas(true);
    }

    const crearFacturas = () => {
        //console.log("Productos  : ", lisProductosSiigo);
        //    listDetalleFacturas && listDetalleFacturas.forEach((row) => {
        //setLoading(true);

            lisPedidos && lisPedidos.map((facturas, index) => {
                if (facturas.id_fact == 106398
) {

                    //var fecha = new Date();
                    let date = new Date(facturas.fechafactura);
                    let fecha = String(date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + date.getDate()).padStart(2, '0');
                    //contador = contador + 1;

                    listDetalleFacturas && listDetalleFacturas.map((items, row) => {
                     
                        if (items.pedido == facturas.id_fact) {
                            let valor = 0;
                            let valorpayment = 0;
                            let valoritem = 0;
                            let descuento = 0;

                            if (items.tipoimpuesto == 745) {
                                valor = items.price / 1.19;
                                valoritem = (valor - (facturas.descuento * -1)).toFixed(4);
                                valorpayment = facturas.valorfactura;
                                descuento = 0;
                            } else {
                                valoritem = items.price;
                                valoritem = (items.price - (facturas.descuento * -1)).toFixed(0);
                                valorpayment = valoritem;
                                descuento = 0;
                            }

                            // descuento = (((items.price-(items.price / 1.19))/items.price)*100).toFixed(4);
                            const leer = async () => {
                                let params = {
                                    id: 37799,
                                    date: "2022-06-17",  //fecha
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
                                    due_date: "2022-06-17", // fecha
                                    idtaxes: items.tipoimpuesto,
                                    observations: facturas.observaciones,
                                    pedido: facturas.id_fact
                                };
                                console.log("DATOS A FACTURAR : ", params)

                                await axios({
                                    method: 'get',
                                    url: 'https://sitbusiness.co/cyclewear/api/729', params
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
     

    }

    const sleep = () => (
        setTimeout(() => { console.log("Esperando!") }, 100)
    );

    //const leerDatosFacturas = async () => {
    const actualizarDatosBD = () => {
        setLoading(true);
        //console.log("TERCEROS CREADOS : ", listaTercerosCreados);
        //console.log("FACTURAS LEIDAS : ", datosClientesFacturas);

        //console.log("ENCABEZADO PEDIDOS : ", lisPedidos);
        //console.log("DETALLE PEDIDOS : ", listDetalleFacturas);

        let longitud = lisPedidos.length;
        let contador = 0;

        lisPedidos && lisPedidos.forEach((row) => {
            const leerPedidos = async () => {
                contador = contador + 1;
                //let anno = row.fechafactura.getFullYear();
                //let mes = row.fechafactura.getMonth();
                //let dia = row.fechafactura. getDate();
                //console.log("VALOR FECHA : ", Moment.format("YYYY/MM/DD", row.fechafactura));
                const params = {
                    id_fact: row.id_fact,
                    id_siigo: row.id_siigo,
                    comprobante: row.comprobante,
                    prefijo: row.prefijo,
                    facturasiigo: row.facturasiigo,
                    fechafactura: "2022-06-17", //row.fechafactura,
                    idcliente: row.idcliente,
                    valorfactura: row.valorfactura,
                    descuento: row.descuento,
                    cost_center: row.cost_center,
                    seller: row.seller,
                    valorimpuesto: row.valorimpuesto,
                    porcentajeimpto: row.porcentajeimpto,
                    observaciones: ""
                }
                await axios({
                    method: 'post',
                    url: 'https://sitbusiness.co/cyclewear/api/206', params
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
            leerPedidos()
        });

        contador = 0;
        longitud = listDetalleFacturas.length;

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
                    observaciones: ""
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
                    <button className='botoncrearcliente' color="primary" onClick={validarDatos}>
                        Validar Datos
                    </button>
                </Col>
                <Col xl={3} lg={3} md={3} xs={3}>
                    <button className='botoncrearcliente' color="primary" onClick={actualizarDatosBD}>
                        Actualizar BD
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

export default CreateInvoice;