import React from "react";
import {graphql} from "gatsby";
import get from "lodash/get";
import Helmet from "react-helmet";
import GatsbyImage from "gatsby-image";
import styled, {css} from "styled-components";
import ReactMarkdown from "react-markdown";
import Layout from "./src/components/layout";
import {Box, Column, Grid, Row, Stage} from "./src/components/grid";
import {Carousel, CarouselNav, CarouselPanel, Slides} from "./src/components/carousel";
import {Stretch} from "./src/components/spacing/stretch";
import {Spacing} from "./src/components/spacing";
import {Contentful} from "./src/components/elements";

class AboutPage extends React.Component {
	render() {
		const siteTitle = get(this, "props.data.site.siteMetadata.title");
		const slots = get(this, "props.data.contentfulPage.slots");
		const title = get(this, "props.data.contentfulPage.title");
		return (
			<>
				<Helmet title={siteTitle} />
				<Layout>
					<h1>{title}</h1>
					<Row>
						{slots.map(({__typename, id, ...props}) => {
							return (
								<Column key={id}>
									<Contentful contentType={__typename} {...props} />
								</Column>
							);
						})}
					</Row>
				</Layout>
			</>
		);
	}
}

export default AboutPage;

export const pageQuery = graphql`
	query AboutageQuery {
		contentfulPage(slug: {eq: "about"}) {
			id
			title
			slots {
				... on ContentfulHero {
					id
					autoplay
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
