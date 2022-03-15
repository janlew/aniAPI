import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

import * as style from "../../../app/styled-variables";

const AnimeListSkeleton = () => {
	const [animesPlaceholders, setAnimesPlaceholders] = useState([]);

	const renderSkeleton = () => {
		const skeletonArr = [];
		for (let i = 0; i < 100; i++) {
			skeletonArr.push(
				<AnimeCard>
					<div>
						<div></div>
					</div>
				</AnimeCard>
			);
		}

		return skeletonArr;
	};

	useEffect(() => {
		setAnimesPlaceholders(renderSkeleton());
	}, []);

	return <>{animesPlaceholders}</>;
};

const shine = keyframes`
    0% { background-position: -20px;}
    100% { background-position: calc(100vw / 6 );}
`;

const AnimeCard = styled.div`
	width: calc(100% / 5 - 20px * 4 / 5);
	position: relative;

	> div {
		min-width: calc(100% / 5 - 20px * 4 / 5);
		padding-top: 151.2%;

		> div {
			animation-name: ${shine};
			animation-duration: 2s;
			animation-iteration-count: infinite;
			position: absolute;
			overflow: hidden;
			inset: 0;
			height: 100%;
			width: 100%;
			//background-color: ${style.GRAY};
			background-image: linear-gradient(
				90deg,
				#ddd 0px,
				#e8e8e8 40px,
				#ddd 80px
			);
		}
	}
`;

export default AnimeListSkeleton;
