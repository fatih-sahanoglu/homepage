import React from "react";
import {graphql} from "gatsby";
import Helmet from "react-helmet";
import get from "lodash/get";
import Img from "gatsby-image";
import Layout from "../components/layout";
import ReactMarkdown from "react-markdown";
import {Spacing} from "../components/spacing";
import styled from "styled-components";
import {Column, GUTTER, Row} from "../components/grid";

const MDImg = styled.img`
	width: calc(50% - var(${GUTTER}) * 1px);
	float: left;
	margin-right: calc(var(${GUTTER}) * 2px);
`;
const MDWrapper = styled.div`
	&::after {
		content: "";
		display: table;
		clear: both;
	}
`;
class BlogPostTemplate extends React.Component {
	render() {
		const post = get(this.props, "data.contentfulBlogPost");
		const siteTitle = get(this.props, "data.site.siteMetadata.title");

		return (
			<Layout>
				<Helmet title={`${post.title} | ${siteTitle}`} />
				<Row>
					<Column raw>
						<h1>{post.title}</h1>
						<small>
							by {post.author.name} on {post.publishDate}
						</small>
						<br />
						<small>
							Time to read:{" "}
							<strong>{post.body.childMarkdownRemark.timeToRead} minutes</strong>.
						</small>
						<Spacing size="s" />
						<Img alt={post.title} fluid={post.heroImage.fluid} />
						<Row raw>
							<Column m={8} raw>
								<MDWrapper>
									<ReactMarkdown
										source={post.body.childMarkdownRemark.rawMarkdownBody}
										renderers={{image: MDImg}}
									/>
								</MDWrapper>
							</Column>
						</Row>
					</Column>
				</Row>
			</Layout>
		);
	}
}

export default BlogPostTemplate;

export const pageQuery = graphql`
	query BlogPostBySlug($slug: String!) {
		site {
			siteMetadata {
				title
			}
		}
		contentfulBlogPost(slug: {eq: $slug}) {
			title
			publishDate(formatString: "MMMM Do, YYYY")
			heroImage {
				fluid(maxWidth: 1600, maxHeight: 600) {
					...GatsbyContentfulFluid_withWebp
				}
			}
			body {
				childMarkdownRemark {
					rawMarkdownBody
					timeToRead
				}
			}
			author {
				name
			}
		}
	}
`;
