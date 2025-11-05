// // // // // // // import { json } from "@remix-run/node";
// // // // // // // import { authenticate } from "../shopify.server.js";
// // // // // // // import prisma from "../db.server.js";

// // // // // // // const FILE_CREATE = `
// // // // // // //   mutation fileCreate($files: [FileCreateInput!]!) {
// // // // // // //     fileCreate(files: $files) {
// // // // // // //       files {
// // // // // // //         id
// // // // // // //         ... on Video { sources { url } }
// // // // // // //       }
// // // // // // //       userErrors { message }
// // // // // // //     }
// // // // // // //   }
// // // // // // // `;

// // // // // // // const GET_FILE_STATUS = `
// // // // // // //   query getFile($id: ID!) {
// // // // // // //     node(id: $id) {
// // // // // // //       ... on Video {
// // // // // // //         id
// // // // // // //         sources {
// // // // // // //           url
// // // // // // //         }
// // // // // // //         status
// // // // // // //       }
// // // // // // //     }
// // // // // // //   }
// // // // // // // `;

// // // // // // // export const action = async ({ request }) => {
// // // // // // //   try {
// // // // // // //     const { admin, session } = await authenticate.admin(request);
// // // // // // //     const body = await request.json();
// // // // // // //     const { resourceUrl, title, selectedProducts } = body;

// // // // // // //     // Finalize upload with Shopify
// // // // // // //     const resp = await admin.graphql(FILE_CREATE, {
// // // // // // //       variables: {
// // // // // // //         files: [
// // // // // // //           {
// // // // // // //             contentType: "VIDEO",
// // // // // // //             originalSource: resourceUrl,
// // // // // // //           },
// // // // // // //         ],
// // // // // // //       },
// // // // // // //     });
// // // // // // //     const data = await resp.json();

// // // // // // //     // Defensive: Check for errors and for file existence
// // // // // // //     if (
// // // // // // //       !data?.data?.fileCreate?.files ||
// // // // // // //       !Array.isArray(data.data.fileCreate.files) ||
// // // // // // //       !data.data.fileCreate.files[0]
// // // // // // //     ) {
// // // // // // //       return json({
// // // // // // //         success: false,
// // // // // // //         error:
// // // // // // //           "Shopify did not return a file object. The video might still be processing. Please wait a few seconds and try again.",
// // // // // // //       });
// // // // // // //     }

// // // // // // //     const createdFile = data.data.fileCreate.files[0];
// // // // // // //     const shopify_file_id = createdFile.id;

// // // // // // //     // Wait for Shopify to process the video and get the URL
// // // // // // //     let shopify_file_url = null;
// // // // // // //     let attempts = 0;
// // // // // // //     const maxAttempts = 30;
// // // // // // //     const delay = 2000;

// // // // // // //     while (!shopify_file_url && attempts < maxAttempts) {
// // // // // // //       await new Promise(resolve => setTimeout(resolve, delay));
      
// // // // // // //       const statusResp = await admin.graphql(GET_FILE_STATUS, {
// // // // // // //         variables: {
// // // // // // //           id: shopify_file_id,
// // // // // // //         },
// // // // // // //       });
      
// // // // // // //       const statusData = await statusResp.json();
// // // // // // //       const videoNode = statusData.data?.node;
      
// // // // // // //       if (videoNode?.sources && Array.isArray(videoNode.sources) && videoNode.sources.length > 0) {
// // // // // // //         shopify_file_url = videoNode.sources[0].url;
// // // // // // //         break;
// // // // // // //       }
      
// // // // // // //       attempts++;
// // // // // // //     }

// // // // // // //     if (!shopify_file_url) {
// // // // // // //       return json({
// // // // // // //         success: false,
// // // // // // //         error:
// // // // // // //           "Shopify is still processing your video and has not provided a video URL after multiple attempts. Please check your media library in a few minutes.",
// // // // // // //       });
// // // // // // //     }

