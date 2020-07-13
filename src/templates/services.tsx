import React from "react";
import {graphql} from "gatsby";
import get from "lodash/get";
import Layout from "../components/layout";
import ReactMarkdown from "react-markdown";
import {Img} from "../components/image";
import {Box, Column, Row} from "../components/grid";
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
import {Table, Tbody, Td, Tr} from "../components/table";
import {CenterBox, FlexStretch} from "../components/common";
import {price} from "../utils/number";

function ServicesTemplate(props) {
	const siteTitle = get(props, "data.site.siteMetadata.title");
	const post = get(props, "data.contentfulServices");
	const images = get(post, "gallery.images");
	const autoplay = get(post, "autoplay");
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
					<Table>
						<Tbody>
							{post.service.map(service => {
								return (
									<Tr key={service.id}>
										<Td>
											<p>{service.name}</p>
											<small>
												{service.description && (
													<ReactMarkdown
														source={
															service.description.childMarkdownRemark
																.rawMarkdownBody
														}
													/>
												)}
											</small>
										</Td>
										<Td textEnd>{price(service.price)}</Td>
									</Tr>
								);
							})}
						</Tbody>
					</Table>
				</Column>
			</Row>
		</Layout>
	);
}

export default ServicesTemplate;

export const pageQuery = graphql`
	query ServicesBySlug($slug: String!) {
		site {
			siteMetadata {
				title
			}
		}
		contentfulServices(slug: {eq: $slug}) {
			title
			name
			autoplay
			gallery {
				images {
					fluid(maxWidth: 800, maxHeight: 500) {
						...GatsbyContentfulFluid_withWebp
					}
					title
				}
			}
			service {
				id
				name
				price
				description {
					id
					childMarkdownRemark {
						rawMarkdownBody
					}
				}
			}
		}
	}
`;
