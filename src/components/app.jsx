import React, { useState, useEffect } from "react";
import Sidebar from "./common/sidebar_components/sidebar";
import RightSidebar from "./common/right-sidebar";
import Footer from "./common/footer";
import Header from "./common/header_components/header";
import { useSelector, useDispatch } from "react-redux";

const App = (props) => {
	const dispatch = useDispatch();
	const [pokemons, setPokemons] = useState([]);

	const initialState = {
		ltr: true,
		divName: "CER",
	};

	const [side, setSide] = useState(initialState);

	const ChangeRtl = (divName) => {
		if (divName === "CER") {
			document.body.classList.add("rtl");
			setSide({ divName: "ABR" });
		} else {
			document.body.classList.remove("rtl");
			setSide({ divName: "CER" });
		}
	};
	return (
		<div>
			<div className="page-wrapper">
				<Header />
				<div className="page-body-wrapper">
					<Sidebar />
					<RightSidebar />
					<div className="page-body">{props.children}</div>
					<Footer />
				</div>
			</div>
			<div
				className="btn-light custom-theme"
				onClick={() => ChangeRtl(side.divName)}
			>
				{side.divName}
			</div>
		</div>
	);
};
export default App;
