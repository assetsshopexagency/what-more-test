// // // // // import { json } from "@remix-run/node";
// // // // // import { authenticate } from "../shopify.server";
// // // // // import prisma from "../db.server";

// // // // // export const loader = async ({ request }) => {
// // // // //   const { session } = await authenticate.admin(request);
// // // // //   const url = new URL(request.url);
// // // // //   const videoId = url.searchParams.get("videoId");

// // // // //   try {
// // // // //     // If videoId is provided, get products for specific video
// // // // //     if (videoId) {
// // // // //       console.log(`🔄 Loading products for video ${videoId}`);

// // // // //       const videoWithProducts = await prisma.mediaFile.findUnique({
// // // // //         where: { 
// // // // //           id: parseInt(videoId),
// // // // //           sessionId: session.id 
// // // // //         },
// // // // //         include: {
// // // // //           videoProducts: {
// // // // //             include: {
// // // // //               product: true
// // // // //             }
// // // // //           }
// // // // //         }
// // // // //       });

// // // // //       if (!videoWithProducts) {
// // // // //         return json({ 
// // // // //           success: false, 
// // // // //           error: "Video not found" 
// // // // //         }, { status: 404 });
// // // // //       }

// // // // //       const products = videoWithProducts.videoProducts.map(vp => vp.product);

// // // // //       return json({
// // // // //         success: true,
// // // // //         products,
// // // // //         video: {
// // // // //           id: videoWithProducts.id,
// // // // //           title: videoWithProducts.title,
// // // // //           productsCount: products.length
// // // // //         }
// // // // //       });
// // // // //     } else {
// // // // //       // If no videoId provided, get all products from all videos for this shop
// // // // //       console.log(`🔄 Loading all products from all videos for shop ${session.shop}`);

// // // // //       const allVideoProducts = await prisma.videoProduct.findMany({
// // // // //         where: {
// // // // //           mediaFile: {
// // // // //             sessionId: session.id
// // // // //           }
// // // // //         },
// // // // //         include: {
// // // // //           product: true,
// // // // //           mediaFile: {
// // // // //             select: {
// // // // //               id: true,
// // // // //               title: true
// // // // //             }
// // // // //           }
// // // // //         }
// // // // //       });

// // // // //       const products = allVideoProducts.map(vp => vp.product);
      
// // // // //       // Remove duplicates (same product might be associated with multiple videos)
// // // // //       const uniqueProducts = products.filter((product, index, self) => 
// // // // //         index === self.findIndex(p => p.id === product.id)
// // // // //       );

// // // // //       return json({
// // // // //         success: true,
// // // // //         products: uniqueProducts,
// // // // //         totalProducts: uniqueProducts.length,
// // // // //         totalAssociations: allVideoProducts.length
// // // // //       });
// // // // //     }

// // // // //   } catch (error) {
// // // // //     console.error("❌ Error loading video products:", error);
// // // // //     return json({ 
// // // // //       success: false, 
// // // // //       error: error.message 
// // // // //     }, { status: 500 });
// // // // //   }
// // // // // };





// // // // import { json } from "@remix-run/node";
// // // // import { authenticate } from "../shopify.server";
// // // // import prisma from "../db.server";

// // // // export const loader = async ({ request }) => {
// // // //   const { session } = await authenticate.admin(request);
// // // //   const url = new URL(request.url);
// // // //   const videoId = url.searchParams.get("videoId"); // can be passed when needed

// // // //   try {
// // // //     // If a specific videoId is provided
// // // //     if (videoId) {
// // // //       console.log(`🎥 Fetching products for video ID: ${videoId}`);

// // // //       const videoWithProducts = await prisma.mediaFile.findUnique({
// // // //         where: {
// // // //           id: parseInt(videoId),
// // // //         },
// // // //         include: {
// // // //           videoProducts: {
// // // //             include: {
// // // //               product: true,
// // // //             },
// // // //           },
// // // //         },
// // // //       });

// // // //       if (!videoWithProducts) {
// // // //         return json({ success: false, error: "Video not found" }, { status: 404 });
// // // //       }

