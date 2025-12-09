// // import { json } from "@remix-run/node";
// // import prisma from "../db.server";

// // export async function loader({ request }) {
// //   try {
// //     const url = new URL(request.url);

// //     // Get shop from headers (proxy) OR query parameter (direct call)
// //     let shop = request.headers.get("X-Shopify-Shop-Domain");

// //     // If no header, check query parameter (for direct API calls)
// //     if (!shop) {
// //       shop = url.searchParams.get("shop");
// //     }

// //     console.log("🎬 API /videos called");
// //     console.log("🛍️ Shop from:", shop ? "header" : "query param");
// //     console.log("🔍 Shop value:", shop);

// //     // Allow fallback for development/testing
// //     if (!shop && process.env.NODE_ENV === "development") {
// //       shop = "devstore-dd.myshopify.com";
// //       console.log("🔧 Using development fallback shop:", shop);
// //     }

// //     if (!shop) {
// //       return json(
// //         {
// //           success: false,
// //           error: "Shop domain required",
// //           note: "Include shop parameter or use via Shopify App Proxy",
// //           example: "?shop=your-store.myshopify.com",
// //         },
// //         {
// //           status: 400,
// //           headers: { "Content-Type": "application/json" },
// //         },
// //       );
// //     }

// //     // Normalize shop domain
// //     const shopDomain = shop.toLowerCase().trim();

// //     // Fetch videos from database
// //     const videos = await prisma.mediaFile.findMany({
// //       where: {
// //         session: {
// //           shop: shopDomain,
// //         },
// //       },
// //       select: {
// //         id: true,
// //         title: true,
// //         description: true,
// //         shopify_file_url: true,
// //         thumbnail_url: true,
// //         duration: true,
// //         created_at: true,
// //       },
// //       orderBy: { created_at: "desc" },
// //     });

// //     console.log(`✅ Found ${videos.length} videos for ${shopDomain}`);

// //     const formattedVideos = videos.map((video) => ({
// //       id: video.id,
// //       title: video.title || "Untitled Video",
// //       description: video.description || "",
// //       video_url: video.shopify_file_url || "",
// //       thumbnail_url:
// //         video.thumbnail_url ||
// //         "https://placehold.co/400x225/2563eb/ffffff?text=Video",
// //       duration: video.duration || "0:00",
// //       created_at: video.created_at.toISOString(),
// //     }));

// //     return json(
// //       {
// //         success: true,
// //         videos: formattedVideos,
// //         total: formattedVideos.length,
// //         shop: shopDomain,
// //         fetched_via: request.headers.get("X-Shopify-Shop-Domain")
// //           ? "proxy"
// //           : "direct",
// //         timestamp: new Date().toISOString(),
// //       },
// //       {
// //         headers: {
// //           "Content-Type": "application/json",
// //           "Access-Control-Allow-Origin": "*",
// //           "Cache-Control": "public, max-age=60",
// //         },
// //       },
// //     );
// //   } catch (error) {
// //     console.error("❌ Error:", error);
// //     return json(
// //       {
// //         success: false,
// //         error: "Failed to load videos",
// //         debug:
// //           process.env.NODE_ENV === "development" ? error.message : undefined,
// //       },
// //       {
// //         status: 500,
// //         headers: { "Content-Type": "application/json" },
// //       },
// //     );
// //   }
// // }

// // // Handle CORS preflight
// // export async function action({ request }) {
// //   if (request.method === "OPTIONS") {
// //     return new Response(null, {
// //       status: 204,
// //       headers: {
// //         "Access-Control-Allow-Origin": "*",
// //         "Access-Control-Allow-Methods": "GET, OPTIONS",
// //         "Access-Control-Allow-Headers": "Content-Type",
// //       },
// //     });
// //   }

// //   return json({ error: "Method not allowed" }, { status: 405 });
// // }

// import { json } from "@remix-run/node";
// import prisma from "../db.server";

// export async function loader({ request }) {
//   try {
//     const url = new URL(request.url);

//     // Get shop from headers (proxy) OR query parameter (direct call)
//     let shop = request.headers.get("X-Shopify-Shop-Domain");

//     // If no header, check query parameter (for direct API calls)
//     if (!shop) {
//       shop = url.searchParams.get("shop");
//     }

//     console.log("🎬 API /videos called");
//     console.log("🛍️ Shop:", shop);

//     // Allow fallback for development
//     if (!shop && process.env.NODE_ENV === "development") {
//       shop = "devstore-dd.myshopify.com";
//       console.log("🔧 Using development fallback shop:", shop);
//     }

