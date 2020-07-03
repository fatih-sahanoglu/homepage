import React from "react";
import styled, {css} from "styled-components";
import {IconButton} from "../icon-button";
import {Spacing, DEBUGGING_COLOR} from "./Spacing";

const SpacingDebugger = styled.div<{debug?: boolean}>`
	display: contents;
	${({debug}) =>
		debug &&
		css`
			${Spacing} {
				visibility: visible;
				position: relative;
				display: flex;
				align-items: center;
				align-content: center;
				justify-content: center;
				text-align: center;
				font-size: 12px;
				line-height: 1;
				font-weight: bolder;
				font-family: monospace;
				text-transform: uppercase;
				width: 100%;
				background: var(${DEBUGGING_COLOR});
				box-shadow: inset 0 1px 0 0 rgba(0, 0, 0, 0.25),
					inset 0 -1px 0 0 rgba(0, 0, 0, 0.25);
				overflow: hidden;
				&::before {
					content: attr(data-size);
				}
			}
		`}
`;

const Toggle = styled(IconButton)`
	position: fixed;
	z-index: 100000;
	bottom: 8px;
	left: 8px;
	height: 48px;
	width: 48px;
	padding: 8px;
	background: #000;
	color: #fff;
	border: 0;
	border-radius: 50%;
`;

export const SpacingOverlay: React.FC = ({children}) => {
	const [debug, setDebug] = React.useState(false);
	const toggleDebug = React.useCallback(() => {
		setDebug(state => !state);
	}, [setDebug]);
	return (
		<>
			<SpacingDebugger debug={debug}>{children}</SpacingDebugger>
			<Toggle onClick={toggleDebug} icon={debug ? "spacingOff" : "spacing"} />
		</>
	);
};
