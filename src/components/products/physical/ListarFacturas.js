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
import { CommentSharp } from '@material-ui/icons';

function ListarFacturas(props) {
    const [lisFacturas, setListFacturas] = useState([]);
    const [lisFacturasUno, setListFacturasUno] = useState([]);
    const [lisFacturasDos, setListFacturasDos] = useState([]);
    const [lisFacturasTres, setListFacturasTres] = useState([]);
    const [lisFacturasCuatro, setListFacturasCuatro] = useState([]);
    const [lisFacturasCinco, setListFacturasCinco] = useState([]);
    const [lisFacturasSeis, setListFacturasSeis] = useState([]);
    const [lisFacturasSiete, setListFacturasSiete] = useState([]);
    const [lisFacturasOcho, setListFacturasOcho] = useState([]);
    const [lisFacturasNueve, setListFacturasNueve] = useState([]);
    const [lisFacturasDiez, setListFacturasDiez] = useState([]);
    const [lisFacturasOnce, setListFacturasOnce] = useState([]);
    const [lisFacturasDoce, setListFacturasDoce] = useState([]);
    const [lisFacturasTrece, setListFacturasTrece] = useState([]);
    const [lisFacturasCatorce, setListFacturasCatorce] = useState([]);
    const [lisFacturasQuince, setListFacturasQuince] = useState([]);
    const [control, setControl] = useState(1);
    const [uno, setUno] = useState(0);
    const [dos, setDos] = useState(0);
    const [tres, setTres] = useState(0);

    const [loading, setLoading] = useState(false);
    
    const [totalFacturas, setTotalFacturas] = useState([]);
    const [datosClientesFacturas, setDatosClientesFacturas] = useState([]);

    const [actualiza, setActualiza] = useState(false);
    const [listVariantesProductoSeleccionada, setListVariantesProductosSeleccionada] = useState([]);
    const [modalVariantes, setModalVariantes] = useState(false);
    const [productoSeleccionado, setProductoSeleccionado] = useState({})
    const dispatch = useDispatch();

    console.log("IMAGEN : ", imagen1)

    useEffect(() => {
        const newDet = [];
        const newDetDos = [];
        const newDetTres = [];
        const newDetCuatro = [];
        let minimo = 0;
        let maximo = 0;
        let rango = 0;
        console.log("VALOR CONTROL : ", control)

        if (control === 1) {
            minimo = 81;
            maximo = 100;
            rango = 1
        } else
            if (control === 2) {
                minimo = 76;
                maximo = 81;
                rango = 2
            }else
            if (control === 3) {
                minimo = 81;
                maximo = 86;
                rango = 3
            }

        const leeFacturas = async () => {
            setLoading(true);
            for (var i = minimo; i < maximo; i++) {
                console.log("VALOR I : ", i)
                const params = {
                    pagina: i
                }
                await axios({
                    method: 'post',
                    url: 'https://sitbusiness.co/cyclewear/api/201', params
                }).then(res => {
                    newDet.push(res.data.data);
                }
                ).catch(function (error) {
                    console.log("ERROR LEYENDO FACTURAS");
                })
            }
            //setLoading(false);
            console.log("FACTURA : ", newDet[0])
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
            if (rango === 1) {
                setListFacturas(newDetTot);
                setUno(1000);
            }
            if (rango === 2){
                setListFacturasUno(newDetTot);
                setDos(2000);
            }
            if (rango === 3){
                setListFacturasDos(newDetTot);
                setTres(3000);
            }
            //setActualiza(true);
        }
        leeFacturas();

    }, [control])

    //console.log("LISTA PRODUCTOS BK : ", res.data.data);
    const leerDatosFacturas = async () => {
        console.log("ENTRE")

        const newDet = [];
        let numfactura = totalFacturas.length;
        let contador = 0;
        totalFacturas && totalFacturas.map((facturas, index) => {
            contador = contador + 1;
            const leer = async () => {
                const params = {
                    factura: facturas.id
                }

                await axios({
                    method: 'post',
                    url: 'https://sitbusiness.co/cyclewear/api/202', params
                }).then(res => {
                    let longitud = res.data.included.length - 1;

                    let item = {
                        id: facturas.id,
                        fechafactura: facturas.attributes.created_at,
                        estado: facturas.attributes.status,
                        valor: facturas.attributes.total,
                        email: res.data.included[longitud].attributes.email_address,
                        ciudad: res.data.included[longitud].attributes.city,
                        nombre: res.data.included[longitud].attributes.first_name,
                        apellido: res.data.included[longitud].attributes.surname,
                        direccion: res.data.included[longitud].attributes.address,
                        telefono: res.data.included[longitud].attributes.phone,
                    };
                    newDet.push(item);
                    if (contador === numfactura) {
                        //alert("ENTRE")
                        console.log("CONTADOR : ", contador, "NUM FACTURA : ", numfactura)
                        if (newDet.length === numfactura) {
                            const esperacinco = async event => {
                                await sleep(1000);
                                console.log("NEW DET : ", newDet);
                                setDatosClientesFacturas(newDet);
                            }
                            esperacinco();
                        }
                    }
                }
                ).catch(function (error) {
                    console.log("ERROR LEYENDO FACTURAS");
                })
            }
            leer();

        })
        
    }

    const sleep = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );

    const consolidarDatos = async () => {
        const newDet = [];
        lisFacturas && lisFacturas.forEach((row) => {
            newDet.push(row);
        });

        lisFacturasUno && lisFacturasUno.forEach((fact) => {
            newDet.push(fact);
        });

        lisFacturasDos && lisFacturasDos.forEach((fact) => {
            newDet.push(fact);
        });

        console.log("TOTAL FACTURA : ", newDet)
        setTotalFacturas(newDet);
    }

    const leeRangoUno = async () => {
        setControl(2);
    }

    const leeRangoDos = async () => {
        setControl(3);
    }

    return (
        <div>
            Prueba Conexión Bike Exchange
            <div>
                <button>
                    Control : {control} - Uno : {uno} - Dos : {dos} - Tres : {tres}
                </button>
            </div>

            <hr />
            <button color="primary" >
                <ReactHTMLTableToExcel
                    table="ubicacionesequipos"
                    filename="DatosClientesCWR"
                    sheet="Sheet"
                    buttonText="Exportar a Excel"
                />
            </button>
            <hr />
            <button onClick={leeRangoUno}>
                Leer Datos Dos
            </button>
            <button onClick={leeRangoDos}>
                Leer Datos Tres
            </button>
            <button onClick={consolidarDatos}>
                Consolidar Facturas
            </button>
            <button onClick={leerDatosFacturas}>
                Cruzar Datos Clientes
            </button>
            {

                <table id="ubicacionesequipos" className="table">
                    <thead>
                        <tr>
                            <th>ID FACTURA</th>
                            <th>FECHA</th>
                            <th>NOMBRE</th>
                            <th>APELLIDO</th>
                            <th>EMAIL</th>
                            <th>CIUDAD</th>
                            <th>TELEFONO</th>
                            <th>DIRECCION</th>
                            <th>ESTADO</th>
                            <th>TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            datosClientesFacturas && datosClientesFacturas.map((facturas, index) => {
                                return (
                                    <tr>
                                        <td>{facturas.id}</td>
                                        <td>{facturas.fechafactura}</td>
                                        <td>{facturas.nombre}</td>
                                        <td>{facturas.apellido}</td>
                                        <td>{facturas.email}</td>
                                        <td>{facturas.ciudad}</td>
                                        <td>{facturas.telefono}</td>
                                        <td>{facturas.direccion}</td>
                                        <td>{facturas.estado}</td>
                                        <td>{facturas.valor}</td>
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

export default ListarFacturas;