//     if (!shop) {
//       return json(
//         {
//           success: false,
//           error: "Shop domain required",
//           note: "Include shop parameter: ?shop=your-store.myshopify.com",
//         },
//         {
//           status: 400,
//           headers: {
//             "Content-Type": "application/json",
//             "Access-Control-Allow-Origin": "*",
//           },
//         },
//       );
//     }

//     // Normalize shop domain
//     const shopDomain = shop.toLowerCase().trim();

//     // Fetch videos from database
//     const videos = await prisma.mediaFile.findMany({
//       where: {
//         session: {
//           shop: shopDomain,
//         },
//       },
//       select: {
//         id: true,
//         title: true,
//         description: true,
//         shopify_file_url: true,
//         thumbnail_url: true,
//         duration: true,
//         created_at: true,
//       },
//       orderBy: { created_at: "desc" },
//       take: 20, // Limit to 20 videos
//     });

//     console.log(`✅ Found ${videos.length} videos for ${shopDomain}`);

//     // Format videos for frontend
//     const formattedVideos = videos.map((video) => {
//       // Ensure video URL exists
//       const videoUrl = video.shopify_file_url || "";

//       // Generate better thumbnail if none exists
//       let thumbnailUrl = video.thumbnail_url;
//       if (!thumbnailUrl && videoUrl) {
//         // Try to generate thumbnail from Shopify URL
//         thumbnailUrl =
//           "https://placehold.co/400x700/1e40af/ffffff?text=" +
//           encodeURIComponent(video.title?.substring(0, 20) || "Video");
//       } else if (!thumbnailUrl) {
//         thumbnailUrl = "https://placehold.co/400x700/1e40af/ffffff?text=Video";
//       }

//       return {
//         id: video.id,
//         title: video.title || "Untitled Video",
//         description: video.description || "",
//         video_url: videoUrl, // Frontend will use this
//         shopify_file_url: videoUrl, // Backup field
//         thumbnail_url: thumbnailUrl,
//         duration: video.duration || "0:00",
//         created_at: video.created_at.toISOString(),
//       };
//     });

//     return json(
//       {
//         success: true,
//         videos: formattedVideos,
//         total: formattedVideos.length,
//         shop: shopDomain,
//         timestamp: new Date().toISOString(),
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           "Access-Control-Allow-Origin": "*",
//           "Cache-Control": "public, max-age=60",
//         },
//       },
//     );
//   } catch (error) {
//     console.error("❌ API Error:", error);
//     return json(
//       {
//         success: false,
//         error: "Failed to load videos",
//         message:
//           process.env.NODE_ENV === "development" ? error.message : undefined,
//       },
//       {
//         status: 500,
//         headers: {
//           "Content-Type": "application/json",
//           "Access-Control-Allow-Origin": "*",
//         },
//       },
//     );
//   }
// }

// // Handle CORS preflight requests
// export async function action({ request }) {
//   if (request.method === "OPTIONS") {
//     return new Response(null, {
//       status: 204,
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Methods": "GET, OPTIONS",
//         "Access-Control-Allow-Headers": "Content-Type",
//       },
//     });
//   }

//   return json({ error: "Method not allowed" }, { status: 405 });
// }

// app/routes/api.public.videos.jsx
// import { json } from "@remix-run/node";
// import prisma from "../db.server";

// // Storefront Access Token from your app
// const STOREFRONT_TOKEN = process.env.STOREFRONT_ACCESS_TOKEN;

// export async function loader({ request }) {
//   try {
//     const url = new URL(request.url);
//     const shop = url.searchParams.get("shop");

//     console.log("🎬 Public API for shop:", shop);

//     if (!shop) {
//       return json({ success: false, error: "Shop required" }, { status: 400 });
//     }

//     const shopDomain = shop.toLowerCase().trim();

//     // Get videos from your database
//     const videos = await prisma.mediaFile.findMany({
//       where: { session: { shop: shopDomain } },
//       select: {
//         id: true,
//         title: true,
//         description: true,
//         shopify_gid: true, // This is crucial!
//         thumbnail_url: true,
//         duration: true,
//         created_at: true,
//       },
//       orderBy: { created_at: "desc" },
//       take: 20,
//     });

//     // Get video data from Shopify Storefront API
//     const shopifyVideos = await Promise.all(
//       videos.map(async (video) => {
//         if (!video.shopify_gid) {
//           return {
//             ...video,
//             sources: [],
//             previewImage: null,
//           };
//         }