// // // // // // //     // Save to database
// // // // // // //     const video = await prisma.mediaFile.create({
// // // // // // //       data: {
// // // // // // //         sessionId: session.id,
// // // // // // //         title: title || "",
// // // // // // //         shopify_file_url,
// // // // // // //         shopify_file_id,
// // // // // // //       },
// // // // // // //     });

// // // // // // //     // If there are selected products, create the relationships
// // // // // // //     if (selectedProducts && selectedProducts.length > 0) {
// // // // // // //       // Convert string IDs to numbers
// // // // // // //       const productIds = selectedProducts.map(id => parseInt(id, 10));
      
// // // // // // //       await prisma.videoProduct.createMany({
// // // // // // //         data: productIds.map(product_id => ({
// // // // // // //           video_id: video.id,
// // // // // // //           product_id: product_id,
// // // // // // //         })),
// // // // // // //         skipDuplicates: true,
// // // // // // //       });
// // // // // // //     }

// // // // // // //     return json({ 
// // // // // // //       success: true, 
// // // // // // //       file: { ...createdFile, sources: [{ url: shopify_file_url }] }, 
// // // // // // //       dbVideo: video 
// // // // // // //     });
// // // // // // //   } catch (err) {
// // // // // // //     return json({ success: false, error: err.message || "Server error" }, { status: 500 });
// // // // // // //   }
// // // // // // // };







// // // // // // import { json } from "@remix-run/node";
// // // // // // import { authenticate } from "../shopify.server";
// // // // // // import prisma from "../db.server";

// // // // // // const FILE_CREATE = `
// // // // // //   mutation fileCreate($files: [FileCreateInput!]!) {
// // // // // //     fileCreate(files: $files) {
// // // // // //       files {
// // // // // //         id
// // // // // //         ... on Video { sources { url } }
// // // // // //       }
// // // // // //       userErrors { message }
// // // // // //     }
// // // // // //   }
// // // // // // `;

// // // // // // const GET_FILE_STATUS = `
// // // // // //   query getFile($id: ID!) {
// // // // // //     node(id: $id) {
// // // // // //       ... on Video {
// // // // // //         id
// // // // // //         sources {
// // // // // //           url
// // // // // //         }
// // // // // //         status
// // // // // //       }
// // // // // //     }
// // // // // //   }
// // // // // // `;

// // // // // // export const action = async ({ request }) => {
// // // // // //   try {
// // // // // //     const { admin, session } = await authenticate.admin(request);
// // // // // //     const body = await request.json();
// // // // // //     const { resourceUrl, title, resourceType, selectedProducts, selectedCollections } = body;

// // // // // //     // Validate input
// // // // // //     if (!resourceUrl || !title || !resourceType) {
// // // // // //       return json({
// // // // // //         success: false,
// // // // // //         error: "Missing required fields: resourceUrl, title, or resourceType",
// // // // // //       }, { status: 400 });
// // // // // //     }

// // // // // //     // Finalize upload with Shopify
// // // // // //     const resp = await admin.graphql(FILE_CREATE, {
// // // // // //       variables: {
// // // // // //         files: [
// // // // // //           {
// // // // // //             contentType: resourceType.toUpperCase(), // Ensure contentType is uppercase (e.g., "VIDEO", "IMAGE")
// // // // // //             originalSource: resourceUrl,
// // // // // //           },
// // // // // //         ],
// // // // // //       },
// // // // // //     });
// // // // // //     const data = await resp.json();

// // // // // //     // Check for errors or missing file object
// // // // // //     if (
// // // // // //       !data?.data?.fileCreate?.files ||
// // // // // //       !Array.isArray(data.data.fileCreate.files) ||
// // // // // //       !data.data.fileCreate.files[0]
// // // // // //     ) {
// // // // // //       return json({
// // // // // //         success: false,
// // // // // //         error:
// // // // // //           "Shopify did not return a file object. The media might still be processing. Please wait a few seconds and try again.",
// // // // // //       }, { status: 500 });
// // // // // //     }

// // // // // //     const createdFile = data.data.fileCreate.files[0];
// // // // // //     const shopify_file_id = createdFile.id;

