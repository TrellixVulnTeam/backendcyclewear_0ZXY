import React, { Fragment, useState, useEffect, useRef } from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { User, Unlock } from "react-feather";
import { withRouter, useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { validateEmail } from "../../utilities/Validations";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { obtenerProveedoresAccion } from "../../store/Interlocutores/Proveedores";
import { obtenerCondicionProductoAccion } from "../../store/CondicionProducto/CondicionProducto";
import { obtenerDatosEntornoAccion } from "../../store/DatosEnterno/DatosEnterno";

//Firebase
import firebase from "../../utilities/firebase";
import {
	getAuth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	updateProfile,
} from "firebase/auth";

const LoginTabset = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const [formData, setFormData] = useState(defaultValueForm());
	const [formError, setFormError] = useState({});
	const [user, setUser] = useState(false);
	const [idUid, setIdUid] = useState(0);
	const [createId, setCreateId] = useState(false);

	const clickActive = (event) => {
		document.querySelector(".nav-link").classList.remove("show");
		event.target.classList.add("show");
	};

	const onChange = (e) => {
		console.log("VALOR E : ", e)
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const registrarse = async () => {
		setFormError({});
		let errors = {};
		let formOk = true;
		console.log("DATOS : ", formData);

		if (!validateEmail(formData.usuario)) {
			swal({
				title: "Registro Usuarios",
				text: "Ingresa un email valido!",
				icon: "warning",
				button: "Aceptar",
			});
			errors.usuario = true;
			formOk = false;
			return;
		}

		if (formData.contraseña.length < 8) {
			swal({
				title: "Registro Usuarios",
				text: "Password debe ser mayor a siete (7) caracteres!",
				icon: "warning",
				button: "Aceptar",
			});
			errors.password = true;
			formOk = false;
			return;
		}

		if (formData.contraseña != formData.confirmarcontraseña) {
			swal({
				title: "Registro Usuarios",
				text: "Contraseña y confirmar contraseña, son diferentes!",
				icon: "warning",
				button: "Aceptar",
			});
			errors.password = true;
			formOk = false;
			return;
		}

		//console.log("VALOR FORMDATA : ", formData);
		setFormError(errors);

		if (formOk) {
			const grabaUsuario = async () => {
				const auth = getAuth(firebase);
				createUserWithEmailAndPassword(
					auth,
					formData.usuario,
					formData.contraseña
				)
					.then((userCredential) => {
						// Signed in
						const user = userCredential.user;
						//console.log("USER CREDENTIAL : ", user);
						const auth = getAuth(firebase);

						onAuthStateChanged(auth, (user) => {
							if (user) {
								//alert("ENTRE")

								const datos = {
									uid: user.metadata.createdAt,
									medio: "",
								};

								setIdUid(user.metadata.createdAt);

								setUser(true);
								updateProfile(auth.currentUser, {
									displayName: "William Castro",
									photoURL: "",
								})
									.then(() => {
										swal({
											title: "Actualizar Usuarios",
											text: "Nombre Usuario Actualizado de forma correcta!",
											icon: "success",
											button: "Aceptar",
										});
										createUser(user.metadata.createdAt);
										setCreateId(true);
									})
									.catch((error) => {
										swal({
											title: "Actualizar Usuarios",
											text: "Error Actualizando nombre de Usuario!",
											icon: "error",
											button: "Aceptar",
										});
									});
							} else {
								setUser(false);
							}
						});
					})
					.catch((error) => {
						const errorCode = error.code;
						const errorMessage = error.message;
						swal({
							title: "Registro Usuarios",
							text: "Error al crear la cuenta!",
							icon: "error",
							button: "Aceptar",
						});
					});
			};
			grabaUsuario();
		}
		return;
	};

	const createUser = async (iDUser) => {
		console.log("Procedimiento para crear usuario en BD")
	}

	const Login = async () => {
		//Consulta en la BD de MR para ver si el email esta asociado a una cuenta
		//history.push(`${process.env.PUBLIC_URL}/dashboard`);
		setFormError({});
		let errors = {};
		let formOk = true;

		if (!validateEmail(formData.usuario)) {
			errors.email = true;
			formOk = false;
		}
		if (formData.contraseña.length < 6) {
			errors.contraseña = true;
			formOk = false;
		}
		setFormError(errors);

		const emailusuario = {
			email: formData.usuario,
		};

		//Consulta en la BD de MR para ver si el email esta asociado a una cuenta
		//const respuestauser = await ReadUserEmail.getReadUsersEmail(
		//    emailusuario
		//);

		//Lee de la base de datos y los coloca en el State los datos de los proveedores
		dispatch(obtenerProveedoresAccion());
		//Lee las condiciones de los productos de la base de datos y los coloca State
		dispatch(obtenerCondicionProductoAccion());
		//Lee datos de la base de datos asignados en el super objeto y los coloca en el state
		dispatch(obtenerDatosEntornoAccion());

		if (formOk) {
			//setLoading(true);

			const auth = getAuth(firebase);
			signInWithEmailAndPassword(auth, formData.usuario, formData.contraseña)
				.then((userCredential) => {
					const user = userCredential.user;
					//console.log("DATOS USER : ", user);
					// Lee los datos del usuario para validar si ya esta aActivo

					const dat = {
						uid: user.metadata.createdAt,
					};

					console.log("DATOS USUARIO : ", dat.uid);

					setIdUid(user.metadata.createdAt);
					history.push(`${process.env.PUBLIC_URL}/dashboard`);
					//console.log("ACCESO OK");
					//.push("/");
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					//setLoading(false);
					swal({
						title: "CONTROL DE ACCESO",
						text: "Error al Intentar la Conexion... Intente mas Tarde!",
						icon: "warning",
						button: "Aceptar",
					});
					//router.push("/");
				});
		}
		//datosusuarios = useSelector((state) => state.userlogged.userlogged);
	};

	return (
		<div>
			<Fragment>
				<Tabs>
					<TabList className="nav nav-tabs tab-coupon">
						<Tab className="nav-link" onClick={(e) => clickActive(e)}>
							<User />
							Ingresa
						</Tab>
						<Tab className="nav-link" onClick={(e) => clickActive(e)}>
							<Unlock />
							Registrarse
						</Tab>
					</TabList>

					<TabPanel>
						<Form className="form-horizontal auth-form">
							<FormGroup>
								<Input
									required=""
									name="usuario"
									type="email"
									className="form-control"
									placeholder="Ingrese usuario"
									onChange={onChange}
									id="Inputusuario"
								/>
							</FormGroup>
							<FormGroup>
								<Input
									required=""
									name="contraseña"
									type="password"
									className="form-control"
									onChange={onChange}
									placeholder="Contraseña"
								/>
							</FormGroup>
							<div className="form-terms">
								<div className="custom-control custom-checkbox mr-sm-2">
									<Input
										type="checkbox"
										className="custom-control-input"
										id="customControlAutosizing"
									/>
									<Label className="d-block">
										<Input
											className="checkbox_animated"
											id="chk-ani2"
											type="checkbox"
										/>
										Recuerdame{" "}
										<span className="pull-right">
											{" "}
											<a href="/#" className="btn btn-default forgot-pass p-0">
												Perdiste tu contraseña
											</a>
										</span>
									</Label>
								</div>
							</div>
							<div className="form-button">
								<Button
									color="primary"
									//type="submit"
									onClick={() => Login()}
								>
									Ingresar
								</Button>
							</div>
							<div className="form-footer">
								<span>O inicie sesión con plataformas sociales</span>
								<ul className="social">
									<li>
										<a href="/#">
											<i className="icon-facebook"></i>
										</a>
									</li>
									<li>
										<a href="/#">
											<i className="icon-twitter-alt"></i>
										</a>
									</li>
									<li>
										<a href="/#">
											<i className="icon-instagram"></i>
										</a>
									</li>
									<li>
										<a href="/#">
											<i className="icon-pinterest-alt"></i>
										</a>
									</li>
								</ul>
							</div>
						</Form>
					</TabPanel>
					<TabPanel>
						<Form className="form-horizontal auth-form">
							<FormGroup>
								<Input
									required=""
									name="usuario"
									type="email"
									className="form-control"
									placeholder="Ingrese usuario"
									onChange={onChange}
									id="idusuario"
								/>
							</FormGroup>
							<FormGroup>
								<Input
									required=""
									name="contraseña"
									type="password"
									className="form-control"
									placeholder="Contraseña"
									onChange={onChange}
								/>
							</FormGroup>
							<FormGroup>
								<Input
									required=""
									name="confirmarcontraseña"
									type="password"
									className="form-control"
									placeholder="Confirmar Contraseña"
									onChange={onChange}
								/>
							</FormGroup>
							<div className="form-terms">
								<div className="custom-control custom-checkbox mr-sm-2">
									<Input
										type="checkbox"
										className="custom-control-input"
										id="customControlAutosizing"
									/>
									<Label className="d-block">
										<Input
											className="checkbox_animated"
											id="chk-ani2"
											type="checkbox"
										/>
										Acepto términos y condiciones{" "}
										<span>
											<a href="/#">Terms &amp; Condiciones</a>
										</span>
									</Label>
								</div>
							</div>
							<div className="form-button">
								<Button
									color="primary"
									onClick={() => registrarse()}
								>
									Registrarse
								</Button>
							</div>
							<div className="form-footer">
								<span>O inicie sesión con plataformas sociales</span>
								<ul className="social">
									<li>
										<a href="/#">
											<i className="icon-facebook"></i>
										</a>
									</li>
									<li>
										<a href="/#">
											<i className="icon-twitter-alt"></i>
										</a>
									</li>
									<li>
										<a href="/#">
											<i className="icon-instagram"></i>
										</a>
									</li>
									<li>
										<a href="/#">
											<i className="icon-pinterest-alt"></i>
										</a>
									</li>
								</ul>
							</div>
						</Form>
					</TabPanel>
				</Tabs>
			</Fragment>
		</div>
	);
};

function defaultValueForm() {
	return {
		usuario: "",
		contraseña: "",
		confirmarcontraseña: ""
	};
}

export default withRouter(LoginTabset);
