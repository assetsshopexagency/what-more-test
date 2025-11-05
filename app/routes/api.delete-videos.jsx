// // import { json } from "@remix-run/node";
// // import { authenticate } from "../shopify.server.js";
// // import prisma from "../db.server.js";

// // export const action = async ({ request }) => {
// //   try {
// //     const { session } = await authenticate.admin(request);
    
// //     console.log("🗑️ Starting video deletion process for session:", session.id);

// //     const body = await request.json();
// //     const { videoIds } = body;

// //     console.log("📋 Video IDs to delete:", videoIds);

// //     // Validate input
// //     if (!videoIds || !Array.isArray(videoIds) || videoIds.length === 0) {
// //       console.log("❌ No video IDs provided");
// //       return json({ 
// //         success: false, 
// //         error: "Please select videos to delete" 
// //       }, { status: 400 });
// //     }

// //     // Convert videoIds to numbers and validate
// //     const videoIdsNumbers = videoIds.map(id => {
// //       const numId = parseInt(id);
// //       if (isNaN(numId)) {
// //         console.log(`❌ Invalid video ID: ${id}`);
// //       }
// //       return numId;
// //     }).filter(id => !isNaN(id));

// //     if (videoIdsNumbers.length === 0) {
// //       console.log("❌ No valid video IDs found");
// //       return json({ 
// //         success: false, 
// //         error: "Invalid video IDs provided" 
// //       }, { status: 400 });
// //     }

// //     console.log(`🔍 Valid video IDs: ${videoIdsNumbers.join(', ')}`);

// //     // Verify all videos belong to current session before deletion
// //     const videosToDelete = await prisma.mediaFile.findMany({
// //       where: {
// //         id: { in: videoIdsNumbers },
// //         sessionId: session.id
// //       },
// //       select: { 
// //         id: true,
// //         title: true 
// //       }
// //     });

// //     const validVideoIds = videosToDelete.map(v => v.id);
    
// //     console.log(`✅ Found ${validVideoIds.length} videos that belong to current session`);
    
// //     if (validVideoIds.length === 0) {
// //       console.log("❌ No videos found for deletion");
// //       return json({ 
// //         success: false, 
// //         error: "No videos found to delete" 
// //       }, { status: 404 });
// //     }

// //     // Log the videos being deleted
// //     console.log("🎬 Videos to be deleted:", videosToDelete.map(v => `${v.id}: ${v.title}`).join(', '));

// //     // Delete videos (cascade delete should handle videoProducts automatically)
// //     const deleteResult = await prisma.mediaFile.deleteMany({
// //       where: {
// //         id: { in: validVideoIds },
// //         sessionId: session.id
// //       }
// //     });

// //     console.log(`✅ Successfully deleted ${deleteResult.count} videos from database`);
    
// //     return json({ 
// //       success: true, 
// //       message: `Successfully deleted ${deleteResult.count} video(s)`,
// //       deletedCount: deleteResult.count,
// //       deletedVideos: validVideoIds
// //     });

// //   } catch (err) {
// //     console.error("❌ Error deleting videos:", err);
// //     return json({ 
// //       success: false, 
// //       error: "Failed to delete videos. Please try again." 
// //     }, { status: 500 });
// //   }
// // };

// // // Optional: Add a loader if you want to handle GET requests for debugging
// // export const loader = async ({ request }) => {
// //   return json({ 
// //     success: false, 
// //     error: "Method not allowed. Use DELETE request." 
// //   }, { status: 405 });
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

//   // Create shopify and admin here, now that session is available
//   const shopify = shopifyApi({
//     apiKey: process.env.SHOPIFY_API_KEY,
//     apiSecretKey: process.env.SHOPIFY_API_SECRET,
//     hostName: process.env.SHOPIFY_APP_URL.replace('https://', ''),
//     apiVersion: LATEST_API_VERSION,
//     isEmbeddedApp: false,
//   });
//   const admin = new shopify.clients.Graphql({ shop: session.shop, accessToken: session.accessToken });

