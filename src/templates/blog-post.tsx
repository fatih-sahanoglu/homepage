import React from "react";
import {graphql} from "gatsby";
import Helmet from "react-helmet";
import get from "lodash/get";
import Img from "gatsby-image";
import Layout from "../components/layout";
import ReactMarkdown from "react-markdown";
import {Column} from "../components/grid";
import {Spacing} from "../components/spacing";

class BlogPostTemplate extends React.Component {
	render() {
		const post = get(this.props, "data.contentfulBlogPost");
		const siteTitle = get(this.props, "data.site.siteMetadata.title");

		return (
			<Layout>
				<div>
					<Helmet title={`${post.title} | ${siteTitle}`} />
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
					<ReactMarkdown source={post.body.childMarkdownRemark.rawMarkdownBody} />
				</div>
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
				fluid(maxWidth: 1180, background: "rgb:000000") {
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
