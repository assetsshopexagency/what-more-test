// app/routes/api.viewcollections.js
import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  const { admin } = await authenticate.admin(request);

  try {
    const response = await admin.graphql(`
      query {
        collections(first: 250) {
          edges {
            node {
              id
              title
              image {
                url
              }
            }
          }
        }
      }
    `);

    const data = await response.json();
    if (data.errors) {
      throw new Error(data.errors[0].message);
    }

    const collections = data.data.collections.edges.map(e => ({
      id: e.node.id,
      title: e.node.title,
      image_url: e.node.image?.url || null
    }));

    return json({ success: true, collections });
  } catch (error) {
    console.error("Error fetching collections:", error);
    return json({ success: false, error: error.message }, { status: 500 });
  }
};