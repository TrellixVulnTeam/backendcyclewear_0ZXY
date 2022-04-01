import React, { Fragment, useState, useEffect, useRef } from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { User, Unlock } from "react-feather";
import { withRouter, useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { validateEmail } from "../../utilities/Validations";
import swal from "sweetalert";

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
		//e.preventDefault();
		setFormError({});
		let errors = {};
		let formOk = true;
		console.log("DATOS : ", formData);

		return;
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
				text: "Password debe ser masyor a siete (7) caracteres!",
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

		//console.log("VALOR FORMDATA : ", formOk);
		//Consulta en la BD de MR para ver si el email esta asociado a una cuenta
		const emailusuario = {
			usuario: formData.usuario,
		};

		//const respuestauser = await ReadUserEmail.getReadUsersEmail(
		//  emailusuario
		//);
		///console.log("SI USUARIO EXISTE : ", respuestauser);
		/*
				if (respuestauser.length > 0) {
					swal({
						title: "Registro Usuarios",
						text: "Por favor revisa el email, ya esta asignado a otra cuenta!",
						icon: "warning",
						button: "Aceptar",
					});
					return;
				}
				*/
		setFormError(errors);

		if (formOk) {
			//setLoading(true);
			//console.log("DATOS USAURIO : ", formData);
			//console.log(formData.password);

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
									displayName: formData.nombre,
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

	const routeChange = () => {

		//history.push(`${process.env.PUBLIC_URL}/dashboard`);
	};
	return (
		<div>
			<Fragment>
				<Tabs>

					<TabPanel>
						<form onChange={onChange}>
							<div className="form-horizontal auth-form">
								<div>
									<input
										name="usuario"
										type="email"
										className="form-control"
										placeholder="Ingrese usuario"
										id="exampleInputEmail12"
									/>
								</div>
								<div>
									<input
										name="contraseña"
										type="password"
										className="form-control"
										placeholder="Contraseña"
									/>
								</div>
								<div>
									<input
										name="confirmarcontraseña"
										type="password"
										className="form-control"
										placeholder="Confirmar Contraseña"
									/>
								</div>
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
							</div>
						</form>
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
