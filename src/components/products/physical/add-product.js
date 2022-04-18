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
import Moment from "moment";
import swal from "sweetalert";

const Add_product = ({ afterPaste, onBlur, onChange }) => {
	const dispatch = useDispatch();
	const [formData, setFormData] = useState(defaultValueForm());
	const [idProducto, setIdProducto] = useState(0);
	const [proveedor, setProveedor] = useState(0);
	const [condicionProducto, setCondicionProducto] = useState(0);
	const [tipoCliente, setTipoCliente] = useState(0);
	const [sexo, setSexo] = useState(0);
	const [tiposProductos, setTiposProductos] = useState(0);
    const fechaactual = Moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
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

	//Arreglos caracteristicas de productos que pueden seleccionar
	const [listColores, setListColores] = useState([]);
	const [colorProducto, setColorProducto] = useState(0);
	const [muestraColor, setMuestraColor] = useState(false);

	const [listSabores, setListSabores] = useState([]);
	const [saborProducto, setSaborProducto] = useState(0);
	const [muestraSabor, setMuestraSabor] = useState(false);

	const [listTallas, setListTallas] = useState([]);
	const [tallaProducto, setTallaProducto] = useState(0);
	const [muestraTallas, setMuestraTallas] = useState(false);

	const [listMarcoPulgadas, setListMarcoPulgadas] = useState([]);
	const [marcoPulgadasProducto, setMarcoPulgadasProducto] = useState(0);
	const [muestraMarcoPulgadas, setMuestraMarcoPulgadas] = useState(false);

	const [listTallaBandana, setListTallaBandana] = useState([]);
	const [tallaBandanaProducto, setTallaBandanaProducto] = useState(0);
	const [muestraTallaBandana, setMuestraTallaBandana] = useState(false);

	const [listTallaCentimetro, setListTallaCentimetros] = useState([]);
	const [tallaCentimetrosProducto, setTallaCentimetrosProducto] = useState(0);
	const [muestraTallaCentimetro, setMuestraTallaCentimetro] = useState(false);

	const [listTallaGuantes, setListTallaGuantes] = useState([]);
	const [tallaGuantesProducto, setTallaGuantesProducto] = useState(0);
	const [muestraTallaGuantes, setMuestraTallaGuantes] = useState(false);

	const [listTallaJersey, setListTallaJersey] = useState([]);
	const [tallaJerseyProducto, setTallaJerseyProducto] = useState(0);
	const [muestraTallaJersey, setMuestraTallaJersey] = useState(false);

	const [listTallaMedias, setListTallaMedias] = useState([]);
	const [tallaMediasProducto, setTallaMediasProducto] = useState(0);
	const [muestraTallaMedias, setMuestraTallaMedias] = useState(false);

	const [listTallaPantaloneta, setListTallaPantaloneta] = useState([]);
	const [tallaPantalonetaProducto, setTallaPantalonetaProducto] = useState(0);
	const [muestraTallaPantaloneta, setMuestraTallaPantaloneta] = useState(false);

	const [listTamanoAccesorios, setListTamanoAccesorios] = useState([]);
	const [tamanoAccesorioProducto, setTamanoAccesorioProducto] = useState(0);
	const [muestraTamanoAccesorios, setMuestraTamanoAccesorios] = useState(false);

	const [listTamanoComponentes, setListTamanoComponentes] = useState([]);
	const [tamanoComponenteProducto, setTamanoComponenteProducto] = useState(0);
	const [muestraTamanoComponentes, setMuestraTamanoComponentes] = useState(false);

	const [listLlantasyNeumaticos, setListLlantasyNeumaticos] = useState([]);
	const [llantasyNeumaticosProducto, setLlantasyNeumaticosProducto] = useState(0);
	const [muestraLlantasyNeumaticos, setMuestraLlantasyNeumaticos] = useState(false);

	const [listRuedasyPartes, setListRuedasyPartes] = useState([]);
	const [ruedasyPartesProducto, setRuedasyPartesProducto] = useState(0);
	const [muestraRuedasyPartes, setMuestraRuedasyPartes] = useState(false);

	const [listAcoplamiento, setListAcoplamiento] = useState([]);
	const [acoplamientoProducto, setAcoplamientoProducto] = useState(0);
	const [muestraAcoplamiento, setMuestraAcoplamiento] = useState(false);

	const [listDiametro, setListDiametro] = useState([]);
	const [diametroProducto, setDiametroProducto] = useState(0);
	const [muestraDiametro, setMuestraDiametro] = useState(false);

	const [listRosca, setListRosca] = useState([]);
	const [roscaProducto, setRoscaProducto] = useState(0);
	const [muestraRosca, setMuestraRosca] = useState(false);

	const [listLongitud, setListLongitud] = useState([]);
	const [longitudProducto, setLongitudProducto] = useState(0);
	const [muestraLongitud, setMuestraLongitud] = useState(false);

	const [listAncho, setListAncho] = useState([]);
	const [anchoProducto, setAnchoProducto] = useState(0);
	const [muestraAncho, setMuestraAncho] = useState(false);

	const [listMaterial, setListMaterial] = useState([]);
	const [materialProducto, setMaterialProducto] = useState(0);
	const [muestraMaterial, setMuestraMaterial] = useState(false);

	const [listBrazoBiela, setListBrazoBiela] = useState([]);
	const [brazoBielaProducto, setBrazoBielaProducto] = useState(0);
	const [muestraBrazoBiela, setMuestraBrazoBiela] = useState(false);

	const [variableUno, setVariableUno] = useState(0);
	const [nombreVariableUno, setNombreVariableUno] = useState(false);
	const [variableDos, setVariableDos] = useState(0);
	const [nombreVariableDos, setNombreVariableDos] = useState(false);
	const [variableTres, setVariableTres] = useState(0);
	const [nombreVariableTres, setNombreVariableTres] = useState(false);
	const [variableCuatro, setVariableCuatro] = useState(0);
	const [nombreVariableCuatro, setNombreVariableCuatro] = useState(false);
	const [variableCinco, setVariableCinco] = useState(0);
	const [nombreVariableCinco, setNombreVariableCinco] = useState(false);
	const [variableSeis, setVariableSeis] = useState(0);
	const [nombreVariableSeis, setNombreVariableSeis] = useState(false);

	const [listVariablesProducto, setListVariablesProducto] = useState([]);

	const [file, setFile] = useState();
	const [dummyimgs, setDummyimgs] = useState([
		{ img: user },
		{ img: user },
		{ img: user },
		{ img: user },
		{ img: user },
		{ img: user },
	]);

	const [variableSeleccionada, setVariableSeleccionada] = useState([]);

	const [variablesProductoSeleccionadas, setvariablesProductoSeleccionadas] = useState({
		acoplamiento: 0,
		ancho: 0,
		brazodelabiela: 0,
		categoriados: 0,
		categoriatres: 0,
		categoriauno: 0,
		color: 0,
		descarrilador: 0,
		diametro: 0,
		empresa: 0,
		estado: 0,
		id: 0,
		label: 0,
		longitud: 0,
		manzanadelantera: 0,
		manzanatrasera: 0,
		marcoenpulgadas: 0,
		material: 0,
		pinones: 0,
		pistones: 0,
		relacion: 0,
		relaciondelcassette: 0,
		rosca: 0,
		sabor: 0,
		sexo: 0,
		talla: 0,
		tallabandana: 0,
		tallaencentimetros: 0,
		tallaguantes: 0,
		tallajersey: 0,
		tallamedias: 0,
		tallapantaloneta: 0,
		tamanoaccesorio: 0,
		tipoproducto: 0,
		value: 0
	})

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
		setListColores(data.vgl_colores);
		setListSabores(data.vgl_sabores);
		setListTallas(data.vgl_tallas);
		setListMarcoPulgadas(data.vgl_marcopulagadas);
		setListTallaBandana(data.vgl_tallabandana);
		setListTallaCentimetros(data.vgl_centimetros);
		setListTallaGuantes(data.vgl_tallaguantes);
		setListTallaJersey(data.vgl_jersey);
		setListTallaMedias(data.vgl_tallamedias);
		setListTallaPantaloneta(data.vgl_tallapantaloneta);
		setListTamanoAccesorios(data.vgl_tamanoaccesorios);
		setListTamanoComponentes(data.vgl_tamanocomponentes);
		setListLlantasyNeumaticos(data.vgl_llantasyneumaticos);
		setListRuedasyPartes(data.vgl_ruedasypartes);
		setListAcoplamiento(data.vgl_acoplamiento);
		setListDiametro(data.vgl_diametro);
		setListRosca(data.vgl_rosca);
		setListLongitud(data.vgl_longitud);
		setListAncho(data.vgl_ancho);
		setListMaterial(data.vgl_material);
		setListBrazoBiela(data.vgl_brazobiela);

		// Determina las variables que debe incluir para creación del producto
		setListVariablesProducto(data.vgl_variablesproducto);
		//console.log("VARIABLES PRODUCTO : ", data.vgl_variablesproducto)
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
		setMuestraColor(false);
		setMuestraSabor(false);
		setMuestraTallas(false);
		setMuestraMarcoPulgadas(false);
		setMuestraMaterial(false);
		setMuestraTallaBandana(false);
		setMuestraTallaCentimetro(false);
		setMuestraTallaGuantes(false);
		setMuestraTallaJersey(false);
		setMuestraTallaMedias(false);
		setMuestraTallaPantaloneta(false);
		setMuestraTamanoAccesorios(false);
		setMuestraTamanoComponentes(false);
		setMuestraLlantasyNeumaticos(false);
		setMuestraRuedasyPartes(false);
		setMuestraAcoplamiento(false);
		setMuestraDiametro(false);
		setMuestraRosca(false);
		setMuestraLongitud(false);
		setMuestraAncho(false);
		setMuestraBrazoBiela(false);

	};

	const handleChangeCategorias = (selectedOptions) => {
		setCategorias(selectedOptions)
		//console.log("CATEGORIA UNO SELECCIONADA : ",selectedOptions )
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
		//console.log("CATEGORIA DOS SELECCIONADA : ", selectedOptions)
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
		//setvariablesProductoSeleccionadas(variablesProducto);
		setCategoriasTres(selectedOptions);

		listVariablesProducto && listVariablesProducto.forEach((row) => {
			if ((Number.parseInt(row.tipoproducto) === Number.parseInt(tiposProductos)) &&
				(Number.parseInt(row.categoriauno) === Number.parseInt(categorias))
			) {
				if (row.color === 1) {
					setMuestraColor(true)
				}

				if (row.sabor === 1) {
					setMuestraSabor(true)
				}

				if (row.acoplamiento === 1) {
					setMuestraAcoplamiento(true)
				}

				if (row.ancho === 1) {
					setMuestraAncho(true)
				}

				if (row.brazodelabiela === 1) {
					setMuestraBrazoBiela(true)
				}

				//if (row.descarrilador === 1) {
				//	setMuestraSabor(true)
				//	}

				if (row.diametro === 1) {
					setMuestraDiametro(true)
				}

				if (row.longitud === 1) {
					setMuestraLongitud(true)
				}

				//if (row.manzanadelantera === 1) {
				//	setMuestraSabor(true)
				//}

				//if (row.manzanatrasera === 1) {
				//	setMuestraSabor(true)
				//}

				if (row.marcoenpulgadas === 1) {
					setMuestraMarcoPulgadas(true)
				}

				if (row.material === 1) {
					setMuestraMaterial(true)
				}

				//if (row.pinones === 1) {
				//	setMuestraSabor(true)
				//}

				//if (row.pistones === 1) {
				//	setMuestraSabor(true)
				//}

				//if (row.relacion === 1) {
				//	setMuestraSabor(true)
				//}

				//if (row.relaciondelcassette === 1) {
				//	setMuestraSabor(true)
				//}

				if (row.rosca === 1) {
					setMuestraRosca(true)
				}

				//if (row.sexo === 1) {
				//	setMuestraSabor(true)
				//}

				if (row.talla === 1) {
					setMuestraTallas(true)
				}

				if (row.tallabandana === 1) {
					setMuestraTallaBandana(true)
				}

				if (row.tallaencentimetros === 1) {
					setMuestraTallaCentimetro(true)
				}

				if (row.tallaguantes === 1) {
					setMuestraTallaGuantes(true)
				}

				if (row.tallajersey === 1) {
					setMuestraTallaJersey(true)
				}

				if (row.tallamedias === 1) {
					setMuestraTallaMedias(true)
				}

				if (row.tallapantaloneta === 1) {
					setMuestraTallaPantaloneta(true)
				}

				if (row.tamanoaccesorio === 1) {
					setMuestraTamanoAccesorios(true)
				}

			}
		});
	};

	const handleChangeColor = (selectedOptions) => {
		setColorProducto(selectedOptions);
	};

	const handleChangeSabores = (selectedOptions) => {
		setSaborProducto(selectedOptions);
	};

	const handleChangeTalla = (selectedOptions) => {
		setTallaProducto(selectedOptions);
	};

	const handleChangeMarcoPulgadas = (selectedOptions) => {
		setMarcoPulgadasProducto(selectedOptions);
	};

	const handleChangeTallaBandana = (selectedOptions) => {
		setTallaBandanaProducto(selectedOptions);
	};

	const handleChangeTallaCentimetros = (selectedOptions) => {
		setTallaCentimetrosProducto(selectedOptions);
	};

	const handleChangeTallaGuantes = (selectedOptions) => {
		setTallaGuantesProducto(selectedOptions);
	};

	const handleChangeTallaJersey = (selectedOptions) => {
		setTallaJerseyProducto(selectedOptions);
	};

	const handleChangeTallaMedias = (selectedOptions) => {
		setTallaMediasProducto(selectedOptions);
	};

	const handleChangeTallaPantaloneta = (selectedOptions) => {
		setTallaPantalonetaProducto(selectedOptions);
	};

	const handleChangeTamanoAccesorio = (selectedOptions) => {
		setTamanoAccesorioProducto(selectedOptions);
	};

	const handleChangeTamanoComponente = (selectedOptions) => {
		setTamanoComponenteProducto(selectedOptions);
	};

	const handleChangeLlantasyNeumaticos = (selectedOptions) => {
		setLlantasyNeumaticosProducto(selectedOptions);
	};

	const handleChangeRuedasyPartes = (selectedOptions) => {
		setRuedasyPartesProducto(selectedOptions);
	};

	const handleChangeAcoplamiento = (selectedOptions) => {
		setAcoplamientoProducto(selectedOptions);
	};

	const handleChangeDiametro = (selectedOptions) => {
		setDiametroProducto(selectedOptions);
	};

	const handleChangeRosca = (selectedOptions) => {
		setRoscaProducto(selectedOptions);
	};

	const handleChangeAncho = (selectedOptions) => {
		setAnchoProducto(selectedOptions);
	};

	const handleChangeMaterial = (selectedOptions) => {
		setMaterialProducto(selectedOptions);
	};

	const handleChangeBrazoBiela = (selectedOptions) => {
		setBrazoBielaProducto(selectedOptions);
	};

	const handleChangeLongitud = (selectedOptions) => {
		setLongitudProducto(selectedOptions);
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

	const handleChangeInformacion = () => {

	}

	const handleValidSubmit = (e) => {
		console.log("ID PRODUCTO : ", idProducto)
	};

	const onChangePrueba = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const crearProducto = async () => {		
		
		const formdata = new FormData();
		//formdata.append("idproductos", 0);
		formdata.append("idinterno", formData.idproducto);
		formdata.append("codigoproveedor", proveedor);
		formdata.append("condicionproducto", condicionProducto);
		formdata.append("sexo", sexo);
		formdata.append("tipodeproducto", tiposProductos);
		formdata.append("categoria", categorias);
		formdata.append("subcategoria1", categoriasDos);
		formdata.append("subcategoria2", categoriasTres);
		formdata.append("color", colorProducto);
		formdata.append("sabor", saborProducto);
		formdata.append("talla", tallaProducto);
		formdata.append("marcoenpulgadas", marcoPulgadasProducto);
		formdata.append("tallabandana", tallaBandanaProducto);
		formdata.append("tallaencentimetros", tallaCentimetrosProducto);
		formdata.append("tallaguantes", tallaGuantesProducto);
		formdata.append("tallajersey", tallaJerseyProducto);
		formdata.append("tallamedias", tallaMediasProducto);
		formdata.append("tallapantaloneta", tallaPantalonetaProducto);
		formdata.append("tamanoaccesorio", tamanoAccesorioProducto);
		formdata.append("tamanocomponentes", tamanoComponenteProducto);
		formdata.append("tamanollantasyneumaticos", llantasyNeumaticosProducto);
		formdata.append("tamanoruedasypartes", ruedasyPartesProducto);
		formdata.append("acoplamiento", acoplamientoProducto);
		formdata.append("diametro", diametroProducto);
		formdata.append("rosca", 	roscaProducto);
		formdata.append("longitud", longitudProducto);
		formdata.append("ancho", anchoProducto);
		formdata.append("material", materialProducto);
		formdata.append("brazodelabiela", brazoBielaProducto);
		formdata.append("relaciondelcassette", 0);
		formdata.append("descarrilador", 0);
		formdata.append("pistones", 0);
		formdata.append("relacion", 0);
		formdata.append("manzanatrasera", 0); 
		formdata.append("manzanadelantera", 0);
		formdata.append("inventariodisponible", 0); 
		formdata.append("inventariototal", 0);
		formdata.append("idalterno", 0);
		formdata.append("codigoexternoproducto", 0); 
		formdata.append("codigodebarra", 0);
		formdata.append("SKU", 0);
		formdata.append("notasadicionales", 0);
		formdata.append("anno", 0);
		formdata.append("descripcioncorta", 0); 
		formdata.append("descripcionlarga", 0);
		formdata.append("detalledelproducto", 0);
		formdata.append("preciofull", 0);
		formdata.append("preciodeventa", 0);
		formdata.append("variacionesenprecio", 0);
		formdata.append("costosenvio", 0);
		formdata.append("imagen01", 0);
		formdata.append("imagen02", 0);
		formdata.append("imagen03", 0);
		formdata.append("imagen04", 0);
		formdata.append("imagen05", 0);
		formdata.append("imagen06", 0);
		formdata.append("imagen07", 0);
		formdata.append("imagen08", 0);
		formdata.append("imagen09", 0);
		formdata.append("imagen10", 0);
		formdata.append("documento01", 0); 
		formdata.append("documento02", 0);
		formdata.append("fechaingreso", fechaactual);
		formdata.append("fechamodificacion", fechaactual); 
		formdata.append("estado", 1);

		console.log("DATOS GRABAR PRODUCTO : ", formdata)
		fetch("https://sitbusiness.co/cyclewear/api/709", {
            method: "POST",
            body: formdata,
        }).then((response) => {
            if (response) {
				console.log("RESPONSE : ", response )

                if (response.status === 200) {
                    swal(
                        "Cyclewear Crear Producto",
                        "Ingreso de productos grabados de forma correcta!",
                        "success",
                        { button: "Aceptar" }
                    );
                } else {
                    swal(
                        "Mercado Repuesto",
                        "Se presentaron inconvenientes al grabar los productos, Intenta nuevamente!",
                        "warning",
                        { button: "Aceptar" }
                    );
                }
            } else {
                console.log("RESPONSE GRABAR PRODUCTOS : ", response);
            }
        });
	}

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
											onChange={onChangePrueba}
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
														Condición Producto:
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

												{
													muestraColor ?
														(
															<FormGroup className="form-group mb-3 row">
																<Label className="col-xl-2 col-sm-4 mb-0">
																	Color:
																</Label>
																<div className="col-xl-4 col-sm-7">
																	<select
																		//disabled="disabled"
																		className="form-control digits"
																		onClick={(e) =>
																			handleChangeColor(
																				e.target
																					.value
																			)
																		}
																	>
																		<option
																			selected
																			className="select-fontsize ps-form__label">
																			Seleccione color del producto
																		</option>
																		{listColores && listColores.map(
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
														)
														:
														null
												}

												{
													muestraSabor ?
														(
															<FormGroup className="form-group mb-3 row">
																<Label className="col-xl-2 col-sm-4 mb-0">
																	Sabor:
																</Label>
																<div className="col-xl-4 col-sm-7">
																	<select
																		//disabled="disabled"
																		className="form-control digits"
																		onClick={(e) =>
																			handleChangeSabores(
																				e.target
																					.value
																			)
																		}
																	>
																		<option
																			selected
																			className="select-fontsize ps-form__label">
																			Seleccione sabor del producto
																		</option>
																		{listSabores && listSabores.map(
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
														)
														:
														null
												}

												{
													muestraTallas ?
														(
															<FormGroup className="form-group mb-3 row">
																<Label className="col-xl-2 col-sm-4 mb-0">
																	Talla:
																</Label>
																<div className="col-xl-4 col-sm-7">
																	<select
																		//disabled="disabled"
																		className="form-control digits"
																		onClick={(e) =>
																			handleChangeTalla(
																				e.target
																					.value
																			)
																		}
																	>
																		<option
																			selected
																			className="select-fontsize ps-form__label">
																			Seleccione talla del producto
																		</option>
																		{listTallas && listTallas.map(
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
														)
														:
														null
												}

												{
													muestraMarcoPulgadas ?
														(
															<FormGroup className="form-group mb-3 row">
																<Label className="col-xl-2 col-sm-4 mb-0">
																	Marco en pulgadas:
																</Label>
																<div className="col-xl-4 col-sm-7">
																	<select
																		//disabled="disabled"
																		className="form-control digits"
																		onClick={(e) =>
																			handleChangeMarcoPulgadas(
																				e.target
																					.value
																			)
																		}
																	>
																		<option
																			selected
																			className="select-fontsize ps-form__label">
																			Seleccione medida del marco en pulgadas
																		</option>
																		{listMarcoPulgadas && listMarcoPulgadas.map(
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
														)
														:
														null
												}

												{
													muestraTallaBandana ?
														(
															<FormGroup className="form-group mb-3 row">
																<Label className="col-xl-2 col-sm-4 mb-0">
																	Talla Bandana:
																</Label>
																<div className="col-xl-4 col-sm-7">
																	<select
																		//disabled="disabled"
																		className="form-control digits"
																		onClick={(e) =>
																			handleChangeTallaBandana(
																				e.target
																					.value
																			)
																		}
																	>
																		<option
																			selected
																			className="select-fontsize ps-form__label">
																			Seleccione talla de la Bandana
																		</option>
																		{listTallaBandana && listTallaBandana.map(
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
														)
														:
														null
												}

												{
													muestraTallaCentimetro ?
														(
															<FormGroup className="form-group mb-3 row">
																<Label className="col-xl-2 col-sm-4 mb-0">
																	Talla en centimetros:
																</Label>
																<div className="col-xl-4 col-sm-7">
																	<select
																		//disabled="disabled"
																		className="form-control digits"
																		onClick={(e) =>
																			handleChangeTallaCentimetros(
																				e.target
																					.value
																			)
																		}
																	>
																		<option
																			selected
																			className="select-fontsize ps-form__label">
																			Seleccione talla del producto en centimetros
																		</option>
																		{listTallaCentimetro && listTallaCentimetro.map(
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
														)
														:
														null
												}

												{
													muestraTallaGuantes ?
														(
															<FormGroup className="form-group mb-3 row">
																<Label className="col-xl-2 col-sm-4 mb-0">
																	Talla Guantes:
																</Label>
																<div className="col-xl-4 col-sm-7">
																	<select
																		//disabled="disabled"
																		className="form-control digits"
																		onClick={(e) =>
																			handleChangeTallaGuantes(
																				e.target
																					.value
																			)
																		}
																	>
																		<option
																			selected
																			className="select-fontsize ps-form__label">
																			Seleccione talla de los guantes
																		</option>
																		{listTallaGuantes && listTallaGuantes.map(
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
														)
														:
														null
												}

												{
													muestraTallaJersey ?
														(
															<FormGroup className="form-group mb-3 row">
																<Label className="col-xl-2 col-sm-4 mb-0">
																	Talla Jersey:
																</Label>
																<div className="col-xl-4 col-sm-7">
																	<select
																		//disabled="disabled"
																		className="form-control digits"
																		onClick={(e) =>
																			handleChangeTallaJersey(
																				e.target
																					.value
																			)
																		}
																	>
																		<option
																			selected
																			className="select-fontsize ps-form__label">
																			Seleccione talla del jersey
																		</option>
																		{listTallaJersey && listTallaJersey.map(
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
														)
														:
														null
												}
												{
													muestraTallaMedias ?
														(
															<FormGroup className="form-group mb-3 row">
																<Label className="col-xl-2 col-sm-4 mb-0">
																	Talla Medias:
																</Label>
																<div className="col-xl-4 col-sm-7">
																	<select
																		//disabled="disabled"
																		className="form-control digits"
																		onClick={(e) =>
																			handleChangeTallaMedias(
																				e.target
																					.value
																			)
																		}
																	>
																		<option
																			selected
																			className="select-fontsize ps-form__label">
																			Seleccione talla de las medias
																		</option>
																		{listTallaMedias && listTallaMedias.map(
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
														)
														:
														null
												}
												{
													muestraTallaPantaloneta ?
														(
															<FormGroup className="form-group mb-3 row">
																<Label className="col-xl-2 col-sm-4 mb-0">
																	Talla Pantaloneta:
																</Label>
																<div className="col-xl-4 col-sm-7">
																	<select
																		//disabled="disabled"
																		className="form-control digits"
																		onClick={(e) =>
																			handleChangeTallaPantaloneta(
																				e.target
																					.value
																			)
																		}
																	>
																		<option
																			selected
																			className="select-fontsize ps-form__label">
																			Seleccione talla de la pantaloneta
																		</option>
																		{listTallaPantaloneta && listTallaPantaloneta.map(
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
														)
														:
														null
												}

												{
													muestraTamanoAccesorios ?
														(

															<FormGroup className="form-group mb-3 row">
																<Label className="col-xl-2 col-sm-4 mb-0">
																	Tamaño Accesorio:
																</Label>
																<div className="col-xl-4 col-sm-7">
																	<select
																		//disabled="disabled"
																		className="form-control digits"
																		onClick={(e) =>
																			handleChangeTamanoAccesorio(
																				e.target
																					.value
																			)
																		}
																	>
																		<option
																			selected
																			className="select-fontsize ps-form__label">
																			Seleccione tamaño accesorio
																		</option>
																		{listTamanoAccesorios && listTamanoAccesorios.map(
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
														)
														:
														null
												}

												{
													muestraTamanoComponentes ?
														(
															<FormGroup className="form-group mb-3 row">
																<Label className="col-xl-2 col-sm-4 mb-0">
																	Tamano Componente:
																</Label>
																<div className="col-xl-4 col-sm-7">
																	<select
																		//disabled="disabled"
																		className="form-control digits"
																		onClick={(e) =>
																			handleChangeTamanoComponente(
																				e.target
																					.value
																			)
																		}
																	>
																		<option
																			selected
																			className="select-fontsize ps-form__label">
																			Seleccione tamano componente
																		</option>
																		{listTamanoComponentes && listTamanoComponentes.map(
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
														)
														:
														null
												}

												{
													muestraLlantasyNeumaticos ?
														(
															<FormGroup className="form-group mb-3 row">
																<Label className="col-xl-2 col-sm-4 mb-0">
																	Llantas y Neumáticos:
																</Label>
																<div className="col-xl-4 col-sm-7">
																	<select
																		//disabled="disabled"
																		className="form-control digits"
																		onClick={(e) =>
																			handleChangeLlantasyNeumaticos(
																				e.target
																					.value
																			)
																		}
																	>
																		<option
																			selected
																			className="select-fontsize ps-form__label">
																			Seleccione Llanta y Neumático
																		</option>
																		{listLlantasyNeumaticos && listLlantasyNeumaticos.map(
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
														)
														:
														null
												}

												{
													muestraRuedasyPartes ?
														(
															<FormGroup className="form-group mb-3 row">
																<Label className="col-xl-2 col-sm-4 mb-0">
																	Ruedas y Partes:
																</Label>
																<div className="col-xl-4 col-sm-7">
																	<select
																		//disabled="disabled"
																		className="form-control digits"
																		onClick={(e) =>
																			handleChangeRuedasyPartes(
																				e.target
																					.value
																			)
																		}
																	>
																		<option
																			selected
																			className="select-fontsize ps-form__label">
																			Seleccione ruedas y partes
																		</option>
																		{listRuedasyPartes && listRuedasyPartes.map(
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
														)
														:
														null
												}

												{
													muestraAcoplamiento ?
														(
															<FormGroup className="form-group mb-3 row">
																<Label className="col-xl-2 col-sm-4 mb-0">
																	Acoplamiento:
																</Label>
																<div className="col-xl-4 col-sm-7">
																	<select
																		//disabled="disabled"
																		className="form-control digits"
																		onClick={(e) =>
																			handleChangeAcoplamiento(
																				e.target
																					.value
																			)
																		}
																	>
																		<option
																			selected
																			className="select-fontsize ps-form__label">
																			Seleccione Acoplamiento
																		</option>
																		{listAcoplamiento && listAcoplamiento.map(
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
														)
														:
														null
												}

												{
													muestraDiametro ?
														(
															<FormGroup className="form-group mb-3 row">
																<Label className="col-xl-2 col-sm-4 mb-0">
																	Diámetro:
																</Label>
																<div className="col-xl-4 col-sm-7">
																	<select
																		//disabled="disabled"
																		className="form-control digits"
																		onClick={(e) =>
																			handleChangeDiametro(
																				e.target
																					.value
																			)
																		}
																	>
																		<option
																			selected
																			className="select-fontsize ps-form__label">
																			Seleccione diámetro
																		</option>
																		{listDiametro && listDiametro.map(
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
														)
														:
														null
												}

												{
													muestraRosca ?
														(
															<FormGroup className="form-group mb-3 row">
																<Label className="col-xl-2 col-sm-4 mb-0">
																	Rosca:
																</Label>
																<div className="col-xl-4 col-sm-7">
																	<select
																		//disabled="disabled"
																		className="form-control digits"
																		onClick={(e) =>
																			handleChangeRosca(
																				e.target
																					.value
																			)
																		}
																	>
																		<option
																			selected
																			className="select-fontsize ps-form__label">
																			Seleccione Rosca
																		</option>
																		{listRosca && listRosca.map(
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
														)
														:
														null
												}

												{
													muestraLongitud ?
														(
															<FormGroup className="form-group mb-3 row">
																<Label className="col-xl-2 col-sm-4 mb-0">
																	Longitud:
																</Label>
																<div className="col-xl-4 col-sm-7">
																	<select
																		//disabled="disabled"
																		className="form-control digits"
																		onClick={(e) =>
																			handleChangeLongitud(
																				e.target
																					.value
																			)
																		}
																	>
																		<option
																			selected
																			className="select-fontsize ps-form__label">
																			Seleccione longitud
																		</option>
																		{listLongitud && listLongitud.map(
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
														)
														:
														null
												}

												{
													muestraAncho ?
														(
															<FormGroup className="form-group mb-3 row">
																<Label className="col-xl-2 col-sm-4 mb-0">
																	Ancho:
																</Label>
																<div className="col-xl-4 col-sm-7">
																	<select
																		//disabled="disabled"
																		className="form-control digits"
																		onClick={(e) =>
																			handleChangeAncho(
																				e.target
																					.value
																			)
																		}
																	>
																		<option
																			selected
																			className="select-fontsize ps-form__label">
																			Seleccione Ancho
																		</option>
																		{listRosca && listRosca.map(
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
														)
														:
														null
												}

												{
													muestraMaterial ?
														(
															<FormGroup className="form-group mb-3 row">

																<Label className="col-xl-2 col-sm-4 mb-0">
																	Material:
																</Label>
																<div className="col-xl-4 col-sm-7">
																	<select
																		//disabled="disabled"
																		className="form-control digits"
																		onClick={(e) =>
																			handleChangeMaterial(
																				e.target
																					.value
																			)
																		}
																	>
																		<option
																			selected
																			className="select-fontsize ps-form__label">
																			Seleccione material
																		</option>
																		{listMaterial && listMaterial.map(
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
														)
														:
														null
												}

												{
													muestraBrazoBiela ?
														(
															<FormGroup className="form-group mb-3 row">
																<Label className="col-xl-2 col-sm-4 mb-0">
																	Brazo Biela:
																</Label>
																<div className="col-xl-4 col-sm-7">
																	<select
																		//disabled="disabled"
																		className="form-control digits"
																		onClick={(e) =>
																			handleChangeBrazoBiela(
																				e.target
																					.value
																			)
																		}
																	>
																		<option
																			selected
																			className="select-fontsize ps-form__label">
																			Seleccione Rosca
																		</option>
																		{listBrazoBiela && listBrazoBiela.map(
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
														)
														:
														null
												}

												<FormGroup className="form-group mb-3 row">
													<Label className="col-xl-2 col-sm-4 mb-0">
														Precio Base:
													</Label>
													<div className="col-xl-4 col-sm-7">
														<Input
															className="form-control mb-0"
															name="preciobase"
															id="validationCustom02"
															type="number"
															required
														/>
													</div>
													<Label className="col-xl-2 col-sm-4 mb-0">
														Precio de Venta:
													</Label>
													<div className="col-xl-4 col-sm-7">
														<Input
															className="form-control mb-0"
															name="precioventa"
															id="validationCustom02"
															type="number"
															required
														/>
													</div>
												</FormGroup>

												<FormGroup className="form-group mb-3 row">
													<Label className="col-xl-2 col-sm-4 mb-0">
														Product Name :
													</Label>
													<div className="col-xl-10 col-sm-7">
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
											</div>
											<Form>
												<FormGroup className="form-group row">
													<Label className="col-xl-3 col-sm-4 mb-0">
														Número de Productos :
													</Label>
													<fieldset className="qty-box ml-0">
														<div className="input-group bootstrap-touchspin">
															<div className="input-group-prepend">
																<Button className="botondecreceunidadesproducto"
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
																	className="botondecreceunidadesproducto"
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
														Información adicional del producto :
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
												<Button color="primary"
													onClick={crearProducto}
												>
													Grabar producto
												</Button>
												<Button type="button" color="light">
													Regresar
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
		</Fragment >
	);
};

function defaultValueForm() {
	return {
		idproducto: "",
		proveedor: "",
		condicionProducto: "",
		tipoCliente: "",
		sexo: "",
		tiposProductos: "",
		categorias: "",
		categoriasDos: "",
		categoriasTres: "",
	};
}

export default Add_product;
