import React from "react";
import {graphql} from "gatsby";
import get from "lodash/get";
import Helmet from "react-helmet";
import Layout from "../components/layout";
import {Column, Row} from "../components/grid";
import {Contentful} from "../components/elements";

const Impressum = props => {
	const siteTitle = get(props, "data.site.siteMetadata.title");
	const slots = get(props, "data.contentfulPage.slots");
	return (
		<Layout>
			<Helmet title={siteTitle} />
			<Row>
				<Column raw>
					<h1>Impressum</h1>
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

export default Impressum;

export const pageQuery = graphql`
	query ImprintQuery {
		site {
			siteMetadata {
				title
			}
		}
		contentfulPage(slug: {eq: "impressum"}) {
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
			}
		}
	}
`;
