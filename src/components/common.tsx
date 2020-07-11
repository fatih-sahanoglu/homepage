import styled from "styled-components";
import {Box} from "./grid";
import {Stretch} from "./spacing/stretch";

export const CenterBox = styled(Box)`
	align-items: center;
	align-content: center;
	justify-content: center;
	text-align: center;
`;
export const FlexStretch = styled(Stretch)`
	flex: 1;
	display: flex;
`;
