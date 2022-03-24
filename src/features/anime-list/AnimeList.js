import React, { useState, useEffect, useRef, Fragment } from "react";
import styled from "styled-components";
import { useInfiniteQuery } from "react-query";
import { Link } from "react-router-dom";

import aniAPI from "../../app/aniAPI";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import useAnimeListDisplay from "./hooks/useAnimeListDisplay";

import Container from "../ui/Container";
import Button from "../ui/components/Button";
import AnimeListSkeleton from "./components/AnimeListSkeleton";
import AnimeCard from "./components/AnimeCard";
import SearchBar from "./components/SearchBar";

const useAnimeList = () => {
	return useInfiniteQuery(
		"animes",
		async ({ pageParam = 1 }) => {
			const { data } = await aniAPI.get(`/v1/anime?page=${pageParam}`);
			return data;
		},
		{
			getPreviousPageParam: (firstPage) => false,
			getNextPageParam: (lastPage) => {
				return lastPage.data.current_page + 1 < lastPage.data.last_page
					? lastPage.data.current_page + 1
					: false;
			},
		}
	);
};

// TODO poczekać na załadowanie img + lazyload, wyłączać load more na searchu

const AnimeList = () => {
	const [searchVal, setSearchVal] = useState("");
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

	useEffect(() => {
		if (data) {
			let newData = [];

			if (searchVal.length > 0) {
				data.pages.forEach((page) => {
					const temp = page.data.documents.filter((doc) => {
						const currentTitleArr = doc.titles.rj;
						return currentTitleArr
							.toLowerCase()
							.trim()
							.includes(searchVal.toLowerCase().trim());
					});
					newData = newData.concat(temp);
				});
				const toRender = newData.map((anime) => {
					return <AnimeCard key={anime.anilist_id} anime={anime} />;
				});

				setAnimes(toRender);
			} else {
				setAnimes(animeData);
			}
		}
	}, [searchVal]);

	const onSearch = (e) => {
		setSearchVal(e.target.value);
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
