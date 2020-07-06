import React from "react";
import {graphql, Link} from "gatsby";
import get from "lodash/get";
import Layout from "../components/layout";
import {Column, Row} from "../components/grid";
import Img from "gatsby-image";
import {RelativeBox} from "../components/elements";
import {Title} from "../components/title";
import {Spacing} from "../components/spacing";
import {Cover, GalleryImage} from "../components/cover";

class ServicesIndex extends React.Component {
	render() {
		const posts = get(this, "props.data.allContentfulServices.edges");
		return (
			<Layout>
				<Row>
					{posts.map((post, i) => {
						const images = get(post, "node.gallery.images");
						return (
							<Column key={post.node.slug} m={4} l={(i % 3) + ((i + 2) % 4) + 2}>
								<Link to={`/services/${post.node.slug}`}>
									<Spacing size={i % 2 ? "xl" : i % 3 ? "m" : "l"} />
									<Title>{post.node.title}</Title>
									<Cover>
										<GalleryImage
											alt={images[0].title}
											fluid={images[0].fluid}
										/>
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
