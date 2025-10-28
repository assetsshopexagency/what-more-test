import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server.js";

const CREATE_UPLOAD_MUTATION = `
  mutation stagedUploadsCreate($input: [StagedUploadInput!]!) {
    stagedUploadsCreate(input: $input) {
      stagedTargets {
        url
        resourceUrl
        parameters { name value }
      }
      userErrors { field message }
    }
  }
`;

export const action = async ({ request }) => {
  try {
    const { admin } = await authenticate.admin(request);
    const body = await request.json();
    console.log("[/api/upload/init] Received body:", body);

    const { fileName, fileSize, fileType } = body || {};
    if (!fileName || !fileSize || !fileType) {
      return json({
        success: false,
        error: `Missing file metadata: fileName=${fileName}, fileSize=${fileSize}, fileType=${fileType}`
      }, { status: 400 });
    }

    const resourceType = fileType.startsWith("video") ? "VIDEO" : "IMAGE";

    const resp = await admin.graphql(CREATE_UPLOAD_MUTATION, {
      variables: {
        input: [
          {
            resource: resourceType,
            filename: fileName,
            mimeType: fileType,
            fileSize: fileSize.toString(),
            httpMethod: "POST",
          },
        ],
      },
    });

    const data = await resp.json();
    console.log("[/api/upload/init] Shopify response:", data);

    const userErrors = data?.data?.stagedUploadsCreate?.userErrors;
    if (userErrors?.length) {
      console.error("[/api/upload/init] Shopify userErrors:", userErrors);
      return json({ success: false, error: userErrors[0].message }, { status: 500 });
    }

    const target = data?.data?.stagedUploadsCreate?.stagedTargets?.[0];
    if (!target) {
      console.error("[/api/upload/init] No stagedTargets:", data);
      return json({ success: false, error: "No staged upload target returned from Shopify" }, { status: 500 });
    }

    return json({
      success: true,
      target: {
        url: target.url,
        resourceUrl: target.resourceUrl,
        parameters: target.parameters,
      },
      resourceType,
    });
  } catch (err) {
    console.error("[/api/upload/init] Error:", err);
    return json({ success: false, error: err.message || "Server error" }, { status: 500 });
  }
};