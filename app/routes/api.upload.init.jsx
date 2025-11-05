// // // // // import { json } from "@remix-run/node";
// // // // // import { authenticate } from "../shopify.server.js";

// // // // // const CREATE_UPLOAD_MUTATION = `
// // // // //   mutation stagedUploadsCreate($input: [StagedUploadInput!]!) {
// // // // //     stagedUploadsCreate(input: $input) {
// // // // //       stagedTargets {
// // // // //         url
// // // // //         resourceUrl
// // // // //         parameters { name value }
// // // // //       }
// // // // //       userErrors { field message }
// // // // //     }
// // // // //   }
// // // // // `;

// // // // // export const action = async ({ request }) => {
// // // // //   try {
// // // // //     const { admin } = await authenticate.admin(request);
// // // // //     const body = await request.json();
// // // // //     console.log("[/api/upload/init] Received body:", body);

// // // // //     const { fileName, fileSize, fileType } = body || {};
// // // // //     if (!fileName || !fileSize || !fileType) {
// // // // //       return json({
// // // // //         success: false,
// // // // //         error: `Missing file metadata: fileName=${fileName}, fileSize=${fileSize}, fileType=${fileType}`
// // // // //       }, { status: 400 });
// // // // //     }

// // // // //     const resourceType = fileType.startsWith("video") ? "VIDEO" : "IMAGE";

// // // // //     const resp = await admin.graphql(CREATE_UPLOAD_MUTATION, {
// // // // //       variables: {
// // // // //         input: [
// // // // //           {
// // // // //             resource: resourceType,
// // // // //             filename: fileName,
// // // // //             mimeType: fileType,
// // // // //             fileSize: fileSize.toString(),
// // // // //             httpMethod: "POST",
// // // // //           },
// // // // //         ],
// // // // //       },
// // // // //     });

// // // // //     const data = await resp.json();
// // // // //     console.log("[/api/upload/init] Shopify response:", data);

// // // // //     const userErrors = data?.data?.stagedUploadsCreate?.userErrors;
// // // // //     if (userErrors?.length) {
// // // // //       console.error("[/api/upload/init] Shopify userErrors:", userErrors);
// // // // //       return json({ success: false, error: userErrors[0].message }, { status: 500 });
// // // // //     }

// // // // //     const target = data?.data?.stagedUploadsCreate?.stagedTargets?.[0];
// // // // //     if (!target) {
// // // // //       console.error("[/api/upload/init] No stagedTargets:", data);
// // // // //       return json({ success: false, error: "No staged upload target returned from Shopify" }, { status: 500 });
// // // // //     }

// // // // //     return json({
// // // // //       success: true,
// // // // //       target: {
// // // // //         url: target.url,
// // // // //         resourceUrl: target.resourceUrl,
// // // // //         parameters: target.parameters,
// // // // //       },
// // // // //       resourceType,
// // // // //     });
// // // // //   } catch (err) {
// // // // //     console.error("[/api/upload/init] Error:", err);
// // // // //     return json({ success: false, error: err.message || "Server error" }, { status: 500 });
// // // // //   }
// // // // // };




// // // // // app/routes/api.upload.init.jsx

// // // // import { json } from "@remix-run/node";
// // // // import { authenticate } from "../shopify.server.js";

// // // // const CREATE_UPLOAD_MUTATION = `
// // // //   mutation stagedUploadsCreate($input: [StagedUploadInput!]!) {
// // // //     stagedUploadsCreate(input: $input) {
// // // //       stagedTargets {
// // // //         url
// // // //         resourceUrl
// // // //         parameters { name value }
// // // //       }
// // // //       userErrors { field message }
// // // //     }
// // // //   }
// // // // `;

// // // // export const action = async ({ request }) => {
// // // //   try {
// // // //     const { admin } = await authenticate.admin(request);
// // // //     const body = await request.json();
// // // //     console.log("[/api/upload/init] Received body:", body);

// // // //     const { fileName, fileSize, fileType } = body || {};
// // // //     if (!fileName || !fileSize || !fileType) {
// // // //       return json({
// // // //         success: false,
// // // //         error: `Missing file metadata: fileName=${fileName}, fileSize=${fileSize}, fileType=${fileType}`
// // // //       }, { status: 400 });
// // // //     }

// // // //     const resourceType = fileType.startsWith("video") ? "VIDEO" : "IMAGE";

