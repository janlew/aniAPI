import styled from "styled-components";

const Button = (props) => {
	return <Btn {...props}>{props.children}</Btn>;
};

const Btn = styled.button`
	cursor: pointer;
	border-radius: 8px;
	border: none;
	padding: 12px 14px;
	background-color: #466422;
	color: #fff;
	font-size: 14px;
	letter-spacing: 1.5px;
`;

export default Button;
