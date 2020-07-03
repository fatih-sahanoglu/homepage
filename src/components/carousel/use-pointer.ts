import React from "react";
import {MouseCoordinates} from "./types";
import {useMouseMove} from "./hooks";

export const usePointer = (
	ref: React.RefObject<HTMLDivElement>
): {coords: MouseCoordinates; mouseDown: boolean} => {
	const [coords, setCoords] = React.useState<MouseCoordinates>(null);
	const [mouseDown, setMouseDown] = React.useState(false);

	const handleMouseDown = React.useCallback(
		(e: MouseEvent): void => {
			const {pageX: x, pageY: y} = e;
			setMouseDown(true);
			setCoords({x, y});
		},
		[setMouseDown, setCoords]
	);

	const handleTouchStart = React.useCallback(
		(e: TouchEvent): void => {
			const {pageX: x, pageY: y} = e.touches[0];
			setMouseDown(true);
			setCoords({x, y});
		},
		[setMouseDown, setCoords]
	);

	const handleMouseUp = React.useCallback((): void => {
		setMouseDown(false);
	}, [setMouseDown]);

	const handleTouchEnd = React.useCallback((): void => {
		setMouseDown(false);
	}, [setMouseDown]);

	// Effects
	React.useEffect(() => {
		const current = ref.current as HTMLDivElement;
		window.addEventListener("mouseup", handleMouseUp);
		window.addEventListener("touchend", handleTouchEnd);
		current.addEventListener("mouseup", handleMouseDown);
		current.addEventListener("touchend", handleTouchStart);
		return (): void => {
			window.removeEventListener("mouseup", handleMouseUp);
			window.removeEventListener("touchend", handleTouchEnd);
			current.removeEventListener("mouseup", handleMouseDown);
			current.removeEventListener("touchend", handleTouchStart);
		};
	}, [ref, handleMouseDown, handleTouchStart, handleTouchEnd, handleMouseUp]);
	const pointer = useMouseMove(mouseDown, coords);
	return {
		coords,
		mouseDown
	};
};
