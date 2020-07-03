import React from "react";
import {graphql} from "gatsby";
import get from "lodash/get";
import Helmet from "react-helmet";
import Hero from "../components/hero";
import Layout from "../components/layout";
import ArticlePreview from "../components/article-preview";
import {Box, Column, Grid, Row, Stage} from "../components/grid";
import styled from "styled-components";
import GatsbyImage from "gatsby-image";
import {Carousel, CarouselNav, CarouselPanel, Slides} from "../components/carousel";
import ReactMarkdown from "react-markdown";
import {Stretch} from "../components/spacing/stretch";
import {Spacing} from "../components/spacing";

const Img = styled(GatsbyImage)`
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
`;

const Background = styled.div`
	z-index: 0;
	position: relative;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
`;

const Shade = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background: linear-gradient(
		to top,
		rgba(0, 0, 0, 0.9),
		rgba(0, 0, 0, 0.7) 30%,
		rgba(0, 0, 0, 0) 75%
	);
	mix-blend-mode: multiply;
`;

const Content = styled.div`
	z-index: 1;
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	color: white;
`;

const RelativeBox = styled(Box)`
	position: relative;
`;

const RelativeStage = styled(Stage)`
	position: relative;
	scroll-snap-align: start;
`;

const AbsoluteGrid = styled(Grid)`
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	left: 0;
	z-index: 1;
	visibility: hidden;
`;

const Big = styled.span`
	font-size: 2em;
`;

const colors = {
	red: "hsl(0, 30%, 20%)",
	orange: "hsl(30, 30%, 20%)",
	yellow: "hsl(60, 30%, 20%)",
	green: "hsl(120, 30%, 20%)",
	blue: "hsl(200, 30%, 20%)",
	purple: "hsl(280, 30%, 20%)"
};

const components = {
	ContentfulHero: ({cards}) => {
		return (
			<RelativeStage>
				<Carousel>
					<Slides>
						{cards.map(({backgroundColor, backgroundImage, body, headline, id}) => {
							const bodyMD = get(body, "childMarkdownRemark.rawMarkdownBody");
							const headlineMD = get(headline, "childMarkdownRemark.rawMarkdownBody");
							return (
								<CarouselPanel key={id}>
									<RelativeBox removeGutter>
										<Background
											style={{
												backgroundColor: colors[backgroundColor] || "#000"
											}}>
											{backgroundImage && (
												<>
													<Img fluid={backgroundImage.fluid} />
													<Shade />
												</>
											)}
										</Background>
										<Content>
											<Grid>
												<Row>
													<Column xs={0} l={2} />
													<Column l={6}>
														<Row>
															<Column l={4}>
																{headlineMD && (
																	<h2>
																		<ReactMarkdown
																			source={headlineMD}
																		/>
																	</h2>
																)}
															</Column>
														</Row>
														{bodyMD && (
															<div>
																<ReactMarkdown source={bodyMD} />
															</div>
														)}
													</Column>
												</Row>
											</Grid>
										</Content>
									</RelativeBox>
								</CarouselPanel>
							);
						})}
					</Slides>
					<AbsoluteGrid>
						<Row>
							<CarouselNav>
								<Stretch />
							</CarouselNav>
						</Row>
					</AbsoluteGrid>
				</Carousel>
			</RelativeStage>
		);
	},
	ContentfulMarkdown: ({text}) => {
		return (
			<Big>
				<Spacing size="xxl" />
				<ReactMarkdown source={text.childMarkdownRemark.rawMarkdownBody} />
			</Big>
		);
	},
	error: () => <div>Error</div>
};

const Contentful: React.FC<{contentType}> = ({contentType, ...props}) => {
	const Component = components[contentType] || components.error;
	return <Component {...props} />;
};

class RootIndex extends React.Component {
	render() {
		const siteTitle = get(this, "props.data.site.siteMetadata.title");
		const posts = get(this, "props.data.allContentfulBlogPost.edges");
		const slots = get(this, "props.data.contentfulPage.slots");
		return (
			<Layout>
				<Helmet title={siteTitle} />
				<Row>
					{slots.map(({__typename, id, ...props}) => {
						return (
							<Column key={id}>
								<Contentful contentType={__typename} {...props} />
							</Column>
						);
					})}
				</Row>
				<h2>Recent articles</h2>
				<Row>
					{posts
						.filter((x, i) => i < 3)
						.map(({node}) => {
							return (
								<Column m={4} key={node.slug} raw>
									<ArticlePreview article={node} />
								</Column>
							);
						})}
				</Row>
			</Layout>
		);
	}
}

export default RootIndex;

export const pageQuery = graphql`
	query HomeQuery {
		allContentfulBlogPost(sort: {fields: [publishDate], order: DESC}) {
			edges {
				node {
					title
					slug
					publishDate(formatString: "MMMM Do, YYYY")
					heroImage {
						fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: THUMB) {
							...GatsbyContentfulFluid_withWebp
						}
					}
					body {
						childMarkdownRemark {
							excerpt
						}
					}
				}
			}
		}
		contentfulPage(slug: {eq: "HOME"}) {
			id
			title
			slots {
				... on ContentfulHero {
					id
					cards {
						id
						headline {
							id
							childMarkdownRemark {
								rawMarkdownBody
							}
						}
						body {
							id
							childMarkdownRemark {
								rawMarkdownBody
							}
						}
						backgroundImage {
							fluid(maxWidth: 1000, maxHeight: 600) {
								...GatsbyContentfulFluid_withWebp
							}
						}
						backgroundColor
					}
				}
				... on ContentfulMarkdown {
					id
					text {
						childMarkdownRemark {
							rawMarkdownBody
						}
					}
				}
			}
		}
	}
`;
