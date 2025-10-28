import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server.js";
import prisma from "../db.server.js";

export const loader = async ({ request }) => {
  try {
    const { session } = await authenticate.admin(request);
    
    console.log("🔍 Fetching videos for session:", session.id);
    
    // Fetch videos from database
    const videos = await prisma.mediaFile.findMany({
      where: {
        sessionId: session.id,
      },
      include: {
        videoProducts: {
          include: {
            product: true
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    console.log(`✅ Found ${videos.length} videos in database`);

    // Format the response
    const formattedVideos = videos.map(video => ({
      id: video.id,
      title: video.title,
      shopify_file_url: video.shopify_file_url,
      thumbnail_url: video.thumbnail_url,
      created_at: video.created_at,
      products: video.videoProducts.map(vp => ({
        id: vp.product.id,
        title: vp.product.title,
        shopify_product_id: vp.product.shopify_product_id,
        price: vp.product.price,
        image_url: vp.product.image_url
      }))
    }));

    return json({ 
      success: true, 
      videos: formattedVideos 
    });

  } catch (err) {
    console.error("❌ Error fetching videos:", err);
    return json({ 
      success: false, 
      error: "Failed to load videos from database" 
    }, { status: 500 });
  }
};

export const action = async ({ request }) => {
  try {
    const { session } = await authenticate.admin(request);
    const body = await request.json();
    const { videoId, productIds } = body;

    console.log("🔄 Updating products for video:", videoId);

    // Validate video belongs to current session
    const video = await prisma.mediaFile.findFirst({
      where: {
        id: parseInt(videoId),
        sessionId: session.id
      }
    });

    if (!video) {
      return json({ 
        success: false, 
        error: "Video not found" 
      }, { status: 404 });
    }

    // Delete existing product associations
    await prisma.videoProduct.deleteMany({
      where: {
        video_id: parseInt(videoId)
      }
    });

    // Create new product associations
    if (productIds && productIds.length > 0) {
      const videoProductsData = productIds.map(productId => ({
        video_id: parseInt(videoId),
        product_id: parseInt(productId)
      }));

      await prisma.videoProduct.createMany({
        data: videoProductsData,
        skipDuplicates: true
      });
    }

    // Fetch updated video with products
    const updatedVideo = await prisma.mediaFile.findFirst({
      where: {
        id: parseInt(videoId),
        sessionId: session.id
      },
      include: {
        videoProducts: {
          include: {
            product: true
          }
        }
      }
    });

    const formattedVideo = {
      id: updatedVideo.id,
      title: updatedVideo.title,
      shopify_file_url: updatedVideo.shopify_file_url,
      thumbnail_url: updatedVideo.thumbnail_url,
      created_at: updatedVideo.created_at,
      products: updatedVideo.videoProducts.map(vp => ({
        id: vp.product.id,
        title: vp.product.title,
        shopify_product_id: vp.product.shopify_product_id,
        price: vp.product.price,
        image_url: vp.product.image_url
      }))
    };

    console.log("✅ Products updated successfully");
    return json({ 
      success: true, 
      video: formattedVideo 
    });

  } catch (err) {
    console.error("❌ Error updating video products:", err);
    return json({ 
      success: false, 
      error: "Failed to update video products" 
    }, { status: 500 });
  }
};