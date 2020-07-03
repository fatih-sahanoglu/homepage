import React from "react";
import {graphql} from "gatsby";
import get from "lodash/get";
import styled from "styled-components";
import Layout from "../components/layout";
import Helmet from "react-helmet";
import {Box, Column, Row} from "../components/grid";
import {Spacing} from "../components/spacing";
import {Img} from "../components/image";
import {Parallax} from "../components/parallax";
import {easeIn, easeOut} from "@popmotion/easing";

const ParallaxBox: React.FC<{index: number}> = ({children, index}) => {
	const interpolate = React.useCallback(
		(progress: number): React.CSSProperties => ({
			transform: `translate3d(${0}%,${
				((index % 2 ? easeIn : easeOut)(1 - progress) * 100) / ((index % 3) + 2)
			}%, 0)`
		}),
		[index]
	);
	return (
		<Parallax interpolate={interpolate} boundary={200}>
			{children}
		</Parallax>
	);
};

class GalleryTemplate extends React.Component {
	render() {
		const post = get(this.props, "data.contentfulGallery");
		return (
			<Layout>
				<Helmet title={`Gallery | ${post.title}`} />
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
											<Img alt={image.title} fluid={image.fluid} />
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
}

export default GalleryTemplate;

export const pageQuery = graphql`
	query GalleryBySlug($slug: String!) {
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
