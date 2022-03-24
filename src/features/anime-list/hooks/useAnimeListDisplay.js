import { useState, useEffect, Fragment } from "react";

import AnimeCard from "../components/AnimeCard";

export default function useAnimeListDisplay({ data, isLoading }) {
	const [animes, setAnimes] = useState([]);

	useEffect(() => {
		if (data) {
			const toRender = data.pages.map((page) => {
				return (
					<Fragment key={`page-${page.data.current_page}-${Date.now()}`}>
						{page.data.documents.map((anime) => {
							return <AnimeCard key={anime.anilist_id} anime={anime} />;
						})}
					</Fragment>
				);
			});

			setAnimes(toRender);
		}
	}, [isLoading]);

	return animes;
}
