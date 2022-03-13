import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import * as style from "../../app/styled-variables";

const Form = ({ defaultValues, resolver, children, onSubmit }) => {
	const methods = useForm({
		defaultValues,
		resolver,
		shouldFocusError: false,
	});

	const {
		handleSubmit,
		formState: { errors },
		clearErrors,
	} = methods;

	return (
		<Body onSubmit={handleSubmit(onSubmit)}>
			{React.Children.map(children, (child) => {
				return child.props.name
					? React.createElement(child.type, {
							...{
								...child.props,
								register: methods.register,
								errors: errors[child.props.name],
								key: child.props.name,
								onFocus: () => clearErrors(child.props.name),
							},
					  })
					: child;
			})}
		</Body>
	);
};

const Body = styled.form`
	background-color: ${style.BOX_BG_COLOR};
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
`;

export default Form;
