import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../common/breadcrumb";
import "react-toastify/dist/ReactToastify.css";
import MaterialTable from "material-table";
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Col,
	Container,
	Form,
	FormGroup,
	Input,
	Label,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Row,
} from "reactstrap";

const ProductType = () => {
	const [open, setOpen] = useState(false);
	const [listTiposProductos, setListTiposProductos] = useState([]);

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
		setListTiposProductos(data.vgl_tiposproductos);
		console.log("TIPOS DE PRODUCTOS : ", data.vgl_tiposproductos)
	}, []);

	const seleccionarOrden = (orden, caso) => {
	
	}
/*
,
            headerStyle: {
                backgroundColor: '#0277bd'
            }
*/
	const columnas = [
		{
			field: 'id',
			title: 'ID Tipo',
			cellStyle: { minWidth: 50 }
		},
		{
			field: 'nombretipoproducto',
			title: 'Nombre tipo producto',
			cellStyle: { minWidth: 150 }
		},
		{
			field: 'descripcion',
			title: 'Descripción',
			cellStyle: { minWidth: 300 }
		},
		{
			field: 'nombreestado',
			title: 'Estado',
			cellStyle: { minWidth: 50 }
		}
	]

	return (
		<Fragment>
			<Breadcrumb title="Tipos de Productos" parent="Physical" />
			{/* <!-- Container-fluid starts--> */}
			<Container fluid={true}>
				<Row>
					<Col sm="12">
						<Card>
							<CardHeader>
								<h5>Listar Tipos de Productos</h5>
							</CardHeader>
							<CardBody>
								<div className="btn-popup pull-right">
									<Button
										type="button"
										color="primary"
										onClick={onOpenModal}
										data-toggle="modal"
										data-original-title="test"
										data-target="#exampleModal"
									>
										Crear Tipos de Productos
									</Button>
									<Modal isOpen={open} toggle={onCloseModal}>
										<ModalHeader toggle={onCloseModal}>
											<h5
												className="modal-title f-w-600"
												id="exampleModalLabel2"
											>
												Agregar Producto
											</h5>
										</ModalHeader>
										<ModalBody>
											<Form>
												<FormGroup>
													<Label
														htmlFor="recipient-name"
														className="col-form-label"
													>
														Nombre Tipo Producto :
													</Label>
													<Input type="text" className="form-control" />
												</FormGroup>
												<FormGroup>
												<Label
														htmlFor="recipient-name"
														className="col-form-label"
													>
														Descripción del Tipo Producto :
													</Label>
													<Input type="text" className="form-control" />
												
												</FormGroup>
											</Form>
										</ModalBody>
										<ModalFooter>
											<Button
												type="button"
												color="primary"
												onClick={() => onCloseModal("VaryingMdo")}
											>
												Grabar
											</Button>
											<Button
												type="button"
												color="secondary"
												onClick={() => onCloseModal("VaryingMdo")}
											>
												Cerrar
											</Button>
										</ModalFooter>
									</Modal>
								</div>
								<div className="clearfix"></div>
								<div id="basicScenario" className="product-physical">
									<MaterialTable
										columns={columnas}
										data={listTiposProductos}
										fontSize={16}
										title="TIPOS DE PRODUCTOS"
										actions={[
											{
												icon: EditIcon,
												tooltip: 'Editar Tipo Producto',
												onClick: (event, rowData) => seleccionarOrden(rowData, "Editar")
											},
											{
												icon: CancelIcon,
												tooltip: 'Inactivar Tipo Producto',
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
					</Col>
				</Row>
			</Container>
			{/* <!-- Container-fluid Ends--> */}
		</Fragment>
	);
};

export default ProductType;