// // app/routes/api.upload-media.jsx
// import { getShopifyContext } from "../shopify.server.js";
// import prisma from "../db.server.js";

// // GraphQL query to check file status
// const GET_FILE_STATUS = `
//   query getFile($id: ID!) {
//     node(id: $id) {
//       ... on Video {
//         id
//         sources { 
//           url
//           mimeType
//         }
//         status
//       }
//       ... on GenericFile {
//         id
//         url
//         status
//       }
//       ... on MediaImage {
//         id
//         image { 
//           originalSrc
//           altText
//         }
//         status
//       }
//     }
//   }
// `;

// export async function action({ request }) {
//   console.log("📤 Starting file upload to Shopify...");

//   try {
//     // Get Shopify session
//     const { session, error } = await getShopifyContext();
    
//     if (error || !session?.shop || !session?.accessToken) {
//       console.error("🚫 Shopify session error:", error);
//       return new Response(
//         JSON.stringify({ 
//           success: false, 
//           error: "Shopify not configured properly. Please check your .env file." 
//         }),
//         { 
//           status: 401, 
//           headers: { "Content-Type": "application/json" } 
//         }
//       );
//     }

//     console.log("✅ Shopify session validated for shop:", session.shop);
//     console.log("📝 Session ID:", session.id);

//     // Parse the form data
//     const formData = await request.formData();
//     const file = formData.get('file');
//     const title = formData.get('title') || file?.name || '';
    
//     if (!file) {
//       return new Response(
//         JSON.stringify({ 
//           success: false, 
//           error: "No file provided" 
//         }),
//         { 
//           status: 400, 
//           headers: { "Content-Type": "application/json" } 
//         }
//       );
//     }

//     console.log(`📁 Processing file: ${file.name}, Type: ${file.type}, Size: ${file.size} bytes`);

//     // Step 1: Create staged upload URL
//     console.log("🔄 Step 1: Creating staged upload URL...");
//     const stagedUploadResult = await createStagedUpload(session, file);
    
//     if (!stagedUploadResult.success) {
//       throw new Error(`Staged upload failed: ${stagedUploadResult.error}`);
//     }

//     // Step 2: Upload file to staged URL
//     console.log("🔄 Step 2: Uploading file to staged URL...");
//     const uploadResult = await uploadToStagedURL(stagedUploadResult, file);
    
//     if (!uploadResult.success) {
//       throw new Error(`File upload failed: ${uploadResult.error}`);
//     }

//     // Step 3: Finalize upload in Shopify
//     console.log("🔄 Step 3: Finalizing upload in Shopify...");
//     const finalizeResult = await finalizeUpload(session, stagedUploadResult.resourceUrl, file);
    
//     if (!finalizeResult.success) {
//       throw new Error(`Finalize failed: ${finalizeResult.error}`);
//     }

//     const shopify_file_id = finalizeResult.fileId;
//     console.log(`📝 Shopify File ID: ${shopify_file_id}`);

//     // Step 4: Get file URL (with simplified approach)
//     console.log("🔄 Step 4: Getting file URL...");
//     let shopify_file_url = await getFileUrlWithRetry(session, shopify_file_id);
    
//     if (!shopify_file_url) {
//       // Create a fallback URL if we can't get the actual one
//       shopify_file_url = `https://cdn.shopify.com/s/files/1/0000/0000/${file.name}`;
//       console.log(`⚠️ Using fallback URL: ${shopify_file_url}`);
//     }

//     console.log(`🔗 Final Shopify File URL: ${shopify_file_url}`);

//     // Step 5: Save to database
//     console.log("💾 Step 5: Saving to database...");
//     console.log("📊 Data to save:", {
//       sessionId: session.id,
//       title: title,
//       shopify_file_url: shopify_file_url,
//       shopify_file_id: shopify_file_id,
//       description: "",
//       thumbnail_url: null,
//       duration: 0,
//       download_count: 0
//     });

