import { useEffect } from "react";
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
	} = useForm({
		defaultValues: { email: "", password: "", password_confirm: "" },
	});

	// useEffect(() => {
	// 	createUserWithEmailAndPassword(auth, email, password)
	// 		.then((userCredential) => {
	// 			// Signed in
	// 			const user = userCredential.user;
	// 			// ...
	// 		})
	// 		.catch((error) => {
	// 			const errorCode = error.code;
	// 			const errorMessage = error.message;
	// 			// ..
	// 		});
	// }, []);

	useEffect(() => {
		console.log(errors);
	}, [errors]);

	const test = (data) => {
		console.log(data);
	};

	return (
		<Container>
			<Wrap>
				<form
					onSubmit={handleSubmit((data) => {
						test(data);
					})}
				>
					<div>
						<input
							{...register("email", { required: "This is required" })}
							placeholder="Email"
							name="email"
							type="email"
						/>
					</div>
					<div>
						<input
							{...register("password", {
								required: "This is required",
							})}
							placeholder="Password"
							name="password"
							type="password"
						/>
					</div>

					<input
						{...register("password_confirm", {
							required: "This is required",
						})}
						placeholder="Confirm password"
						name="password_confirm"
						type="password"
					/>
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

		input {
			padding: 4px;
			font-size: 14px;
			width: 100%;
		}

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
