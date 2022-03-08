import React from "react";
import styled from "styled-components";

import Login from "../features/auth/login/Login";

const Welcome = () => {
	return (
		<Container>
			<Login />
		</Container>
	);
};

const Container = styled.div`
	position: relative;
	min-height: calc(100% - 60px);
	background: #234522;
`;

export default Welcome;
