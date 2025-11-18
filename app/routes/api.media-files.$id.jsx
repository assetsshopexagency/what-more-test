// app/routes/api.media-files.$id.jsx
import { getShopifyContext } from "../shopify.server.js";

export async function action({ request, params }) {
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

    const videoId = parseInt(params.id);
    if (isNaN(videoId)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Invalid video ID" 
        }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }

    const prisma = (await import('../db.server.js')).default;

    const method = request.method;

    if (method === 'DELETE') {
      // Delete the video
      await prisma.mediaFile.delete({
        where: { 
          id: videoId,
          sessionId: session.id
        }
      });

      return new Response(
        JSON.stringify({
          success: true,
          message: "Video deleted successfully"
        }),
        { 
          status: 200, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    } else if (method === 'PUT') {
      // Update video title
      const body = await request.json();
      const { title } = body;

      if (!title || title.trim() === '') {
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: "Title is required" 
          }),
          { 
            status: 400, 
            headers: { 'Content-Type': 'application/json' } 
          }
        );
      }

      const updatedVideo = await prisma.mediaFile.update({
        where: { 
          id: videoId,
          sessionId: session.id
        },
        data: { 
          title: title.trim(),
          updated_at: new Date()
        }
      });

      return new Response(
        JSON.stringify({
          success: true,
          message: "Video title updated successfully",
          video: updatedVideo
        }),
        { 
          status: 200, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    } else {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Method not allowed" 
        }),
        { 
          status: 405, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }

  } catch (error) {
    console.error("Error in media-files API:", error);
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