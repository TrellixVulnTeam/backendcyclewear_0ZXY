import React, { Fragment, useEffect, useState } from 'react';
import Breadcrumb from "../../common/breadcrumb";
import MaterialTable from "material-table";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import CancelIcon from '@material-ui/icons/Cancel';
import EditAttributesIcon from '@material-ui/icons/EditAttributes';
import {
    Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row, Button, Modal, ModalFooter,
    ModalHeader, ModalBody
} from "reactstrap";
import EditIcon from '@material-ui/icons/Edit';
import imagen1 from "../../../assets/images/imagenes/bicicleta.jpg";
import imagen2 from "../../../assets/images/imagenes/bolsa.jpg";
import imagen3 from "../../../assets/images/imagenes/camisetas.jpg";
import imagen4 from "../../../assets/images/imagenes/camisetas1.jpg";
import imagen5 from "../../../assets/images/imagenes/caramañola.jpg";
import imagen6 from "../../../assets/images/imagenes/caramañola1.jpg";
import imagen7 from "../../../assets/images/imagenes/caramañola2.jpg";
import imagen8 from "../../../assets/images/imagenes/casco1.jpg";
import imagen9 from "../../../assets/images/imagenes/sillin.jpg";
import imagen10 from "../../../assets/images/imagenes/sillin1.jpg";
import imagen11 from "../../../assets/images/imagenes/sillin3.jpg";
import imagen12 from "../../../assets/images/imagenes/zapatillas.jpg";
import imagen13 from "../../../assets/images/imagenes/zapatillas1.jpg";
import imagen14 from "../../../assets/images/imagenes/zapatillas2.jpg";
import imagen15 from "../../../assets/images/imagenes/zapatillas3.jpg";
import imagen16 from "../../../assets/images/imagenes/casco.jpg";

