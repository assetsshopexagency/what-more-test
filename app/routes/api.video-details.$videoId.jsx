// // app/routes/api.video-details.$videoId.jsx
// import { getShopifyContext } from "../shopify.server.js";

// export async function loader({ request, params }) {
//   try {
//     const { session, error } = await getShopifyContext();
    
//     if (error || !session?.shop || !session?.accessToken) {
//       return new Response(
//         JSON.stringify({ 
//           success: false, 
//           error: "Shopify not configured" 
//         }),
//         { 
//           status: 401, 
//           headers: { 'Content-Type': 'application/json' } 
//         }
//       );
//     }

//     const videoId = parseInt(params.videoId);
//     const prisma = (await import('../db.server.js')).default;

//     // Get video details from database
//     const video = await prisma.mediaFile.findFirst({
//       where: { 
//         id: videoId,
//         sessionId: session.id 
//       },
//       select: {
//         id: true,
//         title: true,
//         shopify_file_url: true,
//         shopify_file_id: true,
//         thumbnail_url: true,
//         duration: true,
//         description: true
//       }
//     });

//     if (!video) {
//       return new Response(
//         JSON.stringify({ 
//           success: false, 
//           error: "Video not found" 
//         }),
//         { 
//           status: 404, 
//           headers: { 'Content-Type': 'application/json' } 
//         }
//       );
//     }

//     // Create proxy URL for the video
//     const proxyUrl = `/api/video-proxy/${video.shopify_file_id}`;

//     return new Response(
//       JSON.stringify({
//         success: true,
//         video: {
//           ...video,
//           proxy_url: proxyUrl, // Use proxy URL instead of direct URL
//           direct_url: video.shopify_file_url // Keep original for reference
//         }
//       }),
//       { 
//         status: 200, 
//         headers: { 'Content-Type': 'application/json' } 
//       }
//     );

//   } catch (error) {
//     console.error("Error fetching video details:", error);
//     return new Response(
//       JSON.stringify({ 
//         success: false, 
//         error: error.message 
//       }),
//       { 
//         status: 500, 
//         headers: { 'Content-Type': 'application/json' } 
//       }
//     );
//   }
// }