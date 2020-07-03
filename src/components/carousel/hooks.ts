import React from "react";
import {CarouselContext} from "./context";
import {CarouselConfig, MouseCoordinates} from "./types";
import {Nav} from "./Nav";
import {Slides} from "./Slides";

export const useCarousel = (): CarouselConfig => {
	return React.useContext(CarouselContext);
};

export const useMouseMove = (track: boolean, initialState: MouseCoordinates): MouseCoordinates => {
	const [coords, setCoords] = React.useState<MouseCoordinates>({x: 0, y: 0});
	const handleMouseMove = React.useCallback(
		(e: MouseEvent): void => {
			const {pageX, pageY} = e;
			setCoords({x: pageX - initialState.x, y: pageY - initialState.y});
		},
		[setCoords, initialState]
	);
	const handleTouchMove = React.useCallback(
		(e: TouchEvent): void => {
			const {pageX, pageY} = e.touches[0];
			setCoords({x: pageX - initialState.x, y: pageY - initialState.y});
		},
		[setCoords, initialState]
	);
	React.useEffect(() => {
		if (track) {
			window.addEventListener("mousemove", handleMouseMove);
			window.addEventListener("touchmove", handleTouchMove);
		}
		return (): void => {
			setCoords({x: 0, y: 0});
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("touchmove", handleTouchMove);
		};
	}, [handleMouseMove, handleTouchMove, track]);
	return coords;
};

export const useSlides = (children: React.ReactNode): React.ReactElement[] => {
	return React.useMemo(
		() =>
			React.Children.toArray(children).filter((child: React.ReactElement) => {
				return child.type === Slides;
			}) as React.ReactElement[],
		[children]
	);
};

export const useContent = (children: React.ReactNode): React.ReactElement[] => {
	return React.useMemo(
		() =>
			React.Children.toArray(children).filter((child: React.ReactElement) => {
				return child.type !== Slides;
			}) as React.ReactElement[],
		[children]
	);
};

export const useNav = (children: React.ReactNode): React.ReactElement[] => {
	return React.useMemo(
		() =>
			React.Children.toArray(children).filter((child: React.ReactElement) => {
				return child.type === Nav;
			}) as React.ReactElement[],
		[children]
	);
};
