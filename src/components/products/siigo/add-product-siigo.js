import React, { Fragment, useEffect, useState } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
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
//import imagen1 from "../../assets/images/imagenes/bicicleta.jpg";
import Loading from "../../elements/Loading/Loading";
import "./siigo.css";

function AddProductSiigo(props) {

  const [pagina, setPagina] = useState(false);
  const [tipoTercero, setTipoTercero] = useState("");
  const [loading, setLoading] = useState(false);
  const fechaactual = Moment(new Date()).format("YYYY-MM-DD");
  //const fechaactual = Moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  const [datos, setDatos] = useState([]);
  const dispatch = useDispatch();
  const [itemsCrear, setitemsCrear] = useState(false);
  const [leePedidos, setLeePedidos] = useState(false);
  const [actualizaBD, setActualizaBD] = useState(false);
  const [contraSiigo, setContraSiigo] = useState(false);
  const [validarCedula, setValidarCedula] = useState(false);

  const [datapedidos, setDatapedidos] = useState([]);
  const [dataitemspedidos, setDataitemspedidos] = useState([]);
  const [pendienteCrear, setPendienteCrear] = useState([]);
  const [dataproductos, setDataproductos] = useState([]);
  const [codigoscategorias, setCodigosCategorias] = useState([]);

  //console.log("IMAGEN : ", imagen1)

  useEffect(() => {
    setLoading(true);
    const pedidos = async () => {
      await axios({
        method: "post",
        url: "https://sitbusiness.co/cyclewear/api/210",
      })
        .then((res) => {
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
          console.log("ITEMS PEDIDO : ", res.data);
          const newProdPend = [];
          res.data &&
            res.data.map((items, index) => {
              if (items.sincodigosiigo == 0) {
                let row = {
                  itempedido: items.itempedido,
                  pedido: items.pedido,
                  advert_name: items.advert_name,
                  advert_code: items.advert_code,
                  brand_name: items.brand_name,
                  price: items.price,
                  quantity: items.quantity,
                  subtotal: items.subtotal,
                  tax_total: items.tax_total,
                  taxon_name: items.taxon_name,
                  total: items.total,
                  variant_barcode: items.variant_barcode,
                  variant_name: items.variant_name,
                  variant_sku: items.variant_sku,
                  codigoproductosiigo: items.codigoproductosiigo,
                  direccion: items.direccion,
                  observaciones: items.observaciones,
                  categoriauno: items.categoriauno,
                  categoriados: items.categoriados,
                  categoriatres: items.categoriatres,
                }
                newProdPend.push(row);
              }
            });
          console.log("ITEMS CREAR : ", newProdPend);
          setPendienteCrear(newProdPend);
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

    /*
 const leeConsecutivo = async () => {
                        const params = {
                          tipoproducto: categoriauno,
                          categoriauno: categoriados,
                          categoriados: categoriatres,
                          categoriatres: categoriacuatro
                          //categoriacuatro:
                        };

                        await axios({
                          method: "post",
                          url: "https://sitbusiness.co/cyclewear/api/28",
                          params,
                        })
                          .then((res) => {
                            console.log("CONSECUTIVO : ", res.data[0].codigo);
                            codigoconsecutivo = res.data[0].codigo;
                            //setListIdentificacion(newDetId[0]);
                          })
                          .catch(function (error) {
                            console.log("ERROR LEYENDO FACTURAS");
                          });
                      };
                      leeConsecutivo();
      */

    //console.log("Items pedidos : ", dbitemspedidos);
    //console.log("Productos : ", dbproductos);
    //console.log("Pedidos : ", dbpedidos);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (contraSiigo) {
      console.log("Items pedidos : ", dataitemspedidos);
      console.log("Pedidos : ", datapedidos);
      console.log("Codigos Categorias : ", codigoscategorias);

      setLoading(true);

      const newItemPed = [];
      dataitemspedidos &&
        dataitemspedidos.map((items, index) => {
          if (items.sincodigosiigo == 0) {
            codigoscategorias &&
              codigoscategorias.map((categoria, index) => {
                console.log("Codigos Categorias : ", categoria);
                if (
                  items.categoriauno === categoria.nombretipoproducto &&
                  items.categoriados === categoria.nombrecategoriauno &&
                  items.categoriatres === categoria.nombrecategoriados &&
                  items.categoriacuatro === categoria.nombrecategoriatres
                ) {
                  let row = {
                    itempedido: items.itempedido,
                    pedido: items.pedido,
                    advert_name: items.advert_name,
                    advert_code: items.advert_code,
                    brand_name: items.brand_name,
                    price: items.price,
                    precio1: items.price,
                    precio2: items.price,
                    quantity: items.quantity,
                    sincodigosiigo: items.sincodigosiigo,
                    codigoconsecutivo: items.codigoconsecutivo,
                    subtotal: items.subtotal,
                    tax_total: items.tax_total,
                    taxon_name: items.taxon_name,
                    total: items.total,
                    variant_barcode: items.variant_barcode,
                    variant_name: items.variant_name,
                    variant_sku: items.variant_sku,
                    codigoproductosiigo: items.codigoproductosiigo,
                    direccion: items.direccion,
                    observaciones: items.observaciones,
                    categoriauno: items.categoriauno,
                    categoriados: items.categoriados,
                    categoriatres: items.categoriatres,
                    categoriacuatro: items.categoriacuatro,
                    codigoconsecutivo: categoria.codigo,
                    siguiente: categoria.siguiente,
                    consecutivo: categoria.consecutivo,
                  };
                  newItemPed.push(row);
                }
              });
          }
        });
      console.log("ITEMS CREAR : ", newItemPed);
      setitemsCrear(newItemPed);
      let contar = 0;
      const newCreaPrd = [];

      newItemPed &&
        newItemPed.map((items, index) => {
          contar = contar + 1;
          let newcod = items.codigoconsecutivo + "000001";
          const params = {
            code: newcod,
            name: items.advert_name,
            reference: items.variant_sku,
            description: items.taxon_name,
            barcode: items.variant_barcode,
            brand: items.brand_name,
            tariff: "19",
            model: "Prueba",
            price: items.price,
            precio1: items.price,
            precio2: items.price,
          };

          console.log("NEW CREA PRODUCTO : ", params);

          if (items.codigoconsecutivo == "COFJU") {
            const creaproducto = async () => {
              await axios({
                method: "post",
                url: "https://sitbusiness.co/cyclewear/api/711",
                params,
              })
                .then((res) => {
                  console.log("RETORNA API :", res);

                  setLoading(false);
                })
                .catch(function (error) {
                  console.log("ERROR Actualizando");
                });

              if (contar > 0) return;
            };
            creaproducto();
          }
        });
      //setLoading(false);

      setContraSiigo(false);
    }
  }, [contraSiigo]);

  const validaContraSiigo = async () => {
    setContraSiigo(true);
  };

  return (
    <div>
      {loading ? <Loading /> : null}
      <br />
      <Row>
        <Col xl={3} lg={3} md={3} xs={3}>
        </Col>
        <Col xl={3} lg={3} md={3} xs={3}>
          <ReactHTMLTableToExcel
            className="botones"
            table="ubicacionesequipos"
            filename="DatosProductosCWR"
            sheet="Sheet"
            ButtonText="Exportar a Excel"
          />

        </Col>
        {/*
        <Col xl={3} lg={3} md={3} xs={3}>
          <Button
            className="botones"
            color="primary"
            onClick={validaContraSiigo}
          >
            Por Crear en SIIGO
          </Button>
        </Col>
        */}
        <Col xl={3} lg={3} md={3} xs={3}>
          <Button
            className="botones"
            color="primary"
            onClick={validaContraSiigo}
          >
            Crear Producto
          </Button>
        </Col>
      </Row>
      <hr />
      {
        <table id="ubicacionesequipos" className="table">
          <thead>
            <tr>
              <th>Codigo Siigo</th>
              <th>Pedido</th>
              <th>Sku</th>
              <th>Name</th>
              <th>Precio</th>
              <th>Tipo Producto</th>
              <th>Categoria Uno</th>

            </tr>
          </thead>
          <tbody>
            {pendienteCrear &&
              pendienteCrear.map((productos, index) => {
                return (
                  <tr>
                    <td>{productos.codigoconsecutivo}</td>
                    <td>{productos.pedido}</td>
                    <td>{productos.variant_sku}</td>
                    <td>{productos.advert_name}</td>
                    <td>{productos.price}</td>
                    <td>{productos.categoriauno}</td>
                    <td>{productos.categoriados}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      }
    </div>
  );
}

export default AddProductSiigo;
