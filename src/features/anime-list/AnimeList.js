import React, { useState, useEffect, useRef, Fragment } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import useAnimeList from "./hooks/useAnimeList";
import useAnimeListDisplay from "./hooks/useAnimeListDisplay";

import Container from "../ui/Container";
import Button from "../ui/components/Button";
import AnimeListSkeleton from "./components/AnimeListSkeleton";
import AnimeCard from "./components/AnimeCard";
import SearchBar from "./components/SearchBar";

// TODO poczekać na załadowanie img + lazyload, wyłączać load more na searchu

const AnimeList = () => {
	const [moreButtonVisibility, setMoreButtonVisibility] = useState(false);
	const [animes, setAnimes] = useState([]);
	const loadMoreButtonRef = useRef();

	const {
		status,
		data,
		error,
		isLoading,
		isFetching,
		isFetchingNextPage,
		isFetchingPreviousPage,
		fetchNextPage,
		fetchPreviousPage,
		hasNextPage,
		hasPreviousPage,
	} = useAnimeList();

	let animeData = useAnimeListDisplay({ data, isLoading });

	useEffect(() => {
		setAnimes(animeData);
	}, [animeData]);

	const onSearch = (e) => {
		if (data) {
			let newData = [];

			if (e.target.value.length > 0) {
				setMoreButtonVisibility(true);
				data.pages.forEach((page) => {
					const temp = page.data.documents.filter((doc) => {
						const currentTitleArr = doc.titles.rj;
						return currentTitleArr
							.toLowerCase()
							.trim()
							.includes(e.target.value.toLowerCase().trim());
					});
					newData = newData.concat(temp);
					// unique data as API returns duplicates
					newData = [
						...new Map(
							newData.map((item) => [item["anilist_id"], item])
						).values(),
					];
				});
				const toRender = newData.map((anime) => {
					return <AnimeCard key={anime.anilist_id} anime={anime} />;
				});

				setAnimes(toRender);
			} else {
				setMoreButtonVisibility(false);
				setAnimes(animeData);
			}
		}
	};

	useIntersectionObserver({
		target: loadMoreButtonRef,
		onIntersect: fetchNextPage,
		enabled: !!hasNextPage,
	});

	if (error) return "An error has occurred: " + error.message;

	return (
		<Container>
			<Wrap>
				<SearchBar onChange={onSearch} />
				{(isLoading || isFetching) && !isFetchingNextPage ? (
					<AnimesWrap>
						<AnimeListSkeleton />
					</AnimesWrap>
				) : (
					<>
						<AnimesWrap>{animes}</AnimesWrap>
						<Button
							className={moreButtonVisibility === true ? "hidden" : ""}
							innerRef={loadMoreButtonRef}
							onClick={() => fetchNextPage()}
							disabled={!hasNextPage || isFetchingNextPage}
						>
							{isFetchingNextPage
								? "Loading more..."
								: hasNextPage
								? "Load more"
								: "Nothing more to load"}
						</Button>
					</>
				)}
			</Wrap>
		</Container>
	);
};

const Wrap = styled.div`
	width: 100%;
	height: 100%;
	padding: 0 60px 80px;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 40px;

	button.hidden {
		display: none;
	}

	@media only screen and (max-width: 639px) {
		padding: 0 20px 20px;
	}
`;

const AnimesWrap = styled.div`
	width: 100%;
	min-height: 100%;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	gap: 20px;
`;

export default AnimeList;
