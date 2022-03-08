import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";

import { Counter } from "./features/counter/Counter";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import Register from "./features/register/Register";
import Login from "./features/login/Login";

//process.env.REACT_APP_NOT_SECRET_CODE

function App() {
	return (
		<>
			<Nav>
				<nav>
					<Link to="/">Home</Link>
					<Link to="/counter">Counter</Link>
				</nav>
				<div></div>
			</Nav>
			<Routes>
				<Route index element={<Home />} />
				<Route path="login" element={<Login />} />
				<Route path="" element={<Home />} />
				<Route path="register" element={<Register />} />
				<Route path="counter" element={<Counter />} />
			</Routes>
		</>
	);
}

const Nav = styled.div`
	nav {
		position: fixed;
		top: 0;
		left: 0;
		height: 60px;
		background-color: #233423;
		width: 100%;
	}

	// PLACEHOLDER
	div {
		position: relative;
		height: 60px;
	}
`;

export default App;
