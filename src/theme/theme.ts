import {DefaultTheme, ThemeContext} from "styled-components";
import {GRID} from "./grid";
import React from "react";

export const theme: DefaultTheme = {
	spacing: {
		xs: 16,
		s: 16 * 2,
		m: 16 * 3,
		l: 16 * 4,
		xl: 16 * 6,
		xxl: 16 * 8
	},
	grid: GRID,
	components: {
		header: {
			height: 300,
			minHeight: 40
		},
		logo: {
			size: 200
		}
	}
};

export const useTheme = () => React.useContext(ThemeContext);
