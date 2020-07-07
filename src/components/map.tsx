import Map from "pigeon-maps";
import Marker from "pigeon-marker";
import React from "react";
import styled from "styled-components";
import {Column, useGrid} from "./grid";
import {Spacing} from "./spacing";

export function mapTilerProvider(x, y, z, dpr) {
	return `https://api.maptiler.com/maps/pastel/256/${z}/${x}/${y}${
		dpr >= 2 ? "@2x" : ""
	}.png?key=m6RJDhG5gIKNLqIoASkS`;
}

export interface ControlsProps {
	onZoomIn(): void;
	onZoomOut(): void;
}

export const MapArea = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
`;
export const MapWrapper = styled.div`
	width: 100%;
	position: relative;
`;
export const ControlsWrapper = styled.div`
	position: absolute;
	z-index: 100;
	top: 4px;
	right: 4px;
`;
export const Control = styled.button`
	border: 1px solid #aaa;
	background: #ddd;
	color: #666;
	border-radius: 0;
	height: 2em;
	width: 2em;
	display: flex;
	align-content: center;
	align-items: center;
	justify-content: center;
	text-align: center;
	cursor: pointer;
`;
export const Controls: React.FC<ControlsProps> = ({onZoomIn, onZoomOut}) => {
	return (
		<ControlsWrapper>
			<Control onClick={onZoomIn}>+</Control>
			<Control onClick={onZoomOut}>-</Control>
		</ControlsWrapper>
	);
};
export const CustomMap: React.FC<{lat: number; lon: number}> = ({lat, lon}) => {
	const mapWrapper = React.useRef<HTMLDivElement>();
	const {viewport, breakpoints, gridPadding, padding, gutter} = useGrid();
	const [zoom, setZoom] = React.useState(12);
	const [width, setWidth] = React.useState(breakpoints.s - (gridPadding.s * 2 + padding.s * 2));
	const handleZoomIn = React.useCallback(() => {
		setZoom(state => state + 1);
	}, [setZoom]);
	const handleZoomOut = React.useCallback(() => {
		setZoom(state => state - 1);
	}, [setZoom]);
	const setFullWidth = React.useCallback(() => {
		setWidth(mapWrapper.current.offsetWidth);
	}, [mapWrapper, setWidth]);
	React.useEffect(() => {
		setFullWidth();
		window.addEventListener("resize", setFullWidth);
		return () => {
			window.removeEventListener("resize", setFullWidth);
		};
	}, [setFullWidth]);
	return (
		<MapArea>
			<MapWrapper ref={mapWrapper}>
				<Controls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
				<Map
					provider={mapTilerProvider}
					center={[lat, lon]}
					zoom={zoom}
					width={width}
					height={viewport.lu ? 600 : viewport.mu ? 400 : 200}>
					<Marker anchor={[lat, lon]} payload={1} />
				</Map>
			</MapWrapper>
		</MapArea>
	);
};
