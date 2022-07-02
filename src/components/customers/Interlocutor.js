import React, { Fragment } from "react";
import CreateInterlocutor from "./CreateInterlocutor";
import Breadcrumb from "../common/breadcrumb";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";

const Interlocutor = () => {
	return (
		<Fragment>
			<Breadcrumb title="Crear Interlocutor" parent="Customer" />
			<Container fluid={true}>
				<Row>
					<Col sm="12">
						<Card>
							<CardHeader>
								<h5> Agregar Interlocutor </h5>
							</CardHeader>
							<CardBody>
								<CreateInterlocutor />
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</Fragment>
	);
};

export default Interlocutor;
