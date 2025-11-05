// // // app/routes/api.delete-video-product.js
// // import { json } from "@remix-run/node";
// // import { authenticate } from "../shopify.server";
// // import prisma from "../db.server";

// // export const action = async ({ request }) => {
// //   const { session } = await authenticate.admin(request);
// //   const { videoId, productId } = await request.json();

// //   if (!videoId || !productId) {
// //     return json({ success: false, error: "Missing videoId or productId" }, { status: 400 });
// //   }

// //   try {
// //     const video = await prisma.mediaFile.findUnique({
// //       where: { id: parseInt(videoId), sessionId: session.id }
// //     });

// //     if (!video) {
// //       return json({ success: false, error: "Video not found" }, { status: 404 });
// //     }

// //     await prisma.videoProduct.deleteMany({
// //       where: {
// //         video_id: parseInt(videoId),
// //         product_id: parseInt(productId)
// //       }
// //     });

// //     return json({ success: true, message: "Product removed from video" });
// //   } catch (error) {
// //     console.error("Error deleting video product:", error);
// //     return json({ success: false, error: error.message }, { status: 500 });
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

//   // Create shopify and admin here
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

//     await prisma.videoProduct.deleteMany({
//       where: {
//         video_id: parseInt(videoId),
//         product_id: parseInt(productId)
//       }
//     });

//     return json({ success: true, message: "Product removed from video" });
//   } catch (error) {
//     console.error("Error deleting video product:", error);
//     return json({ success: false, error: error.message }, { status: 500 });
//   }
// };