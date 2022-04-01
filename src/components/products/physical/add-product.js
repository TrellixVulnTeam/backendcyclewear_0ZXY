import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../common/breadcrumb";
import CKEditors from "react-ckeditor-component";
import { useDispatch, useSelector } from "react-redux";
import { obtenerProveedoresAccion } from "../../../store/Interlocutores/Proveedores";
import { obtenerCondicionProductoAccion } from "../../../store/CondicionProducto/CondicionProducto";
import {
	Card,
	CardBody,
	CardHeader,
	Col,
	Container,
	Form,
	FormGroup,
	Input,
	Label,
	Row,
	Button,
} from "reactstrap";
import one from "../../../assets/images/pro3/1.jpg";
import user from "../../../assets/images/user.png";

const Add_product = ({ afterPaste, onBlur, onChange }) => {
	const dispatch = useDispatch();
	const [idProducto, setIdProducto] = useState(0);
	const [proveedor, setProveedor] = useState(0);
	const [condicionProducto, setCondicionProducto] = useState(0);
	const [tipoCliente, setTipoCliente] = useState(0);
	const [sexo, setSexo] = useState(0);
	const [tiposProductos, setTiposProductos] = useState(0);

	const [categorias, setCategorias] = useState(0);
	const [categoriasDos, setCategoriasDos] = useState(0);
	const [categoriasTres, setCategoriasTres] = useState(0);

	const [quantity, setQuantity] = useState(1);

	const [listProveedores, setListProveedores] = useState([]);
	const [listCondicionProducto, setListCondicionProducto] = useState([]);
	const [listtipocliente, setListTipoCliente] = useState([]);
	const [listSexo, setListSexo] = useState([]);
	const [listTiposProductos, setListTiposProductos] = useState([]);
	
	const [listCategorias, setListCategorias] = useState([]);
	const [listCategoriasSeleccionadas, setListCategoriasSeleccionadas] = useState([]);

	const [listCategoriasDos, setListCategoriasDos] = useState([]);
	const [listCategoriasDosSeleccionadas, setListCategoriasDosSeleccionadas] = useState([]);

	const [listCategoriasTres, setListCategoriasTres] = useState([]);
	const [listCategoriasTresSeleccionadas, setListCategoriasTresSeleccionadas] = useState([]);

	const [file, setFile] = useState();
	const [dummyimgs, setDummyimgs] = useState([
		{ img: user },
		{ img: user },
		{ img: user },
		{ img: user },
		{ img: user },
		{ img: user },
	]);

	useEffect(() => {
		let data = JSON.parse(localStorage.getItem('datosentorno'));
		//console.log("DATA PROVEEDORES: ", JSON.parse(data))
		//console.log("DATA UNO : ", data.vgl_condicionproducto);
		setListProveedores(data.vgl_proveedores);
		setListCondicionProducto(data.vgl_condicionproducto);
		setTipoCliente(data.vgl_tiposcliente);
		setListSexo(data.vgl_sexo);
		setListTiposProductos(data.vgl_tiposproductos);
		setListCategorias(data.vgl_categorias);
		setListCategoriasDos(data.vgl_categoriasDos);
		setListCategoriasTres(data.vgl_categoriasTres);
	}, []);

	const handleChangeIDProducto = (selectedOptions) => {
		setIdProducto(selectedOptions)
	};

	const handleChangeIDProveedor = (selectedOptions) => {
		setProveedor(selectedOptions)
	};

	const handleChangeCondicionProducto = (selectedOptions) => {
		setCondicionProducto(selectedOptions)
	};

	const handleChangeSexo = (selectedOptions) => {
		setSexo(selectedOptions)
		//console.log("SEXO : ", selectedOptions)
	};

	const handleChangeTiposProductos = (selectedOptions) => {
		setTiposProductos(selectedOptions)
		//console.log("CATEGORIAS DE  PRODUCTOS : ", listCategorias)
		const newDet = [];
		listCategorias.forEach((row) => {
			if (Number.parseInt(row.tipodeproducto) === Number.parseInt(selectedOptions)) {
			//console.log("TIPO DE PRODUCTO SELECCIONADO ES : ", row.tipodeproducto)
			let item = {
				id: row.id,
				nombrecategoriauno: row.nombrecategoriauno,
				descripcion: row.descripcion,
				tipodeproducto: row.tipodeproducto,
				empresa: row.empresa,
				estado: row.estado,
				label: row.nombrecategoriauno,
				value: row.id
			  };
			  newDet.push(item);
			}
		});
		setListCategoriasSeleccionadas(newDet);
		//console.log("TIPOS PRODUCTOS : ", selectedOptions)
	};

	const handleChangeCategorias = (selectedOptions) => {
		setCategorias(selectedOptions)
		console.log("CATEGORIA UNO SELECCIONADA : ",selectedOptions )
		const newDet = [];
		listCategoriasDos.forEach((row) => {
			if (Number.parseInt(row.categoriauno) === Number.parseInt(selectedOptions)) {
			//console.log("TIPO DE PRODUCTO SELECCIONADO ES : ", row.tipodeproducto)
			let item = {
				id: row.id,
				nombrecategoriados: row.nombrecategoriados,
				descripcion: row.descripcion,
				categoriauno: row.categoriauno,
				empresa: row.empresa,
				estado: row.estado,
				label: row.nombrecategoriados,
				value: row.id
			  };
			  newDet.push(item);
			}
		});
		setListCategoriasDosSeleccionadas(newDet);
	};

	const handleChangeCategoriasDos = (selectedOptions) => {
		setCategoriasDos(selectedOptions)
		console.log("CATEGORIA DOS SELECCIONADA : ",selectedOptions )
		const newDet = [];
		listCategoriasTres.forEach((row) => {
			if (Number.parseInt(row.categoriados) === Number.parseInt(selectedOptions)) {
			//console.log("TIPO DE PRODUCTO SELECCIONADO ES : ", row.tipodeproducto)
			let item = {
				id: row.id,
				nombrecategoriatres: row.nombrecategoriatres,
				descripcion: row.descripcion,
				categoriados: row.categoriados,
				empresa: row.empresa,
				estado: row.estado,
				label: row.nombrecategoriatres,
				value: row.id
			  };
			  newDet.push(item);
			}
		});
		setListCategoriasTresSeleccionadas(newDet);
	};

	const handleChangeCategoriasTres = (selectedOptions) => {
		setCategorias(selectedOptions)
	};

	const IncrementItem = () => {
		if (quantity < 9) {
			setQuantity(quantity + 1);
		} else {
			return null;
		}
	};
	const DecreaseItem = () => {
		if (quantity > 0) {
			setQuantity(quantity - 1);
		} else {
			return null;
		}
	};
	const handleChange = (event) => {
		setQuantity(event.target.value);
	};

	//	image upload

	const _handleImgChange = (e, i) => {
		e.preventDefault();
		let reader = new FileReader();
		const image = e.target.files[0];
		reader.onload = () => {
			dummyimgs[i].img = reader.result;
			setFile({ file: file });
			setDummyimgs(dummyimgs);
		};
		reader.readAsDataURL(image);
	};

	const handleValidSubmit = () => { };
	return (
		<Fragment>
			<Breadcrumb title="Estas en creación de productos" parent="Physical" />

			<Container fluid={true}>
				<Row>
					<Col sm="12">
						<Card>
							<CardHeader>
								<h5>Crear productos</h5>
							</CardHeader>
							<CardBody>
								<Row className="product-adding">
									<Col xl="7">
										<Form
											className="needs-validation add-product-form"
											onSubmit={handleValidSubmit}
										>
											<div className="form form-label-center">
												<FormGroup className="form-group mb-3 row">
													<Label className="col-xl-2 col-sm-4 mb-0">
														ID Producto :
													</Label>
													<div className="col-xl-4 col-sm-7">
														<Input
															className="form-control"
															onClick={(e) =>
																handleChangeIDProducto(
																	e.target
																		.value
																)
															}
															name="idproducto"
															id="idproducto"
															type="text"
															required
														/>
													</div>
													<Label className="col-xl-2 col-sm-4 mb-0">
														Proveedor :
													</Label>
													<div className="col-xl-4 col-sm-7">
														<select
															//disabled="disabled"
															className="form-control digits "
														>
															<option
																selected
																className="select-fontsize ps-form__label"
																onClick={(e) =>
																	handleChangeIDProveedor(
																		e.target
																			.value
																	)
																}
															>
																Seleccione Proveedor
															</option>
															{listProveedores &&
																listProveedores.map(
																	(
																		itemselect
																	) => {
																		return (
																			<option
																				value={
																					itemselect.value
																				}>
																				{
																					itemselect.label
																				}
																			</option>
																		);
																	}
																)}
														</select>
													</div>
												</FormGroup>
												<FormGroup className="form-group mb-3 row">
													<Label className="col-xl-2 col-sm-4 mb-0">
														Condición Producto :
													</Label>
													<div className="col-xl-4 col-sm-7">
														<select
															//disabled="disabled"
															className="form-control digits"
															onClick={(e) =>
																handleChangeCondicionProducto(
																	e.target
																		.value
																)
															}
														>
															<option
																selected
																className="select-fontsize ps-form__label">
																Seleccione Condición
															</option>
															{listCondicionProducto &&
																listCondicionProducto.map(
																	(
																		itemselect
																	) => {
																		return (
																			<option
																				value={
																					itemselect.value
																				}>
																				{
																					itemselect.label
																				}
																			</option>
																		);
																	}
																)}
														</select>
													</div>
													<Label className="col-xl-2 col-sm-4 mb-0">
														Género :
													</Label>
													<div className="col-xl-4 col-sm-7">
														<select
															//disabled="disabled"
															className="form-control digits"
															onClick={(e) =>
																handleChangeSexo(
																	e.target
																		.value
																)
															}
														>
															<option
																selected
																className="select-fontsize ps-form__label">
																Seleccione el género
															</option>
															{listSexo && listSexo.map(
																(
																	itemselect
																) => {
																	return (
																		<option
																			value={
																				itemselect.value
																			}>
																			{
																				itemselect.label
																			}
																		</option>
																	);
																}
															)}
														</select>
													</div>
												</FormGroup>
												<FormGroup className="form-group mb-3 row">
													<Label className="col-xl-2 col-sm-4 mb-0">
														Tipo Producto :
													</Label>
													<div className="col-xl-4 col-sm-7">
														<select
															//disabled="disabled"
															className="form-control digits"
															onClick={(e) =>
																handleChangeTiposProductos(
																	e.target
																		.value
																)
															}
														>
															<option
																selected
																className="select-fontsize ps-form__label">
																Seleccione el tipo de producto
															</option>
															{listTiposProductos && listTiposProductos.map(
																(
																	itemselect
																) => {
																	return (
																		<option
																			value={
																				itemselect.value
																			}>
																			{
																				itemselect.label
																			}
																		</option>
																	);
																}
															)}
														</select>
													</div>
													<Label className="col-xl-2 col-sm-4 mb-0">
														Categoria :
													</Label>
													<div className="col-xl-4 col-sm-7">
														<select
															//disabled="disabled"
															className="form-control digits"
															onClick={(e) =>
																handleChangeCategorias(
																	e.target
																		.value
																)
															}
														>
															<option
																selected
																className="select-fontsize ps-form__label">
																Seleccione categoria del producto
															</option>
															{listCategoriasSeleccionadas && listCategoriasSeleccionadas.map(
																(
																	itemselect
																) => {
																	return (
																		<option
																			value={
																				itemselect.value
																			}>
																			{
																				itemselect.label
																			}
																		</option>
																	);
																}
															)}
														</select>
													</div>
												</FormGroup>
												<FormGroup className="form-group mb-3 row">
													<Label className="col-xl-2 col-sm-4 mb-0">
														Subcategoría Uno:
													</Label>
													<div className="col-xl-4 col-sm-7">
														<select
															//disabled="disabled"
															className="form-control digits"
															onClick={(e) =>
																handleChangeCategoriasDos(
																	e.target
																		.value
																)
															}
														>
															<option
																selected
																className="select-fontsize ps-form__label">
																Seleccione subcategoria del producto
															</option>
															{listCategoriasDosSeleccionadas && listCategoriasDosSeleccionadas.map(
																(
																	itemselect
																) => {
																	return (
																		<option
																			value={
																				itemselect.value
																			}>
																			{
																				itemselect.label
																			}
																		</option>
																	);
																}
															)}
														</select>
													</div>
													<Label className="col-xl-2 col-sm-4 mb-0">
														Subcategoría Dos:
													</Label>
													<div className="col-xl-4 col-sm-7">
														<select
															//disabled="disabled"
															className="form-control digits"
															onClick={(e) =>
																handleChangeCategoriasTres(
																	e.target
																		.value
																)
															}
														>
															<option
																selected
																className="select-fontsize ps-form__label">
																Seleccione subcategoria del producto
															</option>
															{listCategoriasTresSeleccionadas && listCategoriasTresSeleccionadas.map(
																(
																	itemselect
																) => {
																	return (
																		<option
																			value={
																				itemselect.value
																			}>
																			{
																				itemselect.label
																			}
																		</option>
																	);
																}
															)}
														</select>
													</div>
												</FormGroup>
												<FormGroup className="form-group mb-3 row">
													<Label className="col-xl-2 col-sm-4 mb-0">
														Product Name :
													</Label>
													<div className="col-xl-8 col-sm-7">
														<Input
															className="form-control"
															name="product_name"
															id="validationCustom01"
															type="text"
															required
														/>
													</div>
													<div className="valid-feedback">Looks good!</div>
												</FormGroup>
												<FormGroup className="form-group mb-3 row">
													<Label className="col-xl-3 col-sm-4 mb-0">
														Price :
													</Label>
													<div className="col-xl-8 col-sm-7">
														<Input
															className="form-control mb-0"
															name="price"
															id="validationCustom02"
															type="number"
															required
														/>
													</div>
													<div className="valid-feedback">Looks good!</div>
												</FormGroup>
												<FormGroup className="form-group mb-3 row">
													<Label className="col-xl-3 col-sm-4 mb-0">
														Product Code :
													</Label>
													<div className="col-xl-8 col-sm-7">
														<Input
															className="form-control "
															name="product_code"
															id="validationCustomUsername"
															type="number"
															required
														/>
													</div>
													<div className="invalid-feedback offset-sm-4 offset-xl-3">
														Please choose Valid Code.
													</div>
												</FormGroup>
											</div>
											<Form>
												<FormGroup className="form-group row">
													<Label className="col-xl-3 col-sm-4 mb-0">
														Select Size :
													</Label>
													<div className="col-xl-8 col-sm-7">
														<select
															className="form-control digits"
															id="exampleFormControlSelect1"
														>
															<option>Small</option>
															<option>Medium</option>
															<option>Large</option>
															<option>Extra Large</option>
														</select>
													</div>
												</FormGroup>
												<FormGroup className="form-group row">
													<Label className="col-xl-3 col-sm-4 mb-0">
														Total Products :
													</Label>
													<fieldset className="qty-box ml-0">
														<div className="input-group bootstrap-touchspin">
															<div className="input-group-prepend">
																<Button
																	className="btn btn-primary btn-square bootstrap-touchspin-down"
																	type="button"
																	onClick={DecreaseItem}
																>
																	<i className="fa fa-minus"></i>
																</Button>
															</div>
															<div className="input-group-prepend">
																<span className="input-group-text bootstrap-touchspin-prefix"></span>
															</div>
															<Input
																className="touchspin form-control"
																type="text"
																value={quantity}
																onChange={handleChange}
															/>
															<div className="input-group-append">
																<span className="input-group-text bootstrap-touchspin-postfix"></span>
															</div>
															<div className="input-group-append ml-0">
																<Button
																	className="btn btn-primary btn-square bootstrap-touchspin-up"
																	type="button"
																	onClick={IncrementItem}
																>
																	<i className="fa fa-plus"></i>
																</Button>
															</div>
														</div>
													</fieldset>
												</FormGroup>
												<FormGroup className="form-group row">
													<Label className="col-xl-3 col-sm-4">
														Add Description :
													</Label>
													<div className="col-xl-8 col-sm-7 description-sm">
														<CKEditors
															activeclassName="p10"
															events={{
																blur: onBlur,
																afterPaste: afterPaste,
																change: onChange,
															}}
														/>
													</div>
												</FormGroup>
											</Form>
											<div className="offset-xl-3 offset-sm-4">
												<Button type="submit" color="primary">
													Grabar producto
												</Button>
												<Button type="button" color="light">
													Discard
												</Button>
											</div>
										</Form>
									</Col>
									<Col xl="5">
										<div className="add-product">
											<Row>
												<Col xl="9 xl-50" sm="6 col-9">
													<img
														src={one}
														alt=""
														className="img-fluid tamañofotounocrearproducto image_zoom_1 blur-up lazyloaded"
													/>
												</Col>
											</Row>
											<br />

											<ul className="file-upload-produc" />


											<div>
												{dummyimgs.map((res, i) => {
													return (
														<li key={i}>
															<div className="box-input-file">
																<Input
																	className="upload"
																	type="file"
																	onChange={(e) => _handleImgChange(e, i)}
																/>
																<img
																	alt=""
																	src={res.img}
																	style={{ width: 50, height: 50 }}
																/>
															</div>
														</li>
													);
												})}
											</div>


										</div>
									</Col>
								</Row>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</Fragment>
	);
};

export default Add_product;