//         try {
//           // Query Shopify Storefront API for video data
//           const response = await fetch(
//             `https://${shopDomain}/api/2024-01/graphql.json`,
//             {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//                 "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
//               },
//               body: JSON.stringify({
//                 query: `
//                   query GetVideo($id: ID!) {
//                     node(id: $id) {
//                       ... on Video {
//                         sources {
//                           url
//                           mimeType
//                           format
//                           height
//                           width
//                         }
//                         previewImage {
//                           url(transform: { maxWidth: 800, maxHeight: 800 })
//                         }
//                         alt
//                       }
//                     }
//                   }
//                 `,
//                 variables: { id: video.shopify_gid },
//               }),
//             },
//           );

//           const data = await response.json();

//           if (data.errors) {
//             console.error("GraphQL errors:", data.errors);
//             return {
//               ...video,
//               sources: [],
//               previewImage: null,
//             };
//           }

//           const videoNode = data.data?.node;

//           return {
//             id: video.id,
//             title: video.title || videoNode?.alt || "Video",
//             description: video.description || "",
//             shopify_gid: video.shopify_gid,
//             sources: videoNode?.sources || [],
//             previewImage: videoNode?.previewImage || null,
//             thumbnail_url:
//               video.thumbnail_url ||
//               videoNode?.previewImage?.url ||
//               "https://placehold.co/400x300/1e40af/ffffff?text=Video",
//             duration: video.duration || "0:00",
//             created_at: video.created_at.toISOString(),
//           };
//         } catch (error) {
//           console.error("Error fetching from Storefront API:", error);
//           return {
//             ...video,
//             sources: [],
//             previewImage: null,
//           };
//         }
//       }),
//     );

//     return json(
//       {
//         success: true,
//         videos: shopifyVideos,
//         total: shopifyVideos.length,
//         shop: shopDomain,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           "Access-Control-Allow-Origin": "*",
//           "Cache-Control": "public, max-age=60",
//         },
//       },
//     );
//   } catch (error) {
//     console.error("❌ API Error:", error);
//     return json(
//       { success: false, error: "Failed to load videos" },
//       { status: 500 },
//     );
//   }
// }

// app/routes/api.videos.jsx
import { json } from "@remix-run/node";
import prisma from "../db.server";

export async function loader({ request }) {
  try {
    const url = new URL(request.url);

    // Get shop from query parameter
    const shop = url.searchParams.get("shop");

    console.log("🎬 Video API called for shop:", shop);

    if (!shop) {
      return json(
        {
          success: false,
          error: "Shop parameter required",
          example: "/api/videos?shop=your-store.myshopify.com",
        },
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        },
      );
    }

    const shopDomain = shop.toLowerCase().trim();

    // Fetch videos from database
    const videos = await prisma.mediaFile.findMany({
      where: {
        session: {
          shop: shopDomain,
        },
      },
      select: {
        id: true,
        title: true,
        description: true,
        shopify_file_url: true,
        thumbnail_url: true,
        duration: true,
        created_at: true,
      },
      orderBy: { created_at: "desc" },
      take: 20,
    });

    console.log(`✅ Found ${videos.length} videos for ${shopDomain}`);

    // Format videos for frontend
    const formattedVideos = videos.map((video) => {
      // Format duration from seconds to MM:SS
      let durationFormatted = "0:00";
      if (video.duration && video.duration > 0) {
        const minutes = Math.floor(video.duration / 60);
        const seconds = video.duration % 60;
        durationFormatted = `${minutes}:${seconds.toString().padStart(2, "0")}`;
      }

      // Ensure thumbnail URL exists
      let thumbnailUrl = video.thumbnail_url;
      if (!thumbnailUrl) {
        thumbnailUrl = "https://placehold.co/400x300/1e40af/ffffff?text=Video";
      }

      return {
        id: video.id,
        title: video.title || "Untitled Video",
        description: video.description || "",
        video_url: video.shopify_file_url || "",
        thumbnail_url: thumbnailUrl,
        duration: durationFormatted,
        created_at: video.created_at.toISOString(),
      };
    });

    return json(
      {
        success: true,
        videos: formattedVideos,
        total: formattedVideos.length,
        shop: shopDomain,
        timestamp: new Date().toISOString(),
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "public, max-age=300",
        },
      },
    );
  } catch (error) {
    console.error("❌ API Error:", error);
    return json(
      {
        success: false,
        error: "Failed to load videos",
      },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  }
}

// Handle CORS preflight
export async function action({ request }) {
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  return json({ error: "Method not allowed" }, { status: 405 });
}
