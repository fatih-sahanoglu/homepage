import React from "react";
import {Link as GatsbyLink} from "gatsby";
import {PADDING, Row, Stage, useGrid} from "./grid";
import styled, {css} from "styled-components";
import {Spacing} from "./spacing";
import {Logo} from "./logo";
import {minMax} from "../utils/number";
import {useTheme} from "../theme/theme";

const Nav = styled.nav`
	background: linear-gradient(to top, rgba(255, 255, 255, 1) 20%, rgba(255, 255, 255, 0.9));
	color: black;
	position: sticky;
	width: 100%;
	top: 0;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-content: center;
	align-items: center;
	overflow: hidden;
`;

const Stretch = styled.div<{justify?: string}>`
	flex: 1;
	display: flex;
	justify-content: ${({justify = "flex-start"}) => justify};
`;

const HomeLink = styled(GatsbyLink)`
	color: currentColor;
	text-decoration: none;
	padding: 0 calc(var(${PADDING}) * 1px);
	display: flex;
	align-content: center;
	justify-content: center;
	order: -1;
	width: 100%;
	${({theme}) => css`
		@media ${theme.grid.mq.m} {
			order: initial;
			width: initial;
		}
	`};
`;

const Link = styled(HomeLink).attrs({
	activeClassName: "active",
	partiallyActive: true
})`
	padding: 0.25em calc(var(${PADDING}) * 1px);
	&.active {
		box-shadow: 0 4px 0 0 currentColor;
	}
	font-size: 0.8em;
	${({theme}) => css`
		@media ${theme.grid.mq.m} {
			font-size: 1em;
		}
	`};
`;

const useScrollY = () => {
	const [scrollY, setScrollY] = React.useState(0);
	const handleScroll = React.useCallback(() => {
		setScrollY(window.scrollY);
	}, [setScrollY]);
	React.useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [setScrollY]);
	return scrollY;
};

const Header = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 10;
`;

const Navigation: React.FC = () => {
	const {
		components: {header, logo}
	} = useTheme();
	const {viewport} = useGrid();
	const scrollY = useScrollY();
	const minSizeDiff = header.height - header.minHeight;
	const offset = viewport.s ? 65 : header.height - minMax(0, minSizeDiff, scrollY);
	const scale = offset / header.height;
	return (
		<Row>
			<Stage style={{marginBottom: viewport.mu ? header.height : 0}}>
				<Header>
					<Nav
						role="navigation"
						style={{
							height: offset
						}}>
						<Stretch justify="flex-end">
							<Link to="/blog/">Blog</Link>
							<Link to="/gallery/">Gallery</Link>
						</Stretch>
						<HomeLink
							to="/"
							style={{
								fontSize: viewport.mu ? logo.size : "2em",
								transform: viewport.mu && `scale3d(${scale}, ${scale}, 1)`
							}}>
							<Logo />
						</HomeLink>
						<Stretch>
							<Link to="/services">Service</Link>
							<Link to="/products/">Products</Link>
						</Stretch>
					</Nav>
				</Header>
			</Stage>
		</Row>
	);
};

export default Navigation;
