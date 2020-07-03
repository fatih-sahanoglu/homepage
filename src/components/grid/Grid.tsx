import React from "react";
import styled, {css} from "styled-components";
import {COLSPAN, GRID_PADDING, GUTTER, PADDING} from "./constants";
import {GridProps} from "./types";

export const GridWrapper = styled.div`
	overflow: hidden;
	width: 100%;
`;

export const StyledGrid = styled.div<GridProps>`
	display: flex;
	flex-direction: column;
	width: calc(100% - (var(${PADDING}) + var(${GRID_PADDING})) * 2px);
	margin-left: calc((var(${GRID_PADDING}) + var(${PADDING})) * 1px);
	margin-right: calc((var(${GRID_PADDING}) + var(${PADDING})) * 1px);

	${GridWrapper} {
		overflow: visible;
	}
	${({
		theme: {
			grid: {gutter, padding, maxWidth, mq, colSize, gridPadding}
		}
	}) => css`
		${GUTTER}: ${gutter.xs};
		${GRID_PADDING}: ${gridPadding.xs};
		${PADDING}: ${padding.xs};
		${COLSPAN}: ${colSize.xs};
		max-width: ${maxWidth}px;

		@media ${mq.s} {
			${GUTTER}: ${gutter.s};
			${GRID_PADDING}: ${gridPadding.s};
			${PADDING}: ${padding.s};
			${COLSPAN}: ${colSize.s};
		}

		@media ${mq.m} {
			${GUTTER}: ${gutter.m};
			${GRID_PADDING}: ${gridPadding.m};
			${PADDING}: ${padding.m};
			${COLSPAN}: ${colSize.m};
		}

		@media ${mq.l} {
			${GUTTER}: ${gutter.l};
			${GRID_PADDING}: ${gridPadding.l};
			${PADDING}: ${padding.l};
			${COLSPAN}: ${colSize.l};
		}
		@media ${mq.xl} {
			margin: auto;
			width: 100%;
		}
	`};
`;

export const Grid: React.FC<GridProps> = ({children, className, overflow}) => {
	return overflow ? (
		<StyledGrid className={className}>{children}</StyledGrid>
	) : (
		<GridWrapper className={className}>
			<StyledGrid>{children}</StyledGrid>
		</GridWrapper>
	);
};
