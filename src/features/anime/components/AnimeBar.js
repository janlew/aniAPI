import React from "react";
import styled from "styled-components";

import * as style from "../../../app/styled-variables";

const AnimeBar = ({ title }) => {
	return (
		<Container>
			<h1>{title}</h1>
		</Container>
	);
};

const Container = styled.div`
	width: 100%;
	min-height: 80px;
	background-color: ${style.BOX_BG_COLOR};
	display: flex;
	align-items: center;
	padding: 0 60px;

	h1 {
		margin: 0;
	}

	@media only screen and (max-width: 639px) {
		padding: 0 20px;
	}
`;

export default AnimeBar;
