import React from "react";
import Helmet from "react-helmet";
import Layout from "../components/layout";

class NotFound extends React.Component {
	render() {
		return (
			<Layout>
				<Helmet title={"Page not found"} />
				<h2>Page not found</h2>
			</Layout>
		);
	}
}

export default NotFound;
