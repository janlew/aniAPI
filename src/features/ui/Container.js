import styled from "styled-components";

import * as style from "../../app/styled-variables";

const Container = styled.div`
	min-height: calc(100% - 60px);
	width: 100%;
	display: flex;
	justify-content: center;
	background: ${style.BG_COLOR};
`;

export default Container;
