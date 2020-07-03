import React from "react";
import styled from "styled-components";
import {Icon} from "../icon";
import {Column} from "./Column";
import {GUTTER, GRID_PADDING} from "./constants";
import {StyledGrid} from "./Grid";
import {Row} from "./Row";
import {GridOverlayGridProps, GridOverlayProps} from "./types";

const GridOverlayGrid = styled(StyledGrid)<GridOverlayGridProps>`
	position: ${({position}) => position};
	z-index: 99999;
	top: 0;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
	margin: 0;
	pointer-events: none;
	opacity: 0.1;
`;

const COLUMN_COLOR = "#a00";
const GUTTER_COLOR = "#00a";
const PADDING_COLOR = "#aa0";
const GRID_PADDING_COLOR = "#a0a";

const GridOverlayColumn = styled(Column)`
	height: 100%;
	background-clip: content-box, border-box;
	background-image: linear-gradient(${COLUMN_COLOR}, ${COLUMN_COLOR}),
		linear-gradient(${PADDING_COLOR}, ${PADDING_COLOR});
	box-shadow: calc(var(${GUTTER}) * 1px) 0 0 ${GUTTER_COLOR},
		calc(var(${GUTTER}) * -1px) 0 0 ${GUTTER_COLOR};
`;

const GridOverlayRow = styled(Row)`
	height: 100%;
	box-shadow: calc(var(${GRID_PADDING}) * 1px) 0 0 ${GRID_PADDING_COLOR},
		calc(var(${GRID_PADDING}) * -1px) 0 0 ${GRID_PADDING_COLOR};
`;

const Toggle = styled.button<Pick<GridOverlayProps, "position">>`
	position: ${({position}) => position};
	z-index: 100000;
	bottom: 8px;
	right: 8px;
	height: 48px;
	width: 48px;
	padding: 8px;
	background: #000;
	color: #fff;
	border: 0;
	border-radius: 50%;
`;

export const GridLayer: React.FC<GridOverlayProps> = ({position}) => {
	return (
		<GridOverlayGrid position={position}>
			<GridOverlayRow>
				{Array(12)
					.fill(Boolean)
					.map((x, i) => (
						<GridOverlayColumn
							key={i}
							xs={i < 2 ? 1 : 0}
							s={i < 4 ? 1 : 0}
							m={i < 8 ? 1 : 0}
							l={1}>
							&nbsp;
						</GridOverlayColumn>
					))}
			</GridOverlayRow>
		</GridOverlayGrid>
	);
};

export const GridOverlay: React.FC<GridOverlayProps> = ({
	initialActive,
	toggle,
	position = "fixed"
}) => {
	const [active, setActive] = React.useState(initialActive);
	const handleClick = React.useCallback(() => setActive(state => !state), []);
	return (
		<>
			{toggle && (
				<Toggle onClick={handleClick} position={position}>
					<Icon icon={active ? "gridOff" : "grid"} />
				</Toggle>
			)}
			{active && <GridLayer position={position} />}
		</>
	);
};