// // // //     const resp = await admin.graphql(CREATE_UPLOAD_MUTATION, {
// // // //       variables: {
// // // //         input: [
// // // //           {
// // // //             resource: resourceType,
// // // //             filename: fileName,
// // // //             mimeType: fileType,
// // // //             fileSize: fileSize.toString(),
// // // //             httpMethod: "POST",
// // // //           },
// // // //         ],
// // // //       },
// // // //     });

// // // //     const data = await resp.json();
// // // //     console.log("[/api/upload/init] Shopify response:", data);

// // // //     const userErrors = data?.data?.stagedUploadsCreate?.userErrors;
// // // //     if (userErrors?.length) {
// // // //       console.error("[/api/upload/init] Shopify userErrors:", userErrors);
// // // //       return json({ success: false, error: userErrors[0].message }, { status: 500 });
// // // //     }

// // // //     const target = data?.data?.stagedUploadsCreate?.stagedTargets?.[0];
// // // //     if (!target) {
// // // //       console.error("[/api/upload/init] No stagedTargets:", data);
// // // //       return json({ success: false, error: "No staged upload target returned from Shopify" }, { status: 500 });
// // // //     }

// // // //     return json({
// // // //       success: true,
// // // //       target: {
// // // //         url: target.url,
// // // //         resourceUrl: target.resourceUrl,
// // // //         parameters: target.parameters,
// // // //       },
// // // //       resourceType,
// // // //     });
// // // //   } catch (err) {
// // // //     console.error("[/api/upload/init] Error:", err);
// // // //     return json({ success: false, error: err.message || "Server error" }, { status: 500 });
// // // //   }
// // // // };



// // // // app/routes/api.upload.init.jsx
// // // import { json } from "@remix-run/node";
// // // import { getAdmin } from "../shopify.server.js";

// // // const STAGED_UPLOADS_CREATE = `
// // //   mutation stagedUploadsCreate($input: [StagedUploadInput!]!) {
// // //     stagedUploadsCreate(input: $input) {
// // //       stagedTargets {
// // //         url
// // //         resourceUrl
// // //         parameters { name value }
// // //       }
// // //       userErrors { field message }
// // //     }
// // //   }
// // // `;

// // // export const action = async ({ request }) => {
// // //   try {
// // //     const { admin } = await getAdmin(request);
// // //     const { fileName, fileSize, fileType, title } = await request.json();

// // //     const contentType =
// // //       fileType.startsWith("video/") ? "VIDEO" : "IMAGE";

// // //     const response = await admin.graphql(STAGED_UPLOADS_CREATE, {
// // //       variables: {
// // //         input: [
// // //           {
// // //             filename: fileName,
// // //             mimeType: fileType,
// // //             resource: contentType,
// // //             fileSize,
// // //           },
// // //         ],
// // //       },
// // //     });

// // //     const data = await response.json();

// // //     if (data.data?.stagedUploadsCreate?.userErrors?.length) {
// // //       return json(
// // //         { success: false, error: data.data.stagedUploadsCreate.userErrors[0].message },
// // //         { status: 400 }
// // //       );
// // //     }

// // //     return json({
// // //       success: true,
// // //       stagedUploadsCreate: data.data.stagedUploadsCreate.stagedTargets.map((t) => ({
// // //         key: t.parameters.find((p) => p.name === "key")?.value,
// // //         url: t.url,
// // //         resourceUrl: t.resourceUrl,
// // //         params: Object.fromEntries(t.parameters.map((p) => [p.name, p.value])),
// // //       })),
// // //       title,
// // //     });
// // //   } catch (err) {
// // //     console.error(err);
// // //     return json({ success: false, error: err.message }, { status: 500 });
// // //   }
// // // };








// // // api.upload.init.jsx
// // import { json } from "@remix-run/node";
// // import { getAuth } from "@clerk/remix/ssr.server";
// // import prisma from "../db.server.js";
// // import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';

// // const STAGED_UPLOADS_CREATE = `
// //   mutation stagedUploadsCreate($input: [StagedUploadInput!]!) {
// //     stagedUploadsCreate(input: $input) {
// //       stagedTargets {
// //         url
// //         resourceUrl
// //         parameters { name value }
// //       }
// //       userErrors { field message }
// //     }
// //   }
// // `;

// // export const action = async ({ request }) => {
// //   const { userId } = await getAuth(request);
// //   if (!userId) {
// //     return json({ success: false, error: "Unauthorized" }, { status: 401 });
// //   }

// //   const session = await prisma.session.findFirst({ where: { clerkUserId: userId } });
// //   if (!session) {
// //     return json({ success: false, error: "Session not found" }, { status: 404 });
// //   }

