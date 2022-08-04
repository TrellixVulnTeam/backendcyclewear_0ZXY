import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "./common/breadcrumb";
import { Link } from "react-router-dom";
import {
	Navigation,
	Box,
	MessageSquare,
	DollarSign,
	Briefcase,
	CreditCard,
	ShoppingCart,
	Calendar,
} from "react-feather";
import CountUp from "react-countup";
import { Chart } from "react-google-charts";
import { useSelector } from "react-redux";
import { Bar, Line } from "react-chartjs-2";
import {
	lineOptions,
	buyOption,
	employeeData,
	employeeOptions,
} from "../constants/chartData";
import "./dashboard.css";

import user2 from "../assets/images/dashboard/user2.jpg";
import user1 from "../assets/images/dashboard/user1.jpg";
import man from "../assets/images/dashboard/man.png";
import user from "../assets/images/dashboard/user.png";
import designer from "../assets/images/dashboard/designer.jpg";
import {
	Card,
	CardBody,
	CardHeader,
	Col,
	Container,
	Media,
	Row,
	Table,
	Button
} from "reactstrap";
import CreateInvoice from "./sales/CreateInvoice";

const Dashboard = () => {
	const [itemsDatosEntorno, setItemsDatosEntorno] = useState([]);

	const leedatosentorno = useSelector(
		(state) => state.datosentorno.datosentorno
	);

	//console.log("CONDICION PRODUCTO : ", leedatosentorno)

	useEffect(() => {
		localStorage.setItem('datosentorno', JSON.stringify(leedatosentorno));
	}, [leedatosentorno]);

	const lineData = {
		labels: ["100", "200", "300", "400", "500", "600", "700", "800"],
		datasets: [
			{
				lagend: "none",
				data: [2.5, 3, 3, 0.9, 1.3, 1.8, 3.8, 1.5],
				borderColor: "#ff8084",
				backgroundColor: "#ff8084",
				borderWidth: 2,
			},
			{
				lagend: "none",
				data: [3.8, 1.8, 4.3, 2.3, 3.6, 2.8, 2.8, 2.8],
				borderColor: "#a5a5a5",
				backgroundColor: "#a5a5a5",
				borderWidth: 2,
			},
		],
	};

	const buyData = {
		labels: ["", "10", "20", "30", "40", "50"],
		datasets: [
			{
				backgroundColor: "transparent",
				borderColor: "#13c9ca",
				data: [20, 5, 80, 10, 100, 15],
			},
			{
				backgroundColor: "transparent",
				borderColor: "#a5a5a5",
				data: [0, 50, 20, 70, 30, 27],
			},
			{
				backgroundColor: "transparent",
				borderColor: "#ff8084",
				data: [0, 30, 40, 10, 86, 40],
			},
		],
	};

	const doughnutOptions = {
		title: "",
		pieHole: 0.35,
		pieSliceBorderColor: "none",
		colors: ["#ff8084", "#13c9ca", "#a5a5a5"],
		legend: {
			position: "none",
		},
		pieSliceText: "none",
		tooltip: {
			trigger: "none",
		},
		animation: {
			startup: true,
			easing: "linear",
			duration: 1500,
		},
		chartArea: { left: 0, top: 10, width: "360px", height: "100%" },
		enableInteractivity: false,
	};
	const pieOptions = {
		title: "",
		pieHole: 1,
		slices: [
			{
				color: "#ff8084",
			},
			{
				color: "#13c9ca",
			},
			{
				color: "#f0b54d",
			},
		],
		tooltip: {
			showColorCode: false,
		},
		chartArea: { left: 0, top: 10, width: "360px", height: "100%" },
		legend: "none",
	};
	const LineOptions = {
		hAxis: {
			textPosition: "none",
			baselineColor: "transparent",
			gridlineColor: "transparent",
		},
		vAxis: {
			textPosition: "none",
			baselineColor: "transparent",
			gridlineColor: "transparent",
		},
		colors: ["#ff8084"],
		legend: "none",
	};
	const LineOptions1 = {
		hAxis: {
			textPosition: "none",
			baselineColor: "transparent",
			gridlineColor: "transparent",
		},
		vAxis: {
			textPosition: "none",
			baselineColor: "transparent",
			gridlineColor: "transparent",
		},
		colors: ["#13c9ca"],
		chartArea: { left: 0, top: 0, width: "100%", height: "100%" },
		legend: "none",
	};
	const LineOptions2 = {
		hAxis: {
			textPosition: "none",
			baselineColor: "transparent",
			gridlineColor: "transparent",
		},
		vAxis: {
			textPosition: "none",
			baselineColor: "transparent",
			gridlineColor: "transparent",
		},
		colors: ["#f5ce8a"],
		chartArea: { left: 0, top: 0, width: "100%", height: "100%" },
		legend: "none",
	};
	const LineOptions3 = {
		hAxis: {
			textPosition: "none",
			baselineColor: "transparent",
			gridlineColor: "transparent",
		},
		vAxis: {
			textPosition: "none",
			baselineColor: "transparent",
			gridlineColor: "transparent",
		},
		colors: ["#a5a5a5"],
		chartArea: { left: 0, top: 0, width: "100%", height: "100%" },
		legend: "none",
	};
	return (
		<Fragment>
			<Breadcrumb title="Tablero de Control" parent="Dashboard" />
			<Container fluid={true}>
				<Row className="mb-10">
					<Col xl="4" lg="4" md="4" sd="4">
					</Col>
					<Col xl="4" lg="4" md="4" sd="4">
						<Button className="botondatos">
							<Link to="/sales/CreateInvoice" >
								<h4 className="colorenlace">
									Actualizar datos
								</h4>
								
							</Link>
						</Button>
					</Col>
				</Row>
				<Row>
					<Col xl="3 xl-50" md="6">
						<Card className=" o-hidden widget-cards">
							<CardBody className="dashboardfacturacion">
								<Media className="static-top-widget row">
									<div className="icons-widgets col-4">
										<div className="align-self-center text-center">
											<DollarSign className="font-danger" />
										</div>
									</div>
									<Media body className="col-8">
										<span className="m-0 nombredashboardfacturacion">Facturación</span>
										<h3 className="mb-0">
											$ <CountUp className="counter" end={21507321} />
											<small>Mes Actual</small>
										</h3>
									</Media>
								</Media>
							</CardBody>
						</Card>
					</Col>
					<Col xl="3 xl-50" md="6">
						<Card className=" o-hidden  widget-cards">
							<CardBody className="bg-secondary ">
								<Media className="static-top-widget row">
									<div className="icons-widgets col-4">
										<div className="align-self-center text-center">
											<Box className="font-secondary" />
										</div>
									</div>
									<Media body className="col-8">
										<span className="m-0">Productos</span>
										<h3 className="mb-0">
											<CountUp className="counter" end={9856} />
											<small> Mes Actual</small>
										</h3>
									</Media>
								</Media>
							</CardBody>
						</Card>
					</Col>
					<Col xl="3 xl-50" md="6">
						<Card className="o-hidden widget-cards">
							<CardBody className="dashboardmensajes">
								<Media className="static-top-widget row">
									<div className="icons-widgets col-4">
										<div className="align-self-center text-center">
											<MessageSquare className="font-primary" />
										</div>
									</div>
									<Media body className="col-8">
										<span className="m-0 nombredashboardmensajes">Mensajes</span>
										<h3 className="mb-0">
											<CountUp className="counter" end={431} />
											<small> Mes Actual</small>
										</h3>
									</Media>
								</Media>
							</CardBody>
						</Card>
					</Col>
					<Col xl="3 xl-50" md="6">
						<Card className=" o-hidden widget-cards">
							<CardBody className="bg-danger ">
								<Media className="static-top-widget row">
									<div className="icons-widgets col-4">
										<div className="align-self-center text-center">
											<Briefcase className="font-danger" />
										</div>
									</div>
									<Media body className="col-8">
										<span className="m-0">Ventas en Unidades</span>
										<h3 className="mb-0">
											<CountUp className="counter" end={1631} />
											<small> Mes Actual</small>
										</h3>
									</Media>
								</Media>
							</CardBody>
						</Card>
					</Col>
					<Col xl="6 xl-100">
						<Card>
							<CardHeader>
								<h5>Evolución de las Ventas</h5>
							</CardHeader>
							<CardBody>
								<div className="market-chart">
									<Bar
										data={lineData}
										options={lineOptions}
										width={778}
										height={308}
									/>
								</div>
							</CardBody>
						</Card>
					</Col>
					<Col xl="6 xl-100">
						<Card>
							<CardHeader>
								<h5>Pedidos</h5>
							</CardHeader>
							<CardBody>
								<div className="user-status table-responsive latest-order-table">
									<Table borderless>
										<thead>
											<tr>
												<th scope="col"># Pedido</th>
												<th scope="col">Total</th>
												<th scope="col">Metodo de Pago</th>
												<th scope="col">Estados</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>1</td>
												<td className="digits">$121,567</td>
												<td className="font-danger">Transferencia Bancaria</td>
												<td className="digits">Despachado</td>
											</tr>
											<tr>
												<td>2</td>
												<td className="digits">$910,890</td>
												<td className="font-secondary">Transferencia</td>
												<td className="digits">Entregado</td>
											</tr>
											<tr>
												<td>3</td>
												<td className="digits">$245,341</td>
												<td className="font-warning">Efectivo</td>
												<td className="digits">Entregado</td>
											</tr>
											<tr>
												<td>4</td>
												<td className="digits">$123,500</td>
												<td className="font-primary">Transferencia</td>
												<td className="digits">$6523</td>
											</tr>
											<tr>
												<td>5</td>
												<td className="digits">$97,201</td>
												<td className="font-primary">Transferencia Bancaria</td>
												<td className="digits">Despachado</td>
											</tr>
										</tbody>
									</Table>
									<a href="#javaScript" className="btn btn-primary">
										Ver todos los pedidos
									</a>
								</div>
							</CardBody>
						</Card>
					</Col>
					<Col xl="3 xl-50" md="6">
						<Card className=" order-graph sales-carousel">
							<CardHeader>
								<h6>Ventas Totales</h6>
								<Row>
									<Col className="col-6">
										<div className="small-chartjs">
											<div
												className="flot-chart-placeholder"
												id="simple-line-chart-sparkline-3"
											>
												<Chart
													height={"60px"}
													chartType="LineChart"
													loader={<div>Cargando Imagen</div>}
													data={[
														["x", "time"],
														[0, 20],
														[1, 5],
														[2, 120],
														[3, 10],
														[4, 140],
														[5, 15],
													]}
													options={LineOptions}
													legend_toggle
												/>
											</div>
										</div>
									</Col>
									<Col className="col-6">
										<div className="value-graph">
											<h3>
												42%{" "}
												<span>
													<i className="fa fa-angle-up font-primary"></i>
												</span>
											</h3>
										</div>
									</Col>
								</Row>
							</CardHeader>
							<CardBody>
								<Media>
									<Media body>
										<span>Ventas ultimo mes</span>
										<h2 className="mb-0">9054</h2>
										<p>
											0.25%{" "}
											<span>
												<i className="fa fa-angle-up"></i>
											</span>
										</p>
										<h5 className="f-w-600 f-16">Ventas brutas en marzo</h5>
										<p>
											Ventas sin descontar gastos de operación
										</p>
									</Media>
									<div className="bg-primary b-r-8">
										<div className="small-box">
											<Briefcase />
										</div>
									</div>
								</Media>
							</CardBody>
						</Card>
					</Col>
					<Col xl="3 xl-50" md="6">
						<Card className=" order-graph sales-carousel">
							<CardHeader>
								<h6>Compras Total</h6>
								<Row>
									<Col className="col-6">
										<div className="small-chartjs">
											<div
												className="flot-chart-placeholder"
												id="simple-line-chart-sparkline"
											>
												<Chart
													height={"60px"}
													chartType="LineChart"
													loader={<div>Cargando Imagen</div>}
													data={[
														["x", "time"],
														[0, 85],
														[1, 83],
														[2, 90],
														[3, 70],
														[4, 85],
														[5, 60],
														[6, 65],
														[7, 63],
														[8, 68],
														[9, 68],
														[10, 65],
														[11, 40],
														[12, 60],
														[13, 75],
														[14, 70],
														[15, 90],
													]}
													options={LineOptions1}
													legend_toggle
												/>
											</div>
										</div>
									</Col>
									<Col className="col-6">
										<div className="value-graph">
											<h3>
												20%{" "}
												<span>
													<i className="fa fa-angle-up font-secondary"></i>
												</span>
											</h3>
										</div>
									</Col>
								</Row>
							</CardHeader>
							<CardBody>
								<Media>
									<Media body>
										<span>Compras del mes</span>
										<h2 className="mb-0">2154</h2>
										<p>
											0.13%{" "}
											<span>
												<i className="fa fa-angle-up"></i>
											</span>
										</p>
										<h5 className="f-w-600 f-16">Productos con existencia</h5>
										<p>
											Del total de productos codificados, cuales tienen inventario disponible.
										</p>
									</Media>
									<div className="bg-secondary b-r-8">
										<div className="small-box">
											<CreditCard />
										</div>
									</div>
								</Media>
							</CardBody>
						</Card>
					</Col>
					<Col xl="3 xl-50" md="6">
						<Card className="order-graph sales-carousel">
							<CardHeader>
								<h6>Total Ingresos en efectivo</h6>
								<Row>
									<Col className="col-6">
										<div className="small-chartjs">
											<div
												className="flot-chart-placeholder"
												id="simple-line-chart-sparkline-2"
											>
												<Chart
													height={"60px"}
													chartType="LineChart"
													loader={<div>Cargando Imagen</div>}
													data={[
														["x", "time"],
														[0, 85],
														[1, 83],
														[2, 90],
														[3, 70],
														[4, 85],
														[5, 60],
														[6, 65],
														[7, 63],
														[8, 68],
														[9, 68],
														[10, 65],
														[11, 40],
														[12, 60],
														[13, 75],
														[14, 70],
														[15, 90],
													]}
													options={LineOptions2}
													legend_toggle
												/>
											</div>
										</div>
									</Col>
									<Col className="col-6">
										<div className="value-graph">
											<h3>
												28%{" "}
												<span>
													<i className="fa fa-angle-up font-warning"></i>
												</span>
											</h3>
										</div>
									</Col>
								</Row>
							</CardHeader>
							<CardBody>
								<Media>
									<Media body>
										<span>Dinero en caja</span>
										<h2 className="mb-0">4672</h2>
										<p>
											0.8%{" "}
											<span>
												<i className="fa fa-angle-up"></i>
											</span>
										</p>
										<h5 className="f-w-600 f-16">Ultimos movimientos</h5>
										<p>
											Ingresos o movimientos
										</p>
									</Media>
									<div className="bg-warning b-r-8">
										<div className="small-box">
											<ShoppingCart />
										</div>
									</div>
								</Media>
							</CardBody>
						</Card>
					</Col>
					<Col xl="3 xl-50" md="6">
						<Card className="order-graph sales-carousel">
							<CardHeader>
								<h6>Total Ingresos</h6>
								<Row>
									<Col className="col-6">
										<div className="small-chartjs">
											<div
												className="flot-chart-placeholder"
												id="simple-line-chart-sparkline-1"
											>
												<Chart
													height={"60px"}
													chartType="LineChart"
													loader={<div>Gardando Imagen</div>}
													data={[
														["x", "time"],
														[0, 85],
														[1, 83],
														[2, 90],
														[3, 70],
														[4, 85],
														[5, 60],
														[6, 65],
														[7, 63],
														[8, 68],
														[9, 68],
														[10, 65],
														[11, 40],
														[12, 60],
														[13, 75],
														[14, 70],
														[15, 90],
													]}
													options={LineOptions3}
													legend_toggle
												/>
											</div>
										</div>
									</Col>
									<Col className="col-6">
										<div className="value-graph">
											<h3>
												75%{" "}
												<span>
													<i className="fa fa-angle-up font-danger"></i>
												</span>
											</h3>
										</div>
									</Col>
								</Row>
							</CardHeader>
							<CardBody>
								<Media>
									<Media body>
										<span>Consignaciones</span>
										<h2 className="mb-0">5782</h2>
										<p>
											0.25%{" "}
											<span>
												<i className="fa fa-angle-up"></i>
											</span>
										</p>
										<h5 className="f-w-600 f-16">Total movimientos</h5>
										<p>
											Numero total movimientos en bancos
										</p>
									</Media>
									<div className="bg-danger b-r-8">
										<div className="small-box">
											<Calendar />
										</div>
									</div>
								</Media>
							</CardBody>
						</Card>
					</Col>
					<Col sm="12">
						<Card>
							<CardHeader>
								<h5>Comparativo Ventas vs Compras</h5>
							</CardHeader>
							<CardBody className="sell-graph">
								<Line
									data={buyData}
									options={buyOption}
									width={700}
									height={350}
								/>
							</CardBody>
						</Card>
					</Col>
					<Col xl="6 xl-100">
						<Card className="height-equal">
							<CardHeader>
								<h5>Productos en carros</h5>
							</CardHeader>
							<CardBody>
								<div className="user-status table-responsive products-table">
									<table className="table table-bordernone mb-0">
										<thead>
											<tr>
												<th scope="col">Descripción</th>
												<th scope="col">Cantidad</th>
												<th scope="col">Estado</th>
												<th scope="col">Precio</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>Caramañola Elite</td>
												<td className="digits">1</td>
												<td className="font-primary">Pendiente</td>
												<td className="digits">$16,523</td>
											</tr>
											<tr>
												<td>Oakley Sutro Lite Matte</td>
												<td className="digits">5</td>
												<td className="font-secondary">Pendiente</td>
												<td className="digits">$124,500</td>
											</tr>
											<tr>
												<td>Bolsos Portaherramientas</td>
												<td className="digits">10</td>
												<td className="font-secondary">Pendiente</td>
												<td className="digits">$45,900</td>
											</tr>
											<tr>
												<td>Bicicleta de Ruta</td>
												<td className="digits">9</td>
												<td className="font-primary">Pendiente</td>
												<td className="digits">$2,367,000</td>
											</tr>
											<tr>
												<td>Llantas de Montaña</td>
												<td className="digits">8</td>
												<td className="font-primary">Pendiente</td>
												<td className="digits">$256,700</td>
											</tr>
											<tr>
												<td>Cascos de MTB</td>
												<td className="digits">3</td>
												<td className="font-secondary">Pendiente</td>
												<td className="digits">$567,000</td>
											</tr>
											<tr>
												<td>Rotores para Frenos</td>
												<td className="digits">8</td>
												<td className="font-primary">Pendiente</td>
												<td className="digits">$145,902</td>
											</tr>
										</tbody>
									</table>
								</div>
							</CardBody>
						</Card>
					</Col>
					<Col sm="12">
						<Card>
							<CardHeader>
								<h5>Informe de Ventas</h5>
							</CardHeader>
							<CardBody>
								<Row>
									<Col xl="3 xl-50" sm="6">
										<div className="order-graph">
											<h6>Pedidos por Ciudad</h6>
											<div className="chart-block chart-vertical-center">
												<Chart
													width={"100%"}
													height={"180px"}
													chartType="PieChart"
													loader={<div>Cargando Imagen</div>}
													data={[
														["Task", "Hours per Day"],
														["Sabaneta", 80],
														["Medellin", 105],
														["Bogota", 300],
													]}
													options={doughnutOptions}
													legend_toggle
												/>
											</div>
											<div className="order-graph-bottom">
												<Media>
													<div className="order-color-primary"></div>
													<Media body>
														<h6 className="mb-0">
															Sabaneta{" "}
															<span className="pull-right">$157</span>
														</h6>
													</Media>
												</Media>
												<Media>
													<div className="order-color-secondary"></div>
													<Media body>
														<h6 className="mb-0">
															Medellin <span className="pull-right">$347</span>
														</h6>
													</Media>
												</Media>
												<Media>
													<div className="order-color-danger"></div>
													<Media body>
														<h6 className="mb-0">
															Bogota<span className="pull-right">$468</span>
														</h6>
													</Media>
												</Media>
												<Media>
													<div className="order-color-warning"></div>
													<Media body>
														<h6 className="mb-0">
															Cali
															<span className="pull-right">$742</span>
														</h6>
													</Media>
												</Media>
												<Media>
													<div className="order-color-success"></div>
													<Media body>
														<h6 className="mb-0">
															Barranquilla{" "}
															<span className="pull-right">$647</span>
														</h6>
													</Media>
												</Media>
											</div>
										</div>
									</Col>
									<Col xl="3 xl-50" sm="6">
										<div className="order-graph sm-order-space">
											<h6>Ventas por Categoria</h6>
											<div className="peity-chart-dashboard text-center">
												<Chart
													chartType="PieChart"
													data={[
														["Task", "Hours per Day"],
														["Bicicletas", 300],
														["Cascos", 50],
														["Herramientas", 100],
													]}
													options={pieOptions}
													graph_id="PieChart"
													width={"100%"}
													height={"180px"}
													legend_toggle
												/>
											</div>
											<div className="order-graph-bottom sales-location">
												<Media>
													<div className="order-shape-primary"></div>
													<Media body>
														<h6 className="mb-0 mr-0">
															Bicicletas <span className="pull-right">25%</span>
														</h6>
													</Media>
												</Media>
												<Media>
													<div className="order-shape-secondary"></div>
													<Media body>
														<h6 className="mb-0 mr-0">
															Maletas <span className="pull-right">10%</span>
														</h6>
													</Media>
												</Media>
												<Media>
													<div className="order-shape-danger"></div>
													<Media body>
														<h6 className="mb-0 mr-0">
															Llantas & Neumáticos
															<span className="pull-right">34%</span>
														</h6>
													</Media>
												</Media>
												<Media>
													<div className="order-shape-warning"></div>
													<Media body>
														<h6 className="mb-0 mr-0">
															Zapatos<span className="pull-right">5%</span>
														</h6>
													</Media>
												</Media>
												<Media>
													<div className="order-shape-success"></div>
													<Media body>
														<h6 className="mb-0 mr-0">
															Accesorios <span className="pull-right">25%</span>
														</h6>
													</Media>
												</Media>
											</div>
										</div>
									</Col>
									<Col xl="6 xl-100">
										<div className="order-graph xl-space">
											<h6>Ingresos del último mes</h6>
											<div className="ct-4 flot-chart-container">
												<Line data={employeeData} options={employeeOptions} />
											</div>
										</div>
									</Col>
								</Row>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</Fragment >
	);
};

// javascript:void(0)

export default Dashboard;
