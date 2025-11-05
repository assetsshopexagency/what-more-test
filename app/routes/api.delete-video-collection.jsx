// // // app/routes/api.delete-video-collection.js
// // import { json } from "@remix-run/node";
// // import { authenticate } from "../shopify.server";
// // import prisma from "../db.server";

// // export const action = async ({ request }) => {
// //   const { session } = await authenticate.admin(request);
// //   const { videoId, collectionId } = await request.json();

// //   if (!videoId || !collectionId) {
// //     return json({ success: false, error: "Missing videoId or collectionId" }, { status: 400 });
// //   }

// //   try {
// //     const video = await prisma.mediaFile.findUnique({
// //       where: { id: parseInt(videoId), sessionId: session.id }
// //     });

// //     if (!video) {
// //       return json({ success: false, error: "Video not found" }, { status: 404 });
// //     }

// //     await prisma.videoCollection.deleteMany({
// //       where: {
// //         video_id: parseInt(videoId),
// //         collection_id: parseInt(collectionId)
// //       }
// //     });

// //     return json({ success: true, message: "Collection removed from video" });
// //   } catch (error) {
// //     console.error("Error deleting video collection:", error);
// //     return json({ success: false, error: error.message }, { status: 500 });
// //   }
// // };




// // app/routes/api.delete-video-collection.jsx

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

//   // Create shopify and admin here
//   const shopify = shopifyApi({
//     apiKey: process.env.SHOPIFY_API_KEY,
//     apiSecretKey: process.env.SHOPIFY_API_SECRET,
//     hostName: process.env.SHOPIFY_APP_URL.replace('https://', ''),
//     apiVersion: LATEST_API_VERSION,
//     isEmbeddedApp: false,
//   });
//   const admin = new shopify.clients.Graphql({ shop: session.shop, accessToken: session.accessToken });

//   const { videoId, collectionId } = await request.json();

//   if (!videoId || !collectionId) {
//     return json({ success: false, error: "Missing videoId or collectionId" }, { status: 400 });
//   }

//   try {
//     const video = await prisma.mediaFile.findUnique({
//       where: { id: parseInt(videoId), sessionId: session.id }
//     });

//     if (!video) {
//       return json({ success: false, error: "Video not found" }, { status: 404 });
//     }

//     await prisma.videoCollection.deleteMany({
//       where: {
//         video_id: parseInt(videoId),
//         collection_id: parseInt(collectionId)
//       }
//     });

//     return json({ success: true, message: "Collection removed from video" });
//   } catch (error) {
//     console.error("Error deleting video collection:", error);
//     return json({ success: false, error: error.message }, { status: 500 });
//   }
// };