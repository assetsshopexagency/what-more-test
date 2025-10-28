// import "@shopify/shopify-app-remix/adapters/node";
// import {
//   ApiVersion,
//   AppDistribution,
//   shopifyApp,
// } from "@shopify/shopify-app-remix/server";
// import  {resetResources} from "@shopify/shopify-api/rest/admin/2025-07";
// import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
// import prisma from "./db.server";

// const shopify = shopifyApp({
//   apiKey: process.env.SHOPIFY_API_KEY,
//   apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
//   apiVersion: ApiVersion.July25,
//   scopes: process.env.SCOPES?.split(",") || ["read_products", "write_products", "read_files", "write_files"],
//   appUrl: process.env.SHOPIFY_APP_URL || "",
//   hostScheme: process.env.HOST?.includes("https") ? "https" : "http",
//   apiVersion: LATEST_API_VERSION,
//   isEmbeddedApp: true,
//   authPathPrefix: "/auth",
//   sessionStorage: new PrismaSessionStorage(prisma),
//   distribution: AppDistribution.AppStore,
//   future: {
//     unstable_newEmbeddedAuthStrategy: true,
//     removeRest: true,
//   },
//   ...(process.env.SHOP_CUSTOM_DOMAIN
//     ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] }
//     : {}),
// });

// const sessionStorage = new PrismaSessionStorage(prisma);

// export { shopify, sessionStorage };

// export default shopify;
// export const apiVersion = ApiVersion.July25;
// export const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders;
// export const authenticate = shopify.authenticate;
// export const unauthenticated = shopify.unauthenticated;
// export const login = shopify.login;
// export const registerWebhooks = shopify.registerWebhooks;
// // export const sessionStorage = shopify.sessionStorage;






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
  apiVersion: ApiVersion.July25, // ✅ latest stable
  scopes:
    process.env.SCOPES?.split(",") || [
      "read_products",
      "write_products",
      "read_files",
      "write_files",
    ],
  appUrl: process.env.SHOPIFY_APP_URL || "",
  hostScheme: process.env.HOST?.includes("https") ? "https" : "http",
  isEmbeddedApp: true,
  authPathPrefix: "/auth",
  sessionStorage: new PrismaSessionStorage(prisma),
  distribution: AppDistribution.AppStore,
  future: {
    unstable_newEmbeddedAuthStrategy: true,
    removeRest: true, // ✅ opt-in to remove REST in the future
  },
  ...(process.env.SHOP_CUSTOM_DOMAIN
    ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] }
    : {}),
});

export { shopify };
export default shopify;

// ✅ Keep exports consistent
export const apiVersion = ApiVersion.July25;
export const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders;
export const authenticate = shopify.authenticate;
export const unauthenticated = shopify.unauthenticated;
export const login = shopify.login;
export const registerWebhooks = shopify.registerWebhooks;
