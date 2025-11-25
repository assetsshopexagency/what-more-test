// app/routes/api.videooptionsmodal-enableoption.jsx
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

    const body = await request.json();
    const { videoId, productId, status } = body;

    console.log('🔄 Updating enable status:', { videoId, productId, status });

    const prisma = (await import('../db.server.js')).default;

    // Check if the product-video relationship exists in VideoProduct first
    const existingVideoProduct = await prisma.videoProduct.findFirst({
      where: {
        video_id: parseInt(videoId),
        product_id: parseInt(productId)
      }
    });

    if (!existingVideoProduct) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Product is not associated with this video"
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Update or create the enable status
    const enableProduct = await prisma.enableProduct.upsert({
      where: {
        video_id_product_id: {
          video_id: parseInt(videoId),
          product_id: parseInt(productId)
        }
      },
      update: {
        status: status
      },
      create: {
        video_id: parseInt(videoId),
        product_id: parseInt(productId),
        status: status
      }
    });

    console.log('✅ Enable status updated successfully:', enableProduct);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Video ${status ? 'enabled' : 'disabled'} on product page`,
        data: enableProduct
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error("❌ Error updating enable status:", error);
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

export async function loader({ request, params }) {
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

    const url = new URL(request.url);
    const videoId = url.searchParams.get('videoId');
    const productId = url.searchParams.get('productId');

    if (!videoId) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Video ID is required"
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const prisma = (await import('../db.server.js')).default;

    // Get all enable statuses for this video
    const enableProducts = await prisma.enableProduct.findMany({
      where: {
        video_id: parseInt(videoId)
      },
      include: {
        product: true
      }
    });

    // If specific product ID is provided, return just that status
    if (productId) {
      const specificEnable = enableProducts.find(ep => 
        ep.product_id === parseInt(productId)
      );
      
      return new Response(
        JSON.stringify({
          success: true,
          status: specificEnable ? specificEnable.status : false,
          data: specificEnable || null
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Return all enable statuses for the video
    return new Response(
      JSON.stringify({
        success: true,
        data: enableProducts
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error("❌ Error fetching enable status:", error);
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