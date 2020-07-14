import React from "react";
import {graphql} from "gatsby";
import get from "lodash/get";
import Layout from "../components/layout";
import ReactMarkdown from "react-markdown";
import {Img} from "../components/image";
import {Box, Column, PADDING, Row} from "../components/grid";
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
import Helmet from "react-helmet";
import {Spacing} from "../components/spacing";
import FluidType from "../components/fluid-type";
import {CenterBox, FlexStretch} from "../components/common";
import {price} from "../utils/number";
import {Table, Tbody, Td, Tr} from "../components/table";

import {injectIntl} from "gatsby-plugin-intl";

function SeminarTemplate({intl, ...props}) {
	const siteTitle = get(props, "data.site.siteMetadata.title");
	const post = get(props, "data.contentfulSeminar");
	const images = get(post, "gallery");

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
							<Carousel autoplay={post.autoplay}>
								<Slides clip={ClipSlides.right} reverse relative>
									{images.map((image, i) => {
										switch (post.effect) {
											case "fade":
												return (
													<FadePanel
														key={`${image.title}:${i}`}
														index={i}
														raw>
														<Img
															alt={image.title}
															fluid={image.fluid}
														/>
													</FadePanel>
												);
											case "slide":
											default:
												return (
													<CarouselPanel key={`${image.title}:${i}`} raw>
														<Img
															alt={image.title}
															fluid={image.fluid}
														/>
													</CarouselPanel>
												);
										}
									})}
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
					<Box>
						<Table>
							<Tbody>
								<Tr>
									<Td>{intl.messages.price}</Td>
									<Td>{price(post.price)}</Td>
								</Tr>
								<Tr>
									<Td>{intl.messages.duration}</Td>
									<Td>{post.duration}</Td>
								</Tr>
								<Tr>
									<Td>{intl.messages.participants}</Td>
									<Td>{post.participants}</Td>
								</Tr>
								<Tr>
									<Td>{intl.messages.tools}</Td>
									<Td>
										<ReactMarkdown
											renderers={{
												root: ({children}) => <>{children}</>,
												paragraph: ({children}) => <div>{children}</div>
											}}
											source={post.tools.childMarkdownRemark.rawMarkdownBody}
										/>
									</Td>
								</Tr>
							</Tbody>
						</Table>
						{post.description && (
							<ReactMarkdown
								source={post.description.childMarkdownRemark.rawMarkdownBody}
							/>
						)}
					</Box>
				</Column>
			</Row>
		</Layout>
	);
}

export default injectIntl(SeminarTemplate);

export const pageQuery = graphql`
	query SeminarBySlug($slug: String!, $locale: String) {
		site {
			siteMetadata {
				title
			}
		}
		contentfulSeminar(slug: {eq: $slug}, node_locale: {eq: $locale}) {
			title
			name
			autoplay
			effect
			price
			duration
			participants
			tools {
				childMarkdownRemark {
					rawMarkdownBody
				}
			}
			description {
				childMarkdownRemark {
					rawMarkdownBody
				}
			}
			gallery {
				title
				fluid(maxWidth: 800, maxHeight: 500) {
					...GatsbyContentfulFluid_withWebp
				}
			}
		}
	}
`;
