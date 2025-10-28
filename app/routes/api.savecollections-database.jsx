


// // app/routes/api.savecollections-database.js
// import { json } from "@remix-run/node";
// import { authenticate } from "../shopify.server";
// import prisma from "../db.server";

// export const action = async ({ request }) => {
//   const { session, admin } = await authenticate.admin(request);
//   const body = await request.json();
//   const { collectionIds, videoId } = body;

//   if (!videoId || !Array.isArray(collectionIds) || collectionIds.length === 0) {
//     return json({ success: false, error: "Invalid input" }, { status: 400 });
//   }

//   try {
//     const video = await prisma.mediaFile.findUnique({
//       where: { id: parseInt(videoId), sessionId: session.id }
//     });

//     if (!video) {
//       return json({ success: false, error: "Video not found" }, { status: 404 });
//     }

//     for (const shopifyId of collectionIds) {
//       // Always fetch from Shopify to get up-to-date data
//       const response = await admin.graphql(`
//         query {
//           collection(id: "${shopifyId}") {
//             title
//             image {
//               url
//             }
//             products(first: 250) {
//               edges {
//                 node {
//                   variants(first: 250) {
//                     edges {
//                       node {
//                         id
//                       }
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       `);

//       const data = await response.json();
//       if (data.errors || !data.data.collection) {
//         throw new Error("Collection not found in Shopify or GraphQL error");
//       }

//       const coll = data.data.collection;
//       const variantIds = coll.products.edges.flatMap(e => e.node.variants.edges.map(v => v.node.id));

//       let collection = await prisma.collection.findFirst({
//         where: { shopify_collection_id: shopifyId, sessionId: session.id }
//       });

//       if (!collection) {
//         collection = await prisma.collection.create({
//           data: {
//             sessionId: session.id,
//             shopify_collection_id: shopifyId,
//             title: coll.title,
//             image_url: coll.image?.url || null,
//             shopify_collection_products_variant_ids: variantIds
//           }
//         });
//       } else {
//         collection = await prisma.collection.update({
//           where: { id: collection.id },
//           data: {
//             title: coll.title,
//             image_url: coll.image?.url || null,
//             shopify_collection_products_variant_ids: { set: variantIds }
//           }
//         });
//       }

//       await prisma.videoCollection.upsert({
//         where: {
//           video_id_collection_id: {
//             video_id: video.id,
//             collection_id: collection.id
//           }
//         },
//         create: {
//           video_id: video.id,
//           collection_id: collection.id
//         },
//         update: {}
//       });
//     }

//     const updatedVideo = await prisma.mediaFile.findUnique({
//       where: { id: video.id },
//       include: {
//         videoCollections: {
//           include: { collection: true }
//         }
//       }
//     });

//     return json({
//       success: true,
//       video: {
//         id: updatedVideo.id,
//         title: updatedVideo.title,
//         collections: updatedVideo.videoCollections.map(vc => vc.collection),
//         collectionsCount: updatedVideo.videoCollections.length
//       }
//     });
//   } catch (error) {
//     console.error("Error saving collections:", error);
//     return json({ success: false, error: error.message }, { status: 500 });
//   }
// };






import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import prisma from "../db.server";

export const action = async ({ request }) => {
  const { session, admin } = await authenticate.admin(request);
  const body = await request.json();
  const { collectionIds, videoId } = body;

  if (!videoId || !Array.isArray(collectionIds) || collectionIds.length === 0) {
    return json({ success: false, error: "Invalid input" }, { status: 400 });
  }

  try {
    // Verify the video exists
    const video = await prisma.mediaFile.findUnique({
      where: { id: parseInt(videoId), sessionId: session.id },
    });

    if (!video) {
      return json({ success: false, error: "Video not found" }, { status: 404 });
    }

    // Process each collection
    for (const shopifyId of collectionIds) {
      // Fetch collection and product data from Shopify
      const response = await admin.graphql(`
        query {
          collection(id: "${shopifyId}") {
            id
            title
            image {
              url
            }
            products(first: 250) {
              edges {
                node {
                  id
                  title
                  variants(first: 250) {
                    edges {
                      node {
                        id
                        price
                        image {
                          url
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `);

      const data = await response.json();
      if (data.errors || !data.data.collection) {
        throw new Error(`Collection not found in Shopify or GraphQL error for ID: ${shopifyId}`);
      }

      const coll = data.data.collection;
      const products = coll.products.edges.map((e) => ({
        shopify_product_id: e.node.id,
        title: e.node.title,
        variants: e.node.variants.edges.map((v) => ({
          shopify_variant_id: v.node.id,
          price: parseFloat(v.node.price),
          image_url: v.node.image?.url || coll.image?.url || null,
        })),
      }));

      // Create or update the Collection record
      let collection = await prisma.collection.findFirst({
        where: { shopify_collection_id: shopifyId, sessionId: session.id },
      });

      if (!collection) {
        collection = await prisma.collection.create({
          data: {
            sessionId: session.id,
            shopify_collection_id: shopifyId,
            title: coll.title,
            image_url: coll.image?.url || null,
          },
        });
      } else {
        collection = await prisma.collection.update({
          where: { id: collection.id },
          data: {
            title: coll.title,
            image_url: coll.image?.url || null,
          },
        });
      }

      // Create or update Product records and CollectionProduct associations
      for (const productData of products) {
        for (const variant of productData.variants) {
          // Find or create the Product record
          let product = await prisma.product.findFirst({
            where: {
              shopify_product_id: productData.shopify_product_id,
              shopify_variant_id: variant.shopify_variant_id,
              sessionId: session.id,
            },
          });

          if (!product) {
            product = await prisma.product.create({
              data: {
                sessionId: session.id,
                shopify_product_id: productData.shopify_product_id,
                shopify_variant_id: variant.shopify_variant_id,
                title: productData.title,
                price: variant.price,
                image_url: variant.image_url,
              },
            });
          } else {
            product = await prisma.product.update({
              where: { id: product.id },
              data: {
                title: productData.title,
                price: variant.price,
                image_url: variant.image_url,
              },
            });
          }

          // Create CollectionProduct association
          await prisma.collectionProduct.upsert({
            where: {
              video_id_collection_id_product_id: {
                video_id: video.id,
                collection_id: collection.id,
                product_id: product.id,
              },
            },
            create: {
              video_id: video.id,
              collection_id: collection.id,
              product_id: product.id,
            },
            update: {},
          });
        }
      }

      // Create VideoCollection association
      await prisma.videoCollection.upsert({
        where: {
          video_id_collection_id: {
            video_id: video.id,
            collection_id: collection.id,
          },
        },
        create: {
          video_id: video.id,
          collection_id: collection.id,
        },
        update: {},
      });
    }

    // Clean up CollectionProduct entries for collections no longer associated
    const existingVideoCollections = await prisma.videoCollection.findMany({
      where: { video_id: video.id },
      select: { collection_id: true },
    });
    const currentCollectionIds = existingVideoCollections.map((vc) => vc.collection_id);

    await prisma.collectionProduct.deleteMany({
      where: {
        video_id: video.id,
        collection_id: { notIn: currentCollectionIds },
      },
    });

    // Fetch the updated video with collections
    const updatedVideo = await prisma.mediaFile.findUnique({
      where: { id: video.id },
      include: {
        videoCollections: {
          include: { collection: true },
        },
      },
    });

    return json({
      success: true,
      video: {
        id: updatedVideo.id,
        title: updatedVideo.title,
        collections: updatedVideo.videoCollections.map((vc) => vc.collection),
        collectionsCount: updatedVideo.videoCollections.length,
      },
    });
  } catch (error) {
    console.error("Error saving collections:", error);
    return json({ success: false, error: error.message }, { status: 500 });
  }
};