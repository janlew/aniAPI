import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

import aniAPI from "../app/aniAPI";

import Container from "../features/ui/Container";
import ImageBanner from "../features/ui/ImageBanner";

const useHomeBanner = () => {
	return useQuery("home_anime", async () => {
		const { data } = await aniAPI.get("v1/anime/11");
		return data;
	});
};

const Home = () => {
	const [homeBannerImage, setHomeBannerImage] = useState("");

	const { data, error, isFetching, isLoading } = useHomeBanner();

	useEffect(() => {
		if (data) {
			setHomeBannerImage(data.data.banner_image);
		}
	}, [data]);

	// const { data } = await aniAPI.get("v1/anime/11");
	// setHomeBannerImage(data.data.banner_image);

	if (isLoading) return "Loading...";

	return (
		<Container>
			<ImageBanner src={homeBannerImage} />
		</Container>
	);
};

export default Home;
