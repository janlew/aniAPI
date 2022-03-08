import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";

import { Counter } from "./features/counter/Counter";
import Home from "./pages/Home";
import Register from "./features/auth/register/Register";
import Login from "./features/auth/login/Login";
import Header from "./features/nav/Header";

//process.env.REACT_APP_NOT_SECRET_CODE

function App() {
	return (
		<>
			<Header>
				<Link to="/">Home</Link>
				<Link to="/counter">Counter</Link>
				<Link to="/login">Login</Link>
			</Header>
			<Routes>
				<Route index element={<Home />} />
				<Route path="" element={<Home />} />
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
				<Route path="counter" element={<Counter />} />
			</Routes>
		</>
	);
}

export default App;