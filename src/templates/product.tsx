import React from "react";
import {graphql} from "gatsby";
import get from "lodash/get";
import Layout from "../components/layout";
import {Box, Column, Row} from "../components/grid";
import {Img} from "../components/image";
import ReactMarkdown from "react-markdown";
import {
	Carousel,
	CarouselNav,
	CarouselPageNumbers,
	CarouselPanel,
	ClipSlides,
	FadePanel,
	Nav,
	Slides
} from "../components/carousel";
import FluidType from "../components/fluid-type";
import {Spacing} from "../components/spacing";
import styled from "styled-components";
import {Stretch} from "../components/spacing/stretch";
import Helmet from "react-helmet";
import {Tab, TabBar, TabContent, useTabs} from "../components/tabs";

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

const ProductTemplate: React.FC = props => {
	const siteTitle = get(props, "data.site.siteMetadata.title");
	const post = get(props, "data.contentfulProduct");
	const images = get(post, "gallery.images");
	const autoplay = get(post, "autoplay");
	const tabs = {
		"What it is": post.description.childMarkdownRemark.rawMarkdownBody,
		"How to use": post.usage.childMarkdownRemark.rawMarkdownBody,
		Tip: post.tip.childMarkdownRemark.rawMarkdownBody
	};
	const tabEntries = Object.entries(tabs);
	const [selected, goTo] = useTabs(tabEntries.length);

	return (
		<Layout>
			<Helmet title={`${post.name} | ${siteTitle}`} />
			<Row>
				<Column raw>
					<Spacing size="l" />
					<FluidType as="h1" minFontSize={40} maxFontSize={100} center>
						{post.name}
					</FluidType>
					<Spacing size="l" />
				</Column>
				<Column l={8}>
					{images && (
						<Box removeGutter removePadding>
							<Carousel autoplay={autoplay}>
								<Slides clip={ClipSlides.right} reverse relative>
									{images.map((image, i) => (
										<FadePanel index={i} raw>
											<Img alt={image.title} fluid={image.fluid} />
										</FadePanel>
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
				<Column l={4} raw>
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
		site {
			siteMetadata {
				title
			}
		}
		contentfulProduct(slug: {eq: $slug}) {
			id
			title
			price
			autoplay
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
