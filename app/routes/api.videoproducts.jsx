// app/routes/api.videoproducts.jsx
import { getShopifyContext } from "../shopify.server";

export async function loader({ request }) {
  console.log("🎬 API videoproducts route called");
  
  const url = new URL(request.url);
  const videoId = url.searchParams.get('videoId');
  
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

  const { session, error } = await getShopifyContext();
  
  if (error || !session?.shop || !session?.accessToken) {
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "Shopify session not configured",
        details: error 
      }),
      { 
        status: 500, 
        headers: { "Content-Type": "application/json" } 
      }
    );
  }

  try {
    // Import Prisma client
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();

    // Fetch video products with product details
    const videoProducts = await prisma.videoProduct.findMany({
      where: {
        video_id: parseInt(videoId),
        mediaFile: {
          sessionId: session.id // Ensure the video belongs to the current session
        }
      },
      include: {
        product: {
          select: {
            id: true,
            title: true,
            price: true,
            image_url: true,
            shopify_product_id: true
          }
        }
      },
      orderBy: {
        id: 'asc'
      }
    });

    await prisma.$disconnect();

    // Transform the data to match expected format
    const savedProducts = videoProducts.map(vp => ({
      id: vp.product.id,
      title: vp.product.title,
      price: vp.product.price,
      image_url: vp.product.image_url,
      shopify_product_id: vp.product.shopify_product_id,
      video_product_id: vp.id
    }));

    console.log(`📋 Found ${savedProducts.length} saved products for video ${videoId}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        products: savedProducts,
        count: savedProducts.length
      }),
      { 
        headers: { "Content-Type": "application/json" } 
      }
    );
  } catch (err) {
    console.error("💥 Error fetching video products:", err);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: err.message 
      }),
      { 
        status: 500, 
        headers: { "Content-Type": "application/json" } 
      }
    );
  }
}