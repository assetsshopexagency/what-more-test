// import { json } from "@remix-run/node";
// import { authenticate } from "../shopify.server.js";
// import prisma from "../db.server.js";

// const FILE_CREATE = `
//   mutation fileCreate($files: [FileCreateInput!]!) {
//     fileCreate(files: $files) {
//       files {
//         id
//         ... on Video { sources { url } }
//       }
//       userErrors { message }
//     }
//   }
// `;

// const GET_FILE_STATUS = `
//   query getFile($id: ID!) {
//     node(id: $id) {
//       ... on Video {
//         id
//         sources {
//           url
//         }
//         status
//       }
//     }
//   }
// `;

// export const action = async ({ request }) => {
//   try {
//     const { admin, session } = await authenticate.admin(request);
//     const body = await request.json();
//     const { resourceUrl, title, selectedProducts } = body;

//     // Finalize upload with Shopify
//     const resp = await admin.graphql(FILE_CREATE, {
//       variables: {
//         files: [
//           {
//             contentType: "VIDEO",
//             originalSource: resourceUrl,
//           },
//         ],
//       },
//     });
//     const data = await resp.json();

//     // Defensive: Check for errors and for file existence
//     if (
//       !data?.data?.fileCreate?.files ||
//       !Array.isArray(data.data.fileCreate.files) ||
//       !data.data.fileCreate.files[0]
//     ) {
//       return json({
//         success: false,
//         error:
//           "Shopify did not return a file object. The video might still be processing. Please wait a few seconds and try again.",
//       });
//     }

//     const createdFile = data.data.fileCreate.files[0];
//     const shopify_file_id = createdFile.id;

//     // Wait for Shopify to process the video and get the URL
//     let shopify_file_url = null;
//     let attempts = 0;
//     const maxAttempts = 30;
//     const delay = 2000;

//     while (!shopify_file_url && attempts < maxAttempts) {
//       await new Promise(resolve => setTimeout(resolve, delay));
      
//       const statusResp = await admin.graphql(GET_FILE_STATUS, {
//         variables: {
//           id: shopify_file_id,
//         },
//       });
      
//       const statusData = await statusResp.json();
//       const videoNode = statusData.data?.node;
      
//       if (videoNode?.sources && Array.isArray(videoNode.sources) && videoNode.sources.length > 0) {
//         shopify_file_url = videoNode.sources[0].url;
//         break;
//       }
      
//       attempts++;
//     }

//     if (!shopify_file_url) {
//       return json({
//         success: false,
//         error:
//           "Shopify is still processing your video and has not provided a video URL after multiple attempts. Please check your media library in a few minutes.",
//       });
//     }

//     // Save to database
//     const video = await prisma.mediaFile.create({
//       data: {
//         sessionId: session.id,
//         title: title || "",
//         shopify_file_url,
//         shopify_file_id,
//       },
//     });

//     // If there are selected products, create the relationships
//     if (selectedProducts && selectedProducts.length > 0) {
//       // Convert string IDs to numbers
//       const productIds = selectedProducts.map(id => parseInt(id, 10));
      
//       await prisma.videoProduct.createMany({
//         data: productIds.map(product_id => ({
//           video_id: video.id,
//           product_id: product_id,
//         })),
//         skipDuplicates: true,
//       });
//     }

//     return json({ 
//       success: true, 
//       file: { ...createdFile, sources: [{ url: shopify_file_url }] }, 
//       dbVideo: video 
//     });
//   } catch (err) {
//     return json({ success: false, error: err.message || "Server error" }, { status: 500 });
//   }
// };







import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import prisma from "../db.server";

const FILE_CREATE = `
  mutation fileCreate($files: [FileCreateInput!]!) {
    fileCreate(files: $files) {
      files {
        id
        ... on Video { sources { url } }
      }
      userErrors { message }
    }
  }
`;

const GET_FILE_STATUS = `
  query getFile($id: ID!) {
    node(id: $id) {
      ... on Video {
        id
        sources {
          url
        }
        status
      }
    }
  }
`;

