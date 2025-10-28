// import { json } from "@remix-run/node";
// import { authenticate } from "../shopify.server";
// import prisma from "../db.server";

// export const action = async ({ request }) => {
//   const { admin, session } = await authenticate.admin(request);
  
//   try {
//     const { productIds, videoId } = await request.json();
    
//     if (!productIds || !Array.isArray(productIds)) {
//       return json({ 
//         success: false, 
//         error: "Invalid product IDs provided" 
//       }, { status: 400 });
//     }

//     console.log("📦 Saving products to database:", {
//       productIds,
//       videoId,
//       sessionId: session.id,
//       shop: session.shop
//     });

//     // Get session from database
//     const dbSession = await prisma.session.findUnique({
//       where: { id: session.id }
//     });

//     if (!dbSession) {
//       return json({ 
//         success: false, 
//         error: "Session not found" 
//       }, { status: 404 });
//     }

//     let results = [];

//     // If videoId is provided, associate products with specific video
//     if (videoId) {
//       // First, remove existing product associations for this video
//       await prisma.videoProduct.deleteMany({
//         where: { video_id: parseInt(videoId) }
//       });

//       // Create new associations
//       for (const productId of productIds) {
//         try {
//           // First, ensure the product exists in our database
//           let product = await prisma.product.findFirst({
//             where: { 
//               shopify_product_id: productId,
//               sessionId: session.id
//             }
//           });

//           if (!product) {
//             // Fetch product details from Shopify
//             const productQuery = `
//               query getProduct($id: ID!) {
//                 product(id: $id) {
//                   id
//                   title
//                   description
//                   featuredImage {
//                     originalSrc
//                   }
//                   variants(first: 1) {
//                     edges {
//                       node {
//                         price
//                       }
//                     }
//                   }
//                 }
//               }
//             `;

//             const productResp = await admin.graphql(productQuery, {
//               variables: { id: productId }
//             });
//             const productData = await productResp.json();

//             if (productData.data.product) {
//               const shopifyProduct = productData.data.product;
              
//               product = await prisma.product.create({
//                 data: {
//                   sessionId: session.id,
//                   shopify_product_id: shopifyProduct.id,
//                   title: shopifyProduct.title,
//                   price: parseFloat(shopifyProduct.variants.edges[0]?.node.price || 0),
//                   image_url: shopifyProduct.featuredImage?.originalSrc || null
//                 }
//               });
//             }
//           }

//           if (product) {
//             // Create video-product association
//             const videoProduct = await prisma.videoProduct.create({
//               data: {
//                 video_id: parseInt(videoId),
//                 product_id: product.id
//               },
//               include: {
//                 product: true
//               }
//             });

//             results.push(videoProduct);
//           }
//         } catch (error) {
//           console.error(`Error processing product ${productId}:`, error);
//         }
//       }

//       // Fetch updated video with products
//       const updatedVideo = await prisma.mediaFile.findUnique({
//         where: { id: parseInt(videoId) },
//         include: {
//           videoProducts: {
//             include: {
//               product: true
//             }
//           }
//         }
//       });

//       return json({
//         success: true,
//         message: `Successfully associated ${results.length} products with video`,
//         video: updatedVideo,
//         results
//       });

//     } else {
//       // Save products to database without video association (general product saving)
//       for (const productId of productIds) {
//         try {
//           // Check if product already exists
//           let product = await prisma.product.findFirst({
//             where: { 
//               shopify_product_id: productId,
//               sessionId: session.id
//             }
//           });

//           if (!product) {
//             // Fetch product details from Shopify
//             const productQuery = `
//               query getProduct($id: ID!) {
//                 product(id: $id) {
//                   id
//                   title
//                   description
//                   featuredImage {
//                     originalSrc
//                   }
//                   variants(first: 1) {
//                     edges {
//                       node {
//                         price
//                       }
//                     }
//                   }
//                 }
//               }
//             `;

