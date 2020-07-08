import React from "react";
import {useSpring, animated} from "react-spring";
import styled, {css} from "styled-components";
import {COLCOUNT, Column, GUTTER} from "../grid";
import {CarouselPanelProps, ClipSlides, SlidesProps, SlidesWrapperProps, Indexed} from "./types";
import {useCarousel} from "./hooks";

export const Slides: React.FC<SlidesProps> = ({children}) => <>{children}</>;

export const StyledPanel = styled(Column)`
	position: relative;
	touch-action: pan-y;
	user-select: none;
	img,
	a {
		-webkit-user-drag: none;
		-webkit-touch-callout: none;
	}
`;

export const CarouselPanel: React.FC<CarouselPanelProps> = ({children, springConfig, ...props}) => {
	const {activeSlide, visiblePanels, reverse, offsetX} = useCarousel();
	const spring = useSpring({
		config: offsetX ? {...springConfig, duration: 0} : springConfig,
		transform: `translate3d(${offsetX * 100}%, 0, 0) translate3d(calc(${reverse ? 1 : -1} * (${
			100 * activeSlide
		}% + ${activeSlide} * var(${GUTTER}) * 2px)), 0, 0)`
	});
	return (
		<StyledPanel
			{...props}
			as={animated.div}
			raw
			style={spring}
			xs={`calc(var(${COLCOUNT}) / ${visiblePanels})`}>
			{children}
		</StyledPanel>
	);
};

export const LazyPanel: React.FC<CarouselPanelProps & Indexed> = ({
	children,
	springConfig,
	index,
	...props
}) => {
	const {activeSlide, visiblePanels, reverse, offsetX} = useCarousel();
	const isActive = activeSlide === index;
	const isPrev = activeSlide > index;
	const dir = reverse ? 1 : -1;
	const spring = useSpring({
		config: offsetX ? {...springConfig, duration: 0} : springConfig,
		transform: `translate3d(${offsetX * 100}%, 0, 0) translate3d(calc(${dir} * (${
			100 * (activeSlide + (isActive ? 0 : isPrev ? -dir : dir))
		}% + ${activeSlide} * var(${GUTTER}) * 2px)), 0, 0)`
	});
	return (
		<StyledPanel
			{...props}
			as={animated.div}
			raw
			style={spring}
			xs={`calc(var(${COLCOUNT}) / ${visiblePanels})`}>
			{children}
		</StyledPanel>
	);
};

export const SlidesWrapper = styled.div<SlidesWrapperProps>`
	display: flex;
	touch-action: cross-slide-x;
	${({reverse}) => css`
		flex-direction: ${reverse ? "row-reverse" : "row"};
	`};
	${({clip}) => {
		switch (clip) {
			case ClipSlides.left:
				return css`
					clip-path: polygon(
						calc(var(${GUTTER}) * 1px) 0,
						100vw 0,
						100vw 100%,
						calc(var(${GUTTER}) * 1px) 100%
					);
				`;
			case ClipSlides.right:
				return css`
					clip-path: polygon(
						-100vw 0,
						calc(100% - var(${GUTTER}) * 1px) 0,
						calc(100% - var(${GUTTER}) * 1px) 100%,
						-100vw 100%
					);
				`;
			case ClipSlides.both:
				return css`
					clip-path: polygon(
						calc(var(${GUTTER}) * 1px) 0,
						calc(100% - var(${GUTTER}) * 1px) 0,
						calc(100% - var(${GUTTER}) * 1px) 100%,
						calc(var(${GUTTER}) * 1px) 100%
					);
				`;
			default:
				return null;
		}
	}};
`;
