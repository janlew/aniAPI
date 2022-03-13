import styled, { css } from "styled-components";

const Input = ({ register, name, rules, errors, ...rest }) => {
	return (
		<InputWrap errors={errors?.message}>
			<input {...register(name, rules)} {...rest} />
		</InputWrap>
	);
};

const InputWrap = styled.div`
	position: relative;
	border: 1px solid ${(props) => (props.errors ? "#ff4d6d" : "transparent")};
	border-radius: 8px;
	margin-bottom: 0px;
	transition: all 0.3s ease-in-out;

	${(props) =>
		props.errors &&
		css`
			margin-bottom: 4px;
		`};

	input {
		position: relative;
		padding: 6px 4px;
		font-size: 14px;
		width: 100%;
		border: none;
		border-radius: 8px;
	}

	&:after {
		content: "${(props) => (props.errors ? props.errors : "")}";
		font-size: 14px;
		position: absolute;
		width: 100%;
		bottom: -20px;
		left: 0;
		color: #ff4d6d;
		opacity: 0;
		transition: all 0.3s ease-in-out;

		${(props) =>
			props.errors &&
			css`
				opacity: 1;
			`};
	}
`;

export default Input;
