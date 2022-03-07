import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../app/firebase";

const Register = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
		clearErrors,
	} = useForm({
		defaultValues: { email: "", password: "", password_confirm: "" },
	});

	const submitHandler = (data) => {
		if (data.password !== data.password_confirm) {
			setError("password", {
				message: "Passwords must match!",
			});
		} else {
			createUserWithEmailAndPassword(auth, data.email, data.password)
				.then((userCredential) => {
					// Signed in
					const user = userCredential.user;
					// ...
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					// ..
				});
		}
	};

	console.log(errors);

	return (
		<Container>
			<Wrap>
				<form
					onSubmit={handleSubmit((data) => {
						submitHandler(data);
					})}
				>
					<InputWrap className={errors?.email?.message ? "error" : ""}>
						<input
							{...register("email", {
								required: "Email is required",
							})}
							placeholder="Email"
							name="email"
							type="email"
							onFocus={() => clearErrors("email")}
						/>
						<span className="err-mess">{errors?.email?.message}</span>
					</InputWrap>
					<InputWrap className={errors?.password?.message ? "error" : ""}>
						<input
							{...register("password", {
								required: "Password is required",
							})}
							placeholder="Password"
							name="password"
							type="password"
							onFocus={() => clearErrors("password")}
						/>
						<span className="err-mess">{errors?.password?.message}</span>
					</InputWrap>
					<InputWrap
						className={errors?.password_confirm?.message ? "error" : ""}
					>
						<input
							{...register("password_confirm", {
								required: "Confirm your password",
							})}
							placeholder="Confirm password"
							name="password_confirm"
							type="password"
							onFocus={() => clearErrors("password_confirm")}
						/>
						<span className="err-mess">
							{errors?.password_confirm?.message}
						</span>
					</InputWrap>
					<button type="submit">Submit</button>
				</form>

				<LinkWrap>
					<Link to="/">Back to Login</Link>
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
	margin-top: 40px;
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

		button {
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

const InputWrap = styled.div`
	position: relative;

	input {
		padding: 4px;
		font-size: 14px;
		width: 100%;
		border-radius: 8px;
	}

	span {
		position: absolute;
		font-size: 12px;
		bottom: 9px;
		right: 6px;
		opacity: 0;
		color: #fff;
		line-height: 1;
		transition: all 0.3s;
	}

	&.error {
		input {
			padding: 4px;
			font-size: 14px;
			width: 100%;
			position: relative;
			color: #fff;
			background-color: rgba(204, 0, 0, 0.4);
		}

		span {
			opacity: 1;
		}
	}
`;

const LinkWrap = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 10px;

	a {
		text-decoration: none;
		color: #fff;
	}
`;

export default Register;
