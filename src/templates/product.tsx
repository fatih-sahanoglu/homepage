import React from "react";
import {graphql} from "gatsby";
import get from "lodash/get";
import Layout from "../components/layout";
import Helmet from "react-helmet";
import {Box, Column, PADDING, Row} from "../components/grid";
import {Img} from "../components/image";
import ReactMarkdown from "react-markdown";
import {
	Carousel,
	CarouselNav,
	CarouselPageNumbers,
	CarouselPanel,
	ClipSlides,
	Nav,
	Slides
} from "../components/carousel";
import FluidType from "../components/fluid-type";
import {Spacing} from "../components/spacing";
import styled from "styled-components";
import {Stretch} from "../components/spacing/stretch";

const CenterBox = styled(Box)`
	align-items: center;
	align-content: center;
	justify-content: center;
	text-align: center;
`;

const FlexStretch = styled(Stretch)`
	flex: 1;
	display: flex;
`;

const useTabs = (length: number, initiallySelected = 0) => {
	const [selected, setSelected] = React.useState(initiallySelected);
	const goTo = React.useCallback(
		(index: number) => {
			setSelected(index);
		},
		[setSelected]
	);
	return [selected, goTo];
};

const Tab = styled.button<{selected?: boolean}>`
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
	&:active {
		background: rgba(0, 0, 0, 0.3);
	}
`;

const TabBar = styled.div`
	background: #fff;
	color: #000;
`;

const TabContent = styled.div<{selected?: boolean}>`
	display: ${({selected}) => (selected ? "block" : "none")};
`;

const ProductTemplate: React.FC = props => {
	const post = get(props, "data.contentfulProduct");
	const images = get(post, "gallery.images");
	const tabs = {
		"What it is": post.description.childMarkdownRemark.rawMarkdownBody,
		"How to use": post.usage.childMarkdownRemark.rawMarkdownBody,
		Tip: post.tip.childMarkdownRemark.rawMarkdownBody
	};
	const tabEntries = Object.entries(tabs);
	const [selected, goTo] = useTabs(tabEntries.length);

	return (
		<Layout>
			<Row>
				<Column raw>
					<FluidType minFontSize={30} maxFontSize={70} as="h1">
						{post.title}
					</FluidType>
					<Spacing size="l" />
				</Column>
				<Column m={4} l={6}>
					{images && (
						<Box removeGutter removePadding>
							<Carousel>
								<Slides clip={ClipSlides.right} reverse>
									{images.map(image => (
										<CarouselPanel raw>
											<Img alt={image.title} fluid={image.fluid} />
										</CarouselPanel>
									))}
								</Slides>
								<Nav>
									<CarouselNav>
										<FlexStretch>
											<CenterBox flex alignSelf="stretch">
												<CarouselPageNumbers />
											</CenterBox>
										</FlexStretch>
									</CarouselNav>
								</Nav>
							</Carousel>
						</Box>
					)}
				</Column>
				<Column m={4} l={6} raw>
					<TabBar>
						{tabEntries.map(([tab], index) => {
							return (
								<Tab
									onClick={() => {
										goTo(index);
									}}
									selected={selected === index}
									disabled={selected === index}>
									{tab}
								</Tab>
							);
						})}
					</TabBar>
					<Row raw>
						{tabEntries.map(([, content], index) => {
							return (
								<Column>
									<TabContent selected={selected === index}>
										<ReactMarkdown source={content} />
									</TabContent>
								</Column>
							);
						})}
					</Row>
				</Column>
			</Row>
		</Layout>
	);
};

export default ProductTemplate;

export const pageQuery = graphql`
	query ProductBySlug($slug: String!) {
		contentfulProduct(slug: {eq: $slug}) {
			id
			title
			price
			description {
				childMarkdownRemark {
					rawMarkdownBody
				}
			}
			tip {
				childMarkdownRemark {
					rawMarkdownBody
				}
			}
			usage {
				childMarkdownRemark {
					rawMarkdownBody
				}
			}
			gallery {
				images {
					id
					fluid(maxWidth: 800, maxHeight: 600) {
						...GatsbyContentfulFluid_withWebp
					}
					title
				}
			}
		}
	}
`;
