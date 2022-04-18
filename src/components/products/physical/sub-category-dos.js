import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../common/breadcrumb";
import { Modal, Button, Card, CardBody, CardHeader, Col, Container, Row, ModalHeader, ModalBody, Form, FormGroup, Label, Input, ModalFooter } from "reactstrap";
import MaterialTable from "material-table";
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';

const Sub_category_dos = () => {
	const [open, setOpen] = useState(false);
	const [listCategoriasTres, setListCategoriasTres] = useState([]);

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
		setListCategoriasTres(data.vgl_categoriasTres);
		//console.log("CATEGORIAS DE PRODUCTOS : ", data.vgl_categorias)
	}, []);

	const seleccionarOrden = (orden, caso) => {

	}

	const columnas = [
		{
			field: 'id',
			title: 'ID SubCategoría',
			cellStyle: { minWidth: 50 }
		},
		{
			field: 'nombrecategoriatres',
			title: 'Nombre SubCategoría Dos',
			cellStyle: { minWidth: 150 }
		},
		{
			field: 'nombretipoproducto',
			title: 'Tipo de Producto',
			cellStyle: { minWidth: 150 }
		},
		{
			field: 'nombrecategoriauno',
			title: 'Categoría',
			cellStyle: { minWidth: 150 }
		},
		{
			field: 'nombrecategoriados',
			title: 'Nombre SubCategoría Uno',
			cellStyle: { minWidth: 150 }
		},
		{
			field: 'descripcion',
			title: 'Descripción',
			cellStyle: { minWidth: 200 }
		},
		{
			field: 'nombreestado',
			title: 'Estado',
			cellStyle: { minWidth: 50 }
		}
	]

	return (
		<Fragment>
			<Breadcrumb title="SubCategoría Tres" parent="Physical" />
			{/* <!-- Container-fluid starts--> */}
			<Container fluid={true}>
				<Row>
					<Col sm="12">
						<Card>
							<CardHeader>
								<h5>SubCategoría Tres Productos</h5>
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
										Agregar SubCategoría Tres
									</Button>
									<Modal isOpen={open} toggle={onCloseModal}>
										<ModalHeader toggle={onCloseModal}>
											<h5
												className="modal-title f-w-600"
												id="exampleModalLabel2"
											>
												Agregar Producto Físico
											</h5>
										</ModalHeader>
										<ModalBody>
											<Form>
												<FormGroup>
													<Label
														htmlFor="recipient-name"
														className="col-form-label"
													>
														Nombre Subcategoría :
													</Label>
													<Input type="text" className="form-control" />
												</FormGroup>
												<FormGroup>
													<Label
														htmlFor="message-text"
														className="col-form-label"
													>
														Subcategoría Imagen :
													</Label>
													<Input
														className="form-control"
														id="validationCustom02"
														type="file"
													/>
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
										data={listCategoriasTres}
										fontSize={14}
										title="SUBCATEGORIAS DOS DE PRODUCTOS"
										actions={[
											{
												icon: EditIcon,
												tooltip: 'Editar Categoría',
												onClick: (event, rowData) => seleccionarOrden(rowData, "Editar")
											},
											{
												icon: CancelIcon,
												tooltip: 'Inactivar Categoría',
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
export default Sub_category_dos;
