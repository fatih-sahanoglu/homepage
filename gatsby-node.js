const Promise = require("bluebird");
const path = require("path");

exports.createPages = ({graphql, actions}) => {
	const {createPage} = actions;

	return new Promise((resolve, reject) => {
		const blogPost = path.resolve("./src/templates/blog-post.tsx");
		const servicesPost = path.resolve("./src/templates/services.tsx");
		const galleryPost = path.resolve("./src/templates/gallery.tsx");
		const productPost = path.resolve("./src/templates/product.tsx");
		const seminarPost = path.resolve("./src/templates/seminar.tsx");
		resolve(
			graphql(
				`
					{
						allContentfulBlogPost {
							edges {
								node {
									title
									slug
								}
							}
						}
						allContentfulServices {
							edges {
								node {
									title
									slug
								}
							}
						}
						allContentfulGallery {
							edges {
								node {
									title
									slug
								}
							}
						}
						allContentfulProduct {
							edges {
								node {
									title
									slug
								}
							}
						}
						allContentfulSeminar {
							edges {
								node {
									title
									slug
								}
							}
						}
					}
				`
			).then(result => {
				if (result.errors) {
					console.log(result.errors);
					reject(result.errors);
				}

				const posts = result.data.allContentfulBlogPost.edges;
				posts.forEach(post => {
					createPage({
						path: `/blog/${post.node.slug}/`,
						component: blogPost,
						context: {
							slug: post.node.slug
						}
					});
				});
				const services = result.data.allContentfulServices.edges;
				services.forEach(post => {
					createPage({
						path: `/services/${post.node.slug}/`,
						component: servicesPost,
						context: {
							slug: post.node.slug
						}
					});
				});
				const seminars = result.data.allContentfulSeminar.edges;
				seminars.forEach(post => {
					createPage({
						path: `/seminars/${post.node.slug}/`,
						component: seminarPost,
						context: {
							slug: post.node.slug
						}
					});
				});
				const galleries = result.data.allContentfulGallery.edges;
				galleries.forEach(post => {
					createPage({
						path: `/gallery/${post.node.slug}/`,
						component: galleryPost,
						context: {
							slug: post.node.slug
						}
					});
				});
				const products = result.data.allContentfulProduct.edges;
				products.forEach(post => {
					createPage({
						path: `/products/${post.node.slug}/`,
						component: productPost,
						context: {
							slug: post.node.slug
						}
					});
				});
			})
		);
	});
};
