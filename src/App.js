import React, { useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { auth } from "./app/firebase";
import {
	setUserLoginDetails,
	setSignOutState,
	selectIsAuth,
} from "./features/auth/userSlice";

import { Counter } from "./features/counter/Counter";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import Home from "./pages/Home";
import Register from "./features/auth/register/Register";
import Login from "./features/auth/login/Login";
import Header from "./features/nav/Header";
import NoMatch from "./pages/NoMatch";
import AnimeList from "./features/anime-list/AnimeList";

//process.env.REACT_APP_NOT_SECRET_CODE
const queryClient = new QueryClient();

function App() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isAuth = useSelector(selectIsAuth);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/firebase.User
				dispatch(
					setUserLoginDetails({
						email: user.email,
						isAuth: true,
					})
				);

				navigate("/");
				//const uid = user.uid;
			} else {
				// User is signed out
				dispatch(setSignOutState());
			}
		});
	}, [isAuth]);

	return (
		<QueryClientProvider client={queryClient}>
			<Header isAuth={isAuth}>
				<Link to="/">Home</Link>
				<Link to="/anime-list">Anime List</Link>
				<Link to="/counter">Counter</Link>
			</Header>
			<Routes>
				<Route
					path=""
					element={
						<ProtectedRoute isAuth={isAuth}>
							<Home />
						</ProtectedRoute>
					}
				/>
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
				<Route path="anime-list" element={<AnimeList />} />
				<Route path="counter" element={<Counter />} />
				<Route path="*" element={<NoMatch />} />
			</Routes>
			<ReactQueryDevtools initialIsOpen={true} />
		</QueryClientProvider>
	);
}

export default App;
