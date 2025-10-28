import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server.js";
import prisma from "../db.server.js";

export const action = async ({ request }) => {
  try {
    const { session } = await authenticate.admin(request);
    
    console.log("🗑️ Starting video deletion process for session:", session.id);

    const body = await request.json();
    const { videoIds } = body;

    console.log("📋 Video IDs to delete:", videoIds);

    // Validate input
    if (!videoIds || !Array.isArray(videoIds) || videoIds.length === 0) {
      console.log("❌ No video IDs provided");
      return json({ 
        success: false, 
        error: "Please select videos to delete" 
      }, { status: 400 });
    }

    // Convert videoIds to numbers and validate
    const videoIdsNumbers = videoIds.map(id => {
      const numId = parseInt(id);
      if (isNaN(numId)) {
        console.log(`❌ Invalid video ID: ${id}`);
      }
      return numId;
    }).filter(id => !isNaN(id));

    if (videoIdsNumbers.length === 0) {
      console.log("❌ No valid video IDs found");
      return json({ 
        success: false, 
        error: "Invalid video IDs provided" 
      }, { status: 400 });
    }

    console.log(`🔍 Valid video IDs: ${videoIdsNumbers.join(', ')}`);

    // Verify all videos belong to current session before deletion
    const videosToDelete = await prisma.mediaFile.findMany({
      where: {
        id: { in: videoIdsNumbers },
        sessionId: session.id
      },
      select: { 
        id: true,
        title: true 
      }
    });

    const validVideoIds = videosToDelete.map(v => v.id);
    
    console.log(`✅ Found ${validVideoIds.length} videos that belong to current session`);
    
    if (validVideoIds.length === 0) {
      console.log("❌ No videos found for deletion");
      return json({ 
        success: false, 
        error: "No videos found to delete" 
      }, { status: 404 });
    }

    // Log the videos being deleted
    console.log("🎬 Videos to be deleted:", videosToDelete.map(v => `${v.id}: ${v.title}`).join(', '));

    // Delete videos (cascade delete should handle videoProducts automatically)
    const deleteResult = await prisma.mediaFile.deleteMany({
      where: {
        id: { in: validVideoIds },
        sessionId: session.id
      }
    });

    console.log(`✅ Successfully deleted ${deleteResult.count} videos from database`);
    
    return json({ 
      success: true, 
      message: `Successfully deleted ${deleteResult.count} video(s)`,
      deletedCount: deleteResult.count,
      deletedVideos: validVideoIds
    });

  } catch (err) {
    console.error("❌ Error deleting videos:", err);
    return json({ 
      success: false, 
      error: "Failed to delete videos. Please try again." 
    }, { status: 500 });
  }
};

// Optional: Add a loader if you want to handle GET requests for debugging
export const loader = async ({ request }) => {
  return json({ 
    success: false, 
    error: "Method not allowed. Use DELETE request." 
  }, { status: 405 });
};