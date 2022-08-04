import React, { Fragment, useState, useEffect } from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import swal from "sweetalert";
import Moment from "moment";
import axios from "axios";

const CreateInterlocutor = () => {
	const [formData, setFormData] = useState(defaultValueForm());
	const [listTiposTerceros, setListTiposTerceros] = useState([]);
	const [listTipoCliente, setListTipoCliente] = useState([]);
	const [listTiposIdentificacion, setListTiposIdentificacion] = useState([]);
	const [listCiudades, setListCiudades] = useState([]);
	const [listTipoRegimen, setListTipoRegimen] = useState([]);
	const [listResponsabilidadFiscal, setListResponsabilidadFiscal] = useState([]);
	const [tipoTercero, setTipoTercero] = useState(0);
	const [tipoCliente, setTipoCliente] = useState(0);
	const [tipoIdentificacion, setTipoIdentificacion] = useState(0);
	const [ciudad, setCiudad] = useState(0);
	const [tipoRegimen, setTipoRegimen] = useState(0);
	const [responsabilidad, setResponsabilidad] = useState(0);
	const fechaactual = Moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

	const handleChangeTipoTercero = (selectedOptions) => {
		setTipoTercero(selectedOptions)
	};

	const handleChangeTipoCliente = (selectedOptions) => {
		setTipoCliente(selectedOptions)
	};

	const handleChangeTipoIdentificacion = (selectedOptions) => {
		setTipoIdentificacion(selectedOptions)
	};

	const handleChangeCiudad = (selectedOptions) => {
		setCiudad(selectedOptions)
	};
	const handleChangeTipoRegimen = (selectedOptions) => {
		setTipoRegimen(selectedOptions)
	};

	const handleChangeResponsabilidad = (selectedOptions) => {
		setResponsabilidad(selectedOptions)
	};

	const onChangeCliente = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	useEffect(() => {
		let data = JSON.parse(localStorage.getItem('datosentorno'));
		setListTiposTerceros(data.vgl_tipointerlocutor);
		setListTipoCliente(data.vgl_tiposcliente);
		setListTiposIdentificacion(data.vgl_tiposidentificacion);
		setListCiudades(data.vgl_ciudades);
		setListTipoRegimen(data.vgl_tipoderegimen);
		setListResponsabilidadFiscal(data.vgl_responsabilidadfiscal);
	}, []);

	const grabarInterlocutor = () => {
		let type = 0;
		let persontype = 0;
		let typeidentification = 0;
		let typeregime = 0;
		let codigocity = 0;
		let codigodpto = 0;
		listTiposTerceros && listTiposTerceros.forEach((row) => {
			if (Number.parseInt(row.id) === Number.parseInt(tipoTercero)) {
				type = row.nombresiigo;
			}
		});

		listTipoCliente && listTipoCliente.forEach((row) => {
			if (Number.parseInt(row.id) === Number.parseInt(tipoTercero)) {
				persontype = row.nombresiigo;
				typeidentification = row.tipoidentificacion;
			}
		});

		listCiudades && listCiudades.forEach((row) => {
			if (Number.parseInt(row.id) === Number.parseInt(ciudad)) {
				codigocity = row.codigo;
				codigodpto = row.departamento;
			}
		});

		listTipoRegimen && listTipoRegimen.forEach((row) => {
			if (Number.parseInt(row.id) === Number.parseInt(tipoRegimen)) {
				typeregime = row.datosiigo;
			}
		});

		const formdata = new FormData();
		formdata.append("tipotercero", tipoTercero);
		formdata.append("tipopersona", tipoCliente);
		formdata.append("tipoidentificacion", tipoIdentificacion);
		formdata.append("identificacion", formData.identificacion);
		formdata.append("digitodeverificacion", formData.digitoverificacion);
		formdata.append("razonsocial", formData.nombrecomercial);
		formdata.append("nombres", formData.nombres);
		formdata.append("apellidos", formData.apellidos);
		formdata.append("nombrecomercial", formData.nombrecomercial);
		formdata.append("sucursal", formData.sucursal);
		formdata.append("estado", 1);
		formdata.append("ciudad", ciudad);
		formdata.append("direccion", formData.direccion);
		formdata.append("indicativo", formData.indicativo);
		formdata.append("telefono", formData.telefono);
		formdata.append("extension", formData.extension);
		formdata.append("nombrescontacto", formData.nombrescontacto);
		formdata.append("apellidoscontacto", formData.apellidoscontacto);
		formdata.append("correocontacto", formData.correocontacto);
		formdata.append("tipoderegimen", tipoRegimen);
		formdata.append("codigoresponsabilidadfiscal", responsabilidad);
		formdata.append("indicativofacturacion", formData.indicativofacturacion);
		formdata.append("telefonofacturacion", formData.telefonofacturacion);
		formdata.append("codigopostalfacturacion", formData.codigopostalfacturacion);
		formdata.append("usuarioasignado", 0);
		formdata.append("observacion", "");
		formdata.append("fechacreacion", fechaactual);
		formdata.append("fechamodificacion", fechaactual);

		//console.log("DATOS FORMDATA : ", formdata);

		fetch("https://sitbusiness.co/cyclewear/api/110", {
			method: "POST",
			body: formdata,
		}).then((response) => {
			if (response) {
				console.log("RESPONSE : ", response)

				if (response.status === 200) {
					swal(
						"CYCLE WEAR",
						"Registro interlocutor realizado de forma correcta!",
						"success",
						{ button: "Aceptar" }
					);
				} else {
					swal(
						"CYCLE WEAR",
						"Se presentaron inconvenientes al grabar el interlocutor, Intenta nuevamente!",
						"warning",
						{ button: "Aceptar" }
					);
				}
			} else {
				console.log("RESPONSE GRABAR Interlocutor : ", response);
			}
		});


		const params = {
			type: type,
			person_type: persontype,
			id_type: "13", //typeidentification,
			identification: "211345631", //formData.identificacion,
			check_digit: formData.digitoverificacion,
			nombre: formData.nombres,
			apellido: formData.apellidos,
			commercial_name: formData.nombrecomercial,
			active: "true",
			vat_responsible: typeregime,
			code: "R-99-PN",
			address: formData.direccion,
			country_code: "Co",
			state_code: codigodpto,
			city_code: codigocity,
			postal_code: formData.codigopostalfacturacion,
			indicative: formData.indicativo,
			number: formData.telefono,
			extension: formData.extension,
			first_name: formData.nombrescontacto,
			last_name: formData.apellidoscontacto,
			email: formData.correocontacto,
			indicative: formData.indicativo,
			number: formData.telefonofacturacion,
			extension: formData.extension
		};

		//console.log("DATOS FORMDATA : ", params);
		//return;
		const creaInt = async () => {
			await axios({
				method: 'post',
				url: 'https://sitbusiness.co/cyclewear/api/101', params
			}).then((res) => {
				console.log("RESPONSE : ", res)

				if (res.data.type === 1) {
					swal(
						"CYCLE WEAR",
						"Registro interlocutor SIIGO de forma correcta!",
						"success",
						{ button: "Aceptar" }
					);
				} else {
					swal(
						"CYCLE WEAR",
						"Error al grabar el interlocutor en SIIGO, Intenta nuevamente!",
						"warning",
						{ button: "Aceptar" }
					);
				}
			}).catch(function (error) {
				console.log("ERROR LEYENDO CONSECUTIVO");
			})
		}
		creaInt();

	}

	const validaIdentificacion = (identificacion) => {
		console.log("DATO IDENTIFICACION : ", formData.identificacion);

		let errors = {};
		let formOk = true;

		if (formData.identificacion) {
			if (!formData.identificacion) {
				swal(
					"CYCLE WEAR",
					"Ingresa tu número de identificación valido!",
					"error",
					{ button: "Aceptar" }
				);

				formOk = false;
				return;
			}

			if (
				formData.identificacion.length < 6 ||
				formData.identificacion.length > 10
			) {
				swal(
					"CYCLE WEAR",
					"La identificación debe contener solo números, longitud minima de 6 y maximo de 10",
					"warning",
					{ button: "Aceptar" }
				);

				formOk = false;
				return;
			}

			let validaidentificacion = formData.identificacion.substr(0, 20);

			let validarid;
			let haycaracterid = false;
			for (var i = 0; i < validaidentificacion.length; i++) {
				validarid = validaidentificacion.substr(i, 1);
				if (
					validarid != 0 &&
					validarid != 1 &&
					validarid != 2 &&
					validarid != 3 &&
					validarid != 4 &&
					validarid != 5 &&
					validarid != 6 &&
					validarid != 7 &&
					validarid != 8 &&
					validarid != 9
				) {
					haycaracterid = true;
					console.log("CARACTER", i, validarid);
				} else console.log("ES UN NUMERO ", i, validarid);
			}

			if (haycaracterid) {
				swal(
					"CYCLE WEAR",
					"Recuerda, La identificación solo debe contener números!",
					"warning",
					{ button: "Aceptar" }
				);

				formOk = false;
				return;
			}
		}
	};

	return (
		<Fragment>
			<Tabs>
				<TabList className="nav nav-tabs tab-coupon">
					<Tab className="nav-link">Cuenta</Tab>
					<Tab className="nav-link">Permisos</Tab>
				</TabList>
				<TabPanel>
					<Form className="needs-validation user-add" onChange={onChangeCliente}>
						<h4>Crear Interlocutor</h4>
						<FormGroup className="form-group mb-3 row">
							<Label className="col-xl-2 col-sm-7 mb-0">
								Tipo tercero :
							</Label>
							<div className="col-xl-4 col-sm-7">
								<select
									className="form-control digits"
									onClick={(e) =>
										handleChangeTipoTercero(
											e.target
												.value
										)
									}
								>
									<option
										selected
										className="select-fontsize ps-form__label"
									>
										Seleccione Proveedor
									</option>
									{listTiposTerceros &&
										listTiposTerceros.map(
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
							<Label className="col-xl-2 col-sm-7 mb-0">
								Tipo cliente :
							</Label>
							<div className="col-xl-4 col-sm-7">
								<select
									className="form-control digits"
									onClick={(e) =>
										handleChangeTipoCliente(
											e.target
												.value
										)
									}
								>
									<option
										selected
										className="select-fontsize ps-form__label"

									>
										Tipo Cliente
									</option>
									{listTipoCliente &&
										listTipoCliente.map(
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
							<Label className="col-xl-2 col-sm-2 mb-0">
								Tipo de Identificación:
							</Label>
							<div className="col-xl-4 col-sm-7">
								<select
									className="form-control digits"
									onClick={(e) =>
										handleChangeTipoIdentificacion(
											e.target
												.value
										)
									}
								>
									<option
										selected
										className="select-fontsize ps-form__label">
										Tipo de Identificación
									</option>
									{listTiposIdentificacion &&
										listTiposIdentificacion.map(
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
								Número de Identificación:
							</Label>
							<div className="col-xl-3 col-sm-7">
								<div className="ps-form__group">
									<input
										className="form-control"
										type="numeric"
										name="identificacion"
										onBlur={(
											e
										) =>
											validaIdentificacion(
												e
													.target
													.value
											)
										}
									/>
								</div>
							</div>
							<div className="col-xl-1 col-sm-7">
								<div className="ps-form__group">
									<input
										className="form-control"
										type="numeric"
										placeholder="DV"
										name="digitoverificacion"
									/>
								</div>
							</div>
						</FormGroup>
						<FormGroup className="row">
							<Label className="col-xl-2 col-md-4 mb-0">
								Nombres
							</Label>
							<div className="col-xl-4 col-sm-7">
								<div className="ps-form__group">
									<input
										className="form-control"
										type="text"
										name="nombres"
									/>
								</div>
							</div>
							<Label className="col-xl-2 col-md-4 mb-0">
								Apellidos
							</Label>
							<div className="col-xl-4 col-sm-7">
								<div className="ps-form__group">
									<input
										className="form-control"
										type="text"
										name="apellidos"
									/>
								</div>
							</div>
						</FormGroup>
						<FormGroup className="row">
							<Label className="col-xl-2 col-md-4 mb-0">
								Nombre comercial
							</Label>
							<div className="col-xl-10 col-sm-7">
								<div className="ps-form__group">
									<input
										className="form-control"
										type="text"
										name="nombrecomercial"

									/>
								</div>
							</div>
						</FormGroup>
						<FormGroup className="row">
							<Label className="col-xl-2 col-md-4 mb-0">
								Codigo de la sucursal
							</Label>
							<div className="col-xl-4 col-sm-7">
								<div className="ps-form__group">
									<input
										className="form-control"
										type="text"
										name="sucursal"
									/>
								</div>
							</div>
							<Label className="col-xl-2 col-md-4 mb-0">
								Ciudad:
							</Label>
							<div className="col-xl-4 col-sm-7">
								<select
									className="form-control digits"
									onClick={(e) =>
										handleChangeCiudad(
											e.target
												.value
										)
									}
								>
									<option
										selected
										className="select-fontsize ps-form__label">
										Ciudades
									</option>
									{listCiudades &&
										listCiudades.map(
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
						<FormGroup className="row">
							<Label className="col-xl-2 col-md-4 mb-0">
								Dirección
							</Label>
							<div className="col-xl-10 col-sm-7">
								<div className="ps-form__group">
									<input
										className="form-control"
										type="text"
										name="direccion"

									/>
								</div>
							</div>
						</FormGroup>
						<FormGroup className="row">
							<Label className="col-xl-2 col-md-4 mb-0">
								Indicativo:
							</Label>
							<div className="col-xl-2 col-sm-7">
								<div className="ps-form__group">
									<input
										className="form-control"
										type="numeric"
										name="indicativo"
									/>
								</div>
							</div>
							<Label className="col-xl-2 col-md-4 mb-0">
								# de de Teléfono
							</Label>
							<div className="col-xl-2 col-sm-4">
								<div className="ps-form__group">
									<input
										className="form-control"
										type="numeric"
										name="telefono"
									/>
								</div>
							</div>
							<Label className="col-xl-2 col-md-4 mb-0">
								Extensión
							</Label>
							<div className="col-xl-2 col-sm-4">
								<div className="ps-form__group">
									<input
										className="form-control"
										type="numeric"
										name="extension"
									/>
								</div>
							</div>
						</FormGroup>
						<hr />
						<h4>Crear Interlocutor</h4>
						<FormGroup className="row">
							<Label className="col-xl-2 col-md-4 mb-0">
								Nombres del contacto
							</Label>
							<div className="col-xl-4 col-sm-7">
								<div className="ps-form__group">
									<input
										className="form-control"
										type="text"
										name="nombrescontacto"
									/>
								</div>
							</div>
							<Label className="col-xl-2 col-md-4 mb-0">
								Apellidos contacto
							</Label>
							<div className="col-xl-4 col-sm-7">
								<div className="ps-form__group">
									<input
										className="form-control"
										type="text"
										name="apellidoscontacto"
									/>
								</div>
							</div>
						</FormGroup>
						<FormGroup className="row">
							<Label className="col-xl-2 col-md-4 mb-0">
								Correo Electrónico
							</Label>
							<div className="col-xl-4 col-sm-7">
								<div className="ps-form__group">
									<input
										className="form-control"
										type="text"
										name="correocontacto"
									/>
								</div>
							</div>
							<Label className="col-xl-2 col-md-4 mb-0">
								Tipo de régimen IVA
							</Label>
							<div className="col-xl-4 col-sm-7">
								<select
									className="form-control digits"
									onClick={(e) =>
										handleChangeTipoRegimen(
											e.target
												.value
										)
									}
								>
									<option
										selected
										className="select-fontsize ps-form__label">
										Tipo Régimen
									</option>
									{listTipoRegimen &&
										listTipoRegimen.map(
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
						<FormGroup className="row">
							<Label className="col-xl-2 col-md-4 mb-0">
								Indicativo:
							</Label>
							<div className="col-xl-2 col-sm-7">
								<div className="ps-form__group">
									<input
										className="form-control"
										type="numeric"
										name="indicativofacturacion"
									/>
								</div>
							</div>
							<Label className="col-xl-2 col-md-4 mb-0">
								# de de Teléfono
							</Label>
							<div className="col-xl-2 col-sm-4">
								<div className="ps-form__group">
									<input
										className="form-control"
										type="numeric"
										name="telefonofacturacion"
									/>
								</div>
							</div>
							<Label className="col-xl-2 col-md-4 mb-0">
								Codigo postal
							</Label>
							<div className="col-xl-2 col-sm-4">
								<div className="ps-form__group">
									<input
										className="form-control"
										type="numeric"
										name="codigopostal"
									/>
								</div>
							</div>
						</FormGroup>
						<FormGroup className="row">
							<Label className="col-xl-2 col-md-4 mb-0">
								Responsabilidad fiscal
							</Label>
							<div className="col-xl-4 col-sm-7">
								<select
									//disabled="disabled"
									className="form-control digits"
									onClick={(e) =>
										handleChangeResponsabilidad(
											e.target
												.value
										)
									}
								>
									<option
										selected
										className="select-fontsize ps-form__label">
										Tipo Régimen
									</option>
									{listResponsabilidadFiscal &&
										listResponsabilidadFiscal.map(
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
						<hr />
					</Form>
				</TabPanel>
				<TabPanel>
					<Form className="needs-validation user-add" noValidate="">
						<div className="permission-block">
							<div className="attribute-blocks">
								<h5 className="f-w-600 mb-3">Productos </h5>
								<Row>
									<Col xl="3" sm="4">
										<label>Agregar productos</label>
									</Col>
									<Col xl="9" sm="8">
										<FormGroup className="m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
											<Label className="d-block">
												<Input
													className="radio_animated"
													id="edo-ani1"
													type="radio"
													name="rdo-ani"
												/>
												Habilitar
											</Label>
											<Label className="d-block">
												<Input
													className="radio_animated"
													id="edo-ani2"
													type="radio"
													name="rdo-ani"
													defaultChecked
												/>
												Denegar
											</Label>
										</FormGroup>
									</Col>
								</Row>
								<Row>
									<Col xl="3" sm="4">
										<Label>Actualizar productos</Label>
									</Col>
									<Col xl="9" sm="8">
										<FormGroup className="m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
											<Label className="d-block">
												<Input
													className="radio_animated"
													id="edo-ani3"
													type="radio"
													name="rdo-ani1"
													defaultChecked
												/>
												Habilitar
											</Label>
											<Label className="d-block">
												<Input
													className="radio_animated"
													id="edo-ani4"
													type="radio"
													name="rdo-ani1"
												/>
												Denegar
											</Label>
										</FormGroup>
									</Col>
								</Row>
								<Row>
									<Col xl="3" sm="4">
										<Label>Borrar productos</Label>
									</Col>
									<Col xl="9" sm="8">
										<FormGroup className=" m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
											<Label className="d-block">
												<Input
													className="radio_animated"
													id="edo-ani5"
													type="radio"
													name="rdo-ani2"
												/>
												Habilitar
											</Label>
											<Label className="d-block">
												<Input
													className="radio_animated"
													id="edo-ani6"
													type="radio"
													name="rdo-ani2"
													defaultChecked
												/>
												Denegar
											</Label>
										</FormGroup>
									</Col>
								</Row>
								<Row>
									<Col xl="3" sm="4">
										<Label className="mb-0 sm-label-radio">
											Apply Discount
										</Label>
									</Col>
									<Col xl="9" sm="8">
										<FormGroup className="m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated pb-0">
											<Label className="d-block mb-0">
												<Input
													className="radio_animated"
													id="edo-ani7"
													type="radio"
													name="rdo-ani3"
												/>
												Allow
											</Label>
											<Label className="d-block mb-0">
												<Input
													className="radio_animated"
													id="edo-ani8"
													type="radio"
													name="rdo-ani3"
													defaultChecked
												/>
												Deny
											</Label>
										</FormGroup>
									</Col>
								</Row>
							</div>
							<div className="attribute-blocks">
								<h5 className="f-w-600 mb-3">Category Related Permission </h5>
								<Row>
									<Col xl="3" sm="4">
										<label>Add Category</label>
									</Col>
									<Col xl="9" sm="8">
										<FormGroup className="m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
											<Label className="d-block">
												<Input
													className="radio_animated"
													id="edo-ani9"
													type="radio"
													name="rdo-ani4"
												/>
												Allow
											</Label>
											<Label className="d-block">
												<Input
													className="radio_animated"
													id="edo-ani10"
													type="radio"
													name="rdo-ani4"
													defaultChecked
												/>
												Deny
											</Label>
										</FormGroup>
									</Col>
								</Row>
								<Row>
									<Col xl="3" sm="4">
										<Label>Update Category</Label>
									</Col>
									<Col xl="9" sm="8">
										<FormGroup className="m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
											<Label className="d-block">
												<Input
													className="radio_animated"
													id="edo-ani11"
													type="radio"
													name="rdo-ani5"
												/>
												Allow
											</Label>
											<Label className="d-block">
												<Input
													className="radio_animated"
													id="edo-ani12"
													type="radio"
													name="rdo-ani5"
													defaultChecked
												/>
												Deny
											</Label>
										</FormGroup>
									</Col>
								</Row>
								<Row>
									<Col xl="3" sm="4">
										<Label>Delete Category</Label>
									</Col>
									<Col xl="9" sm="8">
										<FormGroup className="m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
											<Label className="d-block">
												<Input
													className="radio_animated"
													id="edo-ani13"
													type="radio"
													name="rdo-ani6"
												/>
												Allow
											</Label>
											<Label className="d-block">
												<Input
													className="radio_animated"
													id="edo-ani14"
													type="radio"
													name="rdo-ani6"
													defaultChecked
												/>
												Deny
											</Label>
										</FormGroup>
									</Col>
								</Row>
								<Row>
									<Col xl="3" sm="4">
										<Label className="mb-0 sm-label-radio">
											Apply Discount
										</Label>
									</Col>
									<Col xl="9" sm="8">
										<FormGroup className="m-checkbox-inline custom-radio-ml d-flex radio-animated pb-0">
											<Label className="d-block mb-0">
												<Input
													className="radio_animated"
													id="edo-ani15"
													type="radio"
													name="rdo-ani7"
												/>
												Allow
											</Label>
											<Label className="d-block mb-0">
												<Input
													className="radio_animated"
													id="edo-ani16"
													type="radio"
													name="rdo-ani7"
													defaultChecked
												/>
												Deny
											</Label>
										</FormGroup>
									</Col>
								</Row>
							</div>
						</div>
					</Form>
				</TabPanel>
			</Tabs>
			<div className="pull-right">
				<Button type="button" color="primary" onClick={grabarInterlocutor}>
					Grabar
				</Button>
			</div>
		</Fragment>
	);
};

function defaultValueForm() {
	return {
		identificacion: "",
		digitoverificacion: "",
		nombres: "",
		apellidos: "",
		nombrecomercial: "",
		sucursal: "",
		direccion: "",
		indicativo: "",
		telefono: "",
		extension: "",
		nombrescontacto: "",
		apellidoscontacto: "",
		correocontacto: "",
		indicativofacturacion: "",
		telefonofacturacion: "",
		codigopostalfacturacion: "",
	};
}


export default CreateInterlocutor;
