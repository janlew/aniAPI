import styled from "styled-components";

import * as style from "../../app/styled-variables";

const Section = styled.div`
	padding: ${(props) =>
		props.noPadding
			? "0"
			: props.noPaddingX
			? "40px 0"
			: props.noPaddingY
			? "0 20px"
			: props.noPaddingTop
			? "0 20px 40px 20px"
			: props.noPaddingBottom
			? "40px 20px 0px 20px"
			: props.noPaddingLeft
			? "40px 20px 40px 0"
			: props.noPaddingRight
			? "40px 0 40px 20px"
			: "40px 20px"};
	width: 100%;
`;

export default Section;
