import styled, { keyframes } from "styled-components";

const shine = (animationWidth) => keyframes`
    0% { background-position: -20px;}
    100% { background-position: ${animationWidth};}
`;

const ShinePlaceholder = styled.div`
	animation-name: ${(props) =>
		props.animationWidth ? shine(props.animationWidth) : shine("100vw")};
	animation-duration: ${(props) => (props.duration ? props.duration : "2s")};
	animation-iteration-count: infinite;
	position: absolute;
	overflow: hidden;
	inset: 0;
	height: 100%;
	width: 100%;
	inset: 0;
	margin: 0;
	padding: 0;
	background-image: linear-gradient(90deg, #ddd 0px, #e8e8e8 40px, #ddd 80px);

	&.hidden {
		display: none;
	}
`;

export default ShinePlaceholder;
