import React from "react";
import {graphql} from "gatsby";
import get from "lodash/get";
import Layout from "../components/layout";
import Helmet from "react-helmet";
import {Box, Column, Row} from "../components/grid";
import {Spacing} from "../components/spacing";
import {Img} from "../components/image";
import {ParallaxBox} from "../components/parallax";
import {Cover, GalleryImage} from "../components/cover";

function GalleryTemplate(props) {
	const siteTitle = get(props, "data.site.siteMetadata.title");
	const post = get(props, "data.contentfulGallery");
	return (
		<Layout>
			<Helmet title={`${post.title} | ${siteTitle}`} />
			<Row>
				<Column>
					<h1 style={{textAlign: "center", fontSize: "5rem"}}>{post.title}</h1>
				</Column>
			</Row>
			<Row>
				{post.images.map((image, i) => {
					return (
						<React.Fragment key={`${image.id}:${i}`}>
							<Column l={i % 2} />
							<Column l={(i % 3) + (i % 3 === 2 ? 5 : 4)} flex>
								<Box alignSelf="center" removePadding>
									<Spacing size="m" />
									<ParallaxBox index={i}>
										<Cover>
											<GalleryImage alt={image.title} fluid={image.fluid} />
										</Cover>
									</ParallaxBox>
									<Spacing size="m" />
								</Box>
							</Column>
							<Column l={1} />
							<Column l={(i + 1) % 3} />
						</React.Fragment>
					);
				})}
			</Row>
		</Layout>
	);
}

export default GalleryTemplate;

export const pageQuery = graphql`
	query GalleryBySlug($slug: String!) {
		site {
			siteMetadata {
				title
			}
		}
		contentfulGallery(slug: {eq: $slug}) {
			id
			title
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
`;
