// // // // app/routes/api.showcollections-onvideos.js
// // // import { json } from "@remix-run/node";
// // // import { authenticate } from "../shopify.server";
// // // import prisma from "../db.server";

// // // export const loader = async ({ request }) => {
// // //   const { session } = await authenticate.admin(request);
// // //   const url = new URL(request.url);
// // //   const videoId = url.searchParams.get("videoId");

// // //   try {
// // //     if (videoId) {
// // //       console.log(`🔄 Loading collections for video ${videoId}`);

// // //       const videoWithCollections = await prisma.mediaFile.findUnique({
// // //         where: { 
// // //           id: parseInt(videoId),
// // //           sessionId: session.id 
// // //         },
// // //         include: {
// // //           videoCollections: {
// // //             include: {
// // //               collection: true
// // //             }
// // //           }
// // //         }
// // //       });

// // //       if (!videoWithCollections) {
// // //         return json({ 
// // //           success: false, 
// // //           error: "Video not found" 
// // //         }, { status: 404 });
// // //       }

// // //       const collections = videoWithCollections.videoCollections.map(vc => vc.collection);

// // //       return json({
// // //         success: true,
// // //         collections,
// // //         video: {
// // //           id: videoWithCollections.id,
// // //           title: videoWithCollections.title,
// // //           collectionsCount: collections.length
// // //         }
// // //       });
// // //     } else {
// // //       // Get all collections grouped by video for the shop
// // //       console.log(`🔄 Loading all collections from all videos for shop ${session.shop}`);

// // //       const allVideoCollections = await prisma.videoCollection.findMany({
// // //         where: {
// // //           mediaFile: {
// // //             sessionId: session.id
// // //           }
// // //         },
// // //         include: {
// // //           collection: true,
// // //           mediaFile: {
// // //             select: {
// // //               id: true,
// // //               title: true
// // //             }
// // //           }
// // //         }
// // //       });

// // //       // Group by video
// // //       const videoMap = {};
// // //       allVideoCollections.forEach(vc => {
// // //         const vid = vc.mediaFile.id;
// // //         if (!videoMap[vid]) {
// // //           videoMap[vid] = {
// // //             video: {
// // //               id: vc.mediaFile.id,
// // //               title: vc.mediaFile.title,
// // //               collectionsCount: 0
// // //             },
// // //             collections: []
// // //           };
// // //         }
// // //         videoMap[vid].collections.push(vc.collection);
// // //         videoMap[vid].video.collectionsCount = videoMap[vid].collections.length;
// // //       });

// // //       return json({
// // //         success: true,
// // //         videoCollections: Object.values(videoMap),
// // //         totalAssociations: allVideoCollections.length
// // //       });
// // //     }

// // //   } catch (error) {
// // //     console.error("❌ Error loading video collections:", error);
// // //     return json({ 
// // //       success: false, 
// // //       error: error.message 
// // //     }, { status: 500 });
// // //   }
// // // };





// // // app/routes/api.showcollections-onvideos.jsx

// // import { json } from "@remix-run/node";
// // import { authenticate } from "../shopify.server";
// // import prisma from "../db.server";

// // export const loader = async ({ request }) => {
// //   const { session } = await authenticate.admin(request);
// //   const url = new URL(request.url);
// //   const videoId = url.searchParams.get("videoId");

// //   try {
// //     if (videoId) {
// //       console.log(`🔄 Loading collections for video ${videoId}`);

// //       const videoWithCollections = await prisma.mediaFile.findUnique({
// //         where: { 
// //           id: parseInt(videoId),
// //           sessionId: session.id 
// //         },
// //         include: {
// //           videoCollections: {
// //             include: {
// //               collection: true
// //             }
// //           }
// //         }
// //       });

// //       if (!videoWithCollections) {
// //         return json({ 
// //           success: false, 
// //           error: "Video not found" 
// //         }, { status: 404 });
// //       }

// //       const collections = videoWithCollections.videoCollections.map(vc => vc.collection);

// //       return json({
// //         success: true,
// //         collections,
// //         video: {
// //           id: videoWithCollections.id,
// //           title: videoWithCollections.title,
// //           collectionsCount: collections.length
// //         }
// //       });
// //     } else {
// //       // Get all collections grouped by video for the shop
// //       console.log(`🔄 Loading all collections from all videos for shop ${session.shop}`);

