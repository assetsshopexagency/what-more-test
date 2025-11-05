// // // // // // import "@shopify/shopify-app-remix/adapters/node";
// // // // // // import {
// // // // // //   ApiVersion,
// // // // // //   AppDistribution,
// // // // // //   shopifyApp,
// // // // // // } from "@shopify/shopify-app-remix/server";
// // // // // // import  {resetResources} from "@shopify/shopify-api/rest/admin/2025-07";
// // // // // // import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
// // // // // // import prisma from "./db.server";

// // // // // // const shopify = shopifyApp({
// // // // // //   apiKey: process.env.SHOPIFY_API_KEY,
// // // // // //   apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
// // // // // //   apiVersion: ApiVersion.July25,
// // // // // //   scopes: process.env.SCOPES?.split(",") || ["read_products", "write_products", "read_files", "write_files"],
// // // // // //   appUrl: process.env.SHOPIFY_APP_URL || "",
// // // // // //   hostScheme: process.env.HOST?.includes("https") ? "https" : "http",
// // // // // //   apiVersion: LATEST_API_VERSION,
// // // // // //   isEmbeddedApp: true,
// // // // // //   authPathPrefix: "/auth",
// // // // // //   sessionStorage: new PrismaSessionStorage(prisma),
// // // // // //   distribution: AppDistribution.AppStore,
// // // // // //   future: {
// // // // // //     unstable_newEmbeddedAuthStrategy: true,
// // // // // //     removeRest: true,
// // // // // //   },
// // // // // //   ...(process.env.SHOP_CUSTOM_DOMAIN
// // // // // //     ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] }
// // // // // //     : {}),
// // // // // // });

// // // // // // const sessionStorage = new PrismaSessionStorage(prisma);

// // // // // // export { shopify, sessionStorage };

// // // // // // export default shopify;
// // // // // // export const apiVersion = ApiVersion.July25;
// // // // // // export const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders;
// // // // // // export const authenticate = shopify.authenticate;
// // // // // // export const unauthenticated = shopify.unauthenticated;
// // // // // // export const login = shopify.login;
// // // // // // export const registerWebhooks = shopify.registerWebhooks;
// // // // // // // export const sessionStorage = shopify.sessionStorage;






// // // // // import "@shopify/shopify-app-remix/adapters/node";
// // // // // import {
// // // // //   ApiVersion,
// // // // //   AppDistribution,
// // // // //   shopifyApp,
// // // // // } from "@shopify/shopify-app-remix/server";
// // // // // import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
// // // // // import prisma from "./db.server";


// // // // // const shopify = shopifyApp({
// // // // //   apiKey: process.env.SHOPIFY_API_KEY,
// // // // //   apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
// // // // //   apiVersion: ApiVersion.July25, // ✅ latest stable
// // // // //   scopes:
// // // // //     process.env.SCOPES?.split(",") || [
// // // // //       "read_products",
// // // // //       "write_products",
// // // // //       "read_files",
// // // // //       "write_files",
// // // // //     ],
// // // // //   appUrl: process.env.SHOPIFY_APP_URL || "",
// // // // //   hostScheme: process.env.HOST?.includes("https") ? "https" : "http",
// // // // //   isEmbeddedApp: false,
// // // // //   authPathPrefix: "/auth",
// // // // //   sessionStorage: new PrismaSessionStorage(prisma),
// // // // //   distribution: AppDistribution.AppStore,
// // // // //   future: {
// // // // //     unstable_newEmbeddedAuthStrategy: true,
// // // // //     removeRest: true, // ✅ opt-in to remove REST in the future
// // // // //   },
// // // // //   ...(process.env.SHOP_CUSTOM_DOMAIN
// // // // //     ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] }
// // // // //     : {}),
// // // // // });

// // // // // export { shopify };
// // // // // export default shopify;

