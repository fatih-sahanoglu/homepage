import styled from "styled-components";

const Container = styled.div`
	width: 100%;
	width: calc(100% - 2 * ${({theme}) => theme.dimensions.margin});
	max-width: ${({theme}) => theme.dimensions.contentWidth};
	margin: 0 ${({theme}) => theme.dimensions.margin};
`;

export default Container;
