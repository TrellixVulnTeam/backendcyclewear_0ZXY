import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Moment from "moment";
import {
  Col,
  Row,
} from "reactstrap";
//import Loading from "../../../components/elements/Loading";
import Loading from "../elements/Loading/Loading";

function CreateInvoice(props) {
  const [lisPedidos, setListPedidos] = useState([]);
  const [lisProductosSiigo, setListProductosSiigo] = useState([]);
  const [listDetalleFacturas, setListDetalleFacturas] = useState([]);
  const [pagina, setPagina] = useState(false);
  const [loading, setLoading] = useState(false);
  const fechaactual = Moment(new Date()).format("YYYY-MM-DD");
  //const fechaactual = Moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  const dispatch = useDispatch();
  const [leeFacturas, setLeeFacturas] = useState(false);
  const [leePedidos, setLeePedidos] = useState(true);
  const [actualizaBD, setActualizaBD] = useState(false);
  const [validarDatos, setValidarDatos] = useState(false);
  const [contraSiigo, setContraSiigo] = useState(false);

  const [datapedidos, setDatapedidos] = useState([]);
  const [dataitemspedidos, setDataitemspedidos] = useState([]);
  const [dataproductos, setDataproductos] = useState([]);
  const [codigoscategorias, setCodigosCategorias] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLeePedidos(true)
    }, 3600000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (leePedidos) { 
      const newDet = [];
      setLeePedidos(false);
      let contador = 100;
      let contadordos = 0;

      const consultaFacturas = async () => {
        setLoading(true);
        for (var i = 91; i < 101; i++) {
          const params = {
            pagina: i,
          };
          if (i == 98) {
            //setLoading(false);
            setLeeFacturas(true);
            setLoading(false);
            break;
          }
          contadordos = i;
          //console.log("FECHA ", params);
          await axios({
            method: "post",
            url: "https://sitbusiness.co/cyclewear/api/201",
            params,
          })
            .then((res) => {
              console.log("DATOS RETORNA : ", res.data.data);
              res.data.data &&
                res.data.data.map((row, index) => {
                  //console.log("ID FACTURAS LEIDAS : ", row);
                  let date = new Date(row.attributes.created_at);
                  let fecha = String(
                    date.getFullYear() +
                    "-" +
                    String(date.getMonth() + 1).padStart(2, "0") +
                    "-" +
                    date.getDate()
                  ).padStart(2, "0");
                  //console.log("FECHA : ", fecha);
                  let item = {
                    id_fact: row.id,
                    id_siigo: 0,
                    comprobante: 0,
                    prefijo: 0,
                    facturasiigo: 0,
                    fechafactura: fecha,
                    idcliente: 0,
                    estadocliente: 0,
                    valorfactura: row.attributes.subtotal,
                    descuento: row.attributes.discount,
                    cost_center: 1440,
                    seller: 768,
                    valorimpuesto: row.attributes.tax_total,
                    porcentajeimpto: 0,
                    delivery_type: row.attributes.delivery_type,
                    status: row.attributes.status,
                    Observaciones: "",
                  };

                  newDet.push(item);
                });

              setListPedidos(newDet);

              newDet &&
                newDet.map((params, index) => {
                  //console.log("PEDIDOS LEIDOS : ", params);

                  const grabarpedidos = async () => {
                    await axios({
                      method: "post",
                      url: "https://sitbusiness.co/cyclewear/api/206",
                      params,
                    })
                      .then((res) => {
                        //console.log("VALOR CONTADOR DOS : ", contadordos);
                        //setListIdentificacion(newDetId[0]);
                      })
                      .catch(function (error) {
                        console.log("ERROR LEYENDO PEDIDOS");
                      });
                  };
                  grabarpedidos();
                });
            })
            .catch(function (error) {
              console.log("ERROR LEYENDO PEDIDOS");
            });
        }
      };
      consultaFacturas();
    }
  }, [leePedidos]);

  useEffect(() => {
    if (leeFacturas) {
      //console.log("NUMERO DE PEDIDOS : ", lisPedidos.length);
      //console.log("PEDIDOS : ", lisPedidos);
      setLoading(true);
      const newDetPed = [];

      let control = 0;
      let numeropedidos = lisPedidos.length;

      lisPedidos &&
        lisPedidos.map((facturas, index) => {
          const leer = async () => {
            const params = {
              factura: facturas.id_fact,
            };
            //console.log("LISTADO PEDIDOS : ", params)

            await axios({
              method: "get",
              url: "https://sitbusiness.co/cyclewear/api/202",
              params,
            })
              .then((res) => {
                let tamaño = res.data.included.length;
                let posicion = tamaño - 1;
                let direccion = res.data.included[posicion].attributes.address;
                let first_name = res.data.included[posicion].attributes.first_name;
                let surname = res.data.included[posicion].attributes.surname;
                let email_address = res.data.included[posicion].attributes.email_address;
                let city = res.data.included[posicion].attributes.city;
                let state = res.data.included[posicion].attributes.state;
                let postcode = res.data.included[posicion].attributes.postcode;
                let phone = res.data.included[posicion].attributes.phone;
                //let status = res.data.included[posicion].attributes.status;

                console.log("DETALLE PEDIDOD : ", res.data.included[posicion].attributes);
                //return
                res.data.included &&
                  res.data.included.map((itempedido, index) => {
                    console.log("ITEM PEDIDOS : ", itempedido);
                    let codigoproducto;
                
                    if (itempedido.type == "line_items") {
                      //console.log("GRABANDO PEDIDOD : ", params);
                      let categorias = itempedido.attributes.taxon_name;
                      let divide = [];
                      divide = categorias.split("-");
                      let cadena = divide.length;
                      let categoriauno = "";
                      let categoriados = "";
                      let categoriatres = "";
                      let categoriacuatro = "";
                      let codigoconsecutivo = "";

                      if (cadena === 2) {
                        categoriauno = divide[0];
                        categoriados = divide[1];
                      } else if (cadena === 3) {
                        categoriauno = divide[0];
                        categoriados = divide[1];
                        categoriatres = divide[2];
                      } else if (cadena === 4) {
                        categoriauno = divide[0];
                        categoriados = divide[1];
                        categoriatres = divide[2];
                        categoriacuatro = divide[3];
                      } else {
                        categoriauno = "";
                        categoriados = "";
                        categoriatres = "";
                        categoriacuatro = "";
                      }

                      if (!categoriatres) {
                        categoriatres = categoriados;
                        categoriacuatro = categoriados;
                      } else
                        if (!categoriacuatro) {
                          categoriacuatro = categoriatres;
                        }

                      //console.log("CATEGORIAS : ", divide);

                      let item = {
                        itempedido: itempedido.id,
                        pedido: itempedido.attributes.invoice_id,
                        advert_name: itempedido.attributes.advert_name,
                        advert_code: itempedido.attributes.advert_code,
                        brand_name: itempedido.attributes.brand_name,
                        price: itempedido.attributes.price,
                        quantity: itempedido.attributes.quantity,
                        subtotal: itempedido.attributes.subtotal,
                        tax_total: itempedido.attributes.tax_total,
                        taxon_name: itempedido.attributes.taxon_name,
                        total: itempedido.attributes.total,
                        variant_barcode: itempedido.attributes.variant_barcode,
                        variant_name: itempedido.attributes.variant_name,
                        variant_sku: itempedido.attributes.variant_sku,
                        status: itempedido.attributes.status,
                        nombre: first_name,
                        apellido: surname,
                        email: email_address,
                        ciudad: city,
                        departamento: state,
                        codigopostal: postcode,
                        phone: phone,
                        codigoproductosiigo: 0, //codigoproducto,
                        direccion: direccion,
                        observaciones: "",
                        categoriauno: categoriauno,
                        categoriados: categoriados,
                        categoriatres: categoriatres,
                        categoriacuatro: categoriacuatro,
                        codigoconsecutivo: codigoconsecutivo
                      };
                      //console.log("ITEM PEDIDO : ", item)
                      newDetPed.push(item);
                    }
                  });
              })
              .catch(function (error) {
                console.log("ERROR LEYENDO FACTURAS");
              });

            control = control + 1;
            //console.log("VALOR CONTROL : ", control);
            if (control === numeropedidos) {
              console.log("LOADING EN FALSE");
              //setLoading(false);
              actualizarDatosBD();
            }
          };
          leer();
        });

      setListDetalleFacturas(newDetPed);
      setLeeFacturas(false);
      //setContraSiigo(true);
      //setInterval(setContraSiigo(true),14000);
    }
  }, [leeFacturas]);

  const readPedidos = () => {
    setLeePedidos(true);
    //setLeeFacturas(true);
  };

  useEffect(() => {
    //console.log("TERCEROS CREADOS : ", listaTercerosCreados);
    //console.log("FACTURAS LEIDAS : ", datosClientesFacturas);
    if (actualizaBD) {
      setLoading(true);
      console.log("ENCABEZADO PEDIDOS : ", lisPedidos);
      console.log("DETALLE PEDIDOS : ", listDetalleFacturas);

      let longitud = lisPedidos.length;
      let contador = 0;

      contador = 0;
      longitud = listDetalleFacturas.length;
      //console.log("NUMERO ITEMS PEDIDOS : ", longitud);

      listDetalleFacturas &&
        listDetalleFacturas.forEach((row) => {
          const leerItems = async () => {
            //let anno = row.fechafactura.getFullYear();
            //let mes = row.fechafactura.getMonth();
            //let dia = row.fechafactura. getDate();
            //console.log("VALOR FECHA : ", Moment.format("YYYY/MM/DD", row.fechafactura));

            const params = {
              itempedido: row.itempedido,
              pedido: row.pedido,
              advert_name: row.advert_name,
              advert_code: row.advert_code,
              brand_name: row.brand_name,
              price: row.price,
              quantity: row.quantity,
              subtotal: row.subtotal,
              tax_total: row.tax_total,
              taxon_name: row.taxon_name,
              total: row.total,
              variant_barcode: row.variant_barcode,
              variant_name: row.variant_name,
              variant_sku: row.variant_sku,
              status: row.status,
              codigoproductosiigo: row.codigoproductosiigo,
              direccion: row.direccion,
              observaciones: "Items pedido # " + row.pedido,
              categoriauno: row.categoriauno,
              categoriados: row.categoriados,
              categoriatres: row.categoriatres,
              categoriacuatro: row.categoriacuatro,
            };
            await axios({
              method: "post",
              url: "https://sitbusiness.co/cyclewear/api/207",
              params,
            })
              .then((res) => {
                contador = contador + 1;
                if (contador === longitud) {
                  console.log("VALOR RESPONSE : ", res);
                  leerProductoSiigo(true);
                  //setLoading(false);
                }
              })
              .catch(function (error) {
                console.log("ERROR LEYENDO FACTURAS");
              });
          };
          leerItems();
        });
      setActualizaBD(false);
    }
  }, [actualizaBD]);

  //const leerDatosFacturas = async () => {
  const actualizarDatosBD = () => {
    setActualizaBD(true);
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

  useEffect(() => {
    if (validarDatos) {
      setLoading(true);

      const productos = async () => {
        await axios({
          method: "post",
          url: "https://sitbusiness.co/cyclewear/api/27",
        })
          .then((res) => {
            //console.log("Productos : ", res.data);
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
            //validaContraSiigo();
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
            //validaContraSiigo();
            //setLoading(false);
          })
          .catch(function (error) {
            console.log("ERROR LEYENDO PEDIDOS");
          });
      };
      consecutivoscategorias();

      setTimeout(() => {
        setContraSiigo(true);
      }, 60000);
      
      setLoading(false);
      setValidarDatos(false);
    }
  }, [validarDatos]);

  useEffect(() => {
    if (contraSiigo) {
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
      let valida;
      newItemPed &&
        newItemPed.map((items, index) => {
          valida = newProd.includes(items.sku);
          if (!valida) {
            newItems.push(items);
          }
        });

      //console.log("NEW ITEMS : ", newItems);

      let cantidad = newItems.length;
      let contar = 0;

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
                if (cantidad == contar) {
                  leeIdentificacion();
                }
              })
              .catch(function (error) {
                contar = contar + 1;
                if (cantidad == contar) {
                  leeIdentificacion();
                }
                console.log("ERROR Actualizando");
              });
          };
          actualiza();
        });
        setLoading(false);
        setContraSiigo(false);
      //setInterval(setLoading(false),100000);
      
    }
  }, [contraSiigo]);

  const leeIdentificacion = async () => {
    setLoading(true);

    let contador = datapedidos.length;
    console.log("LONGITUD DATA PEDIDOS : ", contador);

    let contadordos = 0;
    const newItems = [];

    datapedidos &&
      datapedidos.map((pedido, index) => {
        const identificacion = async () => {
          const params = {
            factura: pedido.id_fact,
          };

          await axios({
            method: "post",
            url: "https://sitbusiness.co/cyclewear/api/709",
            params
          })
            .then((res) => {

              //console.log("CEDULAS : ", res.data);
              contadordos = contadordos + 1;
              console.log("Contador : ", contadordos);

              let items = {
                pedido: pedido.id_fact,
                cedula: res.data[0].document
              };
              newItems.push(items);

              if (contadordos == contador) {
                let long = newItems.length;
                let cont = 0;

                newItems.map((items, index) => {
                  console.log("INFORMACION PEDIDOS : ", items);
                  const actualizaId = async () => {
                    const params = {
                      cedula: items.cedula,
                      pedido: items.pedido,
                      estado: 1
                    };
                    console.log("DATOS PARAMS : ", params)

                    await axios({
                      method: "post",
                      url: "https://sitbusiness.co/cyclewear/api/212",
                      params
                    })
                      .then((res) => {
                        cont = cont + 1;
                        console.log("Actualizando Pedido : ", items.pedido);

                        if (cont == long) {
                           setLeePedidos(false)
                           actualizaItemsPedidos();
                        }
                      })
                      .catch(function (error) {
                        cont = cont + 1;
                        if (cont == long) {
                          actualizaItemsPedidos();
                        }
                        console.log("ERROR Actualizando");
                      });
                  };
                  actualizaId();
                });
              }
            })
            .catch(function (error) {
              contadordos = contadordos + 1;
              console.log("ERROR Actualizando");
            });
        };
        identificacion();
      });
  };

  const actualizaItemsPedidos = () => {
    console.log("Items pedidos : ", dataitemspedidos);
    console.log("Productos : ", dataproductos);
    console.log("Pedidos : ", datapedidos);
    setLoading(true);

    const newItems = [];
    let cantidad = newItems.length;
    let contar = 0;
    let totalitems = 0;
    let longituditems = dataitemspedidos.length;

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

    dataitemspedidos &&
      dataitemspedidos.map((items, index) => {
        dataproductos &&
          dataproductos.map((row, index) => {
            if (items.variant_sku == row.sku) {

              console.log("COMPARA : ", items.variant_sku, " --", row.sku);

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
                    totalitems = totalitems + 1;
                    console.log("Actualizando : ", params);
                    console.log("RESPUESTA : ", res);
                    contar = contar + 1;
                    if(totalitems == longituditems){
                      setLoading(false);
                      alert("DATOS ACTUALIZADOS");
                    }
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
    </div>
  );
}

export default CreateInvoice;