// // // // // // ✅ Keep exports consistent
// // // // // export const apiVersion = ApiVersion.July25;
// // // // // export const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders;
// // // // // export const authenticate = shopify.authenticate;
// // // // // export const unauthenticated = shopify.unauthenticated;
// // // // // export const login = shopify.login;
// // // // // export const registerWebhooks = shopify.registerWebhooks;





// // // // // shopify.server.js
// // // // import "@shopify/shopify-app-remix/adapters/node";
// // // // import {
// // // //   ApiVersion,
// // // //   AppDistribution,
// // // //   shopifyApp,
// // // // } from "@shopify/shopify-app-remix/server";
// // // // import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
// // // // import prisma from "./db.server";


// // // // const shopify = shopifyApp({
// // // //   apiKey: process.env.SHOPIFY_API_KEY,
// // // //   apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
// // // //   apiVersion: ApiVersion.October24, // Updated to latest as of Oct 2025
// // // //   scopes:
// // // //     process.env.SHOPIFY_SCOPES?.split(",") || [
// // // //       "read_products",
// // // //       "write_products",
// // // //       "read_files",
// // // //       "write_files",
// // // //     ],
// // // //   appUrl: process.env.SHOPIFY_APP_URL || "",
// // // //   hostScheme: process.env.SHOPIFY_APP_URL?.includes("https") ? "https" : "http",
// // // //   isEmbeddedApp: false,
// // // //   authPathPrefix: "/auth",
// // // //   sessionStorage: new PrismaSessionStorage(prisma),
// // // //   distribution: AppDistribution.AppStore,
// // // //   future: {
// // // //     removeRest: true, // ✅ opt-in to remove REST in the future
// // // //   },
// // // //   ...(process.env.SHOP_CUSTOM_DOMAIN
// // // //     ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] }
// // // //     : {}),
// // // // });

// // // // export { shopify };
// // // // export default shopify;

// // // // // ✅ Keep exports consistent
// // // // export const apiVersion = ApiVersion.October24;
// // // // export const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders;
// // // // export const authenticate = shopify.authenticate;
// // // // export const unauthenticated = shopify.unauthenticated;
// // // // export const login = shopify.login;
// // // // export const registerWebhooks = shopify.registerWebhooks;





// // // import "@shopify/shopify-app-remix/adapters/node";
// // // import {
// // //   ApiVersion,
// // //   AppDistribution,
// // //   shopifyApp,
// // //   LATEST_API_VERSION,
// // // } from "@shopify/shopify-app-remix/server";
// // // import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
// // // import prisma from "./db.server";

// // // const shopify = shopifyApp({
// // //   apiKey: process.env.SHOPIFY_API_KEY,
// // //   apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
// // //   apiVersion: LATEST_API_VERSION,
// // //   scopes: process.env.SCOPES?.split(",") || [
// // //     "read_products",
// // //     "write_products",
// // //     "read_files",
// // //     "write_files",
// // //   ],
// // //   appUrl: process.env.SHOPIFY_APP_URL || "",
// // //   authPathPrefix: "/auth",
// // //   sessionStorage: new PrismaSessionStorage(prisma),
// // //   distribution: AppDistribution.AppStore,
// // //   isEmbeddedApp: false,
// // //   future: {
// // //     unstable_newEmbeddedAuthStrategy: false,
// // //   },
// // //   ...(process.env.SHOP_CUSTOM_DOMAIN
// // //     ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] }
// // //     : {}),
// // // });

// // // export default shopify;
// // // export const apiVersion = LATEST_API_VERSION;
// // // export const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders;
// // // export const authenticate = shopify.authenticate;
// // // export const unauthenticated = shopify.unauthenticated;
// // // export const login = shopify.login;
// // // export const registerWebhooks = shopify.registerWebhooks;
// // // export const logout = shopify.logout;







// // // app/shopify.server.js
// // import "@shopify/shopify-app-remix/adapters/node";
// // import {
// //   ApiVersion,
// //   AppDistribution,
// //   shopifyApp,
// //   LATEST_API_VERSION,
// // } from "@shopify/shopify-app-remix/server";
// // import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
// // import prisma from "./db.server.js";
// // import * as jose from "jose";

