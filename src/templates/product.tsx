import React from "react";
import {graphql} from "gatsby";
import get from "lodash/get";
import Layout from "../components/layout";
import Helmet from "react-helmet";
import {Box, Column, Row} from "../components/grid";
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

class ProductTemplate extends React.Component {
	render() {
		const post = get(this.props, "data.contentfulProduct");
		const images = get(post, "gallery.images");

		return (
			<Layout>
				<Row>
					<Column raw>
						<FluidType minFontSize={30} maxFontSize={70} as="h1">
							{post.title}
						</FluidType>
						<Spacing size="l" />
					</Column>
					<Column l={6}>
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
					<Column l={6}>
						<ReactMarkdown
							source={post.description.childMarkdownRemark.rawMarkdownBody}
						/>
					</Column>
				</Row>
			</Layout>
		);
	}
}

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
