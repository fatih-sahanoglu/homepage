import React from "react";
import styled, {css} from "styled-components";
import {ICONS, Icons} from "../icon/icons";
import {Icon} from "../icon";
import {PADDING} from "../grid";

interface IconButtonProps {
	icon?: keyof Icons;
	d?: string;
}

const StyledButton = styled.button`
	border: 0;
	padding: 4px;
	width: 32px;
	height: 32px;
	background: none;
	color: currentColor;
	&[disabled] {
		opacity: 0.2;
		pointer-events: none;
	}
`;

export const UnsetIconButton = styled.div<{inline?: boolean}>`
	display: inline-flex;
	margin: 0 -12px;
	${({inline}) =>
		!inline &&
		css`
			width: calc(100% + var(${PADDING}) * 2px);
		`};
`;

export const IconButton: React.FC<
	IconButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({icon, d = ICONS[icon], ...props}) => {
	return (
		<StyledButton {...props}>
			<Icon icon={icon} d={d} />
		</StyledButton>
	);
};
