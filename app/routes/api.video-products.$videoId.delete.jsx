// app/routes/api.video-products.$videoId.delete.jsx
//test comment
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

    const videoId = parseInt(params.videoId);
    const body = await request.json();
    const { productId } = body;

    console.log('🗑️ Removing product from video:', videoId, 'Product ID:', productId);

    const prisma = (await import('../db.server.js')).default;

    // Delete the specific product association
    await prisma.videoProduct.deleteMany({
      where: { 
        video_id: videoId,
        product: {
          shopify_product_id: String(productId)
        }
      }
    });

    console.log(`✅ Successfully removed product ${productId} from video ${videoId}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Product removed successfully`
      }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error("❌ Error removing video product:", error);
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