// // // // // // // import { json } from "@remix-run/node";
// // // // // // // import { authenticate } from "../shopify.server";
// // // // // // // import prisma from "../db.server";

// // // // // // // async function getProduct(admin, gid) {
// // // // // // //   const productFields = `
// // // // // // //     id
// // // // // // //     title
// // // // // // //     featuredImage {
// // // // // // //       url
// // // // // // //     }
// // // // // // //     priceRange {
// // // // // // //       minVariantPrice {
// // // // // // //         amount
// // // // // // //         currencyCode
// // // // // // //       }
// // // // // // //     }
// // // // // // //     variants(first: 1) {
// // // // // // //       edges {
// // // // // // //         node {
// // // // // // //           id
// // // // // // //         }
// // // // // // //       }
// // // // // // //     }
// // // // // // //   `;
// // // // // // //   const response = await admin.graphql(`query {
// // // // // // //     product(id: "${gid}") {
// // // // // // //       ${productFields}
// // // // // // //     }
// // // // // // //   }`);
// // // // // // //   const data = await response.json();
// // // // // // //   const p = data.data.product;
// // // // // // //   if (!p) return null;
// // // // // // //   return {
// // // // // // //     shopify_id: p.id,
// // // // // // //     title: p.title,
// // // // // // //     image_url: p.featuredImage?.url || null,
// // // // // // //     price: p.priceRange.minVariantPrice.amount,
// // // // // // //     currency_code: p.priceRange.minVariantPrice.currencyCode,
// // // // // // //     variant_id: p.variants.edges[0]?.node.id || null
// // // // // // //   };
// // // // // // // }

// // // // // // // async function getCollectionProducts(admin, gid, excluded) {
// // // // // // //   const productFields = `
// // // // // // //     id
// // // // // // //     title
// // // // // // //     featuredImage {
// // // // // // //       url
// // // // // // //     }
// // // // // // //     priceRange {
// // // // // // //       minVariantPrice {
// // // // // // //         amount
// // // // // // //         currencyCode
// // // // // // //       }
// // // // // // //     }
// // // // // // //     variants(first: 1) {
// // // // // // //       edges {
// // // // // // //         node {
// // // // // // //           id
// // // // // // //         }
// // // // // // //       }
// // // // // // //     }
// // // // // // //   `;
// // // // // // //   const response = await admin.graphql(`query {
// // // // // // //     collection(id: "${gid}") {
// // // // // // //       products(first: 50) {
// // // // // // //         edges {
// // // // // // //           node {
// // // // // // //             ${productFields}
// // // // // // //           }
// // // // // // //         }
// // // // // // //       }
// // // // // // //     }
// // // // // // //   }`);
// // // // // // //   const data = await response.json();
// // // // // // //   const products = data.data.collection?.products.edges.map(e => e.node) || [];
// // // // // // //   return products.filter(p => !excluded.includes(p.id)).map(p => ({
// // // // // // //     shopify_id: p.id,
// // // // // // //     title: p.title,
// // // // // // //     image_url: p.featuredImage?.url || null,
// // // // // // //     price: p.priceRange.minVariantPrice.amount,
// // // // // // //     currency_code: p.priceRange.minVariantPrice.currencyCode,
// // // // // // //     variant_id: p.variants.edges[0]?.node.id || null
// // // // // // //   }));
// // // // // // // }

// // // // // // // export const loader = async ({ request }) => {
// // // // // // //   const { session, admin } = await authenticate.public.appProxy(request);
// // // // // // //   if (!session?.id) {
// // // // // // //     return json({ success: false, error: "No session" }, { status: 401 });
// // // // // // //   }

// // // // // // //   const url = new URL(request.url);
// // // // // // //   const mediaFileId = parseInt(url.searchParams.get("mediaFileId"));
// // // // // // //   if (isNaN(mediaFileId)) {
// // // // // // //     return json({ success: false, error: "Invalid mediaFileId" }, { status: 400 });
// // // // // // //   }

// // // // // // //   try {
// // // // // // //     const video = await prisma.mediaFile.findUnique({
// // // // // // //       where: { id: mediaFileId, sessionId: session.id },
// // // // // // //       include: {
// // // // // // //         videoProducts: { include: { product: true } },
// // // // // // //         videoCollections: { include: { collection: true } },
// // // // // // //         excludedProducts: { include: { product: true } },
// // // // // // //       },
// // // // // // //     });

// // // // // // //     if (!video) {
// // // // // // //       return json({ success: false, error: "Video not found" }, { status: 404 });
// // // // // // //     }

