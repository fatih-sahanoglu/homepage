import React from "react";
import {SpringBaseProps} from "react-spring";
import {ColSpan, ColumnProps} from "../grid";

export interface VisiblePanelsConfig {
	s: number;
	m?: number;
	l?: number;
}
export interface CarouselProps {
	threshold?: number;
}

export enum ClipSlides {
	left = "left",
	right = "right",
	both = "both"
}

export interface SlidesWrapperProps {
	clip?: ClipSlides;
	reverse?: boolean;
}

export interface Indexed {
	index: number;
}

export interface SlidesProps extends ColSpan {
	reverse?: boolean;
	visiblePanelsConfig?: VisiblePanelsConfig;
	clip?: ClipSlides;
	children?: React.ReactNode;
}

export interface CarouselConfig {
	goTo(n: number): void;
	goToNext(): void;
	goToPrev(): void;
	activeSlide: number;
	slidesCount: number;
	visiblePanels: number;
	reverse?: boolean;
	offsetX: number;
}

export interface MouseCoordinates {
	x: number;
	y: number;
}

export interface CarouselPanelProps extends ColumnProps {
	springConfig?: SpringBaseProps["config"];
}
