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
	transition: all 0.3s ease-in-out, box-shadow 0.5s;

	img {
		height: 100%;
		width: 100%;
		object-fit: cover;
	}
	span {
		position: absolute;
		left: 0;
		bottom: 0;
		color: #fff;
	}

	&:hover {
		transform: scale(1.05);
		box-shadow: -5px 0px 10px 7px #33333399, 5px 0px 10px 7px #33333399;
	}

	@media screen and (max-width: 1349px) {
		min-width: calc(100% / 4 - 20px * 3 / 4);
	}

	@media screen and (max-width: 1099px) {
		min-width: calc(100% / 3 - 20px * 2 / 3);
	}

	@media screen and (max-width: 849px) {
		min-width: calc(100% / 2 - 20px * 1 / 2);
	}

	@media screen and (max-width: 519px) {
		min-width: 100%;
	}
`;

export default AnimeCard;
