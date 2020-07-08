import React from "react";
import {graphql, Link} from "gatsby";
import get from "lodash/get";
import Layout from "../components/layout";
import {Box, Column, Row} from "../components/grid";
import {Title} from "../components/title";
import {Spacing} from "../components/spacing";
import {Cover, GalleryImage} from "../components/cover";
import {ParallaxBox} from "../components/parallax";
import Helmet from "react-helmet";
import FluidType from "../components/fluid-type";

function ServicesIndex(props) {
	const siteTitle = get(props, "data.site.siteMetadata.title");
	const posts = get(props, "data.allContentfulServices.edges");
	return (
		<Layout>
			<Helmet title={`${siteTitle} | Services`} />
			<Row>
				{posts.map((post, i) => {
					const [image] = get(post, "node.gallery.images");
					const id = get(post, "node.id");
					return (
						<React.Fragment key={id}>
							<Column m={i % 2} l={i % 2} />
							<Column
								m={(i % 3) + (i % 3 === 2 ? 2 : 1)}
								l={(i % 3) + (i % 3 === 2 ? 5 : 4)}
								flex>
								<Box alignSelf="center" removePadding>
									<Spacing size="m" />
									<ParallaxBox index={i}>
										<Link to={`/services/${post.node.slug}`}>
											<FluidType
												as="h3"
												style={{textAlign: "center"}}
												minFontSize={40}
												maxFontSize={100}>
												{post.node.title}
											</FluidType>
											<Spacing size="m" />
											<Cover>
												<GalleryImage
													alt={image.title}
													fluid={image.fluid}
												/>
											</Cover>
										</Link>
									</ParallaxBox>
									<Spacing size="m" />
								</Box>
							</Column>
							<Column m={1} l={1} />
							<Column m={(i + 1) % 3} l={(i + 1) % 3} />
						</React.Fragment>
					);
				})}
			</Row>
		</Layout>
	);
}

export default ServicesIndex;

export const pageQuery = graphql`
	query ServicesIndexQuery {
		site {
			siteMetadata {
				title
			}
		}
		allContentfulServices {
			edges {
				node {
					id
					slug
					title
					name
					gallery {
						images {
							title
							description
							fluid(maxWidth: 800) {
								...GatsbyContentfulFluid_withWebp
							}
						}
					}
				}
			}
		}
	}
`;
