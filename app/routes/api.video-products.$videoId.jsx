// // // // app/routes/api.video-products.$videoId.jsx
// // // import { getShopifyContext } from "../shopify.server.js";

// // // export async function loader({ request, params }) {
// // //   try {
// // //     const { session, error } = await getShopifyContext();
    
// // //     if (error || !session?.shop || !session?.accessToken) {
// // //       return new Response(
// // //         JSON.stringify({ 
// // //           success: false, 
// // //           error: "Shopify not configured" 
// // //         }),
// // //         { 
// // //           status: 401, 
// // //           headers: { 'Content-Type': 'application/json' } 
// // //         }
// // //       );
// // //     }

// // //     const videoId = parseInt(params.videoId);
// // //     const prisma = (await import('../db.server.js')).default;

// // //     // Get products associated with this video
// // //     const videoProducts = await prisma.videoProduct.findMany({
// // //       where: { video_id: videoId },
// // //       include: {
// // //         product: true
// // //       }
// // //     });

// // //     return new Response(
// // //       JSON.stringify({
// // //         success: true,
// // //         products: videoProducts.map(vp => vp.product)
// // //       }),
// // //       { 
// // //         status: 200, 
// // //         headers: { 'Content-Type': 'application/json' } 
// // //       }
// // //     );

// // //   } catch (error) {
// // //     console.error("Error fetching video products:", error);
// // //     return new Response(
// // //       JSON.stringify({ 
// // //         success: false, 
// // //         error: error.message 
// // //       }),
// // //       { 
// // //         status: 500, 
// // //         headers: { 'Content-Type': 'application/json' } 
// // //       }
// // //     );
// // //   }
// // // }

// // // export async function action({ request, params }) {
// // //   try {
// // //     const { session, error } = await getShopifyContext();
    
// // //     if (error || !session?.shop || !session?.accessToken) {
// // //       return new Response(
// // //         JSON.stringify({ 
// // //           success: false, 
// // //           error: "Shopify not configured" 
// // //         }),
// // //         { 
// // //           status: 401, 
// // //           headers: { 'Content-Type': 'application/json' } 
// // //         }
// // //       );
// // //     }

// // //     const videoId = parseInt(params.videoId);
// // //     const body = await request.json();
// // //     const { productIds } = body;

// // //     const prisma = (await import('../db.server.js')).default;

// // //     // Delete existing associations
// // //     await prisma.videoProduct.deleteMany({
// // //       where: { video_id: videoId }
// // //     });

// // //     // Create new associations
// // //     if (productIds && productIds.length > 0) {
// // //       await prisma.videoProduct.createMany({
// // //         data: productIds.map(productId => ({
// // //           video_id: videoId,
// // //           product_id: productId
// // //         }))
// // //       });
// // //     }

// // //     return new Response(
// // //       JSON.stringify({
// // //         success: true,
// // //         message: "Products saved successfully"
// // //       }),
// // //       { 
// // //         status: 200, 
// // //         headers: { 'Content-Type': 'application/json' } 
// // //       }
// // //     );

// // //   } catch (error) {
// // //     console.error("Error saving video products:", error);
// // //     return new Response(
// // //       JSON.stringify({ 
// // //         success: false, 
// // //         error: error.message 
// // //       }),
// // //       { 
// // //         status: 500, 
// // //         headers: { 'Content-Type': 'application/json' } 
// // //       }
// // //     );
// // //   }
// // // }









// // // app/routes/api.video-products.$videoId.jsx
// // import { getShopifyContext } from "../shopify.server.js";

// // export async function loader({ params }) {
// //   try {
// //     const { session, error } = await getShopifyContext();
    
// //     if (error || !session?.shop || !session?.accessToken) {
// //       console.error("🚫 Shopify session error in video-products loader:", error);
// //       return new Response(
// //         JSON.stringify({ 
// //           success: false, 
// //           error: "Shopify session not configured properly. Check .env and server logs." 
// //         }),
// //         { 
// //           status: 401, 
// //           headers: { "Content-Type": "application/json" } 
// //         }
// //       );
// //     }

// //     console.log("✅ Session valid for video-products loader, shop:", session.shop);

// //     const videoId = parseInt(params.videoId);
// //     const prisma = (await import('../db.server.js')).default;

// //     // Get products associated with this video
// //     const videoProducts = await prisma.videoProduct.findMany({
// //       where: { video_id: videoId },
// //       include: {
// //         product: true
// //       }
// //     });