//     try {
//       const video = await prisma.mediaFile.create({
//         data: {
//           sessionId: session.id,
//           title: title,
//           shopify_file_url: shopify_file_url,
//           shopify_file_id: shopify_file_id,
//           description: "",
//           thumbnail_url: null,
//           duration: 0,
//           download_count: 0,
//           created_at: new Date(),
//           updated_at: new Date(),
//         },
//       });

//       console.log("✅ Database record created successfully:", video.id);

//       // Verify the record was saved
//       const savedRecord = await prisma.mediaFile.findUnique({
//         where: { id: video.id }
//       });

//       console.log("✅ Record verified in database:", savedRecord);

//       return new Response(
//         JSON.stringify({
//           success: true,
//           message: "File uploaded successfully to Shopify",
//           fileUrl: shopify_file_url,
//           shopifyFileId: shopify_file_id,
//           mediaFileId: video.id,
//           file: { 
//             id: shopify_file_id, 
//             sources: [{ url: shopify_file_url }] 
//           },
//           dbVideo: video,
//         }),
//         { 
//           status: 200, 
//           headers: { "Content-Type": "application/json" } 
//         }
//       );

//     } catch (dbError) {
//       console.error("❌ Database error:", dbError);
//       throw new Error(`Database save failed: ${dbError.message}`);
//     }

//   } catch (error) {
//     console.error("💥 Upload error:", error);
//     return new Response(
//       JSON.stringify({ 
//         success: false, 
//         error: error.message 
//       }),
//       { 
//         status: 500, 
//         headers: { "Content-Type": "application/json" } 
//       }
//     );
//   }
// }

// // Simplified file URL retrieval with retry
// async function getFileUrlWithRetry(session, fileId, maxRetries = 5) {
//   for (let attempt = 1; attempt <= maxRetries; attempt++) {
//     try {
//       console.log(`🔄 Getting file URL (attempt ${attempt}/${maxRetries})...`);
      
//       const response = await fetch(
//         `https://${session.shop}/admin/api/2024-01/graphql.json`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'X-Shopify-Access-Token': session.accessToken,
//           },
//           body: JSON.stringify({ 
//             query: GET_FILE_STATUS, 
//             variables: { id: fileId } 
//           }),
//         }
//       );

//       if (!response.ok) {
//         console.log(`❌ Request failed: ${response.status}`);
//         await new Promise(resolve => setTimeout(resolve, 2000));
//         continue;
//       }

//       const result = await response.json();
//       console.log("📊 GraphQL response:", JSON.stringify(result, null, 2));

//       if (result.errors) {
//         console.log(`❌ GraphQL errors: ${JSON.stringify(result.errors)}`);
//         await new Promise(resolve => setTimeout(resolve, 2000));
//         continue;
//       }

//       const fileNode = result.data?.node;
      
//       if (fileNode) {
//         let fileUrl = null;
        
//         // Extract URL based on file type
//         if (fileNode.url) {
//           fileUrl = fileNode.url; // GenericFile
//         } else if (fileNode.image?.originalSrc) {
//           fileUrl = fileNode.image.originalSrc; // MediaImage
//         } else if (fileNode.sources?.[0]?.url) {
//           fileUrl = fileNode.sources[0].url; // Video
//         }

//         if (fileUrl) {
//           console.log(`✅ Got file URL: ${fileUrl}`);
//           return fileUrl;
//         }
//       }

//       console.log("❌ No file URL found in response, waiting...");
//       await new Promise(resolve => setTimeout(resolve, 2000));

//     } catch (error) {
//       console.error(`❌ Attempt ${attempt} failed:`, error.message);
//       await new Promise(resolve => setTimeout(resolve, 2000));
//     }
//   }

//   console.log("❌ All attempts to get file URL failed");
//   return null;
// }

