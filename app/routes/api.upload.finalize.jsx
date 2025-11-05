// // // app/routes/api.upload.finalize.jsx
// // import { json } from "@remix-run/node";
// // import { getAdmin } from "../shopify.server.js";

// // const FILE_CREATE = `
// //   mutation fileCreate($files: [FileCreateInput!]!) {
// //     fileCreate(files: $files) {
// //       files { id }
// //       userErrors { message }
// //     }
// //   }
// // `;

// // export const action = async ({ request }) => {
// //   try {
// //     const { admin, session } = await getAdmin(request);
// //     const { originalSource, title } = await request.json();

// //     const resp = await admin.graphql(FILE_CREATE, {
// //       variables: {
// //         files: [{ originalSource, contentType: "VIDEO" }],
// //       },
// //     });
// //     const data = await resp.json();

// //     if (data.data?.fileCreate?.userErrors?.length) {
// //       return json(
// //         { success: false, error: data.data.fileCreate.userErrors[0].message },
// //         { status: 400 }
// //       );
// //     }

// //     const fileId = data.data.fileCreate.files[0].id;

// //     return json({ success: true, fileId, sessionId: session.id });
// //   } catch (err) {
// //     console.error(err);
// //     return json({ success: false, error: err.message }, { status: 500 });
// //   }
// // };









// // api.upload.finalize.jsx
// import { json } from "@remix-run/node";
// import { getAuth } from "@clerk/remix/ssr.server";
// import prisma from "../db.server.js";
// import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';

// const FILE_CREATE = `
//   mutation fileCreate($files: [FileCreateInput!]!) {
//     fileCreate(files: $files) {
//       files { id }
//       userErrors { message }
//     }
//   }
// `;

// export const action = async ({ request }) => {
//   const { userId } = await getAuth(request);
//   if (!userId) {
//     return json({ success: false, error: "Unauthorized" }, { status: 401 });
//   }

//   const session = await prisma.session.findFirst({ where: { clerkUserId: userId } });
//   if (!session) {
//     return json({ success: false, error: "Session not found" }, { status: 404 });
//   }

//   // Create shopify and admin here
//   const shopify = shopifyApi({
//     apiKey: process.env.SHOPIFY_API_KEY,
//     apiSecretKey: process.env.SHOPIFY_API_SECRET,
//     hostName: process.env.SHOPIFY_APP_URL.replace('https://', ''),
//     apiVersion: LATEST_API_VERSION,
//     isEmbeddedApp: false,
//   });
//   const admin = new shopify.clients.Graphql({ shop: session.shop, accessToken: session.accessToken });

//   try {
//     const { originalSource, title } = await request.json();

//     const resp = await admin.graphql(FILE_CREATE, {
//       variables: {
//         files: [{ originalSource, contentType: "VIDEO" }],
//       },
//     });
//     const data = await resp.json();

//     if (data.data?.fileCreate?.userErrors?.length) {
//       return json(
//         { success: false, error: data.data.fileCreate.userErrors[0].message },
//         { status: 400 }
//       );
//     }

//     const fileId = data.data.fileCreate.files[0].id;

//     return json({ success: true, fileId, sessionId: session.id });
//   } catch (err) {
//     console.error(err);
//     return json({ success: false, error: err.message }, { status: 500 });
//   }
// };