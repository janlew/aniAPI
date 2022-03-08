import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import aniAPI from "../app/aniAPI";

import ImageBanner from "../features/ui/ImageBanner";

const Home = () => {
	const [homeBannerImage, setHomeBannerImage] = useState("");

	useEffect(() => {
		aniAPI.get("v1/anime/11").then((response) => {
			console.log(response.data.data);
			if (response.data.data.banner_image) {
				setHomeBannerImage(response.data.data.banner_image);
			}
		});
	}, []);

	return (
		<Container>
			<ImageBanner src={homeBannerImage} />
		</Container>
	);
};

const Container = styled.div`
	img {
		width: 100%;
	}
`;

export default Home;
