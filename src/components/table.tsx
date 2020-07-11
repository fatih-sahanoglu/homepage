import styled from "styled-components";
import {PADDING} from "./grid";

export const Table = styled.table`
	width: 100%;
`;
export const Tbody = styled.tbody``;
export const Tr = styled.tr`
	background-image: linear-gradient(
		to right,
		rgba(0, 0, 0, 0),
		rgba(0, 0, 0, 0.75),
		rgba(0, 0, 0, 0)
	);
	background-size: 100% 1px;
	background-repeat: no-repeat;
	background-position: center bottom;
`;
export const Td = styled.td<{textEnd?: boolean; textCenter?: boolean}>`
	padding: 1em calc(var(${PADDING}) * 1px);
	text-align: ${({textEnd, textCenter}) => (textEnd ? "right" : textCenter ? "center" : "left")};
`;
