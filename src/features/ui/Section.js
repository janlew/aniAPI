import styled from "styled-components";

import * as style from "../../app/styled-variables";

const Section = styled.div`
	padding: ${(props) =>
		props.noPadding
			? "0"
			: props.noPaddingX
			? "40px 0"
			: props.noPaddingY
			? "0 60px"
			: props.noPaddingTop
			? "0 60px 40px 60px"
			: props.noPaddingBottom
			? "40px 60px 0px 60px"
			: props.noPaddingLeft
			? "40px 60px 40px 0"
			: props.noPaddingRight
			? "40px 0 40px 60px"
			: "40px 60px"};
	width: 100%;

	@media only screen and (max-width: 639px) {
		padding: ${(props) =>
			props.noPadding
				? "0"
				: props.noPaddingX
				? "15px 0"
				: props.noPaddingY
				? "0 20px"
				: props.noPaddingTop
				? "0 20px 15px 20px"
				: props.noPaddingBottom
				? "15px 20px 0px 20px"
				: props.noPaddingLeft
				? "15px 20px 15px 0"
				: props.noPaddingRight
				? "15px 0 15px 20px"
				: "15px 20px"};
	}
`;

export default Section;
