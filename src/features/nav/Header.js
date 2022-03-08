import React from "react";
import styled from "styled-components";

const Header = (props) => {
	return (
		<>
			<Nav>
				{props.children.map((child, i) => {
					return <LinkWrap key={`headerItem-${i}`}>{child}</LinkWrap>;
				})}
			</Nav>
			<Placeholder className="placeholder"></Placeholder>
		</>
	);
};

const Nav = styled.nav`
	position: fixed;
	top: 0;
	left: 0;
	height: 60px;
	background-color: #233423;
	width: 100%;
	z-index: 100;
	display: flex;
	align-items: center;
	padding: 0 46px;
	gap: 20px;
`;

const LinkWrap = styled.div`
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;

	a {
		display: inline;
		vertical-align: middle;
		color: #fff;
		line-height: 0;
		margin-bottom: 3px;
		text-decoration: none;
	}
`;

const Placeholder = styled.div`
	position: relative;
	height: 60px;
	z-index: 0;
`;

export default Header;