// //   // Create shopify and admin here
// //   const shopify = shopifyApi({
// //     apiKey: process.env.SHOPIFY_API_KEY,
// //     apiSecretKey: process.env.SHOPIFY_API_SECRET,
// //     hostName: process.env.SHOPIFY_APP_URL.replace('https://', ''),
// //     apiVersion: LATEST_API_VERSION,
// //     isEmbeddedApp: false,
// //   });
// //   const admin = new shopify.clients.Graphql({ shop: session.shop, accessToken: session.accessToken });

// //   try {
// //     const { fileName, fileSize, fileType, title } = await request.json();

// //     const contentType =
// //       fileType.startsWith("video/") ? "VIDEO" : "IMAGE";

// //     const response = await admin.graphql(STAGED_UPLOADS_CREATE, {
// //       variables: {
// //         input: [
// //           {
// //             filename: fileName,
// //             mimeType: fileType,
// //             resource: contentType,
// //             fileSize,
// //           },
// //         ],
// //       },
// //     });

// //     const data = await response.json();

// //     if (data.data?.stagedUploadsCreate?.userErrors?.length) {
// //       return json(
// //         { success: false, error: data.data.stagedUploadsCreate.userErrors[0].message },
// //         { status: 400 }
// //       );
// //     }

// //     return json({
// //       success: true,
// //       stagedUploadsCreate: data.data.stagedUploadsCreate.stagedTargets.map((t) => ({
// //         key: t.parameters.find((p) => p.name === "key")?.value,
// //         url: t.url,
// //         resourceUrl: t.resourceUrl,
// //         params: Object.fromEntries(t.parameters.map((p) => [p.name, p.value])),
// //       })),
// //       title,
// //     });
// //   } catch (err) {
// //     console.error(err);
// //     return json({ success: false, error: err.message }, { status: 500 });
// //   }
// // };


// // app/routes/api.upload.init.js
// import { json } from "@remix-run/node";
// import { getAuth } from "@clerk/remix/ssr.server";
// import { shopify, getShopifySession } from "../shopify.server";

// export async function action({ request }) {
//   try {
//     const { userId } = await getAuth(request);
//     if (!userId) return json({ error: "Unauthorized" }, { status: 401 });

//     const { fileName, fileSize, fileType, title } = await request.json();
//     const { shop, accessToken } = await getShopifySession(userId);

//     const client = new shopify.clients.Graphql({ shop, accessToken });

//     const query = `
//       mutation stagedUploadsCreate($input: [StagedUploadInput!]!) {
//         stagedUploadsCreate(input: $input) {
//           stagedTargets {
//             url
//             resourceUrl
//             parameters { name value }
//           }
//         }
//       }
//     `;

//     const variables = {
//       input: [
//         {
//           filename: fileName,
//           mimeType: fileType,
//           fileSize: fileSize.toString(),
//           httpMethod: "POST",
//           resource: "VIDEO",
//         },
//       ],
//     };

//     const res = await client.query({ data: { query, variables } });

//     const target = res.body.data.stagedUploadsCreate.stagedTargets[0];

//     return json({
//       success: true,
//       url: target.url,
//       resourceUrl: target.resourceUrl,
//       params: Object.fromEntries(
//         target.parameters.map((p) => [p.name, p.value])
//       ),
//       title,
//     });
//   } catch (err) {
//     return json({ success: false, error: err.message }, { status: 500 });
//   }
// }














import { json } from "@remix-run/node";
import { getShopifyContext } from "../shopify.server";

const MUTATION = `
  mutation stagedUploadsCreate($input: [StagedUploadInput!]!) {
    stagedUploadsCreate(input: $input) {
      stagedTargets {
        url
        resourceUrl
        parameters { name value }
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
  const { fileName, fileSize, fileType, title } = body;

  if (!fileName || !fileSize || !fileType || !title?.trim()) {
    return json({ success: false, error: "Missing required fields" }, { status: 400 });
  }

  const { data } = await admin.graphql(MUTATION, {
    variables: {
      input: [{
        filename: fileName,
        mimeType: fileType,
        fileSize: fileSize.toString(),
        resource: "FILE",
      }],
    },
  });

  const result = await data.json();
  const target = result.data?.stagedUploadsCreate?.stagedTargets?.[0];

  if (!target) {
    return json({ success: false, error: "Upload URL creation failed" }, { status: 500 });
  }

  return json({
    success: true,
    url: target.url,
    resourceUrl: target.resourceUrl,
    params: Object.fromEntries(target.parameters.map(p => [p.name, p.value])),
  });
};