export const action = async ({ request }) => {
  try {
    const { admin, session } = await authenticate.admin(request);
    const body = await request.json();
    const { resourceUrl, title, resourceType, selectedProducts, selectedCollections } = body;

    // Validate input
    if (!resourceUrl || !title || !resourceType) {
      return json({
        success: false,
        error: "Missing required fields: resourceUrl, title, or resourceType",
      }, { status: 400 });
    }

    // Finalize upload with Shopify
    const resp = await admin.graphql(FILE_CREATE, {
      variables: {
        files: [
          {
            contentType: resourceType.toUpperCase(), // Ensure contentType is uppercase (e.g., "VIDEO", "IMAGE")
            originalSource: resourceUrl,
          },
        ],
      },
    });
    const data = await resp.json();

    // Check for errors or missing file object
    if (
      !data?.data?.fileCreate?.files ||
      !Array.isArray(data.data.fileCreate.files) ||
      !data.data.fileCreate.files[0]
    ) {
      return json({
        success: false,
        error:
          "Shopify did not return a file object. The media might still be processing. Please wait a few seconds and try again.",
      }, { status: 500 });
    }

    const createdFile = data.data.fileCreate.files[0];
    const shopify_file_id = createdFile.id;

    // Wait for Shopify to process the media and get the URL
    let shopify_file_url = null;
    let attempts = 0;
    const maxAttempts = 30;
    const delay = 2000;

    while (!shopify_file_url && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, delay));
      
      const statusResp = await admin.graphql(GET_FILE_STATUS, {
        variables: {
          id: shopify_file_id,
        },
      });
      
      const statusData = await statusResp.json();
      const mediaNode = statusData.data?.node;
      
      if (mediaNode?.sources && Array.isArray(mediaNode.sources) && mediaNode.sources.length > 0) {
        shopify_file_url = mediaNode.sources[0].url;
        break;
      }
      
      attempts++;
    }

    if (!shopify_file_url) {
      return json({
        success: false,
        error:
          "Shopify is still processing your media and has not provided a URL after multiple attempts. Please check your media library in a few minutes.",
      }, { status: 500 });
    }

    // Save to database
    const video = await prisma.mediaFile.create({
      data: {
        sessionId: session.id,
        title: title || "",
        shopify_file_url,
        shopify_file_id,
        description: "", // Default value for optional field
        thumbnail_url: null, // Default value for optional field
        duration: 0, // Default value for optional field
        download_count: 0, // Default value for optional field
      },
    });

    // Create relationships for selected products
    if (selectedProducts && Array.isArray(selectedProducts) && selectedProducts.length > 0) {
      const productIds = selectedProducts.map(id => parseInt(id, 10)).filter(id => !isNaN(id));
      
      await prisma.videoProduct.createMany({
        data: productIds.map(product_id => ({
          video_id: video.id,
          product_id,
        })),
        skipDuplicates: true,
      });
    }

    // Create relationships for selected collections
    if (selectedCollections && Array.isArray(selectedCollections) && selectedCollections.length > 0) {
      const collectionIds = selectedCollections.map(id => parseInt(id, 10)).filter(id => !isNaN(id));
      
      // Verify collections exist in the database
      for (const collectionId of collectionIds) {
        const collection = await prisma.collection.findFirst({
          where: { id: collectionId, sessionId: session.id },
        });

        if (collection) {
          await prisma.videoCollection.upsert({
            where: {
              video_id_collection_id: {
                video_id: video.id,
                collection_id: collectionId,
              },
            },
            create: {
              video_id: video.id,
              collection_id: collectionId,
            },
            update: {},
          });
        }
      }
    }

    return json({ 
      success: true, 
      file: { ...createdFile, sources: [{ url: shopify_file_url }] }, 
      dbVideo: video 
    });
  } catch (err) {
    console.error("Error in /api/upload/complete:", err);
    return json({ success: false, error: err.message || "Server error" }, { status: 500 });
  }
};