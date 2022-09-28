import React, { Fragment, useEffect, useState } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Breadcrumb from "../common/breadcrumb";
import MaterialTable from "material-table";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import CancelIcon from "@material-ui/icons/Cancel";
import EditAttributesIcon from "@material-ui/icons/EditAttributes";
import Moment from "moment";
import swal from "sweetalert";
import "./ordenes.css";
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
import imagen1 from "../../assets/images/imagenes/bicicleta.jpg";
import Loading from "../elements/Loading/Loading";
import ListarProductos from "../products/physical/ListarProductos";

function UpdateCodigoPrd(props) {
  const [loading, setLoading] = useState(false);
  const [contraSiigo, setContraSiigo] = useState(false);
  const [datapedidos, setDatapedidos] = useState([]);
  const [dataitemspedidos, setDataitemspedidos] = useState([]);
  const [dataproductos, setDataproductos] = useState([]);
  const [codigoscategorias, setCodigosCategorias] = useState([]);

  useEffect(() => {

    //setLoading(true);
    const productos = async () => {
      await axios({
        method: "post",
        url: "https://sitbusiness.co/cyclewear/api/27",
      })
        .then((res) => {
          console.log("Productos : ", res.data);
          setDataproductos(res.data);
        })
        .catch(function (error) {
          console.log("ERROR LEYENDO PRODUCTOS");
        });
    };
    productos();

    const pedidos = async () => {
      await axios({
        method: "post",
        url: "https://sitbusiness.co/cyclewear/api/210",
      })
        .then((res) => {
          console.log("pedidos : ", res.data);
          setDatapedidos(res.data);
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
          console.log("Items pedidos : ", res.data);
        })
        .catch(function (error) {
          console.log("ERROR LEYENDO PEDIDOS");
        });
    };
    itemspedidos();

  }, []);

  const leerProductoSiigo = () => {
    setLoading(true)
    console.log("Items pedidos : ", dataitemspedidos);
    console.log("Productos : ", dataproductos);
    console.log("Pedidos : ", datapedidos);
    console.log("Codigos Categorias : ", codigoscategorias);

    const newItems = [];
    let cantidad = newItems.length;
    let contar = 0;
    /*
        dataitemspedidos &&
          dataitemspedidos.map((items, index) => {
    
            let estado;
            let delivery;
    
            datapedidos &&
              datapedidos.map((facturas, index) => {
    
                if (facturas.id_fact == items.pedido) {
                  estado = facturas.status;
                  delivery = facturas.delivery_type;
                }
    
              });
    
            const params = {
              pedido: items.pedido,
              nombre: items.nombre,
              apellido: items.apellido,
              email: items.email,
              ciudad: items.ciudad,
              departamento: items.departamento,
              codigopostal: items.codigopostal,
              direccion: items.direccion,
              status: estado,
              delivery_type: delivery,
              phone: items.phone
            };
    
            const datosped = async () => {
              await axios({
                method: "post",
                url: "https://sitbusiness.co/cyclewear/api/213",
                params,
              })
                .then((res) => {
                  console.log("DATOS PEDIDO : ", params);
                })
                .catch(function (error) {
                  console.log("ERROR EN DATOS PEDIDO");
                });
            };
            datosped();
          });
    */
    let longitud = dataitemspedidos.length;
    let contreg = 0;

    dataitemspedidos &&
      dataitemspedidos.map((items, index) => {

        dataproductos &&
          dataproductos.map((row, index) => {
            if (items.variant_sku == row.sku) {

              const actualiza = async () => {
                const params = {
                  estado: 2,
                  itempedido: items.itempedido,
                  codigosiigo: row.codigo
                };

                await axios({
                  method: "post",
                  url: "https://sitbusiness.co/cyclewear/api/718",
                  params,
                })
                  .then((res) => {
                    
                    if (contar > longitud)
                      setLoading(false)

                    //console.log("CONTADOR : ", contar);
                    console.log("Actualizando : ", params);
                    console.log("RESPUESTA : ", res);
                    contar = contar + 1;
                  })
                  .catch(function (error) {
                    contar = contar + 1;

                    console.log("ERROR Actualizando");
                  });
              };
              actualiza();
            }
          });
      });
    setContraSiigo(false);
    //setInterval(setLoading(false),100000);
  }

  return (
    <div>
      {loading ? <Loading /> : null}
      <br />
      <div className="mb-30 ml-10">
        <Row>
          <Col xl={5} lg={5} md={5} xs={5} className="mlmenos50 mtmenos5">
          </Col>
          <Col xl={3} lg={3} md={3} xs={3}>
            <div className="tamañofuentetercero">Actualizando Datos</div>
          </Col>
        </Row>
      </div>
      <hr />
      <Row>

        <Col xl={3} lg={3} md={3} xs={3}>
          <button
            className="botonestercero"
            color="primary"
            onClick={leerProductoSiigo}
          >
            Actualiza Items Pedidos
          </button>
        </Col>

      </Row>
      <hr />

    </div>
  );
}

export default UpdateCodigoPrd;
