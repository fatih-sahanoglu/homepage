import styled, {css} from "styled-components";
import {removeInternals} from "../../utils/styled-components";
import {COLCOUNT, COLSPAN, GUTTER, PADDING} from "./constants";
import {RowProps} from "./types";

const ALIGNMENT = {
	start: "flex-start",
	end: "flex-end",
	center: "center"
};
export const Row = styled.div.withConfig({
	shouldForwardProp: removeInternals
})<RowProps>`
	${COLCOUNT}: var(${COLSPAN});
	display: flex;
	${({raw, noWrap, reverse, justify}) => {
		const diff = raw ? `var(${GUTTER})` : `(var(${PADDING}) + var(${GUTTER}))`;
		return css`
			flex-wrap: ${noWrap ? "nowrap" : "wrap"};
			flex-direction: ${reverse ? "row-reverse" : "row"};
			justify-content: ${ALIGNMENT[justify]};
			width: calc(100% + ${diff} * 2px);
			margin-left: calc(${diff} * -1px);
			margin-right: calc(${diff} * -1px);
		`;
	}};
`;

Row.defaultProps = {
	justify: "start",
	suppressHydrationWarning: true
};