// // // Initialize Shopify App (unchanged)
// // const shopify = shopifyApp({
// //   apiKey: process.env.SHOPIFY_API_KEY,
// //   apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
// //   apiVersion: LATEST_API_VERSION,
// //   scopes: process.env.SCOPES?.split(",") || [
// //     "read_products",
// //     "write_products",
// //     "read_files",
// //     "write_files",
// //   ],
// //   appUrl: process.env.SHOPIFY_APP_URL || "",
// //   authPathPrefix: "/auth",
// //   sessionStorage: new PrismaSessionStorage(prisma),
// //   distribution: AppDistribution.AppStore,
// //   isEmbeddedApp: false,
// //   future: {
// //     unstable_newEmbeddedAuthStrategy: false,
// //   },
// //   ...(process.env.SHOP_CUSTOM_DOMAIN
// //     ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] }
// //     : {}),
// // });

// // // === JWT VERIFICATION (for standalone app) ===
// // const JWT_SECRET = process.env.JWT_SECRET;

// // if (!JWT_SECRET) {
// //   console.warn("JWT_SECRET is missing! Standalone auth will not work.");
// // }

// // const importSecret = async () => {
// //   if (!JWT_SECRET) throw new Error("JWT_SECRET not set");
// //   return await jose.importJWK(
// //     {
// //       kty: "oct",
// //       k: JWT_SECRET,
// //       alg: "HS256",
// //     },
// //     "HS256"
// //   );
// // };

// // // Extract and verify shop from JWT
// // async function getShopFromJwt(request) {
// //   const header = request.headers.get("x-shopify-jwt");
// //   if (!header || !JWT_SECRET) return null;

// //   try {
// //     const { payload } = await jose.jwtVerify(header, await importSecret());
// //     const shop = payload.shop?.replace(/^https?:\/\//, "").replace(/\/+$/, "");
// //     return shop || null;
// //   } catch (err) {
// //     console.debug("Invalid JWT:", err.message);
// //     return null;
// //   }
// // }

// // // === UNIFIED ADMIN CLIENT (works for both embedded & standalone) ===
// // export async function getAdmin(request) {
// //   // 1. Try standalone JWT flow
// //   const shop = await getShopFromJwt(request);
// //   if (shop && JWT_SECRET) {
// //     const sessionRecord = await prisma.session.findFirst({
// //       where: { shop },
// //     });

// //     if (!sessionRecord?.accessToken) {
// //       throw new Error("No session found for shop: " + shop);
// //     }

// //     const client = new shopify.clients.Graphql({
// //       session: {
// //         shop,
// //         accessToken: sessionRecord.accessToken,
// //       },
// //     });

// //     return {
// //       admin: client,
// //       session: sessionRecord,
// //     };
// //   }

// //   // 2. Fallback: Embedded App (inside Shopify Admin via App Bridge)
// //   try {
// //     const { admin, session } = await shopify.authenticate.admin(request);
// //     return { admin, session };
// //   } catch (err) {
// //     // Only throw if not a 401/redirect (i.e., not in auth flow)
// //     if (err.status !== 401 && !err.message.includes("redirect")) {
// //       throw err;
// //     }
// //     throw new Error("Authentication failed: Not in Shopify Admin and no valid JWT.");
// //   }
// // }

// // // === EXPORT ORIGINAL SHOPIFY HELPERS ===
// // export default shopify;
// // export const apiVersion = LATEST_API_VERSION;
// // export const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders;
// // export const authenticate = shopify.authenticate;
// // export const unauthenticated = shopify.unauthenticated;
// // export const login = shopify.login;
// // export const registerWebhooks = shopify.registerWebhooks;
// // export const logout = shopify.logout; // Fixed typo: was "logo"

// // // === UTILITY: Generate JWT for frontend (call after OAuth) ===
// // export async function generateStandaloneJwt(shop) {
// //   if (!JWT_SECRET) throw new Error("JWT_SECRET not configured");

