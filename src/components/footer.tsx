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
							<Link to="/products/">Products</Link>
						</Nav>
					</Column>
					<Column m={4} l={3} raw>
						<Nav>
							<Link to="/blog/">Blog</Link>
							<Link to="/gallery/">Gallery</Link>
						</Nav>
					</Column>
					<Column m={4} l={3} raw>
						<Nav>
							<Link to="/impressum/">Impressum</Link>
							<Link to="/contact/">Contact</Link>
							<Link to="/location/">Location</Link>
						</Nav>
					</Column>
					<Column m={4} l={3} raw>
						<Nav>
							<a href="https://facebook.com" target="_blank">
								Facebook
							</a>
							<a href="https://instagram.com" target="_blank">
								Instagram
							</a>
						</Nav>
					</Column>
				</Row>
			</Grid>
			<Spacing size="m" />
		</FooterStage>
	</>
);
