import styled from "styled-components";

export const Person = styled.div`
	position: sticky;
	top: ${({
		theme: {
			components: {
				header: {minHeight}
			}
		}
	}) => `${minHeight}px`};
`;
