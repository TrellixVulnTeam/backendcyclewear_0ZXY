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

const Productvariables = () => {
	const [open, setOpen] = useState(false);
	const [listVariablesProductos, setListVariablesProductos] = useState([]);
	const [listVariables, setListVariables] = useState([]);

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
		setListVariablesProductos(data.vgl_variablesproducto);
		console.log("VARIABLES PRODUCTOS : ", data.vgl_variablesproducto)

		const newDet = [];
		data.vgl_variablesproducto && data.vgl_variablesproducto.forEach((row) => {
			//if (Number.parseInt(row.tipoproducto) === Number.parseInt(4)) {
			//	if (Number.parseInt(row.categoriauno) === Number.parseInt(89)) {
					//console.log("TIPO DE PRODUCTO SELECCIONADO ES : ", row.tipodeproducto)
					let variable1 = false;
					let variable2 = false;
					let variable3 = false;
					let variable4 = false;
					let variable5 = false;
					let variable6 = false;
					let variable7 = false;
					let variable8 = false;
					let variable9 = false;
					let variable10 = false;
					let variable11 = false;
					let variable12 = false;
					let variable13 = false;
					let variable14 = false;
					let variable15 = false;
					let variable16 = false;
					let variable17 = false;
					let variable18 = false;
					let variable19 = false;
					let variable20 = false;
					let variable21 = false;
					let variable22 = false;
					let variable23 = false;
					let variable24 = false;

					let dato1 = false;
					let dato2 = false;
					let dato3 = false;
					let dato4 = false;
					let dato5 = false;
					let contador = 0;

					let var1 = false;
					let var2 = false;
					let var3 = false;
					let var4 = false;
					let var5 = false;
					let var6 = false;
					let var7 = false;
					let var8 = false;
					let var9 = false;
					let var10 = false;
					let var11 = false;
					let var12 = false;
					let var13 = false;
					let var14 = false;
					let var15 = false;
					let var16 = false;
					let var17 = false;
					let var18 = false;
					let var19 = false;
					let var20 = false;
					let var21 = false;
					let var22 = false;
					let var23 = false;
					let var24 = false;

					if (Number.parseInt(row.color) === Number.parseInt(1)) {
						variable1 = "Color";
					}

					if (Number.parseInt(row.acoplamiento) === Number.parseInt(1)) {
						variable2 = "Acoplamiento";
					}

					if (Number.parseInt(row.brazodelabiela) === Number.parseInt(1)) {
						variable3 = "Brazo de Labiela";
					}

					if (Number.parseInt(row.descarrilador) === Number.parseInt(1)) {
						variable4 = "Descarrilador";
					}

					if (Number.parseInt(row.diametro) === Number.parseInt(1)) {
						variable5 = "Diametro";
					}

					if (Number.parseInt(row.longitud) === Number.parseInt(1)) {
						variable6 = "Longitud";
					}

					if (Number.parseInt(row.marcoenpulgadas) === Number.parseInt(1)) {
						variable7 = "Marco en Pulgadas";
					}

					if (Number.parseInt(row.material) === Number.parseInt(1)) {
						variable8 = "Material";
					}

					if (Number.parseInt(row.pinones) === Number.parseInt(1)) {
						variable9 = "Piñones";
					}

					if (Number.parseInt(row.pistones) === Number.parseInt(1)) {
						variable10 = "Pistones";
					}

					if (Number.parseInt(row.relacion) === Number.parseInt(1)) {
						variable11 = "Relación";
					}

					if (Number.parseInt(row.relaciondelcassette) === Number.parseInt(1)) {
						variable12 = "Relacion del Cassette";
					}

					if (Number.parseInt(row.rosca) === Number.parseInt(1)) {
						variable13 = "Rosca";
					}

					if (Number.parseInt(row.sabor) === Number.parseInt(1)) {
						variable14 = "Sabor";
					}

					if (Number.parseInt(row.sexo) === Number.parseInt(1)) {
						variable15 = "Sexo";
					}

					if (Number.parseInt(row.talla) === Number.parseInt(1)) {
						variable17 = "Talla";
					}

					if (Number.parseInt(row.tallabandana) === Number.parseInt(1)) {
						variable18 = "Tallabandana";
					}

					if (Number.parseInt(row.tallaencentimetros) === Number.parseInt(1)) {
						variable19 = "Talla en Centimetros";
					}

					if (Number.parseInt(row.tallaguantes) === Number.parseInt(1)) {
						variable20 = "Talla Guantes";
					}

					if (Number.parseInt(row.tallajersey) === Number.parseInt(1)) {
						variable21 = "Talla Jersey";
					}

					if (Number.parseInt(row.tallamedias) === Number.parseInt(1)) {
						variable22 = "Talla Medias";
					}

					if (Number.parseInt(row.tallapantaloneta) === Number.parseInt(1)) {
						variable23 = "Talla Pantaloneta";
					}

					if (Number.parseInt(row.tamanoaccesorio) === Number.parseInt(1)) {
						variable24 = "Tamaño Accesorio";
					}

					if(variable1  && !var1){ dato1 = variable1; var1 = true } else
					if(variable2  && !var2){ dato1 = variable2; var2 = true } else
					if(variable3  && !var3){dato1 = variable3; var3 = true } else
					if(variable4  && !var4){dato1 = variable4; var4 = true } else				
					if(variable5  && !var5){dato1 = variable5; var5 = true } else
					if(variable6  && !var6){dato1 = variable6; var6 = true } else
					if(variable7  && !var7){dato1 = variable7; var7 = true } else
					if(variable8  && !var8){dato1 = variable8; var8 = true } else
					if(variable9  && !var9){dato1 = variable9; var9 = true } else
					if(variable10 && !var10){dato1 = variable10; var10 = true } else
					if(variable11 && !var11){dato1 = variable11; var11 = true } else
					if(variable12 && !var12){dato1 = variable12; var12 = true } else
					if(variable13 && !var13){dato1 = variable13; var13 = true } else
					if(variable14 && !var14){dato1 = variable14; var14 = true } else
					if(variable15 && !var15){dato1 = variable15; var15 = true } else
					if(variable16 && !var16){dato1 = variable16; var16 = true } else
					if(variable17 && !var17){dato1 = variable17; var17 = true } else
					if(variable18 && !var18){dato1 = variable18; var18 = true } else
					if(variable19 && !var19){dato1 = variable19; var19 = true } else
					if(variable20 && !var20){dato1 = variable20; var20 = true } else
					if(variable21 && !var21){dato1 = variable21; var21 = true } else
					if(variable22 && !var22){dato1 = variable22; var22 = true } else
					if(variable23 && !var23){dato1 = variable23; var23 = true } else
					if(variable24 && !var24){dato1 = variable24; var24 = true } else
					  dato1 = "";

					  if(variable1  && !var1){ dato2 = variable1; var1 = true } else
					  if(variable2  && !var2){ dato2 = variable2; var2 = true } else
					  if(variable3  && !var3){dato2 = variable3; var3 = true } else
					  if(variable4  && !var4){dato2 = variable4; var4 = true } else				
					  if(variable5  && !var5){dato2 = variable5; var5 = true } else
					  if(variable6  && !var6){dato2 = variable6; var6 = true } else
					  if(variable7  && !var7){dato2 = variable7; var7 = true } else
					  if(variable8  && !var8){dato2 = variable8; var8 = true } else
					  if(variable9  && !var9){dato2 = variable9; var9 = true } else
					  if(variable10 && !var10){dato2 = variable10; var10 = true } else
					  if(variable11 && !var11){dato2 = variable11; var11 = true } else
					  if(variable12 && !var12){dato2 = variable12; var12 = true } else
					  if(variable13 && !var13){dato2 = variable13; var13 = true } else
					  if(variable14 && !var14){dato2 = variable14; var14 = true } else
					  if(variable15 && !var15){dato2 = variable15; var15 = true } else
					  if(variable16 && !var16){dato2 = variable16; var16 = true } else
					  if(variable17 && !var17){dato2 = variable17; var17 = true } else
					  if(variable18 && !var18){dato2 = variable18; var18 = true } else
					  if(variable19 && !var19){dato2 = variable19; var19 = true } else
					  if(variable20 && !var20){dato2 = variable20; var20 = true } else
					  if(variable21 && !var21){dato2 = variable21; var21 = true } else
					  if(variable22 && !var22){dato2 = variable22; var22 = true } else
					  if(variable23 && !var23){dato2 = variable23; var23 = true } else
					  if(variable24 && !var24){dato2 = variable24; var24 = true } else
					  dato2 = "";

					  if(variable1  && !var1){ dato3 = variable1; var1 = true } else
					  if(variable2  && !var2){ dato3 = variable2; var2 = true } else
					  if(variable3  && !var3){dato3 = variable3; var3 = true } else
					  if(variable4  && !var4){dato3 = variable4; var4 = true } else				
					  if(variable5  && !var5){dato3 = variable5; var5 = true } else
					  if(variable6  && !var6){dato3 = variable6; var6 = true } else
					  if(variable7  && !var7){dato3 = variable7; var7 = true } else
					  if(variable8  && !var8){dato3 = variable8; var8 = true } else
					  if(variable9  && !var9){dato3 = variable9; var9 = true } else
					  if(variable10 && !var10){dato3 = variable10; var10 = true } else
					  if(variable11 && !var11){dato3 = variable11; var11 = true } else
					  if(variable12 && !var12){dato3 = variable12; var12 = true } else
					  if(variable13 && !var13){dato3 = variable13; var13 = true } else
					  if(variable14 && !var14){dato3 = variable14; var14 = true } else
					  if(variable15 && !var15){dato3 = variable15; var15 = true } else
					  if(variable16 && !var16){dato3 = variable16; var16 = true } else
					  if(variable17 && !var17){dato3 = variable17; var17 = true } else
					  if(variable18 && !var18){dato3 = variable18; var18 = true } else
					  if(variable19 && !var19){dato3 = variable19; var19 = true } else
					  if(variable20 && !var20){dato3 = variable20; var20 = true } else
					  if(variable21 && !var21){dato3 = variable21; var21 = true } else
					  if(variable22 && !var22){dato3 = variable22; var22 = true } else
					  if(variable23 && !var23){dato3 = variable23; var23 = true } else
					  if(variable24 && !var24){dato3 = variable24; var24 = true } else
					  dato3 = "";
					
					  if(variable1  && !var1){ dato4 = variable1; var1 = true } else
					  if(variable2  && !var2){ dato4 = variable2; var2 = true } else
					  if(variable3  && !var3){dato4 = variable3; var3 = true } else
					  if(variable4  && !var4){dato4 = variable4; var4 = true } else				
					  if(variable5  && !var5){dato4 = variable5; var5 = true } else
					  if(variable6  && !var6){dato4 = variable6; var6 = true } else
					  if(variable7  && !var7){dato4 = variable7; var7 = true } else
					  if(variable8  && !var8){dato4 = variable8; var8 = true } else
					  if(variable9  && !var9){dato4 = variable9; var9 = true } else
					  if(variable10 && !var10){dato4 = variable10; var10 = true } else
					  if(variable11 && !var11){dato4 = variable11; var11 = true } else
					  if(variable12 && !var12){dato4 = variable12; var12 = true } else
					  if(variable13 && !var13){dato4 = variable13; var13 = true } else
					  if(variable14 && !var14){dato4 = variable14; var14 = true } else
					  if(variable15 && !var15){dato4 = variable15; var15 = true } else
					  if(variable16 && !var16){dato4 = variable16; var16 = true } else
					  if(variable17 && !var17){dato4 = variable17; var17 = true } else
					  if(variable18 && !var18){dato4 = variable18; var18 = true } else
					  if(variable19 && !var19){dato4 = variable19; var19 = true } else
					  if(variable20 && !var20){dato4 = variable20; var20 = true } else
					  if(variable21 && !var21){dato4 = variable21; var21 = true } else
					  if(variable22 && !var22){dato4 = variable22; var22 = true } else
					  if(variable23 && !var23){dato4 = variable23; var23 = true } else
					  if(variable24 && !var24){dato4 = variable24; var24 = true } else
					  dato4 = "";	

					  if(variable1  && !var1){ dato5 = variable1; var1 = true } else
					  if(variable2  && !var2){ dato5 = variable2; var2 = true } else
					  if(variable3  && !var3){dato5 = variable3; var3 = true } else
					  if(variable4  && !var4){dato5 = variable4; var4 = true } else				
					  if(variable5  && !var5){dato5 = variable5; var5 = true } else
					  if(variable6  && !var6){dato5 = variable6; var6 = true } else
					  if(variable7  && !var7){dato5 = variable7; var7 = true } else
					  if(variable8  && !var8){dato5 = variable8; var8 = true } else
					  if(variable9  && !var9){dato5 = variable9; var9 = true } else
					  if(variable10 && !var10){dato5 = variable10; var10 = true } else
					  if(variable11 && !var11){dato5 = variable11; var11 = true } else
					  if(variable12 && !var12){dato5 = variable12; var12 = true } else
					  if(variable13 && !var13){dato5 = variable13; var13 = true } else
					  if(variable14 && !var14){dato5 = variable14; var14 = true } else
					  if(variable15 && !var15){dato5 = variable15; var15 = true } else
					  if(variable16 && !var16){dato5 = variable16; var16 = true } else
					  if(variable17 && !var17){dato5 = variable17; var17 = true } else
					  if(variable18 && !var18){dato5 = variable18; var18 = true } else
					  if(variable19 && !var19){dato5 = variable19; var19 = true } else
					  if(variable20 && !var20){dato5 = variable20; var20 = true } else
					  if(variable21 && !var21){dato5 = variable21; var21 = true } else
					  if(variable22 && !var22){dato5 = variable22; var22 = true } else
					  if(variable23 && !var23){dato5 = variable23; var23 = true } else
					  if(variable24 && !var24){dato5 = variable24; var24 = true } else
					  dato5 = "";	

					let item = {
						id: row.id,
						tipoproducto: row.tipoproducto,
						nombrecategoriados: row.nombrecategoriados,
						nombretipoproducto: row.nombretipoproducto,
						categoriauno: row.categoriauno,
						nombrecategoriauno: row.nombrecategoriauno,
						categoriados: row.categoriados,
						nombrecategoriados: row.nombrecategoriados,
						categoriatres: row.categoriatres,
						nombrecategoriatres: row.nombrecategoriatres,
						variable1: dato1,
						variable2: dato2,
						variable3: dato3,
						variable4: dato4,
						variable5: dato5
					};
					newDet.push(item);
				//}
			//}
		});
		console.log("NEW DET : ", newDet)
		setListVariables(newDet);
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
			field: 'nombretipoproducto',
			title: 'Tipo Producto',
			cellStyle: { minWidth: 50 },
			cellStyle: { maxWidth: 50 }
		},
		{
			field: 'nombrecategoriauno',
			title: 'Categoría',
			cellStyle: { minWidth: 50 }
		},
		{
			field: 'nombrecategoriados',
			title: 'SubCategoría',
			cellStyle: { minWidth: 50 }
		},
		{
			field: 'nombrecategoriatres',
			title: 'SubCategoría Tres',
			cellStyle: { minWidth: 50 }
		},
		{
			field: 'variable1',
			title: 'Variable1',
			cellStyle: { minWidth: 50 }
		},
		{
			field: 'variable2',
			title: 'Variable2',
			cellStyle: { minWidth: 50 }
		},
		{
			field: 'variable3',
			title: 'Variable3',
			cellStyle: { minWidth: 50 }
		},
		{
			field: 'variable4',
			title: 'Variable4',
			cellStyle: { minWidth: 50 }
		},
		{
			field: 'variable5',
			title: 'Variable5',
			cellStyle: { minWidth: 50 }
		}
	]

	return (
		<Fragment>
			<Breadcrumb title="Variables por Productos" parent="Physical" />
			{/* <!-- Container-fluid starts--> */}
			<Container fluid={true}>
				<Row>
					<Col sm="12">
						<Card>
							<CardHeader>
								<h5>Variables por Productos</h5>
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
										Variables por Productos
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
										data={listVariables}
										fontSize={14}
										title="VARIABLES POR PRODUCTO"
										actions={[
											{
												icon: EditIcon,
												tooltip: 'Editar Variables',
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
											headerStyle: { backgroundColor: '#015CAB', fontSize: 13, color: 'white' },
											rowStyle: {
												fontSize: 13,
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

export default Productvariables;