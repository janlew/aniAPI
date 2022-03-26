import { useInfiniteQuery } from "react-query";

import aniAPI from "../../../app/aniAPI";

export default function useAnimeList() {
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
}