// // // // // //     // Wait for Shopify to process the media and get the URL
// // // // // //     let shopify_file_url = null;
// // // // // //     let attempts = 0;
// // // // // //     const maxAttempts = 30;
// // // // // //     const delay = 2000;

// // // // // //     while (!shopify_file_url && attempts < maxAttempts) {
// // // // // //       await new Promise(resolve => setTimeout(resolve, delay));
      
// // // // // //       const statusResp = await admin.graphql(GET_FILE_STATUS, {
// // // // // //         variables: {
// // // // // //           id: shopify_file_id,
// // // // // //         },
// // // // // //       });
      
// // // // // //       const statusData = await statusResp.json();
// // // // // //       const mediaNode = statusData.data?.node;
      
// // // // // //       if (mediaNode?.sources && Array.isArray(mediaNode.sources) && mediaNode.sources.length > 0) {
// // // // // //         shopify_file_url = mediaNode.sources[0].url;
// // // // // //         break;
// // // // // //       }
      
// // // // // //       attempts++;
// // // // // //     }

// // // // // //     if (!shopify_file_url) {
// // // // // //       return json({
// // // // // //         success: false,
// // // // // //         error:
// // // // // //           "Shopify is still processing your media and has not provided a URL after multiple attempts. Please check your media library in a few minutes.",
// // // // // //       }, { status: 500 });
// // // // // //     }

// // // // // //     // Save to database
// // // // // //     const video = await prisma.mediaFile.create({
// // // // // //       data: {
// // // // // //         sessionId: session.id,
// // // // // //         title: title || "",
// // // // // //         shopify_file_url,
// // // // // //         shopify_file_id,
// // // // // //         description: "", // Default value for optional field
// // // // // //         thumbnail_url: null, // Default value for optional field
// // // // // //         duration: 0, // Default value for optional field
// // // // // //         download_count: 0, // Default value for optional field
// // // // // //       },
// // // // // //     });

// // // // // //     // Create relationships for selected products
// // // // // //     if (selectedProducts && Array.isArray(selectedProducts) && selectedProducts.length > 0) {
// // // // // //       const productIds = selectedProducts.map(id => parseInt(id, 10)).filter(id => !isNaN(id));
      
// // // // // //       await prisma.videoProduct.createMany({
// // // // // //         data: productIds.map(product_id => ({
// // // // // //           video_id: video.id,
// // // // // //           product_id,
// // // // // //         })),
// // // // // //         skipDuplicates: true,
// // // // // //       });
// // // // // //     }

// // // // // //     // Create relationships for selected collections
// // // // // //     if (selectedCollections && Array.isArray(selectedCollections) && selectedCollections.length > 0) {
// // // // // //       const collectionIds = selectedCollections.map(id => parseInt(id, 10)).filter(id => !isNaN(id));
      
// // // // // //       // Verify collections exist in the database
// // // // // //       for (const collectionId of collectionIds) {
// // // // // //         const collection = await prisma.collection.findFirst({
// // // // // //           where: { id: collectionId, sessionId: session.id },
// // // // // //         });

// // // // // //         if (collection) {
// // // // // //           await prisma.videoCollection.upsert({
// // // // // //             where: {
// // // // // //               video_id_collection_id: {
// // // // // //                 video_id: video.id,
// // // // // //                 collection_id: collectionId,
// // // // // //               },
// // // // // //             },
// // // // // //             create: {
// // // // // //               video_id: video.id,
// // // // // //               collection_id: collectionId,
// // // // // //             },
// // // // // //             update: {},
// // // // // //           });
// // // // // //         }
// // // // // //       }
// // // // // //     }

// // // // // //     return json({ 
// // // // // //       success: true, 
// // // // // //       file: { ...createdFile, sources: [{ url: shopify_file_url }] }, 
// // // // // //       dbVideo: video 
// // // // // //     });
// // // // // //   } catch (err) {
// // // // // //     console.error("Error in /api/upload/complete:", err);
// // // // // //     return json({ success: false, error: err.message || "Server error" }, { status: 500 });
// // // // // //   }
// // // // // // };



// // // // // // app/routes/api.upload.complete.jsx