//             const productResp = await admin.graphql(productQuery, {
//               variables: { id: productId }
//             });
//             const productData = await productResp.json();

//             if (productData.data.product) {
//               const shopifyProduct = productData.data.product;
              
//               product = await prisma.product.create({
//                 data: {
//                   sessionId: session.id,
//                   shopify_product_id: shopifyProduct.id,
//                   title: shopifyProduct.title,
//                   price: parseFloat(shopifyProduct.variants.edges[0]?.node.price || 0),
//                   image_url: shopifyProduct.featuredImage?.originalSrc || null
//                 }
//               });

//               results.push(product);
//             }
//           } else {
//             results.push(product);
//           }
//         } catch (error) {
//           console.error(`Error processing product ${productId}:`, error);
//         }
//       }

//       return json({
//         success: true,
//         message: `Successfully saved ${results.length} products to database`,
//         products: results
//       });
//     }

//   } catch (error) {
//     console.error("❌ Error saving products:", error);
//     return json({ 
//       success: false, 
//       error: error.message 
//     }, { status: 500 });
//   }
// };






import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import prisma from "../db.server";

export const action = async ({ request }) => {
  const { admin, session } = await authenticate.admin(request);
  
  try {
    const { productIds, videoId } = await request.json();
    
    if (!productIds || !Array.isArray(productIds)) {
      return json({ 
        success: false, 
        error: "Invalid product IDs provided" 
      }, { status: 400 });
    }

    console.log("📦 Saving products to database:", {
      productIds,
      videoId,
      sessionId: session.id,
      shop: session.shop
    });

    // Get session from database
    const dbSession = await prisma.session.findUnique({
      where: { id: session.id }
    });

    if (!dbSession) {
      return json({ 
        success: false, 
        error: "Session not found" 
      }, { status: 404 });
    }

    let results = [];

    // If videoId is provided, associate products with specific video
    if (videoId) {
      // First, remove existing product associations for this video
      await prisma.videoProduct.deleteMany({
        where: { video_id: parseInt(videoId) }
      });

      // Create new associations
      for (const productId of productIds) {
        try {
          // First, ensure the product exists in our database
          let product = await prisma.product.findFirst({
            where: { 
              shopify_product_id: productId,
              sessionId: session.id
            }
          });

          if (!product) {
            // Fetch product details from Shopify including ALL variants
            const productQuery = `
              query getProduct($id: ID!) {
                product(id: $id) {
                  id
                  title
                  description
                  featuredImage {
                    originalSrc
                  }
                  variants(first: 10) {
                    edges {
                      node {
                        id
                        price
                        title
                        sku
                        inventoryQuantity
                      }
                    }
                  }
                }
              }
            `;

            const productResp = await admin.graphql(productQuery, {
              variables: { id: productId }
            });
            const productData = await productResp.json();

            if (productData.data.product) {
              const shopifyProduct = productData.data.product;
              
              // Get the FIRST variant ID (default variant)
              const firstVariant = shopifyProduct.variants.edges[0]?.node;
              
              if (!firstVariant) {
                console.error(`❌ No variants found for product ${productId}`);
                continue;
              }

              // Extract the numeric variant ID from GraphQL format
              const variantId = firstVariant.id;
              let cleanVariantId = variantId;
              
              if (variantId.startsWith('gid://shopify/ProductVariant/')) {
                cleanVariantId = variantId.replace('gid://shopify/ProductVariant/', '');
              }

              console.log("🆔 Extracted variant ID:", {
                productId: productId,
                productTitle: shopifyProduct.title,
                originalVariantId: variantId,
                cleanVariantId: cleanVariantId,
                variantPrice: firstVariant.price
              });

              // Create product with variant ID
              product = await prisma.product.create({
                data: {
                  sessionId: session.id,
                  shopify_product_id: shopifyProduct.id,
                  shopify_variant_id: cleanVariantId, // THIS IS THE KEY - storing variant ID
                  title: shopifyProduct.title,
                  price: parseFloat(firstVariant.price || 0),
                  image_url: shopifyProduct.featuredImage?.originalSrc || null
                }
              });

              console.log("✅ Product saved with variant ID:", {
                productId: product.id,
                shopifyProductId: product.shopify_product_id,
                shopifyVariantId: product.shopify_variant_id
              });
            }
          } else {
            console.log("ℹ️ Product already exists:", {
              productId: product.id,
              shopifyProductId: product.shopify_product_id,
              shopifyVariantId: product.shopify_variant_id
            });
          }

          if (product) {
            // Create video-product association
            const videoProduct = await prisma.videoProduct.create({
              data: {
                video_id: parseInt(videoId),
                product_id: product.id
              },
              include: {
                product: true
              }
            });

            results.push(videoProduct);
          }
        } catch (error) {
          console.error(`❌ Error processing product ${productId}:`, error);
        }
      }

      // Fetch updated video with products
      const updatedVideo = await prisma.mediaFile.findUnique({
        where: { id: parseInt(videoId) },
        include: {
          videoProducts: {
            include: {
              product: true
            }
          }
        }
      });

      return json({
        success: true,
        message: `Successfully associated ${results.length} products with video`,
        video: updatedVideo,
        results
      });

    } else {
      // Save products to database without video association
      for (const productId of productIds) {
        try {
          // Check if product already exists
          let product = await prisma.product.findFirst({
            where: { 
              shopify_product_id: productId,
              sessionId: session.id
            }
          });

          if (!product) {
            // Fetch product details from Shopify
            const productQuery = `
              query getProduct($id: ID!) {
                product(id: $id) {
                  id
                  title
                  description
                  featuredImage {
                    originalSrc
                  }
                  variants(first: 10) {
                    edges {
                      node {
                        id
                        price
                        title
                        sku
                        inventoryQuantity
                      }
                    }
                  }
                }
              }
            `;

            const productResp = await admin.graphql(productQuery, {
              variables: { id: productId }
            });
            const productData = await productResp.json();

            if (productData.data.product) {
              const shopifyProduct = productData.data.product;
              
              // Get the FIRST variant ID
              const firstVariant = shopifyProduct.variants.edges[0]?.node;
              
              if (!firstVariant) {
                console.error(`❌ No variants found for product ${productId}`);
                continue;
              }

              // Extract the numeric variant ID
              const variantId = firstVariant.id;
              let cleanVariantId = variantId;
              
              if (variantId.startsWith('gid://shopify/ProductVariant/')) {
                cleanVariantId = variantId.replace('gid://shopify/ProductVariant/', '');
              }

              console.log("🆔 Extracted variant ID:", {
                productId: productId,
                productTitle: shopifyProduct.title,
                originalVariantId: variantId,
                cleanVariantId: cleanVariantId
              });

              // Create product with variant ID
              product = await prisma.product.create({
                data: {
                  sessionId: session.id,
                  shopify_product_id: shopifyProduct.id,
                  shopify_variant_id: cleanVariantId, // Store variant ID
                  title: shopifyProduct.title,
                  price: parseFloat(firstVariant.price || 0),
                  image_url: shopifyProduct.featuredImage?.originalSrc || null
                }
              });

              console.log("✅ Product saved with variant ID:", {
                productId: product.id,
                shopifyVariantId: product.shopify_variant_id
              });

              results.push(product);
            }
          } else {
            console.log("ℹ️ Product already exists:", {
              productId: product.id,
              shopifyVariantId: product.shopify_variant_id
            });
            results.push(product);
          }
        } catch (error) {
          console.error(`❌ Error processing product ${productId}:`, error);
        }
      }

      return json({
        success: true,
        message: `Successfully saved ${results.length} products to database`,
        products: results
      });
    }

  } catch (error) {
    console.error("❌ Error saving products:", error);
    return json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
};