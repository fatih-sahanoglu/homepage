import React from "react";
import {graphql, Link} from "gatsby";
import get from "lodash/get";
import Helmet from "react-helmet";
import Layout from "../components/layout";
import ArticlePreview from "../components/article-preview";
import {Column, Row} from "../components/grid";
import GatsbyImage from "gatsby-image";
import styled from "styled-components";

const ImgWrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	border-radius: 50%;
	overflow: hidden;
`;

const Avatar = styled.div`
	position: relative;
	padding-bottom: 100%;
	width: 100%;
`;

const Person = styled.div`
	position: sticky;
	top: ${({
		theme: {
			components: {
				header: {minHeight}
			}
		}
	}) => `${minHeight}px`};
`;

class BlogIndex extends React.Component {
	render() {
		const siteTitle = get(this, "props.data.site.siteMetadata.title");
		const posts = get(this, "props.data.allContentfulBlogPost.edges");
		const person = get(this, "props.data.contentfulPerson");

		return (
			<>
				<Helmet title={siteTitle} />
				<Layout>
					<Row>
						<Column l={2}>
							<Person>
								<Avatar>
									<ImgWrapper>
										<GatsbyImage fluid={person.image.fluid} />
									</ImgWrapper>
								</Avatar>
								<h3>{person.name}</h3>
							</Person>
						</Column>
						<Column l={10}>
							<Row>
								{posts.map(({node}) => {
									return (
										<Column key={node.slug} raw>
											<ArticlePreview article={node} />
										</Column>
									);
								})}
							</Row>
						</Column>
					</Row>
				</Layout>
			</>
		);
	}
}

export default BlogIndex;

export const pageQuery = graphql`
	query BlogIndexQuery {
		allContentfulBlogPost(sort: {fields: [publishDate], order: DESC}) {
			edges {
				node {
					title
					slug
					publishDate(formatString: "MMMM Do, YYYY")
					heroImage {
						fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: THUMB) {
							...GatsbyContentfulFluid_withWebp
						}
					}
					body {
						childMarkdownRemark {
							excerpt
						}
					}
				}
			}
		}
		contentfulPerson(name: {eq: "Fatih Sahanoglu"}) {
			id
			name
			image {
				id
				fluid {
					...GatsbyContentfulFluid_withWebp
				}
			}
		}
	}
`;
