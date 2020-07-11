import styled from "styled-components";
import {PADDING} from "./grid";
import Img from "gatsby-image";
export const Hover = styled.div`
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	padding: 0 calc(var(${PADDING}) * 1px);
	display: flex;
	align-items: center;
	align-content: center;
	transform: translate3d(0, 100%, 0);
	transition: transform 0.25s ease-in-out;
	background: white;
	color: black;
`;

export const GalleryImage = styled(Img)`
	width: 100%;
	transform: scale3d(1.01, 1.01, 1);
	transition: transform 2s ease-in-out;
`;

export const Cover = styled.div`
	width: 100%;
	position: relative;
	display: flex;
	overflow: hidden;
	box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
	border-radius: 5px;
	transition: box-shadow 0.25s ease-in-out;
	will-change: box-shadow;
	&:hover {
		box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
		${Hover} {
			transform: translate3d(0, 0, 0);
		}
		${GalleryImage} {
			transform: scale3d(1.1, 1.1, 1);
		}
	}
`;