//   // Rest of your code...
//   console.log("🗑️ Starting video deletion process for session:", session.id);

//   const body = await request.json();
//   const { videoIds } = body;

//   console.log("📋 Video IDs to delete:", videoIds);

//   if (!videoIds || !Array.isArray(videoIds) || videoIds.length === 0) {
//     console.log("❌ No video IDs provided");
//     return json({ 
//       success: false, 
//       error: "Please select videos to delete" 
//     }, { status: 400 });
//   }

//   const videoIdsNumbers = videoIds.map(id => {
//     const numId = parseInt(id);
//     if (isNaN(numId)) {
//       console.log(`❌ Invalid video ID: ${id}`);
//     }
//     return numId;
//   }).filter(id => !isNaN(id));

//   if (videoIdsNumbers.length === 0) {
//     console.log("❌ No valid video IDs found");
//     return json({ 
//       success: false, 
//       error: "Invalid video IDs provided" 
//     }, { status: 400 });
//   }

//   console.log(`🔍 Valid video IDs: ${videoIdsNumbers.join(', ')}`);

//   const videosToDelete = await prisma.mediaFile.findMany({
//     where: {
//       id: { in: videoIdsNumbers },
//       sessionId: session.id
//     },
//     select: { 
//       id: true,
//       title: true 
//     }
//   });

//   const validVideoIds = videosToDelete.map(v => v.id);
  
//   console.log(`✅ Found ${validVideoIds.length} videos that belong to current session`);
  
//   if (validVideoIds.length === 0) {
//     console.log("❌ No videos found for deletion");
//     return json({ 
//       success: false, 
//       error: "No videos found to delete" 
//     }, { status: 404 });
//   }

//   console.log("🎬 Videos to be deleted:", videosToDelete.map(v => `${v.id}: ${v.title}`).join(', '));

//   const deleteResult = await prisma.mediaFile.deleteMany({
//     where: {
//       id: { in: validVideoIds },
//       sessionId: session.id
//     }
//   });

//   console.log(`✅ Successfully deleted ${deleteResult.count} videos from database`);
  
//   return json({ 
//     success: true, 
//     message: `Successfully deleted ${deleteResult.count} video(s)`,
//     deletedCount: deleteResult.count,
//     deletedVideos: validVideoIds
//   });
// };

// export const loader = async ({ request }) => {
//   return json({ 
//     success: false, 
//     error: "Method not allowed. Use DELETE request." 
//   }, { status: 405 });
// };




// app/routes/api/delete-videos.jsx
import { json } from "@remix-run/node";
import { getShopifyContext } from "../shopify.server";
import { prisma } from "../db.server";

const MUTATION = `
  mutation fileDelete($fileIds: [ID!]!) {
    fileDelete(fileIds: $fileIds) {
      deletedFileIds
    }
  }
`;

export const action = async ({ request }) => {
  let admin, session;
  try {
    ({ admin, session } = await getShopifyContext(request));
  } catch (err) {
    return json({ success: false, error: err.message }, { status: 401 });
  }

  const { videoIds } = await request.json();
  if (!Array.isArray(videoIds) || videoIds.length === 0) {
    return json({ success: false, error: "No videos selected" }, { status: 400 });
  }

  const medias = await prisma.mediaFile.findMany({
    where: { id: { in: videoIds }, sessionId: session.id },
    select: { id: true, shopify_file_id: true },
  });

  const shopifyIds = medias
    .filter(m => m.shopify_file_id)
    .map(m => `gid://shopify/Video/${m.shopify_file_id}`);

  if (shopifyIds.length > 0) {
    await admin.graphql(MUTATION, { variables: { fileIds: shopifyIds } });
  }

  await prisma.mediaFile.deleteMany({
    where: { id: { in: medias.map(m => m.id) } },
  });

  return json({ success: true, deletedCount: medias.length });
};