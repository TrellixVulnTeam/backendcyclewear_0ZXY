import React, { Fragment, useEffect, useState } from 'react';
import ReactHTMLTableToExcel from "react-html-table-to-excel";
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
//import Loading from "../../../components/elements/Loading";
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
    const [listProductosUno, setListProductosUno] = useState([]);
    const [listProductosDos, setListProductosDos] = useState([]);
    const [listProductosTres, setListProductosTres] = useState([]);
    const [listProductosCuatro, setListProductosCuatro] = useState([]);
    const [listProductosCinco, setListProductosCinco] = useState([]);
    const [listProductosSeis, setListProductosSeis] = useState([]);
    const [listProductosSiete, setListProductosSiete] = useState([]);
    const [listProductosOcho, setListProductosOcho] = useState([]);
    const [listProductosNueve, setListProductosNueve] = useState([]);
    const [listProductosDiez, setListProductosDiez] = useState([]);
    const [listProductosOnce, setListProductosOnce] = useState([]);
    const [listProductosDoce, setListProductosDoce] = useState([]);
    const [listProductosTrece, setListProductosTrece] = useState([]);
    const [listProductosCatorce, setListProductosCatorce] = useState([]);
    const [listProductosQuince, setListProductosQuince] = useState([]);

    const [loading, setLoading] = useState(false);
    const [listProductos, setListProductos] = useState([]);

    const [actualiza, setActualiza] = useState(false);
    const [listVariantesProductoSeleccionada, setListVariantesProductosSeleccionada] = useState([]);
    const [modalVariantes, setModalVariantes] = useState(false);
    const [productoSeleccionado, setProductoSeleccionado] = useState({})
    const dispatch = useDispatch();

    console.log("IMAGEN : ", imagen1)

    useEffect(() => {
        const newDet = [];

        const leerProductos = async () => {
            setLoading(true);
            for (var i = 20; i < 86; i++) {
                const params = {
                    valor: i
                }
                await axios({
                    method: 'post',
                    url: 'https://sitbusiness.co/cyclewear/api/200', params 
                }).then(res => {
                    newDet.push(res.data.data);
                }
                ).catch(function (error) {
                    console.log("ERROR LEYENDO LISTA DE PRODUCTOS");
                })
            }
            //setLoading(false);
            const newDetTot = [];
            newDet[0] && newDet[0].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[1] && newDet[1].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[2] && newDet[2].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[3] && newDet[3].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[4] && newDet[4].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[5] && newDet[5].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[6] && newDet[6].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[7] && newDet[7].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[8] && newDet[8].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[9] && newDet[9].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[10] && newDet[10].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[11] && newDet[11].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[12] && newDet[12].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[13] && newDet[13].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[14] && newDet[14].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[15] && newDet[15].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[16] && newDet[16].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[17] && newDet[17].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[18] && newDet[18].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[19] && newDet[19].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[20] && newDet[20].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[21] && newDet[21].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[22] && newDet[22].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[23] && newDet[23].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[24] && newDet[24].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[25] && newDet[25].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[26] && newDet[26].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[27] && newDet[27].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[28] && newDet[28].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[29] && newDet[29].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[30] && newDet[30].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[31] && newDet[31].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[32] && newDet[32].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[33] && newDet[33].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[34] && newDet[34].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[35] && newDet[35].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[36] && newDet[36].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[37] && newDet[37].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[38] && newDet[38].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[39] && newDet[39].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[40] && newDet[40].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[41] && newDet[41].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[42] && newDet[42].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[43] && newDet[43].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[44] && newDet[44].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[45] && newDet[45].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[46] && newDet[46].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[47] && newDet[47].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[48] && newDet[48].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[49] && newDet[49].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[50] && newDet[50].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[51] && newDet[51].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[52] && newDet[52].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[53] && newDet[53].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[54] && newDet[54].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[55] && newDet[55].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[56] && newDet[56].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[57] && newDet[57].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[58] && newDet[58].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[59] && newDet[59].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[60] && newDet[60].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[61] && newDet[61].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[62] && newDet[62].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[63] && newDet[63].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[64] && newDet[64].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[65] && newDet[65].forEach((row) => {
                newDetTot.push(row);
            });
            newDet[66] && newDet[66].forEach((row) => {
                newDetTot.push(row);
            });
            
            console.log("LISTA PRODUCTOS DET TOT : ", newDetTot);
            setListProductos(newDetTot);
            //setActualiza(true);
        }
        leerProductos();

    }, [])

    useEffect(() => {
        if (actualiza) {
            //alert("ENTRE")
            //console.log("LISTA PRODUCTOS : ", listProductosUno);
            /*
            const newDetTot = [];
            listProductosUno && listProductosUno.forEach((row) => {
                newDetTot.push(row);
            });
            listProductosDos && listProductosDos.forEach((row) => {
                newDetTot.push(row);
            });
            listProductosTres && listProductosTres.forEach((row) => {
                newDetTot.push(row);
            });
            listProductosCuatro && listProductosCuatro.forEach((row) => {
                newDetTot.push(row);
            });
            */
            
        }
    }, [actualiza])

    //console.log("LISTA PRODUCTOS BK : ", res.data.data);

    return (
        <div>
            Prueba Conexión Bike Exchange
            <hr />
            <button color="primary" >
                <ReactHTMLTableToExcel
                    table="ubicacionesequipos"
                    filename="AnunciosCWR"
                    sheet="Sheet"
                    buttonText="Exportar a Excel"
                />
            </button>
            <hr />
            <button >
                Leer Datos
            </button>
            {

                <table id="ubicacionesequipos" className="table">
                    <thead>
                        <tr>
                            <th>ID ANUNCIO</th>
                            <th>PROVEEDOR</th>
                            <th>PRECIO</th>
                            <th>TITULO</th>
                            <th>DESCRIPCION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listProductos && listProductos.map((anuncios, index) => {
                                return (
                                    <tr>
                                        <td>{anuncios.id}</td>
                                        <td>{anuncios.attributes.code}</td>
                                        <td>{anuncios.attributes.title}</td>
                                        <td>{anuncios.attributes.price}</td>
                                        <td>{anuncios.attributes.description}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

            }
        </div>
    );
}

export default ListarProductos;