function ListarProductos(props) {
    const [listProductos, setListProductos] = useState([]);
    const [listVariantesProductos, setVariantesListProductos] = useState([]);
    const [listVariantesProductoSeleccionada, setListVariantesProductosSeleccionada] = useState([]);
    const [modalVariantes, setModalVariantes] = useState(false);
    const [productoSeleccionado, setProductoSeleccionado] = useState({})
    const dispatch = useDispatch();
    const [tem1, setTem1] = useState(imagen1);
    const [tem2, setTem2] = useState(imagen2);
    console.log("IMAGEN : ", imagen1)

    useEffect(() => {
        const leerProductos = async () => {
            await axios({
                method: 'post',
                url: 'https://sitbusiness.co/cyclewear/api/23'
            }).then(res => {
                console.log("LISTA DE  PRODUCTOS : ", res.data);

                const newDet = [];
                {
                    res.data && res.data.map((productos, index) => {
                        {
                            let imagen = "";

                            if (productos.value === 1) {
                                imagen = imagen1;
                            } else
                                if (productos.value === 2) {
                                    imagen = imagen2;
                                } else
                                    if (productos.value === 3) {
                                        imagen = imagen3;
                                    } else
                                        if (productos.value === 4) {
                                            imagen = imagen4;
                                        } else
                                            if (productos.value === 5) {
                                                imagen = imagen5;
                                            } else
                                                if (productos.value === 6) {
                                                    imagen = imagen6;
                                                } else
                                                    if (productos.value === 7) {
                                                        imagen = imagen7;
                                                    } else
                                                        if (productos.value === 8) {
                                                            imagen = imagen8;
                                                        } else
                                                            if (productos.value === 9) {
                                                                imagen = imagen9;
                                                            } else
                                                                if (productos.value === 10) {
                                                                    imagen = imagen10;
                                                                } else
                                                                    if (productos.value === 11) {
                                                                        imagen = imagen11;
                                                                    } else
                                                                    if (productos.value === 12) {
                                                                        imagen = imagen12;
                                                                    } else
                                                                    if (productos.value === 13) {
                                                                        imagen = imagen13;
                                                                    } else
                                                                    if (productos.value === 14) {
                                                                        imagen = imagen14;
                                                                    } else
                                                                        imagen = "";

                            let item = {
                                value: productos.value,
                                label: productos.label,
                                idproductos: productos.idproductos,
                                idinterno: productos.idinterno,
                                codigosiigo: productos.codigosiigo,
                                codigoproveedor: productos.codigoproveedor,
                                condicionproducto: productos.condicionproducto,
                                sexo: productos.sexo,
                                tipodeproducto: productos.tipodeproducto,
                                categoriauno: productos.categoriauno,
                                categoriados: productos.categoriados,
                                categoriatres: productos.categoriatres,
                                categoriacuatro: productos.categoriacuatro,
                                descripcion: productos.descripcion,
                                fechaingreso: productos.fechaingreso,
                                fechamodificacion: productos.fechamodificacion,
                                estado: productos.estado,
                                empresa: productos.empresa,
                                nombretipoproducto: productos.nombretipoproducto,
                                nombrecategoriauno: productos.nombrecategoriauno,
                                nombrecategoriados: productos.nombrecategoriados,
                                nombrecategoriatres: productos.nombrecategoriatres,
                                nombrecategoriacuatro: productos.nombrecategoriacuatro,
                                imagen: imagen
                            };
                            newDet.push(item);
                        }
                    })
                }
                console.log("NUEVO ARREGLO : ", newDet);
                setListProductos(newDet);
            }
            ).catch(function (error) {
                console.log("ERROR LEYENDO LISTA DE PRODUCTOS");
            })

            await axios({
                method: 'post',
                url: 'https://sitbusiness.co/cyclewear/api/20'
            }).then(res => {
                console.log("LISTA VARIANTES PRODUCTOS : ", res.data);
                setVariantesListProductos(res.data);
            }
            ).catch(function (error) {
                console.log("ERROR LEYENDO LISTA DE PRODUCTOS");
            })

        }
        leerProductos();
    }, []);

    const columnas = [
        {
            title: '',
            field: 'imageUrl',
            render: rowData => <img src={rowData.imagen} style={{ width: 100, height: 100 }} />
        },
        {
            title: 'Tipo',
            field: 'nombretipoproducto'
        },
        {
            title: 'CategoríaUno',
            field: 'nombrecategoriauno'
        },
        {
            title: 'CategoríaDos',
            field: 'nombrecategoriauno'
        },
        {
            title: 'CategoríaTres',
            field: 'nombrecategoriados'
        },
        {
            title: 'CategoríaTres',
            field: 'nombrecategoriatres'
        }
    ]

    const columnasvar = [
        {
            title: 'Variante',
            field: 'idvariante'
        },
        {
            title: 'Precio Base',
            field: 'preciobasevariante'
        },
        {
            title: 'Precio Venta',
            field: 'precioventavariante'
        },
        {
            title: 'Cantidad',
            field: 'cantidadvariante'
        },
    ]    

    const seleccionarProducto = (producto, caso) => {
        console.log("PRODUCTO : ", producto.idinterno)
        setProductoSeleccionado(producto);

        const newDet = [];
        {
            listVariantesProductos && listVariantesProductos.map((variante, index) => {
                {
                    //console.log("INTERNO VARIANTE : ", variante.idinterno)
                    if (producto.idinterno == variante.idinterno) {
                        let item = {
                            value: variante.value,
                            label: variante.label,
                            id: variante.id,
                            idvariante: variante.idvariante,
                            idinterno: variante.idinterno,
                            nombrevarianteuno: variante.nombrevarianteuno,
                            nombrevariantedos: variante.nombrevariantedos,
                            nombrevariantetres: variante.nombrevariantetres,
                            nombrevariantecuatro: variante.nombrevariantecuatro,
                            nombrevariantecinco: variante.nombrevariantecinco,
                            preciobasevariante: variante.preciobasevariante,
                            precioventavariante: variante.precioventavariante,
                            cantidadvariante: variante.cantidadvariante,
                            codigobarravariante: variante.codigobarravariante,
                            skuvariante: variante.skuvariante,
                            taxcodevariante: variante.taxcodevariante,
                            fechaingreso: variante.fechaingreso,
                            fechamodificacion: variante.fechaingreso,
                            estado: variante.estado,
                            nombretipoproducto: variante.nombretipoproducto,
                            nombrecategoriauno: variante.nombrecategoriauno,
                            nombrecategoriados: variante.nombrecategoriados,
                            nombrecategoriatres: variante.nombrecategoriatres,
                            nombrecategoriacuatro: variante.nombrecategoriacuatro
                        };
                        newDet.push(item);
                    }
                }
            })
        }
        console.log("NUEVO ARREGLO VARIANTE : ", newDet);
        setListVariantesProductosSeleccionada(newDet);
        (caso === "Producto") ? abrirCerrarModalVariantes() : abrirCerrarModalVariantes()
    }

    const abrirCerrarModalVariantes = () => {
        setModalVariantes(!modalVariantes);
    }

    const grabarVariantes = () => {

        console.log("DATOS VARIaNTEs : ", listVariantesProductoSeleccionada )
        /*const params = {
            idinterno: idProducto
        };

        let longitud = 0;
        let ultimo = 0;

        const leeUltimaVarianteProducto = async () => {
            await axios({
                method: 'post',
                url: 'https://sitbusiness.co/cyclewear/api/20', params
            }).then(res => {
                //console.log("CONSECUTIVO VARIANTE PRODUCTO : ", (res.data));
                ultimo = res.data.length + 1;
                grabarVariantesBD(ultimo);
            }
            ).catch(function (error) {
                console.log("ERROR LEYENDO CONSECUTIVO");
            })
        }
        leeUltimaVarianteProducto();*/
    }

    const grabarVariantesBD = (ultimo) => {
        /*
                if (formData.precioventavariante >= formData.preciobasevariante) {
                    swal(
                        "GRABAR VARIANTE PRODUCTO",
                        "Precio de Venta debe ser menor a Precio Base!",
                        "warning",
                        { button: "Aceptar" }
                    );
                    return;
                }
        
                var cadena = "" + formData.preciobasevariante;
                var cadena1 = cadena.replace(",", "");
                var preciobase = cadena1.replace("$", "");
        
                var cadena = "" + formData.precioventavariante;
                var cadena1 = cadena.replace(",", "");
                var precioventa = cadena1.replace("$", "");
        
                let idvariante = idProducto + ultimo;
        
                const formdata = new FormData();
                formdata.append("idvariante", idvariante);
                formdata.append("idinterno", idProducto);
                formdata.append("nombrevarianteuno", "");
                formdata.append("nombrevariantedos", "");
                formdata.append("nombrevariantetres", "");
                formdata.append("nombrevariantecuatro", "");
                formdata.append("nombrevariantecinco", "");
                formdata.append("preciobasevariante", preciobase);
                formdata.append("precioventavariante", precioventa);
                formdata.append("cantidadvariante", formData.cantidadvariante);
                formdata.append("codigobarravariante", formData.codigobarravariante);
                formdata.append("skuvariante", formData.skuvariante);
                formdata.append("taxcodevariante", formData.taxcodevariante);
                formdata.append("fechaingreso", fechaactual);
                formdata.append("fechamodificacion", fechaactual);
                formdata.append("estado", 1);
        
                const grabarVarianteProducto = async () => {
                    fetch("https://sitbusiness.co/cyclewear/api/21", {
                        method: "POST",
                        body: formdata,
                    }).then((res) => {
                        if (res) {
                            console.log("RESPONSE : ", res)
        
                            if (res.status === 200) {
                                swal(
                                    "CYCLE WEAR",
                                    "Ingreso variante producto grabada de forma correcta!",
                                    "success",
                                    { button: "Aceptar" }
                                );
                                setModalVariantes(false);
                                //window.location.reload(false);
                            } else {
                                swal(
                                    "CYCLE WEAR",
                                    "Se presentaron inconvenientes al grabar la variante, Intenta nuevamente!",
                                    "warning",
                                    { button: "Aceptar" }
                                );
                            }
                        } else {
                            console.log("RESPONSE GRABAR PRODUCTOS : ", res);
                        }
                    });
                }
                grabarVarianteProducto();
                */
    }

    return (
        <Fragment>
            <Breadcrumb title="Listar Productos" parent="Physical" />
            <div id="basicScenario" className="product-physical">
                <MaterialTable
                    title="Productos Cycle Wear"
                    columns={columnas}
                    data={listProductos}
                    actions={[
                        {
                            icon: EditIcon,
                            tooltip: 'Editar Producto',
                            onClick: (event, rowData) => seleccionarProducto(rowData, "Producto")
                        },
                        {
                            icon: EditAttributesIcon,
                            tooltip: 'Variante Producto',
                            onClick: (event, rowData) => seleccionarProducto(rowData, "Variante")
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
                <Modal className="custom-modal-style" isOpen={modalVariantes} toggle={abrirCerrarModalVariantes}>
                    <ModalHeader
                        toggle={abrirCerrarModalVariantes}>
                        <div className="centrartextomodalvariantes">
                            CONSULTAR VARIANTES PRODUCTOS
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <MaterialTable
                            title="Productos Cycle Wear"
                            columns={columnasvar}
                            data={listVariantesProductoSeleccionada}
                            editable={{
                        
                                onRowUpdate: (newData, oldData) =>
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            const dataUpdate = [...listVariantesProductoSeleccionada];
                                            const index = oldData.tableData.id;
                                            dataUpdate[index] = newData;
                                            setListVariantesProductosSeleccionada([...dataUpdate]);
        
                                            resolve();
                                        }, 1000)
                                    }),
                               
                            }}
                            options={{
                                actionsColumnIndex: 11,
                                headerStyle: { backgroundColor: '#015CAB', fontSize: 16, color: 'white' },
                                rowStyle: {
                                    fontSize: 14,
                                }
                            }}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={grabarVariantes}>Grabar cambios</Button>
                    </ModalFooter>
                </Modal>
            </div>
        </Fragment>
    );
}

export default ListarProductos;