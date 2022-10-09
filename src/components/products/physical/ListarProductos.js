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
                setListProductos(res.data);
                const newDet = [];
                
                console.log("NUEVO ARREGLO : ", newDet);
                
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
            render: rowData => <img src={rowData.imagen} style={{ width: 50, height: 50 }} />
        },
        {
            title: 'Codigo',
            field: 'codigo'
        },
        {
            title: 'SKU',
            field: 'sku'
        },
        {
            title: 'Descripción',
            field: 'nombre'
        },
        {
            title: 'Fecha creación',
            field: 'fechadecreacion'
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