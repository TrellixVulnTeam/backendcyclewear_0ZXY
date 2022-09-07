import React, { Fragment, useEffect, useState } from 'react';
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import axios from "axios";
import Moment from "moment";
import MaterialTable from "material-table";
//import Loading from "../../../components/elements/Loading";
import swal from "sweetalert";
import Loading from '../elements/Loading/Loading';
import { Col, Row } from "reactstrap";
import "./ordenes.css";
import ModalMensajes from "../pages/mensajes/ModalMensajes";
import { Modal, Button, TextField, Select, MenuItem, FormControl, InputLabel, Grid, ButtonGroup, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    modal2: {
        position: 'absolute',
        width: 600,
        height: 300,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '25px'
    },
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    iconos: {
        cursor: 'pointer'
    },
    inputMaterial: {
        width: '100%'
    },
    formControl: {
        margin: theme.spacing(0),
        minWidth: 290,
        maxWidth: 290,
    },
    typography: {
        fontSize: 22,
        color: "#ff3d00"
    },
    button: {
        color: theme.palette.getContrastText(blueGrey[500]),
        width: '200px',
        height: '40px',
        marginTop: '40px',
        backgroundColor: green[700],
        margin: theme.spacing(1),
        fontSize: 14,
        '&:hover': {
            backgroundColor: blue[700],
        },
    }
}));

