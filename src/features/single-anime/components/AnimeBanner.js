import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import useImageLoaded from "../../../hooks/useImageLoaded";
import ShinePlaceholder from "../../ui/ShinePlaceholder";

const AnimeBanner = ({ src, alt }) => {
	const [ref, loaded, onLoad] = useImageLoaded();
	const [imgHeight, setImgHeight] = useState(0);
	const [imgWidth, setImgWidth] = useState(0);

	useEffect(() => {
		const img = ref.current;
		if (img && img.complete) {
			setImgWidth(img.naturalWidth);
			setImgHeight(img.naturalHeight);
		}
	}, [loaded]);

	if (!src) {
		return <></>;
	}

	return (
		<Container ratio={(imgHeight / imgWidth) * 100}>
			<img
				className={loaded ? "" : "hidden"}
				ref={ref}
				onLoad={onLoad}
				src={`${src}`}
				alt={`${alt}`}
			/>

			<ShinePlaceholder
				duration="5s"
				animationWidth="100vw"
				className={loaded ? "hidden" : ""}
			></ShinePlaceholder>
		</Container>
	);
};

const Container = styled.div`
	width: 100%;
	position: relative;
	margin: 0;
	padding: 0;
	padding-top: ${(props) => (props.ratio ? `${props.ratio}%` : "24.04%")};

	img {
		position: absolute;
		inset: 0;
		margin: 0;
		padding: 0;
		height: 100%;
		width: 100%;

		&.hidden {
			display: none;
		}
	}
`;

export default AnimeBanner;
