import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import useImageLoaded from "../../hooks/useImageLoaded";

import ShinePlaceholder from "../ui/ShinePlaceholder";

const FavBanner = ({ src, alt, animeId }) => {
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
			<Link to={`/anime/${animeId}`}>
				<img
					className={loaded ? "" : "hidden"}
					ref={ref}
					onLoad={onLoad}
					src={`${src}`}
					alt={`${alt}`}
				/>
			</Link>

			<ShinePlaceholder
				duration="5s"
				animationWidth="100vw"
				className={loaded ? "hidden" : ""}
			/>
		</Container>
	);
};

const Container = styled.div`
	min-height: 160px;
	height: 0;
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
		border: 3px solid transparent;
		object-fit: cover;
		transition: all 0.3s ease-in-out;

		&.hidden {
			display: none;
		}

		&:hover {
			cursor: pointer;
			border-color: rgba(255, 255, 255, 0.5);
		}
	}
`;

export default FavBanner;