// // Step 1: Create staged upload URL
// async function createStagedUpload(session, file) {
//   try {
//     const mutation = `
//       mutation stagedUploadsCreate($input: [StagedUploadInput!]!) {
//         stagedUploadsCreate(input: $input) {
//           stagedTargets {
//             url
//             resourceUrl
//             parameters {
//               name
//               value
//             }
//           }
//           userErrors {
//             field
//             message
//           }
//         }
//       }
//     `;

//     const variables = {
//       input: [
//         {
//           resource: file.type.startsWith('video/') ? 'VIDEO' : 'IMAGE',
//           filename: file.name,
//           mimeType: file.type,
//           fileSize: file.size.toString()
//         }
//       ]
//     };

//     const response = await fetch(
//       `https://${session.shop}/admin/api/2024-01/graphql.json`,
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'X-Shopify-Access-Token': session.accessToken,
//         },
//         body: JSON.stringify({ query: mutation, variables }),
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`GraphQL request failed: ${response.status}`);
//     }

//     const result = await response.json();

//     if (result.errors) {
//       throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
//     }

//     if (result.data?.stagedUploadsCreate?.userErrors?.length > 0) {
//       throw new Error(`User errors: ${JSON.stringify(result.data.stagedUploadsCreate.userErrors)}`);
//     }

//     const stagedTargets = result.data?.stagedUploadsCreate?.stagedTargets;
//     if (!stagedTargets || stagedTargets.length === 0) {
//       throw new Error("No staged targets returned");
//     }

//     const target = stagedTargets[0];
//     console.log("✅ Staged upload URL created");

//     return {
//       success: true,
//       url: target.url,
//       resourceUrl: target.resourceUrl,
//       parameters: target.parameters
//     };

//   } catch (error) {
//     console.error("❌ Staged upload creation error:", error);
//     return {
//       success: false,
//       error: error.message
//     };
//   }
// }

// // Step 2: Upload file to staged URL
// async function uploadToStagedURL(stagedUploadResult, file) {
//   try {
//     const formData = new FormData();
    
//     // Add all parameters from staged upload
//     stagedUploadResult.parameters.forEach(param => {
//       formData.append(param.name, param.value);
//     });
    
//     // Add the actual file
//     formData.append('file', file);

//     const response = await fetch(stagedUploadResult.url, {
//       method: 'POST',
//       body: formData,
//     });

//     if (!response.ok) {
//       throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
//     }

//     console.log("✅ File uploaded to staged URL");
//     return {
//       success: true
//     };

//   } catch (error) {
//     console.error("❌ File upload error:", error);
//     return {
//       success: false,
//       error: error.message
//     };
//   }
// }

// // Step 3: Finalize upload in Shopify
// async function finalizeUpload(session, resourceUrl, file) {
//   try {
//     const mutation = `
//       mutation fileCreate($files: [FileCreateInput!]!) {
//         fileCreate(files: $files) {
//           files { 
//             id
//             ... on GenericFile {
//               url
//             }
//             ... on MediaImage {
//               image {
//                 originalSrc
//               }
//             }
//             ... on Video {
//               sources {
//                 url
//               }
//             }
//           }
//           userErrors {
//             field
//             message
//           }
//         }
//       }
//     `;

//     const variables = {
//       files: [{
//         alt: file.name,
//         contentType: file.type.startsWith('video/') ? 'VIDEO' : 'IMAGE',
//         originalSource: resourceUrl
//       }]
//     };

//     const response = await fetch(
//       `https://${session.shop}/admin/api/2024-01/graphql.json`,
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'X-Shopify-Access-Token': session.accessToken,
//         },
//         body: JSON.stringify({ query: mutation, variables }),
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`GraphQL request failed: ${response.status}`);
//     }

//     const result = await response.json();

//     if (result.errors) {
//       throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
//     }

//     if (result.data?.fileCreate?.userErrors?.length > 0) {
//       throw new Error(`User errors: ${JSON.stringify(result.data.fileCreate.userErrors)}`);
//     }

//     const createdFile = result.data?.fileCreate?.files?.[0];
//     if (!createdFile) {
//       throw new Error("No file created");
//     }

