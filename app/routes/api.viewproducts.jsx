// // // // //api.viewproducts.jsx
// // // // import { json } from "@remix-run/node";
// // // // import { authenticate } from "../shopify.server.js";

// // // // // Shopify Product Query (GraphQL)
// // // // const PRODUCTS_QUERY = `
// // // //   {
// // // //     products(first: 250) {
// // // //       edges {
// // // //         node {
// // // //           id
// // // //           title
// // // //           images(first: 1) { edges { node { originalSrc } } }
// // // //         }
// // // //       }
// // // //     }
// // // //   }
// // // // `;

// // // // export const loader = async ({ request }) => {
// // // //   const { admin } = await authenticate.admin(request);
// // // //   const resp = await admin.graphql(PRODUCTS_QUERY);
// // // //   const data = await resp.json();

// // // //   const products = data.data.products.edges.map(p => ({
// // // //     id: p.node.id,
// // // //     title: p.node.title,
// // // //     image_url: p.node.images.edges[0]?.node.originalSrc || null
// // // //   }));

// // // //   return json({ success: true, products });
// // // // };


// // // //api.viewproducts.jsx
// // // import { json } from "@remix-run/node";
// // // import { authenticate } from "../shopify.server.js";

// // // // Updated Shopify Product Query to include prices
// // // const PRODUCTS_QUERY = `
// // //   {
// // //     products(first: 250) {
// // //       edges {
// // //         node {
// // //           id
// // //           title
// // //           description
// // //           variants(first: 10) {
// // //             edges {
// // //               node {
// // //                 id
// // //                 price
// // //                 compareAtPrice
// // //                 sku
// // //               }
// // //             }
// // //           }
// // //           images(first: 1) {
// // //             edges {
// // //               node {
// // //                 originalSrc
// // //               }
// // //             }
// // //           }
// // //         }
// // //       }
// // //     }
// // //   }
// // // `;

// // // export const loader = async ({ request }) => {
// // //   const { admin } = await authenticate.admin(request);
// // //   const resp = await admin.graphql(PRODUCTS_QUERY);
// // //   const data = await resp.json();

// // //   const products = data.data.products.edges.map(p => {
// // //     const variant = p.node.variants.edges[0]?.node;
    
// // //     return {
// // //       id: p.node.id,
// // //       title: p.node.title,
// // //       image_url: p.node.images.edges[0]?.node.originalSrc || null,
// // //       // Current price
// // //       price: variant?.price || "0.00",
// // //       // Original price (compareAtPrice)
// // //       originalPrice: variant?.compareAtPrice || null,
// // //       currency_code: "USD", // You can make this dynamic if needed
// // //       shopify_variant_id: variant?.id || null
// // //     };
// // //   });

// // //   return json({ success: true, products });
// // // };






// // // app/routes/api.viewproducts.jsx

// // import { json } from "@remix-run/node";
// // import { authenticate } from "../shopify.server.js";

// // // Updated Shopify Product Query to include prices
// // const PRODUCTS_QUERY = `
// //   {
// //     products(first: 250) {
// //       edges {
// //         node {
// //           id
// //           title
// //           description
// //           variants(first: 10) {
// //             edges {
// //               node {
// //                 id
// //                 price
// //                 compareAtPrice
// //                 sku
// //               }
// //             }
// //           }
// //           images(first: 1) {
// //             edges {
// //               node {
// //                 originalSrc
// //               }
// //             }
// //           }
// //         }
// //       }
// //     }
// //   }
// // `;

// // export const loader = async ({ request }) => {
// //   const { admin } = await authenticate.admin(request);
// //   const resp = await admin.graphql(PRODUCTS_QUERY);
// //   const data = await resp.json();

// //   const products = data.data.products.edges.map(p => {
// //     const variant = p.node.variants.edges[0]?.node;
    
// //     return {
// //       id: p.node.id,
// //       title: p.node.title,
// //       image_url: p.node.images.edges[0]?.node.originalSrc || null,
// //       // Current price
// //       price: variant?.price || "0.00",
// //       // Original price (compareAtPrice)
// //       originalPrice: variant?.compareAtPrice || null,
// //       currency_code: "USD", // You can make this dynamic if needed
// //       shopify_variant_id: variant?.id || null
// //     };
// //   });

// //   return json({ success: true, products });
// // };






// // api.viewproducts.jsx
// import { json } from "@remix-run/node";
// import { getAuth } from "@clerk/remix/ssr.server";
// import prisma from "../db.server.js";
// import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';

// const PRODUCTS_QUERY = `
//   {
//     products(first: 250) {
//       edges {
//         node {
//           id
//           title
//           description
//           variants(first: 10) {
//             edges {
//               node {
//                 id
//                 price
//                 compareAtPrice
//                 sku
//               }
//             }
//           }
//           images(first: 1) {
//             edges {
//               node {
//                 originalSrc
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `;

// export const loader = async ({ request }) => {
//   const { userId } = await getAuth(request);
//   if (!userId) {
//     return json({ success: false, error: "Unauthorized" }, { status: 401 });
//   }

//   const session = await prisma.session.findFirst({ where: { clerkUserId: userId } });
//   if (!session) {
//     return json({ success: false, error: "Session not found" }, { status: 404 });
//   }

//   // Create shopify and admin here
//   const shopify = shopifyApi({
//     apiKey: process.env.SHOPIFY_API_KEY,
//     apiSecretKey: process.env.SHOPIFY_API_SECRET,
//     hostName: process.env.SHOPIFY_APP_URL.replace('https://', ''),
//     apiVersion: LATEST_API_VERSION,
//     isEmbeddedApp: false,
//   });
//   const admin = new shopify.clients.Graphql({ shop: session.shop, accessToken: session.accessToken });

//   try {
//     const resp = await admin.graphql(PRODUCTS_QUERY);
//     const data = await resp.json();

//     const products = data.data.products.edges.map(p => {
//       const variant = p.node.variants.edges[0]?.node;
      
//       return {
//         id: p.node.id,
//         title: p.node.title,
//         image_url: p.node.images.edges[0]?.node.originalSrc || null,
//         price: variant?.price || "0.00",
//         originalPrice: variant?.compareAtPrice || null,
//         currency_code: "USD",
//         shopify_variant_id: variant?.id || null
//       };
//     });

//     return json({ success: true, products });
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     return json({ success: false, error: error.message }, { status: 500 });
//   }
// };