// // // // // // //     const directGids = video.videoProducts.map(vp => vp.product.shopify_product_id);
// // // // // // //     const excluded = video.excludedProducts.map(ep => ep.product.shopify_product_id);
// // // // // // //     const collectionGids = video.videoCollections.map(vc => vc.collection.shopify_collection_id);

// // // // // // //     let effective = [];

// // // // // // //     // Fetch direct products
// // // // // // //     for (const gid of directGids) {
// // // // // // //       const p = await getProduct(admin, gid);
// // // // // // //       if (p) effective.push(p);
// // // // // // //     }

// // // // // // //     // Fetch collection products
// // // // // // //     for (const cid of collectionGids) {
// // // // // // //       const cps = await getCollectionProducts(admin, cid, excluded);
// // // // // // //       effective.push(...cps);
// // // // // // //     }

// // // // // // //     // Unique by shopify_id
// // // // // // //     const uniqueMap = new Map(effective.map(p => [p.shopify_id, p]));
// // // // // // //     effective = Array.from(uniqueMap.values());

// // // // // // //     return json({ success: true, products: effective });
// // // // // // //   } catch (error) {
// // // // // // //     console.error("Loader error:", error);
// // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // //   } finally {
// // // // // // //     await prisma.$disconnect();
// // // // // // //   }
// // // // // // // };






// // // // // // import { json } from "@remix-run/node";
// // // // // // import { authenticate } from "../shopify.server";
// // // // // // import prisma from "../db.server";

// // // // // // async function getProduct(admin, gid) {
// // // // // //   const productFields = `
// // // // // //     id
// // // // // //     title
// // // // // //     featuredImage {
// // // // // //       url
// // // // // //     }
// // // // // //     priceRange {
// // // // // //       minVariantPrice {
// // // // // //         amount
// // // // // //         currencyCode
// // // // // //       }
// // // // // //     }
// // // // // //     variants(first: 1) {
// // // // // //       edges {
// // // // // //         node {
// // // // // //           id
// // // // // //         }
// // // // // //       }
// // // // // //     }
// // // // // //   `;
// // // // // //   const response = await admin.graphql(`query {
// // // // // //     product(id: "${gid}") {
// // // // // //       ${productFields}
// // // // // //     }
// // // // // //   }`);
// // // // // //   const data = await response.json();
// // // // // //   const p = data.data.product;
// // // // // //   if (!p) return null;
// // // // // //   return {
// // // // // //     shopify_id: p.id,
// // // // // //     title: p.title,
// // // // // //     image_url: p.featuredImage?.url || null,
// // // // // //     price: p.priceRange.minVariantPrice.amount,
// // // // // //     currency_code: p.priceRange.minVariantPrice.currencyCode,
// // // // // //     variant_id: p.variants.edges[0]?.node.id || null
// // // // // //   };
// // // // // // }

// // // // // // async function getCollectionProducts(admin, gid, excluded) {
// // // // // //   const productFields = `
// // // // // //     id
// // // // // //     title
// // // // // //     featuredImage {
// // // // // //       url
// // // // // //     }
// // // // // //     priceRange {
// // // // // //       minVariantPrice {
// // // // // //         amount
// // // // // //         currencyCode
// // // // // //       }
// // // // // //     }
// // // // // //     variants(first: 1) {
// // // // // //       edges {
// // // // // //         node {
// // // // // //           id
// // // // // //         }
// // // // // //       }
// // // // // //     }
// // // // // //   `;
// // // // // //   const response = await admin.graphql(`query {
// // // // // //     collection(id: "${gid}") {
// // // // // //       products(first: 50) {
// // // // // //         edges {
// // // // // //           node {
// // // // // //             ${productFields}
// // // // // //           }
// // // // // //         }
// // // // // //       }
// // // // // //     }
// // // // // //   }`);
// // // // // //   const data = await response.json();
// // // // // //   const products = data.data.collection?.products.edges.map(e => e.node) || [];
// // // // // //   return products.filter(p => !excluded.includes(p.id)).map(p => ({
// // // // // //     shopify_id: p.id,
// // // // // //     title: p.title,
// // // // // //     image_url: p.featuredImage?.url || null,
// // // // // //     price: p.priceRange.minVariantPrice.amount,
// // // // // //     currency_code: p.priceRange.minVariantPrice.currencyCode,
// // // // // //     variant_id: p.variants.edges[0]?.node.id || null
// // // // // //   }));
// // // // // // }

