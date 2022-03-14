import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

import aniAPI from "../app/aniAPI";

import Container from "../features/ui/Container";
import ImageBanner from "../features/ui/ImageBanner";

const Home = () => {
	const [homeBannerImage, setHomeBannerImage] = useState("");

	const { isLoading, error, data } = useQuery("repoData", async () => {
		aniAPI.get("v1/anime/11").then(({ data }) => {
			if (data.data.banner_image) {
				setHomeBannerImage(data.data.banner_image);
			}
		});
		// const { data } = await aniAPI.get("v1/anime/11");
		// setHomeBannerImage(data.data.banner_image);
	});

	if (isLoading) return "Loading...";

	return (
		<Container>
			<ImageBanner src={homeBannerImage} />
		</Container>
	);
};

export default Home;
