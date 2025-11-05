// // // // app/routes/api.exclude-product.js
// // // import { json } from "@remix-run/node";
// // // import { authenticate } from "../shopify.server";
// // // import prisma from "../db.server";

// // // export const action = async ({ request }) => {
// // //   const { session } = await authenticate.admin(request);
// // //   const { videoId, productId } = await request.json();

// // //   if (!videoId || !productId) {
// // //     return json({ success: false, error: "Missing videoId or productId" }, { status: 400 });
// // //   }

// // //   try {
// // //     const video = await prisma.mediaFile.findUnique({
// // //       where: { id: parseInt(videoId), sessionId: session.id }
// // //     });

// // //     if (!video) {
// // //       return json({ success: false, error: "Video not found" }, { status: 404 });
// // //     }

// // //     await prisma.excludedProduct.upsert({
// // //       where: {
// // //         video_id_product_id: {
// // //           video_id: parseInt(videoId),
// // //           product_id: parseInt(productId)
// // //         }
// // //       },
// // //       create: {
// // //         video_id: parseInt(videoId),
// // //         product_id: parseInt(productId)
// // //       },
// // //       update: {}
// // //     });

// // //     return json({ success: true, message: "Product excluded from video" });
// // //   } catch (error) {
// // //     console.error("Error excluding product:", error);
// // //     return json({ success: false, error: error.message }, { status: 500 });
// // //   }
// // // };







// // // app/routes/api.show-excluded-products.jsx

// // import { json } from "@remix-run/node";
// // import { getAuth } from "@clerk/remix/ssr.getAuth";
// // import prisma from "../db.server";
// // import { Shopify } from '@shopify/shopify-api';

// // export const loader = async ({ request }) => {
// //   const { userId } = await getAuth(request);
// //   if (!userId) {
// //     return json({ success: false, error: "Unauthorized" }, { status: 401 });
// //   }

// //   const session = await prisma.session.findFirst({ where: { clerkUserId: userId } });
// //   if (!session) {
// //     return json({ success: false, error: "Session not found" }, { status: 404 });
// //   }

// //   const url = new URL(request.url);
// //   const videoId = url.searchParams.get("videoId");

// //   try {
// //     if (videoId) {
// //       const video = await prisma.mediaFile.findUnique({
// //         where: { 
// //           id: parseInt(videoId),
// //           sessionId: session.id 
// //         },
// //         include: {
// //           excludedProducts: {
// //             include: {
// //               product: true
// //             }
// //           }
// //         }
// //       });

// //       if (!video) {
// //         return json({ success: false, error: "Video not found" }, { status: 404 });
// //       }

// //       const excluded = video.excludedProducts.map(ep => ep.product);

// //       return json({
// //         success: true,
// //         video: {
// //           id: video.id,
// //           title: video.title,
// //           excludedCount: excluded.length
// //         },
// //         excluded
// //       });
// //     } else {
// //       const allExcluded = await prisma.excludedProduct.findMany({
// //         where: {
// //           mediaFile: {
// //             sessionId: session.id
// //           }
// //         },
// //         include: {
// //           product: true,
// //           mediaFile: {
// //             select: {
// //               id: true,
// //               title: true
// //             }
// //           }
// //         }
// //       });

// //       const videoMap = {};
// //       allExcluded.forEach(ep => {
// //         const vid = ep.mediaFile.id;
// //         if (!videoMap[vid]) {
// //           videoMap[vid] = {
// //             video: {
// //               id: ep.mediaFile.id,
// //               title: ep.mediaFile.title,
// //               excludedCount: 0
// //             },
// //             excluded: []
// //           };
// //         }
// //         videoMap[vid].excluded.push(ep.product);
// //         videoMap[vid].video.excludedCount = videoMap[vid].excluded.length;
// //       });

// //       return json({
// //         success: true,
// //         videoExcludeds: Object.values(videoMap),
// //         totalExclusions: allExcluded.length
// //       });
// //     }
// //   } catch (error) {
// //     console.error("❌ Error loading video excluded products:", error);
// //     return json({ 
// //       success: false, 
// //       error: error.message 
// //     }, { status: 500 });
// //   }
// // };





// import { json } from "@remix-run/node";
// import { getAuth } from "@clerk/remix/ssr.server";
// import prisma from "../db.server.js";
// import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';

// export const action = async ({ request }) => {
//   const { userId } = await getAuth(request);
//   if (!userId) {
//     return json({ success: false, error: "Unauthorized" }, { status: 401 });
//   }

//   const session = await prisma.session.findFirst({ where: { clerkUserId: userId } });
//   if (!session) {
//     return json({ success: false, error: "Session not found" }, { status: 404 });
//   }

//   // Create shopify and admin here (even if not used, for consistency)
//   const shopify = shopifyApi({
//     apiKey: process.env.SHOPIFY_API_KEY,
//     apiSecretKey: process.env.SHOPIFY_API_SECRET,
//     hostName: process.env.SHOPIFY_APP_URL.replace('https://', ''),
//     apiVersion: LATEST_API_VERSION,
//     isEmbeddedApp: false,
//   });
//   const admin = new shopify.clients.Graphql({ shop: session.shop, accessToken: session.accessToken });

//   const { videoId, productId } = await request.json();

//   if (!videoId || !productId) {
//     return json({ success: false, error: "Missing videoId or productId" }, { status: 400 });
//   }

//   try {
//     const video = await prisma.mediaFile.findUnique({
//       where: { id: parseInt(videoId), sessionId: session.id }
//     });

//     if (!video) {
//       return json({ success: false, error: "Video not found" }, { status: 404 });
//     }

//     await prisma.excludedProduct.upsert({
//       where: {
//         video_id_product_id: {
//           video_id: parseInt(videoId),
//           product_id: parseInt(productId)
//         }
//       },
//       create: {
//         video_id: parseInt(videoId),
//         product_id: parseInt(productId)
//       },
//       update: {}
//     });

//     return json({ success: true, message: "Product excluded from video" });
//   } catch (error) {
//     console.error("Error excluding product:", error);
//     return json({ success: false, error: error.message }, { status: 500 });
//   }
// };