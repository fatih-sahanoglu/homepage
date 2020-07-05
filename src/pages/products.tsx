import React from "react";
import {graphql, Link} from "gatsby";
import get from "lodash/get";
import Layout from "../components/layout";
import Img from "gatsby-image";
import {COLCOUNT, Column, GUTTER, PADDING, Row} from "../components/grid";
import styled from "styled-components";
import {Spacing} from "../components/spacing";

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
					{posts.map(post => {
						const [file] = get(post, "node.gallery.images");
						return (
							<Column key={post.node.slug} l={4} raw>
								<Link to={`/products/${post.node.slug}`}>
									<h3>{post.node.title}</h3>
									<ProductImg alt={file.title} fluid={file.fluid} />
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
							fluid(maxWidth: 800, maxHeight: 600) {
								...GatsbyContentfulFluid_withWebp
							}
							title
						}
					}
				}
			}
		}
	}
`;
