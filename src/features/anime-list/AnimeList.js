import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";

import aniAPI from "../../app/aniAPI";

import Container from "../ui/Container";
import Button from "../ui/Button";

const useAnimeList = (page) => {
	return useQuery("animes", async () => {
		const { data } = await aniAPI.get(`/v1/anime?page=${page}`);
		return data;
	});
};

const AnimeList = () => {
	const [animes, setAnimes] = useState([]);
	const [page, setPage] = useState("1");

	const { data, error, isFetching, isLoading } = useAnimeList(page);

	useEffect(() => {
		if (data) {
			const animeCards = data.data.documents.map(
				({ anilist_id, cover_image, titles }) => {
					return (
						<AnimeCard key={anilist_id}>
							<img src={cover_image} />
						</AnimeCard>
					);
				}
			);
			setAnimes(animeCards);
		}
	}, [data]);

	if (isLoading) return "Loading...";

	if (error) return "An error has occurred: " + error.message;

	const handleClickMore = () => {
		console.log("first");
	};

	return (
		<Container>
			<Wrap>
				<AnimesWrap>{animes}</AnimesWrap>
				<Button onClick={handleClickMore}>More</Button>
			</Wrap>
		</Container>
	);
};

const Wrap = styled.div`
	width: 100%;
	height: 100%;
	padding: 60px 80px;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 40px;
`;

const AnimesWrap = styled.div`
	width: 100%;
	min-height: 100%;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	gap: 20px;
`;

const AnimeCard = styled.div`
	min-width: calc(100% / 5 - 20px * 4 / 5);
	img {
		height: 100%;
		width: 100%;
	}
`;

export default AnimeList;
