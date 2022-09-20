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

function UpdateSinCodigoSiigo(props) {
  const [loading, setLoading] = useState(false);
  const [contraSiigo, setContraSiigo] = useState(false);
  const [datapedidos, setDatapedidos] = useState([]);
  const [dataitemspedidos, setDataitemspedidos] = useState([]);
  const [dataproductos, setDataproductos] = useState([]);
  const [codigoscategorias, setCodigosCategorias] = useState([]);
  const [lisProductosSiigo, setListProductosSiigo] = useState([]);

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
    console.log("Items pedidos : ", dataitemspedidos);
    console.log("Productos : ", dataproductos);
    console.log("Pedidos : ", datapedidos);

    setLoading(true);

    const newItemPed = [];
    dataitemspedidos &&
      dataitemspedidos.map((items, index) => {
        let row = {
          pedido: items.pedido,
          itempedido: items.itempedido,
          sku: items.variant_sku,
        };
        newItemPed.push(row);
      });

    const newProd = [];
    dataproductos &&
      dataproductos.map((items, index) => {
        newProd.push(items.sku);
      });

    //console.log("Items pedidos : ", newItemPed);
    //console.log("Productos : ", newProd);

    const newItems = [];
    let valida = false;
    newItemPed &&
      newItemPed.map((items, index) => {
        valida = newProd.includes(items.sku);
        if (!valida) {
          newItems.push(items);
        }
      });

    console.log("NEW ITEMS : ", newItems);
    setListProductosSiigo(newItems);

    let cantidad = newItems.length;
    let contar = 0;

    /*
    newItems &&
      newItems.map((items, index) => {
        //console.log("ITEMS PEDIDOS : ", items);
        const actualiza = async () => {
          const params = {
            estado: 0,
            itempedido: items.itempedido,
          };
          await axios({
            method: "post",
            url: "https://sitbusiness.co/cyclewear/api/717",
            params,
          })
            .then((res) => {
              console.log("Actualizando");
              contar = contar + 1;

            })
            .catch(function (error) {
              contar = contar + 1;

              console.log("ERROR Actualizando");
            });
        };
        actualiza();
      });
      */
    setLoading(false);
    setContraSiigo(false);
    //setInterval(setLoading(false),100000);
    //setInterval(setLoading(false),100000);
  }

  const readSiigo = () => {
    const leeProductosSiigo = async () => {
      const newDetPed = [];
      for (var i = 1; i < 250; i++) {
        const params = {
          pagina: i,
        };

        if (i == 248) {
          setLoading(false);
          setListProductosSiigo(newDetPed);
          console.log("PRODUCTOS SIIGO : ", newDetPed);
          break;
        }

        await axios({
          method: "post",
          url: "https://sitbusiness.co/cyclewear/api/715",
          params,
        })
          .then((res) => {
            console.log("PAGINA : ", params);
            res.data &&
              res.data.map((row, index) => {
                //console.log("ID FACTURAS LEIDAS : ", row);
                let item = {
                  code: row.code,
                  id: row.id,
                  name: row.name,
                  sku: row.sku,
                  cantidad: row.cantidad,
                  impuestos: row.impuestos,
                  idgrupo: row.idgrupo,
                  nombregrupo: row.nombregrupo,
                  codigobarra: row.codigobarra,
                  marca: row.marca,
                  bodega: row.bodega,
                  nombre: row.nombre,
                  valor: row.valor,
                  idiva: row.idiva,
                  porcentajeiva: row.porcentajeiva,
                  fechacreacion: row.fechacreacion,
                };
                newDetPed.push(item);
              });
            //setLeeFacturas(true);
          })
          .catch(function (error) {
            console.log("ERROR LEYENDO FACTURAS");
          });
          
      }
    };
    leeProductosSiigo();

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
            className="botoncrearcliente"
            color="primary"
            onClick={leerProductoSiigo}
          >
            Actualiza Items Pedidos
          </button>
        </Col>

        <Col xl={3} lg={3} md={3} xs={3}>
          <button
            className="botoncrearcliente"
            color="primary"
            onClick={readSiigo}
          >
            Lee productos desde Siigo
          </button>
        </Col>

      </Row>
      <hr />
      <Row>
        <Col xl={3} lg={3} md={3} xs={3}>
        </Col>
        <Col xl={3} lg={3} md={3} xs={3}>
          <button className='botoncrearcliente' color="primary" >
            <ReactHTMLTableToExcel
              table="terceros"
              filename="DatosProductosSiigo"
              sheet="Sheet"
              buttonText="Exportar a Excel"
            />
          </button>
        </Col>
      </Row>F
      <hr />

      {

        <table id="terceros" className="table">
          <thead>
            <tr>
              <th>code</th>
              <th>id</th>
              <th>sku</th>
              <th>name</th>
              <th>cantidad</th>
              <th>idgrupo</th>
              <th>nombregrupo</th>
              <th>codigobarra</th>
              <th>marca</th>
              <th>bodega</th>
              <th>nombre</th>
              <th>valor</th>
              <th>idiva</th>
              <th>impuesto</th>
              <th>fechacreacion</th>
              <th>estado</th>
            </tr>
          </thead>
          <tbody>
            {
              lisProductosSiigo && lisProductosSiigo.map((facturas, index) => {
                return (
                  <tr>
                    <td>{facturas.code}</td>
                    <td>{facturas.id}</td>
                    <td>{facturas.sku}</td>
                    <td>0</td>
                    <td>{facturas.cantidad}</td>
                    <td>{facturas.idgrupo}</td>
                    <td>{facturas.nombregrupo}</td>
                    <td>{facturas.codigobarra}</td>
                    <td>{facturas.marca}</td>
                    <td>{facturas.bodega}</td>
                    <td>{facturas.nombre}</td>
                    <td>{facturas.valor}</td>
                    <td>{facturas.idiva}</td>
                    <td>{facturas.porcentajeiva}</td>
                    <td>2022-08-29</td>
                    <td>1</td>
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

export default UpdateSinCodigoSiigo;