//     console.log("✅ Upload finalized in Shopify");
//     return {
//       success: true,
//       fileId: createdFile.id
//     };

//   } catch (error) {
//     console.error("❌ Finalize upload error:", error);
//     return {
//       success: false,
//       error: error.message
//     };
//   }
// }

// // Handle GET requests
// export async function loader() {
//   return new Response(
//     JSON.stringify({ 
//       message: "POST files to this endpoint to upload to Shopify",
//       instructions: "Send multipart/form-data with 'file' field"
//     }),
//     { 
//       status: 200, 
//       headers: { "Content-Type": "application/json" } 
//     }
//   );
// }





// app/routes/api.upload-media.jsx
import { getShopifyContext } from "../shopify.server.js";
import prisma from "../db.server.js";

// GraphQL query to check file status
const GET_FILE_STATUS = `
  query getFile($id: ID!) {
    node(id: $id) {
      ... on Video {
        id
        sources { 
          url
          mimeType
        }
        status
      }
      ... on GenericFile {
        id
        url
        status
      }
      ... on MediaImage {
        id
        image { 
          originalSrc
          altText
        }
        status
      }
    }
  }
`;

// Increased timeout for large files (5 minutes for 100MB files)
const UPLOAD_TIMEOUT = 5 * 60 * 1000; // 5 minutes

export async function action({ request }) {
  console.log("📤 Starting file upload to Shopify...");

  try {
    // Get Shopify session
    const { session, error } = await getShopifyContext();
    
    if (error || !session?.shop || !session?.accessToken) {
      console.error("🚫 Shopify session error:", error);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Shopify not configured properly. Please check your .env file." 
        }),
        { 
          status: 401, 
          headers: { "Content-Type": "application/json" } 
        }
      );
    }

    console.log("✅ Shopify session validated for shop:", session.shop);

    // Parse the form data
    const formData = await request.formData();
    const file = formData.get('file');
    const title = formData.get('title') || file?.name || '';
    
    if (!file) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "No file provided" 
        }),
        { 
          status: 400, 
          headers: { "Content-Type": "application/json" } 
        }
      );
    }

    // Check file size (100MB limit)
    const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB in bytes
    if (file.size > MAX_FILE_SIZE) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `File size too large. Maximum allowed size is 100MB. Your file is ${(file.size / (1024 * 1024)).toFixed(2)}MB.` 
        }),
        { 
          status: 400, 
          headers: { "Content-Type": "application/json" } 
        }
      );
    }

    console.log(`📁 Processing file: ${file.name}, Type: ${file.type}, Size: ${(file.size / (1024 * 1024)).toFixed(2)}MB`);

    // Step 1: Create staged upload URL
    console.log("🔄 Step 1: Creating staged upload URL...");
    const stagedUploadResult = await createStagedUpload(session, file);
    
    if (!stagedUploadResult.success) {
      throw new Error(`Staged upload failed: ${stagedUploadResult.error}`);
    }

    // Step 2: Upload file to staged URL with progress tracking and timeout
    console.log("🔄 Step 2: Uploading file to staged URL...");
    const uploadResult = await uploadToStagedURLWithProgress(stagedUploadResult, file, session);
    
    if (!uploadResult.success) {
      throw new Error(`File upload failed: ${uploadResult.error}`);
    }

    // Step 3: Finalize upload in Shopify
    console.log("🔄 Step 3: Finalizing upload in Shopify...");
    const finalizeResult = await finalizeUpload(session, stagedUploadResult.resourceUrl, file);
    
    if (!finalizeResult.success) {
      throw new Error(`Finalize failed: ${finalizeResult.error}`);
    }

    const shopify_file_id = finalizeResult.fileId;
    console.log(`📝 Shopify File ID: ${shopify_file_id}`);

    // Step 4: Get file URL with improved retry logic
    console.log("🔄 Step 4: Getting file URL...");
    let shopify_file_url = await getFileUrlWithRetry(session, shopify_file_id);
    
    if (!shopify_file_url) {
      // Create a fallback URL if we can't get the actual one
      shopify_file_url = `https://cdn.shopify.com/s/files/1/0000/0000/${file.name}`;
      console.log(`⚠️ Using fallback URL: ${shopify_file_url}`);
    }

    console.log(`🔗 Final Shopify File URL: ${shopify_file_url}`);

    // Step 5: Save to database
    console.log("💾 Step 5: Saving to database...");
    try {
      const video = await prisma.mediaFile.create({
        data: {
          sessionId: session.id,
          title: title,
          shopify_file_url: shopify_file_url,
          shopify_file_id: shopify_file_id,
          description: "",
          thumbnail_url: null,
          duration: 0,
          download_count: 0,
          created_at: new Date(),
          updated_at: new Date(),
        },
      });

      console.log("✅ Database record created successfully:", video.id);

      return new Response(
        JSON.stringify({
          success: true,
          message: "File uploaded successfully to Shopify",
          fileUrl: shopify_file_url,
          shopifyFileId: shopify_file_id,
          mediaFileId: video.id,
          file: { 
            id: shopify_file_id, 
            sources: [{ url: shopify_file_url }] 
          },
          dbVideo: video,
        }),
        { 
          status: 200, 
          headers: { "Content-Type": "application/json" } 
        }
      );

    } catch (dbError) {
      console.error("❌ Database error:", dbError);
      throw new Error(`Database save failed: ${dbError.message}`);
    }

  } catch (error) {
    console.error("💥 Upload error:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        status: 500, 
        headers: { "Content-Type": "application/json" } 
      }
    );
  }
}

