import styled from "styled-components";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import * as style from "../../../app/styled-variables";
import { auth } from "../../../app/firebase";
import { setUserLoginDetails } from "../userSlice";

import Container from "../../ui/Container";
import Section from "../../ui/Section";
import Button from "../../ui/components/Button";
import Form from "../../ui/form/Form";
import Input from "../../ui/form/components/Input";

const Register = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const from = location.state?.from?.pathname || "/";

	const formSchema = Yup.object().shape({
		email: Yup.string().required("Email is required"),
		password: Yup.string()
			.required("Password is required")
			.min(6, "Password must be at least 6 characters long"),
		password_confirm: Yup.string()
			.required("Confirm password")
			.oneOf([Yup.ref("password")], "Passwords does not match"),
	});

	const submitHandler = (data) => {
		createUserWithEmailAndPassword(auth, data.email, data.password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;

				dispatch(
					setUserLoginDetails({
						email: user.email,
					})
				);

				navigate(from, { replace: true });
				// ...
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				// ..
			});
	};

	return (
		<Container>
			<Section>
				<Wrap>
					<Form
						defaultValues={{
							email: "",
							password: "",
							password_confirm: "",
						}}
						resolver={yupResolver(formSchema)}
						onSubmit={submitHandler}
					>
						<Input name="email" placeholder="Email" type="email" />
						<Input name="password" placeholder="Password" type="password" />
						<Input
							name="password_confirm"
							placeholder="Confirm password"
							type="password"
						/>
						<Button type="submit">Submit</Button>
					</Form>

					<LinkWrap>
						<Link to="/login">Back to Login</Link>
					</LinkWrap>
				</Wrap>
			</Section>
		</Container>
	);
};

// value === getValues("password") || "The passwords do not match"

const Wrap = styled.div`
	margin-top: 60px;
	padding: 40px;
	width: 100%;
	max-width: 420px;
	min-height: 500px;
	height: 500px;
	background-color: ${style.WRAP_BG_COLOR};
	border-radius: 14px;

	@media only screen and (max-width: 639px) {
		margin-top: 20px;
		padding: 20px;
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
