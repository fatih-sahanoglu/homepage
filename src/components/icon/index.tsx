import React from "react";
import {ICONS, Icons} from "./icons";

export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
	icon?: keyof Icons;
	d?: string;
	size?: number;
}

export const Icon: React.FC<IconProps> = ({className, icon, d = ICONS[icon], size}) => {
	return (
		<svg className={className} viewBox="0 0 24 24" height={size} width={size}>
			<path d={d} fill="currentColor" />
		</svg>
	);
};

Icon.defaultProps = {
	size: 24
};
