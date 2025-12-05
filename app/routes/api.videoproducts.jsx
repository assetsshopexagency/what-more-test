// app/routes/api.videoproducts.jsx
import { getShopifyContext } from "../shopify.server";

// GET - Fetch saved products for a video
export async function loader({ request }) {
  console.log("🎬 GET /api/videoproducts called");
  
  const { session, error } = await getShopifyContext();
  
  if (error || !session?.shop || !session?.accessToken) {
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "Shopify session not configured"
      }),
      { 
        status: 500, 
        headers: { "Content-Type": "application/json" } 
      }
    );
  }

  try {
    const url = new URL(request.url);
    const videoId = url.searchParams.get('videoId');
    
    console.log("📹 Fetching products for video:", videoId);

    if (!videoId) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Video ID is required" 
        }),
        { 
          status: 400, 
          headers: { "Content-Type": "application/json" } 
        }
      );
    }

    // TODO: Replace with your actual database query
    // This is a mock implementation - you need to implement your actual database logic
    const mockSavedProducts = [];
    
    console.log(`✅ Loaded ${mockSavedProducts.length} saved products for video ${videoId}`);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        products: mockSavedProducts 
      }),
      { 
        headers: { "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    console.error("💥 Error fetching video products:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        status: 500, 
        headers: { "Content-Type": "application/json" } 
      }
    );
  }
}

// POST - Save products for a video
export async function action({ request }) {
  console.log("🎬 POST /api/videoproducts called");
  
  const { session, error } = await getShopifyContext();
  
  if (error || !session?.shop || !session?.accessToken) {
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "Shopify session not configured"
      }),
      { 
        status: 500, 
        headers: { "Content-Type": "application/json" } 
      }
    );
  }

  try {
    const body = await request.json();
    const { videoId, productIds } = body;
    
    console.log("💾 Saving products for video:", videoId);
    console.log("📦 Product IDs:", productIds);

    if (!videoId) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Video ID is required" 
        }),
        { 
          status: 400, 
          headers: { "Content-Type": "application/json" } 
        }
      );
    }

    if (!productIds || !Array.isArray(productIds)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Product IDs array is required" 
        }),
        { 
          status: 400, 
          headers: { "Content-Type": "application/json" } 
        }
      );
    }

    // TODO: Replace with your actual database save logic
    // This is where you save the video-product relationships to your database
    console.log(`✅ Saving ${productIds.length} products for video ${videoId}`);
    
    // Mock successful save
    // In your actual implementation, you would:
    // 1. Delete existing video-product relationships for this video
    // 2. Insert new relationships for the selected productIds
    // 3. Return success

    return new Response(
      JSON.stringify({ 
        success: true,
        message: `Successfully saved ${productIds.length} products for video`,
        videoId: videoId,
        productCount: productIds.length
      }),
      { 
        status: 200,
        headers: { "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    console.error("💥 Error saving video products:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        status: 500, 
        headers: { "Content-Type": "application/json" } 
      }
    );
  }
}