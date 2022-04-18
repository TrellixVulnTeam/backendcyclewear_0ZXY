import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../common/breadcrumb";
import data from "../../assets/data/listVendor";
import Datatable from "../common/datatable";
import MaterialTable from "material-table";
import { Card, CardBody, CardHeader, Container } from "reactstrap";
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';

const List_customers = () => {
	const [open, setOpen] = useState(false);
	const [listClientes, setListClientes] = useState([]);

	const onOpenModal = () => {
		setOpen(true);
	};

	const onCloseModal = () => {
		setOpen(false);
	};

	useEffect(() => {
		let data = JSON.parse(localStorage.getItem('datosentorno'));
		//console.log("DATA PROVEEDORES: ", JSON.parse(data))
		//console.log("DATA UNO : ", data.vgl_condicionproducto);
		setListClientes(data.vgl_clientes);
		//console.log("CLIENTES : ", data.vgl_categorias)
	}, []);

	const seleccionarOrden = (orden, caso) => {

	}

	const columnas = [
		{
			field: 'identificacion',
			title: 'Identificación',
			cellStyle: { minWidth: 50 }
		},
		{
			field: 'tipoidentificacion',
			title: 'Tipo',
			cellStyle: { minWidth: 50 }
		},
		{
			field: 'primernombre',
			title: 'Primer Nombre',
			cellStyle: { minWidth: 50 }
		},
		{
			field: 'segundonombre',
			title: 'Segundo Nombre',
			cellStyle: { minWidth: 50 }
		},
		{
			field: 'primerapellido',
			title: 'Primer Apellido',
			cellStyle: { minWidth: 50 }
		},
		{
			field: 'segundoapellido',
			title: 'Segundo Apellido',
			cellStyle: { minWidth: 50 }
		},
		{
			field: 'direccion',
			title: 'Dirección',
			cellStyle: { minWidth: 150 }
		}
	]

	return (
		<Fragment>
			<Breadcrumb title="Listar Clientes" parent="Customer" />
			<Container fluid={true}>
				<Card>
					<CardHeader>
						<h5>Información Clientes</h5>
					</CardHeader>
					<CardBody>
						<div className="clearfix"></div>
						<div
							id="batchDelete"
							className="category-table user-list order-table coupon-list-delete"
						>
							<MaterialTable
								columns={columnas}
								data={listClientes}
								fontSize={14}
								title="CLIENTES"
								actions={[
									{
										icon: EditIcon,
										tooltip: 'Editar Cliente',
										onClick: (event, rowData) => seleccionarOrden(rowData, "Editar")
									},
									{
										icon: CancelIcon,
										tooltip: 'Inactivar Cliente',
										onClick: (event, rowData) => seleccionarOrden(rowData, "Cancelar")
									}
								]}
								options={{
									actionsColumnIndex: 11,
									headerStyle: { backgroundColor: '#015CAB', fontSize: 14, color: 'white' },
									rowStyle: {
										fontSize: 14,
									}
								}}
								localization={{
									header: {
										actions: "Acciones"
									}
								}}
							/>
						</div>
					</CardBody>
				</Card>
			</Container>
		</Fragment>
	);
};

export default List_customers;
