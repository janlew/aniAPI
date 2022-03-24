import React from "react";
import styled from "styled-components";

import * as style from "../../../app/styled-variables";

const SearchBar = ({ onChange }) => {
	return (
		<Bar>
			<input
				type="text"
				placeholder="Search..."
				onChange={(e) => onChange(e)}
			/>
		</Bar>
	);
};

const Bar = styled.div`
	position: relative;
	height: 60px;
	width: 100%;
	background-color: ${style.BOX_BG_COLOR};
	border-radius: 12px;
	display: flex;
	align-items: center;

	&:before {
		content: "";
		position: absolute;
		height: 100%;
		width: calc(100vw + 80px);
		top: 0;
		left: -80px;
		background-color: ${style.BOX_BG_COLOR};
	}

	input {
		position: relative;
		padding: 6px 8px;
		font-size: 14px;
		width: auto;
		border: none;
		border-radius: 8px;
	}
`;

export default SearchBar;