// //     return new Response(
// //       JSON.stringify({
// //         success: true,
// //         products: videoProducts.map(vp => vp.product)
// //       }),
// //       { 
// //         status: 200, 
// //         headers: { "Content-Type": "application/json" } 
// //       }
// //     );

// //   } catch (error) {
// //     console.error("💥 Error in video-products loader:", error);
// //     return new Response(
// //       JSON.stringify({ 
// //         success: false, 
// //         error: error.message 
// //       }),
// //       { 
// //         status: 500, 
// //         headers: { "Content-Type": "application/json" } 
// //       }
// //     );
// //   }
// // }

// // export async function action({ request, params }) {
// //   try {
// //     const { session, error } = await getShopifyContext();
    
// //     if (error || !session?.shop || !session?.accessToken) {
// //       console.error("🚫 Shopify session error in video-products action:", error);
// //       return new Response(
// //         JSON.stringify({ 
// //           success: false, 
// //           error: "Shopify session not configured properly. Check .env and server logs." 
// //         }),
// //         { 
// //           status: 401, 
// //           headers: { "Content-Type": "application/json" } 
// //         }
// //       );
// //     }

// //     console.log("✅ Session valid for video-products action, shop:", session.shop);

// //     const videoId = parseInt(params.videoId);
// //     const body = await request.json();
// //     const { productIds } = body;

// //     const prisma = (await import('../db.server.js')).default;

// //     // Delete existing associations
// //     await prisma.videoProduct.deleteMany({
// //       where: { video_id: videoId }
// //     });

// //     // Create new associations
// //     if (Array.isArray(productIds) && productIds.length > 0) {
// //       await prisma.videoProduct.createMany({
// //         data: productIds.map(productId => ({
// //           video_id: videoId,
// //           product_id: parseInt(productId)
// //         })),
// //         skipDuplicates: true
// //       });
// //     }

// //     return new Response(
// //       JSON.stringify({
// //         success: true,
// //         message: "Products saved successfully"
// //       }),
// //       { 
// //         status: 200, 
// //         headers: { "Content-Type": "application/json" } 
// //       }
// //     );

// //   } catch (error) {
// //     console.error("💥 Error in video-products action:", error);
// //     return new Response(
// //       JSON.stringify({ 
// //         success: false, 
// //         error: error.message 
// //       }),
// //       { 
// //         status: 500, 
// //         headers: { "Content-Type": "application/json" } 
// //       }
// //     );
// //   }
// // }




// // app/routes/api.video-products.$videoId.jsx - WORKING VERSION
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
//     const { productIds } = body; // These are SHOPIFY IDs from your products API

//     console.log('💾 Saving products for video:', videoId, 'Shopify Product IDs:', productIds);

//     const prisma = (await import('../db.server.js')).default;

//     // STEP 1: First, ensure these products exist in our database
//     const internalProductIds = [];
    
//     for (const shopifyProductId of productIds) {
//       // Check if product exists in our database
//       let product = await prisma.product.findFirst({
//         where: {
//           sessionId: session.id,
//           shopify_product_id: String(shopifyProductId)
//         }
//       });

//       // If product doesn't exist, fetch from Shopify and create it
//       if (!product) {
//         console.log(`🆕 Product ${shopifyProductId} not in database, fetching from Shopify...`);
        
//         try {
//           const productUrl = `https://${session.shop}/admin/api/2026-01/products/${shopifyProductId}.json?fields=id,title,image,variants`;
//           const productRes = await fetch(productUrl, {
//             headers: {
//               "X-Shopify-Access-Token": session.accessToken,
//               "Content-Type": "application/json",
//             },
//           });

//           if (productRes.ok) {
//             const productData = await productRes.json();
//             const shopifyProduct = productData.product;
            
//             // Create the product in our database
//             product = await prisma.product.create({
//               data: {
//                 sessionId: session.id,
//                 shopify_product_id: String(shopifyProduct.id),
//                 shopify_variant_id: shopifyProduct.variants?.[0]?.id ? String(shopifyProduct.variants[0].id) : null,
//                 title: shopifyProduct.title,
//                 price: parseFloat(shopifyProduct.variants?.[0]?.price || '0'),
//                 image_url: shopifyProduct.image?.src || null
//               }
//             });
//             console.log(`✅ Created product in database: ${product.id} - ${product.title}`);
//           }
//         } catch (fetchError) {
//           console.error(`❌ Failed to fetch product ${shopifyProductId}:`, fetchError);
//           continue; // Skip this product if we can't fetch it
//         }
//       }