// // // // // import { json } from "@remix-run/node";
// // // // // import { authenticate } from "../shopify.server.js";
// // // // // import prisma from "../db.server.js";

// // // // // const FILE_CREATE = `
// // // // //   mutation fileCreate($files: [FileCreateInput!]!) {
// // // // //     fileCreate(files: $files) {
// // // // //       files {
// // // // //         id
// // // // //         ... on Video { sources { url } }
// // // // //       }
// // // // //       userErrors { message }
// // // // //     }
// // // // //   }
// // // // // `;

// // // // // const GET_FILE_STATUS = `
// // // // //   query getFile($id: ID!) {
// // // // //     node(id: $id) {
// // // // //       ... on Video {
// // // // //         id
// // // // //         sources {
// // // // //           url
// // // // //         }
// // // // //         status
// // // // //       }
// // // // //     }
// // // // //   }
// // // // // `;

// // // // // export const action = async ({ request }) => {
// // // // //   try {
// // // // //     const { admin, session } = await authenticate.admin(request);
// // // // //     const body = await request.json();
// // // // //     const { resourceUrl, title, selectedProducts } = body;

// // // // //     // Finalize upload with Shopify
// // // // //     const resp = await admin.graphql(FILE_CREATE, {
// // // // //       variables: {
// // // // //         files: [
// // // // //           {
// // // // //             contentType: "VIDEO",
// // // // //             originalSource: resourceUrl,
// // // // //           },
// // // // //         ],
// // // // //       },
// // // // //     });
// // // // //     const data = await resp.json();

// // // // //     // Defensive: Check for errors and for file existence
// // // // //     if (
// // // // //       !data?.data?.fileCreate?.files ||
// // // // //       !Array.isArray(data.data.fileCreate.files) ||
// // // // //       !data.data.fileCreate.files[0]
// // // // //     ) {
// // // // //       return json({
// // // // //         success: false,
// // // // //         error:
// // // // //           "Shopify did not return a file object. The video might still be processing. Please wait a few seconds and try again.",
// // // // //       });
// // // // //     }

// // // // //     const createdFile = data.data.fileCreate.files[0];
// // // // //     const shopify_file_id = createdFile.id;

// // // // //     // Wait for Shopify to process the video and get the URL
// // // // //     let shopify_file_url = null;
// // // // //     let attempts = 0;
// // // // //     const maxAttempts = 30;
// // // // //     const delay = 2000;

// // // // //     while (!shopify_file_url && attempts < maxAttempts) {
// // // // //       await new Promise(resolve => setTimeout(resolve, delay));
      
// // // // //       const statusResp = await admin.graphql(GET_FILE_STATUS, {
// // // // //         variables: { id: shopify_file_id }
// // // // //       });
// // // // //       const statusData = await statusResp.json();

// // // // //       const videoNode = statusData.data.node;
// // // // //       if (videoNode?.status === "READY" && videoNode.sources?.[0]?.url) {
// // // // //         shopify_file_url = videoNode.sources[0].url;
// // // // //       }

// // // // //       attempts++;
// // // // //     }

// // // // //     if (!shopify_file_url) {
// // // // //       return json({
// // // // //         success: false,
// // // // //         error: "Video processing timeout. Please try again later."
// // // // //       }, { status: 504 });
// // // // //     }

// // // // //     // Save to database
// // // // //     const video = await prisma.mediaFile.create({
// // // // //       data: {
// // // // //         sessionId: session.id,
// // // // //         title: title || "",
// // // // //         shopify_file_url,
// // // // //         shopify_file_id,
// // // // //         description: "", // Default value for optional field
// // // // //         thumbnail_url: null, // Default value for optional field
// // // // //         duration: 0, // Default value for optional field
// // // // //         download_count: 0, // Default value for optional field
// // // // //       },
// // // // //     });

// // // // //     // Create relationships for selected products
// // // // //     if (selectedProducts && Array.isArray(selectedProducts) && selectedProducts.length > 0) {
// // // // //       const productIds = selectedProducts.map(id => parseInt(id, 10)).filter(id => !isNaN(id));
      
