import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

import aniAPI from "../app/aniAPI";

import Container from "../features/ui/Container";
import FavBanner from "../features/user-homepage/FavBanner";
import Loader from "../features/loader/Loader";

const useHomeBanner = () => {
	return useQuery("home_anime", async () => {
		const { data } = await aniAPI.get("/v1/anime/11");
		return data;
	});
};

const Home = () => {
	const [favBannerImages, setFavBannerImages] = useState("");
	const [favAnimeId, setFavAnimeId] = useState("");

	const { data, error, isFetching, isLoading } = useHomeBanner();

	useEffect(() => {
		if (data) {
			setFavAnimeId(data.data.id);
			setFavBannerImages(data.data.banner_image);
		}
	}, [data]);

	if (isLoading || isFetching) {
		return <Loader />;
	}

	return (
		<Container>
			<FavBanner src={favBannerImages} animeId={favAnimeId} />
		</Container>
	);
};

export default Home;
