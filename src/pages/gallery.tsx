import React from "react";
import {graphql, Link} from "gatsby";
import get from "lodash/get";
import Layout from "../components/layout";
import {Box, Column, Row} from "../components/grid";
import {Spacing} from "../components/spacing";
import {Title} from "../components/title";
import {Cover, GalleryImage} from "../components/cover";
import {ParallaxBox} from "../components/parallax";
import Helmet from "react-helmet";
import FluidType from "../components/fluid-type";
import {injectIntl} from "gatsby-plugin-intl";

function GalleryIndex(props) {
	const siteTitle = get(props, "data.site.siteMetadata.title");
	const posts = get(props, "data.allContentfulGallery.edges");
	return (
		<Layout>
			<Helmet title={`${siteTitle} | Gallery`} />
			<Row>
				{posts.map((post, i) => {
					const [image] = get(post, "node.images");
					const id = get(post, "node.id");
					return (
						<React.Fragment key={id}>
							<Column m={i % 2} l={i % 2} />
							<Column
								m={(i % 3) + (i % 3 === 0 ? 3 : 2)}
								l={(i % 3) + (i % 3 === 2 ? 5 : 4)}
								flex>
								<Box alignSelf="center" removePadding>
									<Spacing size="m" />
									<ParallaxBox index={i}>
										<Link to={post.node.slug}>
											<FluidType
												as="h3"
												minFontSize={20}
												maxFontSize={40}
												center>
												{post.node.name}
											</FluidType>
											<Spacing size="xs" />
											<Cover>
												<GalleryImage
													alt={image.title}
													fluid={image.fluid}
												/>
											</Cover>
										</Link>
									</ParallaxBox>
									<Spacing size="m" />
								</Box>
							</Column>
							<Column m={i % 2} l={1} />
							<Column m={(i + 1) % 3} l={(i + 1) % 3} />
						</React.Fragment>
					);
				})}
			</Row>
		</Layout>
	);
}

export default injectIntl(GalleryIndex);

export const pageQuery = graphql`
	query GalleryIndexQuery($locale: String) {
		site {
			siteMetadata {
				title
			}
		}
		allContentfulGallery(filter: {showInGallery: {eq: true}, node_locale: {eq: $locale}}) {
			edges {
				node {
					id
					slug
					title
					name
					images {
						id
						title
						description
						fluid(maxWidth: 800) {
							...GatsbyContentfulFluid_withWebp
						}
					}
				}
			}
		}
	}
`;
