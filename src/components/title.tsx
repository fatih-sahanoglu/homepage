import styled from "styled-components";
import {GUTTER, PADDING} from "./grid";

export const Title = styled.h3`
	position: absolute;
	width: max-content;
	top: 0.5em;
	left: calc(var(${GUTTER}) * 1px);
	padding: 0.5em calc(var(${PADDING}) * 1px);
	margin: 0;
	line-height: 1;
	background: white;
	color: black;
`;
