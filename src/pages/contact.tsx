import React, {useEffect} from "react";
import {graphql} from "gatsby";
import get from "lodash/get";
import Helmet from "react-helmet";
import Map from "pigeon-maps";
import Marker from "pigeon-marker";
import Overlay from "pigeon-overlay";
import Layout from "../components/layout";
import {Column, Row, useGrid} from "../components/grid";
import {Contentful} from "../components/elements";
import ContactForm from "../components/contact-form";
import styled from "styled-components";
import {Spacing} from "../components/spacing";

const MAPTILER_ACCESS_TOKEN = "m6RJDhG5gIKNLqIoASkS";
const MAP_ID = "pastel";

function mapTilerProvider(x, y, z, dpr) {
	return `https://api.maptiler.com/maps/${MAP_ID}/256/${z}/${x}/${y}${
		dpr >= 2 ? "@2x" : ""
	}.png?key=${MAPTILER_ACCESS_TOKEN}`;
}
interface ControlsProps {
	onZoomIn(): void;
	onZoomOut(): void;
}
const MapArea = styled(Column).attrs({raw: true})`
	display: flex;
	justify-content: center;
	width: 100%;
`;
const MapWrapper = styled.div`
	width: 100%;
	position: relative;
`;
const ControlsWrapper = styled.div`
	position: absolute;
	z-index: 100;
	top: 4px;
	right: 4px;
`;

const Control = styled.button`
	border: 1px solid #aaa;
	background: #ddd;
	color: #666;
	border-radius: 0;
	height: 2em;
	width: 2em;
	display: flex;
	align-content: center;
	align-items: center;
	justify-content: center;
	text-align: center;
	cursor: pointer;
`;
const Controls: React.FC<ControlsProps> = ({onZoomIn, onZoomOut}) => {
	return (
		<ControlsWrapper>
			<Control onClick={onZoomIn}>+</Control>
			<Control onClick={onZoomOut}>-</Control>
		</ControlsWrapper>
	);
};

const CustomMap: React.FC<{lat: number; lon: number}> = ({lat, lon}) => {
	const mapWrapper = React.useRef<HTMLDivElement>();
	const {viewport, breakpoints, gridPadding, padding, gutter} = useGrid();
	const [zoom, setZoom] = React.useState(12);
	const [width, setWidth] = React.useState(breakpoints.s - (gridPadding.s * 2 + padding.s * 2));
	const handleZoomIn = React.useCallback(() => {
		setZoom(state => state + 1);
	}, [setZoom]);
	const handleZoomOut = React.useCallback(() => {
		setZoom(state => state - 1);
	}, [setZoom]);
	const setFullWidth = React.useCallback(() => {
		setWidth(mapWrapper.current.offsetWidth);
	}, [mapWrapper, setWidth]);
	React.useEffect(() => {
		setFullWidth();
		window.addEventListener("resize", setFullWidth);
		return () => {
			window.removeEventListener("resize", setFullWidth);
		};
	}, [setFullWidth]);
	return (
		<MapArea>
			<Spacing size="s" />
			<MapWrapper ref={mapWrapper}>
				<Controls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
				<Map
					provider={mapTilerProvider}
					center={[lat, lon]}
					zoom={zoom}
					width={width}
					height={viewport.lu ? 600 : viewport.mu ? 400 : 200}>
					<Marker anchor={[lat, lon]} payload={1} />
				</Map>
			</MapWrapper>
			<Spacing size="s" />
		</MapArea>
	);
};

const Impressum = props => {
	const siteTitle = get(props, "data.site.siteMetadata.title");
	const location = get(props, "data.contentfulLocation");
	const slots = get(props, "data.contentfulPage.slots");
	return (
		<Layout>
			<Helmet title={siteTitle} />
			<Row>
				<Column raw>
					<h1>Contact</h1>
				</Column>
				{slots.map(({__typename, id, ...props}) => {
					return (
						<Column key={id}>
							<Contentful contentType={__typename} {...props} />
						</Column>
					);
				})}
				<ContactForm />
				<CustomMap
					key={location.id}
					lat={location.location.lat}
					lon={location.location.lon}
				/>
			</Row>
		</Layout>
	);
};

export default Impressum;

export const pageQuery = graphql`
	query ContactQuery {
		site {
			siteMetadata {
				title
			}
		}
		contentfulLocation(title: {eq: "Kellerkind"}) {
			location {
				lat
				lon
			}
			id
			title
		}
		contentfulPage(slug: {eq: "contact"}) {
			id
			title
			slots {
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
