// app/routes/auth.install.jsx
import { createSessionForStore } from "../shopify.server.js";

export const action = async ({ request }) => {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { shop, accessToken, scope } = await request.json();
    
    if (!shop || !accessToken) {
      return new Response(
        JSON.stringify({ error: "Missing shop or accessToken" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Create session for the new store
    const session = await createSessionForStore(shop, accessToken, scope);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Store installed successfully",
        sessionId: session.id,
        shop: session.shop,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("❌ App installation error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

export const loader = async () => {
  return new Response(
    JSON.stringify({ message: "POST to this endpoint to install app" }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
};