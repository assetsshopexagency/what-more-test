// app/routes/api.video-proxy.$fileId.jsx
import { getShopifyContext } from "../shopify.server.js";

export async function loader({ request, params }) {
  try {
    const { session, error } = await getShopifyContext();
    
    if (error || !session?.shop || !session?.accessToken) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Shopify not configured" 
        }),
        { 
          status: 401, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }

    const fileId = params.fileId;
    
    // Get file details from Shopify using GraphQL with 2026-01 API version
    const query = `
      query getFile($id: ID!) {
        node(id: $id) {
          ... on Video {
            id
            sources {
              url
              mimeType
              format
            }
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
            }
          }
        }
      }
    `;

    const response = await fetch(
      `https://${session.shop}/admin/api/2026-01/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': session.accessToken,
        },
        body: JSON.stringify({ 
          query, 
          variables: { id: fileId } 
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.status}`);
    }

    const result = await response.json();

    if (result.errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
    }

    const fileNode = result.data?.node;
    
    if (!fileNode) {
      throw new Error("File not found");
    }

    let videoUrl = '';
    
    // Extract the actual video URL
    if (fileNode.sources?.[0]?.url) {
      videoUrl = fileNode.sources[0].url; // Video
    } else if (fileNode.url) {
      videoUrl = fileNode.url; // GenericFile
    } else if (fileNode.image?.originalSrc) {
      videoUrl = fileNode.image.originalSrc; // MediaImage
    }

    if (!videoUrl) {
      throw new Error("No video URL found");
    }

    // Fetch the video from Shopify with authentication
    const videoResponse = await fetch(videoUrl, {
      headers: {
        'X-Shopify-Access-Token': session.accessToken,
      },
    });

    if (!videoResponse.ok) {
      throw new Error(`Failed to fetch video: ${videoResponse.status}`);
    }

    // Get the video content and headers
    const videoBuffer = await videoResponse.arrayBuffer();
    const contentType = videoResponse.headers.get('content-type') || 'video/mp4';

    return new Response(videoBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Length': videoBuffer.byteLength.toString(),
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
        'Access-Control-Allow-Origin': '*',
      },
    });

  } catch (error) {
    console.error("Video proxy error:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
}