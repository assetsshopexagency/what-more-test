// app/routes/api.media-files.jsx
import { getShopifyContext } from "../shopify.server.js";

export async function loader({ request }) {
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

    // Get files from database
    const prisma = (await import('../db.server.js')).default;
    const mediaFiles = await prisma.mediaFile.findMany({
      where: { sessionId: session.id },
      orderBy: { created_at: 'desc' },
      take: 50
    });

    console.log(`📁 Found ${mediaFiles.length} media files in database`);

    // Process files to get authenticated URLs
    const processedFiles = await Promise.all(
      mediaFiles.map(async (file) => {
        try {
          // For videos, use our proxy endpoint
          if (file.shopify_file_id) {
            const proxyUrl = `/api/video-proxy/${encodeURIComponent(file.shopify_file_id)}`;
            return {
              ...file,
              videoUrl: proxyUrl, // Use proxy URL for video playback
              originalUrl: file.shopify_file_url // Keep original for reference
            };
          }
          return file;
        } catch (error) {
          console.error(`Error processing file ${file.id}:`, error);
          return file; // Return original file if processing fails
        }
      })
    );

    return new Response(
      JSON.stringify({
        success: true,
        mediaFiles: processedFiles,
        count: processedFiles.length
      }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error("Error fetching media files:", error);
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

// Handle POST requests if needed
export async function action({ request }) {
  return new Response(
    JSON.stringify({ 
      message: "Use GET to retrieve media files" 
    }),
    { 
      status: 405, 
      headers: { 'Content-Type': 'application/json' } 
    }
  );
}