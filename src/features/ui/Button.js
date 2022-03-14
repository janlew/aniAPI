import styled from "styled-components";

import * as style from "../../app/styled-variables";

const Button = (props) => {
	return (
		<Btn {...props} ref={props.innerRef}>
			{props.children}
		</Btn>
	);
};

const Btn = styled.button`
	cursor: pointer;
	border-radius: 8px;
	border: none;
	padding: 12px 14px;
	background-color: ${style.BTN_COLOR};
	color: #fff;
	font-size: 14px;
	letter-spacing: 1.5px;
`;

export default Button;