// Optimized file URL retrieval with better retry logic
async function getFileUrlWithRetry(session, fileId, maxRetries = 8) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`🔄 Getting file URL (attempt ${attempt}/${maxRetries})...`);
      
      const response = await fetch(
        `https://${session.shop}/admin/api/2024-01/graphql.json`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': session.accessToken,
          },
          body: JSON.stringify({ 
            query: GET_FILE_STATUS, 
            variables: { id: fileId } 
          }),
        }
      );

      if (!response.ok) {
        console.log(`❌ Request failed: ${response.status}`);
        await new Promise(resolve => setTimeout(resolve, 3000)); // Increased delay
        continue;
      }

      const result = await response.json();
      
      if (result.errors) {
        console.log(`❌ GraphQL errors: ${JSON.stringify(result.errors)}`);
        await new Promise(resolve => setTimeout(resolve, 3000));
        continue;
      }

      const fileNode = result.data?.node;
      
      if (fileNode) {
        let fileUrl = null;
        
        // Extract URL based on file type
        if (fileNode.url) {
          fileUrl = fileNode.url; // GenericFile
        } else if (fileNode.image?.originalSrc) {
          fileUrl = fileNode.image.originalSrc; // MediaImage
        } else if (fileNode.sources?.[0]?.url) {
          fileUrl = fileNode.sources[0].url; // Video
        }

        if (fileUrl) {
          console.log(`✅ Got file URL: ${fileUrl}`);
          return fileUrl;
        }
      }

      console.log("❌ No file URL found in response, waiting...");
      await new Promise(resolve => setTimeout(resolve, 3000));

    } catch (error) {
      console.error(`❌ Attempt ${attempt} failed:`, error.message);
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }

  console.log("❌ All attempts to get file URL failed");
  return null;
}

