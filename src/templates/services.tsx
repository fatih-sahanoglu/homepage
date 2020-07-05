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
	Nav,
	Slides
} from "../components/carousel";
import {Stretch} from "../components/spacing/stretch";
import styled from "styled-components";
const price = (n: number): string => `${n.toFixed(2)} €`;
const Table = styled.table`
	width: 100%;
`;

const Tbody = styled.tbody``;

const Thead = styled.thead``;

const Tr = styled.tr`
	background-image: linear-gradient(
		to right,
		rgba(0, 0, 0, 0),
		rgba(0, 0, 0, 0.75),
		rgba(0, 0, 0, 0)
	);
	background-size: 100% 1px;
	background-repeat: no-repeat;
	background-position: center bottom;
`;

const Td = styled.td<{textEnd?: boolean; textCenter?: boolean}>`
	padding: 1em calc(var(${PADDING}) * 1px);
	text-align: ${({textEnd, textCenter}) => (textEnd ? "right" : textCenter ? "center" : "left")};
`;

const Th = styled.th``;

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

class ServicesTemplate extends React.Component {
	render() {
		const post = get(this.props, "data.contentfulServices");
		const images = get(post, "gallery.images");

		return (
			<Layout>
				<Row>
					<Column m={4} l={7}>
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
					<Column m={4} l={5} raw>
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
																service.description
																	.childMarkdownRemark
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
