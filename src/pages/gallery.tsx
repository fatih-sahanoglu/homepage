import React from "react";
import {graphql, Link} from "gatsby";
import get from "lodash/get";
import styled from "styled-components";
import Layout from "../components/layout";
import Img from "gatsby-image";
import {Box, Column, PADDING, Row} from "../components/grid";
import {Spacing} from "../components/spacing";

const Hover = styled.div`
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	padding: 0 calc(var(${PADDING}) * 1px);
	display: flex;
	align-items: center;
	align-content: center;
	transform: translate3d(0, 100%, 0);
	transition: transform 0.25s ease-in-out;
	background: white;
	color: black;
`;

const GalleryImage = styled(Img)`
	width: 100%;
	transform: scale3d(1, 1, 1);
	transition: transform 0.25s ease-in-out;
`;

const Cover = styled.div`
	width: 100%;
	position: relative;
	display: flex;
	overflow: hidden;
	&:hover {
		${Hover} {
			transform: translate3d(0, 0, 0);
		}
		${GalleryImage} {
			transform: scale3d(1.1, 1.1, 1);
			transition-duration: 1s;
		}
	}
`;

class GalleryIndex extends React.Component {
	render() {
		const posts = get(this, "props.data.allContentfulGallery.edges");
		return (
			<Layout>
				<Row>
					{posts.map(post => {
						return (
							<Column key={post.node.slug} l={4} raw>
								<Link to={`/gallery/${post.node.slug}`}>
									<Cover>
										<GalleryImage
											alt={post.node.images[0].title}
											fluid={post.node.images[0].fluid}
										/>
									</Cover>
								</Link>
								<Spacing size="s" />
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
						fluid(maxWidth: 500, maxHeight: 500, resizingBehavior: THUMB) {
							...GatsbyContentfulFluid_withWebp
						}
					}
				}
			}
		}
	}
`;
