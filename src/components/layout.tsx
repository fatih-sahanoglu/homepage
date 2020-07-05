import React from "react";
import styled, {createGlobalStyle, ThemeProvider} from "styled-components";
import Navigation from "./navigation";
import {theme} from "../theme/theme";
import {GridOverlay} from "./grid/GridOverlay";
import {SpacingOverlay} from "./spacing/debugger";
import {Column, Grid, GridProvider, Row} from "./grid";
import {withPrefix} from "gatsby";
import Helmet from "react-helmet";
import {GRID} from "../theme/grid";
import {Spacing} from "./spacing";
import {Footer} from "./footer";

const GlobalStyle = createGlobalStyle`
	@font-face {
		font-family: FatihSans;
		src: url(${withPrefix("/fonts/FatihSans.eot")});
		src: url(${withPrefix("/fonts/FatihSans.woff2")}) format('woff2'),
		     url(${withPrefix("/fonts/FatihSans.woff")}) format('woff');
		font-weight: normal;
	}
	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}
	html {
		font-size: 16px;
		line-height: 1.5;
		font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
		scroll-snap-type: y proximity;
		scroll-behavior: smooth;
	}
	body {
		margin: 0;
		min-height: 100vh;
		overflow-x: hidden;
		max-width: 100vw;
		background: white;
	}
	h1, h2, h3 {
		font-family: Magneta, sans-serif;
	}
	a {
		color: currentColor;
		text-decoration: none;
		&:hover {
			text-decoration: underline;
		}
	}
	img {
		max-width: 100%;
	}
	table, caption, tbody, tfoot, thead, tr, th, td {
		margin: 0;
		padding: 0;
		border: 0;
		font-family: inherit;
		font-weight: inherit;
		font-style: inherit;
		font-size: 100%;
		vertical-align: top;
	}
	table {
		border-collapse: collapse;
		border-spacing: 0;
	}
`;

const WithDebuggers: React.FC = ({children}) =>
	process.env.NODE_ENV === "production" ? (
		<>{children}</>
	) : (
		<>
			<GridOverlay toggle />
			<SpacingOverlay>{children}</SpacingOverlay>
		</>
	);

const MainGrid = styled(Grid).attrs({
	overflow: true
})`
	min-height: 100vh;
`;

const MainRow = styled(Row)`
	flex: 1;
`;

const Layout: React.FC = ({children}) => {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<Helmet>
				<meta name="robots" content="noimageindex, noindex, nofollow, nosnippet" />
				<link rel="stylesheet" href="https://use.typekit.net/pxo7jmy.css" />
			</Helmet>
			<GridProvider grid={GRID}>
				<WithDebuggers>
					<MainGrid>
						<Row>
							<Column>
								<Navigation />
								<Spacing size="s" />
							</Column>
						</Row>
						<MainRow>
							<Column>{children}</Column>
						</MainRow>
						<Footer />
					</MainGrid>
				</WithDebuggers>
			</GridProvider>
		</ThemeProvider>
	);
};

export default Layout;
