// app/routes/api.delete-video-collection.js
import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import prisma from "../db.server";

export const action = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const { videoId, collectionId } = await request.json();

  if (!videoId || !collectionId) {
    return json({ success: false, error: "Missing videoId or collectionId" }, { status: 400 });
  }

  try {
    const video = await prisma.mediaFile.findUnique({
      where: { id: parseInt(videoId), sessionId: session.id }
    });

    if (!video) {
      return json({ success: false, error: "Video not found" }, { status: 404 });
    }

    await prisma.videoCollection.deleteMany({
      where: {
        video_id: parseInt(videoId),
        collection_id: parseInt(collectionId)
      }
    });

    return json({ success: true, message: "Collection removed from video" });
  } catch (error) {
    console.error("Error deleting video collection:", error);
    return json({ success: false, error: error.message }, { status: 500 });
  }
};