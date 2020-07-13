import React from "react";
import {useGrid} from "../grid";
import {CarouselProps, CarouselConfig, MouseCoordinates, SlidesProps} from "./types";
import {useMouseMove, useSlides, useContent} from "./hooks";
import {CarouselProvider} from "./context";
import {SlidesWrapper} from "./Slides";

const useInterval = (callback: () => void, delay: number) => {
	React.useEffect(() => {
		if (delay !== null) {
			const id = setInterval(callback, delay);
			return () => clearInterval(id);
		}
	}, [delay, callback]);
};

export const Carousel: React.FC<CarouselProps> = ({children, threshold = 10, autoplay}) => {
	const slidesRef = React.useRef();
	const {viewport} = useGrid();
	const [activeSlide, setActiveSlide] = React.useState(0);
	const [coords, setCoords] = React.useState<MouseCoordinates>(null);
	const [mouseDown, setMouseDown] = React.useState(false);
	const pointer = useMouseMove(mouseDown, coords);
	const slides = useSlides(children);
	const content = useContent(children);
	const [
		{
			props: {
				children: slidePanels,
				reverse,
				clip,
				relative,
				height,
				visiblePanelsConfig = {s: 1},
				...slidesProps
			}
		}
	] = slides as React.ReactElement<SlidesProps>[];

	const slidesCount = React.Children.count(slidePanels);

	const {s, m = s, l = m} = visiblePanelsConfig;
	const visiblePanels = React.useMemo(() => (viewport.lu ? l : viewport.m ? m : s), [
		viewport,
		s,
		m,
		l
	]);

	const offsetX: number = React.useMemo(
		() =>
			slidesRef.current
				? (pointer.x / (slidesRef.current as HTMLDivElement).offsetWidth) * visiblePanels
				: 0,
		[slidesRef, pointer, visiblePanels]
	);

	// Context
	const config: CarouselConfig = {
		goTo: (n: number) => {
			setActiveSlide(n);
		},
		goToNext: () => {
			setActiveSlide(state => Math.min(state + 1, slidesCount - visiblePanels));
		},
		goToPrev: () => {
			setActiveSlide(state => Math.max(0, state - 1));
		},
		activeSlide,
		slidesCount,
		reverse,
		visiblePanels,
		offsetX: mouseDown && (pointer.x > threshold || pointer.x < -threshold) ? offsetX : 0
	};

	// Callbacks
	const handleMouseDown = React.useCallback(
		(e: React.MouseEvent<HTMLDivElement>): void => {
			const {pageX: x, pageY: y} = e;
			setMouseDown(true);
			setCoords({x, y});
		},
		[setMouseDown, setCoords]
	);

	const handleTouchStart = React.useCallback(
		(e: React.TouchEvent<HTMLDivElement>): void => {
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
		window.addEventListener("mouseup", handleMouseUp);
		window.addEventListener("touchend", handleTouchEnd);
		return (): void => {
			window.removeEventListener("mouseup", handleMouseUp);
			window.removeEventListener("touchend", handleTouchEnd);
		};
	}, [handleTouchEnd, handleMouseUp]);

	React.useEffect(() => {
		if (offsetX < -0.3 && !mouseDown) {
			setActiveSlide(state =>
				Math.max(
					0,
					Math.min(
						state + (reverse ? 1 : -1) * Math.floor(offsetX),
						slidesCount - visiblePanels
					)
				)
			);
		} else if (offsetX > 0.3 && !mouseDown) {
			setActiveSlide(state =>
				Math.max(
					0,
					Math.min(
						state + (reverse ? 1 : -1) * Math.ceil(offsetX),
						slidesCount - visiblePanels
					)
				)
			);
		}
	}, [reverse, offsetX, slidesCount, visiblePanels, setActiveSlide, mouseDown]);

	React.useEffect(() => {
		setActiveSlide(state => Math.max(0, Math.min(state, slidesCount - visiblePanels)));
	}, [setActiveSlide, slidesCount, visiblePanels]);
	const [loop, setLoop] = React.useState(autoplay);
	const stopAnimation = React.useCallback(() => setLoop(false), [setLoop]);
	const continueAnimation = React.useCallback(() => setLoop(autoplay), [setLoop, autoplay]);
	useInterval(() => {
		loop && setActiveSlide(state => (state + 1) % (slidesCount - visiblePanels + 1));
	}, loop && 5000);

	return (
		<CarouselProvider config={config}>
			<div onMouseLeave={continueAnimation} onMouseEnter={stopAnimation}>
				<SlidesWrapper
					reverse={reverse}
					relative={relative}
					height={height}
					clip={clip}
					ref={slidesRef}
					onMouseDown={handleMouseDown}
					onTouchStart={handleTouchStart}>
					{slides}
				</SlidesWrapper>
				{content}
			</div>
		</CarouselProvider>
	);
};
