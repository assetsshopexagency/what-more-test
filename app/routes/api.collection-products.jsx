// // // app/routes/api.collection-products.js
// // import { json } from "@remix-run/node";
// // import { authenticate } from "../shopify.server";

// // export const loader = async ({ request }) => {
// //   const { admin } = await authenticate.admin(request);
// //   const url = new URL(request.url);
// //   const collectionId = url.searchParams.get("collectionId");

// //   if (!collectionId) {
// //     return json({ success: false, error: "Missing collectionId" }, { status: 400 });
// //   }

// //   try {
// //     const response = await admin.graphql(`
// //       query {
// //         collection(id: "${collectionId}") {
// //           products(first: 50) {
// //             edges {
// //               node {
// //                 id
// //                 title
// //                 featuredImage {
// //                   url
// //                 }
// //                 priceRange {
// //                   minVariantPrice {
// //                     amount
// //                     currencyCode
// //                   }
// //                 }
// //               }
// //             }
// //           }
// //         }
// //       }
// //     `);

// //     const data = await response.json();
// //     if (data.errors || !data.data.collection) {
// //       throw new Error(data.errors ? data.errors[0].message : "Collection not found");
// //     }

// //     const products = data.data.collection.products.edges.map(e => ({
// //       id: e.node.id,
// //       title: e.node.title,
// //       image_url: e.node.featuredImage?.url || null,
// //       price: e.node.priceRange.minVariantPrice.amount,
// //       currency_code: e.node.priceRange.minVariantPrice.currencyCode
// //     }));

// //     return json({ success: true, products });
// //   } catch (error) {
// //     console.error("Error fetching collection products:", error);
// //     return json({ success: false, error: error.message }, { status: 500 });
// //   }
// // };



// import { json } from "@remix-run/node";
// import { getAuth } from "@clerk/remix/ssr.server";
// import prisma from "../db.server.js";
// import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';

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

//   const url = new URL(request.url);
//   const collectionId = url.searchParams.get("collectionId");

//   if (!collectionId) {
//     return json({ success: false, error: "Missing collectionId" }, { status: 400 });
//   }

//   try {
//     const response = await admin.graphql(`
//       query {
//         collection(id: "${collectionId}") {
//           products(first: 50) {
//             edges {
//               node {
//                 id
//                 title
//                 featuredImage {
//                   url
//                 }
//                 priceRange {
//                   minVariantPrice {
//                     amount
//                     currencyCode
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     `);

//     const data = await response.json();
//     if (data.errors || !data.data.collection) {
//       throw new Error(data.errors ? data.errors[0].message : "Collection not found");
//     }

//     const products = data.data.collection.products.edges.map(e => ({
//       id: e.node.id,
//       title: e.node.title,
//       image_url: e.node.featuredImage?.url || null,
//       price: e.node.priceRange.minVariantPrice.amount,
//       currency_code: e.node.priceRange.minVariantPrice.currencyCode
//     }));

//     return json({ success: true, products });
//   } catch (error) {
//     console.error("Error fetching collection products:", error);
//     return json({ success: false, error: error.message }, { status: 500 });
//   }
// };