// //       const allVideoCollections = await prisma.videoCollection.findMany({
// //         where: {
// //           mediaFile: {
// //             sessionId: session.id
// //           }
// //         },
// //         include: {
// //           collection: true,
// //           mediaFile: {
// //             select: {
// //               id: true,
// //               title: true
// //             }
// //           }
// //         }
// //       });

// //       // Group by video
// //       const videoMap = {};
// //       allVideoCollections.forEach(vc => {
// //         const vid = vc.mediaFile.id;
// //         if (!videoMap[vid]) {
// //           videoMap[vid] = {
// //             video: {
// //               id: vc.mediaFile.id,
// //               title: vc.mediaFile.title,
// //               collectionsCount: 0
// //             },
// //             collections: []
// //           };
// //         }
// //         videoMap[vid].collections.push(vc.collection);
// //         videoMap[vid].video.collectionsCount = videoMap[vid].collections.length;
// //       });

// //       return json({
// //         success: true,
// //         videoCollections: Object.values(videoMap),
// //         totalAssociations: allVideoCollections.length
// //       });
// //     }

// //   } catch (error) {
// //     console.error("❌ Error loading video collections:", error);
// //     return json({ 
// //       success: false, 
// //       error: error.message 
// //     }, { status: 500 });
// //   }
// // };




// // api.showcollections-onvideos.jsx
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

//   // Create shopify and admin here (if needed; not used in this API)
//   const shopify = shopifyApi({
//     apiKey: process.env.SHOPIFY_API_KEY,
//     apiSecretKey: process.env.SHOPIFY_API_SECRET,
//     hostName: process.env.SHOPIFY_APP_URL.replace('https://', ''),
//     apiVersion: LATEST_API_VERSION,
//     isEmbeddedApp: false,
//   });
//   const admin = new shopify.clients.Graphql({ shop: session.shop, accessToken: session.accessToken });

//   const url = new URL(request.url);
//   const videoId = url.searchParams.get("videoId");

//   try {
//     if (videoId) {
//       console.log(`🔄 Loading collections for video ${videoId}`);

//       const videoWithCollections = await prisma.mediaFile.findUnique({
//         where: { 
//           id: parseInt(videoId),
//           sessionId: session.id 
//         },
//         include: {
//           videoCollections: {
//             include: {
//               collection: true
//             }
//           }
//         }
//       });

//       if (!videoWithCollections) {
//         return json({ 
//           success: false, 
//           error: "Video not found" 
//         }, { status: 404 });
//       }

//       const collections = videoWithCollections.videoCollections.map(vc => vc.collection);

//       return json({
//         success: true,
//         collections,
//         video: {
//           id: videoWithCollections.id,
//           title: videoWithCollections.title,
//           collectionsCount: collections.length
//         }
//       });
//     } else {
//       console.log(`🔄 Loading all collections from all videos for shop ${session.shop}`);

//       const allVideoCollections = await prisma.videoCollection.findMany({
//         where: {
//           mediaFile: {
//             sessionId: session.id
//           }
//         },
//         include: {
//           collection: true,
//           mediaFile: {
//             select: {
//               id: true,
//               title: true
//             }
//           }
//         }
//       });

//       const videoMap = {};
//       allVideoCollections.forEach(vc => {
//         const vid = vc.mediaFile.id;
//         if (!videoMap[vid]) {
//           videoMap[vid] = {
//             video: {
//               id: vc.mediaFile.id,
//               title: vc.mediaFile.title,
//               collectionsCount: 0
//             },
//             collections: []
//           };
//         }
//         videoMap[vid].collections.push(vc.collection);
//         videoMap[vid].video.collectionsCount = videoMap[vid].collections.length;
//       });

//       return json({
//         success: true,
//         videoCollections: Object.values(videoMap),
//         totalAssociations: allVideoCollections.length
//       });
//     }
//   } catch (error) {
//     console.error("❌ Error loading video collections:", error);
//     return json({ 
//       success: false, 
//       error: error.message 
//     }, { status: 500 });
//   }
// };