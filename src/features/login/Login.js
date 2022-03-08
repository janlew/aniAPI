import { useState, useEffect } from "react";
import styled from "styled-components";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { auth } from "../../app/firebase";
import { setUserLoginDetails } from "../user/userSlice";

const Login = () => {
	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
		clearErrors,
	} = useForm({
		defaultValues: { email: "", password: "" },
	});

	const submitHandler = (data) => {
		if (false) {
		} else {
			signInWithEmailAndPassword(auth, data.email, data.password)
				.then((userCredential) => {
					// Signed in
					const user = userCredential.user;
					setUser(user);
					// ...
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
				});
		}
	};

	const setUser = (user) => {
		dispatch(
			setUserLoginDetails({
				email: user.email,
			})
		);
	};

	return (
		<Container>
			<Wrap>
				<form
					onSubmit={handleSubmit((data) => {
						submitHandler(data);
					})}
				>
					<input
						{...register("email", {
							required: "Email is required",
						})}
						placeholder="Email"
						name="email"
						type="email"
					/>
					<input
						{...register("password", {
							required: "Password is required",
						})}
						placeholder="Password"
						name="password"
						type="password"
					/>
					<button type="submit">Submit</button>
				</form>
				<LinkWrap>
					<span>Don't have account?</span>
					<Link to="/register">Register</Link>
				</LinkWrap>
			</Wrap>
		</Container>
	);
};

const Container = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	background: #234522;
`;

const Wrap = styled.div`
	margin-top: 60px;
	padding: 40px;
	width: 100%;
	max-width: 420px;
	min-height: 500px;
	height: 500px;
	background-color: #212125;
	border-radius: 14px;

	form {
		background-color: #455442;
		padding: 20px;
		border-radius: 14px;
		display: flex;
		flex-direction: column;
		gap: 20px;

		input {
			padding: 4px;
			font-size: 14px;
			width: 100%;
		}

		button {
			cursor: pointer;
			border-radius: 8px;
			border: none;
			padding: 12px 14px;
			background-color: #466422;
			color: #fff;
			font-size: 14px;
			letter-spacing: 1.5px;
		}
	}
`;

const LinkWrap = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 10px;

	span {
		margin-right: 8px;
		color: rgba(255, 255, 255, 0.7);
	}

	a {
		text-decoration: none;
		color: #fff;
	}
`;

export default Login;