// //   const payload = {
// //     shop: shop.replace(/^https?:\/\//, "").replace(/\/+$/, ""),
// //     iat: Math.floor(Date.now() / 1000),
// //     exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24 hours
// //   };

// //   const secret = await importSecret();
// //   return await new jose.SignJWT(payload)
// //     .setProtectedHeader({ alg: "HS256" })
// //     .sign(secret);
// // }


// import "@shopify/shopify-app-remix/adapters/node";
// import {
//   ApiVersion,
//   AppDistribution,
//   shopifyApp,
// } from "@shopify/shopify-app-remix/server";
// import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
// import prisma from "./db.server";
// import { getAuth } from "@clerk/remix/ssr.server";
// import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';

// // Shopify app init
// const shopify = shopifyApp({
//   apiKey: process.env.SHOPIFY_API_KEY,
//   apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
//   apiVersion: LATEST_API_VERSION,
//   scopes: process.env.SCOPES?.split(",") || [
//     "read_products",
//     "write_products",
//     "read_files",
//     "write_files",
//   ],
//   appUrl: process.env.SHOPIFY_APP_URL || "",
//   authPathPrefix: "/auth",
//   sessionStorage: new PrismaSessionStorage(prisma),
//   distribution: AppDistribution.AppStore,
//   isEmbeddedApp: false,
//   future: {
//     unstable_newEmbeddedAuthStrategy: false,
//   },
//   ...(process.env.SHOP_CUSTOM_DOMAIN
//     ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] }
//     : {}),
// });

// // ✅ Unified Admin client (standalone or embedded)
// export async function getAdmin(request) {
//   // Standalone with Clerk
//   const { userId } = await getAuth(request);
//   if (userId) {
//     const session = await prisma.session.findFirst({ where: { clerkUserId: userId } });
//     if (!session?.accessToken) throw new Error("No session found");

//     const client = new shopify.clients.Graphql({
//       session: { shop: session.shop, accessToken: session.accessToken },
//     });

//     return { admin: client, session };
//   }

//   // Embedded
//   const auth = await shopify.authenticate.admin(request);
//   return auth;
// }

// // Export helpers
// export default shopify;
// export const authenticate = shopify.authenticate;
// export const login = shopify.login;
// export const logout = shopify.logout;
// export const registerWebhooks = shopify.registerWebhooks;



import "@shopify/shopify-app-remix/adapters/node";
import {
  ApiVersion,
  AppDistribution,
  shopifyApp,
} from "@shopify/shopify-app-remix/server";
import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
import prisma from "./db.server";

const shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
  apiVersion: ApiVersion.July24,
  scopes: process.env.SCOPES?.split(",") || [
    "read_products",
    "write_products",
    "read_files",
    "write_files",
  ],
  appUrl: process.env.SHOPIFY_APP_URL || "",
  authPathPrefix: "/auth",
  sessionStorage: new PrismaSessionStorage(prisma),
  distribution: AppDistribution.AppStore,
  isEmbeddedApp: false,
  future: {
    unstable_newEmbeddedAuthStrategy: false,
  },
  ...(process.env.SHOP_CUSTOM_DOMAIN
    ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] }
    : {}),
});

export async function getShopifyContext(request) {
  try {
    const session = await prisma.session.findFirst();
    if (!session?.accessToken || !session.shop) {
      throw new Error("No valid Shopify session found");
    }

    const client = new shopify.clients.Graphql({
      session: { 
        shop: session.shop, 
        accessToken: session.accessToken 
      },
    });

    return { admin: client, shop: session.shop, accessToken: session.accessToken };
  } catch (error) {
    console.error("Error in getShopifyContext:", error);
    throw error;
  }
}

export default shopify;
export const authenticate = shopify.authenticate;
export const login = shopify.login;
export const logout = shopify.logout;
export const registerWebhooks = shopify.registerWebhooks;