// // // //       const products = videoWithProducts.videoProducts.map((vp) => vp.product);

// // // //       return json({
// // // //         success: true,
// // // //         videoId: videoWithProducts.id,
// // // //         products,
// // // //       });
// // // //     }

// // // //     // Otherwise — return list of all videos, each with its own products
// // // //     console.log(`🎞️ Fetching all videos and their products for shop ${session.shop}`);

// // // //     const videosWithProducts = await prisma.mediaFile.findMany({
// // // //       where: { sessionId: session.id },
// // // //       include: {
// // // //         videoProducts: {
// // // //           include: {
// // // //             product: true,
// // // //           },
// // // //         },
// // // //       },
// // // //     });

// // // //     // Structure: each video has its own product list
// // // //     const result = videosWithProducts.map((video) => ({
// // // //       id: video.id,
// // // //       title: video.title,
// // // //       products: video.videoProducts.map((vp) => vp.product),
// // // //     }));

// // // //     return json({
// // // //       success: true,
// // // //       videos: result,
// // // //     });
// // // //   } catch (error) {
// // // //     console.error("❌ Error loading video products:", error);
// // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // //   }
// // // // };




// // // // app/routes/api.showproducts-onvideos.js
// // // import { json } from "@remix-run/node";
// // // import { authenticate } from "../shopify.server";
// // // import prisma from "../db.server";

// // // export const loader = async ({ request }) => {
// // //   const { session } = await authenticate.admin(request);
// // //   const url = new URL(request.url);
// // //   const videoId = url.searchParams.get("videoId");

// // //   try {
// // //     if (videoId) {
// // //       console.log(`🔄 Loading products for video ${videoId}`);

// // //       const videoWithProducts = await prisma.mediaFile.findUnique({
// // //         where: { 
// // //           id: parseInt(videoId),
// // //           sessionId: session.id 
// // //         },
// // //         include: {
// // //           videoProducts: {
// // //             include: {
// // //               product: true
// // //             }
// // //           }
// // //         }
// // //       });

// // //       if (!videoWithProducts) {
// // //         return json({ 
// // //           success: false, 
// // //           error: "Video not found" 
// // //         }, { status: 404 });
// // //       }

// // //       const products = videoWithProducts.videoProducts.map(vp => vp.product);

// // //       return json({
// // //         success: true,
// // //         products,
// // //         video: {
// // //           id: videoWithProducts.id,
// // //           title: videoWithProducts.title,
// // //           productsCount: products.length
// // //         }
// // //       });
// // //     } else {
// // //       // Get all products grouped by video for the shop
// // //       console.log(`🔄 Loading all products from all videos for shop ${session.shop}`);

// // //       const allVideoProducts = await prisma.videoProduct.findMany({
// // //         where: {
// // //           mediaFile: {
// // //             sessionId: session.id
// // //           }
// // //         },
// // //         include: {
// // //           product: true,
// // //           mediaFile: {
// // //             select: {
// // //               id: true,
// // //               title: true
// // //             }
// // //           }
// // //         }
// // //       });

// // //       // Group by video
// // //       const videoMap = {};
// // //       allVideoProducts.forEach(vp => {
// // //         const vid = vp.mediaFile.id;
// // //         if (!videoMap[vid]) {
// // //           videoMap[vid] = {
// // //             video: {
// // //               id: vp.mediaFile.id,
// // //               title: vp.mediaFile.title,
// // //               productsCount: 0
// // //             },
// // //             products: []
// // //           };
// // //         }
// // //         videoMap[vid].products.push(vp.product);
// // //         videoMap[vid].video.productsCount = videoMap[vid].products.length;
// // //       });

// // //       return json({
// // //         success: true,
// // //         videoProducts: Object.values(videoMap),
// // //         totalAssociations: allVideoProducts.length
// // //       });
// // //     }

// // //   } catch (error) {
// // //     console.error("❌ Error loading video products:", error);
// // //     return json({ 
// // //       success: false, 
// // //       error: error.message 
// // //     }, { status: 500 });
// // //   }
// // // };




// // // app/routes/api.showproducts-onvideos.jsx

