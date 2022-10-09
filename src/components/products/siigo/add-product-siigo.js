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
      await axios({
        method: "post",
        url: "https://sitbusiness.co/cyclewear/api/27"
      })
        .then((res) => {
          //console.log("PRODUCTOS SIIGO: ", res.data);
          setListProductosSiigo(res.data);

          //setLeeFacturas(true);
        })
        .catch(function (error) {
          console.log("ERROR LEYENDO FACTURAS");
        });
    }

    leeProductosSiigo();
  };

  const grabarDatos = (datos) => {
    console.log("DATOS ITEM PEDIDO : ", datos);

    const validaprdsiigo = async () => {
      let params = {
        sku: datos.variant_sku
      };

      await axios({
        method: "post",
        url: "https://sitbusiness.co/cyclewear/api/24",
        params,
      })
        .then((res) => {
          console.log("LEE PRODUCTO : ", res)
          console.log("PRODUCTO EXISTE EN SIIGo")
          swal(
            "CYCLE WEAR",
            "Producto existe en SIIGO!",
            "warning",
            { button: "Aceptar" }
          );
        })
        .catch(function (error) {
          console.log("PRODUCTO EXISTE EN SIIGo")
          grabarDatosBD(datos)
        });
    };
    validaprdsiigo();
  };

  const grabarDatosBD = (datos) => {
    console.log("PRODUCTOS SIIGO : ", lisProductosSiigo);
    return
    let prefijo;
    let contador;
    let consecutivo;
    let resultado;
    let params;
    let codigosiigo;
    let grupo;
    let datoscreaproducto;

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
          grupo = res.data[0].grupoinventario;
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
            model: "",
            price: datos.price,
            precio1: datos.price,
            precio2: datos.price,
            account_group: grupo
          };

          //console.log("NEW CREA PRODUCTO : ", params);

          const creaproducto = async () => {
            await axios({
              method: "post",
              url: "https://sitbusiness.co/cyclewear/api/711",
              params,
            })
              .then((rest) => {
                console.log("RETORNA API :", rest.data);

                //DATOS PARA CREAR PRODUCTO EN SIIGO
                datoscreaproducto = rest.data;
                console.log("DATOS  CREA PRODUCTO : ", res.data);

                if (rest.data.status === 200) {
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

                                let porcetajeiva = 0;
                                if (datoscreaproducto.idiva == 745)
                                  porcetajeiva = 19
                                else
                                  if (datoscreaproducto.idiva == 746)
                                    porcetajeiva = 5
                                  else
                                    porcetajeiva = 0

                                const creaprdsiigo = async () => {
                                  params = {
                                    bodega: datoscreaproducto.bodega,
                                    cantidad: datoscreaproducto.cantidad,
                                    codigo: datoscreaproducto.codigo,
                                    codigobarra: datoscreaproducto.codigobarra,
                                    estado: datoscreaproducto.estado,
                                    fechadecreacion: datoscreaproducto.fechadecreacion,
                                    id: datoscreaproducto.id,
                                    idgrupo: datoscreaproducto.idgrupo,
                                    idiva: datoscreaproducto.idiva,
                                    marca: datoscreaproducto.marca,
                                    nombre: datoscreaproducto.nombre,
                                    nombrebodega: datoscreaproducto.nombrebodega,
                                    nombregrp: datoscreaproducto.nombregrp,
                                    sku: datoscreaproducto.sku,
                                    valor: datoscreaproducto.valor,
                                    valoriva: datoscreaproducto.valoriva,
                                    porcetajeiva: datoscreaproducto.valoriva,
                                  };

                                  await axios({
                                    method: "post",
                                    url: "https://sitbusiness.co/cyclewear/api/22",
                                    params,
                                  })
                                    .then((res) => {
                                      console.log("RESPTA PRODUCTO : ", res)
                                      if (res.data.type === 1) {
                                        swal(
                                          "CYCLE WEAR",
                                          "Producto creado correctamente en SIIGO!",
                                          "success",
                                          { button: "Aceptar" }
                                        );
                                      }
                                    })
                                    .catch(function (error) {
                                      swal(
                                        "CYCLE WEAR",
                                        "Error creando Producto en SIIGO!",
                                        "warning",
                                        { button: "Aceptar" }
                                      );
                                    });
                                };
                                creaprdsiigo();
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
                swal(
                  "CYCLE WEAR",
                  "Consecutivo Prefijo no existe!",
                  "success",
                  { button: "Aceptar" }
                );
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

  const columnas = [
    {
      field: 'codigoproductosiigo',
      title: 'Codigo',
      cellStyle: { minWidth: 10 },
      cellStyle: { maxWidth: 10 }
    },
    {
      field: 'pedido',
      title: 'Pedido',
      cellStyle: { minWidth: 10 },
      cellStyle: { maxWidth: 10 }
    },
    {
      field: 'variant_sku',
      title: 'Sku',
      cellStyle: { minWidth: 10 },
      cellStyle: { maxWidth: 10 }
    },
    {
      field: 'price',
      title: 'Precio',
      cellStyle: { minWidth: 10 },
      cellStyle: { maxWidth: 10 }
    },
    {
      field: 'advert_name',
      title: 'Descripción',
      cellStyle: { minWidth: 200 }
    },
    {
      field: 'categoriauno',
      title: 'Tipo de producto',
      cellStyle: { minWidth: 50 },
      cellStyle: { maxWidth: 50 }
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
            Sin Codigo
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