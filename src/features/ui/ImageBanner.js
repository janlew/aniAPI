import styled, { keyframes } from "styled-components";

const ImageBanner = ({ src }) => {
	return (
		<Wrap>
			<Banner>{src ? <img src={`${src}`} alt="" /> : <Placeholder />}</Banner>
		</Wrap>
	);
};

const breatheAnimation = keyframes`
 0% { height: 100px;}
 30% { height: 400px;}
 40% { height: 405px;}
 100% { height: 100px;}
`;

const Wrap = styled.div`
	width: 100%;
`;

const Banner = styled.div`
	//height: 100%;
	//max-height: 405px;
	//animation-name: ${breatheAnimation};
	//animation-duration: 2s;
	//animation-iteration-count: infinite;
	width: 100%;

	img {
		height: 100%;
		width: 100%;
		border: 3px solid transparent;
		transition: all 0.3s ease-in-out;

		&:hover {
			cursor: pointer;
			border-color: rgba(255, 255, 255, 0.5);
		}
	}
`;

const Placeholder = styled.div`
	height: 100%;
	width: 100%;
	//animation-name: ${breatheAnimation};
`;

export default ImageBanner;