// // import { json } from "@remix-run/node";
// // import { authenticate } from "../shopify.server";
// // import prisma from "../db.server";

// // export const loader = async ({ request }) => {
// //   const { session } = await authenticate.admin(request);
// //   const url = new URL(request.url);
// //   const videoId = url.searchParams.get("videoId");

// //   try {
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
// //       // Get all products grouped by video for the shop
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

// //       // Group by video
// //       const videoMap = {};
// //       allVideoProducts.forEach(vp => {
// //         const vid = vp.mediaFile.id;
// //         if (!videoMap[vid]) {
// //           videoMap[vid] = {
// //             video: {
// //               id: vp.mediaFile.id,
// //               title: vp.mediaFile.title,
// //               productsCount: 0
// //             },
// //             products: []
// //           };
// //         }
// //         videoMap[vid].products.push(vp.product);
// //         videoMap[vid].video.productsCount = videoMap[vid].products.length;
// //       });

// //       return json({
// //         success: true,
// //         videoProducts: Object.values(videoMap),
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





// // app/routes/api.showproducts-onvideos.jsx

// // api.show-excluded-products.jsx
// import { json } from "@remix-run/node";
// import { getAuth } from "@clerk/remix/ssr.server";
// import prisma from "../db.server.js";
// import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';

// export const loader = async ({ request }) => {
//   const { userId } = await getAuth(request);
//   if (!userId) {
//     return json({ success: false, error: "Unauthorized" }, { status: 401 });
//   }

//   const session = await prisma.session.findFirst({ where: { clerkUserId: userId } });
//   if (!session) {
//     return json({ success: false, error: "Session not found" }, { status: 404 });
//   }

//   // Create shopify and admin here (if needed; not used in this API)
//   const shopify = shopifyApi({
//     apiKey: process.env.SHOPIFY_API_KEY,
//     apiSecretKey: process.env.SHOPIFY_API_SECRET,
//     hostName: process.env.SHOPIFY_APP_URL.replace('https://', ''),
//     apiVersion: LATEST_API_VERSION,
//     isEmbeddedApp: false,
//   });
//   const admin = new shopify.clients.Graphql({ shop: session.shop, accessToken: session.accessToken });

//   const url = new URL(request.url);
//   const videoId = url.searchParams.get("videoId");

//   try {
//     if (videoId) {
//       const video = await prisma.mediaFile.findUnique({
//         where: { 
//           id: parseInt(videoId),
//           sessionId: session.id 
//         },
//         include: {
//           excludedProducts: {
//             include: {
//               product: true
//             }
//           }
//         }
//       });

//       if (!video) {
//         return json({ success: false, error: "Video not found" }, { status: 404 });
//       }

//       const excluded = video.excludedProducts.map(ep => ep.product);

//       return json({
//         success: true,
//         video: {
//           id: video.id,
//           title: video.title,
//           excludedCount: excluded.length
//         },
//         excluded
//       });
//     } else {
//       const allExcluded = await prisma.excludedProduct.findMany({
//         where: {
//           mediaFile: {
//             sessionId: session.id
//           }
//         },
//         include: {
//           product: true,
//           mediaFile: {
//             select: {
//               id: true,
//               title: true
//             }
//           }
//         }
//       });

//       const videoMap = {};
//       allExcluded.forEach(ep => {
//         const vid = ep.mediaFile.id;
//         if (!videoMap[vid]) {
//           videoMap[vid] = {
//             video: {
//               id: ep.mediaFile.id,
//               title: ep.mediaFile.title,
//               excludedCount: 0
//             },
//             excluded: []
//           };
//         }
//         videoMap[vid].excluded.push(ep.product);
//         videoMap[vid].video.excludedCount = videoMap[vid].excluded.length;
//       });

//       return json({
//         success: true,
//         videoExcludeds: Object.values(videoMap),
//         totalExclusions: allExcluded.length
//       });
//     }
//   } catch (error) {
//     console.error("❌ Error loading video excluded products:", error);
//     return json({ 
//       success: false, 
//       error: error.message 
//     }, { status: 500 });
//   }
// };