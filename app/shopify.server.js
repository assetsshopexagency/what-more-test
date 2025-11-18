// // // app/shopify.server.js
// // // STANDALONE MODE – NO OAUTH, NO EMBEDDED APP

// // const SHOPIFY_STORE = process.env.SHOPIFY_STORE?.trim();
// // const SHOPIFY_ADMIN_API_TOKEN = process.env.SHOPIFY_ADMIN_API_TOKEN?.trim();

// // export async function getShopifyContext() {
// //   if (!SHOPIFY_STORE) {
// //     return { session: null, error: "Missing SHOPIFY_STORE in .env" };
// //   }
// //   if (!SHOPIFY_ADMIN_API_TOKEN) {
// //     return { session: null, error: "Missing SHOPIFY_ADMIN_API_TOKEN in .env" };
// //   }
// //   if (!SHOPIFY_ADMIN_API_TOKEN.startsWith("shpat_")) {
// //     return { session: null, error: "Invalid token format. Must start with 'shpat_'" };
// //   }

// //   return {
// //     session: {
// //       shop: SHOPIFY_STORE,
// //       accessToken: SHOPIFY_ADMIN_API_TOKEN,
// //     },
// //     error: null,
// //   };
// // }

// // export const authenticate = {
// //   admin: async () => {
// //     throw new Error("OAuth disabled in standalone mode");
// //   },
// // };

// // export default {};



// // app/shopify.server.js
// // STANDALONE MODE – NO OAUTH, NO EMBEDDED APP
// import prisma from "./db.server.js"; // Import from your db.server file

// const SHOPIFY_STORE = process.env.SHOPIFY_STORE?.trim();
// const SHOPIFY_ADMIN_API_TOKEN = process.env.SHOPIFY_ADMIN_API_TOKEN?.trim();

// export async function getShopifyContext() {
//   if (!SHOPIFY_STORE) {
//     return { session: null, error: "Missing SHOPIFY_STORE in .env" };
//   }
//   if (!SHOPIFY_ADMIN_API_TOKEN) {
//     return { session: null, error: "Missing SHOPIFY_ADMIN_API_TOKEN in .env" };
//   }
//   if (!SHOPIFY_ADMIN_API_TOKEN.startsWith("shpat_")) {
//     return { session: null, error: "Invalid token format. Must start with 'shpat_'" };
//   }

//   // Upsert a dummy session in the DB for standalone mode
//   const session = await prisma.session.upsert({
//     where: { shop: SHOPIFY_STORE },
//     update: { 
//       accessToken: SHOPIFY_ADMIN_API_TOKEN,
//       updatedAt: new Date(),
//     },
//     create: {
//       id: SHOPIFY_STORE, // Use shop as ID (unique string)
//       shop: SHOPIFY_STORE,
//       state: "standalone", // Required field
//       isOnline: false, // Standalone, no online auth
//       accessToken: SHOPIFY_ADMIN_API_TOKEN,
//       scope: process.env.SCOPES || "read_products,write_products", // Use actual scopes
//       expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     },
//   });

//   return {
//     session,
//     error: null,
//   };
// }

// export const authenticate = {
//   admin: async () => {
//     throw new Error("OAuth disabled in standalone mode");
//   },
// };

// export default {};



// app/shopify.server.js
import prisma from "./db.server.js";

const SHOPIFY_STORE = process.env.SHOPIFY_STORE?.trim();
const SHOPIFY_ADMIN_API_TOKEN = process.env.SHOPIFY_ADMIN_API_TOKEN?.trim();

export async function getShopifyContext(shop = SHOPIFY_STORE) {
  if (!shop) {
    return { session: null, error: "Missing shop parameter" };
  }
  
  if (!SHOPIFY_ADMIN_API_TOKEN) {
    return { session: null, error: "Missing SHOPIFY_ADMIN_API_TOKEN in .env" };
  }

  if (!SHOPIFY_ADMIN_API_TOKEN.startsWith("shpat_")) {
    return { session: null, error: "Invalid token format. Must start with 'shpat_'" };
  }

  try {
    // Auto-create or update session
    const session = await prisma.session.upsert({
      where: { 
        shop: shop 
      },
      update: { 
        accessToken: SHOPIFY_ADMIN_API_TOKEN,
        updatedAt: new Date(),
      },
      create: {
        id: `standalone-${shop}-${Date.now()}`,
        shop: shop,
        state: "active",
        isOnline: false,
        accessToken: SHOPIFY_ADMIN_API_TOKEN,
        scope: process.env.SCOPES || "read_products,write_products",
        expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    console.log(`✅ Session ready for: ${session.shop}`);
    return { session, error: null };

  } catch (error) {
    console.error("❌ Session creation error:", error);
    return { session: null, error: error.message };
  }
}

// Token validation function
export async function validateShopifyToken(shop, accessToken) {
  try {
    const response = await fetch(
      `https://${shop}/admin/api/2026-01/shop.json`,
      {
        headers: {
          "X-Shopify-Access-Token": accessToken,
          "Content-Type": "application/json",
        },
      }
    );
    
    return response.ok;
  } catch (error) {
    return false;
  }
}

// Get shop info using the token
export async function getShopInfo(shop, accessToken) {
  try {
    const response = await fetch(
      `https://${shop}/admin/api/2026-01/shop.json`,
      {
        headers: {
          "X-Shopify-Access-Token": accessToken,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Shop API error: ${response.status}`);
    }

    const data = await response.json();
    return data.shop;
  } catch (error) {
    console.error("❌ Get shop info error:", error);
    return null;
  }
}

export const authenticate = {
  admin: async () => {
    throw new Error("OAuth disabled in standalone mode");
  },
};

export default {};