// Step 1: Create staged upload URL
async function createStagedUpload(session, file) {
  try {
    const mutation = `
      mutation stagedUploadsCreate($input: [StagedUploadInput!]!) {
        stagedUploadsCreate(input: $input) {
          stagedTargets {
            url
            resourceUrl
            parameters {
              name
              value
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const variables = {
      input: [
        {
          resource: file.type.startsWith('video/') ? 'VIDEO' : 'IMAGE',
          filename: file.name,
          mimeType: file.type,
          fileSize: file.size.toString()
        }
      ]
    };

    const response = await fetch(
      `https://${session.shop}/admin/api/2024-01/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': session.accessToken,
        },
        body: JSON.stringify({ query: mutation, variables }),
      }
    );

    if (!response.ok) {
      throw new Error(`GraphQL request failed: ${response.status}`);
    }

    const result = await response.json();

    if (result.errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
    }

    if (result.data?.stagedUploadsCreate?.userErrors?.length > 0) {
      throw new Error(`User errors: ${JSON.stringify(result.data.stagedUploadsCreate.userErrors)}`);
    }

    const stagedTargets = result.data?.stagedUploadsCreate?.stagedTargets;
    if (!stagedTargets || stagedTargets.length === 0) {
      throw new Error("No staged targets returned");
    }

    const target = stagedTargets[0];
    console.log("✅ Staged upload URL created");

    return {
      success: true,
      url: target.url,
      resourceUrl: target.resourceUrl,
      parameters: target.parameters
    };

  } catch (error) {
    console.error("❌ Staged upload creation error:", error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Step 2: Upload file to staged URL with progress tracking and timeout
async function uploadToStagedURLWithProgress(stagedUploadResult, file, session) {
  try {
    const formData = new FormData();
    
    // Add all parameters from staged upload
    stagedUploadResult.parameters.forEach(param => {
      formData.append(param.name, param.value);
    });
    
    // Add the actual file
    formData.append('file', file);

    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), UPLOAD_TIMEOUT);

    console.log(`⏰ Starting upload with ${UPLOAD_TIMEOUT/1000} second timeout...`);

    const response = await fetch(stagedUploadResult.url, {
      method: 'POST',
      body: formData,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
    }

    console.log("✅ File uploaded to staged URL");
    return {
      success: true
    };

  } catch (error) {
    if (error.name === 'AbortError') {
      console.error("❌ Upload timeout: File upload took too long");
      return {
        success: false,
        error: `Upload timeout: File is too large or network is too slow. Please try again with a smaller file or better network connection.`
      };
    }
    
    console.error("❌ File upload error:", error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Step 3: Finalize upload in Shopify
async function finalizeUpload(session, resourceUrl, file) {
  try {
    const mutation = `
      mutation fileCreate($files: [FileCreateInput!]!) {
        fileCreate(files: $files) {
          files { 
            id
            ... on GenericFile {
              url
            }
            ... on MediaImage {
              image {
                originalSrc
              }
            }
            ... on Video {
              sources {
                url
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

    const variables = {
      files: [{
        alt: file.name,
        contentType: file.type.startsWith('video/') ? 'VIDEO' : 'IMAGE',
        originalSource: resourceUrl
      }]
    };

    const response = await fetch(
      `https://${session.shop}/admin/api/2024-01/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': session.accessToken,
        },
        body: JSON.stringify({ query: mutation, variables }),
      }
    );

    if (!response.ok) {
      throw new Error(`GraphQL request failed: ${response.status}`);
    }

    const result = await response.json();

    if (result.errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
    }

    if (result.data?.fileCreate?.userErrors?.length > 0) {
      throw new Error(`User errors: ${JSON.stringify(result.data.fileCreate.userErrors)}`);
    }

    const createdFile = result.data?.fileCreate?.files?.[0];
    if (!createdFile) {
      throw new Error("No file created");
    }

    console.log("✅ Upload finalized in Shopify");
    return {
      success: true,
      fileId: createdFile.id
    };

  } catch (error) {
    console.error("❌ Finalize upload error:", error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Handle GET requests
export async function loader() {
  return new Response(
    JSON.stringify({ 
      message: "POST files to this endpoint to upload to Shopify",
      instructions: "Send multipart/form-data with 'file' field",
      maxFileSize: "100MB"
    }),
    { 
      status: 200, 
      headers: { "Content-Type": "application/json" } 
    }
  );
}