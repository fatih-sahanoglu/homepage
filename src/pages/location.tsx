import React, {useEffect} from "react";
import {graphql} from "gatsby";
import get from "lodash/get";
import Helmet from "react-helmet";
import Layout from "../components/layout";
import {Column, Row} from "../components/grid";
import {Contentful} from "../components/elements";

const Location = props => {
	const siteTitle = get(props, "data.site.siteMetadata.title");
	const slots = get(props, "data.contentfulPage.slots");
	return (
		<Layout>
			<Helmet title={`${siteTitle} | Location`} />
			<Row>
				<Column raw>
					<h1>Location</h1>
				</Column>
				{slots.map(({__typename, id, ...props}) => {
					return (
						<Column key={id}>
							<Contentful contentType={__typename} {...props} />
						</Column>
					);
				})}
			</Row>
		</Layout>
	);
};

export default Location;

export const pageQuery = graphql`
	query LocatioQuery {
		site {
			siteMetadata {
				title
			}
		}
		contentfulPage(slug: {eq: "location"}) {
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
