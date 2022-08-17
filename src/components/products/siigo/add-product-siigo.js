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

  const [loading, setLoading] = useState(false);
  const fechaactual = Moment(new Date()).format("YYYY-MM-DD");
  //const fechaactual = Moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  const [datos, setDatos] = useState([]);
  const dispatch = useDispatch();
  const [contraSiigo, setContraSiigo] = useState(false);
  const [itemUpdate, setItemUpdate] = useState([]);
  const [datapedidos, setDatapedidos] = useState([]);
  const [dataitemspedidos, setDataitemspedidos] = useState([]);
  const [actualizar, setActualizar] = useState(false);
  const [leerTodos, setLeerTodos] = useState(false);
  const [pendienteCrear, setPendienteCrear] = useState([]);
  const [codigoscategorias, setCodigosCategorias] = useState([]);
  const [lisProductosSiigo, setListProductosSiigo] = useState([]);
  const [validarDatos, setValidarDatos] = useState(true);

  //console.log("IMAGEN : ", imagen1)

  useEffect(() => {

    let datospedidos;
    setLoading(true);
    const pedidos = async () => {
      await axios({
        method: "post",
        url: "https://sitbusiness.co/cyclewear/api/210",
      })
        .then((res) => {
          setDatapedidos(res.data);
          datospedidos = res.data;
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

          datospedidos &&
            datospedidos.map((ped, index) => {
              if (ped.status != "sent") {
                if (!leerTodos) {
                  res.data &&
                    res.data.map((items, index) => {
                      if (items.sincodigosiigo == 0 && items.pedido == ped.id_fact) {
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
                          categoriacuatro: items.categoriacuatro,
                        }
                        newProdPend.push(row);
                      }
                    });
                } else {
                  res.data &&
                    res.data.map((items, index) => {
                      if (items.pedido == ped.id_fact) {
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
                          categoriacuatro: items.categoriacuatro,
                        }
                        newProdPend.push(row);
                      }
                    });
                }
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
    //console.log("Items pedidos : ", dbitemspedidos);
    //console.log("Productos : ", dbproductos);
    //console.log("Pedidos : ", dbpedidos);
    leerProductoSiigo();
    setActualizar(false);
  }, [actualizar]);

  const pendientesCrear = async () => {
    setActualizar(true);
    setLeerTodos(false);
  };

  const mostrarTodos = async () => {
    setActualizar(true);
    setLeerTodos(true);
  };

  const leerProductoSiigo = async () => {
    setLoading(true);
    const newDetPed = [];

    const leeProductosSiigo = async () => {
      for (var i = 1; i < 12; i++) {
        const params = {
          pagina: i,
        };

        if (i == 10) {
          setLoading(false);
          setListProductosSiigo(newDetPed);
          console.log("PRODUCTOS SIIGO : ", newDetPed);
          setValidarDatos(true);
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
  };

  const validaContraSiigo = async () => {
    setContraSiigo(true);
  };

  const grabarDatos = (datos) => {
    //console.log("DATOS ITEM PEDIDO : ", datos);
    //console.log("PRODU CTOS SIIGO : ", lisProductosSiigo);
    let prefijo;
    let contador;
    let consecutivo;
    let resultado;
    let params;
    let valida = true;
    let codigosiigo;

    if (lisProductosSiigo.length > 0)
      setValidarDatos(true)
    else {
      valida = false;
      setValidarDatos(false)
    }

    if (!valida) {
      swal(
        "CYCLE WEAR",
        "Autorización SIIGO vencida, debe renovar!",
        "warning",
        { button: "Aceptar" }
      );
      return
    }

    lisProductosSiigo &&
      lisProductosSiigo.map((items, index) => {
        if (items.sku == datos.variant_sku) {
          setValidarDatos(false)
          valida = false;
          codigosiigo = items.code;
        }
      });

    if (!valida) {
      swal(
        "CYCLE WEAR",
        "Producto ya existe en SIIGO, revisar!",
        "warning",
        { button: "Aceptar" }
      );
      const actualiza = async () => {
        params = {
          estado: 2,
          itempedido: datos.itempedido,
          codigosiigo: codigosiigo
        };

        await axios({
          method: "post",
          url: "https://sitbusiness.co/cyclewear/api/718",
          params,
        })
          .then((res) => {
            console.log("Actualizando : ", params);

          })
          .catch(function (error) {
            console.log("ERROR Actualizando");
          });
      };
      actualiza();
      return
    }

    if (valida) {
      const leeConsecutivo = async () => {
        params = {
          tipoproducto: datos.categoriauno,
          categoriauno: datos.categoriados,
          categoriados: datos.categoriatres,
          categoriatres: datos.categoriacuatro
        };

        await axios({
          method: "post",
          url: "https://sitbusiness.co/cyclewear/api/28",
          params,
        })
          .then((res) => {
            //console.log("CONSECUTIVO : ", res.data[0].codigo);
            prefijo = res.data[0].codigo;
            contador = res.data[0].consecutivo + 1;
            consecutivo = String(contador);
            resultado = prefijo + consecutivo.padStart(6, '000000');
            //console.log("CONSECUTIVO : ", resultado);
            //setListIdentificacion(newDetId[0]);

            params = {
              code: resultado,
              name: datos.advert_name,
              reference: datos.variant_sku,
              description: datos.taxon_name,
              barcode: datos.variant_barcode,
              marca: datos.brand_name,
              tariff: "19",
              model: "Prueba",
              price: datos.price,
              precio1: datos.price,
              precio2: datos.price,
            };

            console.log("NEW CREA PRODUCTO : ", params);

            const creaproducto = async () => {
              await axios({
                method: "post",
                url: "https://sitbusiness.co/cyclewear/api/711",
                params,
              })
                .then((rest) => {
                  console.log("RETORNA API :", rest);
                  if (rest.status === 200) {
                    swal(
                      "CYCLE WEAR",
                      "Producto registrado en SIIGO de forma correcta!",
                      "success",
                      { button: "Aceptar" }
                    );
                    const actualizaPrefijo = async () => {
                      //alert("ENTRE")
                      params = {
                        consecutivo: contador,
                        prefijo: prefijo
                      }
                      await axios({
                        method: "post",
                        url: "https://sitbusiness.co/cyclewear/api/19",
                        params
                      })
                        .then((result) => {
                          if (result.status === 200) {
                            swal(
                              "CYCLE WEAR",
                              "Consecutivo prefijo actualizado de forma correcta!",
                              "success",
                              { button: "Aceptar" }
                            );
                            const actualiza = async () => {
                              params = {
                                estado: 2,
                                itempedido: datos.itempedido,
                                codigosiigo: resultado
                              };

                              await axios({
                                method: "post",
                                url: "https://sitbusiness.co/cyclewear/api/718",
                                params,
                              })
                                .then((res) => {
                                  console.log("Actualizando : ", params);

                                })
                                .catch(function (error) {
                                  console.log("ERROR Actualizando");
                                });
                            };
                            actualiza();
                          } else {
                            swal(
                              "CYCLE WEAR",
                              "Error al actualizar consecutivo prefijo, Intenta nuevamente!",
                              "warning",
                              { button: "Aceptar" }
                            );
                          }
                        })
                        .catch(function (error) {
                          console.log("ERROR ACTUALIZANDO PREFIJOS");
                        });
                    };
                    actualizaPrefijo();
                  } else {
                    swal(
                      "CYCLE WEAR",
                      "Error al grabar el producto en SIIGO, Intenta nuevamente!",
                      "warning",
                      { button: "Aceptar" }
                    );
                  }
                  setLoading(false);
                })
                .catch(function (error) {
                  console.log("ERROR Actualizando");
                });
            };
            creaproducto();

          })
          .catch(function (error) {
            console.log("ERROR LEYENDO FACTURAS");
          });
      };
      leeConsecutivo();
    }

  }

  const columnas = [
    {
      field: 'codigoconsecutivo',
      title: 'Codigo',
      cellStyle: { minWidth: 50 }
    },
    {
      field: 'pedido',
      title: 'Pedido',
      cellStyle: { minWidth: 50 }
    },
    {
      field: 'variant_sku',
      title: 'Sku',
      cellStyle: { minWidth: 50 }
    },
    {
      field: 'price',
      title: 'Precio',
      cellStyle: { minWidth: 50 }
    },
    {
      field: 'categoriauno',
      title: 'Tipo de producto',
      cellStyle: { minWidth: 50 }
    },
    {
      field: 'categoriados',
      title: 'Categoría',
      cellStyle: { minWidth: 50 }
    },
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
            className="botones"
            table="ubicacionesequipos"
            filename="DatosProductosCWR"
            sheet="Sheet"
            ButtonText="Exportar a Excel"
          />

        </Col>
        <Col xl={3} lg={3} md={3} xs={3}>
          <Button
            className="botonestercero"
            color="primary"
            onClick={pendientesCrear}
          >
            Sin Cedula
          </Button>
        </Col>
        <Col xl={3} lg={3} md={3} xs={3}>
          <Button
            className="botonestercero"
            color="primary"
            onClick={mostrarTodos}
          >
            Mostrar Todos
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

export default AddProductSiigo;
