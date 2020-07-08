import styled from "styled-components";
import {Column, Grid, Row, Stage} from "./grid";
import React from "react";
import {Spacing} from "./spacing";
import {Link} from "gatsby";

const Nav = styled.nav`
	display: flex;
	flex-direction: column;
`;
const FooterStage = styled(Stage)`
	background: black;
	color: white;
`;

enum IconType {
	facebook = "facebook",
	instagram = "instagram"
}

interface IconMap {
	[key: IconType]: string;
}
const icons: IconMap = {
	facebook:
		"M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z",
	instagram:
		"M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z"
};
interface IconProps {
	icon: IconType;
}

const Icon = styled.svg.attrs(({icon}) => ({
	children: <path d={icons[icon]} />,
	viewBox: "0 0 24 24",
	height: 24,
	width: 24
}))<IconProps>`
	fill: currentColor;
	vertical-align: text-top;
`;
const Hidden = styled.span`
	font-size: 0;
	position: absolute;
	top: 0;
	left: 0;
	opacity: 0;
	pointer-events: none;
`;

const Social = styled.a`
	position: relative;
`;

export const Footer: React.FC = () => (
	<>
		<Spacing size="l" />
		<FooterStage>
			<Spacing size="l" />
			<Grid>
				<Row>
					<Column m={4} l={3} raw>
						<Nav>
							<Link to="/services/gentlemen">Gentlemen</Link>
							<Link to="/services/ladies">Ladies</Link>
							<Link to="/services/youngsters">Youngsters</Link>
							<Link to="/services/beauty">Beauty</Link>
						</Nav>
					</Column>
					<Column m={4} l={3} raw>
						<Nav>
							<Link to="/products/">Products</Link>
							<Link to="/gallery/">Gallery</Link>
							<Link to="/blog/">Blog</Link>
						</Nav>
					</Column>
					<Column m={4} l={3} raw>
						<Nav>
							<Link to="/location/">Location</Link>
							<Link to="/contact/">Contact</Link>
							<Link to="/impressum/">Impressum</Link>
						</Nav>
					</Column>
					<Column m={4} l={3} raw>
						<Social href="https://facebook.com" target="_blank">
							<Icon icon={IconType.facebook} />
							<Hidden>Facebook</Hidden>
						</Social>
						<Social href="https://instagram.com" target="_blank">
							<Icon icon={IconType.instagram} />
							<Hidden>Instagram</Hidden>
						</Social>
					</Column>
				</Row>
			</Grid>
			<Spacing size="m" />
		</FooterStage>
	</>
);
