import React, { Fragment } from "react";
import TabsetUser from "../users/tabset-user";
import Breadcrumb from "../common/breadcrumb";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";

const Create_customers = () => {
	return (
		<Fragment>
			<Breadcrumb title="Crear Cliente" parent="Customer" />
			<Container fluid={true}>
				<Row>
					<Col sm="12">
						<Card>
							<CardHeader>
								<h5> Agregar Clientes </h5>
							</CardHeader>
							<CardBody>
								<TabsetUser />
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</Fragment>
	);
};

export default Create_customers;
