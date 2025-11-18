// // app/routes/api.video-products.$videoId.jsx
// import { getShopifyContext } from "../shopify.server.js";

// export async function loader({ request, params }) {
//   try {
//     const { session, error } = await getShopifyContext();
    
//     if (error || !session?.shop || !session?.accessToken) {
//       return new Response(
//         JSON.stringify({ 
//           success: false, 
//           error: "Shopify not configured" 
//         }),
//         { 
//           status: 401, 
//           headers: { 'Content-Type': 'application/json' } 
//         }
//       );
//     }

//     const videoId = parseInt(params.videoId);
//     const prisma = (await import('../db.server.js')).default;

//     // Get products associated with this video
//     const videoProducts = await prisma.videoProduct.findMany({
//       where: { video_id: videoId },
//       include: {
//         product: true
//       }
//     });

//     return new Response(
//       JSON.stringify({
//         success: true,
//         products: videoProducts.map(vp => vp.product)
//       }),
//       { 
//         status: 200, 
//         headers: { 'Content-Type': 'application/json' } 
//       }
//     );

//   } catch (error) {
//     console.error("Error fetching video products:", error);
//     return new Response(
//       JSON.stringify({ 
//         success: false, 
//         error: error.message 
//       }),
//       { 
//         status: 500, 
//         headers: { 'Content-Type': 'application/json' } 
//       }
//     );
//   }
// }

// export async function action({ request, params }) {
//   try {
//     const { session, error } = await getShopifyContext();
    
//     if (error || !session?.shop || !session?.accessToken) {
//       return new Response(
//         JSON.stringify({ 
//           success: false, 
//           error: "Shopify not configured" 
//         }),
//         { 
//           status: 401, 
//           headers: { 'Content-Type': 'application/json' } 
//         }
//       );
//     }

//     const videoId = parseInt(params.videoId);
//     const body = await request.json();
//     const { productIds } = body;

//     const prisma = (await import('../db.server.js')).default;

//     // Delete existing associations
//     await prisma.videoProduct.deleteMany({
//       where: { video_id: videoId }
//     });

//     // Create new associations
//     if (productIds && productIds.length > 0) {
//       await prisma.videoProduct.createMany({
//         data: productIds.map(productId => ({
//           video_id: videoId,
//           product_id: productId
//         }))
//       });
//     }

//     return new Response(
//       JSON.stringify({
//         success: true,
//         message: "Products saved successfully"
//       }),
//       { 
//         status: 200, 
//         headers: { 'Content-Type': 'application/json' } 
//       }
//     );

//   } catch (error) {
//     console.error("Error saving video products:", error);
//     return new Response(
//       JSON.stringify({ 
//         success: false, 
//         error: error.message 
//       }),
//       { 
//         status: 500, 
//         headers: { 'Content-Type': 'application/json' } 
//       }
//     );
//   }
// }









// app/routes/api.video-products.$videoId.jsx
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
    const { productIds } = body;

    console.log('Saving products for video:', videoId, 'Products:', productIds);

    const prisma = (await import('../db.server.js')).default;

    // Delete existing associations
    await prisma.videoProduct.deleteMany({
      where: { video_id: videoId }
    });

    // Create new associations
    if (productIds && productIds.length > 0) {
      // Convert to integers and create associations
      for (const productId of productIds) {
        await prisma.videoProduct.create({
          data: {
            video_id: videoId,
            product_id: parseInt(productId)
          }
        });
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Products saved successfully"
      }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error("Error saving video products:", error);
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

    const videoId = parseInt(params.videoId);
    const prisma = (await import('../db.server.js')).default;

    // Get products associated with this video
    const videoProducts = await prisma.videoProduct.findMany({
      where: { video_id: videoId },
      include: {
        product: true
      }
    });

    return new Response(
      JSON.stringify({
        success: true,
        products: videoProducts.map(vp => vp.product)
      }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error("Error fetching video products:", error);
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