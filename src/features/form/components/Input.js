import styled from "styled-components";

const Input = ({ register, name, rules, errors, ...rest }) => {
	return (
		<InputWrap className={errors?.message ? "error" : ""}>
			<input {...register(name, rules)} {...rest} />
			<span>{errors?.message}</span>
		</InputWrap>
	);
};

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

export default Input;
