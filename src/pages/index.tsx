import React from "react";
import {graphql} from "gatsby";
import get from "lodash/get";
import Helmet from "react-helmet";
import Layout from "../components/layout";
import ArticlePreview from "../components/article-preview";
import {Column, Row} from "../components/grid";
import {Contentful} from "../components/elements";

class RootIndex extends React.Component {
	render() {
		const siteTitle = get(this, "props.data.site.siteMetadata.title");
		const posts = get(this, "props.data.allContentfulBlogPost.edges");
		const slots = get(this, "props.data.contentfulPage.slots");
		return (
			<Layout>
				<Helmet title={siteTitle} />
				<Row>
					{slots.map(({__typename, id, ...props}) => {
						return (
							<Column key={id}>
								<Contentful contentType={__typename} {...props} />
							</Column>
						);
					})}
				</Row>

				<Row>
					<Column raw>
						<h2>Recent articles</h2>
					</Column>
					{posts
						.filter((x, i) => i < 3)
						.map(({node}) => {
							return (
								<Column m={4} key={node.slug} raw>
									<ArticlePreview article={node} />
								</Column>
							);
						})}
				</Row>
			</Layout>
		);
	}
}

export default RootIndex;

export const pageQuery = graphql`
	query HomeQuery {
		site {
			siteMetadata {
				title
			}
		}
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
		contentfulPage(slug: {eq: "HOME"}) {
			id
			title
			slots {
				... on ContentfulHero {
					id
					cards {
						id
						headline {
							id
							childMarkdownRemark {
								rawMarkdownBody
							}
						}
						body {
							id
							childMarkdownRemark {
								rawMarkdownBody
							}
						}
						backgroundImage {
							fluid(maxWidth: 1000, maxHeight: 600) {
								...GatsbyContentfulFluid_withWebp
							}
						}
						backgroundColor
					}
				}
				... on ContentfulMarkdown {
					id
					text {
						childMarkdownRemark {
							rawMarkdownBody
						}
					}
				}
			}
		}
	}
`;
