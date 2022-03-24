import React, { useState, useEffect } from "react";
import styled from "styled-components";

import ShinePlaceholder from "../../ui/ShinePlaceholder";

const AnimeListSkeleton = () => {
	const [animesPlaceholders, setAnimesPlaceholders] = useState([]);

	const renderSkeleton = () => {
		const skeletonArr = [];
		for (let i = 0; i < 100; i++) {
			skeletonArr.push(
				<AnimeCard key={i + "-skeleton-anime"}>
					<div>
						<ShinePlaceholder
							duration="1.6s"
							animationWidth="calc(100vw / 6 )"
						></ShinePlaceholder>
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

const AnimeCard = styled.div`
	min-width: 230px;
	width: calc(100% / 5 - 20px * 4 / 5);
	position: relative;

	> div {
		width: 100%;
		padding-top: 151.2%;
	}

	@media screen and (max-width: 1349px) {
		min-width: calc(100% / 4 - 20px * 3 / 4);
	}

	@media screen and (max-width: 1099px) {
		min-width: calc(100% / 3 - 20px * 2 / 3);
	}

	@media screen and (max-width: 849px) {
		min-width: calc(100% / 2 - 20px * 1 / 2);
	}

	@media screen and (max-width: 519px) {
		min-width: 100%;
	}
`;

export default AnimeListSkeleton;
