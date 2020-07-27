import styled, {css} from "styled-components";
import {Column, Grid, Row, Stage} from "./grid";
import React from "react";
import {Spacing} from "./spacing";
import {graphql, Link, useStaticQuery} from "gatsby";
import {injectIntl, IntlContextConsumer, changeLocale} from "gatsby-plugin-intl";
import ReactMarkdown from "react-markdown";
import {toPhone} from "../utils/number";
import {DE} from "./flags/de";
import {US} from "./flags/us";

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
	instagram = "instagram",
	vimeo = "vimeo"
}

type IconMap = {
	[key in IconType]: string;
};

const icons: IconMap = {
	facebook:
		"M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z",
	instagram:
		"M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z",
	vimeo:
		"M22,7.42C21.91,9.37 20.55,12.04 17.92,15.44C15.2,19 12.9,20.75 11,20.75C9.85,20.75 8.86,19.67 8.05,17.5C7.5,15.54 7,13.56 6.44,11.58C5.84,9.42 5.2,8.34 4.5,8.34C4.36,8.34 3.84,8.66 2.94,9.29L2,8.07C3,7.2 3.96,6.33 4.92,5.46C6.24,4.32 7.23,3.72 7.88,3.66C9.44,3.5 10.4,4.58 10.76,6.86C11.15,9.33 11.42,10.86 11.57,11.46C12,13.5 12.5,14.5 13.05,14.5C13.47,14.5 14.1,13.86 14.94,12.53C15.78,11.21 16.23,10.2 16.29,9.5C16.41,8.36 15.96,7.79 14.94,7.79C14.46,7.79 13.97,7.9 13.46,8.12C14.44,4.89 16.32,3.32 19.09,3.41C21.15,3.47 22.12,4.81 22,7.42Z"
};
interface IconProps {
	icon: IconType;
}

const Icon = styled.svg.attrs(({icon}: IconProps) => ({
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

const LanguageLink = styled.button`
	font-size: inherit;
	border: 0;
	padding: 0.5em;
	margin: 0;
	border-radius: 0;
	appearance: none;
	font-family: inherit;
	text-align: left;
	line-height: 1.5;
	cursor: pointer;
	background: none;
	color: inherit;
	${({disabled}) => css`
		pointer-events: ${disabled ? "none" : "initial"};
	`};
`;

const languageName = {
	"de-DE": "Deutsch",
	"en-US": "English"
};

const Flag = styled.span`
	display: inline-flex;
	height: 1em;
	width: 1em;
	box-shadow: 0 0 0 1px;

	svg {
		flex: 1;
	}
`;

const Language = () => (
	<div>
		<IntlContextConsumer>
			{({languages, language: currentLocale}) =>
				languages.map(language => (
					<LanguageLink
						key={language}
						onClick={() => changeLocale(language)}
						disabled={currentLocale === language}>
						<Flag>{language === "de-DE" ? <DE /> : <US />}</Flag>
					</LanguageLink>
				))
			}
		</IntlContextConsumer>
	</div>
);

interface WithIntl {
	intl?: any;
}
const Footer: React.FC<WithIntl> = ({intl}) => {
	const {contentfulLocation: location} = useStaticQuery(graphql`
		{
			contentfulLocation {
				telephone
				address {
					childMarkdownRemark {
						rawMarkdownBody
					}
				}
			}
		}
	`);
	return (
		<>
			<Spacing size="l" />
			<FooterStage>
				<Spacing size="l" />
				<Grid>
					<Row>
						<Column m={4} l={3} raw>
							<Nav>
								<Link to={`/${intl.locale}/services/gentlemen`}>
									{intl.messages.gentlemen}
								</Link>
								<Link to={`/${intl.locale}/services/ladies`}>
									{intl.messages.ladies}
								</Link>
								<Link to={`/${intl.locale}/services/youngsters`}>
									{intl.messages.youngsters}
								</Link>
								<Link to={`/${intl.locale}/services/beauty`}>
									{intl.messages.beauty}
								</Link>
								<Link to={`/${intl.locale}/seminars`}>
									{intl.messages.seminars}
								</Link>
							</Nav>
						</Column>
						<Column m={4} l={3} raw>
							<Nav>
								<Link to={`/${intl.locale}/products`}>
									{intl.messages.products}
								</Link>
								<Link to={`/${intl.locale}/gallery`}>{intl.messages.gallery}</Link>
								<Link to={`/${intl.locale}/blog`}>{intl.messages.blog}</Link>
							</Nav>
						</Column>
						<Column m={4} l={3} raw>
							<Nav>
								<Link to={`/${intl.locale}/location`}>
									{intl.messages.location}
								</Link>
								<Link to={`/${intl.locale}/contact`}>{intl.messages.contact}</Link>
								<Link to={`/${intl.locale}/impressum`}>
									{intl.messages.imprint}
								</Link>
							</Nav>
							<Social
								href="https://www.facebook.com/Fatih-Sahanoglucom-234829333300330"
								target="_blank">
								<Icon icon={IconType.facebook} />
								<Hidden>Facebook</Hidden>
							</Social>
							<Social
								href="https://www.instagram.com/fatih_sahanoglu/"
								target="_blank">
								<Icon icon={IconType.instagram} />
								<Hidden>Instagram</Hidden>
							</Social>
							<Social href="https://vimeo.com/user85813888" target="_blank">
								<Icon icon={IconType.vimeo} />
								<Hidden>Vimeo</Hidden>
							</Social>
						</Column>
						<Column m={4} l={3} raw>
							<Language />
							<div>
								<a href={`tel:${toPhone(location.telephone)}`}>
									{location.telephone}
								</a>
							</div>
							<ReactMarkdown
								source={location.address.childMarkdownRemark.rawMarkdownBody}
							/>
						</Column>
					</Row>
				</Grid>
				<Spacing size="m" />
			</FooterStage>
		</>
	);
};

export default injectIntl(Footer);