// // // // //       await prisma.videoProduct.createMany({
// // // // //         data: productIds.map(product_id => ({
// // // // //           video_id: video.id,
// // // // //           product_id,
// // // // //         })),
// // // // //         skipDuplicates: true,
// // // // //       });
// // // // //     }

// // // // //     // Create relationships for selected collections
// // // // //     if (selectedCollections && Array.isArray(selectedCollections) && selectedCollections.length > 0) {
// // // // //       const collectionIds = selectedCollections.map(id => parseInt(id, 10)).filter(id => !isNaN(id));
      
// // // // //       // Verify collections exist in the database
// // // // //       for (const collectionId of collectionIds) {
// // // // //         const collection = await prisma.collection.findFirst({
// // // // //           where: { id: collectionId, sessionId: session.id },
// // // // //         });

// // // // //         if (collection) {
// // // // //           await prisma.videoCollection.upsert({
// // // // //             where: {
// // // // //               video_id_collection_id: {
// // // // //                 video_id: video.id,
// // // // //                 collection_id: collectionId,
// // // // //               },
// // // // //             },
// // // // //             create: {
// // // // //               video_id: video.id,
// // // // //               collection_id: collectionId,
// // // // //             },
// // // // //             update: {},
// // // // //           });
// // // // //         }
// // // // //       }
// // // // //     }

// // // // //     return json({ 
// // // // //       success: true, 
// // // // //       file: { ...createdFile, sources: [{ url: shopify_file_url }] }, 
// // // // //       dbVideo: video 
// // // // //     });
// // // // //   } catch (err) {
// // // // //     console.error("Error in /api/upload/complete:", err);
// // // // //     return json({ success: false, error: err.message || "Server error" }, { status: 500 });
// // // // //   }
// // // // // };





// // // // // app/routes/api.upload.complete.jsx
// // // // import { json } from "@remix-run/node";
// // // // import { getAdmin } from "../shopify.server.js";
// // // // import prisma from "../db.server.js";

// // // // const GET_FILE_STATUS = `
// // // //   query getFile($id: ID!) {
// // // //     node(id: $id) {
// // // //       ... on Video {
// // // //         id
// // // //         sources { url }
// // // //         status
// // // //       }
// // // //     }
// // // //   }
// // // // `;

// // // // export const action = async ({ request }) => {
// // // //   try {
// // // //     const { admin, session } = await getAdmin(request);
// // // //     const body = await request.json();
// // // //     const {
// // // //       resourceUrl,
// // // //       title,
// // // //       selectedProducts = [],
// // // //       selectedCollections = [],
// // // //     } = body;

// // // //     // 1. Finalize upload
// // // //     const resp = await admin.graphql(
// // // //       `mutation fileCreate($files: [FileCreateInput!]!) {
// // // //         fileCreate(files: $files) {
// // // //           files { id }
// // // //           userErrors { message }
// // // //         }
// // // //       }`,
// // // //       {
// // // //         variables: {
// // // //           files: [{ contentType: "VIDEO", originalSource: resourceUrl }],
// // // //         },
// // // //       }
// // // //     );
// // // //     const data = await resp.json();

// // // //     if (data.data?.fileCreate?.userErrors?.length) {
// // // //       return json(
// // // //         { success: false, error: data.data.fileCreate.userErrors[0].message },
// // // //         { status: 400 }
// // // //       );
// // // //     }

// // // //     const shopify_file_id = data.data.fileCreate.files[0].id;

// // // //     // 2. Poll until READY
// // // //     let shopify_file_url = null;
// // // //     let attempts = 0;
// // // //     const maxAttempts = 30;
// // // //     const delay = 2000;

// // // //     while (!shopify_file_url && attempts < maxAttempts) {
// // // //       await new Promise((r) => setTimeout(r, delay));

// // // //       const statusResp = await admin.graphql(GET_FILE_STATUS, {
// // // //         variables: { id: shopify_file_id },
// // // //       });
// // // //       const statusData = await statusResp.json();

