import styled from "styled-components";
import {
	setPersistence,
	signInWithEmailAndPassword,
	browserSessionPersistence,
	browserLocalPersistence,
} from "firebase/auth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import * as style from "../../../app/styled-variables";
import { auth } from "../../../app/firebase";
import { setUserLoginDetails } from "../userSlice";

import Container from "../../ui/Container";
import Button from "../../ui/Button";
import Form from "../../form/Form";
import Input from "../../form/components/Input";

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const from = location.state?.from?.pathname || "/";

	const formSchema = Yup.object().shape({
		email: Yup.string().required("Email is required"),
		password: Yup.string().required("Password is required"),
	});

	const submitHandler = (data) => {
		setPersistence(auth, browserLocalPersistence).then(async () => {
			try {
				const userCredential = await signInWithEmailAndPassword(
					auth,
					data.email,
					data.password
				);
				// Signed in
				const user = userCredential.user;

				dispatch(
					setUserLoginDetails({
						email: user.email,
					})
				);

				navigate(from, { replace: true });
			} catch (error) {
				const errorCode = error.code;
				const errorMessage = error.message;
			}
		});
	};

	return (
		<Container>
			<Wrap>
				<Form
					defaultValues={{ email: "", password: "" }}
					resolver={yupResolver(formSchema)}
					onSubmit={submitHandler}
				>
					<Input name="email" placeholder="Email" type="email" />
					<Input name="password" placeholder="password" type="password" />
					<Button type="submit">Submit</Button>
				</Form>
				<LinkWrap>
					<span>Don't have account?</span>
					<Link to="/register">Register</Link>
				</LinkWrap>
			</Wrap>
		</Container>
	);
};

const Wrap = styled.div`
	margin-top: 60px;
	padding: 40px;
	width: 100%;
	max-width: 420px;
	min-height: 500px;
	height: 500px;
	background-color: ${style.WRAP_BG_COLOR};
	border-radius: 14px;
`;

const LinkWrap = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 10px;

	span {
		margin-right: 8px;
		color: #fff;
		opacity: 0.75;
	}

	a {
		text-decoration: none;
		color: #fff;
	}
`;

export default Login;
