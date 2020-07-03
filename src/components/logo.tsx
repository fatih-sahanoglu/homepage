import React from "react";
import styled from "styled-components";
import tree from "./tree";

const Svg = styled.svg`
	height: 1em;
	width: 1em;
`;

export const Logo = props => (
	<Svg {...props} viewBox="0 0 320 427">
		<path fill="currentColor" d={tree} />
	</Svg>
);
