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
	width: calc(100% / 5 - 20px * 4 / 5);
	position: relative;

	> div {
		min-width: calc(100% / 5 - 20px * 4 / 5);
		padding-top: 151.2%;
	}
`;

export default AnimeListSkeleton;
