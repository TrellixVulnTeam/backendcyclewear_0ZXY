import React, { Fragment, useEffect, useState } from 'react';
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Moment from "moment";
import MaterialTable from "material-table";
//import Loading from "../../../components/elements/Loading";
import EditIcon from '@material-ui/icons/Edit';
import EditAttributesIcon from '@material-ui/icons/EditAttributes';
import imagen1 from "../../assets/images/imagenes/bicicleta.jpg";
import Loading from '../elements/Loading/Loading';
import ListarProductos from '../products/physical/ListarProductos';
import { Col, Row } from "reactstrap";
import "./ordenes.css";

function SaveInvoiceSiigo(props) {
    const [lisPedidos, setListPedidos] = useState([]);
    const [lisProductosSiigo, setListProductosSiigo] = useState([]);
    const [listDetalleFacturas, setListDetalleFacturas] = useState([]);
    const [numeroPedido, setNumeroPedido] = useState(true);
    const [loading, setLoading] = useState(false);

    //console.log("IMAGEN : ", imagen1)setListPedidos,-

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
                    if(facturas.status != "sent")
                        newDet.push(facturas)
                })
                //console.log("FACTURAS : ", newDet);
                setListPedidos(newDet);
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
        console.log("Productos  : ", lisProductosSiigo);
        console.log("Pedidos  : ", lisPedidos)
        console.log("Items pedidos  : ", listDetalleFacturas)

        setLoading(true);

        lisPedidos && lisPedidos.map((facturas, index) => {
            let control = 0;
            if (facturas.id_fact == numeroPedido) {

                //var fecha = new Date();
                let date = new Date(facturas.fechafactura);
                let fecha = String(date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + date.getDate()).padStart(2, '0');
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
                        date: fecha,
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
                        due_date: fecha,
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
        setLoading(false);
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

    const seleccionarPedido = (pedido, caso) => {
		console.log("PEDIDO : ", pedido);
    }

    return (
        <div>
            {loading ? <Loading /> : null}
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
        </div>
    );
}

export default SaveInvoiceSiigo;