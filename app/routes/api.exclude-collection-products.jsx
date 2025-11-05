

// // import { json } from "@remix-run/node";
// // import { authenticate } from "../shopify.server";
// // import prisma from "../db.server";

// // export const action = async ({ request }) => {
// //   const { session } = await authenticate.admin(request);
// //   const { videoId, productId, collectionId } = await request.json();

// //   try {
// //     // Verify the video and collection exist
// //     const videoCollection = await prisma.videoCollection.findFirst({
// //       where: {
// //         video_id: parseInt(videoId),
// //         collection_id: parseInt(collectionId),
// //         mediaFile: { sessionId: session.id },
// //       },
// //     });

// //     if (!videoCollection) {
// //       return json(
// //         { success: false, error: "Video or collection not found" },
// //         { status: 404 }
// //       );
// //     }

// //     // Add product to excluded list (assuming excludedMap is managed via a separate table or logic)
// //     // For simplicity, we'll add to excludedMap; adjust if you have a specific table for exclusions
// //     const existingExclusion = await prisma.videoProduct.findFirst({
// //       where: {
// //         video_id: parseInt(videoId),
// //         product_id: parseInt(productId),
// //       },
// //     });

// //     if (existingExclusion) {
// //       await prisma.videoProduct.delete({
// //         where: {
// //           id: existingExclusion.id,
// //         },
// //       });
// //     }

// //     return json({ success: true });
// //   } catch (error) {
// //     console.error("❌ Error excluding product from collection:", error);
// //     return json({ success: false, error: error.message }, { status: 500 });
// //   }
// // };









// // app/routes/api.exclude-collection-products.jsx

// import { json } from "@remix-run/node";
// // import { getAuth } from "@clerk/remix/ssr.getAuth";
// import { getAuth } from "@clerk/remix/ssr.server";
// import prisma from "../db.server";
// import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';
// const shopify = shopifyApi({
//   apiKey: process.env.SHOPIFY_API_KEY,
//   apiSecretKey: process.env.SHOPIFY_API_SECRET,
//   hostName: process.env.SHOPIFY_APP_URL.replace('https://', ''),
//   apiVersion: LATEST_API_VERSION,
//   isEmbeddedApp: false,  // Since standalone
// });
// const admin = new shopify.clients.Graphql({ shop: session.shop, accessToken: session.accessToken });
// export const action = async ({ request }) => {
//   const { userId } = await getAuth(request);
//   if (!userId) {
//     return json({ success: false, error: "Unauthorized" }, { status: 401 });
//   }

//   const session = await prisma.session.findFirst({ where: { clerkUserId: userId } });
//   if (!session) {
//     return json({ success: false, error: "Session not found" }, { status: 404 });
//   }

//   try {
//     const { videoId, productId, collectionId } = await request.json();

//     const videoCollection = await prisma.videoCollection.findFirst({
//       where: {
//         video_id: parseInt(videoId),
//         collection_id: parseInt(collectionId),
//         mediaFile: { sessionId: session.id },
//       },
//     });

//     if (!videoCollection) {
//       return json(
//         { success: false, error: "Video or collection not found" },
//         { status: 404 }
//       );
//     }

//     const existingExclusion = await prisma.videoProduct.findFirst({
//       where: {
//         video_id: parseInt(videoId),
//         product_id: parseInt(productId),
//       },
//     });

//     if (existingExclusion) {
//       await prisma.videoProduct.delete({
//         where: {
//           id: existingExclusion.id,
//         },
//       });
//     }

//     return json({ success: true });
//   } catch (error) {
//     console.error("❌ Error excluding product from collection:", error);
//     return json({ success: false, error: error.message }, { status: 500 });
//   }
// };