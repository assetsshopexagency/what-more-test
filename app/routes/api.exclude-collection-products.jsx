

import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import prisma from "../db.server";

export const action = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const { videoId, productId, collectionId } = await request.json();

  try {
    // Verify the video and collection exist
    const videoCollection = await prisma.videoCollection.findFirst({
      where: {
        video_id: parseInt(videoId),
        collection_id: parseInt(collectionId),
        mediaFile: { sessionId: session.id },
      },
    });

    if (!videoCollection) {
      return json(
        { success: false, error: "Video or collection not found" },
        { status: 404 }
      );
    }

    // Add product to excluded list (assuming excludedMap is managed via a separate table or logic)
    // For simplicity, we'll add to excludedMap; adjust if you have a specific table for exclusions
    const existingExclusion = await prisma.videoProduct.findFirst({
      where: {
        video_id: parseInt(videoId),
        product_id: parseInt(productId),
      },
    });

    if (existingExclusion) {
      await prisma.videoProduct.delete({
        where: {
          id: existingExclusion.id,
        },
      });
    }

    return json({ success: true });
  } catch (error) {
    console.error("❌ Error excluding product from collection:", error);
    return json({ success: false, error: error.message }, { status: 500 });
  }
};