// app/routes/api.videos.jsx
import { json } from "@remix-run/node";
import prisma from "../db.server";
import { getShopifyContext } from "../shopify.server.js";

export async function loader({ request }) {
  try {
    const url = new URL(request.url);
    const shop = url.searchParams.get("shop");

    console.log("🎬 Video API called for shop:", shop);

    if (!shop) {
      return json(
        {
          success: false,
          error: "Shop parameter required",
        },
        { status: 400 },
      );
    }

    const shopDomain = shop.toLowerCase().trim();

    // Get Shopify context for admin API access
    const { session, error } = await getShopifyContext();

    if (error || !session?.accessToken) {
      console.log("⚠️ No Shopify session, returning basic video data");
      // Return basic data without Shopify URLs if no session
      return await getBasicVideos(shopDomain);
    }

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
        shopify_file_id: true, // This is the Shopify File ID
        shopify_file_url: true,
        thumbnail_url: true,
        duration: true,
        created_at: true,
      },
      orderBy: { created_at: "desc" },
      take: 20,
    });

    console.log(`✅ Found ${videos.length} videos for ${shopDomain}`);

    // Get video URLs from Shopify API
    const videosWithUrls = await Promise.all(
      videos.map(async (video) => {
        try {
          let videoUrl = video.shopify_file_url || "";
          let thumbnailUrl = video.thumbnail_url || "";
          let sources = [];

          // If we have a shopify_file_id, get the actual video URL from Shopify
          if (video.shopify_file_id && session.accessToken) {
            const shopifyData = await getShopifyVideoData(
              shopDomain,
              session.accessToken,
              video.shopify_file_id,
            );

            if (shopifyData) {
              videoUrl = shopifyData.videoUrl || videoUrl;
              thumbnailUrl = shopifyData.thumbnailUrl || thumbnailUrl;
              sources = shopifyData.sources || [];
            }
          }

          // Format duration
          let durationFormatted = "0:00";
          if (video.duration && video.duration > 0) {
            const minutes = Math.floor(video.duration / 60);
            const seconds = video.duration % 60;
            durationFormatted = `${minutes}:${seconds.toString().padStart(2, "0")}`;
          }

          return {
            id: video.id,
            title: video.title || "Untitled Video",
            description: video.description || "",
            video_url: videoUrl,
            thumbnail_url:
              thumbnailUrl ||
              "https://placehold.co/400x300/1e40af/ffffff?text=Video",
            duration: durationFormatted,
            created_at: video.created_at.toISOString(),
            sources: sources,
            shopify_file_id: video.shopify_file_id,
          };
        } catch (error) {
          console.error(`Error processing video ${video.id}:`, error);
          // Return basic data if Shopify API fails
          return {
            id: video.id,
            title: video.title || "Untitled Video",
            description: video.description || "",
            video_url: video.shopify_file_url || "",
            thumbnail_url:
              video.thumbnail_url ||
              "https://placehold.co/400x300/1e40af/ffffff?text=Video",
            duration: "0:00",
            created_at: video.created_at.toISOString(),
            sources: [],
            shopify_file_id: video.shopify_file_id,
          };
        }
      }),
    );

    return json(
      {
        success: true,
        videos: videosWithUrls,
        total: videosWithUrls.length,
        shop: shopDomain,
        has_shopify_access: !!session?.accessToken,
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
      { status: 500 },
    );
  }
}

// Helper function to get Shopify video data
async function getShopifyVideoData(shopDomain, accessToken, fileId) {
  try {
    // Convert to Shopify GID format if needed
    let shopifyGid = fileId;
    if (!fileId.startsWith("gid://")) {
      shopifyGid = `gid://shopify/MediaImage/${fileId}`;
    }

    const query = `
      query getFile($id: ID!) {
        node(id: $id) {
          ... on Video {
            id
            sources {
              url
              mimeType
              format
              height
              width
            }
            previewImage {
              url(transform: { maxWidth: 800, maxHeight: 800 })
            }
            alt
          }
          ... on GenericFile {
            id
            url
            mimeType
          }
          ... on MediaImage {
            id
            image {
              originalSrc
              url(transform: { maxWidth: 800, maxHeight: 800 })
            }
            alt
          }
        }
      }
    `;

    const response = await fetch(
      `https://${shopDomain}/admin/api/2024-01/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": accessToken,
        },
        body: JSON.stringify({
          query,
          variables: { id: shopifyGid },
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.status}`);
    }

    const result = await response.json();

    if (result.errors) {
      console.error("Shopify GraphQL errors:", result.errors);
      return null;
    }

    const node = result.data?.node;
    if (!node) return null;

    let videoUrl = "";
    let thumbnailUrl = "";
    let sources = [];

    if (node.sources && node.sources.length > 0) {
      // This is a Video type
      sources = node.sources;
      // Get the best quality MP4 source
      const mp4Source = node.sources.find(
        (s) => s.format === "mp4" && s.mimeType === "video/mp4",
      );
      videoUrl = mp4Source?.url || node.sources[0]?.url || "";
      thumbnailUrl = node.previewImage?.url || "";
    } else if (node.url) {
      // GenericFile
      videoUrl = node.url;
    } else if (node.image?.originalSrc) {
      // MediaImage
      videoUrl = node.image.originalSrc;
      thumbnailUrl = node.image.url || node.image.originalSrc;
    }

    return {
      videoUrl,
      thumbnailUrl,
      sources,
      alt: node.alt || "",
    };
  } catch (error) {
    console.error("Error fetching Shopify video data:", error);
    return null;
  }
}

// Fallback function when no Shopify session
async function getBasicVideos(shopDomain) {
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

  const formattedVideos = videos.map((video) => {
    let durationFormatted = "0:00";
    if (video.duration && video.duration > 0) {
      const minutes = Math.floor(video.duration / 60);
      const seconds = video.duration % 60;
      durationFormatted = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }

    return {
      id: video.id,
      title: video.title || "Untitled Video",
      description: video.description || "",
      video_url: video.shopify_file_url || "",
      thumbnail_url:
        video.thumbnail_url ||
        "https://placehold.co/400x300/1e40af/ffffff?text=Video",
      duration: durationFormatted,
      created_at: video.created_at.toISOString(),
      sources: [],
      note: "Shopify access required for full video data",
    };
  });

  return json(
    {
      success: true,
      videos: formattedVideos,
      total: formattedVideos.length,
      shop: shopDomain,
      has_shopify_access: false,
      note: "Returning basic video data. Install app for full features.",
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    },
  );
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
