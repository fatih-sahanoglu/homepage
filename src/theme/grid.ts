export interface Breakpoints {
	s: number;
	m: number;
	l: number;
	xl: number;
}

export interface MediaQueries {
	s: string;
	m: string;
	l: string;
	xl: string;
}

export interface Sizes {
	xs: number;
	s: number;
	m: number;
	l: number;
}

export interface GridConfig {
	gutter: Sizes;
	gridPadding: Sizes;
	padding: Sizes;
	maxWidth: number;
	breakpoints: Breakpoints;
	mq: MediaQueries;
	colSize: Sizes;
	debug?: boolean;
}

export const breakpoints: Breakpoints = {
	s: 320,
	m: 640,
	l: 960,
	xl: 1600
};

const gutter = {
	xs: 12,
	s: 8,
	m: 8,
	l: 5
};

const gridPadding = {
	xs: 12,
	s: 8,
	m: 32,
	l: 44
};

const padding = {
	xs: 16,
	s: 16,
	m: 12,
	l: 12
};

export const mq = Object.entries(breakpoints).reduce(
	(currentValue, [key, value]) => ({
		...currentValue,
		[key]: `(min-width: ${value}px)`
	}),
	{}
) as MediaQueries;

export const GRID: GridConfig = {
	gutter,
	gridPadding,
	padding,
	maxWidth: breakpoints.xl - (gridPadding.l + padding.l) * 2,
	breakpoints,
	mq,
	colSize: {
		xs: 2,
		s: 4,
		m: 8,
		l: 12
	}
};
