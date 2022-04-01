import React, { Fragment } from "react";
import Breadcrumb from "../../common/breadcrumb";
import data from "../../../assets/data/pro_list";
import Datatable from "../../common/datatable";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";

const Digital_pro_list = () => {
	return (
		<Fragment>
			<Breadcrumb title="Lista de productos" parent="Digital" />
			{/* <!-- Container-fluid starts--> */}
			<Container fluid="true">
				<Row>
					<Col sm="12">
						<Card>
							<CardHeader>
								<h5>Lista de productos</h5>
							</CardHeader>
							<CardBody>
								<div className="clearfix"></div>
								<div id="basicScenario" className="product-physical">
									<Datatable
										multiSelectOption={false}
										myData={data}
										pageSize={9}
										pagination={false}
										class="-striped -highlight"
									/>
								</div>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
			{/* <!-- Container-fluid Ends--> */}
		</Fragment>
	);
};

export default Digital_pro_list;
