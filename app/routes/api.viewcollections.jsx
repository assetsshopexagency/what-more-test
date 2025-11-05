// // // // app/routes/api.viewcollections.js
// // // import { json } from "@remix-run/node";
// // // import { authenticate } from "../shopify.server";

// // // export const loader = async ({ request }) => {
// // //   const { admin } = await authenticate.admin(request);

// // //   try {
// // //     const response = await admin.graphql(`
// // //       query {
// // //         collections(first: 250) {
// // //           edges {
// // //             node {
// // //               id
// // //               title
// // //               image {
// // //                 url
// // //               }
// // //             }
// // //           }
// // //         }
// // //       }
// // //     `);

// // //     const data = await response.json();
// // //     if (data.errors) {
// // //       throw new Error(data.errors[0].message);
// // //     }

// // //     const collections = data.data.collections.edges.map(e => ({
// // //       id: e.node.id,
// // //       title: e.node.title,
// // //       image_url: e.node.image?.url || null
// // //     }));

// // //     return json({ success: true, collections });
// // //   } catch (error) {
// // //     console.error("Error fetching collections:", error);
// // //     return json({ success: false, error: error.message }, { status: 500 });
// // //   }
// // // };








// // // app/routes/api.viewcollections.jsx

// // import { json } from "@remix-run/node";
// // import { authenticate } from "../shopify.server";

// // export const loader = async ({ request }) => {
// //   const { admin } = await authenticate.admin(request);

// //   try {
// //     const response = await admin.graphql(`
// //       query {
// //         collections(first: 250) {
// //           edges {
// //             node {
// //               id
// //               title
// //               image {
// //                 url
// //               }
// //             }
// //           }
// //         }
// //       }
// //     `);

// //     const data = await response.json();
// //     if (data.errors) {
// //       throw new Error(data.errors[0].message);
// //     }

// //     const collections = data.data.collections.edges.map(e => ({
// //       id: e.node.id,
// //       title: e.node.title,
// //       image_url: e.node.image?.url || null
// //     }));

// //     return json({ success: true, collections });
// //   } catch (error) {
// //     console.error("Error fetching collections:", error);
// //     return json({ success: false, error: error.message }, { status: 500 });
// //   }
// // };








// // api.viewcollections.jsx
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

//   try {
//     const response = await admin.graphql(`
//       query {
//         collections(first: 250) {
//           edges {
//             node {
//               id
//               title
//               image {
//                 url
//               }
//             }
//           }
//         }
//       }
//     `);

//     const data = await response.json();
//     if (data.errors) {
//       throw new Error(data.errors[0].message);
//     }

//     const collections = data.data.collections.edges.map(e => ({
//       id: e.node.id,
//       title: e.node.title,
//       image_url: e.node.image?.url || null
//     }));

//     return json({ success: true, collections });
//   } catch (error) {
//     console.error("Error fetching collections:", error);
//     return json({ success: false, error: error.message }, { status: 500 });
//   }
// };