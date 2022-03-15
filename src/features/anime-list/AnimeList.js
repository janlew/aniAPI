import React, { useState, useEffect, useRef, Fragment } from "react";
import styled from "styled-components";
import { useInfiniteQuery } from "react-query";

import aniAPI from "../../app/aniAPI";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";

import Container from "../ui/Container";
import Button from "../ui/Button";
import AnimeListSkeleton from "./components/AnimeListSkeleton";

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

const AnimeList = () => {
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

	useEffect(() => {
		if (data) {
			const toRender = data.pages.map((page) => {
				return (
					<Fragment key={`page-${page.data.current_page}-${Date.now()}`}>
						{page.data.documents.map((anime) => {
							return (
								<AnimeCard key={anime.anilist_id}>
									<img src={anime.cover_image} />
								</AnimeCard>
							);
						})}
					</Fragment>
				);
			});

			setAnimes(toRender);
		}
	}, [data]);

	useIntersectionObserver({
		target: loadMoreButtonRef,
		onIntersect: fetchNextPage,
		enabled: !!hasNextPage,
	});

	if (error) return "An error has occurred: " + error.message;

	return (
		<Container>
			<Wrap>
				<AnimesWrap>
					{(isLoading || isFetching) && !isFetchingNextPage ? (
						<AnimeListSkeleton />
					) : (
						animes
					)}
				</AnimesWrap>
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
