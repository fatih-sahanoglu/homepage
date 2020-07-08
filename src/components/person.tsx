import styled, {css} from "styled-components";

export const Person = styled.div`
	position: sticky;
	top: calc(1em + 65px);
	${({theme}) => css`
		@media ${theme.grid.mq.m} {
			top: calc(1em + ${theme.components.header.minHeight}px);
		}
	`};
`;
