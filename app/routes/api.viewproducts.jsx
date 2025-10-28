// //api.viewproducts.jsx
// import { json } from "@remix-run/node";
// import { authenticate } from "../shopify.server.js";

// // Shopify Product Query (GraphQL)
// const PRODUCTS_QUERY = `
//   {
//     products(first: 250) {
//       edges {
//         node {
//           id
//           title
//           images(first: 1) { edges { node { originalSrc } } }
//         }
//       }
//     }
//   }
// `;

// export const loader = async ({ request }) => {
//   const { admin } = await authenticate.admin(request);
//   const resp = await admin.graphql(PRODUCTS_QUERY);
//   const data = await resp.json();

//   const products = data.data.products.edges.map(p => ({
//     id: p.node.id,
//     title: p.node.title,
//     image_url: p.node.images.edges[0]?.node.originalSrc || null
//   }));

//   return json({ success: true, products });
// };


//api.viewproducts.jsx
import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server.js";

// Updated Shopify Product Query to include prices
const PRODUCTS_QUERY = `
  {
    products(first: 250) {
      edges {
        node {
          id
          title
          description
          variants(first: 10) {
            edges {
              node {
                id
                price
                compareAtPrice
                sku
              }
            }
          }
          images(first: 1) {
            edges {
              node {
                originalSrc
              }
            }
          }
        }
      }
    }
  }
`;

export const loader = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  const resp = await admin.graphql(PRODUCTS_QUERY);
  const data = await resp.json();

  const products = data.data.products.edges.map(p => {
    const variant = p.node.variants.edges[0]?.node;
    
    return {
      id: p.node.id,
      title: p.node.title,
      image_url: p.node.images.edges[0]?.node.originalSrc || null,
      // Current price
      price: variant?.price || "0.00",
      // Original price (compareAtPrice)
      originalPrice: variant?.compareAtPrice || null,
      currency_code: "USD", // You can make this dynamic if needed
      shopify_variant_id: variant?.id || null
    };
  });

  return json({ success: true, products });
};