// // // // // // export const loader = async ({ request }) => {
// // // // // //   const { session, admin } = await authenticate.public.appProxy(request);
// // // // // //   if (!session?.id) {
// // // // // //     return json({ success: false, error: "No session" }, { status: 401 });
// // // // // //   }

// // // // // //   const url = new URL(request.url);
// // // // // //   const mediaFileId = parseInt(url.searchParams.get("mediaFileId"));
// // // // // //   if (isNaN(mediaFileId)) {
// // // // // //     return json({ success: false, error: "Invalid mediaFileId" }, { status: 400 });
// // // // // //   }

// // // // // //   try {
// // // // // //     const video = await prisma.mediaFile.findUnique({
// // // // // //       where: { id: mediaFileId, sessionId: session.id },
// // // // // //       include: {
// // // // // //         videoProducts: { include: { product: true } },
// // // // // //         videoCollections: { include: { collection: true } },
// // // // // //         excludedProducts: { include: { product: true } },
// // // // // //       },
// // // // // //     });

// // // // // //     if (!video) {
// // // // // //       return json({ success: false, error: "Video not found" }, { status: 404 });
// // // // // //     }

// // // // // //     const directGids = video.videoProducts.map(vp => vp.product.shopify_product_id);
// // // // // //     const excluded = video.excludedProducts.map(ep => ep.product.shopify_product_id);
// // // // // //     const collectionGids = video.videoCollections.map(vc => vc.collection.shopify_collection_id);

// // // // // //     let effective = [];

// // // // // //     // Fetch direct products
// // // // // //     for (const gid of directGids) {
// // // // // //       const p = await getProduct(admin, gid);
// // // // // //       if (p) effective.push(p);
// // // // // //     }

// // // // // //     // Fetch collection products
// // // // // //     for (const cid of collectionGids) {
// // // // // //       const cps = await getCollectionProducts(admin, cid, excluded);
// // // // // //       effective.push(...cps);
// // // // // //     }

// // // // // //     // Unique by shopify_id
// // // // // //     const uniqueMap = new Map(effective.map(p => [p.shopify_id, p]));
// // // // // //     effective = Array.from(uniqueMap.values());

// // // // // //     return json({ success: true, products: effective });
// // // // // //   } catch (error) {
// // // // // //     console.error("Loader error:", error);
// // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // //   } finally {
// // // // // //     await prisma.$disconnect();
// // // // // //   }
// // // // // // };







// // // // // import { json } from "@remix-run/node";
// // // // // import { authenticate } from "../shopify.server";
// // // // // import prisma from "../db.server";

// // // // // async function getProduct(admin, gid) {
// // // // //   console.log(`Fetching product with GID: ${gid}`);
// // // // //   const productFields = `
// // // // //     id
// // // // //     title
// // // // //     featuredImage {
// // // // //       url
// // // // //     }
// // // // //     priceRange {
// // // // //       minVariantPrice {
// // // // //         amount
// // // // //         currencyCode
// // // // //       }
// // // // //     }
// // // // //     variants(first: 1) {
// // // // //       edges {
// // // // //         node {
// // // // //           id
// // // // //         }
// // // // //       }
// // // // //     }
// // // // //   `;
// // // // //   try {
// // // // //     const response = await admin.graphql(`query {
// // // // //       product(id: "${gid}") {
// // // // //         ${productFields}
// // // // //       }
// // // // //     }`);
// // // // //     const data = await response.json();
// // // // //     if (data.errors) {
// // // // //       console.error("GraphQL errors for product:", data.errors);
// // // // //       return null;
// // // // //     }
// // // // //     const p = data.data.product;
// // // // //     if (!p) {
// // // // //       console.log(`No product found for GID: ${gid}`);
// // // // //       return null;
// // // // //     }
// // // // //     return {
// // // // //       shopify_id: p.id,
// // // // //       title: p.title,
// // // // //       image_url: p.featuredImage?.url || null,
// // // // //       price: p.priceRange.minVariantPrice.amount,
// // // // //       currency_code: p.priceRange.minVariantPrice.currencyCode,
// // // // //       variant_id: p.variants.edges[0]?.node.id || null,
// // // // //     };
// // // // //   } catch (error) {
// // // // //     console.error("Error in getProduct:", error);
// // // // //     return null;
// // // // //   }
// // // // // }