//       // Add the internal database ID to our list
//       if (product) {
//         internalProductIds.push(product.id);
//       }
//     }

//     console.log('🔍 Internal product IDs to associate:', internalProductIds);

//     // STEP 2: Delete existing associations for this video
//     await prisma.videoProduct.deleteMany({
//       where: { video_id: videoId }
//     });

//     // STEP 3: Create new associations with INTERNAL database IDs
//     if (internalProductIds.length > 0) {
//       await prisma.videoProduct.createMany({
//         data: internalProductIds.map(internalId => ({
//           video_id: videoId,
//           product_id: internalId
//         }))
//       });
//       console.log(`✅ Successfully associated ${internalProductIds.length} products with video ${videoId}`);
//     } else {
//       console.log('ℹ️ No products to associate');
//     }

//     return new Response(
//       JSON.stringify({
//         success: true,
//         message: `Successfully saved ${internalProductIds.length} products for this video`
//       }),
//       { 
//         status: 200, 
//         headers: { 'Content-Type': 'application/json' } 
//       }
//     );

//   } catch (error) {
//     console.error("❌ Error saving video products:", error);
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




// app/routes/api.video-products.$videoId.jsx - UPDATED VERSION
import { getShopifyContext } from "../shopify.server.js";

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

    // Transform the data to include both internal ID and Shopify ID
    const products = videoProducts.map(vp => ({
      ...vp.product,
      video_product_id: vp.id, // Include the relationship ID if needed
      // Ensure we have the shopify_product_id available
      shopify_product_id: vp.product.shopify_product_id
    }));

    console.log(`📹 Loaded ${products.length} saved products for video ${videoId}:`, 
      products.map(p => ({ id: p.id, shopify_id: p.shopify_product_id, title: p.title }))
    );

    return new Response(
      JSON.stringify({
        success: true,
        products: products
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
    const { productIds } = body; // These are SHOPIFY IDs from your products API

    console.log('💾 Saving products for video:', videoId, 'Shopify Product IDs:', productIds);

    const prisma = (await import('../db.server.js')).default;

    // STEP 1: First, ensure these products exist in our database
    const internalProductIds = [];
    
    for (const shopifyProductId of productIds) {
      // Check if product exists in our database
      let product = await prisma.product.findFirst({
        where: {
          sessionId: session.id,
          shopify_product_id: String(shopifyProductId)
        }
      });

      // If product doesn't exist, fetch from Shopify and create it
      if (!product) {
        console.log(`🆕 Product ${shopifyProductId} not in database, fetching from Shopify...`);
        
        try {
          const productUrl = `https://${session.shop}/admin/api/2026-01/products/${shopifyProductId}.json?fields=id,title,image,variants`;
          const productRes = await fetch(productUrl, {
            headers: {
              "X-Shopify-Access-Token": session.accessToken,
              "Content-Type": "application/json",
            },
          });

          if (productRes.ok) {
            const productData = await productRes.json();
            const shopifyProduct = productData.product;
            
            // Create the product in our database
            product = await prisma.product.create({
              data: {
                sessionId: session.id,
                shopify_product_id: String(shopifyProduct.id),
                shopify_variant_id: shopifyProduct.variants?.[0]?.id ? String(shopifyProduct.variants[0].id) : null,
                title: shopifyProduct.title,
                price: parseFloat(shopifyProduct.variants?.[0]?.price || '0'),
                image_url: shopifyProduct.image?.src || null
              }
            });
            console.log(`✅ Created product in database: ${product.id} - ${product.title}`);
          }
        } catch (fetchError) {
          console.error(`❌ Failed to fetch product ${shopifyProductId}:`, fetchError);
          continue; // Skip this product if we can't fetch it
        }
      }

      // Add the internal database ID to our list
      if (product) {
        internalProductIds.push(product.id);
      }
    }

    console.log('🔍 Internal product IDs to associate:', internalProductIds);

    // STEP 2: Delete existing associations for this video
    await prisma.videoProduct.deleteMany({
      where: { video_id: videoId }
    });

    // STEP 3: Create new associations with INTERNAL database IDs
    if (internalProductIds.length > 0) {
      await prisma.videoProduct.createMany({
        data: internalProductIds.map(internalId => ({
          video_id: videoId,
          product_id: internalId
        }))
      });
      console.log(`✅ Successfully associated ${internalProductIds.length} products with video ${videoId}`);
    } else {
      console.log('ℹ️ No products to associate');
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Successfully saved ${internalProductIds.length} products for this video`
      }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error("❌ Error saving video products:", error);
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