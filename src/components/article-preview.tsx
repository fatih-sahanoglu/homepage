import React from "react";
import {Link} from "gatsby";
import Img from "gatsby-image";
import {Column, Row} from "./grid";
import {Spacing} from "./spacing";
import ReactMarkdown from "react-markdown";

export default ({article}) => (
	<Row raw>
		<Column raw>
			<h3>
				<Link to={`/blog/${article.slug}`}>{article.title}</Link>
			</h3>
		</Column>
		<Column m={4} raw>
			<Link to={`/blog/${article.slug}`}>
				<Img alt="" fluid={article.heroImage.fluid} />
			</Link>
			<Spacing size="s" />
		</Column>
		<Column m={4} l={6} raw>
			<small>{article.publishDate}</small>
			<br />
			<small>
				Time to read: <strong>{article.body.childMarkdownRemark.timeToRead} minutes</strong>
				.
			</small>
			<ReactMarkdown source={article.body.childMarkdownRemark.excerpt} />
		</Column>
	</Row>
);
