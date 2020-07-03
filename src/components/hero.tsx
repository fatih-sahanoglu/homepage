import React from "react";
import Img from "gatsby-image";
import {Box, Column, Row} from "./grid";

export default ({data}) => (
	<Row>
		<Column raw>
			<Img alt={data.name} fluid={data.heroImage.fluid} />
			<Box>
				<h3>{data.name}</h3>
				<p>{data.title}</p>
				<p>{data.shortBio.shortBio}</p>
			</Box>
		</Column>
	</Row>
);
