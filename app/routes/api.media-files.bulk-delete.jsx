// app/routes/api.media-files.bulk-delete.jsx
import { getShopifyContext } from "../shopify.server.js";

export async function action({ request }) {
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

    const body = await request.json();
    const { videoIds } = body;

    if (!Array.isArray(videoIds) || videoIds.length === 0) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "No video IDs provided" 
        }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }

    const prisma = (await import('../db.server.js')).default;

    // Delete multiple videos
    await prisma.mediaFile.deleteMany({
      where: { 
        id: { in: videoIds },
        sessionId: session.id // Ensure user can only delete their own videos
      }
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: `${videoIds.length} videos deleted successfully`
      }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error("Error bulk deleting videos:", error);
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