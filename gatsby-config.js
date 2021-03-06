require("dotenv").config({
	path: `.env.${process.env.NODE_ENV}`
});
const path = require("path");

const contentfulConfig = {
	spaceId: process.env.CONTENTFUL_SPACE_ID,
	accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
};

// if you want to use the preview API please define
// CONTENTFUL_HOST in your environment config
// the `host` property should map to `preview.contentful.com`
// https://www.contentful.com/developers/docs/references/content-preview-api/#/reference/spaces/space/get-a-space/console/js
if (process.env.CONTENTFUL_HOST) {
	contentfulConfig.host = process.env.CONTENTFUL_HOST;
}

const {spaceId, accessToken} = contentfulConfig;

if (!spaceId || !accessToken) {
	throw new Error("Contentful spaceId and the access token need to be provided.");
}

module.exports = {
	siteMetadata: {
		title: "Kellerkind"
	},
	pathPrefix: "/homepage",
	plugins: [
		{
			resolve: `gatsby-plugin-typescript`,
			options: {
				isTSX: true, // defaults to false
				allExtensions: true // defaults to false
			}
		},
		{
			resolve: `gatsby-plugin-styled-components`,
			options: {
				displayName: true
			}
		},
		{
			resolve: `gatsby-plugin-intl`,
			options: {
				// language JSON resource path
				path: `${__dirname}/src/intl`,
				// supported language
				languages: ["en-US", "de-DE"],
				// language file path
				defaultLanguage: "en-US",
				// option to redirect to "en-US" when connecting "/"
				redirect: true
			}
		},
		"gatsby-transformer-remark",
		"gatsby-transformer-sharp",
		"gatsby-plugin-react-helmet",
		"gatsby-plugin-sharp",
		{
			resolve: "gatsby-source-contentful",
			options: contentfulConfig
		}
	]
};
