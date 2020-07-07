import styled from "styled-components";
import React from "react";
import {PADDING} from "./grid";

export const useTabs = (
	length: number,
	initiallySelected = 0
): [number, (index: number) => void] => {
	const [selected, setSelected] = React.useState(initiallySelected);
	const goTo = React.useCallback(
		(index: number) => {
			setSelected(index);
		},
		[setSelected]
	);
	return [selected, goTo];
};

interface TabProps {
	selected?: boolean;
}

export const Tab = styled.button.attrs((props: TabProps) => ({
	role: "tab",
	"aria-selected": props.selected.toString()
}))<TabProps>`
	appearance: none;
	border-radius: 0;
	font-size: 1em;
	border-style: solid;
	border-width: 0 0 4px 0;
	border-color: ${({selected}) => (selected ? "currentColor" : "transparent")};
	background: none;
	color: inherit;
	cursor: pointer;
	padding: 1em calc(var(${PADDING}) * 1px);
`;

export const TabBar = styled.div`
	background: #fff;
	color: #000;
`;

export const TabContent = styled.div<TabProps>`
	display: ${({selected}) => (selected ? "block" : "none")};
`;
