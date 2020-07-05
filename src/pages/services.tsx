import React from "react";
import {graphql, Link} from "gatsby";
import get from "lodash/get";
import Layout from "../components/layout";
import {Box, Column, Row} from "../components/grid";
import Img from "gatsby-image";

class ServicesIndex extends React.Component {
	render() {
		const posts = get(this, "props.data.allContentfulServices.edges");
		return (
			<Layout>
				<Row>
					{posts.map(post => {
						const images = get(post, "node.gallery.images");
						return (
							<Column key={post.node.slug} m={4} l={6} raw>
								<Link to={`/services/${post.node.slug}`}>
									<h3>{post.node.title}</h3>
									{images && (
										<Img alt={images[0].title} fluid={images[0].fluid} />
									)}
								</Link>
							</Column>
						);
					})}
				</Row>
			</Layout>
		);
	}
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