// // // //       const video = statusData.data?.node;
// // // //       if (video?.status === "READY" && video.sources?.[0]?.url) {
// // // //         shopify_file_url = video.sources[0].url;
// // // //       }
// // // //       attempts++;
// // // //     }

// // // //     if (!shopify_file_url) {
// // // //       return json(
// // // //         { success: false, error: "Video processing timeout." },
// // // //         { status: 504 }
// // // //       );
// // // //     }

// // // //     // 3. Save to DB
// // // //     const video = await prisma.mediaFile.create({
// // // //       data: {
// // // //         sessionId: session.id,
// // // //         title: title || "",
// // // //         shopify_file_url,
// // // //         shopify_file_id,
// // // //         description: "",
// // // //         thumbnail_url: null,
// // // //         duration: 0,
// // // //         download_count: 0,
// // // //       },
// // // //     });

// // // //     // 4. Link products
// // // //     if (Array.isArray(selectedProducts) && selectedProducts.length) {
// // // //       const productIds = selectedProducts
// // // //         .map((id) => parseInt(id, 10))
// // // //         .filter((id) => !isNaN(id));

// // // //       await prisma.videoProduct.createMany({
// // // //         data: productIds.map((product_id) => ({
// // // //           video_id: video.id,
// // // //           product_id,
// // // //         })),
// // // //         skipDuplicates: true,
// // // //       });
// // // //     }

// // // //     // 5. Link collections
// // // //     if (Array.isArray(selectedCollections) && selectedCollections.length) {
// // // //       const collectionIds = selectedCollections
// // // //         .map((id) => parseInt(id, 10))
// // // //         .filter((id) => !isNaN(id));

// // // //       for (const collectionId of collectionIds) {
// // // //         const collection = await prisma.collection.findFirst({
// // // //           where: { id: collectionId, sessionId: session.id },
// // // //         });
// // // //         if (collection) {
// // // //           await prisma.videoCollection.upsert({
// // // //             where: {
// // // //               video_id_collection_id: {
// // // //                 video_id: video.id,
// // // //                 collection_id: collectionId,
// // // //               },
// // // //             },
// // // //             create: { video_id: video.id, collection_id: collectionId },
// // // //             update: {},
// // // //           });
// // // //         }
// // // //       }
// // // //     }

// // // //     return json({
// // // //       success: true,
// // // //       file: { id: shopify_file_id, sources: [{ url: shopify_file_url }] },
// // // //       dbVideo: video,
// // // //     });
// // // //   } catch (err) {
// // // //     console.error("complete error:", err);
// // // //     return json({ success: false, error: err.message || "Server error" }, { status: 500 });
// // // //   }
// // // // };





// // // // api.upload.complete.jsx
// // // import { json } from "@remix-run/node";
// // // import { getAuth } from "@clerk/remix/ssr.server";
// // // import prisma from "../db.server.js";
// // // import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';

// // // export const action = async ({ request }) => {
// // //   const { userId } = await getAuth(request);
// // //   if (!userId) {
// // //     return json({ success: false, error: "Unauthorized" }, { status: 401 });
// // //   }

// // //   const session = await prisma.session.findFirst({ where: { clerkUserId: userId } });
// // //   if (!session) {
// // //     return json({ success: false, error: "Session not found" }, { status: 404 });
// // //   }

// // //   // Create shopify and admin here
// // //   const shopify = shopifyApi({
// // //     apiKey: process.env.SHOPIFY_API_KEY,
// // //     apiSecretKey: process.env.SHOPIFY_API_SECRET,
// // //     hostName: process.env.SHOPIFY_APP_URL.replace('https://', ''),
// // //     apiVersion: LATEST_API_VERSION,
// // //     isEmbeddedApp: false,
// // //   });
// // //   const admin = new shopify.clients.Graphql({ shop: session.shop, accessToken: session.accessToken });

// // //   try {
// // //     const { resourceUrl, title, selectedProducts, selectedCollections } = await request.json();

// // //     const shopify_file_id = resourceUrl.split('/').pop().split('?')[0];

