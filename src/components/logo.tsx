import React from "react";
import styled from "styled-components";
import tree from "./tree";
import Kellerkind from "./kellerkind";
import FatihSahanoglu from "./fatih-sahanoglu";

const Svg = styled.svg`
	height: 1em;
	width: 1em;
`;

export const Logo = props => (
	<Svg {...props} viewBox="0 0 320 427">
		<path fill="currentColor" d={tree} />
	</Svg>
);
export const LogoWrapper = styled.div`
	position: relative;
	display: inline-flex;
	width: max-content;
	font-size: 1em;
	height: 1em;
`;
export const KellerkindWrapper = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	font-size: 0.1em;
	line-height: 1;
	margin-top: -1.5em;
	padding-left: 0.1em;
`;
export const FatihWrapper = styled.div`
	position: absolute;
	font-size: 0.2em;
	bottom: 0;
	right: 0;
`;
export const KellerkindLogo: React.FC<React.HTMLAttributes<HTMLDivElement>> = props => {
	return (
		<LogoWrapper {...props}>
			<Logo />
			<KellerkindWrapper>
				<Kellerkind />
				<FatihWrapper>
					<FatihSahanoglu />
				</FatihWrapper>
			</KellerkindWrapper>
		</LogoWrapper>
	);
};
