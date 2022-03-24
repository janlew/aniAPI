import styled from "styled-components";
import { Link } from "react-router-dom";

const AnimeCard = ({ anime }) => {
	return (
		<Wrap>
			<Link to={`/anime/${anime.id}`}>
				<img src={anime.cover_image} />
			</Link>
			<span>{anime.titles.rj}</span>
		</Wrap>
	);
};

const Wrap = styled.div`
	min-width: calc(100% / 5 - 20px * 4 / 5);
	position: relative;
	img {
		height: 100%;
		width: 100%;
	}
	span {
		position: absolute;
		left: 0;
		bottom: 0;
		color: #fff;
	}
`;

export default AnimeCard;