// // //     let shopify_file_url = null;
// // //     let attempts = 0;
// // //     const maxAttempts = 30;
// // //     const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// // //     while (!shopify_file_url && attempts < maxAttempts) {
// // //       const response = await admin.graphql(`
// // //         query getFile($id: ID!) {
// // //           node(id: $id) {
// // //             ... on Video {
// // //               sources {
// // //                 url
// // //               }
// // //             }
// // //           }
// // //         }
// // //       `, {
// // //         variables: { id: `gid://shopify/MediaFile/${shopify_file_id}` }
// // //       });

// // //       const data = await response.json();
// // //       shopify_file_url = data.data?.node?.sources?.[0]?.url;

// // //       if (!shopify_file_url) {
// // //         attempts++;
// // //         await delay(2000);
// // //       }
// // //     }

// // //     if (!shopify_file_url) {
// // //       return json(
// // //         { success: false, error: "Video processing timeout." },
// // //         { status: 504 }
// // //       );
// // //     }

// // //     const video = await prisma.mediaFile.create({
// // //       data: {
// // //         sessionId: session.id,
// // //         title: title || "",
// // //         shopify_file_url,
// // //         shopify_file_id,
// // //         description: "",
// // //         thumbnail_url: null,
// // //         duration: 0,
// // //         download_count: 0,
// // //       },
// // //     });

// // //     if (Array.isArray(selectedProducts) && selectedProducts.length) {
// // //       const productIds = selectedProducts
// // //         .map((id) => parseInt(id, 10))
// // //         .filter((id) => !isNaN(id));

// // //       await prisma.videoProduct.createMany({
// // //         data: productIds.map((product_id) => ({
// // //           video_id: video.id,
// // //           product_id,
// // //         })),
// // //         skipDuplicates: true,
// // //       });
// // //     }

// // //     if (Array.isArray(selectedCollections) && selectedCollections.length) {
// // //       const collectionIds = selectedCollections
// // //         .map((id) => parseInt(id, 10))
// // //         .filter((id) => !isNaN(id));

// // //       for (const collectionId of collectionIds) {
// // //         const collection = await prisma.collection.findFirst({
// // //           where: { id: collectionId, sessionId: session.id },
// // //         });
// // //         if (collection) {
// // //           await prisma.videoCollection.upsert({
// // //             where: {
// // //               video_id_collection_id: {
// // //                 video_id: video.id,
// // //                 collection_id: collectionId,
// // //               },
// // //             },
// // //             create: { video_id: video.id, collection_id: collectionId },
// // //             update: {},
// // //           });
// // //         }
// // //       }
// // //     }

// // //     return json({
// // //       success: true,
// // //       file: { id: shopify_file_id, sources: [{ url: shopify_file_url }] },
// // //       dbVideo: video,
// // //     });
// // //   } catch (err) {
// // //     console.error("complete error:", err);
// // //     return json({ success: false, error: err.message || "Server error" }, { status: 500 });
// // //   }
// // // };



// // // app/routes/api.upload.complete.js
// // import { json } from "@remix-run/node";
// // import { PrismaClient } from "@prisma/client";
// // import { getAuth } from "@clerk/remix/ssr.server";
// // import { shopify, getShopifySession } from "../shopify.server";

// // const prisma = new PrismaClient();

// // export async function action({ request }) {
// //   try {
// //     const { userId } = await getAuth(request);
// //     if (!userId) return json({ error: "Unauthorized" }, { status: 401 });

// //     const { resourceUrl, title } = await request.json();
// //     const { shop, accessToken } = await getShopifySession(userId);

// //     const client = new shopify.clients.Graphql({ shop, accessToken });

// //     const mutation = `
// //       mutation stagedUploadsComplete($input: [StagedUploadCompleteInput!]!) {
// //         stagedUploadsComplete(input: $input) {
// //           completedUploads {
// //             resourceUrl
// //           }
// //         }
// //       }
// //     `;

// //     const variables = {
// //       input: [
// //         {
// //           resourceUrl,
// //         },
// //       ],
// //     };

// //     await client.query({ data: { query: mutation, variables } });

