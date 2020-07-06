import React from "react";
import {graphql, Link} from "gatsby";
import get from "lodash/get";
import Layout from "../components/layout";
import Img from "gatsby-image";
import {COLCOUNT, Column, GUTTER, PADDING, Row} from "../components/grid";
import styled from "styled-components";
import {Spacing} from "../components/spacing";
import {RelativeBox} from "../components/elements";
import {Title} from "../components/title";
import {Cover, GalleryImage} from "../components/cover";

const ProductImg = styled(Img)`
	width: 100%;
`;

const ImageCell = styled.td`
	padding: 1em 0;
	width: calc(100% / var(${COLCOUNT}) * 2);
`;

const Cell = styled.td`
	padding: 0 calc((var(${PADDING}) + var(${GUTTER})) * 1px);
`;

const Table = styled.table`
	width: calc(100% + var(${GUTTER}) * 2px);
	margin: 0 calc(var(${GUTTER}) * -1px);
`;

class ProductsIndex extends React.Component {
	render() {
		const posts = get(this, "props.data.allContentfulProduct.edges");
		return (
			<Layout>
				<Row>
					{posts.map((post, i) => {
						const [file] = get(post, "node.gallery.images");
						return (
							<Column key={post.node.slug} m={4} l={(i % 3) + ((i + 2) % 4) + 2}>
								<Link to={`/products/${post.node.slug}`}>
									<Spacing size={i % 2 ? "xl" : i % 3 ? "m" : "l"} />
									<Cover>
										<GalleryImage alt={file.title} fluid={file.fluid} />
										<Title>{post.node.title}</Title>
									</Cover>
									<Spacing size={i % 2 ? "m" : i % 3 ? "l" : "xl"} />
								</Link>
							</Column>
						);
					})}
				</Row>
			</Layout>
		);
	}
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
							fluid(maxWidth: 800, maxHeight: 600) {
								...GatsbyContentfulFluid_withWebp
							}
						}
					}
				}
			}
		}
	}
`;
