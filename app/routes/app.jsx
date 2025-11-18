// app/routes/app.jsx

import { getShopifyContext } from "../shopify.server";

export async function loader(args) {
  const { request } = args;

  try {
    const shopifyContext = await getShopifyContext({ request });

    return new Response(
      JSON.stringify({
        shopifyConnected: !!shopifyContext.session,
        shopifyError: shopifyContext.error || null,
        shopifyStore: process.env.SHOPIFY_STORE,
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        shopifyConnected: false,
        shopifyError: error.message,
        shopifyStore: process.env.SHOPIFY_STORE,
      }),
      { headers: { "Content-Type": "application/json" }, status: 500 }
    );
  }
}