// app/routes/api.products.jsx - NO CHANGES NEEDED
import { getShopifyContext, validateShopifyToken } from "../shopify.server";

export async function loader({ request }) {
  console.log("🛒 API products route called");
  
  const { session, error } = await getShopifyContext();
  
  if (error || !session?.shop || !session?.accessToken) {
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "Shopify session not configured",
        details: error 
      }),
      { 
        status: 500, 
        headers: { "Content-Type": "application/json" } 
      }
    );
  }

  // Validate token on each request (optional - can be cached)
  const isValid = await validateShopifyToken(session.shop, session.accessToken);
  if (!isValid) {
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "Shopify access token is invalid or expired" 
      }),
      { 
        status: 401, 
        headers: { "Content-Type": "application/json" } 
      }
    );
  }

  const url = `https://${session.shop}/admin/api/2026-01/products.json?limit=50&fields=id,title,image,variants`;
  
  try {
    const res = await fetch(url, {
      headers: {
        "X-Shopify-Access-Token": session.accessToken,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Shopify API error: ${res.status}`);
    }

    const data = await res.json();
    const products = Array.isArray(data.products) ? data.products : [];

    return new Response(
      JSON.stringify({ 
        success: true, 
        products,
        count: products.length,
        shop: session.shop
      }),
      { 
        headers: { "Content-Type": "application/json" } 
      }
    );
  } catch (err) {
    console.error("💥 Error in products API:", err);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: err.message 
      }),
      { 
        status: 500, 
        headers: { "Content-Type": "application/json" } 
      }
    );
  }
}