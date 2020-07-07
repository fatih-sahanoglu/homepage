import React from "react";
import {graphql, Link} from "gatsby";
import get from "lodash/get";
import Layout from "../components/layout";
import {Box, Column, Row} from "../components/grid";
import {Spacing} from "../components/spacing";
import {Title} from "../components/title";
import {Cover, GalleryImage} from "../components/cover";
import {ParallaxBox} from "../components/parallax";
import Helmet from "react-helmet";

function ProductsIndex(props) {
	const siteTitle = get(props, "data.site.siteMetadata.title");
	const posts = get(props, "data.allContentfulProduct.edges");
	return (
		<Layout>
			<Helmet title={`${siteTitle} | Products`} />
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
										<Link to={`/products/${post.node.slug}`}>
											<Title>{post.node.title}</Title>
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

export default ProductsIndex;

export const pageQuery = graphql`
	query ProductsIndexQuery {
		site {
			siteMetadata {
				title
			}
		}
		allContentfulProduct {
			edges {
				node {
					id
					slug
					title
					gallery {
						images {
							id
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
