import React from "react";
import pro16 from "../images/dashboard/product/1.jpg";
import pro13 from "../images/dashboard/product/2.jpg";
import pro12 from "../images/dashboard/product/3.jpg";
import pro25 from "../images/dashboard/product/4.jpg";
import pro21 from "../images/dashboard/product/5.jpg";
import pro3 from "../images/dashboard/product/6.jpg";
import pro14 from "../images/dashboard/product/7.jpg";
import pro20 from "../images/dashboard/product/8.jpg";
import pro19 from "../images/dashboard/product/9.jpg";
import pro18 from "../images/dashboard/product/10.jpg";
import jwel12 from "../images/dashboard/product/11.jpg";
import jwel26 from "../images/dashboard/product/12.jpg";
import furniture8 from "../images/dashboard/product/13.jpg";
import cat3 from "../images/dashboard/product/14.jpg";
import fashion12 from "../images/dashboard/product/15.jpg";
import shoes from "../images/dashboard/product/16.jpg";
import pro06 from "../images/dashboard/product/17.jpg";
import pro9 from "../images/dashboard/product/18.jpg";
import pro6 from "../images/dashboard/product/19.jpg";
import pro7 from "../images/dashboard/product/20.jpg";

//Icones Estados
/*
status: <i className="fa fa-circle font-success f-12" />,
<i className="fa fa-circle font-success f-12" />
<i className="fa fa-circle font-success f-12" />

*/
const data = [
	{
		image: <img alt="" src={pro16} style={{ width: 50, height: 50 }} />,
		"Tipo de Producto": "Accesorios",
		"Descripción": "Los accesorios para bicicleta son aquellos complementos que nos ayudan a mejorarla y nos aportan nuevas capacidades. los más comunes son: sensores, ciclocomputadores, potenciómetros, electroestimulación, rodillos.",
		status: <i className="fa fa-circle font-success f-12" />,
		category: "Accesorios",
	},
	{
		image: <img alt="" src={pro13} style={{ width: 50, height: 50 }} />,
		"Tipo de Producto": "Bicicletas",
		"Descripción": "Vehículo de dos ruedas movido por una persona, provisto de un manubrio en la parte delantera, un asiento para el conductor y dos pedales que transmiten el movimiento de las piernas a la rueda trasera mediante una cadena y un piñón.",
		status: <i className="fa fa-circle font-success f-12" />,
		category: "Electronics",
	},
	{
		image: <img alt="" src={pro12} style={{ width: 50, height: 50 }} />,
		"Tipo de Producto": "Componentes",
		"Descripción": "Son cada una de las partes de una bicicleta o un grupo: el cambio, el desviador, la multiplicación, los duales, los shifters, para realizar los cambios, los frenos, las horquillas del freno: V-brake o Caliper para los discos entre otros.",
		status: <i className="fa fa-circle font-success f-12" />,
		category: "Electronics",
	},
	{
		image: <img alt="" src={pro25} style={{ width: 50, height: 50 }} />,
		"Tipo de Producto": "Ropa",
		"Descripción": "Es el equipamento basico y necesario para la practica del deporte del ciclismo, tales como el casco, gafas, camisetas, patalonetas entre otras.",
		status: <i className="fa fa-circle font-success f-12" />,
		category: "Electronics",
	},
	{
		image: <img alt="" src={pro21} style={{ width: 50, height: 50 }} />,
		"Tipo de Producto": "Zapatillas & Calas",
		"Descripción": "Las calas son una especie de chapas que se instalan en las suelas de las zapatillas de ciclismo a la altura de los metatarsos. Éstas sirven para acoplarse a los pedales, para que queden perfectamente enganchados a la suela de las zapatilla.",
		status: <i className="fa fa-circle font-success f-12" />,
		category: "Electronics",
	},
	{
		image: <img alt="" src={pro3} style={{ width: 50, height: 50 }} />,
		"Tipo de Producto": "Llantas & Neumáticos",
		"Descripción": "Las llantas de bicicleta son una de las piezas que componen la rueda de la bicicleta, normalmente metálica, sobre la que se apoya el neumático.",
		status: <i className="fa fa-circle font-success f-12" />,
		category: "Electronics",
	},
	{
		image: <img alt="" src={pro14} style={{ width: 50, height: 50 }} />,
		"Tipo de Producto": "Ruedas & Partes",
		"Descripción": "La rueda de bicicleta es una rueda diseñada para bicicletas. Está compuesta de un neumático de caucho, en cuyo interior va una cámara de aire (también de caucho) montado sobre una llanta, un buje central y los radios que conectan ambo",
		status: <i className="fa fa-circle font-success f-12" />,
		category: "Electronics",
	},
	{
		image: <img alt="" src={pro20} style={{ width: 50, height: 50 }} />,
		"Tipo de Producto": "Cascos",
		"Descripción": "Los cascos de ciclismo o casco ciclista, se diseña específicamente para proporcionar la protección principal a los ciclistas. Este tipo de casco también se utiliza en otros deportes, es decir no son exclusivos de este deporte.",
		status: <i className="fa fa-circle font-success f-12" />,
		category: "Electronics",
	},
	{
		image: <img alt="" src={pro19} style={{ width: 50, height: 50 }} />,
		"Tipo de Producto": "Marcos & Tenedores",
		"Descripción": "Los tenedores también se conocen como horquillas y son mucho más que una extensión del marco, son el timón de tu bicicleta. Su labor es dirigir la fuerza y trazar el camimo del ciclista.",
		status: <i className="fa fa-circle font-success f-12" />,
		category: "Electronics",
	},
	{
		image: <img alt="" src={pro18} style={{ width: 50, height: 50 }} />,
		"Tipo de Producto": "Bicicletas para Spinning",
		"Descripción": "Una bicicleta spinning es un tipo de bicicleta estática que permite entrenar tanto la resistencia cardiovascular como la fuerza. Generalmente permite al usuario pedalear de pie y realizar fuertes cambios de ritmo e intensidad.",
		status: <i className="fa fa-circle font-success f-12" />,
		category: "Jewellery",
	},
	{
		image: <img alt="" src={jwel12} style={{ width: 50, height: 50 }} />,
		"Tipo de Producto": "Ropa Indoor",
		"Descripción": "Son las prendas elásticas que se adapta a nuestras piernas, y que nos proporciona la libertad de movimientos necesaria para poder pedalear y movernos sobre la bicicleta con comodidad.",
		status: <i className="fa fa-circle font-success f-12" />,
		category: "Jewellery",
	},
	{
		image: <img alt="" src={jwel26} style={{ width: 50, height: 50 }} />,
		"Tipo de Producto": "Elementos Médicos, Salud en Casa y Prevención",
		"Descripción": "$3145.00",
		status: <i className="fa fa-circle font-success f-12" />,
		category: "Jewellery",
	},
	{
		image: <img alt="" src={furniture8} style={{ width: 50, height: 50 }} />,
		"Tipo de Producto": "Nutrición",
		"Descripción": "$84.00",
		status: <i className="fa fa-circle font-success f-12" />,
		category: "furniture",
	},
	{
		image: <img alt="" src={cat3} style={{ width: 50, height: 50 }} />,
		"Tipo de Producto": "Combos",
		"Descripción": "$67.00",
		status: <i className="fa fa-circle font-success f-12" />,
		category: "shoes",
	},
	{
		image: <img alt="" src={fashion12} style={{ width: 50, height: 50 }} />,
		"Tipo de Producto": "Herramientas",
		"Descripción": "$234.00",
		status: <i className="fa fa-circle font-success f-12" />,
		category: "clothes",
	}
];

export { data };
