// api.video-products.$videoId.reorder.jsx

import { json } from "@remix-run/node";
import prisma from "../db.server.js";

export async function action({ request, params }) {
  const { videoId } = params;

  // Only allow PUT method
  if (request.method !== "PUT") {
    return json(
      { success: false, error: "Method not allowed" },
      { status: 405 },
    );
  }

  try {
    const { productOrder } = await request.json();

    if (!productOrder || !Array.isArray(productOrder)) {
      return json(
        { success: false, error: "Invalid product order data" },
        { status: 400 },
      );
    }

    console.log(
      `🔄 Reordering ${productOrder.length} products for video ${videoId}`,
    );

    // First, get all video products to find their internal IDs
    const videoProducts = await prisma.videoProduct.findMany({
      where: {
        video_id: parseInt(videoId),
      },
      include: {
        product: true,
      },
    });

    // Create a map of shopify_product_id to videoProduct id
    const productMap = new Map();
    videoProducts.forEach((vp) => {
      productMap.set(vp.product.shopify_product_id, vp.id);
    });

    // Update each product's position in the database
    await Promise.all(
      productOrder.map(({ productId, position }) => {
        const videoProductId = productMap.get(productId);

        if (!videoProductId) {
          console.warn(`⚠️ Product ${productId} not found in video ${videoId}`);
          return Promise.resolve();
        }

        return prisma.videoProduct.update({
          where: {
            id: videoProductId,
          },
          data: {
            position: position,
          },
        });
      }),
    );

    console.log(
      `✅ Updated order for ${productOrder.length} products in video ${videoId}`,
    );

    return json({ success: true });
  } catch (error) {
    console.error("❌ Error reordering products:", error);
    return json({ success: false, error: error.message }, { status: 500 });
  }
}

// Handle GET requests (optional - for debugging)
export async function loader() {
  return json(
    {
      message: "PUT to this endpoint to reorder video products",
      instructions: "Send { productOrder: [{ productId, position }] }",
    },
    { status: 200 },
  );
}
