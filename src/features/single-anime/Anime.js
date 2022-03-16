import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import {
	useQuery,
	useMutation,
	useQueryClient,
	QueryClient,
	QueryClientProvider,
} from "react-query";

import aniAPI from "../../app/aniAPI";
import Container from "../ui/Container";

// const useAnime = () => {
// 	return useInfiniteQuery(
// 		"animes",
// 		async ({ pageParam = 1 }) => {
// 			const { data } = await aniAPI.get(`/v1/anime?page=${pageParam}`);
// 			return data;
// 		},
// 		{
// 			getPreviousPageParam: (firstPage) => false,
// 			getNextPageParam: (lastPage) => {
// 				return lastPage.data.current_page + 1 < lastPage.data.last_page
// 					? lastPage.data.current_page + 1
// 					: false;
// 			},
// 		}
// 	);
// };
// const useAnimes = (select) => useQuery(["animes"], getAnimes, { select });
// const useMovie = (id) =>
// 	useAnimes((animes) => animes.find((anime) => anime.id === id));

const useAnime = (id) => {
	return useQuery(`anime_${id}`, async () => {
		const { data } = await aniAPI.get(`/v1/anime/${id}`);
		return data;
	});
};

const Anime = () => {
	const params = useParams();
	const { data, error, isFetching, isLoading } = useAnime(params.id);
	console.log(data);

	return (
		<ContainerExtended>
			<h1>
				{!isFetching && !isLoading ? (
					Object.entries(data.data.titles).map(([key, value]) => (
						<div>{value}</div>
					))
				) : (
					<></>
				)}
			</h1>
			<div>
				{!isFetching && !isLoading ? (
					Object.entries(data.data.descriptions).map(([key, value]) => (
						<div>{value}</div>
					))
				) : (
					<></>
				)}
			</div>
		</ContainerExtended>
	);
};

const ContainerExtended = styled(Container)`
	align-items: center;
	flex-direction: column;
`;

export default Anime;
