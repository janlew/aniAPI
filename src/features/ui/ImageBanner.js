import styled from "styled-components";

const ImageBanner = ({ src }) => {
	return (
		<Wrap>
			<Banner>
				<img src={`${src}`} alt="" />
			</Banner>
		</Wrap>
	);
};

const Wrap = styled.div``;

const Banner = styled.div``;

export default ImageBanner;
