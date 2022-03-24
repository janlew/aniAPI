import styled from "styled-components";

import * as style from "../../app/styled-variables";

import Spinner from "../ui/Spinner";

const Loader = () => {
	return (
		<SpinnerWrap>
			<Spinner />
		</SpinnerWrap>
	);
};

const SpinnerWrap = styled.div`
	height: calc(100vh - 60px);
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${style.BG_COLOR};
`;

export default Loader;
