import styled from "styled-components";
import {Box, Column, Grid, Row, Stage} from "./grid";
import React from "react";
import {Carousel, CarouselNav, CarouselPanel, Slides} from "./carousel";
import get from "lodash/get";
import ReactMarkdown from "react-markdown";
import {Stretch} from "./spacing/stretch";
import {Spacing} from "./spacing";
import GatsbyImage from "gatsby-image";

export const Img = styled(GatsbyImage)`
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
`;
export const Background = styled.div`
	z-index: 0;
	position: relative;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
`;
export const Shade = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background: linear-gradient(
		to top,
		rgba(0, 0, 0, 0.9),
		rgba(0, 0, 0, 0.7) 30%,
		rgba(0, 0, 0, 0) 75%
	);
	mix-blend-mode: multiply;
`;
export const Content = styled.div`
	z-index: 1;
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	color: white;
`;
export const RelativeBox = styled(Box)`
	position: relative;
`;
export const RelativeStage = styled(Stage)`
	position: relative;
	scroll-snap-align: start;
`;
export const AbsoluteGrid = styled(Grid)`
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	left: 0;
	z-index: 1;
	visibility: hidden;
`;
export const Big = styled.span`
	font-size: 2em;
`;
export const colors = {
	red: "hsl(0, 30%, 20%)",
	orange: "hsl(30, 30%, 20%)",
	yellow: "hsl(60, 30%, 20%)",
	green: "hsl(120, 30%, 20%)",
	blue: "hsl(200, 30%, 20%)",
	purple: "hsl(280, 30%, 20%)"
};
export const components = {
	ContentfulHero: ({cards}) => {
		return (
			<RelativeStage>
				<Carousel>
					<Slides>
						{cards.map(({backgroundColor, backgroundImage, body, headline, id}) => {
							const bodyMD = get(body, "childMarkdownRemark.rawMarkdownBody");
							const headlineMD = get(headline, "childMarkdownRemark.rawMarkdownBody");
							return (
								<CarouselPanel key={id}>
									<RelativeBox removeGutter>
										<Background
											style={{
												backgroundColor: colors[backgroundColor] || "#000"
											}}>
											{backgroundImage && (
												<>
													<Img fluid={backgroundImage.fluid} />
													<Shade />
												</>
											)}
										</Background>
										<Content>
											<Grid>
												<Row>
													<Column xs={0} l={2} />
													<Column l={6}>
														<Row>
															<Column l={4}>
																{headlineMD && (
																	<h2>
																		<ReactMarkdown
																			source={headlineMD}
																		/>
																	</h2>
																)}
															</Column>
														</Row>
														{bodyMD && (
															<div>
																<ReactMarkdown source={bodyMD} />
															</div>
														)}
													</Column>
												</Row>
											</Grid>
										</Content>
									</RelativeBox>
								</CarouselPanel>
							);
						})}
					</Slides>
					<AbsoluteGrid>
						<Row>
							<CarouselNav>
								<Stretch />
							</CarouselNav>
						</Row>
					</AbsoluteGrid>
				</Carousel>
			</RelativeStage>
		);
	},
	ContentfulMarkdown: ({text}) => {
		return (
			<Row>
				<Column m={6} l={10} raw>
					<ReactMarkdown source={text.childMarkdownRemark.rawMarkdownBody} />
				</Column>
			</Row>
		);
	},
	error: () => <div>Error</div>
};

export const Contentful: React.FC<{contentType}> = ({contentType, ...props}) => {
	const Component = components[contentType] || components.error;
	return <Component {...props} />;
};
