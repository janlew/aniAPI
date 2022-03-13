import styled from "styled-components";

import * as style from "../../app/styled-variables";

const Container = (props) => {
	return <Body>{props.children}</Body>;
};

const Body = styled.div`
	min-height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	background: ${style.BG_COLOR};
`;

export default Container;