function SaveInvoiceSiigo(props) {
    const styles = useStyles();
    const [lisPedidos, setListPedidos] = useState([]);
    const [lisProductosSiigo, setListProductosSiigo] = useState([]);
    const [listDetalleFacturas, setListDetalleFacturas] = useState([]);
    const [numeroPedido, setNumeroPedido] = useState(true);
    const [loading, setLoading] = useState(false);
    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const fechaactual = Moment(new Date()).format("YYYY-MM-DD");
    const [tituloMensajes, setTituloMensajes] = useState("");
    const [numeroFactura, setNumeroFactura] = useState(0);


    //console.log("IMAGEN : ", imagen1)setListPedidos,-
    const abrirCerrarModalMensajes = () => {
        setShowModalMensajes(!showModalMensajes);
    }

    const abrirCerrarModal = () => {
        setShowModalMensajes(true);
    }

    useEffect(() => {
        const newDet = [];
        let contadordos = 0;
        setLoading(true);
        const leeFacturas = async () => {
            await axios({
                method: 'get',
                url: 'https://sitbusiness.co/cyclewear/api/210'
            }).then(res => {
                res.data && res.data.map((facturas, index) => {
                    if (facturas.status != "sent" && facturas.status != "collected")
                        newDet.push(facturas)
                })
                //console.log("FACTURAS : ", newDet);
                setListPedidos(newDet);
                //setListPedidos(res.data);
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

        setLoading(false);
    }, [])

    const crearFacturas = () => {
        //console.log("Productos  : ", lisProductosSiigo);
        console.log("Pedidos  : ", lisPedidos)
        //console.log("Items pedidos  : ", listDetalleFacturas)
        let numfact = 0;
        console.log("FECHA ACTUAL  : ", fechaactual);

        setLoading(true);

        lisPedidos && lisPedidos.map((facturas, index) => {
            let control = 0;
            if (facturas.id_fact == numeroPedido) {

                //var fecha = new Date();
                let date = new Date(facturas.fechafactura);
                //let fecha = String(date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + date.getDate()).padStart(2, '0');
                //contador = contador + 1;

                let valor = 0;
                let valorpayment = 0;
                let valoritem = 0;
                let descuento = 0;
                let idiva = 0;
                let valoriva = 0;

                listDetalleFacturas && listDetalleFacturas.map((items, row) => {
                    control = control + 1;

                    if (items.pedido == facturas.id_fact) {
                        console.log("ITEMS PEDIDOS : ", items)

                        lisProductosSiigo && lisProductosSiigo.map((productos, row) => {
                            if (productos.sku == items.variant_sku) {
                                idiva = productos.idiva;
                                valoriva = 1 + (productos.porcetajeiva / 100);
                            }
                        })

                        //if (items.tipoimpuesto == 745) {

                        //valoritem = (valoritem + (valor - (facturas.descuento * -1))).toFixed(4);
                        valoritem = valoritem + (items.price / 1.19)
                        descuento = 0;
                        /*} else {
                            valoritem = items.price;
                            valoritem = (items.price - (facturas.descuento * -1)).toFixed(0);
                            valorpayment = valoritem;
                            descuento = 0;
                        }*/

                    }
                })
                valor = (valoritem * 1.19).toFixed(0);
                valorpayment = valorpayment + facturas.valorfactura;
                valoritem = (valoritem).toFixed(4);

                // descuento = (((items.price-(items.price / 1.19))/items.price)*100).toFixed(4);
                let comentario = "API - " + facturas.id_fact
                const leer = async () => {
                    let params = {
                        id: 1397,
                        date: fechaactual,
                        identification: facturas.idcliente,
                        cost_center: facturas.cost_center,
                        seller: facturas.seller,
                        //code: items.codigoproductosiigo,
                        //description: items.advert_name,
                        //quantity: items.quantity,
                        discount: descuento,
                        price: valoritem,
                        value: valorpayment,
                        idpayments: 7500,
                        due_date: fechaactual,
                        idtaxes: idiva,
                        observations: comentario,
                        pedido: facturas.id_fact,
                        iva: valoriva
                    };
                    console.log("DATOS A FACTURAR : ", params)

                    await axios({
                        method: 'post',
                        url: 'https://sitbusiness.co/cyclewear/api/731', params
                    }).then(res => {
                        let numfact = 0;

                        console.log("DATOS RESPONSE : ", res)
                        console.log("NUMERO FACTURA : ", res.data.id)
                        if (res.data.status == 200) {
                            setNumeroFactura(res.data.id);
                            let mensaje = "Factura de venta N. : " + res.data.id;
                            setTituloMensajes(mensaje)
                            abrirCerrarModal(true);
                        } else {
                            let cadena = res.data.Error;
                            let posicion = cadena.search(':');
                            let valor = cadena.slice(posicion + 1);
                            let inicial = cadena.slice(0, posicion);
                            
                            let mensaje;
                            if (inicial == "The code doesn't exist")
                                mensaje = "Codigo de producto no existe : " + valor;
                            else
                                if (inicial == "The customer doesn't exist")
                                    mensaje = "Tercero no existe : " + valor;
                                else
                                    mensaje = "Error creando factura "

                            setTituloMensajes(mensaje)
                            abrirCerrarModal(true);
                        }
                        setLoading(false);
                    }
                    ).catch(function (error) {
                        console.log("ERROR LEYENDO FACTURAS");
                    })
                }
                leer();
            }
        })
    }

    const handleChangePedido = async (selectedOptions) => {
        const newDet = [];
        //console.log("FECHA : ", selectedOptions)
        setNumeroPedido(selectedOptions)
    }

    const columnas = [
        {
            title: 'Ientificaión',
            field: 'idcliente'
        },

        {
            title: 'Pedido',
            field: 'id_fact'
        },
        {
            title: 'Fecha',
            field: 'fechafactura'
        },
        {
            title: 'Nombre',
            field: 'nombre'
        },
        {
            title: 'Apellido',
            field: 'apellido'
        },
        {
            title: 'Email',
            field: 'email'
        },
        {
            title: 'Ciudad',
            field: 'ciudad'
        },
        {
            title: 'Dirección',
            field: 'direccion'
        },
        {
            title: 'Total',
            field: 'valorfactura'
        },
        {
            title: 'Estado',
            field: 'status'
        }
    ]

    const mostrarMensaje = (
        <div className="App" >
            <div className={styles.modal2}>
                <h3 className='centratexto'>Factura de venta - CWR</h3>
                <hr />
                <br />
                <h3 className='centratexto'> {tituloMensajes} </h3>
                <br />
                <div align="center">
                    <Button className={styles.button} onClick={() => abrirCerrarModalMensajes()} >Cerrar</Button>
                </div>
            </div>
        </div>
    )

    return (
        <div>

            <br />
            <div className='mb-30 ml-10'>

                <Row>
                    <Col xl={2} lg={2} md={2} xs={2}>
                        <div className='tamañofuentetercero'>
                            Numero pedido:
                        </div>
                    </Col>
                    <Col xl={3} lg={3} md={3} xs={3}>
                        <div className="form-horizontal auth-form">
                            <div>
                                <input
                                    name="pedido"
                                    type="text"
                                    className="form-control"
                                    placeholder="Ingrese número pedido"
                                    id="exampleInputEmail12"
                                    onChange={(e) =>
                                        handleChangePedido(
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
                <Col xl={4} lg={4} md={4} xs={4}>
                </Col>

                <Col xl={3} lg={3} md={3} xs={3}>
                    <button className='botonestercero' color="primary" onClick={crearFacturas}>
                        Crear Facturas
                    </button>
                </Col>
            </Row>
            <hr />
            <Modal
                className='ubicarmodalmensajes'
                open={showModalMensajes}
                onClose={abrirCerrarModalMensajes}
            >
                {mostrarMensaje}
            </Modal>
            {loading ? <Loading /> : null}
            <MaterialTable
                title="Pedidos Cycle Wear"
                columns={columnas}
                data={lisPedidos}
                options={{
                    actionsColumnIndex: 11,
                    headerStyle: { backgroundColor: '#015CAB', fontSize: 16, color: 'white' },
                    rowStyle: rowData => ({
                        backgroundColor: (0 == rowData.idcliente) ? '#6699D0' : '#FFF'
                    })
                }}
            />
            <br />
            <br />
            <br />

        </div>
    );
}

export default SaveInvoiceSiigo;