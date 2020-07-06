import React from "react";
import {graphql, Link} from "gatsby";
import get from "lodash/get";
import Layout from "../components/layout";
import {Column, Row} from "../components/grid";
import {Spacing} from "../components/spacing";
import {Title} from "../components/title";
import {Cover, GalleryImage} from "../components/cover";

class GalleryIndex extends React.Component {
	render() {
		const posts = get(this, "props.data.allContentfulGallery.edges");
		return (
			<Layout>
				<Row>
					{posts.map((post, i) => {
						return (
							<Column key={post.node.slug} m={4} l={(i % 3) + ((i + 2) % 4) + 2}>
								<Link to={`/gallery/${post.node.slug}`}>
									<Spacing size={i % 2 ? "xl" : i % 3 ? "m" : "l"} />
									<Cover>
										<GalleryImage
											alt={post.node.images[0].title}
											fluid={post.node.images[0].fluid}
										/>
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

export default GalleryIndex;

export const pageQuery = graphql`
	query GalleryIndexQuery {
		site {
			siteMetadata {
				title
			}
		}
		allContentfulGallery(filter: {showInGallery: {eq: true}}) {
			edges {
				node {
					id
					slug
					title
					images {
						id
						title
						description
						fluid(maxWidth: 500, maxHeight: 500, resizingBehavior: THUMB) {
							...GatsbyContentfulFluid_withWebp
						}
					}
				}
			}
		}
	}
`;
