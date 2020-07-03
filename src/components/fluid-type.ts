import styled from "styled-components";

const FluidType = styled.div<{
	minFontSize: number;
	maxFontSize: number;
}>`
	--min-font-size: ${props => props.minFontSize};
	--max-font-size: ${props => props.maxFontSize};
	--min-width: 320;
	--max-width: 1280;
	margin: 0;
	line-height: 1;
	font-family: magneta, serif;
	font-size: calc(
		var(--min-font-size) * 1px + (var(--max-font-size) - var(--min-font-size)) *
			((100vw - var(--min-width) * 1px) / (var(--max-width) - var(--min-width)))
	);
`;

export default FluidType;
