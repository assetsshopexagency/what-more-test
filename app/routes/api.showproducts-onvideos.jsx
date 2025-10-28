// // import { json } from "@remix-run/node";
// // import { authenticate } from "../shopify.server";
// // import prisma from "../db.server";

// // export const loader = async ({ request }) => {
// //   const { session } = await authenticate.admin(request);
// //   const url = new URL(request.url);
// //   const videoId = url.searchParams.get("videoId");

// //   try {
// //     // If videoId is provided, get products for specific video
// //     if (videoId) {
// //       console.log(`🔄 Loading products for video ${videoId}`);

// //       const videoWithProducts = await prisma.mediaFile.findUnique({
// //         where: { 
// //           id: parseInt(videoId),
// //           sessionId: session.id 
// //         },
// //         include: {
// //           videoProducts: {
// //             include: {
// //               product: true
// //             }
// //           }
// //         }
// //       });

// //       if (!videoWithProducts) {
// //         return json({ 
// //           success: false, 
// //           error: "Video not found" 
// //         }, { status: 404 });
// //       }

// //       const products = videoWithProducts.videoProducts.map(vp => vp.product);

// //       return json({
// //         success: true,
// //         products,
// //         video: {
// //           id: videoWithProducts.id,
// //           title: videoWithProducts.title,
// //           productsCount: products.length
// //         }
// //       });
// //     } else {
// //       // If no videoId provided, get all products from all videos for this shop
// //       console.log(`🔄 Loading all products from all videos for shop ${session.shop}`);

// //       const allVideoProducts = await prisma.videoProduct.findMany({
// //         where: {
// //           mediaFile: {
// //             sessionId: session.id
// //           }
// //         },
// //         include: {
// //           product: true,
// //           mediaFile: {
// //             select: {
// //               id: true,
// //               title: true
// //             }
// //           }
// //         }
// //       });

// //       const products = allVideoProducts.map(vp => vp.product);
      
// //       // Remove duplicates (same product might be associated with multiple videos)
// //       const uniqueProducts = products.filter((product, index, self) => 
// //         index === self.findIndex(p => p.id === product.id)
// //       );

// //       return json({
// //         success: true,
// //         products: uniqueProducts,
// //         totalProducts: uniqueProducts.length,
// //         totalAssociations: allVideoProducts.length
// //       });
// //     }

// //   } catch (error) {
// //     console.error("❌ Error loading video products:", error);
// //     return json({ 
// //       success: false, 
// //       error: error.message 
// //     }, { status: 500 });
// //   }
// // };





// import { json } from "@remix-run/node";
// import { authenticate } from "../shopify.server";
// import prisma from "../db.server";

// export const loader = async ({ request }) => {
//   const { session } = await authenticate.admin(request);
//   const url = new URL(request.url);
//   const videoId = url.searchParams.get("videoId"); // can be passed when needed

//   try {
//     // If a specific videoId is provided
//     if (videoId) {
//       console.log(`🎥 Fetching products for video ID: ${videoId}`);

//       const videoWithProducts = await prisma.mediaFile.findUnique({
//         where: {
//           id: parseInt(videoId),
//         },
//         include: {
//           videoProducts: {
//             include: {
//               product: true,
//             },
//           },
//         },
//       });

//       if (!videoWithProducts) {
//         return json({ success: false, error: "Video not found" }, { status: 404 });
//       }

//       const products = videoWithProducts.videoProducts.map((vp) => vp.product);

//       return json({
//         success: true,
//         videoId: videoWithProducts.id,
//         products,
//       });
//     }

//     // Otherwise — return list of all videos, each with its own products
//     console.log(`🎞️ Fetching all videos and their products for shop ${session.shop}`);

//     const videosWithProducts = await prisma.mediaFile.findMany({
//       where: { sessionId: session.id },
//       include: {
//         videoProducts: {
//           include: {
//             product: true,
//           },
//         },
//       },
//     });

//     // Structure: each video has its own product list
//     const result = videosWithProducts.map((video) => ({
//       id: video.id,
//       title: video.title,
//       products: video.videoProducts.map((vp) => vp.product),
//     }));

//     return json({
//       success: true,
//       videos: result,
//     });
//   } catch (error) {
//     console.error("❌ Error loading video products:", error);
//     return json({ success: false, error: error.message }, { status: 500 });
//   }
// };




// app/routes/api.showproducts-onvideos.js
import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import prisma from "../db.server";

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const url = new URL(request.url);
  const videoId = url.searchParams.get("videoId");

  try {
    if (videoId) {
      console.log(`🔄 Loading products for video ${videoId}`);

      const videoWithProducts = await prisma.mediaFile.findUnique({
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

      if (!videoWithProducts) {
        return json({ 
          success: false, 
          error: "Video not found" 
        }, { status: 404 });
      }

      const products = videoWithProducts.videoProducts.map(vp => vp.product);

      return json({
        success: true,
        products,
        video: {
          id: videoWithProducts.id,
          title: videoWithProducts.title,
          productsCount: products.length
        }
      });
    } else {
      // Get all products grouped by video for the shop
      console.log(`🔄 Loading all products from all videos for shop ${session.shop}`);

      const allVideoProducts = await prisma.videoProduct.findMany({
        where: {
          mediaFile: {
            sessionId: session.id
          }
        },
        include: {
          product: true,
          mediaFile: {
            select: {
              id: true,
              title: true
            }
          }
        }
      });

      // Group by video
      const videoMap = {};
      allVideoProducts.forEach(vp => {
        const vid = vp.mediaFile.id;
        if (!videoMap[vid]) {
          videoMap[vid] = {
            video: {
              id: vp.mediaFile.id,
              title: vp.mediaFile.title,
              productsCount: 0
            },
            products: []
          };
        }
        videoMap[vid].products.push(vp.product);
        videoMap[vid].video.productsCount = videoMap[vid].products.length;
      });

      return json({
        success: true,
        videoProducts: Object.values(videoMap),
        totalAssociations: allVideoProducts.length
      });
    }

  } catch (error) {
    console.error("❌ Error loading video products:", error);
    return json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
};