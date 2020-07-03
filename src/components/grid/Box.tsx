import React from "react";
import styled, {css} from "styled-components";
import {removeInternals} from "../../utils/styled-components";
import {GUTTER, PADDING} from "./constants";

export interface BoxProps {
	removePadding?: boolean;
	addPadding?: boolean;
	removeGutter?: boolean;
	addGutter?: boolean;
	flex?: boolean;
	inline?: boolean;
	alignSelf?: "stretch" | "center" | "flex-end";
}

const StyledBox = styled.div.withConfig({
	shouldForwardProp: removeInternals
})<BoxProps>`
	${({flex, inline, alignSelf = "flex-start"}) => css`
		align-self: ${alignSelf};
		flex: ${inline ? "0 0 auto" : 1};
		display: ${inline ? "inline-" : ""} ${flex ? "flex" : "block"};
	`};
	${({removePadding, removeGutter, addGutter, addPadding}) => {
		if (removePadding) {
			if (removeGutter) {
				return css`
					margin-left: calc((var(${PADDING}) + var(${GUTTER})) * -1px);
					margin-right: calc((var(${PADDING}) + var(${GUTTER})) * -1px);
				`;
			}
			return css`
				margin-left: calc(var(${PADDING}) * -1px);
				margin-right: calc(var(${PADDING}) * -1px);
			`;
		}
		if (removeGutter) {
			return css`
				margin-left: calc(var(${GUTTER}) * -1px);
				margin-right: calc(var(${GUTTER}) * -1px);
			`;
		}
		if (addGutter) {
			if (addPadding) {
				return css`
					padding-left: calc(var(${PADDING}) * 1px);
					padding-right: calc(var(${PADDING}) * 1px);
					margin-left: calc(var(${GUTTER}) * 1px);
					margin-right: calc(var(${GUTTER}) * 1px);
				`;
			}
			return css`
				margin-left: calc(var(${GUTTER}) * 1px);
				margin-right: calc(var(${GUTTER}) * 1px);
			`;
		}
		return css`
			padding-left: calc(var(${PADDING}) * 1px);
			padding-right: calc(var(${PADDING}) * 1px);
		`;
	}};
`;

export const Box: React.FC<BoxProps> = ({children, ...props}) => {
	return <StyledBox {...props}>{children}</StyledBox>;
};
