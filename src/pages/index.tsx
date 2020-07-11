import React from "react";
import {graphql} from "gatsby";
import get from "lodash/get";
import Helmet from "react-helmet";
import Layout from "../components/layout";
import ArticlePreview from "../components/article-preview";
import {Column, Row} from "../components/grid";
import {Contentful} from "../components/elements";

function RootIndex(props) {
	const siteTitle = get(props, "data.site.siteMetadata.title");
	const posts = get(props, "data.allContentfulBlogPost.edges");
	const slots = get(props, "data.contentfulPage.slots");
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
				<Column>
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

export default RootIndex;

export const pageQuery = graphql`
	query HomeQuery {
		site {
			siteMetadata {
				title
			}
		}
		allContentfulBlogPost(sort: {fields: [publishDate], order: DESC}, limit: 3) {
			edges {
				node {
					title
					slug
					publishDate(formatString: "MMMM Do, YYYY")
					heroImage {
						title
						description
						fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: THUMB) {
							...GatsbyContentfulFluid_withWebp
						}
					}
					body {
						childMarkdownRemark {
							excerpt
							timeToRead
						}
					}
				}
			}
		}
		contentfulPage(slug: {eq: "HOME"}) {
			id
			title
			slots {
				... on ContentfulMarkdown {
					id
					text {
						childMarkdownRemark {
							rawMarkdownBody
						}
					}
				}
				... on ContentfulGallery {
					id
					images {
						id
						title
						description
						fluid(maxWidth: 1600) {
							...GatsbyContentfulFluid_withWebp
						}
					}
				}
				... on ContentfulHero {
					id
					autoplay
					cards {
						id
						backgroundColor
						backgroundImage {
							title
							description
							fluid(maxWidth: 1600, maxHeight: 600) {
								...GatsbyContentfulFluid_withWebp
							}
						}
						body {
							childMarkdownRemark {
								rawMarkdownBody
							}
						}
						headline {
							childMarkdownRemark {
								rawMarkdownBody
							}
						}
					}
				}
				... on ContentfulLocation {
					id
					location {
						lat
						lon
					}
				}
				... on ContentfulVideo {
					id
					vimeo
				}
			}
		}
	}
`;