// //     // ✅ Save to DB
// //     const session = await prisma.session.findFirst({ where: { userId } });

// //     await prisma.mediaFile.create({
// //       data: {
// //         sessionId: session.id,
// //         shopify_file_url: resourceUrl,
// //         title,
// //       },
// //     });

// //     return json({ success: true });
// //   } catch (err) {
// //     return json({ success: false, error: err.message }, { status: 500 });
// //   }
// // }








// // app/routes/api/upload/complete.jsx
// import { json } from "@remix-run/node";
// import { getShopifyContext } from "../shopify.server";
// import { prisma } from "../db.server";

// const MUTATION = `
//   mutation fileCreate($files: [FileCreateInput!]!) {
//     fileCreate(files: $files) {
//       files {
//         id
//         ... on Video {
//           originalSource
//           duration
//           preview { image { url } }
//         }
//       }
//       userErrors { message }
//     }
//   }
// `;

// export const action = async ({ request }) => {
//   let admin, session;
//   try {
//     ({ admin, session } = await getShopifyContext(request));
//   } catch (err) {
//     return json({ success: false, error: err.message }, { status: 401 });
//   }

//   const { resourceUrl, title } = await request.json();
//   if (!resourceUrl || !title?.trim()) {
//     return json({ success: false, error: "resourceUrl and title required" }, { status: 400 });
//   }

//   const finalTitle = `EE-App-Upload-${title.trim()}`;

//   const { data } = await admin.graphql(MUTATION, {
//     variables: {
//       files: [{
//         originalSource: resourceUrl,
//         filename: finalTitle,
//         contentType: "VIDEO",
//       }],
//     },
//   });

//   const result = await data.json();
//   const file = result.data?.fileCreate?.files?.[0];
//   const errors = result.data?.fileCreate?.userErrors;

//   if (errors?.length) {
//     return json({ success: false, error: errors[0].message }, { status: 500 });
//   }
//   if (!file?.id) {
//     return json({ success: false, error: "Video creation failed" }, { status: 500 });
//   }

//   const media = await prisma.mediaFile.create({
//     data: {
//       sessionId: session.id,
//       shopify_file_url: file.originalSource,
//       shopify_file_id: file.id.split("/").pop(),
//       title: finalTitle,
//       thumbnail_url: file.preview?.image?.url ?? null,
//       duration: file.duration ?? 0,
//     },
//   });

//   return json({ success: true, media });
// };




import { json } from "@remix-run/node";
import { getShopifyContext } from "../shopify.server";

const CREATE_FILE_MUTATION = `
  mutation fileCreate($files: [FileCreateInput!]!) {
    fileCreate(files: $files) {
      files {
        id
        __typename
        ... on MediaImage {
          id
          image {
            originalSrc
          }
        }
        ... on GenericFile {
          id
          url
        }
        ... on Video {
          id
          sources {
            url
            format
            mimeType
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const action = async ({ request }) => {
  let admin;
  try {
    ({ admin } = await getShopifyContext(request));
  } catch (err) {
    return json({ success: false, error: err.message }, { status: 401 });
  }

  const body = await request.json();
  const { resourceUrl, title, fileType } = body;

  if (!resourceUrl || !title?.trim()) {
    return json({ success: false, error: "Missing required fields" }, { status: 400 });
  }

  const { data } = await admin.graphql(CREATE_FILE_MUTATION, {
    variables: {
      files: [{
        alt: title,
        contentType: fileType.startsWith('video/') ? 'VIDEO' : 'IMAGE',
        originalSource: resourceUrl
      }],
    },
  });

  const result = await data.json();
    
  if (result.data?.fileCreate?.userErrors?.length > 0) {
    return json({ 
      success: false, 
      error: result.data.fileCreate.userErrors[0]?.message || "File creation failed" 
    }, { status: 500 });
  }

  const createdFile = result.data?.fileCreate?.files?.[0];
  if (!createdFile) {
    return json({ success: false, error: "File creation failed - no file returned" }, { status: 500 });
  }

  return json({
    success: true,
    file: createdFile,
    message: "File successfully uploaded to Shopify"
  });
};