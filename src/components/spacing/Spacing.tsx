import styled, {css} from "styled-components";

export type Size = "xs" | "s" | "m" | "l" | "xl" | "xxl";
export interface SpacingProps {
	size?: Size;
}

export type DebuggingColors = {
	[key in Size]: string;
};

const DEBUGGING_COLORS: DebuggingColors = {
	xs: "hsla(30, 100%, 50%, 0.2)",
	s: "hsla(185, 100%, 50%, 0.2)",
	m: "hsla(109, 100%, 50%, 0.2)",
	l: "hsla(199, 100%, 50%, 0.2)",
	xl: "hsla(4, 100%, 50%, 0.2)",
	xxl: "hsla(144, 100%, 50%, 0.2)"
};

export const DEBUGGING_COLOR = `--debugging-color`;

export const Spacing = styled.span.attrs(({size}: SpacingProps) => ({
	"data-size": size
}))<SpacingProps>`
	display: block;
	width: 100%;
	visibility: hidden;
	pointer-events: none;
	${({
		size,
		theme: {
			spacing: {[size]: height}
		}
	}) => css`
		${DEBUGGING_COLOR}: ${DEBUGGING_COLORS[size]};
		height: ${height}px;
	`};
`;
