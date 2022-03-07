import { useState, useEffect } from "react";
import styled from "styled-components";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// useEffect(() => {
	// 	const auth = getAuth();
	// 	signInWithEmailAndPassword(auth, email, password)
	// 		.then((userCredential) => {
	// 			// Signed in
	// 			const user = userCredential.user;
	// 			// ...
	// 		})
	// 		.catch((error) => {
	// 			const errorCode = error.code;
	// 			const errorMessage = error.message;
	// 		});
	// }, []);

	return (
		<Container>
			<Wrap>
				<form>
					<input placeholder="Email" />
					<input placeholder="Password" />
					<button type="submit">Submit</button>
				</form>
				<LinkWrap>
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
`;

const Wrap = styled.div`
	margin-top: 40px;
	width: 100%;
	max-width: 420px;
	min-height: 500px;
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

export default Login;
