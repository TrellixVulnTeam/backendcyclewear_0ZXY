import React, { Fragment, useEffect, useState } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import MaterialTable from "material-table";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import CancelIcon from "@material-ui/icons/Cancel";
import EditAttributesIcon from "@material-ui/icons/EditAttributes";
import SaveIcon from '@material-ui/icons/Save';

import Moment from "moment";
import swal from "sweetalert";
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
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
} from "reactstrap";
//import Loading from "../../../components/elements/Loading";
import EditIcon from "@material-ui/icons/Edit";
//import imagen1 from "../../assets/images/imagenes/bicicleta.jpg";
import Loading from "../../elements/Loading/Loading";

function AddClientSiigo(props) {
  const [loading, setLoading] = useState(false);
  const [pendienteCrear, setPendienteCrear] = useState([]);
  const [contraSiigo, setContraSiigo] = useState(false);
  const [validarCedula, setValidarCedula] = useState(false);
  const [actualizar, setActualizar] = useState(false);
  const [itemUpdate, setItemUpdate] = useState([]);
  const [datapedidos, setDatapedidos] = useState([]);
  const [dataitemspedidos, setDataitemspedidos] = useState([]);
  const [codigoscategorias, setCodigosCategorias] = useState([]);

  useEffect(() => {
    setLoading(true);
    const pedidos = async () => {
      await axios({
        method: "post",
        url: "https://sitbusiness.co/cyclewear/api/210",
      })
        .then((res) => {
          setDatapedidos(res.data);
          //console.log("PEDIDOS : ", res.data);
          const newPedCli = [];
          res.data &&
            res.data.map((items, index) => {
              if (items.idcliente == 0) {
                let row = {
                  idcliente: items.idcliente,
                  nombre: items.nombre,
                  apellido: items.apellido,
                  departamento: items.departamento,
                  ciudad: items.ciudad,
                  direccion: items.direccion,
                  email: items.email,
                  pedido: items.id_fact
                }
                newPedCli.push(row);
              }
            });
          //console.log("ITEMS CREAR : ", newPedCli);
          setPendienteCrear(newPedCli);
        })
        .catch(function (error) {
          console.log("ERROR LEYENDO PEDIDOS");
        });
    };
    pedidos();

    const itemspedidos = async () => {
      await axios({
        method: "post",
        url: "https://sitbusiness.co/cyclewear/api/211",
      })
        .then((res) => {
          setDataitemspedidos(res.data);
        })
        .catch(function (error) {
          console.log("ERROR LEYENDO PEDIDOS");
        });
    };
    itemspedidos();

    const consecutivoscategorias = async () => {
      await axios({
        method: "post",
        url: "https://sitbusiness.co/cyclewear/api/31",
      })
        .then((res) => {
          setCodigosCategorias(res.data);
          //console.log("DATOS Categorias : ", res.data);
          setLoading(false);
        })
        .catch(function (error) {
          console.log("ERROR LEYENDO CATEGORIAS");
        });
    };
    consecutivoscategorias();
    setLoading(false);
  }, [actualizar]);

  const validaContraSiigo = async () => {
    setValidarCedula(true);
  };

  const seleccionarPedido = (pedido) => {
    console.log("Items pedidos - CEDULA : ", pedido);
    
    setLoading(true);
    let contador = 0;

    let params = {
      type: "Customer",
      person_type: "Person",
      id_type: "13",
      identification: pedido.cedula, //items.idcliente,
      check_digit: "4",
      nombre: pedido.nombre,
      apellido: pedido.apellido,
      commercial_name: "Cyclewear",
      branch_office: 0,
      active: "true",
      vat_responsible: "false",
      code: "R-99-PN",
      address: pedido.direccion,
      country_code: "Co",
      state_code: "19",
      city_code: "19001",
      postal_code: "110911",
      indicative: "57",
      number: "3155337803",
      extension: "132",
      first_name: pedido.nombre,
      last_name: pedido.apellido,
      email: pedido.email,
      indicative: "57",
      number: "3155337803",
      extension: "132",
      comments: "Prueba",
      seller_id: "809",
      collector_id: "809"
    };

    console.log("PEDIDO : ", params);

    const creaInt = async () => {
      await axios({
        method: 'post',
        url: 'https://sitbusiness.co/cyclewear/api/101', params
      }).then((res) => {
        console.log("RESPONSE : ", res)

        if (res.status === 200) {
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

    setLoading(false);
    //setValidarCedula(false);
  }

  const grabarDatos = (datos) => {
    const params = {
      apellido: datos.apellido,
      ciudad: datos.ciudad,
      departamento: datos.departamento,
      direccion: datos.direccion,
      email: datos.email,
      cedula: datos.idcliente,
      nombre: datos.nombre,
      pedido: datos.pedido
    };

    const datosped = async () => {
      await axios({
        method: "post",
        url: "https://sitbusiness.co/cyclewear/api/214",
        params,
      })
        .then((res) => {
          console.log("DATOS PEDIDO : ", datos.idcliente);
          seleccionarPedido(params);
        })
        .catch(function (error) {
          console.log("ERROR EN DATOS PEDIDO");
        });
    };
    datosped();
  }

  const columnas = [
    {
      field: 'idcliente',
      title: 'Cedula',
      cellStyle: { minWidth: 50 }
    },
    {
      field: 'nombre',
      title: 'Nombre',
      cellStyle: { minWidth: 50 }
    },
    {
      field: 'apellido',
      title: 'Apellido',
      cellStyle: { minWidth: 50 }
    },
    {
      field: 'departamento',
      title: 'Departamento',
      cellStyle: { minWidth: 50 }
    },
    {
      field: 'ciudad',
      title: 'Ciudad',
      cellStyle: { minWidth: 50 }
    },
    {
      field: 'direccion',
      title: 'direccion',
      cellStyle: { minWidth: 50 }
    },
    {
      field: 'email',
      title: 'Correo',
      cellStyle: { minWidth: 50 }
    }
  ]

  return (
    <div>
      {loading ? <Loading /> : null}
      <br />
      <Row>
        <Col xl={3} lg={3} md={3} xs={3}>
        </Col>
        <Col xl={3} lg={3} md={3} xs={3}>
          <ReactHTMLTableToExcel
            className="botonestercero"
            table="ubicacionesequipos"
            filename="DatosClientesCWR"
            sheet="Sheet"
            ButtonText="Exportar a Excel"
          />

        </Col>
        <Col xl={3} lg={3} md={3} xs={3}>
          <Button
            className="botonestercero"
            color="primary"
            onClick={validaContraSiigo}
          >
            Crear tercero
          </Button>
        </Col>
      </Row>

      <MaterialTable
        title="PEDIDOS CYCLE WEAR"
        columns={columnas}
        data={pendienteCrear}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...pendienteCrear];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setPendienteCrear([...dataUpdate]);
                setItemUpdate(newData);
                grabarDatos(newData);
                resolve();
              }, 1000)
            }),

        }}
        options={{
          actionsColumnIndex: 11,
          headerStyle: { backgroundColor: '#015CAB', fontSize: 16, color: 'white' },
          rowStyle: rowData => ({
            backgroundColor: (0 == rowData.sincodigosiigo) ? '#6699D0' : '#FFF'
          })
        }}
      />
    </div>
  );
}

export default AddClientSiigo;