// // // // // async function getCollectionProducts(admin, gid, excluded) {
// // // // //   console.log(`Fetching products for collection GID: ${gid}, excluding:`, excluded);
// // // // //   const productFields = `
// // // // //     id
// // // // //     title
// // // // //     featuredImage {
// // // // //       url
// // // // //     }
// // // // //     priceRange {
// // // // //       minVariantPrice {
// // // // //         amount
// // // // //         currencyCode
// // // // //       }
// // // // //     }
// // // // //     variants(first: 1) {
// // // // //       edges {
// // // // //         node {
// // // // //           id
// // // // //         }
// // // // //       }
// // // // //     }
// // // // //   `;
// // // // //   try {
// // // // //     const response = await admin.graphql(`query {
// // // // //       collection(id: "${gid}") {
// // // // //         products(first: 50) {
// // // // //           edges {
// // // // //             node {
// // // // //               ${productFields}
// // // // //             }
// // // // //           }
// // // // //         }
// // // // //       }
// // // // //     }`);
// // // // //     const data = await response.json();
// // // // //     if (data.errors) {
// // // // //       console.error("GraphQL errors for collection:", data.errors);
// // // // //       return [];
// // // // //     }
// // // // //     const products = data.data.collection?.products.edges.map(e => e.node) || [];
// // // // //     return products
// // // // //       .filter(p => !excluded.includes(p.id))
// // // // //       .map(p => ({
// // // // //         shopify_id: p.id,
// // // // //         title: p.title,
// // // // //         image_url: p.featuredImage?.url || null,
// // // // //         price: p.priceRange.minVariantPrice.amount,
// // // // //         currency_code: p.priceRange.minVariantPrice.currencyCode,
// // // // //         variant_id: p.variants.edges[0]?.node.id || null,
// // // // //       }));
// // // // //   } catch (error) {
// // // // //     console.error("Error in getCollectionProducts:", error);
// // // // //     return [];
// // // // //   }
// // // // // }

// // // // // export const loader = async ({ request }) => {
// // // // //   console.log("Received request for /a/extension-products:", new URL(request.url).toString());
// // // // //   const { session, admin } = await authenticate.public.appProxy(request);
// // // // //   if (!session?.id) {
// // // // //     console.log("No session found");
// // // // //     return json({ success: false, error: "No session" }, { status: 401 });
// // // // //   }

// // // // //   const url = new URL(request.url);
// // // // //   const mediaFileId = parseInt(url.searchParams.get("mediaFileId"));
// // // // //   if (isNaN(mediaFileId)) {
// // // // //     console.log("Invalid mediaFileId:", url.searchParams.get("mediaFileId"));
// // // // //     return json({ success: false, error: "Invalid mediaFileId" }, { status: 400 });
// // // // //   }

// // // // //   try {
// // // // //     const video = await prisma.mediaFile.findUnique({
// // // // //       where: { id: mediaFileId, sessionId: session.id },
// // // // //       include: {
// // // // //         videoProducts: { include: { product: true } },
// // // // //         videoCollections: { include: { collection: true } },
// // // // //         excludedProducts: { include: { product: true } },
// // // // //       },
// // // // //     });

// // // // //     if (!video) {
// // // // //       console.log(`Video not found for mediaFileId: ${mediaFileId}, sessionId: ${session.id}`);
// // // // //       return json({ success: false, error: "Video not found" }, { status: 404 });
// // // // //     }

// // // // //     console.log("Found video:", video);
// // // // //     const directGids = video.videoProducts.map(vp => vp.product.shopify_product_id);
// // // // //     const excluded = video.excludedProducts.map(ep => ep.product.shopify_product_id);
// // // // //     const collectionGids = video.videoCollections.map(vc => vc.collection.shopify_collection_id);

// // // // //     let effective = [];

// // // // //     // Fetch direct products
// // // // //     for (const gid of directGids) {
// // // // //       const p = await getProduct(admin, gid);
// // // // //       if (p) effective.push(p);
// // // // //     }

// // // // //     // Fetch collection products
// // // // //     for (const cid of collectionGids) {
// // // // //       const cps = await getCollectionProducts(admin, cid, excluded);
// // // // //       effective.push(...cps);
// // // // //     }

// // // // //     // Unique by shopify_id
// // // // //     const uniqueMap = new Map(effective.map(p => [p.shopify_id, p]));
// // // // //     effective = Array.from(uniqueMap.values());

// // // // //     console.log("Returning products:", effective);
// // // // //     return json({ success: true, products: effective });
// // // // //   } catch (error) {
// // // // //     console.error("Loader error:", error);
// // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // //   } finally {
// // // // //     await prisma.$disconnect();
// // // // //   }
// // // // // };






// // // app/routes/api.extension-products.jsx
// // import { json } from "@remix-run/node";
// // import { authenticate } from "../shopify.server";
// // import { prisma } from "../db.server";

