import React from "react";
import {graphql} from "gatsby";
import Helmet from "react-helmet";
import get from "lodash/get";
import Img from "gatsby-image";
import GatsbyImage from "gatsby-image";
import Layout from "../components/layout";
import ReactMarkdown from "react-markdown";
import {Spacing} from "../components/spacing";
import styled from "styled-components";
import {Column, GUTTER, Row} from "../components/grid";
import {Person} from "../components/person";
import {Avatar, ImgWrapper} from "../components/avatar";

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

function BlogPostTemplate(props) {
	const post = get(props, "data.contentfulBlogPost");
	const siteTitle = get(props, "data.site.siteMetadata.title");

	return (
		<Layout>
			<Helmet title={`${post.title} | ${siteTitle}`} />
			<Row>
				<Column raw>
					<Img alt={post.title} fluid={post.heroImage.fluid} />
					<h1>{post.title}</h1>
					<Row raw>
						<Column m={2}>
							<Spacing size="xs" />
							<Person>
								<Avatar>
									<ImgWrapper>
										<GatsbyImage
											alt={post.author.image.title}
											fluid={post.author.image.fluid}
										/>
									</ImgWrapper>
								</Avatar>
								<small>by {post.author.name}</small>
								<br />
								<small>{post.publishDate}</small>
								<br />
								<small>
									Time to read:{" "}
									<strong>
										{post.body.childMarkdownRemark.timeToRead} minutes
									</strong>
									.
								</small>
							</Person>
						</Column>
						<Column m={6} l={8} raw>
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

export default BlogPostTemplate;

export const pageQuery = graphql`
	query BlogPostBySlug($slug: String!, $locale: String) {
		site {
			siteMetadata {
				title
			}
		}
		contentfulBlogPost(slug: {eq: $slug}, node_locale: {eq: $locale}) {
			title
			publishDate(formatString: "MMMM Do, YYYY")
			heroImage {
				fluid(maxWidth: 1600, maxHeight: 1200) {
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
				id
				image {
					description
					title
					fluid(maxWidth: 300, maxHeight: 300) {
						...GatsbyContentfulFluid_withWebp
					}
				}
			}
		}
	}
`;
