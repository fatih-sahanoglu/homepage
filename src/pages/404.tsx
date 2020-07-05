import React from "react";
import Helmet from "react-helmet";
import Layout from "../components/layout";
import {graphql} from "gatsby";
import get from "lodash/get";

class NotFound extends React.Component {
	render() {
		const siteTitle = get(this, "props.data.site.siteMetadata.title");
		return (
			<Layout>
				<Helmet title={siteTitle} />
				<h2>Page not found</h2>
			</Layout>
		);
	}
}

export default NotFound;

export const pageQuery = graphql`
	query NotFoundQuery {
		site {
			siteMetadata {
				title
			}
		}
	}
`;
