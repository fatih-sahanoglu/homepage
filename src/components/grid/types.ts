import React from "react";
import {GridConfig} from "../../theme/grid";

export interface ColSpan {
	xs?: string | number;
	s?: string | number;
	m?: string | number;
	l?: string | number;
}

export interface ColumnProps extends ColSpan, React.ComponentPropsWithoutRef<"div"> {
	className?: string;
	style?: React.CSSProperties;
	raw?: boolean;
	flex?: boolean;
	order?: number;
	// TODO see src/grid/Column.tsx
	// as?: any;
}

export interface RowProps {
	className?: string;
	style?: React.CSSProperties;
	//children?:
	//  | React.ReactElement<ColumnProps>
	//  | React.ReactElement<ColumnProps>[];
	raw?: boolean;
	noWrap?: boolean;
	reverse?: boolean;
	justify?: "end" | "start" | "center";
}

export interface GridProps {
	className?: string;
	children?: React.ReactElement<RowProps> | React.ReactElement<RowProps>[];
	overflow?: boolean;
}

export type GridOverlayPosition = "fixed" | "absolute";

export interface GridOverlayGridProps extends GridProps {
	position?: GridOverlayPosition;
}

export interface GridOverlayProps extends GridOverlayGridProps {
	initialActive?: boolean;
	toggle?: boolean;
}

export interface ViewportSize {
	s: boolean;
	su: boolean;
	m: boolean;
	mu: boolean;
	l: boolean;
	lu: boolean;
	xl: boolean;
}

export interface GridContextConfig extends GridConfig {
	viewport: ViewportSize;
}

export interface GridContextProps {
	grid: GridConfig;
}
