import React, { Fragment, useEffect, useState } from 'react';
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import MaterialTable from "material-table";
import axios from "axios";
import Breadcrumb from "../common/breadcrumb";
import data from "../../assets/data/orders";
import Datatable from "../common/datatable";
import {
	Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row, Button, Modal, ModalFooter,
	ModalHeader, ModalBody
} from "reactstrap";
import swal from "sweetalert";
import Loading from '../elements/Loading/Loading';
import EditIcon from '@material-ui/icons/Edit';
import EditAttributesIcon from '@material-ui/icons/EditAttributes';

const Orders = () => {
	const [lisPedidos, setListPedidos] = useState([]);
	const [pedidoSeleccionado, setPedidoSeleccionado] = useState([]);
	const [lisItemsPedidos, setLisItemsPedidos] = useState([]);
	const [listItemsPedidoSeleccionado, setListItemsPedidoSeleccionado] = useState([]);
	const [modalVariantes, setModalVariantes] = useState(false);

	useEffect(() => {
		const newDet = [];
		let contador = 0;
		let contadordos = 0;

		const leePedidos = async () => {
			//setLoading(true);
			const params = {
				pedido: 0
			}
			//console.log("FECHA ", params);
			await axios({
				method: 'get',
				url: 'https://sitbusiness.co/cyclewear/api/210', params
			}).then(res => {
				//console.log("PEDIDOS : ", res.data)
				setListPedidos(res.data);
			}
			).catch(function (error) {
				console.log("ERROR LEYENDO PEDIDOS");
			})
		}
		leePedidos();
	}, []);

	useEffect(() => {
		const newDet = [];
		let contador = 0;
		let contadordos = 0;

		const leeItemsPedidos = async () => {
			//setLoading(true);
			const params = {
				pedido: 0
			}
			//console.log("FECHA ", params);
			await axios({
				method: 'get',
				url: 'https://sitbusiness.co/cyclewear/api/211', params
			}).then(res => {
				//console.log("PEDIDOS : ", res.data)
				setLisItemsPedidos(res.data);
			}
			).catch(function (error) {
				console.log("ERROR LEYENDO ITEMS PEDIDOS");
			})
		}
		leeItemsPedidos();
	}, []);


	const seleccionarPedido = (pedido, caso) => {
		console.log("PEDIDO : ", pedido);
		setPedidoSeleccionado(pedido);
		console.log("ITEMS PEDIDOS : ", lisItemsPedidos);

		const newDet = [];
		{
			lisItemsPedidos && lisItemsPedidos.map((row, index) => {
				{
					//console.log("INTERNO VARIANTE : ", variante.idinterno)
					if (pedido.id_fact == row.pedido) {
						let item = {
							advert_code: row.advert_code,
							advert_name: row.advert_name,
							brand_name: row.brand_name,
							codigoproductosiigo: row.codigoproductosiigo,
							direccion: row.direccion,
							itempedido: row.itempedido,
							observaciones: row.observaciones,
							pedido: row.pedido,
							price: row.price,
							quantity: row.quantity,
							subtotal: row.subtotal,
							tax_total: row.tax_total,
							taxon_name: row.taxon_name,
							total: row.total,
							variant_barcode: row.variant_barcode,
							variant_name: row.variant_name,
							variant_sku: row.variant_sku
						};
						newDet.push(item);
					}
				}
			})
		}
		console.log("NUEVO ARREGLO VARIANTE : ", newDet);
		setListItemsPedidoSeleccionado(newDet);

		(caso === "Pedido") ? abrirCerrarModalVariantes() : abrirCerrarModalVariantes()
	}

	const abrirCerrarModalVariantes = () => {
		setModalVariantes(!modalVariantes);
	}

	const grabarVariantes = () => {

		console.log("DATOS VARIANTEs : ", listItemsPedidoSeleccionado)
	}

	const columnas = [
		{
			title: 'Id Pedido',
			field: 'id_fact'
		},
		{
			title: 'Id Siigo',
			field: 'id_siigo'
		},
		{
			title: 'Factura Siigo',
			field: 'facturasiigo'
		},
		{
			title: 'Fecha Pedido',
			field: 'fechafactura'
		},
		{
			title: 'Id Cliente',
			field: 'idcliente'
		},
		{
			title: 'Valor Factura',
			field: 'valorfactura'
		},
		{
			title: 'Descuento',
			field: 'descuento'
		},
		{
			title: 'Observacion',
			field: 'observaciones'
		},

	]

	const itemspedidos = [
		{
			title: 'Item Pedido',
			field: 'itempedido'
		},
		{
			title: 'AdvertName',
			field: 'advert_code'
		},
		{
			title: 'AdvertCode',
			field: 'advert_code'
		},
		{
			title: 'Marca',
			field: 'brand_name'
		},
		{
			title: 'Valor',
			field: 'subtotal'
		},
		{
			title: 'Cantidad',
			field: 'quantity'
		},
		{
			title: 'Nombre Variante',
			field: 'variant_name'
		},
		{
			title: 'Codio de Barra',
			field: 'variant_barcode'
		},
		{
			title: 'SKU',
			field: 'variant_sku'
		},
		{
			title: 'CodigoSiigo',
			field: 'codigoproductosiigo'
		},
		{
			title: 'Direccion',
			field: 'direccion'
		},
	]

	return (
		<Fragment>
			<Breadcrumb title="Pedidos Bike Exchange" parent="Sales" />
			<Container fluid={true}>
				<MaterialTable
					title="Pedidos Cycle Wear"
					columns={columnas}
					data={lisPedidos}
					actions={[
						{
							icon: EditIcon,
							tooltip: 'Editar Producto',
							onClick: (event, rowData) => seleccionarPedido(rowData, "Pedido")
						},
						{
							icon: EditAttributesIcon,
							tooltip: 'Variante Producto',
							onClick: (event, rowData) => seleccionarPedido(rowData, "Variante")
						}
					]}
					options={{
						actionsColumnIndex: 11,
						headerStyle: { backgroundColor: '#015CAB', fontSize: 16, color: 'white' },
						rowStyle: {
							fontSize: 14,
						}
					}}
				/>
				<Modal className="modalitemspedidos" isOpen={modalVariantes} toggle={abrirCerrarModalVariantes}>
					<ModalHeader
						toggle={abrirCerrarModalVariantes}>
						<div className="centrartextomodalvariantes">
							CONSULTAR ITEMS PEDIDOS
						</div>
					</ModalHeader>
					<ModalBody>
						<MaterialTable
							title="PEDIDOS CYCLE WEAR"
							columns={itemspedidos}
							data={listItemsPedidoSeleccionado}
							editable={{

								onRowUpdate: (newData, oldData) =>
									new Promise((resolve, reject) => {
										setTimeout(() => {
											const dataUpdate = [...listItemsPedidoSeleccionado];
											const index = oldData.tableData.id;
											dataUpdate[index] = newData;
											setListItemsPedidoSeleccionado([...dataUpdate]);

											resolve();
										}, 1000)
									}),

							}}
							options={{
								actionsColumnIndex: 11,
								headerStyle: { backgroundColor: '#015CAB', fontSize: 14, color: 'white' },
								rowStyle: {
									fontSize: 13,
								}
							}}
						/>
					</ModalBody>
					<ModalFooter>
						<Button color="primary" onClick={grabarVariantes}>Grabar cambios</Button>
					</ModalFooter>
				</Modal>
			</Container>
		</Fragment>
	);
};

export default Orders;
