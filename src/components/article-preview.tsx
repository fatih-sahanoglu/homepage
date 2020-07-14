import React from "react";
import {Link} from "gatsby";
import Img from "gatsby-image";
import {Column, Row} from "./grid";
import {Spacing} from "./spacing";
import ReactMarkdown from "react-markdown";
import {injectIntl} from "gatsby-plugin-intl";

const ArticlePreview = ({article, intl}) => (
	<Row raw>
		<Column>
			<h3>
				<Link to={`/${intl.locale}/blog/${article.slug}`}>{article.title}</Link>
			</h3>
		</Column>
		<Column m={4}>
			<Link to={article.slug}>
				<Img alt="" fluid={article.heroImage.fluid} />
			</Link>
			<Spacing size="s" />
		</Column>
		<Column m={4}>
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
export default injectIntl(ArticlePreview);
