import React from "react";
import styled, {css} from "styled-components";
import {removeInternals} from "../../utils/styled-components";
import {COLCOUNT, COLSPAN, COLUMN, GUTTER, PADDING} from "./constants";
import {ColumnProps} from "./types";

export const Column = styled("div").withConfig({
	shouldForwardProp: removeInternals
})<ColumnProps>`
	margin-left: calc(var(${GUTTER}) * 1px);
	margin-right: calc(var(${GUTTER}) * 1px);
	width: calc(100% / var(${COLCOUNT}) * var(${COLSPAN}) - var(${GUTTER}) * 2px);
	max-width: calc(100% - var(${GUTTER}) * 2px);
	flex-shrink: 0;
	${({
		xs,
		s = xs,
		m = s,
		l = m,
		flex,
		raw,
		order,
		theme: {
			grid: {mq}
		}
	}) => css`
		display: ${xs === 0 ? "none" : flex ? "flex" : "block"};
		${!raw &&
		css`
			padding-left: calc(var(${PADDING}) * 1px);
			padding-right: calc(var(${PADDING}) * 1px);
		`};
		${order !== undefined &&
		css`
			order: ${order};
		`};
		${COLSPAN}: ${xs};
		@media ${mq.s} {
			${COLSPAN} ${s};
			display: ${s === 0 ? "none" : flex ? "flex" : "block"};
		}

		@media ${mq.m} {
			${COLSPAN}: ${m};
			display: ${m === 0 ? "none" : flex ? "flex" : "block"};
		}

		@media ${mq.l} {
			${COLSPAN}: ${l};
			display: ${l === 0 ? "none" : flex ? "flex" : "block"};
		}
	`};
`;

Column.displayName = "Column";
Column.defaultProps = {
	xs: COLUMN.ONE,
	suppressHydrationWarning: true
};