// // export async function loader({ request }) {
// //   try {
// //     console.log("🔄 Starting extension-products API...");
    
// //     const url = new URL(request.url);
// //     const mediaFileId = url.searchParams.get("mediaFileId");
    
// //     console.log("📥 Received request with mediaFileId:", mediaFileId);

// //     if (!mediaFileId) {
// //       console.log("❌ Missing mediaFileId parameter");
// //       return json({ 
// //         success: false, 
// //         error: "Missing mediaFileId parameter" 
// //       }, { status: 400 });
// //     }

// //     // Authenticate the request
// //     const { session } = await authenticate.admin(request);
// //     console.log("🔐 Authenticated session for shop:", session.shop);

// //     // Convert mediaFileId to number
// //     const videoId = parseInt(mediaFileId);
    
// //     if (isNaN(videoId)) {
// //       console.log("❌ Invalid mediaFileId:", mediaFileId);
// //       return json({ 
// //         success: false, 
// //         error: "Invalid mediaFileId" 
// //       }, { status: 400 });
// //     }

// //     console.log("🔍 Fetching products for video ID:", videoId);

// //     // Fetch products associated with the video
// //     const videoProducts = await prisma.videoProduct.findMany({
// //       where: {
// //         video_id: videoId,
// //       },
// //       include: {
// //         product: {
// //           select: {
// //             id: true,
// //             shopify_product_id: true,
// //             title: true,
// //             price: true,
// //             image_url: true,
// //           },
// //         },
// //       },
// //     });

// //     console.log("📦 Found video products:", videoProducts.length);

// //     // Format the products data
// //     const products = videoProducts.map((vp) => ({
// //       id: vp.product.id,
// //       shopify_product_id: vp.product.shopify_product_id,
// //       variant_id: `gid://shopify/ProductVariant/${vp.product.shopify_product_id}`,
// //       title: vp.product.title,
// //       price: vp.product.price.toFixed(2),
// //       image_url: vp.product.image_url,
// //       currency_code: "USD",
// //       type: "direct",
// //     }));

// //     console.log("✅ Successfully formatted products:", products.length);

// //     return json({
// //       success: true,
// //       products: products,
// //       count: products.length,
// //       videoId: videoId,
// //     });

// //   } catch (error) {
// //     console.error("❌ Error in extension-products API:", error);
    
// //     return json({
// //       success: false,
// //       error: error.message || "Internal server error",
// //       products: [],
// //     }, { status: 500 });
// //   }
// // }

// // // POST handler for product associations
// // export async function action({ request }) {
// //   try {
// //     const { session } = await authenticate.admin(request);
// //     const formData = await request.formData();
// //     const actionType = formData.get("actionType");

// //     console.log("🔄 Extension-products action:", actionType);

// //     switch (actionType) {
// //       case "associateProduct":
// //         const mediaFileId = formData.get("mediaFileId");
// //         const productId = formData.get("productId");
        
// //         console.log("🔗 Associating product", productId, "with video", mediaFileId);
        
// //         const association = await prisma.videoProduct.create({
// //           data: {
// //             video_id: parseInt(mediaFileId),
// //             product_id: parseInt(productId),
// //           },
// //         });
        
// //         return json({
// //           success: true,
// //           association: association,
// //         });

// //       case "removeProductAssociation":
// //         const associationId = formData.get("associationId");
        
// //         console.log("🚫 Removing product association:", associationId);
        
// //         await prisma.videoProduct.delete({
// //           where: {
// //             id: parseInt(associationId),
// //           },
// //         });
        
// //         return json({
// //           success: true,
// //         });

// //       default:
// //         return json({
// //           success: false,
// //           error: "Unknown action type",
// //         }, { status: 400 });
// //     }

// //   } catch (error) {
// //     console.error("❌ Error in extension-products action:", error);
    
// //     return json({
// //       success: false,
// //       error: error.message,
// //     }, { status: 500 });
// //   }
// // }



// // app/api/extension-products.jsx
// import { json } from "@remix-run/node";
// import { prisma } from "../db.server";

// export async function loader({ request }) {
//   const url = new URL(request.url);
//   const mediaFileId = url.searchParams.get("mediaFileId");

//   if (!mediaFileId) {
//     return json({ success: false, error: "Media file ID is required" });
//   }

//   const videoProducts = await prisma.videoProduct.findMany({
//     where: {
//       video_id: parseInt(mediaFileId),
//     },
//     include: {
//       product: true,
//     },
//   });

//   const products = videoProducts.map(vp => vp.product);

//   return json({
//     success: true,
//     products: products,
//   });
// }