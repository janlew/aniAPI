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
import Section from "../ui/Section";
import AnimeBanner from "./components/AnimeBanner";
import AnimeBar from "./components/AnimeBar";
import Loader from "../loader/Loader";

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

	if (isFetching || isLoading) {
		return <Loader />;
	}

	return (
		<ContainerExtended>
			<Section noPadding>
				<AnimeBanner src={data.data.banner_image} />
				<AnimeBar
					title={data.data.titles[Object.keys(data.data.titles)[0]]}
				></AnimeBar>
			</Section>
			{/* <Section>
				<h1>
					{Object.entries(data.data.titles).map(([key, value]) => (
						<div key={key}>{value}</div>
					))}
				</h1>
			</Section> */}
			<Section>
				{/* <div>
					{Object.entries(data.data.descriptions).map(([key, value]) => (
						<div key={key}>{value}</div>
					))}
				</div> */}
				<div>
					<p
						dangerouslySetInnerHTML={{
							__html:
								data.data.descriptions[Object.keys(data.data.descriptions)[0]],
						}}
					>
						{}
					</p>
				</div>
			</Section>
		</ContainerExtended>
	);
};

const ContainerExtended = styled(Container)`
	align-items: center;
	justify-content: flex-start;
	flex-direction: column;
	gap: 0;
`;

export default Anime;
